import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { HOME } from "../home.content";
import { revealStagger, fadeUpItem } from "../home.motion";
import { VIEWPORT, VIEWPORT_CARDS } from "../../../../motion/constants";

export default function ModulesSection() {
  const { modules } = HOME;

  return (
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

          <motion.div className="home-modules-cta" variants={fadeUpItem}>
            <Link to="/services" className="btn btn-outline-blue">
              View All Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
