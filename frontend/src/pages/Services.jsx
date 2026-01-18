import PageShell from "../components/layouts/PageShell";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../css/services.css";
import { motion } from "framer-motion";

import backfillImg from "../assets/Images/backfill.jpg";
import aggregatesImg from "../assets/Images/aggregates.jpg";
import landImg from "../assets/Images/land.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const VIEWPORT = {
  hero: { margin: "-100px" },
  cards: { margin: "-80px" },
  sections: { amount: 0.35 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
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

export default function Services() {
  const { hero, blocks } = SERVICES;

  const featured = [
    { title: "Backfill / Land Sourcing", image: backfillImg },
    { title: "Land Development", image: landImg },
    { title: "Site Management", image: aggregatesImg },
  ];

  const primary = [
    {
      title: "Backfill Sourcing / Land Sourcing",
      desc: "Sourcing backfill and land resources based on client specifications, volumes, and site requirements.",
      tags: ["Sourcing", "Backfill", "Land resources"],
    },
    {
      title: "Land Development",
      desc: "Site preparation and land development support including clearing, grading, and coordinated project execution.",
      tags: ["Land dev", "Site prep", "Civil works"],
    },
    {
      title: "Site Management",
      desc: "On-site coordination focused on safety, workflow, and execution to keep operations efficient and compliant.",
      tags: ["Coordination", "Safety", "Operations"],
    },
    {
      title: "Equipment Leasing",
      desc: "Equipment support and leasing options to help projects scale efficiently based on schedule and scope.",
      tags: ["Equipment", "Leasing", "Support"],
    },
  ];

  const secondary = [
    {
      title: "Land Development",
      desc: "Additional land development support for projects requiring extended scope or supplemental services.",
      tags: ["Support", "Extended scope", "Coordination"],
    },
    {
      title: "Project Management Consultation",
      desc: "Consultation on planning, sequencing, sourcing, and delivery strategy for smoother project execution.",
      tags: ["Consultation", "Planning", "Strategy"],
    },
  ];

  return (
    <>
      {/* =====================
         SERVICES HERO
      ===================== */}
      <section className="services-editorial full-bleed">
        <div className="services-intro">
          <span className="eyebrow">{hero.eyebrow}</span>
          <p className="services-intro-text">{hero.intro}</p>
        </div>

        <motion.div
          className="services-visuals"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT.hero}
          variants={stagger}
        >
          {featured.map((s) => (
            <motion.div
              key={s.title}
              className="services-visual"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div
                className="services-visual-image"
                style={{ backgroundImage: `url(${s.image})` }}
              />
              <span className="services-visual-label">{s.title}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* =====================
         PRIMARY + SECONDARY
      ===================== */}
      <PageShell fluid={false}>
        {/* PRIMARY */}
        <section className="services-block">
          <div className="services-block-head">
            <span className="eyebrow">{blocks.primary.eyebrow}</span>
            <h2 className="services-block-title">{blocks.primary.title}</h2>
          </div>

          <Row className="services-grid services-grid--primary">
            {primary.map((s, i) => (
              <Col md={6} lg={4} key={s.title} className="services-col">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={VIEWPORT.cards}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Card className="services-card">
                    <Card.Body className="services-card-body">
                      <h3 className="services-title">
                        <span className="services-index">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.title}
                      </h3>

                      <p className="services-desc">{s.desc}</p>

                      <div className="services-tags">
                        {s.tags.map((t) => (
                          <span key={t} className="services-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </section>

        {/* SECONDARY (2 columns on desktop to avoid dead space) */}
        <section className="services-block services-block--secondary">
          <div className="services-block-head">
            <span className="eyebrow">{blocks.secondary.eyebrow}</span>
            <h2 className="services-block-title">{blocks.secondary.title}</h2>
          </div>

          <Row className="services-grid services-grid--secondary">
            {secondary.map((s, i) => (
              <Col md={6} lg={6} key={s.title} className="services-col">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={VIEWPORT.cards}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Card className="services-card">
                    <Card.Body className="services-card-body">
                      <h3 className="services-title">
                        <span className="services-index">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.title}
                      </h3>

                      <p className="services-desc">{s.desc}</p>

                      <div className="services-tags">
                        {s.tags.map((t) => (
                          <span key={t} className="services-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </section>
      </PageShell>
    </>
  );
}
