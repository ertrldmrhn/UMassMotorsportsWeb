"use client";

import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string;
  targetTime?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function parseTarget(date: string, time?: string): Date {
  if (!time) return new Date(`${date}T00:00:00`);
  const [year, month, day] = date.split("-").map(Number);
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return new Date(`${date}T00:00:00`);
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return new Date(year, month - 1, day, hours, minutes, 0);
}

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS = ["DAYS", "HRS", "MIN", "SEC"] as const;

export default function Countdown({ targetDate, targetTime }: CountdownProps) {
  const target = parseTarget(targetDate, targetTime);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!timeLeft) {
    return (
      <p className="text-sm text-white/50 italic">
        Event is underway or has passed.
      </p>
    );
  }

  const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];

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
        {/*
          Layout: [T−] [DAY] [:] [HRS] [:] [MIN] [:] [SEC]
          Each column is flex-col with number on top, label below.
          Colon columns include an invisible label-height spacer to keep baselines aligned.
        */}
        <div className="flex items-start">

          {/* T− prefix column */}
          <div className="flex flex-col items-center mr-1.5 md:mr-2">
            <span className="font-mono font-bold text-[1rem] md:text-[2rem] text-white/35 leading-none tracking-tight select-none mt-[4px] md:mt-[8px]">
              T−
            </span>
            {/* Spacer matching label height so the row stays aligned */}
            <span aria-hidden="true" className="text-[8px] mt-1.5 leading-none opacity-0 select-none pointer-events-none">·</span>
          </div>

          {/* Segments */}
          {values.map((val, i) => (
            <React.Fragment key={UNITS[i]}>

              {/* Colon separator */}
              {i > 0 && (
                <div className="flex flex-col items-center mx-[2px] md:mx-1">
                  <span
                    aria-hidden="true"
                    className="font-mono font-bold text-[1.7rem] md:text-[3.2rem] text-white/18 leading-none select-none"
                  >
                    :
                  </span>
                  {/* Spacer matching label height */}
                  <span aria-hidden="true" className="text-[8px] mt-1.5 leading-none opacity-0 select-none pointer-events-none">·</span>
                </div>
              )}

              {/* Segment column: number + label */}
              <div className="flex flex-col items-center">
                <span
                  key={UNITS[i] + String(val)}
                  className="countdown-digit font-mono font-bold tabular-nums text-[#c1272d] text-[1.7rem] md:text-[3.2rem] leading-none"
                >
                  {String(val).padStart(2, "0")}
                </span>
                <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.22em] text-white/45 mt-1.5 leading-none">
                  {UNITS[i]}
                </span>
              </div>

            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
