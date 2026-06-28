"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/eboard", label: "E-Board" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* Logo — left-anchored */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="UMass Motorsports Club"
            width={150}
            height={38}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav — centered in middle column */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-umass transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Discord CTA (desktop) + hamburger (mobile) */}
        <div className="flex items-center justify-end gap-3">
          <a
            href={site.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-umass text-white text-sm font-semibold rounded-lg hover:bg-umass-dark transition-colors"
          >
            Join Discord
          </a>
          <button
            className="md:hidden p-2 rounded text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col px-4 py-3 gap-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm font-medium text-gray-700 hover:text-umass border-b border-gray-50 last:border-0 transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 py-3 bg-umass text-white text-sm font-semibold rounded-lg text-center hover:bg-umass-dark transition-colors"
              onClick={() => setOpen(false)}
            >
              Join Discord
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
