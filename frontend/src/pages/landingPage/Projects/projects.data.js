// projects.data.js
import {
  ImgAggregates,
  ImgBackfill,
  ImgBackhoe,
  ImgCBDBuilding,
  ImgConstructionSite,
  ImgConsultation,
  ImgEarthmoving,
  ImgExcavationSite,
  ImgLand,
} from "../../../assets/images";

export const PROJECTS = {
  hero: {
    eyebrow: "Projects",
    title: "From small to large commercial and industrial projects.",
    lede: "Cliberduche Corporation provides quality backfill materials, land development, and site management solutions across CALABARZON—delivered with strict adherence to DENR guidelines and client specifications.",
    images: [
      ImgAggregates,
      ImgConstructionSite,
      ImgExcavationSite,
      ImgEarthmoving,
      ImgBackhoe,
      ImgLand,
      ImgCBDBuilding,
      ImgConsultation,
      ImgBackfill,
    ],
  },

  stats: [
    { value: "8+", label: "Years in operations", icon: "time" },
    { value: "14+", label: "Million m³ materials", icon: "cube" },
    { value: "Serving", label: "Calabarzon", icon: "users" },
  ],

  deliver: {
    title: "What We Deliver",
    items: [
      { id: "backfill", label: "Backfill Sourcing / Land Sourcing" },
      { id: "land-dev-1", label: "Land Development" },
      { id: "site-mgmt", label: "Site Management" },
      { id: "equip", label: "Equipment Leasing" },
      { id: "land-dev-2", label: "Land Development" },
      { id: "consult", label: "Project Management / Consultation" },
    ],
  },

  featured: {
    title: "Featured Projects",
    filters: [
      "All",
      "Drainage",
      "Roadworks",
      "Industrial",
      "Fencing",
      "Residential",
    ],
    items: [
      {
        title: "MDI Infrastructure Upgrade (2019)",
        location: "Laguna",
        blurb:
          "Completed utility rehabilitation and improved site access and drainage performance.",
        category: "Drainage",
        tags: ["Drainage", "Roadworks", "Industrial"],
        images: [ImgAggregates, ImgBackfill, ImgAggregates],
      },
      {
        title: "ABZ Commercial Site Development (2021)",
        location: "Cavite",
        blurb:
          "Earthworks and sub-base preparation delivered with quality control and safety compliance.",
        category: "Industrial",
        tags: ["Fencing", "Residential"],
        images: [ImgBackfill, ImgAggregates, ImgBackfill],
      },
      {
        title: "MegaMart Access Road Construction (2022)",
        location: "Laguna",
        blurb:
          "Road base and access route improvements to enhance site traffic flow and safety.",
        category: "Roadworks",
        tags: ["Roadworks", "Drainage"],
        images: [ImgAggregates, ImgBackfill, ImgAggregates],
      },
    ],
  },
};
