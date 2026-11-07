/**
 * Live results API for the PVIK tournament.
 *
 * Everything except /api/* is still served straight from ./out as static
 * assets, without running this code, so the site stays up even if this
 * Worker hits its free-plan limit.
 *
 *   GET  /api/live   latest public snapshot (anyone)
 *   POST /api/live   replace it (race control laptop, Bearer LIVE_TOKEN)
 */

import { DurableObject } from "cloudflare:workers";

interface Env {
  ASSETS: Fetcher;
  LIVE: DurableObjectNamespace<LiveFeed>;
  /** Set with `npx wrangler secret put LIVE_TOKEN`. Never committed. */
  LIVE_TOKEN?: string;
}

const FORMAT = "ummsc-live";
const MAX_BYTES = 100_000;
const NOT_LIVE = JSON.stringify({ format: FORMAT, v: 1, live: false });

/** One object holds the single latest snapshot. Strongly consistent, unlike KV. */
export class LiveFeed extends DurableObject<Env> {
  private cached: string | null | undefined;

  async read(): Promise<string | null> {
    if (this.cached === undefined) this.cached = (await this.ctx.storage.get<string>("feed")) ?? null;
    return this.cached;
  }

  /**
   * Ignores anything older than what is stored, so a delayed retry can't roll
   * the page back. A stored time far in the future (a laptop clock that was
   * wrong, then fixed) is not trusted, or it would block every update after it.
   */
  async write(body: string, publishedAt: number): Promise<boolean> {
    const last = (await this.ctx.storage.get<number>("publishedAt")) ?? 0;
    const lastIsPlausible = last <= Date.now() + 10 * 60_000;
    if (publishedAt < last && lastIsPlausible) return false;
    await this.ctx.storage.put({ feed: body, publishedAt });
    this.cached = body;
    return true;
  }
}

/** Race control runs on the laptop at localhost, so that is the only origin allowed to write. */
function writerOrigin(request: Request): string | null {
  const origin = request.headers.get("origin");
  return origin && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ? origin : null;
}

function cors(request: Request): Record<string, string> {
  const origin = writerOrigin(request);
  return origin
    ? {
        "access-control-allow-origin": origin,
        "access-control-allow-methods": "GET, POST, OPTIONS",
        "access-control-allow-headers": "authorization, content-type",
        "access-control-expose-headers": "x-server-time",
        "access-control-max-age": "86400",
        vary: "origin",
      }
    : { "access-control-allow-origin": "*" };
}

function json(request: Request, status: number, body: string | null, extra: Record<string, string> = {}) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      // Lets each phone correct for its own clock, so session timers agree.
      "x-server-time": String(Date.now()),
      ...cors(request),
      ...extra,
    },
  });
}

/** Compare without leaking how many characters matched. */
function sameSecret(given: string, expected: string): boolean {
  const a = new TextEncoder().encode(given);
  const b = new TextEncoder().encode(expected);
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i += 1) diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  return diff === 0;
}

async function handleLive(request: Request, env: Env): Promise<Response> {
  const feed = env.LIVE.get(env.LIVE.idFromName("pvik-2026"));

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(request) });

  if (request.method === "GET" || request.method === "HEAD") {
    return json(request, 200, request.method === "HEAD" ? null : (await feed.read()) ?? NOT_LIVE);
  }

  if (request.method !== "POST") return json(request, 405, JSON.stringify({ error: "Use GET or POST" }), { allow: "GET, POST, OPTIONS" });

  if (!env.LIVE_TOKEN) return json(request, 503, JSON.stringify({ error: "LIVE_TOKEN is not set on this Worker" }));
  const auth = request.headers.get("authorization") ?? "";
  if (!auth.startsWith("Bearer ") || !sameSecret(auth.slice(7), env.LIVE_TOKEN)) {
    return json(request, 401, JSON.stringify({ error: "Wrong or missing token" }));
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).length > MAX_BYTES) return json(request, 413, JSON.stringify({ error: "Snapshot too large" }));

  let parsed: { format?: unknown; live?: unknown; publishedAt?: unknown };
  try {
    parsed = JSON.parse(text);
  } catch {
    return json(request, 400, JSON.stringify({ error: "Not JSON" }));
  }
  if (parsed.format !== FORMAT || typeof parsed.live !== "boolean" || typeof parsed.publishedAt !== "number") {
    return json(request, 400, JSON.stringify({ error: "Not a race control snapshot" }));
  }

  // Stamp server time so viewers can correct for the laptop's clock being off.
  const stored = JSON.stringify({ ...parsed, receivedAt: Date.now() });
  const accepted = await feed.write(stored, parsed.publishedAt);
  return json(request, accepted ? 204 : 409, accepted ? null : JSON.stringify({ error: "A newer snapshot is already stored" }));
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/live") return handleLive(request, env);
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
