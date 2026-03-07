import { useRef } from "react";

import PageShell from "../../../components/layouts/PageShell";
import "./about.css";

import { ABOUT } from "./about.content";

import {
  ImgSiteInspection,
  ImgSiteManagement,
  ImgBackhoe,
  ImgCBDBuilding,
  ImgBackfill,
  ImgExcavationSite,
  CompanyProfilePages,
  CoverPage,
  SusLandDev,
  WideLandScape
} from "../../../assets/images";

import SectionRenderer from "../../../utils/SectionRenderer";
import HeroSection from "./HeroSection";
import StorySection from "./StorySection";
import TeamSection from "./TeamSection";
import AboutSlice from "./AboutSlice";
import RecordsSection from "./RecordsSection";

const FALLBACK_FLOW = [
  "story",
  "whyUs",
  "record",
  "missionVision",
  "coreValues",
  "team",
  "companyProfile",
];

export default function About() {
  const { hero, story, whyUs, intro, team, slices, order, record } = ABOUT;

  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const headlineWrapRef = useRef(null);
  const overlayRef = useRef(null);

  const FLOW = Array.isArray(order) && order.length ? order : FALLBACK_FLOW;
  const WHY_US_DATA = whyUs ?? intro;

  const registry = {
    story: () =>
      story ? (
        <StorySection
          story={story}
          images={[
            ImgCBDBuilding,
            ImgSiteManagement,
            ImgBackfill,
            ImgBackhoe,
            ImgExcavationSite,
          ]}
        />
      ) : null,

    missionVision: () =>
      slices?.missionVision ? (
        <AboutSlice
          {...slices.missionVision}
          mvImages={{ mission: SusLandDev, vision: WideLandScape }}
        />
      ) : null,

    whyUs: () =>
      slices?.whyUs ? (
        <AboutSlice
          {...slices.whyUs}
          imageSrc={ImgSiteInspection}
          imageAlt="Land development and materials supply"
        />
      ) : null,

    record: () => (record ? <RecordsSection data={record} /> : null),

    projectsInfo: () =>
      slices?.projectsInfo ? <AboutSlice {...slices.projectsInfo} /> : null,

    coreValues: () =>
      slices?.coreValues ? <AboutSlice {...slices.coreValues} /> : null,

    team: () => (team ? <TeamSection team={team} /> : null),

    companyProfile: () =>
      slices?.companyProfile ? (
        <AboutSlice
          {...slices.companyProfile}
          mvImages={{
            page1: CoverPage,
            allPages: CompanyProfilePages,
          }}
        />
      ) : null,
  };

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
            <SectionRenderer render={registry[key] ?? (() => null)} />
          </div>
        ))}
      </PageShell>
    </div>
  );
}
