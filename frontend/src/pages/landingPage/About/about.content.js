import { ImgPlan } from "../../../assets/images";

const COMPANY_PROFILE_PDF = {
  view: "https://drive.google.com/file/d/1P6eeeph-igHN2kz22J4ooTfXALkjd454/view?usp=sharing",
  download:
    "https://drive.google.com/uc?export=download&id=1P6eeeph-igHN2kz22J4ooTfXALkjd454",
};

const MISSION_TEXT =
  "We are a responsible land development company that provides high-quality backfill materials for land development projects and other infrastructures, including but not limited to sub-base materials like aggregates, mixed soil, and boulders. We support sustainable land development by adhering to existing environmental regulations of the Philippines. We provide jobs for fellow Filipinos, contributing to boosting our country's economy. We deliver excellent value to partner communities, investors, employees, and stakeholders.";

const VISION_TEXT =
  "Our vision is to be a highly respected, world-class natural resource land development company committed to international standards in land development operations and environmental conservation, with sustainable projects that can convert land development sites into useful and economic projects in the future.";

export const ABOUT = {
  hero: {
    bg: ImgPlan,
    eyebrow: "Cliberduche Corporation",
    headline: "About Us",
    lede: "Your trusted partner in land development and premium construction materials across CALABARZON",
  },

  story: {
    label: "Our Story",
    title: "Founded in 2018 to build locally, at scale.",
    body: [
      "CLIBERDUCHE CORPORATION was born out of a dream: to provide a better life for a family without having to leave the country. That dream found its opportunity in the construction industry—an environment full of growth, challenge, and purpose.",
      "The founder invited close friends to join the venture, and CLIBERDUCHE CORPORATION was officially registered with the Securities and Exchange Commission on November 28, 2018.",
      "The name CLIBERDUCHE is derived from the surnames of the founder and co-founders:\nCLI — Climaco\nBER — Beronilla\nDUCHE — Piaduche",
      "As time passed, the two incorporators—Beronilla and Piaduche—pursued other interests. By mutual agreement, they officially parted ways with the company, and the founder’s spouse and brother became the new directors.",
    ],
  },

  record: {
  label: "Our Record",
  items: [
    { value: "14M+", label: "Cubic meters available", icon: "layers" },
    { value: "2018", label: "Year established", icon: "calendar" },
    { value: "Laguna & Cavite", label: "Operational sites", icon: "map" },
    { value: "CALABARZON+", label: "Service coverage", icon: "globe" },
  ],
},

team: {
  label: "Our Team",
  title: "The people behind the work.",
  subtitle:
    "Our operations are led by experienced engineers, site managers, and field teams focused on safety, quality, and reliability.",
  members: [
    {
      name: "Rolando Climaco",
      role: "President / CEO",
      img: null,
    },
    {
      name: "Maria Bella Climaco",
      role: "Vice President",
      img: null,
    },
    {
      name: "Rheamie Alberastine",
      role: "Marketing Manager / Engineering Manager",
      img: null,
    },
    {
      name: "Maria Cristina Dino",
      role: "Accounting Head",
      img: null,
    },
    {
      name: "Rommel Matias",
      role: "Field Agent",
      img: null,
    },
    {
      name: "Rolando Climaco",
      role: "Chief of Site Operations",
      img: null,
    },
    {
      name: "Genesis De Guzman",
      role: "Project Manager",
      img: null,
    },
    {
      name: "Col. Jose Caringal",
      role: "Project Manager",
      img: null,
    },
    {
      name: "Aldwin Miranda",
      role: "Senior Engineer",
      img: null,
    },
    {
      name: "Lucas Martinez",
      role: "Site Foreman",
      img: null,
    },
    {
      name: "Renato Nebrida",
      role: "Site Foreman",
      img: null,
    },
    {
      name: "Rolisdio Climaco",
      role: "Supervisor / Safety Officer",
      img: null,
    },
    {
      name: "Katleen Mae Martinez",
      role: "QA / QC Engineer",
      img: null,
    },
    {
      name: "Persues Sarte",
      role: "Site Engineer",
      img: null,
    },
    {
      name: "Benilda Padilla",
      role: "Purchasing Head",
      img: null,
    },
    {
      name: "Ivan Roy Climaco",
      role: "Purchasing Officer",
      img: null,
    },
    {
      name: "Ofelia Macaldo",
      role: "Head - HR Admin & Legal",
      img: null,
    },
    {
      name: "Ian Climaco",
      role: "HR Admin Officer",
      img: null,
    },
    {
      name: "Atty. Paulo Punzalan",
      role: "Legal Officer",
      img: null,
    },
    {
      name: "Atty. Dante Manguiat",
      role: "Legal Officer",
      img: null,
    },
  ],
},

  slices: {
    missionVision: {
      type: "missionVision",
      label: "Mission and Vision",
      title: "Responsible operations with long-term impact.",
      body: [MISSION_TEXT, VISION_TEXT],
    },

    coreValues: {
      type: "coreValues",
      label: "Core Values",
      title: "What we stand for",
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
      type: "companyProfile",
      label: "Company Profile",
      title: "Want to learn more about us? Grab our Company Profile PDF.",
      buttons: [
        { label: "View PDF", href: COMPANY_PROFILE_PDF.view, action: "view" },
        {
          label: "Download PDF",
          href: COMPANY_PROFILE_PDF.download,
          action: "download",
        },
      ],
    },

    whyUs: {
      type: "whyUs",
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
      media: {
        srcKey: "ImgSiteInspection",
        alt: "Land development and materials supply",
      },
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
