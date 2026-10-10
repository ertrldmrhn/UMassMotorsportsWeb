import Image from "next/image";
import { Mail } from "lucide-react";
import { eboard } from "@/data/eboard";
import { site, meetSpotMapUrl } from "@/lib/site";
import ClubFaq from "@/components/ClubFaq";

export const metadata = {
  title: "About Us",
  description:
    "UMass Motorsports Club has been the student-run car club at UMass Amherst since 1996. Meet the executive board and learn how to join. Open to all students.",
  alternates: { canonical: "/about" },
};

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(" ");
  const initials =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : parts[0].slice(0, 2);
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
      <span className="text-4xl font-bold text-gray-400 select-none">
        {initials.toUpperCase()}
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-14">
      {/* Club overview */}
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-1">About Us</h1>
        <p className="text-sm text-gray-500 mb-6">
          Est. 1996 · Student-run automotive community at UMass Amherst
        </p>
        <div className="prose prose-sm text-gray-600 max-w-2xl space-y-3">
          <p>
            UMass Motorsports is the student-run car club at the University of
            Massachusetts Amherst. Founded in 1996, we have been running
            automotive events in the Pioneer Valley and across western
            Massachusetts for nearly three decades, and we are one of the
            longest-running student car clubs in New England.
          </p>
          <p>
            We run events most weeks of the semester: weekly meets on campus,
            scenic cruises through western Massachusetts, car shows, photography
            nights, karting tournaments and visits to motorsport events around
            the region.
          </p>
          <p>
            Membership is open to every UMass Amherst student and you do not
            need to own a car to join. If you are into cars, you are welcome
            here.
          </p>
          <p>
            We meet at{" "}
            <a
              href={meetSpotMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-umass hover:underline underline-offset-2"
            >
              {site.meetSpot.name}
            </a>
            . Most events start there, including cruises that head out from campus.
          </p>
          <p>
            Questions? Reach us at{" "}
            <a href={`mailto:${site.email}`} className="text-umass hover:underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>

      {/* E-Board */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Executive Board</h2>
        <p className="text-sm text-gray-500 mb-8">
          Your E-Board for 2026-27 academic year.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {eboard.map((member) => (
            <div
              key={member.name}
              className="rounded-lg overflow-hidden border border-gray-200 bg-white hover:border-gray-300 transition-colors"
            >
              {/*
                Photo. The files in public/eboard are pre-cropped to 3:2 around
                each member and their car, so the box is pinned to that same
                aspect. A fixed pixel height would change the box ratio per
                breakpoint and re-crop those framings. object-cover is then
                effectively a no-op and nothing gets clipped at any width.
              */}
              <div className="relative aspect-[3/2] bg-gray-100">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <Initials name={member.name} />
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="font-bold text-gray-900 text-lg leading-tight">
                  {member.name}
                </p>
                <p className="text-sm font-semibold text-umass mt-0.5">
                  {member.role}
                </p>

                {(member.major || member.car) && (
                  <div className="mt-1.5 space-y-0.5">
                    {member.major && (
                      <p className="text-xs text-gray-500">{member.major}</p>
                    )}
                    {member.car && (
                      <p className="text-xs text-gray-400 italic">{member.car}</p>
                    )}
                  </div>
                )}

                {member.bio && (
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                )}

                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-3 flex items-center gap-1.5 text-sm text-gray-400 hover:text-umass transition-colors"
                  >
                    <Mail size={13} />
                    {member.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ClubFaq />
    </div>
  );
}
