import Link from "next/link";
import Image from "next/image";
import { events, type ClubEvent } from "@/data/events";

function formatShortDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function EventCard({ event }: { event: ClubEvent }) {
  const href = event.link ?? "/schedule";

  return (
    <Link
      href={href}
      {...(event.link ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative flex-1 min-w-0 overflow-hidden rounded-sm min-h-[180px] md:min-h-[220px] flex flex-col justify-end border-l-2 border-umass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-umass/50"
    >
      {/* Background */}
      {event.image ? (
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-charcoal" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse at top right, #6b1616 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 transition-opacity duration-300 group-hover:from-black/80 group-hover:via-black/40 motion-reduce:transition-none" />

      {/* Content */}
      <div className="relative z-10 px-4 pb-4 pt-8">
        <p className="text-white font-bold text-sm md:text-base leading-snug line-clamp-2 mb-1">
          {event.title}
        </p>
        <p className="text-white/55 text-xs">
          {formatShortDate(event.date)}
        </p>
      </div>
    </Link>
  );
}

export default function UpcomingEvents({ excludeDate }: { excludeDate: string }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allUpcoming = events.filter((e) => new Date(e.date) >= today);
  const totalCount = allUpcoming.length;

  const preview = allUpcoming
    .filter((e) => e.date !== excludeDate)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  if (preview.length === 0) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 pb-10">
      {/* Section header */}
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[10px] uppercase tracking-[0.22em] text-gray-400 font-medium">
          Upcoming
        </span>
        <Link
          href="/schedule"
          className="hidden md:inline text-xs text-gray-400 hover:text-umass transition-colors hover:underline underline-offset-2"
        >
          View Full Schedule →
        </Link>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-3">
        {preview.map((event) => (
          <EventCard key={event.date + event.title} event={event} />
        ))}
      </div>

      {/* Mobile-only footer */}
      <div className="md:hidden mt-7 flex flex-col items-center gap-1.5">
        <Link
          href="/schedule"
          className="group inline-flex items-center gap-1 text-[15px] font-medium text-gray-400 hover:text-umass transition-colors"
        >
          See all {totalCount} upcoming events
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none">
            →
          </span>
        </Link>
        <p className="text-xs text-gray-400/70">
          View the complete semester schedule
        </p>
      </div>
    </div>
  );
}
