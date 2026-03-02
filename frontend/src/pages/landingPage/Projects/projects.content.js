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

export const PROJECTS_CONTENT = {
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
      { id: "consult", label: "Project Management / Consultation" },
    ],
  },

  featured: {
    title: "Featured Projects",
  },
};
