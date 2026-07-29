import Image from "next/image";
import { Mail } from "lucide-react";
import { eboard } from "@/data/eboard";
import { site } from "@/lib/site";

export const metadata = {
  title: "About Us | UMass Motorsports Club",
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
            UMass Motorsports is a student organization at the University of Massachusetts
            Amherst dedicated to all things automotive. Founded in 1996, we bring together
            students who share a passion for cars.
          </p>
          <p>
            We host cruises, meetups, car shows, and community build days throughout
            the academic year. Membership is open to all UMass students regardless of
            car ownership. If you&apos;re into cars, you&apos;re welcome here.
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
              {/* Photo */}
              <div className="relative h-52 bg-gray-100">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
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
    </div>
  );
}
