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
      className={`border rounded-lg p-5 ${
        past ? "opacity-50 border-gray-200" : "border-gray-300"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3
          className={`text-lg font-semibold ${
            past ? "text-gray-500" : "text-gray-900"
          }`}
        >
          {event.title}
        </h3>
        {past && (
          <span className="text-xs text-gray-400 border border-gray-200 rounded px-2 py-0.5">
            Past
          </span>
        )}
      </div>

      <div className="mt-2 space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-700">Date:</span>{" "}
          {formatDate(event.date)}
        </p>
        <p>
          <span className="font-medium text-gray-700">Time:</span> {event.time}
        </p>
        <p>
          <span className="font-medium text-gray-700">Location:</span>{" "}
          {event.location}
        </p>
      </div>

      {event.description && (
        <p className="mt-3 text-sm text-gray-600">{event.description}</p>
      )}

      {event.link && (
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-red-800 hover:underline"
        >
          More info →
        </a>
      )}
    </div>
  );
}
