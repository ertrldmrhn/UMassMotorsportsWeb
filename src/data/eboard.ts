// Add or edit e-board members here.
// image: path relative to /public, e.g. "/eboard/jane.jpg"
//        Place photos in the public/eboard/ folder.

export interface Member {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  email?: string;
}

export const eboard: Member[] = [
  {
    name: "Jane Smith",
    role: "President",
    email: "jsmith@umass.edu",
    bio: "Senior studying Mechanical Engineering. Has been with the club since freshman year.",
  },
  {
    name: "Alex Johnson",
    role: "Vice President",
    email: "ajohnson@umass.edu",
    bio: "Junior in Electrical Engineering. Handles event logistics and member recruitment.",
  },
  {
    name: "Sam Lee",
    role: "Treasurer",
    email: "slee@umass.edu",
    bio: "Junior studying Business. Manages club finances and sponsor relations.",
  },
  {
    name: "Jordan Rivera",
    role: "Technical Lead",
    email: "jrivera@umass.edu",
    bio: "Senior in Mechanical Engineering. Leads car build and technical operations.",
  },
];
