// Site-wide config — keep secrets out of here. Public only.
export const siteConfig = {
  name: "Headshot Cape Town",
  domain: "headshotcapetown.co.za",
  url: "https://headshotcapetown.co.za",
  description:
    "Corporate headshot photographer in Cape Town. Studio in Woodstock, on-location across CT. 17 years experience, 5.0 ★ from 27 Google reviews. Fast turnaround, transparent pricing.",
  email: "headshots@jurgen.co.za",
  phone: "+27 78 919 0454",
  phoneHuman: "078 919 0454",
  whatsappNumber: process.env.NEXT_PUBLIC_WA_NUMBER || "27789190454",
  calUsername: process.env.NEXT_PUBLIC_CAL_USERNAME || "jurgen-banda-hansmann/15min",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/enquiry",
  ga: process.env.NEXT_PUBLIC_GA_ID || "G-5EGZ4N9PFW",
  studio: {
    name: "Saltcircle Building",
    street: "19 Kent Street",
    suburb: "Woodstock",
    city: "Cape Town",
    postal: "7925",
    country: "ZA",
    lat: -33.9258,
    lng: 18.4453,
  },
  social: {
    instagram: "https://instagram.com/jurgenphoto",
    linkedin: "https://www.linkedin.com/in/jbandahansmann/",
  },
  parent: { name: "Jürgen's Photography", url: "https://jurgen.co.za" },
  rating: { value: 5.0, count: 27 },
  founded: "2008",
};

export const waLink = (msg: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
