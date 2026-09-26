import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { events } from "@/data/events";
import { site } from "@/lib/site";

export const metadata = {
  title: "Photos | UMass Motorsports Club",
};

function formatShortDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PhotosPage() {
  // Google Photos can't be embedded (it sends X-Frame-Options: SAMEORIGIN), so
  // rather than a bare link on an empty page, preview the event photos we
  // already have and send people to the album for the rest.
  const shots = events
    .filter((e) => e.image)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-1">
        Photos
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Shots from the season. The full archive lives in our shared album.
      </p>

      {/* Preview mosaic */}
      {shots.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {shots.map((event) => (
            <div
              key={event.date + event.title}
              className="group relative aspect-[3/2] overflow-hidden rounded-sm border-l-2 border-umass"
            >
              <Image
                src={event.image as string}
                alt={event.title}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-white text-xs md:text-sm font-bold leading-snug line-clamp-2">
                  {event.title}
                </p>
                <p className="text-white/55 text-[11px] mt-0.5">
                  {formatShortDate(event.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full album */}
      <a
        href={site.googlePhotos}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-5 py-4 hover:border-umass/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-umass/40"
      >
        <span>
          <span className="block text-sm font-semibold text-gray-900 group-hover:text-umass transition-colors">
            View the full album
          </span>
          <span className="block text-xs text-gray-400 mt-0.5">
            Every event, hosted on Google Photos
          </span>
        </span>
        <ArrowUpRight
          size={18}
          className="shrink-0 text-gray-300 group-hover:text-umass transition-colors"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
