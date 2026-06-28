"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string; // ISO 8601: "2026-09-13"
  targetTime?: string; // "9:00 AM" — if omitted, counts to midnight
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
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ targetDate, targetTime }: CountdownProps) {
  const target = parseTarget(targetDate, targetTime);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    getTimeLeft(target)
  );

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!timeLeft) {
    return (
      <p className="text-sm text-white/60 italic">
        Event is underway or has passed.
      </p>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-5">
      {units.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="text-4xl md:text-5xl font-bold tabular-nums text-red-400 leading-none">
            {String(value).padStart(2, "0")}
          </div>
          <div className="text-xs text-white/50 uppercase tracking-widest mt-2">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
