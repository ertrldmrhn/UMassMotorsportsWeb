// Add or edit events here. Keep them sorted chronologically (oldest first).
// The homepage will automatically show the next upcoming event.
// image: path relative to /public, e.g. "/events/autocross-r1.jpg"
//        Place event photos in the public/events/ folder.

export interface ClubEvent {
  title: string;
  date: string;       // ISO 8601 format: "2026-09-14"
  time: string;       // Human-readable: "9:00 AM"
  endTime?: string;   // Optional end time; defaults to 2 hours after start
  location: string;
  description: string;
  link?: string;      // Optional external link for more info
  image?: string;     // Optional: "/events/autocross-r1.jpg"
  /**
   * Mark cruises. UMass asks for an attendee list for these, so anything
   * flagged here gets the sign-up prompt on the schedule and homepage.
   * Set explicitly rather than matched off the title, so renaming an event
   * (e.g. "Trip to Palmer") can't silently drop it from the list.
   */
  cruise?: boolean;
}

export const events: ClubEvent[] = [
  {
    title: "Pre-Opener Meet",
    date: "2026-09-11",
    time: "4:00 PM",
    location: "Lot 44B, UMass Amherst",
    description: "First event of the season. Open to all members.",
    image: "/events/IMG_8268.jpeg",
  },
  {
    title: "Opener Meet",
    date: "2026-09-25",
    time: "4:00 PM",
    location: "Lot 44B, UMass Amherst",
    description: "Semester kickoff meeting. Meet the team, learn about the season ahead.",
    image: "/events/Opener_Meet.jpeg",
  },
  {
    title: "Shelburne Falls Cruise",
    cruise: true,
    date: "2026-10-02",
    time: "4:00 PM",
    location: "Lot 44B, UMass Amherst",
    description: "",
    image: "/events/shelburne-falls.jpeg",
  },
  {
    title: "Palmer Motorsports Park Cruise",
    cruise: true,
    date: "2026-10-11",
    time: "9:00 AM",
    location: "Lot 44B, UMass Amherst",
    description:
      "A cruise to Palmer Motorsports Park to attend MassTuning's Trackfest as spectators. This is not a club-run track day and does not include on-track driving.",
    image: "/events/Palmer-motorsports-park.jpg",
  },
  {
    title: "Car Photography Night",
    date: "2026-10-16",
    time: "7:00 PM",
    location: "TBD",
    description: "",
    image: "/events/Photo_Night.jpeg",
  },
  {
    title: "Mohawk Trail Cruise",
    cruise: true,
    date: "2026-10-23",
    time: "4:00 PM",
    location: "TBD",
    description: "A cruise along the Mohawk Trail, named the most scenic road in Massachusetts by AAA.",
    image: "/events/Mohawk_Trail.JPG",
  },
  {
    title: "Trunk or Treat",
    date: "2026-10-30",
    time: "4:00 PM",
    location: "TBD",
    description: "",
  },
  {
    title: "PVIK Tournament w/ F1 Club",
    date: "2026-11-06",
    time: "4:00 PM",
    location: "TBD",
    description: "",
    image: "/events/pvik.jpg",
  },
  {
    title: "Berkshire Trail Cruise",
    cruise: true,
    date: "2026-11-13",
    time: "4:00 PM",
    location: "Lot 44B, UMass Amherst",
    description: "",
    image: "/events/Berkshire_Trail.jpg",
  },
  {
    title: "Carsgiving Day",
    date: "2026-11-20",
    time: "4:00 PM",
    location: "TBD",
    description: "",
  },
  {
    title: "Know Your Car Workshop",
    date: "2026-12-04",
    time: "4:00 PM",
    location: "TBD",
    description: "",
  },
  {
    title: "Closing Meet",
    date: "2026-12-11",
    time: "4:00 PM",
    location: "TBD",
    description: "",
  },
];
