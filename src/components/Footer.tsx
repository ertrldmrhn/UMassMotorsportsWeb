import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>
          © {year} {site.name}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
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
            className="hover:text-gray-800 transition-colors"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
