import { useMemo, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PageShell from "../../../components/layouts/PageShell";
import "./about.css";

import { useAboutScrollFx } from "./useAboutScrollFx";
import { ABOUT, ImgBackhoe, ImgCBDBuilding } from "./about.content";

import SectionRenderer from "../../../utils/SectionRenderer";
import HeroSection from "./HeroSection";
import WhyUsSection from "./WhyUsSection";
import StorySection from "./StorySection";
import TeamSection from "./TeamSection";
import AboutSlice from "./AboutSlice";

const FALLBACK_FLOW = [
  "missionVision",
  "whyUs",
  "story",
  "coreValues",
  "team",
  "companyProfile",
];

export default function About() {
  const { hero, whyUs, intro, founding, team, slices, order } = ABOUT;

  // refs / scroll fx
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const headlineWrapRef = useRef(null);
  const overlayRef = useRef(null);
  const imageBandRef = useRef(null);
  const imageParallaxRef = useRef(null);

  useAboutScrollFx({
    rootRef,
    heroRef,
    stageRef,
    headlineWrapRef,
    overlayRef,
    imageBandRef,
    imageParallaxRef,
  });

  const handleImgLoad = () => ScrollTrigger.refresh();

  // precedence controlled by about.content.js (fallback if missing)
  const FLOW = Array.isArray(order) && order.length ? order : FALLBACK_FLOW;

  // supports both structures
  const WHY_US_DATA = whyUs ?? intro;

  const registry = useMemo(
    () => ({
      missionVision: () =>
        slices?.missionVision ? (
          <AboutSlice
            {...slices.missionVision}
            mvImages={{ mission: ImgCBDBuilding, vision: ImgBackhoe }}
          />
        ) : null,

      whyUs: () =>
        WHY_US_DATA ? (
          <WhyUsSection
            intro={WHY_US_DATA}
            imageSrc={ImgBackhoe}
            imageAlt="Land development and materials supply"
          />
        ) : null,

      story: () =>
        founding ? (
          <StorySection
            founding={founding}
            imageSrc={ImgCBDBuilding}
            onImgLoad={handleImgLoad}
          />
        ) : null,

      coreValues: () =>
        slices?.coreValues ? <AboutSlice {...slices.coreValues} /> : null,

      team: () => (team ? <TeamSection team={team} /> : null),

      companyProfile: () =>
        slices?.companyProfile ? (
          <AboutSlice {...slices.companyProfile} />
        ) : null,

      projectsInfo: () =>
        slices?.projectsInfo ? <AboutSlice {...slices.projectsInfo} /> : null,
    }),
    [slices, WHY_US_DATA, founding, team, handleImgLoad],
  );

  return (
    <div ref={rootRef}>
      <HeroSection
        hero={hero}
        heroRef={heroRef}
        stageRef={stageRef}
        headlineWrapRef={headlineWrapRef}
        overlayRef={overlayRef}
      />

      <PageShell>
        {FLOW.map((key) => (
          <SectionRenderer key={key} render={registry[key]} />
        ))}
      </PageShell>
    </div>
  );
}
