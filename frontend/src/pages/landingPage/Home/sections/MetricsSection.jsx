import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

import { revealStagger, fadeUpItem } from "../home.motion";
import { VIEWPORT } from "../../../../motion/constants";

export default function MetricsSection() {
  const [startCount, setStartCount] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setStartCount(true);
    }
  }, [inView]);

  return (
    <section ref={ref} className="home-metrics">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={revealStagger}
          className="home-metrics-inner"
        >
          {/* Years */}
          <motion.div className="home-metric" variants={fadeUpItem}>
            <div className="home-metric-value">
              {startCount && <CountUp end={8} duration={2} suffix="+" />}
            </div>
            <div className="home-metric-label">
              Years of Operational Experience
            </div>
            <div className="home-metric-sub">
              Established expertise in materials supply and site operations
            </div>
          </motion.div>

          {/* Projects */}
          <motion.div className="home-metric" variants={fadeUpItem}>
            <div className="home-metric-value">
              {startCount && <CountUp end={150} duration={2} suffix="+" />}
            </div>
            <div className="home-metric-label">Projects Completed</div>
            <div className="home-metric-sub">
              Delivered across residential, commercial, and infrastructure sites
            </div>
          </motion.div>

          {/* Compliance */}
          <motion.div className="home-metric" variants={fadeUpItem}>
            <div className="home-metric-value">
              {startCount && <CountUp end={100} duration={2} suffix="%" />}
            </div>
            <div className="home-metric-label">Regulatory Compliance</div>
            <div className="home-metric-sub">
              Fully aligned with DENR and local government requirements
            </div>
          </motion.div>

          {/* Coverage */}
          <motion.div
            className="home-metric home-metric--text"
            variants={fadeUpItem}
          >
            <div className="home-metric-value">CALABARZON</div>
            <div className="home-metric-label">Service Coverage Area</div>
            <div className="home-metric-sub">
              Strategically positioned supply sources across the region
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
