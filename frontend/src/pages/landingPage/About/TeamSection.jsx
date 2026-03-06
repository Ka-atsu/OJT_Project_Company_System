import { motion } from "framer-motion";
import { useState } from "react";
import { FADE_UP, STAGGER, VIEWPORT_EARLY } from "../../../motion/constants";

export default function TeamSection({ team }) {
  const MEMBERS_PER_PAGE = 6; // 3 columns × 2 rows

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(team.members.length / MEMBERS_PER_PAGE);

  const startIndex = (page - 1) * MEMBERS_PER_PAGE;
  const currentMembers = team.members.slice(
    startIndex,
    startIndex + MEMBERS_PER_PAGE
  );

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

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

          {/* Team Grid */}
          <motion.div className="about-team-grid" variants={FADE_UP}>
            {currentMembers.map((m, idx) => (
              <div key={`${m.name}-${idx}`} className="about-team-card">
                <div className="about-team-image">
                  {m.img ? <img src={m.img} alt={m.name} /> : null}
                </div>

                <div className="about-team-name">{m.name}</div>
                <div className="about-team-role">{m.role}</div>
              </div>
            ))}
          </motion.div>

          {/* Pagination */}
          <div className="about-team-pagination">
            <button onClick={prevPage} disabled={page === 1}>
              Prev
            </button>

            <span>
              {page} / {totalPages}
            </span>

            <button onClick={nextPage} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}