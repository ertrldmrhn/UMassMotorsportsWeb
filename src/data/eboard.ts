// Add or edit e-board members here.
// image: path relative to /public, e.g. "/eboard/jane.jpg"
//        Place member photos in the public/eboard/ folder.

export interface Member {
  name: string;
  role: string;
  image?: string;   // "/eboard/jane.jpg"
  major?: string;   // "Mechanical Engineering"
  car?: string;     // "2003 Subaru WRX" — optional fun detail
  bio?: string;
  email?: string;
}

export const eboard: Member[] = [
  {
    name: "Jane Smith",
    role: "President",
    major: "Mechanical Engineering",
    car: "2018 Subaru WRX",
    email: "jsmith@umass.edu",
    bio: "Senior in MechE. Has been with the club since freshman year and led the build team before taking president.",
  },
  {
    name: "Alex Johnson",
    role: "Vice President",
    major: "Electrical Engineering",
    email: "ajohnson@umass.edu",
    bio: "Junior handling event logistics and member recruitment. Runs the club's autocross program.",
  },
  {
    name: "Sam Lee",
    role: "Treasurer",
    major: "Business Administration",
    email: "slee@umass.edu",
    bio: "Junior managing club finances, sponsorship deals, and budget planning for the season.",
  },
  {
    name: "Jordan Rivera",
    role: "Technical Lead",
    major: "Mechanical Engineering",
    car: "1999 Mazda Miata",
    email: "jrivera@umass.edu",
    bio: "Senior overseeing car prep, build projects, and technical operations at every event.",
  },
];
