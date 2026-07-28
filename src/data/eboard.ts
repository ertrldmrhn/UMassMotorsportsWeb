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
    name: "Nate Hawkins",
    role: "President",
    major: "Mechanical Engineering",
    car: "2002 Chevy S10",
    email: "nchawkins@umass.edu",
    bio: "",
  },
  {
    name: "Sam Mossberg",
    role: "Vice President",
    major: "Chinese Linguistics",
    car: "1992 MX5 Miata",
    email: "smossberg@umass.edu",
    bio: "",
  },
  {
    name: "Krish Abbato",
    role: "Treasurer",
    major: "Computer Science",
    car: "2008 Subaru WRX STI",
    email: "kabbato@umass.edu",
    bio: "",
  },
  {
    name: "Erik Demirhan",
    role: "Event Coordinator",
    major: "Informatics",
    car: "2019 Mazda MX5 RF",
    email: "edemirhan@umass.edu",
    bio: "",
  },
  {
    name: "Forrest Sherson",
    role: "Secretary",
    major: "Mechanical Engineer",
    car: "1999 Mazda Miata",
    email: "fsherson@umass.edu",
    bio: "",
  },
  {
    name: "Srivibhu Ponakala",
    role: "Outreach Coordinator",
    major: "Computer Science",
    car: "2024 Audi S4",
    email: "sponakala@umass.edu",
    bio: "",
  },
];
