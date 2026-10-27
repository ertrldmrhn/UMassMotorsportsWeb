import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { ClubEvent } from "@/data/events";
import EventLocation from "@/components/EventLocation";

interface EventCardProps {
  event: ClubEvent;
  past?: boolean;
  /**
   * Whether sign-ups are still open. Decided by the caller rather than here:
   * this is a server component, so in a static export its clock would freeze
   * at build time and the Register button would never retire.
   */
  registrationOpen?: boolean;
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EventCard({
  event,
  past = false,
  registrationOpen = false,
}: EventCardProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row overflow-hidden rounded-lg border bg-white transition-colors ${
        past
          ? "border-gray-100 opacity-55"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Thumbnail or left accent bar */}
      {event.image ? (
        <div className="relative h-48 sm:h-auto sm:w-52 shrink-0">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 208px"
          />
        </div>
      ) : (
        <div className="hidden sm:block w-1 bg-umass shrink-0" />
      )}

      {/* Info */}
      <div className="flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3
            className={`font-bold text-lg leading-tight tracking-tight ${
              past ? "text-gray-400" : "text-gray-900"
            }`}
          >
            {event.title}
          </h3>
          <span className="flex items-center gap-1.5 shrink-0">
            {/* Ties the card to the cruise sign-up prompt above the list. */}
            {event.cruise && !past && (
              <span className="text-[11px] font-medium text-umass border border-umass/25 bg-umass/5 rounded px-2 py-0.5 uppercase tracking-wide">
                Cruise
              </span>
            )}
            {past && (
              <span className="text-[11px] font-medium text-gray-400 border border-gray-200 rounded px-2 py-0.5 uppercase tracking-wide">
                Past
              </span>
            )}
          </span>
        </div>

        <div className="flex flex-col gap-1 text-sm text-gray-400 mb-3">
          <span className="flex items-center gap-2">
            <Calendar size={13} className="text-umass shrink-0" />
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={13} className="text-umass shrink-0" />
            {event.time}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={13} className="text-umass shrink-0" />
            <EventLocation location={event.location} />
          </span>
        </div>

        {event.description && (
          <p className="text-sm text-gray-500 leading-relaxed">
            {event.description}
          </p>
        )}

        {/* Sign-ups are also reachable from here, not just the homepage banner. */}
        {event.registration && registrationOpen && !past && (
          <a
            href={event.registration}
            target="_blank"
            rel="noopener noreferrer"
            className={`group mt-4 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-umass/40 ${
              event.registrationFull ? "bg-[#f0b429] text-charcoal hover:bg-[#d99e1c]" : "bg-[#c1272d] text-white hover:bg-[#a81f25]"
            }`}
          >
            {event.registrationFull ? "Join waitlist" : "Register"}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
            >
              →
            </span>
          </a>
        )}

        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-umass hover:underline"
          >
            More info →
          </a>
        )}
      </div>
    </div>
  );
}
