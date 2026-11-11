import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export const metadata = {
  title: "Photos",
  description:
    "Every UMass Motorsports Club event photo lives in our shared Google Photos album: cruises, meets and car shows around UMass Amherst and western Massachusetts.",
  alternates: { canonical: "/photos" },
};

/**
 * Official Google Photos pinwheel, marking the album link so the destination
 * is recognisable before the label is read.
 *
 * The source asset is the full lockup on a 3840x2160 canvas; it's cropped to
 * the symbol alone because the card's own heading already says "Google
 * Photos", and the wordmark would repeat it.
 */
function GooglePhotosIcon({ size = 34 }: { size?: number }) {
  return (
    <Image
      src="/Google-Photos-Symbol.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className="shrink-0"
    />
  );
}

export default function PhotosPage() {
  // The site doesn't host the photo archive; Google Photos does, and it can't
  // be embedded either (it sends X-Frame-Options: SAMEORIGIN). So this page
  // has one job: hand people the album.
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-1">
        Photos
      </h1>
      <p className="text-sm text-gray-500 mb-6 max-w-2xl">
        We don&apos;t host photos on this site. The full archive lives in the
        club&apos;s shared album.
      </p>

      <a
        href={site.googlePhotos}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-5 py-5 hover:border-umass/40 hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-umass/40"
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
    </div>
  );
}
