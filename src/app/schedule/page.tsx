import { events } from "@/data/events";
import EventCard from "@/components/EventCard";

export const metadata = {
  title: "Schedule | UMass Motorsports Club",
};

export default function SchedulePage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.filter((e) => new Date(e.date) >= today);
  const past = sorted.filter((e) => new Date(e.date) < today).reverse();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule</h1>
      <p className="text-sm text-gray-500 mb-8">
        All events for the current season.
      </p>

      {upcoming.length > 0 ? (
        <section className="space-y-4 mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Upcoming
          </h2>
          {upcoming.map((event, i) => (
            <EventCard key={i} event={event} />
          ))}
        </section>
      ) : (
        <p className="text-gray-500 text-sm mb-12">
          No upcoming events. Check back soon.
        </p>
      )}

      {past.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Past Events
          </h2>
          {past.map((event, i) => (
            <EventCard key={i} event={event} past />
          ))}
        </section>
      )}
    </div>
  );
}
