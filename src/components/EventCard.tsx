import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { ClubEvent } from "@/data/events";

interface EventCardProps {
  event: ClubEvent;
  past?: boolean;
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

export default function EventCard({ event, past = false }: EventCardProps) {
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
            quality={90}
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
          {past && (
            <span className="text-[11px] font-medium text-gray-400 border border-gray-200 rounded px-2 py-0.5 shrink-0 uppercase tracking-wide">
              Past
            </span>
          )}
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
            {event.location}
          </span>
        </div>

        {event.description && (
          <p className="text-sm text-gray-500 leading-relaxed">
            {event.description}
          </p>
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
