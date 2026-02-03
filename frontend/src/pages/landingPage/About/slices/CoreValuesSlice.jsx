import { motion } from "framer-motion";
import { FADE_UP, STAGGER, VIEWPORT_EARLY } from "../../../../motion/constants";

const VALUE_ICONS = {
  quality: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-3V5h4l3-3z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  safety: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  integrity: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 12l4 4 12-12" stroke="currentColor" strokeWidth="2" />
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
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

          <div className="about-values-grid">
            {bullets?.map((b) => (
              <motion.div
                key={b.k}
                className="about-value-card"
                variants={FADE_UP}
              >
                <div className="about-value-icon">{VALUE_ICONS[b.icon]}</div>
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
