import { ImgBackfill, ImgAggregates, ImgLand } from "../../../assets/images";

export const HOME = {
  heroScroll: {
    tag: "What we do",
    eyebrow: "Land Development & Materials Supply",
    primaryCta: { label: "Our Capabilities", to: "/services" },
    getStarted: { label: "Get Started", to: "/dashboard" },
    slides: [
      {
        titleLines: ["Reliable materials", "for land development."],
        lede: "Backfill, aggregates, and soil resources—sourced and supplied for projects of all scales.",
        showActions: true,
      },
      {
        titleLines: ["Owned sites.", "Consistent quality."],
        lede: "We source from owned land development sites to maintain material consistency and reliable availability.",
        showActions: false,
      },
      {
        titleLines: ["Coordinated hauling", "and on-time delivery."],
        lede: "We plan volumes, logistics, and delivery schedules so your project keeps moving—without surprises.",
        showActions: false,
      },
    ],
  },

  modules: {
    eyebrow: "Core capabilities",
    title: "Built like a system",
    items: [
      {
        num: "01.",
        title: "Backfilling Materials",
        desc: "Engineered materials for site preparation, grading, and foundations.",
        img: ImgBackfill,
        alt: "Backfilling materials",
      },
      {
        num: "02.",
        title: "Aggregates",
        desc: "Sub-base, base course, and graded aggregates supplied to spec.",
        img: ImgAggregates,
        alt: "Aggregates",
      },
      {
        num: "03.",
        title: "Land Resources",
        desc: "Soil and earth materials sourced and delivered to site requirements.",
        img: ImgLand,
        alt: "Land resources",
      },
    ],
  },
};
