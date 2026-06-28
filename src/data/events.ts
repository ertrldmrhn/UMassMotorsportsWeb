// Add or edit events here. Keep them sorted chronologically (oldest first).
// The homepage will automatically show the next upcoming event.

export interface ClubEvent {
  title: string;
  date: string;       // ISO 8601 format: "2025-09-14"
  time: string;       // Human-readable: "10:00 AM"
  location: string;
  description: string;
  link?: string;      // Optional external link for more info
}

export const events: ClubEvent[] = [
  {
    title: "Autocross — Round 1",
    date: "2026-09-13",
    time: "9:00 AM",
    location: "Lot 22, UMass Amherst",
    description: "First autocross event of the season. Open to all members. Helmets provided.",
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
  },
];
