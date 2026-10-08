import { events } from "@/data/events";
import { parseEventTime, getEventEnd } from "@/lib/eventTime";
import { site } from "@/lib/site";

/**
 * JSON-LD structured data. Two jobs:
 *
 * 1. Tell Google this site IS the UMass Motorsports Club, and that the
 *    Instagram / Discord / Campus Pulse profiles are the same organisation.
 *    `sameAs` is how those separately-ranking profiles get associated with us
 *    rather than competing as unrelated results.
 * 2. Describe upcoming events, which are eligible for event rich results.
 *
 * Rendered server-side into the static HTML, so crawlers see it without
 * running any JavaScript.
 */
export default function OrganizationSchema() {
  const org = {
    "@type": "SportsOrganization",
    "@id": `${site.url}/#organization`,
    name: "UMass Motorsports Club",
    alternateName: [
      "UMass Amherst Motorsports Club",
      "UMass Motorsports",
      "UMass Amherst Car Club",
    ],
    url: site.url,
    logo: `${site.url}/logo.png`,
    email: site.email,
    foundingDate: "1996",
    description:
      "The student-run car club at UMass Amherst. Weekly meets, cruises, car shows and track visits. Open to all UMass students.",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "University of Massachusetts Amherst",
      url: "https://www.umass.edu",
    },
    location: {
      "@type": "Place",
      name: "University of Massachusetts Amherst",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Amherst",
        addressRegion: "MA",
        addressCountry: "US",
      },
    },
    sameAs: [site.instagram, site.discord, site.campusPulse].filter(Boolean),
  };

  // Only future events; past ones add noise and can't earn rich results.
  const now = Date.now();
  const upcoming = events
    .filter((e) => getEventEnd(e).getTime() > now)
    .sort(
      (a, b) =>
        parseEventTime(a.date, a.time).getTime() -
        parseEventTime(b.date, b.time).getTime()
    )
    .map((e) => ({
      "@type": "Event",
      name: e.title,
      startDate: parseEventTime(e.date, e.time).toISOString(),
      endDate: getEventEnd(e).toISOString(),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      ...(e.description ? { description: e.description } : {}),
      ...(e.image ? { image: `${site.url}${e.image}` } : {}),
      location: {
        "@type": "Place",
        name: e.location,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Amherst",
          addressRegion: "MA",
          addressCountry: "US",
        },
      },
      organizer: { "@id": `${site.url}/#organization` },
      isAccessibleForFree: true,
    }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      org,
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: "UMass Motorsports Club",
        publisher: { "@id": `${site.url}/#organization` },
      },
      ...upcoming,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        /*
          Content comes from our own data files, never user input. `<` is still
          escaped so a stray "</script>" in an event title could not break out
          of the tag; JSON treats < as identical to "<".
        */
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
