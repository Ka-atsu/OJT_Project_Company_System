import {
  ImgConstructionSite,
  ImgBackhoe,
  ImgCBDBuilding,
  ImgBackfill,
  ImgExcavationSite,
  ImgSiteManagement,
} from "../../../assets/images";

export const ABOUT = {
  /* =========================================================
     HERO
  ========================================================= */
  hero: {
    bg: ImgConstructionSite,
    headline: "ABOUT US",
    eyebrow: "Cliberduche Corporation",
  },

  /* =========================================================
     WHY US / ABOUT
     (You can use this in About.jsx for the "whyUs" section)
  ========================================================= */
  whyUs: {
    label: "Why Us",
    title:
      "A responsible land development company supplying high-quality backfill materials across CALABARZON and beyond.",
    body: [
      "CLIBERDUCHE CORPORATION was established to address a recurring challenge in land development projects: the need for reliable sourcing, consistent material quality, and dependable delivery timelines.",
      "From the beginning, the company set out to support projects that require scale, precision, and accountability—providing high-quality backfill materials such as sub-base, aggregates, and boulders as specified by clients.",
      "Our company-owned land development sites are strategically located in Laguna and Cavite, Philippines, with over 14 million cubic meters of landfill and backfilling materials available to support the growing demands of the construction industry.",
      "Operations are led by experienced engineers, site managers, and field teams with hands-on expertise in land development, materials sourcing, and site coordination—ensuring safety, quality, and efficiency at every stage.",
    ],
  },

  /* =========================================================
   STORY / BACKGROUND
========================================================= */
  founding: {
    label: "Our Story",
    title: "Founded in 2018 to build locally, at scale.",
    body: [
      "CLIBERDUCHE CORPORATION was born out of a dream: to provide a better life for a family without having to leave the country. That dream found its opportunity in the construction industry—an environment full of growth, challenge, and purpose.",
      "The founder invited close friends to join the venture, and CLIBERDUCHE CORPORATION was officially registered with the Securities and Exchange Commission on November 28, 2018.",
      "The name CLIBERDUCHE is derived from the surnames of the founder and co-founders:\nCLI — Climaco\nBER — Beronilla\nDUCHE — Piaduche",
      "As time passed, the two incorporators—Beronilla and Piaduche—pursued other interests. By mutual agreement, they officially parted ways with the company, and the founder’s spouse and brother became the new directors.",
    ],
  },

  /* =========================================================
     TEAM
  ========================================================= */
  team: {
    label: "Our Team",
    title: "The people behind the work.",
    subtitle:
      "Our operations are led by experienced engineers, site managers, and field teams focused on safety, quality, and reliability.",
    members: [
      { name: "Name", role: "Role", img: null },
      { name: "Name", role: "Role", img: null },
      { name: "Name", role: "Role", img: null },
      { name: "Name", role: "Role", img: null },
      { name: "Name", role: "Role", img: null },
      { name: "Name", role: "Role", img: null },
      { name: "Name", role: "Role", img: null },
      { name: "Name", role: "Role", img: null },
    ],
  },

  /* =========================================================
     SLICES (keyed — easier than array + find())
  ========================================================= */
  slices: {
    missionVision: {
      label: "Mission and Vision",
      title: "Responsible operations with long-term impact.",
      body: [
        "Our mission is to deliver high-quality backfill materials and land development services while adhering to environmental regulations in the Philippines.",
        "Our vision is to become a highly respected, world-class land development company committed to international standards in operational excellence and environmental stewardship.",
      ],
    },

    projectsInfo: {
      label: "Projects Information",
      title: "From small to large commercial and industrial projects.",
      body: "CLIBERDUCHE CORPORATION supports residential developments, commercial facilities, industrial sites, and public infrastructure projects. Our experience spans small- to large-scale operations requiring high-volume material sourcing, coordinated logistics, and strict compliance with project specifications.",
    },

    coreValues: {
      label: "Core Values",
      title: "Quality. Safety. Integrity.",
      body: "We take pride in delivering reliable services at competitive prices while upholding the highest standards across all projects and partnerships.",
      bullets: [
        {
          k: "Quality",
          v: "Delivering materials and services that meet client specifications and comply with local and international standards.",
        },
        {
          k: "Safety",
          v: "Maintaining safe worksites and operations to protect personnel, partners, and surrounding communities.",
        },
        {
          k: "Integrity",
          v: "Operating with transparency, regulatory compliance, and accountability in every transaction.",
        },
      ],
    },

    companyProfile: {
      label: "Company Profile",
      title: "A trusted partner in land development.",
      body: "CLIBERDUCHE CORPORATION is a Philippine-based land development and materials supply company serving CALABARZON and nearby regions. The company maintains company-owned sites, experienced technical teams, and a commitment to sustainable development—positioning itself as a reliable long-term partner for infrastructure and land development projects.",
    },
  },

  order: [
    "missionVision",
    "whyUs",
    "story",
    "coreValues",
    "team",
    "companyProfile",
  ],
};

export {
  ImgBackhoe,
  ImgCBDBuilding,
  ImgBackfill,
  ImgConstructionSite,
  ImgExcavationSite,
  ImgSiteManagement,
};
