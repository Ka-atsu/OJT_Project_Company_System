import {
  ImgConsultation,
  ImgBackfill,
  ImgLand,
  ImgAggregates,
  ImgSiteManagement,
} from "../../../assets/images";

export const SERVICES = {
  hero: {
    eyebrow: "Service",
    intro:
      "Structured capabilities for land development and materials supply—built for scale, reliability, and safe operations.",
    mediaKey: "land",
  },
  blocks: {
    primary: { eyebrow: "Primary Function", title: "Core capabilities" },
    secondary: { eyebrow: "Secondary Function", title: "Support services" },
  },
  primary: [
    {
      title: "Backfill Sourcing / Land Sourcing",
      desc: "Sourcing backfill and land resources based on client specifications, volumes, and site requirements.",
      tags: ["Sourcing", "Backfill", "Land resources"],
      image: ImgBackfill,
    },
    {
      title: "Land Development",
      desc: "Site preparation and land development support including clearing, grading, and coordinated project execution.",
      tags: ["Land dev", "Site prep", "Civil works"],
      image: ImgLand,
    },
    {
      title: "Site Management",
      desc: "On-site coordination focused on safety, workflow, and execution to keep operations efficient and compliant.",
      tags: ["Coordination", "Safety", "Operations"],
      image: ImgSiteManagement,
    },
    {
      title: "Equipment Leasing",
      desc: "Equipment support and leasing options to help projects scale efficiently based on schedule and scope.",
      tags: ["Equipment", "Leasing", "Support"],
      image: ImgAggregates,
    },
  ],
  secondary: [
    {
      title: "Additional Land Development Support",
      desc: "Additional land development support for projects requiring extended scope or supplemental services.",
      tags: ["Support", "Extended scope", "Coordination"],
      image: ImgLand,
    },
    {
      title: "Project Management Consultation",
      desc: "Consultation on planning, sequencing, sourcing, and delivery strategy for smoother project execution.",
      tags: ["Consultation", "Planning", "Strategy"],
      image: ImgConsultation,
    },
  ],
};
