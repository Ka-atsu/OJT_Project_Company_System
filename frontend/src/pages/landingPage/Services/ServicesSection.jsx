import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { motion } from "framer-motion";
import {
  VIEWPORT_CARDS,
  EASE,
  FADE_UP,
} from "../../../motion/constants";
import { ServiceCardItem } from "./ServiceCardItem";

export function ServicesSection({
  id,
  innerRef,
  variant,
  eyebrow,
  title,
  items,
}) {
  return (
    <section
      id={id}
      ref={innerRef}
      className={`services-block services-block--${variant}`}
    >
      <div className="services-block-head">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="services-block-title">{title}</h2>
      </div>

      <Row className={`services-grid services-grid--${variant}`}>
        {items.map((s, i) => (
          <Col md={12} key={s.title} className="services-col">
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_CARDS}
              transition={{
                duration: 0.5,
                ease: EASE,
                delay: i * 0.05,
              }}
            >
              <ServiceCardItem i={i} {...s} />
            </motion.div>
          </Col>
        ))}
      </Row>
    </section>
  );
}
