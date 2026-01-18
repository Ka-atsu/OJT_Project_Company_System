import PageShell from "../components/layouts/PageShell";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ConstructionSite from "../assets/Images/ConstructionSite.jpg";
import "./css/home.css";

export default function Home() {
  return (
    <PageShell pad={false}>
      {/* =====================
         HERO
      ===================== */}
      {/* SCROLL PIN WRAPPER */}
      <section className="hero-scroll">
        <div className="hero-pin">
          <section className="home-hero">
            <div className="home-hero-overlay" />

            <motion.div
              className="home-hero-content"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="eyebrow">
                Land Development & Materials Supply
              </span>

              <h1 className="home-headline">
                Supplying backfilling materials
                <br />
                and aggregates for construction
                <br />
                and land development.
              </h1>

              <div className="home-hero-actions">
                <Button as={Link} to="/services" variant="light">
                  Our Capabilities
                </Button>
                <Button as={Link} to="/contact" variant="outline-light">
                  Get a Quote
                </Button>
              </div>
            </motion.div>
          </section>
        </div>
      </section>

      <div className="section-line" />

      {/* =====================
         WHAT WE SUPPLY
      ===================== */}
      <section className="home-section">
        <span className="eyebrow">Capabilities</span>
        <h2 className="home-section-title">What we supply</h2>

        <p className="home-section-intro">
          Materials sourced and supplied to support construction and land
          development projects of all scales.
        </p>

        <Row>
          <Col md={4}>
            <h3>Backfilling Materials</h3>
            <p>
              Quality materials for land development, foundations, and site
              preparation.
            </p>
          </Col>

          <Col md={4}>
            <h3>Aggregates</h3>
            <p>
              Sub-base, base course, and graded aggregates for construction
              works.
            </p>
          </Col>

          <Col md={4}>
            <h3>Land Resources</h3>
            <p>
              Soil and land resources supplied according to site and project
              requirements.
            </p>
          </Col>
        </Row>
      </section>

      {/* =====================
         SUPPORTING IMAGE
      ===================== */}
      <section className="home-image-band">
        <motion.img
          src={ConstructionSite}
          alt="Construction and land development"
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: "-120px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </section>

      {/* =====================
         PROCESS / TRUST
      ===================== */}
      <motion.section
        className="home-section home-process"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6 }}
      >
        <Row>
          <Col md={6}>
            <span className="eyebrow">Our process</span>
            <h2>How we work</h2>
            <ol>
              <li>Understand site and volume requirements</li>
              <li>Source materials from owned sites</li>
              <li>Coordinate hauling and delivery</li>
              <li>Support supply throughout the project</li>
            </ol>
          </Col>

          <Col md={6}>
            <span className="eyebrow">Why clients trust us</span>
            <h2>Built on reliability</h2>
            <ul>
              <li>Owned land development sites</li>
              <li>Consistent material quality</li>
              <li>On-time delivery</li>
              <li>Regulatory compliance</li>
            </ul>
          </Col>
        </Row>
      </motion.section>

      {/* =====================
         CTA
      ===================== */}
      <section className="home-cta">
        <div className="home-cta-content">
          <span className="eyebrow">Next steps</span>
          <h2>Ready to break ground?</h2>
          <p>
            Tell us about your site and material requirements and we’ll help
            plan the next steps.
          </p>
          <Button as={Link} to="/contact" variant="light">
            Let’s get started
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
