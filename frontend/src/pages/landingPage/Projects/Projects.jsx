import { useShowcaseProjects } from "./useShowcaseProjects";
import PageShell from "../../../components/layouts/PageShell";
import { PROJECTS_CONTENT } from "./projects.content";
import ProjectsHero from "./ProjectsHero";
import ProjectsInfo from "./ProjectsInfo";
import FeaturedProjects from "./FeaturedProjects";
import "./projects.css";

export default function Projects() {
  const { hero, stats, deliver, featured } = PROJECTS_CONTENT;
  const { projects, loading } = useShowcaseProjects();

  return (
    <>
      <ProjectsHero images={hero.images} duration={60} direction="right" />

      <PageShell>
        <ProjectsInfo hero={hero} stats={stats} deliver={deliver} />

        <FeaturedProjects
          title={featured.title}
          filters={featured.filters}
          items={projects}
          loading={loading}
        />
      </PageShell>
    </>
  );
}
