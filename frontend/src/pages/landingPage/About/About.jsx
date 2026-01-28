import { useMemo, useRef } from "react";

import PageShell from "../../../components/layouts/PageShell";
import "./about.css";

import {
  ABOUT,
  ImgBackhoe,
  ImgCBDBuilding,
  ImgBackfill,
  ImgExcavationSite,
  ImgSiteManagement,
} from "./about.content";

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
  "projectsInfo",
  "coreValues",
  "team",
  "companyProfile",
];

export default function About() {
  const { hero, whyUs, intro, founding, team, slices, order } = ABOUT;

  // keep these refs ONLY if HeroSection uses them internally
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const headlineWrapRef = useRef(null);
  const overlayRef = useRef(null);

  const FLOW = Array.isArray(order) && order.length ? order : FALLBACK_FLOW;
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
            images={[
              ImgCBDBuilding,
              ImgSiteManagement,
              ImgBackfill,
              ImgBackhoe,
              ImgExcavationSite,
            ]}
          />
        ) : null,

      projectsInfo: () =>
        slices?.projectsInfo ? <AboutSlice {...slices.projectsInfo} /> : null,

      coreValues: () =>
        slices?.coreValues ? <AboutSlice {...slices.coreValues} /> : null,

      team: () => (team ? <TeamSection team={team} /> : null),

      companyProfile: () =>
        slices?.companyProfile ? (
          <AboutSlice {...slices.companyProfile} />
        ) : null,
    }),
    [slices, WHY_US_DATA, founding, team],
  );

  return (
    <div>
      <HeroSection
        hero={hero}
        heroRef={heroRef}
        stageRef={stageRef}
        headlineWrapRef={headlineWrapRef}
        overlayRef={overlayRef}
      />

      <PageShell>
        {FLOW.map((key) => (
          <div key={key} id={`about-${key}`} className="about-anchor">
            <SectionRenderer render={registry[key]} />
          </div>
        ))}
      </PageShell>
    </div>
  );
}
