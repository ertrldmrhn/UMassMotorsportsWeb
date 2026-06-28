import Link from "next/link";
import { events } from "@/data/events";
import { site } from "@/lib/site";
import Countdown from "@/components/Countdown";
import LinkButton from "@/components/LinkButton";

function getNextEvent() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    events
      .filter((e) => new Date(e.date) >= today)
      .sort((a, b) => a.date.localeCompare(b.date))[0] ?? null
  );
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

const importantLinks = [
  { label: "Instagram", href: site.instagram },
  { label: "Discord", href: site.discord },
  { label: "Campus Pulse", href: site.campusPulse },
  { label: "Google Drive", href: site.googleDrive },
  { label: "Email Us", href: `mailto:${site.email}` },
];

export default function HomePage() {
  const nextEvent = getNextEvent();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      {/* Important Links */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Links
        </h2>
        <div className="flex flex-wrap gap-2">
          {importantLinks.map((link) => (
            <LinkButton
              key={link.label}
              href={link.href}
              label={link.label}
              external={!link.href.startsWith("mailto:")}
            />
          ))}
        </div>
      </section>

      {/* Next Event */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Next Event
        </h2>

        {nextEvent ? (
          <div className="border border-gray-200 rounded-xl p-6 space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">{nextEvent.title}</h3>

            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-800">Date:</span>{" "}
                {formatDate(nextEvent.date)}
              </p>
              <p>
                <span className="font-medium text-gray-800">Time:</span>{" "}
                {nextEvent.time}
              </p>
              <p>
                <span className="font-medium text-gray-800">Location:</span>{" "}
                {nextEvent.location}
              </p>
            </div>

            {nextEvent.description && (
              <p className="text-sm text-gray-600">{nextEvent.description}</p>
            )}

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                Countdown
              </p>
              <Countdown
                targetDate={nextEvent.date}
                targetTime={nextEvent.time}
              />
            </div>

            {nextEvent.link && (
              <a
                href={nextEvent.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-red-800 hover:underline"
              >
                More info →
              </a>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No upcoming events scheduled. Check back soon.
          </p>
        )}

        <div className="mt-4">
          <Link
            href="/schedule"
            className="text-sm font-medium text-red-800 hover:underline"
          >
            View full schedule →
          </Link>
        </div>
      </section>
    </div>
  );
}
