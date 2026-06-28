// Add or edit events here. Keep them sorted chronologically (oldest first).
// The homepage will automatically show the next upcoming event.
// image: path relative to /public, e.g. "/events/autocross-r1.jpg"
//        Place event photos in the public/events/ folder.

export interface ClubEvent {
  title: string;
  date: string;       // ISO 8601 format: "2026-09-14"
  time: string;       // Human-readable: "9:00 AM"
  location: string;
  description: string;
  link?: string;      // Optional external link for more info
  image?: string;     // Optional: "/events/autocross-r1.jpg"
}

export const events: ClubEvent[] = [
  {
    title: "Autocross — Round 1",
    date: "2026-09-13",
    time: "9:00 AM",
    location: "Lot 22, UMass Amherst",
    description: "First autocross event of the season. Open to all members. Helmets provided.",
    // image: "/events/autocross-r1.jpg",
  },
  {
    title: "General Meeting",
    date: "2026-09-20",
    time: "7:00 PM",
    location: "ILC S140, UMass Amherst",
    description: "Semester kickoff meeting. Meet the team, learn about the season ahead.",
  },
  {
    title: "Autocross — Round 2",
    date: "2026-10-04",
    time: "9:00 AM",
    location: "Lot 22, UMass Amherst",
    description: "Second autocross event. Timing improvements from Round 1.",
    // image: "/events/autocross-r2.jpg",
  },
];
