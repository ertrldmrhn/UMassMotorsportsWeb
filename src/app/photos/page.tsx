import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { events } from "@/data/events";
import { site } from "@/lib/site";

export const metadata = {
  title: "Photos",
  description:
    "Every UMass Motorsports Club event photo lives in our shared Google Photos album: cruises, meets and car shows around UMass Amherst and western Massachusetts.",
  alternates: { canonical: "/photos" },
};

function formatShortDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Google Photos pinwheel. Used to mark the album link as a Google Photos
 * destination, so it's obvious at a glance where the link goes before anyone
 * reads the label.
 */
function GooglePhotosIcon({ size = 34 }: { size?: number }) {
  // One blade, rotated four times around the centre.
  const blade = "M7 12V5.5a2.5 2.5 0 0 1 5 0V12H7z";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d={blade} fill="#4285F4" />
      <path d={blade} fill="#EA4335" transform="rotate(90 12 12)" />
      <path d={blade} fill="#FBBC04" transform="rotate(180 12 12)" />
      <path d={blade} fill="#34A853" transform="rotate(270 12 12)" />
    </svg>
  );
}

export default function PhotosPage() {
  // The site doesn't host the photo archive; Google Photos does. Google Photos
  // also can't be embedded (it sends X-Frame-Options: SAMEORIGIN), so the album
  // link is the main event here and the grid below is only a taste of it.
  const shots = events
    .filter((e) => e.image)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-1">
        Photos
      </h1>
      <p className="text-sm text-gray-500 mb-6 max-w-2xl">
        We don&apos;t host photos on this site. The full archive lives in the
        club&apos;s shared album.
      </p>

      {/* The album, front and centre. This is the point of the page. */}
      <a
        href={site.googlePhotos}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-5 py-5 mb-10 hover:border-umass/40 hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-umass/40"
      >
        <GooglePhotosIcon />
        <span className="min-w-0 flex-1">
          <span className="block text-base font-bold text-gray-900 group-hover:text-umass transition-colors">
            Open the album on Google Photos
          </span>
          <span className="block text-sm text-gray-500 mt-0.5 leading-relaxed">
            Google Photos is our shared drive, and everything from our events
            gets uploaded there. If you have photos or footage of your own,
            please add them to the album.
          </span>
        </span>
        <ArrowUpRight
          size={20}
          className="shrink-0 text-gray-300 group-hover:text-umass group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all motion-reduce:transition-none"
          aria-hidden="true"
        />
      </a>

      {/* Sample only. Deliberately not presented as a gallery. */}
      {shots.length > 0 && (
        <section>
          <h2 className="text-[10px] uppercase tracking-[0.22em] text-gray-400 font-medium mb-3">
            A few shots from this season
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {shots.map((event) => (
              <div
                key={event.date + event.title}
                className="relative aspect-[3/2] overflow-hidden rounded-sm border-l-2 border-umass"
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

          <p className="text-xs text-gray-400 mt-4">
            These are just the event headers used around the site.{" "}
            <a
              href={site.googlePhotos}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-umass hover:underline underline-offset-2"
            >
              The album has the rest
            </a>
            .
          </p>
        </section>
      )}
    </div>
  );
}
