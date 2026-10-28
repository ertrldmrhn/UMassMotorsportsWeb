"use client";

import { useEffect, useState } from "react";
import {
  parseEventTime,
  getRegistrationClose,
  getRegistrationState,
} from "@/lib/eventTime";
import type { ClubEvent } from "@/data/events";

interface RegistrationBannerProps {
  events: ClubEvent[];
  /**
   * Timestamp captured at prerender. This is a static export, so the server
   * render happens at build time and the first client render has to use the
   * same reference to avoid a hydration mismatch.
   */
  buildNow: number;
}

function formatWhen(event: ClubEvent): string {
  const [year, month, day] = event.date.split("-").map(Number);
  const date = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return `${date} at ${event.time}`;
}

/**
 * Registration call to action for the next event that needs sign-ups.
 *
 * Deliberately louder than anything else on the site: the rest of the page is
 * muted greys with thin red accents, so this is dark, full-bleed and sits
 * above the header's sibling content, making it the first thing on the page.
 * The checkered edge marks it as a race event rather than a generic banner.
 *
 * It disappears by itself once the event ends, so nobody has to remember to
 * take it down.
 */
export default function RegistrationBanner({
  events,
  buildNow,
}: RegistrationBannerProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const reference = now ?? buildNow;

  // Closed events still earn the banner: "it is full" is the answer people
  // are coming to the site for, and saying it loudly prevents the asking.
  const event = events
    .filter((e) => getRegistrationState(e, reference) !== "none")
    .sort(
      (a, b) =>
        parseEventTime(a.date, a.time).getTime() -
        parseEventTime(b.date, b.time).getTime()
    )[0];

  if (!event) return null;

  const state = getRegistrationState(event, reference);
  const full = state === "waitlist";
  const closed = state === "closed";
  const cap = event.capacity;

  // A deadline nobody can see creates no urgency, so state it plainly.
  const closes = event.registrationCloses
    ? (getRegistrationClose(event) as Date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <aside aria-label="Event registration" className="relative bg-charcoal">
      {/* Checkered flag edge */}
      <div
        aria-hidden="true"
        className="h-2 w-full"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%)",
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 8px 8px",
          backgroundColor: "#1c1c1c",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="min-w-0 flex-1 text-center md:text-left">
          {/*
            Yellow once the event is full, red while places remain. Borrowed
            from flag meaning: yellow is caution rather than stop, which is
            what a waitlist is. It also stops the status reading as a plain
            "sign up here" at a glance.
          */}
          <p className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
            <span
              aria-hidden="true"
              className={`w-1.5 h-1.5 rounded-full ${
                closed
                  ? "bg-white/40"
                  : `animate-pulse motion-reduce:animate-none ${
                      full ? "bg-[#f0b429]" : "bg-[#c1272d]"
                    }`
              }`}
            />
            <span
              className={`font-mono text-[10px] font-bold uppercase tracking-[0.28em] ${
                closed
                  ? "text-white/50"
                  : full
                    ? "text-[#f0b429]"
                    : "text-[#e8686d]"
              }`}
            >
              {closed
                ? "Waitlist Closed"
                : full
                  ? "Waitlist Open"
                  : "Registration Open"}
            </span>
          </p>

          <p className="text-xl md:text-2xl font-extrabold tracking-tight text-white leading-tight">
            {event.title}
          </p>
          <p className="text-sm text-white/55 mt-1">
            {formatWhen(event)} · {event.location}
          </p>
          {closed && (
            <p className="text-sm font-semibold text-white/70 mt-1.5">
              At full capacity
            </p>
          )}
          {closes && !closed && (
            <p
              className={`text-sm font-semibold mt-1.5 ${
                full ? "text-[#f0b429]" : "text-[#e8686d]"
              }`}
            >
              {full ? "Waitlist" : "Registration"} closes {closes}
            </p>
          )}
        </div>

        {closed && cap ? (
          /*
             No link once nothing can be accepted: a button that cannot take
             anyone is worse than no button. The figures go in its place
             because "60/60" answers the next question better than "full".
          */
          <div className="shrink-0 flex gap-3 w-full md:w-auto">
            <CapacityStat
              filled={cap.registered}
              total={cap.spots}
              label="Registered"
            />
            <CapacityStat
              filled={cap.waitlisted}
              total={cap.waitlistSpots}
              label="Waitlist"
            />
          </div>
        ) : closed ? null : (
        <a
          href={event.registration}
          target="_blank"
          rel="noopener noreferrer"
          className={`group shrink-0 inline-flex items-center justify-center gap-2 w-full md:w-auto px-7 py-3.5 text-base font-bold rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ${
            full
              ? "bg-[#f0b429] text-charcoal hover:bg-[#d99e1c] active:bg-[#c28c15]"
              : "bg-[#c1272d] text-white hover:bg-[#a81f25] active:bg-[#8e1a1f]"
          }`}
        >
          {full ? "Join waitlist" : "Register"}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
          >
            →
          </span>
        </a>
        )}
      </div>
    </aside>
  );
}

/** One "60 / 60" figure with its label, used when sign-ups have closed. */
function CapacityStat({
  filled,
  total,
  label,
}: {
  filled: number;
  total: number;
  label: string;
}) {
  return (
    <div className="flex-1 md:flex-none md:min-w-[104px] rounded-sm border border-white/15 bg-white/[0.04] px-4 py-2.5 text-center">
      <p className="font-mono text-lg font-bold text-white tabular-nums leading-none">
        {filled}
        <span className="text-white/40"> / {total}</span>
      </p>
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 mt-1.5">
        {label}
      </p>
    </div>
  );
}
