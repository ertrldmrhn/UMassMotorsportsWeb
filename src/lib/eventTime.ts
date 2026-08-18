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
