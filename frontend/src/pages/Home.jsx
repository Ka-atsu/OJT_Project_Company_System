import PageShell from "../components/layouts/PageShell";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ConstructionSite from "../assets/images/constructionSite.jpg";
import EarthMovingEquipment from "../assets/images/earthmovingEquipment.jpg";

import "../css/home.css";

gsap.registerPlugin(ScrollTrigger);

const VIEWPORT = { amount: 0.35 };
const VIEWPORT_CARDS = { amount: 0.25 };

const EASE = [0.22, 1, 0.36, 1];

const revealStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const HOME = {
  heroScroll: {
    tag: "What we do",
    eyebrow: "Land Development & Materials Supply",
    primaryCta: { label: "Our Capabilities", to: "/services" },
    secondaryCta: { label: "Request a Quote", to: "/contact" },
    slides: [
      {
        titleLines: ["Reliable materials", "for land development."],
        lede: "Backfill, aggregates, and soil resources—sourced and supplied for projects of all scales.",
        showActions: true,
      },
      {
        titleLines: ["Owned sites.", "Consistent quality."],
        lede: "We source from owned land development sites to maintain material consistency and reliable availability.",
        showActions: false,
      },
      {
        titleLines: ["Coordinated hauling", "and on-time delivery."],
        lede: "We plan volumes, logistics, and delivery schedules so your project keeps moving—without surprises.",
        showActions: false,
      },
    ],
  },

  modules: {
    eyebrow: "Core capabilities",
    title: "Built like a system",
    items: [
      {
        num: "01.",
        title: "Backfilling Materials",
        desc: "Engineered materials for site preparation, grading, and foundations.",
        img: EarthMovingEquipment,
        alt: "Backfilling materials",
      },
      {
        num: "02.",
        title: "Aggregates",
        desc: "Sub-base, base course, and graded aggregates supplied to spec.",
        img: EarthMovingEquipment,
        alt: "Aggregates",
      },
      {
        num: "03.",
        title: "Land Resources",
        desc: "Soil and earth materials sourced and delivered to site requirements.",
        img: EarthMovingEquipment,
        alt: "Land resources",
      },
    ],
  },
};

export default function Home() {
  const { heroScroll, modules } = HOME;

  const wrapRef = useRef(null);
  const pinRef = useRef(null);

  const [active, setActive] = useState(0);
  const total = heroScroll.slides.length;

  const slide = heroScroll.slides[active];
  const counterLeft = String(active + 1).padStart(2, "0");
  const counterRight = String(total).padStart(2, "0");

  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 700], [0, -24]);

  useLayoutEffect(() => {
    if (!wrapRef.current || !pinRef.current) return;

    ScrollTrigger.getById("home-hero-pin")?.kill(true);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: "home-hero-pin",
        trigger: wrapRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * total}`,
        pin: pinRef.current,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          setActive((prev) => (prev === idx ? prev : idx));
        },
      });

      ScrollTrigger.refresh();
    }, wrapRef);

    return () => {
      ScrollTrigger.getById("home-hero-pin")?.kill(true);
      ctx.revert();
    };
  }, [total]);

  return (
    <>
      <section ref={wrapRef} className="hero-scroll">
        <section
          ref={pinRef}
          className="hero full-bleed home-hero"
          style={{ "--hero-bg": `url(${ConstructionSite})` }}
        >
          <div className="hero-overlay home-hero-overlay" />

          <div className="home-hero-meta">
            <div className="home-hero-tag">{heroScroll.tag}</div>
            <div className="home-hero-counter">
              {counterLeft} <span className="home-hero-counter-divider">/</span>{" "}
              {counterRight}
            </div>
          </div>

          <div className="home-hero-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="hero-content home-hero-content"
                style={{ y: heroTextY }}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <motion.span
                  className="eyebrow"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                >
                  {heroScroll.eyebrow}
                </motion.span>

                <motion.h1
                  className="hero-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 }}
                >
                  {slide.titleLines[0]}
                  <br />
                  <span className="light">{slide.titleLines[1]}</span>
                </motion.h1>

                {slide.lede && (
                  <motion.p
                    className="home-hero-lede"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.12 }}
                  >
                    {slide.lede}
                  </motion.p>
                )}

                {slide.showActions && (
                  <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.16 }}
                  >
                    <Button
                      as={Link}
                      to={heroScroll.primaryCta.to}
                      variant="light"
                      size="lg"
                    >
                      {heroScroll.primaryCta.label}
                    </Button>

                    <Button
                      as={Link}
                      to={heroScroll.secondaryCta.to}
                      variant="outline-light"
                    >
                      {heroScroll.secondaryCta.label}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </section>

      <PageShell pad={false}>
        <section className="section section--tight home-modules">
          <div className="home-modules-inner">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={revealStagger}
            >
              <motion.span className="eyebrow" variants={fadeUpItem}>
                {modules.eyebrow}
              </motion.span>

              <motion.h2 className="home-section-title" variants={fadeUpItem}>
                {modules.title}
              </motion.h2>

              <motion.div
                className="home-modules-grid"
                variants={revealStagger}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_CARDS}
              >
                {modules.items.map((item) => (
                  <motion.article
                    key={item.num}
                    className="home-module"
                    variants={fadeUpItem}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div className="home-module-num">{item.num}</div>

                    <motion.div
                      className="home-module-media"
                      initial={{ scale: 1.02 }}
                      whileInView={{ scale: 1 }}
                      viewport={VIEWPORT_CARDS}
                      transition={{ duration: 0.8, ease: EASE }}
                    >
                      <img src={item.img} alt={item.alt} />
                    </motion.div>

                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </PageShell>
    </>
  );
}
