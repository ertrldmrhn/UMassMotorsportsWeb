import { site } from "@/lib/site";

export const metadata = {
  title: "Sponsors | UMass Motorsports Club",
};

export default function SponsorsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Banner — TODO: Add a club photo to /public/images/sponsors-banner.jpg and uncomment the Image below */}
      <div className="relative rounded-2xl overflow-hidden h-52 md:h-64 mb-12 bg-charcoal">
        {/* <Image src="/images/sponsors-banner.jpg" alt="UMass Motorsports" fill className="object-cover" /> */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at bottom left, rgba(136,28,28,0.45) 0%, transparent 65%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">
            UMass Motorsports Club
          </p>
          <p className="text-2xl font-bold text-white">Est. 1996</p>
          <p className="text-sm text-white/55 mt-1">
            Student-run motorsports at UMass Amherst
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {/* Intro */}
        <section>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
            Support UMass Motorsports
          </h1>
          <p className="text-gray-500 leading-relaxed">
            We&apos;re a student-run club hosting car shows, weekly meets, cruises and tournaments. Every sponsor helps us keep the club on the road.
          </p>
        </section>

        {/* Two-column benefits */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-umass mb-3">
              What your support funds
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Event registration
              </li>
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Equipment
              </li>
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Tournaments
              </li>
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Consumables
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-umass mb-3">
              What sponsors receive
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Logo on merchandise
              </li>
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Logo on our website
              </li>
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Social Media posts
              </li>
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Event shout-outs &amp; mentions
              </li>
            </ul>
          </div>
        </section>

        {/* Contact form — hosted by Google Forms, embedded here */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Get in touch</h2>
          <p className="text-sm text-gray-400 mb-6">
            Interested in sponsoring? Fill out the form and we&apos;ll follow up within a few days.
          </p>

          {site.sponsorForm ? (
            <>
              <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                <iframe
                  src={site.sponsorForm}
                  title="Sponsorship enquiry form"
                  height={site.sponsorFormHeight}
                  className="w-full block"
                  loading="lazy"
                >
                  Loading form…
                </iframe>
              </div>

              {/*
                The embed can be blocked by tracker-blocking extensions or
                strict privacy settings, which fail silently as a blank frame.
                Always offer a way through that does not depend on the iframe.
              */}
              <p className="mt-4 text-sm text-gray-400">
                Form not loading?{" "}
                <a
                  href={site.sponsorForm.replace("?embedded=true", "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-umass hover:underline underline-offset-2"
                >
                  Open it in a new tab
                </a>{" "}
                or email us at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-umass hover:underline underline-offset-2"
                >
                  {site.email}
                </a>
                .
              </p>
            </>
          ) : (
            /* No form configured yet — never render a broken frame. */
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-500 leading-relaxed">
                Our sponsorship form is on its way. In the meantime, email us at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-umass hover:underline underline-offset-2"
                >
                  {site.email}
                </a>{" "}
                and we&apos;ll follow up within a few days.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
