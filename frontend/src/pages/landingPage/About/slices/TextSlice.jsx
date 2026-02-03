import { motion } from "framer-motion";
import { FADE_UP, STAGGER, VIEWPORT_EARLY } from "../../../../motion/constants";

export default function TextSlice({ label, title, body }) {
  const bodyIsArray = Array.isArray(body);

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
          <motion.h2 className="about-slice-title" variants={FADE_UP}>
            {title}
          </motion.h2>

          {bodyIsArray ? (
            body.map((p, i) => (
              <motion.p key={i} className="about-slice-text" variants={FADE_UP}>
                {p}
              </motion.p>
            ))
          ) : (
            <motion.p className="about-slice-text" variants={FADE_UP}>
              {body}
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
