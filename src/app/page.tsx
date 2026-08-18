import React from "react";
import Link from "next/link";
import Image from "next/image";
import { events } from "@/data/events";
import { site } from "@/lib/site";
import { getEventEnd, parseEventTime } from "@/lib/eventTime";
import Countdown from "@/components/Countdown";
import UpcomingEvents from "@/components/UpcomingEvents";
import { Calendar, Clock, MapPin } from "lucide-react";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#5865F2" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function getNextEvent() {
  const now = Date.now();
  return (
    events
      .filter((e) => getEventEnd(e).getTime() > now)
      .sort((a, b) => {
        const diff = a.date.localeCompare(b.date);
        if (diff !== 0) return diff;
        return parseEventTime(a.date, a.time).getTime() - parseEventTime(b.date, b.time).getTime();
      })[0] ?? null
  );
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

export default function HomePage() {
  const nextEvent = getNextEvent();

  return (
    <>
      {/* Official Channels strip — full-width band between nav and hero */}
      <div className="border-t border-b border-gray-200 bg-[#EDECEA]">
        <div className="max-w-5xl mx-auto px-8 py-1.5 relative flex flex-col md:block">
          <p className="text-[10px] uppercase tracking-[0.22em] text-gray-400 font-medium mb-2 text-center md:text-left md:mb-0 md:absolute md:left-8 md:top-1/2 md:-translate-y-1/2">
            Official Channels
          </p>
          <nav aria-label="Official channels" className="flex flex-wrap justify-center gap-x-6 gap-y-1 md:py-0.5">

            {/* Instagram */}
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 py-1 text-gray-500 hover:text-umass transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-umass/40"
            >
              <span className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                <InstagramIcon />
              </span>
              <span className="text-sm font-medium group-hover:underline underline-offset-2">
                umassmoto
              </span>
            </a>

            {/* Discord */}
            <a
              href={site.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 py-1 text-gray-500 hover:text-umass transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-umass/40"
            >
              <span className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                <DiscordIcon />
              </span>
              <span className="text-sm font-medium group-hover:underline underline-offset-2">
                Umass Motorsport
              </span>
            </a>

            {/* Campus Pulse */}
            <a
              href={site.campusPulse}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-umass/40"
            >
              <Image
                src="/campus_pulse.png"
                alt="Campus Pulse"
                width={800}
                height={194}
                className="h-8 w-auto object-contain opacity-60 group-hover:opacity-90 transition-opacity"
              />
            </a>

          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 pt-5 pb-10">
        {nextEvent ? (
          <div className="relative rounded-xl overflow-hidden min-h-[440px] md:min-h-[560px] flex flex-col justify-end">
            {/* Left red accent stripe */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-umass z-20" />

            {/* Background */}
            {nextEvent.image ? (
              <Image
                src={nextEvent.image}
                alt={nextEvent.title}
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
                {nextEvent.title}
              </h2>

              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/65 mb-5">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-red-400 shrink-0" />
                  {formatDate(nextEvent.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-red-400 shrink-0" />
                  {nextEvent.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-red-400 shrink-0" />
                  {nextEvent.location}
                </span>
              </div>

              {nextEvent.description && (
                <p className="text-sm text-white/70 mb-7 max-w-xl leading-relaxed">
                  {nextEvent.description}
                </p>
              )}

              <div className="flex justify-center md:justify-start">
                <Countdown event={nextEvent} />
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

      {nextEvent && <UpcomingEvents excludeDate={nextEvent.date} />}
    </>
  );
}
