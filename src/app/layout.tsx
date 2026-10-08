import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import OrganizationSchema from "@/components/OrganizationSchema";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // Homepage leads with the terms people actually search ("umass
    // motorsports"), then the qualifier. Other pages fill the %s.
    default: "UMass Motorsports Club | UMass Amherst Car Club",
    template: "%s | UMass Motorsports Club",
  },
  description:
    "The student-run car club at UMass Amherst. Weekly meets, cruises through the Berkshires and Mohawk Trail, car shows and track visits. Open to all UMass students, no car required. Est. 1996.",
  keywords: [
    "UMass Motorsports",
    "UMass Amherst car club",
    "UMass Motorsports Club",
    "UMass Amherst motorsports",
    "car club UMass",
    "UMass Amherst cruises",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "UMass Motorsports Club",
    title: "UMass Motorsports Club | UMass Amherst Car Club",
    description:
      "The student-run car club at UMass Amherst. Weekly meets, cruises, car shows and track visits. Open to all students, no car required.",
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "UMass Motorsports Club | UMass Amherst Car Club",
    description:
      "The student-run car club at UMass Amherst. Weekly meets, cruises, car shows and track visits.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col text-gray-900 antialiased">
        <OrganizationSchema />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
