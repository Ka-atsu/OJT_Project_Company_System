// ProjectsInfo.jsx
import { motion } from "framer-motion";
import { FADE_UP, STAGGER, VIEWPORT } from "../../../motion/constants";

function StatIcon({ name }) {
  if (name === "time") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 8v5l3 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  }
  if (name === "cube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M12 22V12" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M21 7 12 12 3 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {/* body */}
      <path
        d="M3 7h11v10H3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* cab */}
      <path
        d="M14 10h4l3 3v4h-7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* wheels */}
      <path
        d="M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M18 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function ProjectsInfo({ hero, stats, deliver }) {
  return (
    <>
      {/* Projects Information (text + stats) */}
      <motion.section
        className="section projects-info"
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <motion.span className="eyebrow" variants={FADE_UP}>
          {hero.eyebrow}
        </motion.span>

        <motion.h2 className="projects-info-title" variants={FADE_UP}>
          {hero.title}
        </motion.h2>

        <motion.p className="projects-info-lede" variants={FADE_UP}>
          {hero.lede}
        </motion.p>

        <div className="projects-stats-grid">
          {stats.map((s) => (
            <motion.div
              className="projects-stat"
              variants={FADE_UP}
              key={s.label}
            >
              <div className="projects-stat-icon" aria-hidden="true">
                <StatIcon name={s.icon} />
              </div>
              <div className="projects-stat-text">
                <div className="projects-stat-value">{s.value}</div>
                <div className="projects-stat-label">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* What We Deliver */}
      <section className="section projects-deliver">
        <h3 className="projects-section-title">{deliver.title}</h3>
        <ul className="projects-deliver-list">
          {deliver.items.map((x) => (
            <li key={x.id}>{x.label}</li>
          ))}
        </ul>
      </section>

      <hr className="projects-divider" />
    </>
  );
}
