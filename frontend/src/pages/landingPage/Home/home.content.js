import { ImgBackfill, ImgAggregates, ImgLand } from "../../../assets/images";

export const HOME = {
  heroScroll: {
    tag: "Cliberduche Corporation",
    eyebrow: "Land Development & Materials Supply",
    getStarted: { label: "View Projects", to: "/projects" },

    slides: [
      {
        titleLines: ["Reliable materials", "for land development."],
        lede: "Backfill, aggregates, and soil resources—sourced and supplied for infrastructure and commercial projects across CALABARZON.",
        showActions: true,
      },
      {
        titleLines: ["Owned sites.", "Consistent quality."],
        lede: "We source from controlled development areas to ensure material consistency, compliance, and reliable availability.",
        showActions: false,
      },
      {
        titleLines: ["Coordinated hauling", "and on-time delivery."],
        lede: "From volume planning to logistics coordination, we keep your project moving—without delays or uncertainty.",
        showActions: false,
      },
    ],
  },

  modules: {
    eyebrow: "What We Deliver",
    title: "Comprehensive Site & Material Solutions",
    items: [
      {
        num: "01.",
        title: "Backfilling Materials",
        desc: "Engineered and quality-controlled materials for site preparation, grading, and structural foundations.",
        img: ImgBackfill,
        alt: "Backfilling materials",
      },
      {
        num: "02.",
        title: "Aggregates",
        desc: "Sub-base, base course, and graded aggregates supplied according to project specifications.",
        img: ImgAggregates,
        alt: "Aggregates materials",
      },
      {
        num: "03.",
        title: "Land Resources",
        desc: "Soil and earth materials sourced responsibly and delivered to meet environmental and compliance standards.",
        img: ImgLand,
        alt: "Land resources and development",
      },
    ],
  },

  overview: {
    about: {
      eyebrow: "About Us",
      title: "Built locally. Scaled responsibly.",
      desc: "Founded in 2018, Cliberduche Corporation supports infrastructure and land development projects across CALABARZON. We operate with strict adherence to DENR guidelines, client specifications, and environmental responsibility.",
    },

    projects: {
      eyebrow: "Projects",
      title: "Proven performance across multiple project types.",
      desc: "From drainage systems and roadworks to commercial site development, we execute projects that meet technical standards while maintaining efficiency, safety, and environmental compliance.",
      cta: { label: "View Projects", to: "/projects" },
    },
  },
};
