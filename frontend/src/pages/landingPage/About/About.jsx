import { useRef } from "react";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PageShell from "../../../components/layouts/PageShell";
import "./about.css";

import TypewriterText from "../../../motion/TypewriterText";
import {
  EASE,
  FADE_UP,
  STAGGER,
  FADE_IN,
  VIEWPORT_EARLY,
  VIEWPORT,
} from "../../../motion/constants";

import AboutSection from "./AboutSection";
import { useAboutScrollFx } from "./useAboutScrollFx";
import { ABOUT, ImgBackhoe } from "./about.content";

export default function About() {
  const { hero, intro, quote, sections } = ABOUT;

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

  return (
    <div ref={rootRef}>
      {/* HERO */}
      <motion.section
        ref={heroRef}
        className="hero hero--editorial full-bleed about-hero"
        variants={FADE_IN}
        initial="hidden"
        animate="visible"
      >
        <div className="about-hero-bg" aria-hidden="true">
          <img className="about-hero-bg-img" src={hero.bg} alt="" />
        </div>

        <div ref={overlayRef} className="hero-overlay about-hero-overlay" />

        <div ref={stageRef} className="about-hero-stage">
          <motion.div
            className="hero-content about-hero-content"
            variants={STAGGER}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="eyebrow" variants={FADE_UP}>
              {hero.eyebrow}
            </motion.span>

            <div ref={headlineWrapRef} className="about-hero-headline-wrap">
              <TypewriterText
                as={motion.h1}
                className="kinetic-headline big"
                text={hero.headline}
                start="inView"
                speed={70}
                delay={150}
                inViewOptions={{ once: true, amount: 0.6 }}
                variants={FADE_UP}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      <PageShell>
        {/* INTRO */}
        <section className="section section--after-hero">
          <motion.div
            className="about-intro-inner"
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_EARLY}
          >
            <motion.aside className="about-intro-meta" variants={FADE_UP}>
              <span className="eyebrow">{intro.label}</span>
            </motion.aside>

            <div>
              <TypewriterText
                as={motion.h2}
                className="about-intro-title"
                text={intro.title}
                start="inView"
                speed={14}
                inViewOptions={VIEWPORT_EARLY}
              />

              {intro.body.map((p, i) => (
                <motion.p
                  key={i}
                  className="about-intro-text"
                  variants={FADE_UP}
                >
                  {p}
                </motion.p>
              ))}

              <motion.div className="about-stats" variants={FADE_UP}>
                {intro.stats.map((s) => (
                  <div key={s.k} className="about-stat">
                    <div className="about-stat-k">{s.k}</div>
                    <div className="about-stat-v">{s.v}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* FOUNDING */}
        <section className="section">
          <motion.div
            className="about-intro-inner"
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_EARLY}
          >
            <motion.aside className="about-intro-meta" variants={FADE_UP}>
              <span className="eyebrow">{ABOUT.founding.label}</span>
            </motion.aside>

            <div>
              <TypewriterText
                as={motion.h2}
                className="about-intro-title"
                text={ABOUT.founding.title}
                start="inView"
                speed={14}
                inViewOptions={VIEWPORT_EARLY}
                variants={FADE_UP}
              />

              {ABOUT.founding.body.map((p, i) => (
                <motion.p
                  key={i}
                  className="about-intro-text"
                  variants={FADE_UP}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </section>

        {/* QUOTE */}
        <section className="section">
          <motion.div
            className="about-quote-inner"
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_EARLY}
          >
            <motion.aside className="about-quote-meta" variants={FADE_UP}>
              <span className="eyebrow">{quote.label}</span>
            </motion.aside>

            <motion.blockquote className="about-quote-text" variants={FADE_UP}>
              “{quote.text}”
            </motion.blockquote>
          </motion.div>
        </section>

        {/* IMAGE */}
        <section className="section">
          <div ref={imageBandRef} className="image-band about-image-band">
            <motion.div
              className="about-image-reveal"
              initial={{ opacity: 0, scale: 1.03 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ ...VIEWPORT, margin: "-120px" }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <div ref={imageParallaxRef} className="about-image-parallax">
                <img
                  src={ImgBackhoe}
                  alt="Land development and materials supply"
                  className="about-image"
                  onLoad={handleImgLoad}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SLICES */}
        {sections.map((s) => (
          <AboutSection key={s.label} {...s} />
        ))}
      </PageShell>
    </div>
  );
}
