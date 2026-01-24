import { motion } from "framer-motion";
import { VIEWPORT, FADE_UP, STAGGER } from "../../../motion/constants";
import TypewriterText from "../../../motion/TypewriterText";

export default function AboutSection({ label, title, body, bullets }) {
  return (
    <section className="section about-slice">
      <motion.div
        className="about-slice-inner"
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <motion.aside className="about-slice-meta" variants={FADE_UP}>
          <span className="eyebrow">{label}</span>
        </motion.aside>

        <div>
          {/* TYPEWRITER TITLE (types only when in view) */}
          <TypewriterText
            as={motion.h2}
            className="about-slice-title"
            text={title}
            start="inView"
            speed={18}
            delay={0}
            inViewOptions={VIEWPORT}
            variants={FADE_UP}
          />

          <motion.p className="about-slice-text" variants={FADE_UP}>
            {body}
          </motion.p>

          {Array.isArray(bullets) && bullets.length > 0 && (
            <motion.div className="about-bullets" variants={FADE_UP}>
              {bullets.map((b) => (
                <div key={b.k} className="about-bullet">
                  <div className="about-bullet-k">{b.k}</div>
                  <div className="about-bullet-v">{b.v}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
