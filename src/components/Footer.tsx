import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-6">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 pb-6 border-b border-white/10">
          <div>
            <p className="text-sm font-bold tracking-wide text-white uppercase">
              {site.name}
            </p>
            <p className="text-xs text-white/40 mt-1 leading-relaxed">
              Est. 1996 · Student-run automotive community at UMass Amherst
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/50">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href={site.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Discord
            </a>
            <a
              href={site.campusPulse}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Campus Pulse
            </a>
            <Link href="/photos" className="hover:text-white transition-colors">
              Photos
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-white/25 pt-4">
          © {year} UMass Motorsports Club
        </p>
      </div>
    </footer>
  );
}
