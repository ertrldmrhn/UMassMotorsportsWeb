// Add or edit e-board members here.
// image: path relative to /public, e.g. "/eboard/jane.jpg"
//        Place member photos in the public/eboard/ folder.
//
//        Crop photos to 3:2 before adding them, framed so the member AND their
//        car are both in shot — the card renders a 3:2 box, so anything else
//        gets cropped by the browser and heads tend to lose out. ~900x600 keeps
//        it sharp on retina without shipping megabytes. Filenames are
//        case-sensitive in production, so match the path exactly.

export interface Member {
  name: string;
  role: string;
  image?: string;   // "/eboard/jane.jpg" — pre-cropped to 3:2, see note above
  major?: string;   // "Mechanical Engineering"
  car?: string;     // "2003 Subaru WRX" — optional fun detail
  bio?: string;
  email?: string;
}

export const eboard: Member[] = [
  {
    name: "Nate Hawkins",
    role: "President",
    image: "/eboard/nate.jpg",
    major: "Mechanical Engineering",
    car: "2002 Chevy S10",
    email: "nchawkins@umass.edu",
    bio: "",
  },
  {
    name: "Sam Mossberg",
    role: "Vice President",
    image: "/eboard/sam.jpg",
    major: "Chinese Linguistics",
    car: "1992 NA Mazda MX-5 Miata",
    email: "smossberg@umass.edu",
    bio: "",
  },
  {
    name: "Krish Abbato",
    role: "Treasurer",
    image: "/eboard/krish.jpg",
    major: "Computer Science",
    car: "2008 Subaru WRX STI",
    email: "kabbato@umass.edu",
    bio: "",
  },
  {
    name: "Erik Demirhan",
    role: "Event Coordinator",
    image: "/eboard/Erik.jpg",
    major: "Informatics",
    car: "2019 ND Mazda MX-5 RF",
    email: "edemirhan@umass.edu",
    bio: "",
  },
  {
    name: "Forrest Sherson",
    role: "Secretary",
    image: "/eboard/forrest.jpg",
    major: "Mechanical Engineer",
    car: "1999 NB Mazda MX-5 Miata",
    email: "fsherson@umass.edu",
    bio: "",
  },
  {
    name: "Sri Ponakala",
    role: "Outreach Coordinator",
    major: "Computer Science",
    car: "2024 Audi S4",
    email: "sponakala@umass.edu",
    bio: "",
  },
];
