"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Flag, Trophy } from "lucide-react";
import {
  formatElapsed,
  formatLap,
  STATUS_TEXT,
  type LiveFeed,
  type LiveGroupTag,
  type LiveHeat,
  type LiveRow,
  type LiveStage,
  type NotLive,
} from "@/lib/liveFeed";

const POLL_MS = 15_000;
/** No update in this long probably means the track's internet dropped. */
const STALE_MS = 3 * 60_000;

function Chip({ tag, className = "" }: { tag: LiveGroupTag; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-bold uppercase tracking-wide ring-1 ring-black/10 ${className}`}
      style={{ background: tag.color, color: tag.textColor }}
    >
      {tag.label}
    </span>
  );
}

function OnTrack({ heat, elapsed }: { heat: LiveHeat; elapsed: number }) {
  return (
    <section className="overflow-hidden rounded-lg border-2 border-green-500 bg-white">
      <div className="flex items-center justify-between gap-3 px-4 py-3" style={{ background: heat.color, color: heat.textColor }}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest opacity-90">On track · {heat.stage}</p>
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight">{heat.title}</h2>
        </div>
        <span className="font-mono text-2xl md:text-3xl font-bold tabular-nums" aria-label="Session time">
          {formatElapsed(elapsed)}
        </span>
      </div>
      <ol className="grid grid-cols-2 gap-x-6 gap-y-1 px-4 py-3 text-sm md:text-base font-medium text-gray-800 list-decimal list-inside">
        {heat.drivers.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ol>
    </section>
  );
}

function StandingsTable({ stage, rows, cut }: { stage: LiveStage; rows: LiveRow[]; cut: number | null }) {
  const byPosition = stage.scoring !== "best_lap";
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
            <th className="px-3 py-2 w-12">Pos</th>
            <th className="px-3 py-2">Driver</th>
            {!stage.perGroupCut && <th className="px-3 py-2">Group</th>}
            <th className="px-3 py-2 text-right whitespace-nowrap">{byPosition ? "Finish" : "Best lap"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const rank = stage.perGroupCut ? r.groupRank : r.rank;
            return (
              <FragmentWithCut key={`${r.name}-${i}`} showCut={cut !== null && i === cut && i > 0} cut={cut} cols={stage.perGroupCut ? 3 : 4}>
                <tr className={`border-b border-gray-100 last:border-0 ${r.advancing ? "bg-green-50" : ""}`}>
                  <td className="px-3 py-2 font-mono font-bold tabular-nums text-gray-900">
                    {rank ?? "–"}
                    {r.tied && <span className="ml-1 text-[10px] font-semibold text-amber-600">TIE</span>}
                  </td>
                  <td className="px-3 py-2 font-semibold text-gray-900">
                    {r.name}
                    {STATUS_TEXT[r.status] && <span className="block text-xs font-medium text-gray-400">{STATUS_TEXT[r.status]}</span>}
                  </td>
                  {!stage.perGroupCut && <td className="px-3 py-2">{r.group && <Chip tag={r.group} />}</td>}
                  <td className="px-3 py-2 text-right font-mono tabular-nums text-gray-900">
                    {byPosition ? (r.position !== null ? `P${r.position}` : "—") : formatLap(r.lapMs)}
                  </td>
                </tr>
              </FragmentWithCut>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function FragmentWithCut({ showCut, cut, cols, children }: { showCut: boolean; cut: number | null; cols: number; children: React.ReactNode }) {
  return (
    <>
      {showCut && (
        <tr>
          <td colSpan={cols} className="bg-umass px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest text-white">
            Top {cut} advance
          </td>
        </tr>
      )}
      {children}
    </>
  );
}

function StageView({ stage }: { stage: LiveStage }) {
  // Only real entries count. Untimed practice should show its groups, not a list of blanks.
  const hasResults = stage.standings.some((r) => r.status !== "not_run" && r.status !== "no_result");
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        {stage.sessions.done}/{stage.sessions.total} sessions complete · {stage.rule}
        {stage.provisional && hasResults && (
          <span className="ml-2 rounded-sm bg-amber-100 px-1.5 py-0.5 text-xs font-semibold text-amber-800">Provisional</span>
        )}
      </p>

      {hasResults && stage.perGroupCut ? (
        stage.groups.map((g) => (
          <div key={g.label} className="space-y-2">
            <Chip tag={g} className="text-sm" />
            <StandingsTable stage={stage} rows={stage.standings.filter((r) => r.group?.label === g.label)} cut={stage.perGroupCut} />
          </div>
        ))
      ) : hasResults ? (
        <StandingsTable stage={stage} rows={stage.standings} cut={stage.cut} />
      ) : stage.groups.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stage.groups.map((g) => (
            <div key={g.label} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center justify-between px-3 py-2 text-sm font-bold uppercase" style={{ background: g.color, color: g.textColor }}>
                {g.label}
                <span className="text-xs font-semibold normal-case opacity-90">{g.state}</span>
              </div>
              <ol className="px-3 py-2 text-sm text-gray-800 list-decimal list-inside">
                {g.drivers.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
          Groups for this round are set once the previous round finishes.
        </p>
      )}
    </div>
  );
}

export default function LiveResults() {
  const [feed, setFeed] = useState<LiveFeed | NotLive | null>(null);
  const [failed, setFailed] = useState(false);
  /** Cloudflare's clock minus this phone's, from the response Date header. */
  const [skew, setSkew] = useState(0);
  const [now, setNow] = useState<number | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/live", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as LiveFeed | NotLive;
      const server = Number(res.headers.get("x-server-time")) || Date.parse(res.headers.get("date") ?? "");
      if (!Number.isNaN(server)) setSkew(server - Date.now());
      setNow(Date.now());
      setFeed(data);
      setFailed(false);
    } catch {
      // Keep showing the last good snapshot.
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    // Deferred a tick so the first fetch starts after mount, like every later poll.
    const first = setTimeout(() => void load(), 0);
    const poll = setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, POLL_MS);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    const onVisible = () => {
      if (document.visibilityState === "visible") void load();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearTimeout(first);
      clearInterval(poll);
      clearInterval(tick);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load]);

  const live = feed && feed.live ? feed : null;
  const visibleStages = useMemo(() => (live ? live.stages.filter((s) => s.state !== "upcoming" || s.groups.length > 0) : []), [live]);
  const defaultStage =
    (live?.currentStage && visibleStages.find((s) => s.name === live.currentStage)?.name) ?? visibleStages[visibleStages.length - 1]?.name ?? null;
  const stageName = picked && visibleStages.some((s) => s.name === picked) ? picked : defaultStage;
  const stage = visibleStages.find((s) => s.name === stageName) ?? null;

  if (feed === null) {
    return <p className="py-16 text-center text-gray-500">{failed ? "Can't reach live results right now. Retrying…" : "Loading live results…"}</p>;
  }

  if (!live) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Live Results</h1>
        <p className="mx-auto mt-3 max-w-md text-gray-500">
          Nothing is live right now. Standings and groups from the go-kart tournament at Pioneer Valley Indoor Karting appear here while racing is under way.
        </p>
      </div>
    );
  }

  // Both clocks are mapped onto Cloudflare's, so a laptop or phone set a few minutes off still shows the right times.
  // `now` is always set by the time a snapshot has loaded.
  const serverNow = (now ?? live.receivedAt - skew) + skew;
  const laptopSkew = live.receivedAt - live.publishedAt;
  const age = serverNow - live.receivedAt;
  const stale = age > STALE_MS;
  const updated = new Date(live.receivedAt - skew).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">Live Results</h1>
          <p className="text-sm text-gray-500">
            {live.event.name} · {live.event.venue}
          </p>
        </div>
        {live.paused ? (
          <span className="rounded-sm bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-800">Event paused</span>
        ) : stale || failed ? (
          <span className="rounded-sm bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-800">Waiting for the next update · last at {updated}</span>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-sm bg-green-500/15 px-3 py-1.5 text-sm font-semibold text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
            Live · updated {age < 60_000 ? `${Math.max(0, Math.round(age / 1000))}s` : `${Math.round(age / 60_000)} min`} ago
          </span>
        )}
      </header>

      {live.podium.length > 0 && (
        <section className="rounded-lg bg-charcoal p-5 text-white">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60">
            <Trophy size={14} aria-hidden="true" /> {live.podiumFinal ? "Final results" : "Final results, provisional"}
          </p>
          <ol className="mt-3 grid gap-3 sm:grid-cols-3">
            {live.podium.map((p, i) => (
              <li key={p.name} className={`rounded-sm px-4 py-3 ${i === 0 ? "bg-umass" : "bg-white/10"}`}>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/70">{i === 0 ? "Champion" : `P${i + 1}`}</span>
                <p className="text-xl font-extrabold">{p.name}</p>
                {p.lapMs !== null && <p className="font-mono text-sm text-white/80">{formatLap(p.lapMs)}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      {live.onTrack.map((h) => (
        <OnTrack key={h.title + h.stage} heat={h} elapsed={h.startedAt ? serverNow - (h.startedAt + laptopSkew) : 0} />
      ))}
      {live.onTrack.length === 0 && live.podium.length === 0 && (
        <p className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-600">
          <Flag size={15} aria-hidden="true" /> Track is clear
        </p>
      )}

      {live.next.length > 0 && (
        <section>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">Up next</h2>
          <div className="flex flex-wrap gap-2">
            {live.next.map((h, i) => (
              <div key={h.title + h.stage + i} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                <Chip tag={h} />
                <span className="text-sm font-medium text-gray-700">{h.stage}</span>
                {h.status === "staging" && <span className="text-xs font-semibold text-amber-700">In staging</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {visibleStages.length > 0 && (
        <section className="space-y-3">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Rounds">
            {visibleStages.map((s) => (
              <button
                key={s.name}
                role="tab"
                aria-selected={s.name === stageName}
                onClick={() => setPicked(s.name)}
                className={`rounded-sm px-3 py-1.5 text-sm font-semibold transition-colors ${
                  s.name === stageName ? "bg-umass text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-umass/40"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
          {stage && <StageView stage={stage} />}
        </section>
      )}

      <p className="text-xs leading-relaxed text-gray-400">
        Times are typed in from the track printouts and can be corrected. Results stay provisional until each round is finalized. Highlighted drivers are on
        course to advance.
      </p>
    </div>
  );
}
