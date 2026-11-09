import type { LiveFeed } from "@/lib/liveFeed";
import fall2026 from "@/data/results/fall-2026-go-kart.json";

/**
 * Finished tournaments, frozen into the repo so their results stay up for
 * good. They never depend on the live feed, which the next event overwrites.
 *
 * To archive a new one: when racing is over, save the feed with
 *   curl -s https://www.umassmotorsports.com/api/live > src/data/results/<slug>.json
 * then add an entry below. Its page and the menu link come from this list.
 */
export interface PastTournament {
  /** URL segment under /go-kart, e.g. "fall-2026" → /go-kart/fall-2026. */
  slug: string;
  /** Page heading and menu label. */
  title: string;
  /** Shown under the title. */
  when: string;
  feed: LiveFeed;
}

/**
 * The snapshot is taken after the last session, so every round is complete.
 * Rounds that were not marked final in race control would otherwise keep a
 * "provisional" label forever.
 */
function asFinal(raw: unknown): LiveFeed {
  const feed = raw as LiveFeed;
  return {
    ...feed,
    paused: false,
    currentStage: null,
    onTrack: [],
    next: [],
    podiumFinal: true,
    stages: feed.stages.map((s) => ({ ...s, provisional: false })),
  };
}

export const pastTournaments: PastTournament[] = [
  {
    slug: "fall-2026",
    title: "Fall 2026 Go Kart Tournament",
    when: "Sunday, November 8, 2026",
    feed: asFinal(fall2026),
  },
];

export const pastTournamentHref = (t: PastTournament) => `/go-kart/${t.slug}`;

/** The most recent finished tournament, if any. */
export const latestTournament: PastTournament | undefined = pastTournaments[pastTournaments.length - 1];
