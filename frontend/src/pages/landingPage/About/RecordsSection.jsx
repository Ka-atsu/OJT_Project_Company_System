import { motion } from "framer-motion";
import {
  FaLayerGroup,
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaGlobeAsia,
} from "react-icons/fa";

import { STAGGER, VIEWPORT_EARLY, FLIP_IN} from "../../../motion/constants";

const ICONS = {
  layers: FaLayerGroup,
  calendar: FaCalendarAlt,
  map: FaMapMarkedAlt,
  globe: FaGlobeAsia,
};

export default function RecordsSection({ data }) {
  return (
    <section className="record-section">
      <div className="record-cards">
        <motion.div
          className="record-inner"
          variants={STAGGER}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EARLY}
        >
          {data.items.map((item, i) => {
            const Icon = ICONS[item.icon];

            return (
              <motion.div
                key={i}
                className="record-card"
                variants={FLIP_IN}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`record-icon icon-${item.icon}`}>
                  <Icon />
                </div>

                <div className="record-value">
                  {item.value}
                </div>

                <div className="record-label">
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}