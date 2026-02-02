import { ImgPlan } from "../../../assets/images";

export const ABOUT = {
  /* =========================================================
     HERO
  ========================================================= */
  hero: {
    bg: ImgPlan,
    eyebrow: "Cliberduche Corporation",
    headline: "About Us",
    lede: "Your trusted partner in land development and premium construction materials across CALABARZON",
  },

  /* =========================================================
   WHY US / ABOUT
  ========================================================= */
  whyUs: {
    label: "Why Us",
    body: [
      {
        title: "Premium Quality Materials",
        text: "CLIBERDUCHE CORPORATION provides the best quality backfill materials as specified by clients like sub-base, aggregates and boulders to interested customers in the CALABARZON area and beyond.",
        icon: "badge",
      },
      {
        title: "Strategic Locations",
        text: "Our land development sites are located in the heart of Laguna and Cavite Provinces, Philippines, with over 14 million cubic meters of landfill / backfilling materials available.",
        icon: "globe",
      },
      {
        title: "Eco-Friendly Practices",
        text: "We believe in sustainable and eco-friendly business ventures, following strict protocols and guidelines of the Department of Environment and Natural Resources (DENR).",
        icon: "shield",
      },
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
  Record
  ========================================================= */

  record: {
    label: "Our Record",
    items: [
      { value: "14M+", label: "Cubic meters available" },
      { value: "2018", label: "Year established" },
      { value: "Laguna & Cavite", label: "Operational sites" },
      { value: "CALABARZON+", label: "Service coverage" },
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
        "“We are a responsible land development company that provides high- quality backfill materials for land development projects and other infrastructures, including but not limited to sub-base materials like aggregates, mixed soil, and boulders. We support sustainable land development by adhering to the existing environmental regulations of the Philippines. We provide jobs for fellow Filipinos, which significantly contributes to boosting our country's economy. We are also keen to deliver excellent value to our partner communities, investors, employees, and other stakeholders. ”",
        "“Our vision is to be a highly respected, world-class natural resource land development company committed to adhering to international standards in land development operations and environmental conservation, sustainable projects that cover converting land development sites into other useful and economic projects in the future, thus converting land development projects to future commercial and housing projects. ”",
      ],
    },

    coreValues: {
      label: "Core Values",
      bullets: [
        {
          k: "Quality",
          v: "Ensures projects are of high quality and fair with local standards to be able to be competitive in the national and local market scene.",
          icon: "quality",
        },
        {
          k: "Safety",
          v: "Ensures safety at work site, safety of projects and safety of personnel before, during, and after execution.",
          icon: "safety",
        },
        {
          k: "Integrity",
          v: "Ensures compliance with existing laws covering the construction industry and reliable workforce.",
          icon: "integrity",
        },
      ],
    },

    companyProfile: {
      label: "Download Company Profile",
      title:
        "Want to learn more about us? Download our Company Profile or something... It’s not a virus promise",
      // body: "CLIBERDUCHE CORPORATION is a Philippine-based land development and materials supply company serving CALABARZON and nearby regions. The company maintains company-owned sites, experienced technical teams, and a commitment to sustainable development—positioning itself as a reliable long-term partner for infrastructure and land development projects.",
      buttons: [
        {
          label: "View PDF",
          href: "/path/to/company-profile.pdf",
          type: "view",
        },
        {
          label: "Download PDF",
          href: "/path/to/company-profile.pdf",
          type: "download",
        },
      ],
    },
  },

  order: [
    "story",
    "record",
    "whyUs",
    "missionVision",
    "coreValues",
    "team",
    "companyProfile",
  ],
};
