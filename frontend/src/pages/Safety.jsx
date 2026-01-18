import PageShell from "../components/layouts/PageShell";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../css/safety.css";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};

const VIEWPORT = {
  hero: { margin: "-120px" },
  section: { amount: 0.35 },
  cards: { margin: "-90px" },
};

const SAFETY = {
  hero: {
    eyebrow: "Safety",
    title: "Safety is integral to every activity.",
    lede: "Preventing injury and occupational disease is a continuing objective. We take every reasonable precaution to protect workers, clients, and the public.",
  },
  policy: [
    "CLIBERDUCHE CORPORATION is vitally interested in its employees’ health and safety and will make every effort to provide a safe and healthy work environment.",
    "All supervisors and workers are dedicated to continuing to reduce the risk of injury. As employer, CLIBERDUCHE CORPORATION is ultimately responsible for worker health and safety.",
    "As President, I personally promise that every reasonable precaution will be taken to protect our workers, including engaging a highly experienced Safety Officer to ensure a safe workplace.",
  ],
  roles: [
    {
      title: "President",
      desc: "Ultimately responsible for worker health and safety, ensuring reasonable precautions are taken and safety is embedded across operations.",
    },
    {
      title: "Supervisors",
      desc: "Accountable for health and safety under their supervision—ensuring equipment is safe and work complies with established procedures.",
    },
    {
      title: "Workers",
      desc: "Responsible for protecting their own health and safety by complying with the law and the safe work practices and procedures established by the company.",
    },
  ],
  principles: [
    {
      title: "Safety-First Culture",
      desc: "Safety is built into planning and daily operations across every site and project.",
    },
    {
      title: "Training & Competency",
      desc: "Workers receive adequate task-specific training to protect health and safety.",
    },
    {
      title: "Safe Equipment & Methods",
      desc: "Machinery and equipment must be safe, and work must follow established safe practices and procedures.",
    },
    {
      title: "Supervision & Accountability",
      desc: "Supervisors are held accountable for safety performance and compliance on site.",
    },
    {
      title: "Continuous Risk Reduction",
      desc: "We continuously identify hazards and reduce risk across all activities.",
    },
    {
      title: "Integrated Commitment",
      desc: "Health and safety form an integral part of this organization—from the president to the workers.",
    },
  ],
  link: {
    label: "Request Safety Information",
    to: "/contact",
  },
};

function Slice({ eyebrow, title, children }) {
  return (
    <section className="section safety-slice">
      <motion.div
        className="safety-slice-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT.section}
      >
        <motion.aside className="safety-slice-meta" variants={fadeUp}>
          <span className="eyebrow">{eyebrow}</span>
        </motion.aside>

        <div className="safety-slice-body">
          {title && (
            <motion.h2 className="safety-slice-title" variants={fadeUp}>
              {title}
            </motion.h2>
          )}
          {children}
        </div>
      </motion.div>
    </section>
  );
}

export default function Safety() {
  const { hero, policy, roles, principles, link } = SAFETY;

  return (
    <>
      {/* HERO (matches your editorial trend even without CSS) */}
      <section className="hero hero--editorial full-bleed safety-hero">
        <motion.div
          className="hero-content safety-hero-content"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="eyebrow" variants={fadeUp}>
            {hero.eyebrow}
          </motion.span>

          <motion.h1 className="safety-hero-title" variants={fadeUp}>
            {hero.title}
          </motion.h1>

          <motion.p className="safety-hero-lede" variants={fadeUp}>
            {hero.lede}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link className="btn btn-dark" to={link.to}>
              {link.label}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* CONTENT */}
      <PageShell>
        {/* Policy statement */}
        <Slice eyebrow="Policy" title="Our Safety Policy">
          {policy.map((p) => (
            <motion.p key={p} variants={fadeUp}>
              {p}
            </motion.p>
          ))}
        </Slice>

        {/* Roles */}
        <Slice
          eyebrow="Responsibilities"
          title="Shared responsibility at every level"
        >
          <Row className="g-3">
            {roles.map((r) => (
              <Col md={6} lg={4} key={r.title}>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT.cards}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title className="fw-semibold">{r.title}</Card.Title>
                      <Card.Text className="text-muted mb-0">
                        {r.desc}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Slice>

        {/* Principles */}
        <Slice
          eyebrow="How we work"
          title="Practical commitments on every site"
        >
          <Row className="g-3">
            {principles.map((c) => (
              <Col md={6} lg={4} key={c.title}>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT.cards}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title className="fw-semibold">{c.title}</Card.Title>
                      <Card.Text className="text-muted mb-0">
                        {c.desc}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Slice>
      </PageShell>
    </>
  );
}
