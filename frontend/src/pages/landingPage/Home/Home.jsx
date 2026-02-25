import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ImgConstructionSite } from "../../../assets/images";
import { HOME } from "./home.content";
import { useHomeHeroScroll } from "./useHomeHeroScroll";

import { revealStagger, fadeUpItem, heroSwap, fadeInRight } from "./home.motion";
import { EASE, VIEWPORT, VIEWPORT_CARDS } from "../../../motion/constants";
import logo from "../../../assets/Images/logo.jpg";

import HomeProjectsSnapshot from "./HomeProjectsSnapshot";
import CountUp from "react-countup";
import { FaShieldAlt, FaCheckCircle, FaClock, FaNetworkWired } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

import "./home.css";

export default function Home() {
  const { heroScroll, modules, overview } = HOME;

  const wrapRef = useRef(null);
  const pinRef = useRef(null);
  const stageRef = useRef(null);

  const [active, setActive] = useState(0);
  const total = heroScroll.slides.length;
  const slide = heroScroll.slides[active];

  const counterLeft = String(active + 1).padStart(2, "0");
  const counterRight = String(total).padStart(2, "0");

  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  // Start counting when section is in view
  useEffect(() => {
    if (inView) {
      setStartCount(true);
    }
  }, [inView]);

  // Reset when component unmounts (leaving page)
  useEffect(() => {
    return () => {
      setStartCount(false);
    };
  }, []);

  useHomeHeroScroll({
    wrapRef,
    pinRef,
    stageRef,
    total,
    setActive,
  });

  return (
    <>
      {/* ================= HERO ================= */}
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
                  <motion.div className="hero-actions">
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

      {/* ================= ABOUT SNAPSHOT ================= */}
      <section className="section home-about">
        <div className="container">
          <motion.div
            className="home-about-grid"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={revealStagger}
          >
            {/* About Us Text */}
            <motion.div className="home-about-text-wrapper" variants={fadeUpItem}>
              <motion.span className="eyebrow" variants={fadeUpItem}>
                {overview.about.eyebrow}
              </motion.span>

              <motion.h2 variants={fadeUpItem}>
                {overview.about.title}
              </motion.h2>

              <motion.p className="home-about-text" variants={fadeUpItem}>
                {overview.about.desc}
              </motion.p>

               <motion.div className="home-about-cta" variants={fadeUpItem}>
              <Link to="/about" className="btn btn-outline-blue">
                Learn More →
              </Link>
            </motion.div>
            </motion.div>

            {/* Logo / Image */}
            <motion.div className="home-about-logo" variants={fadeInRight}>
              <img src={logo} alt="Company Logo" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      
        {/* ================= METRICS ================= */}
      <section ref={ref} className="home-metrics">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={revealStagger}
            className="home-metrics-inner"
          >
            <motion.div className="home-metric" variants={fadeUpItem}>
              <motion.div
              className="home-metric-value"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {startCount && <CountUp end={8} duration={2} suffix="+" />}
            </motion.div>

              <div className="home-metric-label">Years of Operational Experience</div>
              <div className="home-metric-sub">
                Established expertise in materials supply and site operations
              </div>
            </motion.div>

            <motion.div className="home-metric" variants={fadeUpItem}>
             <motion.div
              className="home-metric-value"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {startCount && <CountUp end={150} duration={2} suffix="+" />}
            </motion.div>
              <div className="home-metric-label">Projects Completed</div>
              <div className="home-metric-sub">
                Delivered across residential, commercial, and infrastructure sites
              </div>
            </motion.div>

            <motion.div className="home-metric" variants={fadeUpItem}>
              <motion.div
              className="home-metric-value"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {startCount && <CountUp end={100} duration={2} suffix="%" />}
            </motion.div>
              <div className="home-metric-label">Regulatory Compliance</div>
              <div className="home-metric-sub">
                Fully aligned with DENR and local government requirements
              </div>
            </motion.div>

            <motion.div className="home-metric home-metric--text" variants={fadeUpItem}>
              <div className="home-metric-value">CALABARZON</div>
              <div className="home-metric-label">Service Coverage Area</div>
              <div className="home-metric-sub">
                Strategically positioned supply sources across the region
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= CORE CAPABILITIES ================= */}
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
                >
                  <div className="home-module-num">{item.num}</div>
                  <div className="home-module-media">
                    <img src={item.img} alt={item.alt} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.article>
              ))}
            </motion.div>
           {/* ================= VIEW ALL SERVICES BUTTON ================= */}
            <motion.div
              className="home-modules-cta"
              variants={fadeUpItem}
            >
              <Link to="/services" className="btn btn-outline-blue">
                View All Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
          <section className="section home-why">
            <div className="container home-why-inner">
              <motion.span className="eyebrow" variants={fadeUpItem}>
                Why Clients Choose Us
              </motion.span>

              <motion.h2 variants={fadeUpItem}>
                Built for reliability, compliance, and consistency.
              </motion.h2>

              <motion.div
                className="home-why-grid"
                variants={revealStagger}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_CARDS}
              >
                <motion.div className="home-why-item" variants={fadeUpItem}>
                  <FaShieldAlt className="why-icon" />
                  <h4>DENR Compliant Operations</h4>
                  <p>Strict adherence to environmental and regulatory standards across all projects.</p>
                </motion.div>

                <motion.div className="home-why-item" variants={fadeUpItem}>
                  <FaCheckCircle className="why-icon" />
                  <h4>Quality-Controlled Materials</h4>
                  <p>Engineered sourcing from controlled development areas to ensure consistency.</p>
                </motion.div>

                <motion.div className="home-why-item" variants={fadeUpItem}>
                  <FaClock className="why-icon" />
                  <h4>On-Time Delivery</h4>
                  <p>Coordinated hauling and logistics planning to avoid delays.</p>
                </motion.div>

                <motion.div className="home-why-item" variants={fadeUpItem}>
                  <FaNetworkWired className="why-icon" />
                  <h4>Local Supply Network</h4>
                  <p>Strategically positioned sources serving projects across CALABARZON.</p>
                </motion.div>
              </motion.div>
            </div>
          </section>


      {/* ================= PROJECTS SNAPSHOT ================= */}
      <section className="section home-projects">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={revealStagger}
            className="home-projects-inner"
          >
            <motion.span className="eyebrow" variants={fadeUpItem}>
              {overview.projects.eyebrow}
            </motion.span>

            <motion.h2 variants={fadeUpItem}>
              {overview.projects.title}
            </motion.h2>

            <motion.p variants={fadeUpItem} className="home-projects-text">
              {overview.projects.desc}
            </motion.p>

            <HomeProjectsSnapshot />

            <motion.div variants={fadeUpItem}>
              <Link to={overview.projects.cta.to} className="btn btn-outline-blue">
                {overview.projects.cta.label}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
