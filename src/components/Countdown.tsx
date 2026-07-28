"use client";

import { useEffect, useState } from "react";

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
      <p className="text-sm text-white/50 italic">
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
    <div className="flex gap-3" role="timer" aria-label="Countdown to event">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="bg-black/35 border border-white/[0.08] rounded-sm px-3 py-2 min-w-[62px] md:min-w-[72px] text-center">
            <span className="block text-4xl md:text-5xl font-bold tabular-nums text-red-400 leading-none">
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] text-white/40 uppercase tracking-widest">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
