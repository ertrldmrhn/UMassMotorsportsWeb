import Image from "next/image";
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
    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-500 shrink-0">
      {initials.toUpperCase()}
    </div>
  );
}

export default function EBoardPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Meet the E-Board</h1>
      <p className="text-sm text-gray-500 mb-8">
        The executive board for the current academic year.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {eboard.map((member) => (
          <div
            key={member.name}
            className="flex gap-4 border border-gray-200 rounded-xl p-5"
          >
            {/* Photo or initials */}
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover shrink-0"
              />
            ) : (
              <Initials name={member.name} />
            )}

            <div className="min-w-0">
              <p className="font-semibold text-gray-900">{member.name}</p>
              <p className="text-sm text-red-800 font-medium">{member.role}</p>

              {member.bio && (
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              )}

              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="mt-2 block text-sm text-gray-500 hover:text-gray-800 truncate"
                >
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
