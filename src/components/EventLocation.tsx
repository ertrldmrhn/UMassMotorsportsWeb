import { site, meetSpotMapUrl } from "@/lib/site";

/**
 * Renders an event's location, linked to a map when it's the club meet spot.
 *
 * Only the meet spot links: "TBD" and anywhere else stay plain text, so a link
 * never promises directions we can't actually give. Matching on the exact
 * `site.meetSpot.name` string keeps that decision in one place.
 */
export default function EventLocation({
  location,
  tone = "card",
}: {
  location: string;
  tone?: "card" | "hero";
}) {
  if (location !== site.meetSpot.name) return <>{location}</>;

  return (
    <a
      href={meetSpotMapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={
        tone === "hero"
          ? "underline decoration-white/30 underline-offset-2 hover:decoration-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
          : "underline decoration-gray-300 underline-offset-2 hover:text-umass hover:decoration-umass transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-umass/40 rounded-sm touch:text-umass touch:decoration-umass/60"
      }
    >
      {location}
    </a>
  );
}
