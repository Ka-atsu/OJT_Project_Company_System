import PageShell from "../components/layouts/PageShell";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./css/services.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import backfillImg from "../assets/Images/backfill.jpg";
import aggregatesImg from "../assets/Images/aggregates.jpg";
import landImg from "../assets/Images/land.jpg";

export default function Services() {
  const services = [
    {
      title: "Backfilling Materials Supply",
      desc: "Supply of quality backfilling materials suitable for land development, road works, and structural foundations.",
      tags: ["Backfill", "Land development", "Foundations"],
    },
    {
      title: "Aggregates Supply",
      desc: "Provision of aggregates including sub-base, base course, and other graded materials for construction projects.",
      tags: ["Sub-base", "Aggregates", "Construction"],
    },
    {
      title: "Land Resources Supply",
      desc: "Supply of soil, earth materials, and other land resources based on project and site requirements.",
      tags: ["Soil", "Earth materials", "Site needs"],
    },
    {
      title: "Site Backfilling Support",
      desc: "Support for site backfilling operations to ensure proper material placement and volume requirements.",
      tags: ["Backfilling", "Volume supply", "Site works"],
    },
    {
      title: "Bulk Materials Delivery",
      desc: "Efficient hauling and delivery of bulk materials to project sites within required timelines.",
      tags: ["Hauling", "Logistics", "Bulk supply"],
    },
    {
      title: "Project-Based Materials Sourcing",
      desc: "Sourcing and supplying materials tailored to specific project specifications and client requirements.",
      tags: ["Custom supply", "Project-based", "Specifications"],
    },
  ];

  const featured = [
    { title: "Backfilling Materials Supply", image: backfillImg },
    { title: "Aggregates Supply", image: aggregatesImg },
    { title: "Land Resources Supply", image: landImg },
  ];

  return (
    <PageShell>
      {/* FULL-BLEED HERO */}
      <section className="services-editorial services-fullbleed">
        <div className="services-intro">
          <span className="services-eyebrow">Core Capabilities</span>
          <p className="services-intro-text">
            The company specializes in the supply of backfilling materials,
            aggregates, and other land resources required by construction and
            development projects.
          </p>
        </div>

        {/* HERO VISUALS — subtle stagger */}
        <motion.div
          className="services-visuals"
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {featured.map((s) => (
            <motion.div
              key={s.title}
              className="services-visual"
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0 },
              }}
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

      {/* SERVICES LIST — fade only */}
      <Row className="services-grid">
        {services.map((s, i) => (
          <Col md={6} lg={4} key={s.title} className="services-col">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-80px" }}
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

      {/* CTA — calm fade */}
      <motion.div
        className="services-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="services-cta-title">Let’s talk about your project</h2>
        <p className="services-cta-text">
          Share a few details and we’ll help you determine the best approach and
          timeline.
        </p>
        <Button as={Link} to="/contact" variant="dark">
          Start a Conversation
        </Button>
      </motion.div>
    </PageShell>
  );
}
