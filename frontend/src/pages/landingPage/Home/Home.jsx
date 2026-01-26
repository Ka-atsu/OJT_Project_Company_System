import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ImgConstructionSite } from "../../../assets/images";
import { HOME } from "./home.content";
import { useHomeHeroScroll } from "./useHomeHeroScroll";

import { revealStagger, fadeUpItem, heroSwap } from "./home.motion";
import { EASE, VIEWPORT, VIEWPORT_CARDS } from "../../../motion/constants";

import "./home.css";

export default function Home() {
  const { heroScroll, modules } = HOME;

  const wrapRef = useRef(null);
  const pinRef = useRef(null);
  const stageRef = useRef(null);

  const [active, setActive] = useState(0);
  const total = heroScroll.slides.length;
  const slide = heroScroll.slides[active];

  const counterLeft = String(active + 1).padStart(2, "0");
  const counterRight = String(total).padStart(2, "0");

  useHomeHeroScroll({
    wrapRef,
    pinRef,
    stageRef,
    total,
    setActive,
  });

  return (
    <>
      {/* HERO */}
      <section ref={wrapRef} className="hero-scroll">
        <section ref={pinRef} className="hero full-bleed home-hero">
          <div className="home-hero-bg" aria-hidden="true">
            <img
              className="home-hero-bg-img"
              src={ImgConstructionSite}
              alt=""
            />
          </div>

          <div className="hero-overlay home-hero-overlay" />

          <div className="home-hero-meta">
            <div className="home-hero-tag">{heroScroll.tag}</div>
            <div className="home-hero-counter">
              {counterLeft}
              <span className="home-hero-counter-divider">/</span>
              {counterRight}
            </div>
          </div>

          <div ref={stageRef} className="home-hero-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="hero-content home-hero-content"
                variants={heroSwap}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.span
                  className="eyebrow"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.05, ease: EASE }}
                >
                  {heroScroll.eyebrow}
                </motion.span>

                <motion.h1
                  className="hero-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08, ease: EASE }}
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
                    transition={{
                      duration: 0.35,
                      delay: 0.12,
                      ease: EASE,
                    }}
                  >
                    {slide.lede}
                  </motion.p>
                )}

                {slide.showActions && (
                  <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.16,
                      ease: EASE,
                    }}
                  >
                    {/* PRIMARY CTA */}
                    <Link
                      to={heroScroll.primaryCta.to}
                      className="btn btn-filled"
                    >
                      {heroScroll.primaryCta.label}
                    </Link>

                    {/* SECONDARY CTA */}
                    <Link
                      to={heroScroll.getStarted.to}
                      className="btn btn-outline"
                    >
                      {heroScroll.getStarted.label}
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </section>

      {/* MODULES */}
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
    </>
  );
}
