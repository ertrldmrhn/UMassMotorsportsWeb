import type { ClubEvent } from "@/data/events";

export function parseEventTime(date: string, time: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return new Date(year, month - 1, day, 0, 0, 0);
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return new Date(year, month - 1, day, hours, minutes, 0);
}

export function getEventEnd(event: ClubEvent): Date {
  const start = parseEventTime(event.date, event.time);
  if (event.endTime) return parseEventTime(event.date, event.endTime);
  return new Date(start.getTime() + 2 * 60 * 60 * 1000);
}

/**
 * When sign-ups stop. `registrationCloses` is a date, and people read "closes
 * November 4" as "you have until the end of the 4th", so the deadline is the
 * last moment of that day rather than its start.
 *
 * Falls back to the event ending, since an event with no stated deadline is
 * really open until it happens.
 */
export function getRegistrationClose(event: ClubEvent): Date | null {
  if (!event.registration) return null;
  if (!event.registrationCloses) return getEventEnd(event);
  const [year, month, day] = event.registrationCloses.split("-").map(Number);
  return new Date(year, month - 1, day, 23, 59, 59, 999);
}

/**
 * What state sign-ups are in. "none" means there is nothing to show at all,
 * either because the event takes no sign-ups or because it has happened.
 */
export type RegistrationState = "none" | "open" | "waitlist" | "closed";

/**
 * Resolve sign-up state at `now` (ms since epoch).
 *
 * Two things can close sign-ups: being marked closed by hand once capacity is
 * gone, or the stated deadline passing. Both are handled here so no caller has
 * to remember both, and so a stale "open" in the data cannot outlive its own
 * deadline and keep inviting people in.
 */
export function getRegistrationState(
  event: ClubEvent,
  now: number
): RegistrationState {
  if (!event.registration) return "none";
  if (getEventEnd(event).getTime() <= now) return "none";

  const declared = event.registrationStatus ?? "open";
  if (declared === "closed") return "closed";

  const close = getRegistrationClose(event);
  if (close && now > close.getTime()) return "closed";

  return declared;
}

/** Whether sign-ups can still be taken, i.e. a link is worth showing. */
export function isRegistrationOpen(event: ClubEvent, now: number): boolean {
  const state = getRegistrationState(event, now);
  return state === "open" || state === "waitlist";
}
