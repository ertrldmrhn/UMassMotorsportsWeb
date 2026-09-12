"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { parseEventTime, getEventEnd } from "@/lib/eventTime";
import type { ClubEvent } from "@/data/events";

interface ScheduleListProps {
  events: ClubEvent[];
  /**
   * Timestamp captured when the page was prerendered. Because this site is a
   * static export, the server render happens at build time — so the first
   * client render must use that same reference to avoid a hydration mismatch.
   */
  buildNow: number;
}

export default function ScheduleList({ events, buildNow }: ScheduleListProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    // Re-check periodically so an event greys out while the page sits open.
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const reference = now ?? buildNow;

  const sorted = [...events].sort(
    (a, b) =>
      parseEventTime(a.date, a.time).getTime() -
      parseEventTime(b.date, b.time).getTime()
  );

  const upcoming = sorted.filter((e) => getEventEnd(e).getTime() > reference);
  const past = sorted
    .filter((e) => getEventEnd(e).getTime() <= reference)
    .reverse();

  return (
    <>
      {upcoming.length > 0 ? (
        <section className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Upcoming
          </p>
          <div className="space-y-4">
            {upcoming.map((event) => (
              <EventCard key={event.date + event.title} event={event} />
            ))}
          </div>
        </section>
      ) : (
        <p className="text-gray-400 text-sm mb-12">
          No upcoming events. Check back soon.
        </p>
      )}

      {past.length > 0 && (
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Past Events
          </p>
          <div className="space-y-4">
            {past.map((event) => (
              <EventCard key={event.date + event.title} event={event} past />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
