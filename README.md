# UMass Motorsports Club

The website for the UMass Amherst Motorsports Club — season schedule, e-board,
sponsors, and photos.

Built with **Next.js 16** (App Router) and **Tailwind CSS v4**, exported as a
fully static site and hosted on **Cloudflare Workers**. There is no server and
no database: everything on the site comes from a handful of TypeScript files in
`src/data/` and `src/lib/`.

---

## Quick start

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>. Edits reload automatically.

To check a production build locally:

```bash
npm run build
npx serve@latest out
```

> `npm start` does **not** work in this project. `next start` runs a Node
> server, which a static export doesn't have. Use `npx serve out` instead.

---

## Updating the site

Most changes are content, not code. You can do all of these by editing one file.

### Events — `src/data/events.ts`

The schedule page, the homepage countdown, and the "Upcoming" cards all read
from this one array. Add or edit an entry and everything updates.

```ts
{
  title: "Mohawk Trail Cruise",
  date: "2026-10-23",        // ISO format, YYYY-MM-DD
  time: "4:00 PM",
  endTime: "6:00 PM",        // optional — defaults to 2 hours after start
  location: "Lot 44B, UMass Amherst",
  description: "A cruise along the Mohawk Trail.",
  image: "/events/Mohawk_Trail.JPG",  // optional
  link: "https://...",                // optional
}
```

Notes:

- **The homepage picks the featured event automatically** — it's the next one
  that hasn't finished yet. You never need to change it by hand.
- An event is "past" once its **end time** passes, not at midnight. Past events
  grey out on the schedule on their own.
- Events without an `image` fall back to a dark charcoal-and-red card, which
  looks intentional — it's fine to leave it off.

### E-board — `src/data/eboard.ts`

Same idea. A member without an `image` shows their initials, which also looks
fine, so a missing photo is never broken.

**Photo requirements:** crop to **3:2**, framed so the member *and their car*
are both in shot, saved around **900×600**. The card renders a 3:2 box, so
anything else gets cropped by the browser — and heads tend to lose out.

### Links — `src/lib/site.ts`

Instagram, Discord, Campus Pulse, the Google Photos album, the contact email,
and the sponsorship form URL all live here.

### Photos

Drop event photos in `public/events/` and reference them as
`/events/filename.jpg`. The Photos page builds its gallery automatically from
every event that has an `image`, so adding one to an event adds it there too.

---

## Project structure

```
src/
  app/            Pages (App Router) — one folder per route
    page.tsx        Home: channels strip + hero + upcoming
    schedule/       Full season schedule
    about/          Club info + e-board  (/eboard redirects here)
    sponsors/       Sponsorship info + enquiry form
    photos/         Gallery preview + link to the full album
    globals.css     Tailwind theme and custom variants
  components/     Header, Footer, Countdown, event cards, list renderers
  data/           events.ts, eboard.ts  ← most content edits happen here
  lib/            site.ts (links), eventTime.ts (start/end helpers)
public/
  events/         Event photos
  eboard/         Member photos
  _redirects      Cloudflare redirect rules
```

---

## Deploying

Pushing to `main` is what ships. Cloudflare builds and deploys with:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |
| Build variables | None |

`npm run build` writes the static site to `out/`, and `wrangler.jsonc` points
Cloudflare's asset handler at that folder.

---

## Things to know

A few non-obvious constraints. Most of these have bitten us before.

**Anything time-based must run in the browser.** This is a static export, so
server components execute *at build time* and their clock freezes there. Date
logic written in a server component will be stuck at whenever the site was last
built — the schedule would stop greying out past events, and the homepage would
keep featuring an event that already happened. That's why `ScheduleList` and
`HomeEvents` are client components that take the build timestamp as a prop and
switch to the real clock after mount.

**Filenames are case-sensitive in production.** Cloudflare serves
case-sensitively; macOS does not. `/eboard/Erik.jpg` works locally as
`erik.jpg` but 404s once deployed. Match the filename exactly.

**Images are not optimised.** `images.unoptimized` is on, because the export has
no image server. Next serves whatever file you commit, at full size — so resize
photos before adding them. `sizes` and `quality` props have no effect.

**Google Photos cannot be embedded**, but Google Forms can. Photos sends
`X-Frame-Options: SAMEORIGIN`, which is why the Photos page links out instead of
showing an album inline. Forms sends no framing restriction, so the sponsorship
form is embedded directly.

**Tailwind v4 has no config file.** Colours and theme values are declared with
`@theme` in `src/app/globals.css`. There is no `tailwind.config.ts` — don't add
one expecting it to be read.

**`touch:` is a custom variant**, also defined in `globals.css`. It applies
styles only where the pointer can't hover (`@media (hover: none)`). Touch
devices never fire `:hover`, so a link styled to reveal itself on hover is
invisible on a phone — `touch:` lets that cue become the resting state there.

---

## Known gaps

- **`site.sponsorForm` is empty**, so `/sponsors` currently shows an email
  fallback instead of a form. Create the Google Form, then paste its embed URL
  (Send → `<>` tab → the `src="..."`, keeping `?embedded=true`) into
  `src/lib/site.ts`, and re-check `sponsorFormHeight` against the real form —
  an iframe can't resize itself to its content across origins.
- **`src/components/LinkButton.tsx` is unused** — nothing imports it. Safe to
  delete.
- **`npm start` is broken** by design (see Quick start). The `start` script in
  `package.json` is left over from the Next scaffold.
