import { motion } from "framer-motion";
import { FADE_UP, STAGGER, VIEWPORT_EARLY } from "../../../../motion/constants";

export default function MissionVisionSlice({ label, title, body, mvImages }) {
  const missionImg = mvImages?.mission;
  const visionImg = mvImages?.vision;

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

          <div className="about-mv-grid">
            <div className="about-mv-card">
              <div>
                <h4>Mission</h4>
                <p>{body?.[0]}</p>
              </div>
              {missionImg && (
                <div className="about-mv-media">
                  <img src={missionImg} alt="Mission" />
                </div>
              )}
            </div>

            <div className="about-mv-card reverse">
              {visionImg && (
                <div className="about-mv-media">
                  <img src={visionImg} alt="Vision" />
                </div>
              )}
              <div>
                <h4>Vision</h4>
                <p>{body?.[1]}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
