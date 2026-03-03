import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaCheckCircle,
  FaClock,
  FaNetworkWired,
} from "react-icons/fa";

import { revealStagger, fadeUpItem } from "../home.motion";
import { VIEWPORT_CARDS } from "../../../../motion/constants";

export default function WhySection() {
  return (
    <section className="section home-why">
      <div className="container home-why-inner">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why Clients Choose Us
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
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
            <p>
              Strict adherence to environmental and regulatory standards across
              all projects.
            </p>
          </motion.div>

          <motion.div className="home-why-item" variants={fadeUpItem}>
            <FaCheckCircle className="why-icon" />
            <h4>Quality-Controlled Materials</h4>
            <p>
              Engineered sourcing from controlled development areas to ensure
              consistency.
            </p>
          </motion.div>

          <motion.div className="home-why-item" variants={fadeUpItem}>
            <FaClock className="why-icon" />
            <h4>On-Time Delivery</h4>
            <p>Coordinated hauling and logistics planning to avoid delays.</p>
          </motion.div>

          <motion.div className="home-why-item" variants={fadeUpItem}>
            <FaNetworkWired className="why-icon" />
            <h4>Local Supply Network</h4>
            <p>
              Strategically positioned sources serving projects across
              CALABARZON.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
