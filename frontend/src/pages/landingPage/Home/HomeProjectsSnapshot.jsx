import { motion } from "framer-motion";
import { useShowcaseProjects } from "../Projects/useShowcaseProjects";
import { fadeUpItem, revealStagger } from "./home.motion";

function ProjectCard({ project }) {
  const cover = project.photos?.[0]?.url || "/placeholder.jpg";

  return (
    <motion.article className="home-project-card" variants={fadeUpItem}>
      <div className="home-project-media">
        <img src={cover} alt={project.name} loading="lazy" draggable={false} />

        <div className="home-project-overlay" />

        <div className="home-project-content">
          <h3 className="home-project-title">{project.name}</h3>
          <p className="home-project-location">{project.address}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function HomeProjectsSnapshot() {
  const { projects, loading } = useShowcaseProjects();

  if (loading) return null;

  return (
    <motion.div
      className="home-projects-grid"
      variants={revealStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {projects.slice(0, 3).map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
}
