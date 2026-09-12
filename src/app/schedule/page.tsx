import { Info } from "lucide-react";
import { events } from "@/data/events";
import { site } from "@/lib/site";
import ScheduleList from "@/components/ScheduleList";

export const metadata = {
  title: "Schedule | UMass Motorsports Club",
};

export default function SchedulePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-1">Schedule</h1>
      <p className="text-sm text-gray-500 mb-5">
        All events for the Fall 2026 semester.
      </p>

      {/* Schedule-change notice */}
      <div className="mb-10 flex items-start gap-2.5 rounded-lg border border-gray-200 bg-white px-4 py-3">
        <Info size={15} className="text-umass shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm text-gray-500 leading-relaxed">
          All events are subject to change. Follow our{" "}
          <a
            href={site.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-umass hover:underline underline-offset-2"
          >
            Discord
          </a>{" "}
          and{" "}
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-umass hover:underline underline-offset-2"
          >
            Instagram
          </a>{" "}
          for the latest updates.
        </p>
      </div>

      {/*
        The past/upcoming split is done client-side: this is a static export, so
        anything computed here would freeze at build time and never grey out.
      */}
      <ScheduleList events={events} buildNow={Date.now()} />
    </div>
  );
}
