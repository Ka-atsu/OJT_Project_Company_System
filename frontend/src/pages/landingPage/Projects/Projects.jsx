// Projects.jsx
import PageShell from "../../../components/layouts/PageShell";
import "./projects.css";
import { PROJECTS } from "./projects.data";

import ProjectsHero from "./ProjectsHero";
import ProjectsInfo from "./ProjectsInfo";
import FeaturedProjects from "./FeaturedProjects";

export default function Projects() {
  const { hero, stats, deliver, featured } = PROJECTS;

  return (
    <>
      <ProjectsHero images={hero.images} duration={60} direction="right" />

      <PageShell>
        <ProjectsInfo hero={hero} stats={stats} deliver={deliver} />
        <h1>for now the data is not connected to the database</h1>
        <FeaturedProjects featured={featured} />
      </PageShell>
    </>
  );
}
