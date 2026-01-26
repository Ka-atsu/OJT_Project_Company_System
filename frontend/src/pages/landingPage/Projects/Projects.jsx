// Projects.jsx
import PageShell from "../../../components/layouts/PageShell";
import { motion } from "framer-motion";
import "./projects.css";
import { FADE_UP, STAGGER, VIEWPORT } from "../../../motion/constants";

import ProjectCard from "./ProjectCard";
import { PROJECTS } from "./projects.data";

export default function Projects() {
  const { hero, intro, items } = PROJECTS;

  return (
    <>
      <section className="hero hero--editorial full-bleed projects-hero">
        <motion.div
          className="hero-content projects-hero-content"
          variants={STAGGER}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="eyebrow" variants={FADE_UP}>
            {hero.eyebrow}
          </motion.span>
          <motion.h1 className="projects-hero-title" variants={FADE_UP}>
            {hero.title}
          </motion.h1>
          <motion.p className="projects-hero-lede" variants={FADE_UP}>
            {hero.lede}
          </motion.p>
        </motion.div>
      </section>

      <PageShell>
        <section className="section projects-intro">
          <motion.h2 variants={FADE_UP}>{intro.title}</motion.h2>
          <motion.p variants={FADE_UP}>{intro.body}</motion.p>
        </section>
      </PageShell>

      <section className="section projects-gallery">
        <div className="projects-header">
          <h2>Project Gallery</h2>
          <p>Browse selected works. Scroll horizontally.</p>
        </div>

        <motion.div
          className="projects-list"
          variants={STAGGER}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {items.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </motion.div>
      </section>
    </>
  );
}
