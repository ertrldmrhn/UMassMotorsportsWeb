"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import Countdown from "@/components/Countdown";
import { parseEventTime, getEventEnd } from "@/lib/eventTime";
import type { ClubEvent } from "@/data/events";

interface HomeEventsProps {
  events: ClubEvent[];
  /**
   * Timestamp captured when the page was prerendered. This site is a static
   * export, so the server render happens at build time — the first client
   * render must use that same reference to avoid a hydration mismatch.
   */
  buildNow: number;
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function PreviewCard({ event }: { event: ClubEvent }) {
  const href = event.link ?? "/schedule";

  return (
    <Link
      href={href}
      {...(event.link ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative flex-1 min-w-0 overflow-hidden rounded-sm min-h-[180px] md:min-h-[220px] flex flex-col justify-end border-l-2 border-umass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-umass/50"
    >
      {/* Background */}
      {event.image ? (
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-charcoal" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse at top right, #6b1616 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 transition-opacity duration-300 group-hover:from-black/80 group-hover:via-black/40 motion-reduce:transition-none" />

      {/* Content */}
      <div className="relative z-10 px-4 pb-4 pt-8">
        <p className="text-white font-bold text-sm md:text-base leading-snug line-clamp-2 mb-1">
          {event.title}
        </p>
        <p className="text-white/55 text-xs">{formatShortDate(event.date)}</p>
      </div>
    </Link>
  );
}

export default function HomeEvents({ events, buildNow }: HomeEventsProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    // Re-check periodically so the hero advances once an event ends, without
    // waiting for the site to be rebuilt.
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const reference = now ?? buildNow;

  // Everything that has not finished yet, earliest first. The featured event is
  // simply the head of this list, so the preview can never repeat it.
  const upcoming = events
    .filter((e) => getEventEnd(e).getTime() > reference)
    .sort(
      (a, b) =>
        parseEventTime(a.date, a.time).getTime() -
        parseEventTime(b.date, b.time).getTime()
    );

  const featured = upcoming[0] ?? null;
  const preview = upcoming.slice(1, 4);

  return (
    <>
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 pt-5 pb-10">
        {featured ? (
          <div className="relative rounded-xl overflow-hidden min-h-[440px] md:min-h-[560px] flex flex-col justify-end">
            {/* Left red accent stripe */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-umass z-20" />

            {/* Background */}
            {featured.image ? (
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-charcoal" />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background:
                      "radial-gradient(ellipse at top right, #881c1c 0%, transparent 65%)",
                  }}
                />
              </>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/15" />

            {/* Content */}
            <div className="relative z-10 px-7 md:px-10 pb-7 md:pb-10 pt-10 text-white">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3">
                {featured.title}
              </h2>

              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/65 mb-5">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-red-400 shrink-0" />
                  {formatDate(featured.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-red-400 shrink-0" />
                  {featured.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-red-400 shrink-0" />
                  {featured.location}
                </span>
              </div>

              {featured.description && (
                <p className="text-sm text-white/70 mb-7 max-w-xl leading-relaxed">
                  {featured.description}
                </p>
              )}

              <div className="flex justify-center md:justify-start">
                <Countdown event={featured} />
              </div>

              <div className="mt-7 flex justify-center md:justify-start">
                <Link
                  href="/schedule"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 text-sm font-semibold rounded hover:bg-gray-100 transition-colors"
                >
                  View Full Schedule
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-white border border-gray-200 p-10 text-center">
            <p className="text-gray-500 mb-4">
              No upcoming events scheduled. Check back soon.
            </p>
            <Link
              href="/schedule"
              className="text-sm font-medium text-umass hover:underline"
            >
              View past events →
            </Link>
          </div>
        )}
      </div>

      {/* Upcoming preview */}
      {preview.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 pb-10">
          {/* Section header */}
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-gray-400 font-medium">
              Upcoming
            </span>
            <Link
              href="/schedule"
              className="hidden md:inline text-xs text-gray-400 hover:text-umass transition-colors hover:underline underline-offset-2"
            >
              View Full Schedule →
            </Link>
          </div>

          {/* Cards */}
          <div className="flex flex-col md:flex-row gap-3">
            {preview.map((event) => (
              <PreviewCard key={event.date + event.title} event={event} />
            ))}
          </div>

          {/* Mobile-only footer */}
          <div className="md:hidden mt-7 flex flex-col items-center gap-1.5">
            <Link
              href="/schedule"
              className="group inline-flex items-center gap-1 text-[15px] font-medium text-gray-400 hover:text-umass transition-colors"
            >
              See all {upcoming.length} upcoming events
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none">
                →
              </span>
            </Link>
            <p className="text-xs text-gray-400/70">
              View the complete semester schedule
            </p>
          </div>
        </div>
      )}
    </>
  );
}
