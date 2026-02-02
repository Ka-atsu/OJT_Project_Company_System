import { motion } from "framer-motion";
import { FADE_UP, STAGGER, VIEWPORT_EARLY } from "../../../motion/constants";
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

export default function AboutSlice({ label, title, body, bullets, mvImages }) {
  const isMissionVision = label === "Mission and Vision";
  const isValues = label === "Core Values";

  const bodyIsArray = Array.isArray(body);

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

          {/* NORMAL TEXT // Download Company Profile */}
          {!isMissionVision && !isValues && (
            <>
              {
                bodyIsArray ? (
                  body.map((p, i) => (
                    <motion.p
                      key={i}
                      className="about-slice-text"
                      variants={FADE_UP}
                    >
                      {p}
                    </motion.p>
                  ))
                ) : (
                  <motion.div
                    className="about-company-profile"
                    variants={FADE_UP}
                  >
                    {/* Images */}
                    <div className="company-profile-images">
                      <div className="company-profile-image">
                        <img
                          src={mvImages?.page1}
                          alt="Company profile image 1"
                        />
                      </div>
                      <div className="company-profile-image">
                        <img
                          src={mvImages?.allPages}
                          alt="Company profile image 2"
                        />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="company-profile-actions">
                      <button className="btn">
                        <a
                          href="https://drive.google.com/file/d/1P6eeeph-igHN2kz22J4ooTfXALkjd454/view?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn"
                        >
                          View
                        </a>
                      </button>

                      <button className="btn">
                        <a
                          href="https://drive.google.com/uc?export=download&id=1P6eeeph-igHN2kz22J4ooTfXALkjd454"
                          download="WeeklyReport.pdf"
                          className="btn"
                        >
                          Download
                        </a>
                      </button>
                    </div>
                  </motion.div>
                )

                //about to remove

                // (
                //   <motion.p className="about-slice-text" variants={FADE_UP}>
                //     {body}
                //   </motion.p>
                // )
              }
            </>
          )}

          {/* MISSION / VISION */}
          {isMissionVision && (
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
          )}

          {/* CORE VALUES */}
          {isValues && (
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
          )}
        </div>
      </motion.div>
    </section>
  );
}
