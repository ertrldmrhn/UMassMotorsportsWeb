import { notFound } from "next/navigation";
import { FinalResults } from "@/components/LiveResults";
import { pastTournamentHref, pastTournaments } from "@/lib/pastResults";

export const dynamicParams = false;

export function generateStaticParams() {
  return pastTournaments.map((t) => ({ slug: t.slug }));
}

const find = (slug: string) => pastTournaments.find((t) => t.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const t = find((await params).slug);
  if (!t) return {};
  const champion = t.feed.podium[0]?.name;
  return {
    title: t.title,
    description: `Final results from the UMass Motorsports ${t.title} at ${t.feed.event.venue}${champion ? `. Champion: ${champion}` : ""}. Podium, qualifying, quarterfinals, semifinals and the final.`,
    alternates: { canonical: pastTournamentHref(t) },
  };
}

export default async function PastTournamentPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = find((await params).slug);
  if (!t) notFound();
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10">
      <FinalResults tournament={t} />
    </div>
  );
}
