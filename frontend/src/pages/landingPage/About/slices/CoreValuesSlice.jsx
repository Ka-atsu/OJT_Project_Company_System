import { motion } from "framer-motion";
import { FADE_UP, STAGGER, VIEWPORT_EARLY } from "../../../../motion/constants";
import { FaMedal, FaHardHat, FaBuilding } from "react-icons/fa";

const VALUE_ICONS = {
  quality: <FaMedal />,
  safety: <FaHardHat />,
  integrity: <FaBuilding />,
};


export default function CoreValuesSlice({ label, title, bullets }) {
  return (
    <section className="section about-slice">
      <motion.div
        className="about-slice-inner"
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_EARLY}
      >
        <motion.aside className="about-slice-meta" variants={FADE_UP}>
          <span className="eyebrow">{label}</span>
        </motion.aside>

        <div>
          {title && (
            <motion.h2 className="about-slice-title" variants={FADE_UP}>
              {title}
            </motion.h2>
          )}

          <motion.div className="about-values-subtitle" variants={FADE_UP}>
            <p className="subtitle-secondary">Our commitment guiding every project</p>
          </motion.div>

          <div className="about-values-grid">
            {bullets?.map((b) => (
              <motion.div
                key={b.k}
                className="about-value-card"
                variants={FADE_UP}
              >
                <div className={`about-value-icon ${b.icon}`}>
                  {VALUE_ICONS[b.icon]}
                </div>
                
                <h4 className="about-value-title">{b.k}</h4>
                <p className="about-value-text">{b.v}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
