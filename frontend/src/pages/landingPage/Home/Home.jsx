import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import MetricsSection from "./sections/MetricsSection";
import ModulesSection from "./sections/ModulesSection";
import WhySection from "./sections/WhySection";
import ProjectsSection from "./sections/ProjectsSection";
import "./home.css";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MetricsSection />
      <ModulesSection />
      <WhySection />
      <ProjectsSection />
    </>
  );
}
