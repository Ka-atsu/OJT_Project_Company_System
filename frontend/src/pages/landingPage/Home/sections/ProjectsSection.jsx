import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { HOME } from "../home.content";
import { revealStagger, fadeUpItem } from "../home.motion";
import { VIEWPORT } from "../../../../motion/constants";

import HomeProjectsSnapshot from "../HomeProjectsSnapshot";

export default function ProjectsSection() {
  const { overview } = HOME;

  return (
    <section className="section home-projects">
      <div className="container">
        <motion.div
          className="home-projects-inner"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={revealStagger}
        >
          {/* Eyebrow */}
          <motion.span className="eyebrow" variants={fadeUpItem}>
            {overview.projects.eyebrow}
          </motion.span>

          {/* Title */}
          <motion.h2 variants={fadeUpItem}>{overview.projects.title}</motion.h2>

          {/* Description */}
          <motion.p variants={fadeUpItem} className="home-projects-text">
            {overview.projects.desc}
          </motion.p>

          {/* Projects Grid */}
          <HomeProjectsSnapshot />

          {/* CTA */}
          <motion.div variants={fadeUpItem}>
            <Link
              to={overview.projects.cta.to}
              className="btn btn-outline-blue"
            >
              {overview.projects.cta.label}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
