import { motion } from "framer-motion";
import { FADE_UP, STAGGER, VIEWPORT_EARLY } from "../../../motion/constants";

export default function TeamSection({ team }) {
  return (
    <section className="section about-team">
      <motion.div
        className="about-team-inner"
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_EARLY}
      >
        <motion.aside className="about-quote-meta" variants={FADE_UP}>
          <span className="eyebrow">{team.label}</span>
        </motion.aside>

        <div>
          <motion.h2 className="about-team-title" variants={FADE_UP}>
            {team.title}
          </motion.h2>

          <motion.p className="about-team-subtitle" variants={FADE_UP}>
            {team.subtitle}
          </motion.p>

          <motion.div className="about-team-grid" variants={FADE_UP}>
            {team.members.map((m, idx) => (
              <div key={`${m.name}-${idx}`} className="about-team-card">
                <div className="about-team-image">
                  {m.img ? <img src={m.img} alt={m.name} /> : null}
                </div>
                <div className="about-team-name">{m.name}</div>
                <div className="about-team-role">{m.role}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
