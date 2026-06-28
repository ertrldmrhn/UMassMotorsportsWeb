import Image from "next/image";
import { Mail } from "lucide-react";
import { eboard } from "@/data/eboard";

export const metadata = {
  title: "E-Board | UMass Motorsports Club",
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

export default function EBoardPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Meet the E-Board</h1>
      <p className="text-sm text-gray-400 mb-10">
        The executive board for the current academic year.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {eboard.map((member) => (
          <div
            key={member.name}
            className="rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
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
    </div>
  );
}
