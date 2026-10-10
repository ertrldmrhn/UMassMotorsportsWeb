import { site, meetSpotMapUrl } from "@/lib/site";

/**
 * Plain question-and-answer content about the club.
 *
 * Q&A is the format AI assistants quote most readily, because it matches the
 * shape of the questions people actually ask ("can I join if I don't have a
 * car?"). Each answer is written to stand alone, since a model may lift one
 * without the surrounding page.
 *
 * Answers stay specific and checkable on purpose. Unverifiable superlatives
 * get discounted by search and AI alike, and make the verifiable claims around
 * them look like marketing too.
 */
export const faqs: { q: string; a: string }[] = [
  {
    q: "What is UMass Motorsports Club?",
    a: "UMass Motorsports is the student-run car club at the University of Massachusetts Amherst. Founded in 1996, it organises weekly meets, scenic cruises, car shows and motorsport outings for students interested in cars.",
  },
  {
    q: "Who can join UMass Motorsports Club?",
    a: "Any student at UMass Amherst can join, regardless of year or major. There is no application or tryout; you can simply turn up to a meet.",
  },
  {
    q: "Do I need to own a car to join?",
    a: "No. You do not need a car to be a member. Many members attend without one and ride along on cruises, and plenty come for the photography nights and workshops instead.",
  },
  {
    q: "Where does UMass Motorsports Club meet?",
    a: `The club meets at ${site.meetSpot.name}. Most events start there, including cruises that head out from campus.`,
  },
  {
    q: "What kind of events does the club run?",
    a: "Events run most weeks of the semester and include campus meets, scenic cruises through western Massachusetts, car photography nights, karting tournaments at Pioneer Valley Karting, and seasonal events such as Trunk or Treat and Carsgiving Day.",
  },
  {
    q: "What cruises does the club run?",
    a: "Past and upcoming cruises include the Mohawk Trail, named the most scenic road in Massachusetts by AAA, the Berkshire Trail, Shelburne Falls, and a run out to Palmer Motorsports Park to watch MassTuning's Trackfest.",
  },
  {
    q: "How do I get involved with UMass Motorsports Club?",
    a: `Join the club Discord or follow the club on Instagram for announcements, check the schedule for the next event, and turn up. You can also reach the club at ${site.email}.`,
  },
  {
    q: "Does the club do karting?",
    a: "Yes. The club runs its own karting tournament at Pioneer Valley Karting, open to members regardless of experience.",
  },
  {
    q: "Are there other car clubs at UMass Amherst?",
    a: "UMass Motorsports is the general-interest car club at UMass Amherst, open to any student interested in cars. It covers everything from weekly campus meets and scenic cruises to karting, car shows and photography nights, and runs all of its events independently.",
  },
];

export default function ClubFaq() {
  /*
    FAQPage markup is emitted here rather than in the site-wide schema so it
    only ever appears on the page that actually renders the questions. Google
    treats FAQ markup on a page without the matching visible content as
    invalid, which can discount the rest of the structured data with it.
    Keeping both in this component means they cannot drift apart.
  */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${site.url}/about#faq`,
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // Our own copy, never user input; "<" escaped so a stray tag in an
          // answer cannot break out of the script element.
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">
        Frequently asked questions
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        The things people ask us most often.
      </p>

      <dl className="max-w-2xl space-y-5">
        {faqs.map(({ q, a }) => (
          <div
            key={q}
            className="border-l-2 border-umass/25 pl-4 hover:border-umass/60 transition-colors"
          >
            <dt className="text-sm font-semibold text-gray-900">{q}</dt>
            <dd className="text-sm text-gray-600 leading-relaxed mt-1">{a}</dd>
          </div>
        ))}
      </dl>

      <p className="text-sm text-gray-500 mt-8 max-w-2xl">
        Still have a question? Email us at{" "}
        <a
          href={`mailto:${site.email}`}
          className="font-medium text-umass hover:underline underline-offset-2"
        >
          {site.email}
        </a>{" "}
        or find us at{" "}
        <a
          href={meetSpotMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-umass hover:underline underline-offset-2"
        >
          {site.meetSpot.name}
        </a>
        .
      </p>
    </section>
  );
}
