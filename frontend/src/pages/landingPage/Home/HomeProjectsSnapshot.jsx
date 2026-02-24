import { motion } from "framer-motion";
import { PROJECTS } from "../Projects/projects.data";
import { fadeUpItem, revealStagger } from "./home.motion";

function ProjectCard({ project }) {
  const cover = project.images?.[0];

  return (
    <motion.article
      className="home-project-card"
      variants={fadeUpItem}
    >
      <div className="home-project-media">
        <img
          src={cover}
          alt={project.title}
          loading="lazy"
          draggable={false}
        />

        {/* Dark Gradient */}
        <div className="home-project-overlay" />

        {/* Content */}
        <div className="home-project-content">
          <h3 className="home-project-title">
            {project.title}
          </h3>
          <p className="home-project-location">
            {project.location}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function HomeProjectsSnapshot() {
  const featured = PROJECTS.featured;

  return (
    <motion.div
      className="home-projects-grid"
      variants={revealStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {featured.items.slice(0, 3).map((project) => (
        <ProjectCard
          key={project.title}
          project={project}
        />
      ))}
    </motion.div>
  );
}