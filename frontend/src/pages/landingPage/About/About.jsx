import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ImgConstructionSite, ImgBackhoe } from "../../../assets/images";
import PageShell from "../../../components/layouts/PageShell";
import "./about.css";

import {
  VIEWPORT,
  EASE,
  FADE_UP,
  STAGGER,
  FADE_IN,
} from "../../../motion/constants";

gsap.registerPlugin(ScrollTrigger);

const ABOUT = {
  hero: {
    bg: ImgConstructionSite,
    headline: "ABOUT",
    eyebrow: "About us",
  },

  intro: {
    label: "About",
    title:
      "A responsible land development company supplying high-quality backfill materials across CALABARZON and beyond.",
    body: [
      "CLIBERDUCHE CORPORATION was established to address a recurring challenge in land development projects: the need for reliable sourcing, consistent material quality, and dependable delivery timelines. From the beginning, the company set out to support projects that require scale, precision, and accountability.",

      "CLIBERDUCHE CORPORATION provides high-quality backfill materials as specified by clients—such as sub-base, aggregates, and boulders—to customers in the CALABARZON area and beyond.",

      "Our company-owned land development sites are strategically located in Laguna and Cavite, Philippines, with over 14 million cubic meters of landfill and backfilling materials available to meet the growing demands of the construction and development industry.",

      "Our operations are led by experienced engineers, site managers, and field teams with hands-on expertise in land development, materials sourcing, and site coordination—ensuring safety, quality, and efficiency at every stage of execution.",

      "We pursue long-term business relationships built on trust, transparency, and mutual benefit. The company is committed to sustainable and eco-friendly operations, strictly complying with regulations and guidelines set by government institutions such as the Department of Environment and Natural Resources (DENR).",

      "As client needs evolved, the company expanded into General Engineering and Civil Works, providing construction and development services for both horizontal and vertical projects—working toward becoming a reliable one-stop partner for land development requirements.",
    ],
    stats: [
      { k: "14M+ m³", v: "Landfill & backfilling materials" },
      { k: "Laguna + Cavite", v: "Company-owned development sites" },
      { k: "CALABARZON+", v: "Service area coverage" },
    ],
  },

  quote: {
    label: "Statement",
    text: "We are a responsible land development company committed to delivering high-quality backfill materials and dependable site solutions for infrastructure and land development projects. Our operations strictly adhere to environmental regulations in the Philippines while creating jobs, supporting communities, and delivering long-term value to our partners, employees, and stakeholders.",
  },

  founding: {
    label: "Background",
    title: "Founded in 2018 to build locally, at scale.",
    body: [
      "CLIBERDUCHE CORPORATION was officially registered with the Securities and Exchange Commission on November 28, 2018. The company was founded to pursue long-term opportunities in the Philippine construction and land development industry—building a future locally through responsible, scalable operations.",

      "The name CLIBERDUCHE is derived from the surnames of the original incorporators: Climaco, Beronilla, and Piaduche. As the company matured, leadership was refined to support operational focus, long-term stability, and strategic growth.",

      "Today, CLIBERDUCHE CORPORATION continues to operate with a clear mandate: deliver reliable materials, disciplined site execution, and sustainable land development solutions that meet the evolving needs of the industry.",
    ],
  },

  sections: [
    {
      label: "Projects information",
      title: "From small to large commercial and industrial projects.",
      body: "CLIBERDUCHE CORPORATION supports a wide range of projects including residential developments, commercial facilities, industrial sites, and public infrastructure works. Our experience spans small- to large-scale operations that require high-volume material sourcing, coordinated logistics, and strict adherence to project specifications.",
    },
    {
      label: "Land development",
      title: "End-to-end site preparation and civil works support.",
      body: "We provide end-to-end land development services including clearing, cutting and peeling, levelling, and RCP/PVC pipe laying. Our scope also covers bridges, concrete roads, gutters, ripraps, easements, and slope protection. By combining owned material sources with coordinated site execution, we help reduce delays, control costs, and maintain consistent quality across project phases.",
    },
    {
      label: "Mission",
      title: "Quality materials, sustainable operations, and shared value.",
      body: "We deliver high-quality backfill materials and land development services while adhering to environmental regulations in the Philippines. Through responsible operations, we create jobs, support communities, and deliver long-term value to investors, employees, and stakeholders.",
    },
    {
      label: "Vision",
      title: "To be a highly respected, world-class land development company.",
      body: "Our vision is to become a world-class land development company committed to international standards in operational excellence and environmental stewardship—developing sustainable projects that enable long-term economic use of land resources.",
    },
    {
      label: "Values",
      title: "Quality. Safety. Integrity.",
      body: "We take pride in offering reliable services at competitive prices while upholding the highest standards of Quality, Safety, and Integrity across all projects and partnerships.",
      bullets: [
        {
          k: "Quality",
          v: "Delivering materials and services that meet client specifications and comply with local and international standards.",
        },
        {
          k: "Safety",
          v: "Maintaining safe worksites and operations to protect personnel, partners, and surrounding communities.",
        },
        {
          k: "Integrity",
          v: "Operating with transparency, regulatory compliance, and accountability in every project and transaction.",
        },
      ],
    },
  ],
};

function AboutSection({ label, title, body, bullets }) {
  return (
    <section className="section about-slice">
      <motion.div
        className="about-slice-inner"
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <motion.aside className="about-slice-meta" variants={FADE_UP}>
          <span className="eyebrow">{label}</span>
        </motion.aside>

        <div>
          <motion.h2 className="about-slice-title" variants={FADE_UP}>
            {title}
          </motion.h2>

          <motion.p className="about-slice-text" variants={FADE_UP}>
            {body}
          </motion.p>

          {Array.isArray(bullets) && bullets.length > 0 && (
            <motion.div className="about-bullets" variants={FADE_UP}>
              {bullets.map((b) => (
                <div key={b.k} className="about-bullet">
                  <div className="about-bullet-k">{b.k}</div>
                  <div className="about-bullet-v">{b.v}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export default function About() {
  const { hero, intro, quote, sections } = ABOUT;

  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const headlineWrapRef = useRef(null);
  const overlayRef = useRef(null);

  const imageBandRef = useRef(null);
  const imageParallaxRef = useRef(null);

  const handleImgLoad = () => ScrollTrigger.refresh();

  useLayoutEffect(() => {
    if (!rootRef.current || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax lift on hero content
      if (stageRef.current) {
        gsap.to(stageRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            id: "about-hero-stage",
            trigger: heroRef.current,
            start: "top top",
            end: "+=500",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // Extra lift on headline wrapper
      if (headlineWrapRef.current) {
        gsap.to(headlineWrapRef.current, {
          y: -70,
          ease: "none",
          scrollTrigger: {
            id: "about-hero-headline",
            trigger: heroRef.current,
            start: "top top",
            end: "+=500",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // Overlay fade
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            id: "about-hero-overlay",
            trigger: heroRef.current,
            start: "top top",
            end: "+=500",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      const shift = window.innerWidth < 768 ? 16 : 28;

      // Image parallax
      if (imageParallaxRef.current && imageBandRef.current) {
        gsap.fromTo(
          imageParallaxRef.current,
          { y: shift },
          {
            y: -shift,
            ease: "none",
            scrollTrigger: {
              id: "about-image-parallax",
              trigger: imageBandRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, []);

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
              <motion.h1 className="kinetic-headline big" variants={FADE_UP}>
                {hero.headline}
              </motion.h1>
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
            viewport={VIEWPORT}
          >
            <motion.aside className="about-intro-meta" variants={FADE_UP}>
              <span className="eyebrow">{intro.label}</span>
            </motion.aside>

            <div>
              <motion.h2 className="about-intro-title" variants={FADE_UP}>
                {intro.title}
              </motion.h2>

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
            viewport={VIEWPORT}
          >
            <motion.aside className="about-intro-meta" variants={FADE_UP}>
              <span className="eyebrow">{ABOUT.founding.label}</span>
            </motion.aside>

            <div>
              <motion.h2 className="about-intro-title" variants={FADE_UP}>
                {ABOUT.founding.title}
              </motion.h2>

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
            viewport={VIEWPORT}
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
