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
    date: "2026-09-18",
    time: "4:00 PM",
    location: "Lot 44B, UMass Amherst",
    description: "Semester kickoff meeting. Meet the team, learn about the season ahead.",
    image: "/events/Opener_Meet.jpeg",
  },
  {
    title: "Berkshire Trail Cruise",
    date: "2026-09-25",
    time: "4:00 PM",
    location: "Lot 44B, UMass Amherst",
    description: "",
    image: "/events/Berkshire_Trail.jpg",
  },
  {
    title: "Car Photography Night",
    date: "2026-10-02",
    time: "7:00 PM",
    location: "TBD",
    description: "",
    image: "/events/Photo_Night.jpeg",
  },
  {
    title: "New Salem Mini Cruise/Drive",
    date: "2026-10-09",
    time: "4:00 PM",
    location: "TBD",
    description: "",
    image: "/events/New_Salem.jpeg",
  },
  {
    title: "PVIK Tournament w/ F1 Club + Minutemen Racing (?)",
    date: "2026-10-16",
    time: "4:00 PM",
    location: "TBD",
    description: "",
  },
  {
    title: "Mohawk Trail Cruise",
    date: "2026-10-23",
    time: "4:00 PM",
    location: "TBD",
    description: "",
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
    title: "Community Parts/Build Day",
    date: "2026-11-06",
    time: "4:00 PM",
    location: "TBD",
    description: "",
  },
  {
    title: "Charlemont Fairgrounds Cruise",
    date: "2026-11-13",
    time: "4:00 PM",
    location: "TBD",
    description: "",
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
