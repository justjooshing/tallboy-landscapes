const areaServed = [
  // Local Government Areas
  { "@type": "AdministrativeArea", name: "City of Melbourne" },
  { "@type": "AdministrativeArea", name: "City of Frankston" },
  { "@type": "AdministrativeArea", name: "Shire of Mornington Peninsula" },
  { "@type": "AdministrativeArea", name: "Baw Baw Shire" },

  // Immediate Local Area (suburbs around the Mornington Peninsula corridor)
  { "@type": "Place", name: "Melbourne City" },
  { "@type": "Place", name: "Frankston" },
  { "@type": "Place", name: "Dromana" },
  { "@type": "Place", name: "Rosebud" },
  { "@type": "Place", name: "Rye" },
  { "@type": "Place", name: "Blairgowrie" },
  { "@type": "Place", name: "Portsea" },
  { "@type": "Place", name: "Sorrento" },

  // Gippsland corridor suburbs toward Moe
  { "@type": "Place", name: "Warragul" },
  { "@type": "Place", name: "Drouin" },
  { "@type": "Place", name: "Trafalgar" },
  { "@type": "Place", name: "Moe" },

  // Slightly wider catchment (optional for search)
  { "@type": "Place", name: "Mornington" },
  { "@type": "Place", name: "Seaford" },
  { "@type": "Place", name: "Carrum Downs" },
  { "@type": "Place", name: "Bonbeach" },
  { "@type": "Place", name: "Aspendale" },
  { "@type": "Place", name: "Noble Park" },
];

export const facebookPage = "https://www.facebook.com/tallboy.landscapes/";
export const instagramPage = "https://www.instagram.com/tallboy.landscapes/";

export const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Tallboy Landscapes",
  description:
    "Designer and visionary specialising in creating stunning gardens and landscapes across south-east Melbourne and Gippsland.",
  url: "https://www.tallboylandscapes.com",
  telephone: "+61 400 256 199",
  logo: "https://www.tallboylandscapes.com/images/tallboylandscapes.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "27 Longwarry Rd",
    addressLocality: "Drouin",
    addressRegion: "VIC",
    postalCode: "3818",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -38.1271594,
    longitude: 145.8435675,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  areaServed,
  knowsAbout: [
    "landscaping design",
    "hardscaping",
    "garden construction",
    "paving",
    "retaining walls",
    "outdoor lighting",
    "water features",
    "landscape construction",
  ],
  sameAs: [facebookPage, instagramPage],
};
