import { site } from "@/lib/site";
import { Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-400">
          © {year} UMass Motorsports Club
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-500">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 transition-colors"
          >
            Instagram
          </a>
          <a
            href={site.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 transition-colors"
          >
            Discord
          </a>
          <a
            href={site.campusPulse}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 transition-colors"
          >
            Campus Pulse
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-1.5 hover:text-gray-800 transition-colors"
          >
            <Mail size={13} />
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
