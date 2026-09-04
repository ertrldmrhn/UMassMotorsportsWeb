"use client";

import React, { useEffect, useState } from "react";
import { parseEventTime, getEventEnd } from "@/lib/eventTime";
import type { ClubEvent } from "@/data/events";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type Status = "upcoming" | "ongoing" | "past";

function getStatus(start: Date, end: Date, now: number): Status {
  if (now < start.getTime()) return "upcoming";
  if (now < end.getTime()) return "ongoing";
  return "past";
}

function getTimeLeft(start: Date, now: number): TimeLeft | null {
  const diff = start.getTime() - now;
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS = ["DAYS", "HRS", "MIN", "SEC"] as const;

export default function Countdown({ event }: { event: ClubEvent }) {
  const start = parseEventTime(event.date, event.time);
  const end = getEventEnd(event);

  // null until mounted so the prerendered HTML matches the first client render
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const status = now === null ? "upcoming" : getStatus(start, end, now);
  const timeLeft = now === null ? null : getTimeLeft(start, now);

  if (status === "ongoing") {
    return (
      <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-green-500/15 border border-green-500/25 rounded-sm">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-green-400">
          Ongoing
        </span>
      </div>
    );
  }

  if (status === "past") {
    return (
      <p className="text-sm text-white/50 italic">
        Event is underway or has passed.
      </p>
    );
  }

  const values = timeLeft
    ? [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds]
    : null;

  return (
    <div
      role="timer"
      aria-label="Countdown to event"
      className="relative overflow-hidden bg-black/55 border border-white/[0.13]"
      style={{ borderRadius: "2px" }}
    >
      {/* Red accent line — top edge only */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-[#c1272d]" />

      {/* Header row */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-white/[0.07]">
        <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-white/30 leading-none">
          NEXT SESSION
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/15 leading-none">
          TIMER_01
        </span>
      </div>

      {/* Timing display */}
      <div className="px-3 md:px-6 pt-3.5 pb-3.5 md:pt-4 md:pb-4">
        <div className="flex items-start">

          {/* T− prefix column */}
          <div className="flex flex-col items-center mr-1.5 md:mr-2">
            <span className="font-mono font-bold text-[1rem] md:text-[2rem] text-white/35 leading-none tracking-tight select-none mt-[4px] md:mt-[8px]">
              T−
            </span>
            <span aria-hidden="true" className="text-[8px] mt-1.5 leading-none opacity-0 select-none pointer-events-none">·</span>
          </div>

          {/* Segments */}
          {UNITS.map((unit, i) => (
            <React.Fragment key={unit}>

              {/* Colon separator */}
              {i > 0 && (
                <div className="flex flex-col items-center mx-[2px] md:mx-1">
                  <span
                    aria-hidden="true"
                    className="font-mono font-bold text-[1.7rem] md:text-[3.2rem] text-white/18 leading-none select-none"
                  >
                    :
                  </span>
                  <span aria-hidden="true" className="text-[8px] mt-1.5 leading-none opacity-0 select-none pointer-events-none">·</span>
                </div>
              )}

              {/* Segment column: number + label */}
              <div className="flex flex-col items-center">
                <span
                  key={unit + String(values?.[i] ?? "--")}
                  className="countdown-digit font-mono font-bold tabular-nums text-[#c1272d] text-[1.7rem] md:text-[3.2rem] leading-none"
                >
                  {values ? String(values[i]).padStart(2, "0") : "--"}
                </span>
                <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.22em] text-white/45 mt-1.5 leading-none">
                  {unit}
                </span>
              </div>

            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
