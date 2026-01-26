import { motion } from "framer-motion";
import { FADE_UP, STAGGER, VIEWPORT_EARLY } from "../../../motion/constants";

export default function AboutSection({ label, title, body, bullets }) {
  const isMissionVision = label === "Mission and Vision";
  const isValues = label === "Core Values";

  return (
    <section className="section about-slice">
      <motion.div
        className="about-slice-inner"
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_EARLY}
      >
        {/* LEFT META */}
        <motion.aside className="about-slice-meta" variants={FADE_UP}>
          <span className="eyebrow">{label}</span>
        </motion.aside>

        {/* RIGHT CONTENT */}
        <div>
          <motion.h2 className="about-slice-title" variants={FADE_UP}>
            {title}
          </motion.h2>

          {/* NORMAL TEXT */}
          {!isMissionVision && !isValues && (
            <motion.p className="about-slice-text" variants={FADE_UP}>
              {body}
            </motion.p>
          )}

          {/* MISSION / VISION GRID */}
          {isMissionVision && (
            <div className="about-mv-grid">
              <div className="about-mv-card">
                <h4>Mission</h4>
                <p>{body[0]}</p>
              </div>

              <div className="about-mv-card">
                <h4>Vision</h4>
                <p>{body[1]}</p>
              </div>
            </div>
          )}

          {/* CORE VALUES GRID */}
          {isValues && (
            <div className="about-values-grid">
              {bullets.map((b, i) => (
                <div
                  key={b.k}
                  className={`about-value-card ${i === 0 ? "highlight" : ""}`}
                >
                  <h4>{b.k}</h4>
                  <p>{b.v}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
