import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

export const metadata = {
  title: "Forms",
  description:
    "Sign-ups and enquiries for UMass Motorsports Club, including cruise attendance and sponsorship.",
  alternates: { canonical: "/forms" },
};

interface FormLink {
  title: string;
  blurb: string;
  href: string;
  external: boolean;
}

/**
 * Everything we ask members to fill in, in one findable place. Add new forms
 * here and they show up on the page. Contextual prompts elsewhere (the
 * schedule, the homepage) still link straight to the form they relate to, so
 * someone already in that context does not have to detour through this page.
 */
const forms: FormLink[] = [
  ...(site.cruiseForm
    ? [
        {
          title: "Cruise attendance",
          blurb:
            "UMass asks us for a list of who's coming on each cruise. Add your name and pick the ones you expect to make.",
          href: site.cruiseForm,
          external: true,
        },
      ]
    : []),
  {
    title: "Sponsorship enquiry",
    blurb:
      "For businesses interested in supporting the club. Tell us about your interest and we'll follow up within a few days.",
    href: "/sponsors",
    external: false,
  },
];

export default function FormsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-1">
        Forms
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Sign-ups and enquiries, all in one place.
      </p>

      <div className="space-y-3">
        {forms.map((form) => {
          const inner = (
            <>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-gray-900 group-hover:text-umass transition-colors">
                  {form.title}
                </span>
                <span className="block text-xs text-gray-500 mt-1 leading-relaxed">
                  {form.blurb}
                </span>
              </span>
              {form.external ? (
                <ArrowUpRight
                  size={18}
                  className="shrink-0 mt-0.5 text-gray-300 group-hover:text-umass transition-colors"
                  aria-hidden="true"
                />
              ) : (
                <ArrowRight
                  size={18}
                  className="shrink-0 mt-0.5 text-gray-300 group-hover:text-umass transition-colors"
                  aria-hidden="true"
                />
              )}
            </>
          );

          const className =
            "group flex items-start justify-between gap-4 rounded-lg border border-gray-200 bg-white border-l-2 border-l-umass px-5 py-4 hover:border-umass/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-umass/40";

          return form.external ? (
            <a
              key={form.title}
              href={form.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {inner}
            </a>
          ) : (
            <Link key={form.title} href={form.href} className={className}>
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
