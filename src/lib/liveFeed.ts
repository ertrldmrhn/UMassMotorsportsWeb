/**
 * Shape of the live results snapshot. The race control app builds it in
 * Go-Kart-Tournament/src/domain/publicFeed.ts; keep the two in step.
 * Everything here is already public: display names, group colors and times.
 */

export interface LiveGroupTag {
  label: string;
  color: string;
  textColor: string;
}

export interface LiveHeat extends LiveGroupTag {
  stage: string;
  title: string;
  status: "planned" | "staging" | "on_track";
  startedAt: number | null;
  drivers: string[];
}

export interface LiveRow {
  rank: number | null;
  groupRank: number | null;
  name: string;
  group: LiveGroupTag | null;
  lapMs: number | null;
  position: number | null;
  status: "ranked" | "dnf" | "no_time" | "dns" | "not_run" | "no_result" | "dsq";
  tied: boolean;
  advancing: boolean;
}

export interface LiveGroup extends LiveGroupTag {
  state: string;
  drivers: string[];
}

export interface LiveStage {
  name: string;
  type: string;
  state: "upcoming" | "running" | "complete";
  provisional: boolean;
  rule: string;
  scoring: "best_lap" | "finish_position" | "manual";
  cut: number | null;
  perGroupCut: number | null;
  sessions: { done: number; total: number };
  groups: LiveGroup[];
  standings: LiveRow[];
}

export interface LiveFeed {
  format: "ummsc-live";
  v: 1;
  live: true;
  publishedAt: number;
  /** Added by the Worker on arrival, in Cloudflare's clock. */
  receivedAt: number;
  event: { name: string; venue: string; date: string; trackStart: string };
  paused: boolean;
  currentStage: string | null;
  onTrack: LiveHeat[];
  next: LiveHeat[];
  stages: LiveStage[];
  podium: { name: string; lapMs: number | null }[];
  podiumFinal: boolean;
}

export interface NotLive {
  format: "ummsc-live";
  live: false;
}

export function formatLap(ms: number | null): string {
  if (ms === null) return "—";
  const minutes = Math.floor(ms / 60000);
  const rest = ms - minutes * 60000;
  const seconds = Math.floor(rest / 1000);
  const frac = String(rest - seconds * 1000).padStart(3, "0");
  return minutes > 0 ? `${minutes}:${String(seconds).padStart(2, "0")}.${frac}` : `${seconds}.${frac}`;
}

export function formatElapsed(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export const STATUS_TEXT: Record<LiveRow["status"], string> = {
  ranked: "",
  dnf: "DNF",
  no_time: "No time",
  dns: "DNS",
  not_run: "Yet to race",
  no_result: "Time pending",
  dsq: "DSQ",
};
