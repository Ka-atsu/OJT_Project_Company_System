import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/services.css";
import { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import projectManagementConsultation from "../assets/Images/projectManagementConsultation.jpg";
import backfillImg from "../assets/Images/backfill.jpg";
import landImg from "../assets/Images/land.jpg";
import aggregatesImg from "../assets/Images/aggregates.jpg";
import siteManagement from "../assets/Images/siteManagement.jpg";

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const SERVICES = {
  hero: {
    eyebrow: "Service",
    intro:
      "Structured capabilities for land development and materials supply—built for scale, reliability, and safe operations.",
  },
  blocks: {
    primary: { eyebrow: "Primary Function", title: "Core capabilities" },
    secondary: { eyebrow: "Secondary Function", title: "Support services" },
  },
};

function ServiceCardItem({ i, title, desc, tags, image }) {
  const isReverse = i % 2 === 1;

  return (
    <div className="services-card">
      <Row
        className={`services-card-row g-4 align-items-center ${
          isReverse ? "flex-md-row-reverse" : ""
        }`}
      >
        <Col md={6} className="services-card-image">
          <img src={image} alt={title} className="services-image" />
        </Col>

        <Col md={6} className="services-card-body">
          <div className="services-card-body-inner">
            <h3 className="services-title">
              <span className="services-index">
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              {title}
            </h3>

            <p className="services-desc">{desc}</p>

            <div className="services-tags">
              {tags.map((t) => (
                <span key={t} className="services-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default function Services() {
  const { hero, blocks } = SERVICES;

  const primary = [
    {
      title: "Backfill Sourcing / Land Sourcing",
      desc: "Sourcing backfill and land resources based on client specifications, volumes, and site requirements.",
      tags: ["Sourcing", "Backfill", "Land resources"],
      image: backfillImg,
    },
    {
      title: "Land Development",
      desc: "Site preparation and land development support including clearing, grading, and coordinated project execution.",
      tags: ["Land dev", "Site prep", "Civil works"],
      image: landImg,
    },
    {
      title: "Site Management",
      desc: "On-site coordination focused on safety, workflow, and execution to keep operations efficient and compliant.",
      tags: ["Coordination", "Safety", "Operations"],
      image: siteManagement,
    },
    {
      title: "Equipment Leasing",
      desc: "Equipment support and leasing options to help projects scale efficiently based on schedule and scope.",
      tags: ["Equipment", "Leasing", "Support"],
      image: aggregatesImg,
    },
  ];

  const secondary = [
    {
      title: "Additional Land Development Support",
      desc: "Additional land development support for projects requiring extended scope or supplemental services.",
      tags: ["Support", "Extended scope", "Coordination"],
      image: landImg,
    },
    {
      title: "Project Management Consultation",
      desc: "Consultation on planning, sequencing, sourcing, and delivery strategy for smoother project execution.",
      tags: ["Consultation", "Planning", "Strategy"],
      image: projectManagementConsultation,
    },
  ];

  const stageRef = useRef(null);
  const pinRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // pin + cover
      ScrollTrigger.create({
        trigger: stageRef.current,
        start: "top top",
        end: "+=100%", // one screen scroll
        pin: pinRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // subtle fade as the sheet covers (no transform vibes)
      gsap.to("[data-hero]", {
        opacity: 0.18,
        ease: "none",
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
      });
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* PINNED HERO STAGE */}
      <section ref={stageRef} className="services-hero-stage">
        <div ref={pinRef} className="services-hero-pin" data-hero>
          {/* underlay behind hero */}
          <div className="services-hero-underlay" aria-hidden="true">
            <div className="services-hero-underlay-inner">
              <span className="eyebrow">{blocks.primary.eyebrow}</span>
              <h2 className="services-hero-underlay-title">
                {blocks.primary.title}
              </h2>
              <p className="services-hero-underlay-lede">
                Scroll to explore the full list of services.
              </p>
            </div>
          </div>

          {/* hero */}
          <section className="services-editorial full-bleed">
            <div className="services-intro">
              <span className="eyebrow">{hero.eyebrow}</span>

              <h1 className="services-hero-title">
                Built for land development at scale.
              </h1>

              <p className="services-intro-text">{hero.intro}</p>

              <div className="services-hero-actions">
                <a className="btn btn-dark services-hero-btn" href="#primary">
                  View core services
                </a>
                <a
                  className="btn btn-outline-dark services-hero-btn"
                  href="/contact"
                >
                  Request a quote
                </a>
              </div>
            </div>

            <div className="services-hero-visual">
              <div
                className="services-hero-media"
                style={{ "--hero-img": `url(${landImg})` }}
                aria-hidden="true"
              >
                <div className="services-hero-card">
                  <div className="services-hero-chip">Core</div>

                  <div className="services-hero-metric">
                    <span className="services-hero-metric-num">04</span>
                    <span className="services-hero-metric-label">
                      Primary Function
                    </span>
                  </div>

                  <div className="services-hero-metric">
                    <span className="services-hero-metric-num">02</span>
                    <span className="services-hero-metric-label">
                      Secondary Function
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* PRIMARY */}
      <section id="primary" className="services-block">
        <div className="services-block-head">
          <span className="eyebrow">{blocks.primary.eyebrow}</span>
          <h2 className="services-block-title">{blocks.primary.title}</h2>
        </div>

        <Row className="services-grid services-grid--primary">
          {primary.map((s, i) => (
            <Col md={12} key={s.title} className="services-col">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.35 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <ServiceCardItem i={i} {...s} />
              </motion.div>
            </Col>
          ))}
        </Row>
      </section>

      {/* SECONDARY */}
      <section id="secondary" className="services-block">
        <div className="services-block-head">
          <span className="eyebrow">{blocks.secondary.eyebrow}</span>
          <h2 className="services-block-title">{blocks.secondary.title}</h2>
        </div>

        <Row className="services-grid services-grid--secondary">
          {secondary.map((s, i) => (
            <Col md={12} key={s.title} className="services-col">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.35 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <ServiceCardItem i={i} {...s} />
              </motion.div>
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
}
