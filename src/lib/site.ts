export const site = {
  name: "UMass Motorsports Club",
  email: "motorsports-rso@umass.edu",
  instagram: "https://instagram.com/umassmoto",
  discord: "https://discord.gg/XheXZCv7Jb",
  campusPulse: "https://umassamherst.campuslabs.com/engage/organization/motorsportsclub",
  googlePhotos: "https://photos.app.goo.gl/71mk2WNZqwygXKi38",

  /**
   * Google Form for sponsorship enquiries, embedded on /sponsors.
   *
   * The site is a static export with no server, so there is nothing to POST a
   * form to — Google hosts the form and collects the responses instead.
   *
   * To set this: open the form in Google Forms > Send > the "<>" (embed) tab,
   * and copy the src="..." out of the snippet it gives you. It looks like
   *   https://docs.google.com/forms/d/e/<LONG_ID>/viewform?embedded=true
   * Keep the ?embedded=true — it strips the Google page chrome.
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
};
