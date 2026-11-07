import LiveResults from "@/components/LiveResults";

export const metadata = {
  title: "Live Results",
  description: "Live standings, groups and results from the UMass Motorsports go-kart tournament at Pioneer Valley Indoor Karting.",
  alternates: { canonical: "/live" },
};

export default function LivePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10">
      <LiveResults />
    </div>
  );
}
