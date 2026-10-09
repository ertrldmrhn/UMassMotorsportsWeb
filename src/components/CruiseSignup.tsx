import { site } from "@/lib/site";

/**
 * Prompt to sign up for cruise attendance. UMass asks for an attendee list, so
 * this needs to be findable without shouting over the rest of the page.
 *
 * `tone="panel"` is the schedule's version, sitting with the other notices.
 * `tone="hero"` is the homepage button, beside "View Full Schedule", shown only
 * when a cruise is actually among the next few events.
 */
export default function CruiseSignup({
  tone = "panel",
}: {
  tone?: "panel" | "hero";
}) {
  if (!site.cruiseForm) return null;

  /*
    Hero sits on a dark photo beside the solid white "View Full Schedule".
    Outlined rather than filled so the two read as primary and secondary
    instead of competing for the same emphasis.
  */
  if (tone === "hero") {
    return (
      <a
        href={site.cruiseForm}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded border border-white/35 text-white text-sm font-semibold hover:bg-white/10 hover:border-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        Cruise sign-up
        <span
          aria-hidden="true"
          className="text-white/70 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
        >
          ↗
        </span>
      </a>
    );
  }

  return (
    <a
      href={site.cruiseForm}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-umass/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-umass/40"
    >
      <span className="mt-0.5 shrink-0">
        <CruiseDot />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-gray-900 group-hover:text-umass transition-colors">
          Attending a cruise? Add your name
          <span
            aria-hidden="true"
            className="inline-block ml-1 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
          >
            →
          </span>
        </span>
        <span className="block text-xs text-gray-500 mt-0.5 leading-relaxed">
          UMass asks us for a list of who&apos;s coming. Tell us which cruises
          you expect to make. It takes a minute.
        </span>
      </span>
    </a>
  );
}

/** Small red marker tying the prompt to the cruise badges on event cards. */
function CruiseDot() {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-1.5 h-1.5 rounded-full bg-umass shrink-0"
    />
  );
}
