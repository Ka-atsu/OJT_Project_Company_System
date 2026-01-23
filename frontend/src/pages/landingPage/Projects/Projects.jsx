import PageShell from "../../../components/layouts/PageShell";
import { motion } from "framer-motion";
import "./projects.css";

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};

const VIEWPORT = { amount: 0.35 };

const PROJECTS = {
  hero: {
    eyebrow: "Projects",
    title: "Selected projects",
    lede: "A snapshot of recent and ongoing projects delivered across CALABARZON.",
  },

  intro: {
    title: "Recent work",
    body: "Below are examples of land development and civil works projects completed and undertaken by CLIBERDUCHE CORPORATION. Project scope, location, and timelines vary based on client requirements.",
  },

  items: [
    {
      title: "Industrial Estate Backfilling",
      location: "Laguna · 2023",
      desc: "Backfilling and site preparation works for an industrial estate development, including supply and placement of sub-base and aggregate materials.",
      image: "/images/project-laguna-industrial.jpg",
    },
    {
      title: "Concrete Road & Drainage System",
      location: "Cavite · 2022",
      desc: "Construction of internal concrete roads, drainage lines, and slope protection works supporting a mixed-use development.",
      image: "/images/project-cavite-road.jpg",
    },
    {
      title: "Commercial Site Development",
      location: "CALABARZON · Ongoing",
      desc: "Site clearing, levelling, and civil works for a commercial development, including earthworks and infrastructure preparation.",
      image: "/images/project-commercial.jpg",
    },
  ],
};

function ProjectRow({ title, location, desc, image, reverse }) {
  return (
    <section className="section project-row">
      <motion.div
        className={`project-row-inner ${reverse ? "is-reverse" : ""}`}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <motion.div className="project-row-image" variants={fadeUp}>
          <img src={image} alt={title} />
        </motion.div>

        <motion.div className="project-row-content" variants={fadeUp}>
          <h3 className="project-row-title">{title}</h3>
          <div className="project-row-meta">{location}</div>
          <p className="project-row-desc">{desc}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function Projects() {
  const { hero, intro, items } = PROJECTS;

  return (
    <>
      {/* HERO */}
      <section className="hero hero--editorial full-bleed projects-hero">
        <motion.div
          className="hero-content projects-hero-content"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="eyebrow" variants={fadeUp}>
            {hero.eyebrow}
          </motion.span>

          <motion.h1 className="projects-hero-title" variants={fadeUp}>
            {hero.title}
          </motion.h1>

          <motion.p className="projects-hero-lede" variants={fadeUp}>
            {hero.lede}
          </motion.p>
        </motion.div>
      </section>

      <PageShell>
        {/* INTRO */}
        <section className="section projects-intro">
          <motion.h2 variants={fadeUp}>{intro.title}</motion.h2>
          <motion.p variants={fadeUp}>{intro.body}</motion.p>
        </section>

        {/* PROJECT LIST */}
        {items.map((p, i) => (
          <ProjectRow key={p.title} {...p} reverse={i % 2 !== 0} />
        ))}
      </PageShell>
    </>
  );
}
