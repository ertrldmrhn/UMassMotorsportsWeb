export const site = {
  name: "UMass Motorsports Club",

  /**
   * Canonical origin, no trailing slash. Used for the sitemap, robots.txt,
   * canonical URLs and social preview images, all of which need absolute URLs.
   *
   * Pick ONE hostname and stick to it. The site answers on both
   * umassmotorsports.com and www.umassmotorsports.com with identical content,
   * which search engines read as two competing copies; the canonical tags
   * built from this value are what tell them which one counts.
   *
   * www is the public face, so the Cloudflare redirect rule sends the apex
   * here. If that rule is ever flipped, flip this at the same time: a
   * canonical pointing away from where the 301 lands reintroduces the split.
   */
  url: "https://www.umassmotorsports.com",
  email: "motorsports-rso@umass.edu",
  instagram: "https://instagram.com/umassmoto",
  discord: "https://discord.gg/XheXZCv7Jb",
  campusPulse: "https://umassamherst.campuslabs.com/engage/organization/motorsportsclub",
  // Shared Google Photos album. Note: Google Photos sends
  // X-Frame-Options: SAMEORIGIN, so this can only be linked to, not embedded.
  googlePhotos: "https://photos.app.goo.gl/9tqkYrKBVMvkQS889",

  /**
   * Google Form for sponsorship enquiries, embedded on /sponsors.
   *
   * The site is a static export with no server, so there is nothing to POST a
   * form to. Google hosts the form and collects the responses instead.
   *
   * To set this: open the form in Google Forms > Send > the "<>" (embed) tab,
   * and copy the src="..." out of the snippet it gives you. It looks like
   *   https://docs.google.com/forms/d/e/<LONG_ID>/viewform?embedded=true
   * Keep the ?embedded=true, it strips the Google page chrome.
   *
   * Leave as "" and the page falls back to an email link, so it is never broken.
   */
  sponsorForm: "",

  /**
   * Height of the embedded form, in px. An iframe cannot resize itself to its
   * content across origins, so this is set by hand: too short and the form
   * scrolls inside its own box. Re-measure if you add or remove questions.
   */
  sponsorFormHeight: 1100,

  /**
   * Cruise attendance sign-up. UMass asks for a list of who's attending, so
   * this collects names and which cruises people expect to join.
   *
   * Linked rather than embedded: it asks about several cruises at once, so it
   * belongs next to the schedule where they're all visible, not inline on one
   * event. Shown wherever a cruise appears, see `cruise` in data/events.ts.
   */
  cruiseForm: "https://forms.gle/ctCjv5MrYAyvVyDw8",
};
