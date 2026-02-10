import { motion } from "framer-motion";
import { FADE_UP, STAGGER, VIEWPORT_EARLY } from "../../../../motion/constants";

export default function CompanyProfileSlice({
  label,
  title,
  buttons = [],
  mvImages,
}) {
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

          <motion.div className="about-company-profile" variants={FADE_UP}>
            <div className="company-profile-images">
              <div className="company-profile-image cover-page">
                <img src={mvImages?.page1} alt="Company profile image 1" />
              </div>
              <div className="company-profile-image">
                <img src={mvImages?.allPages} alt="Company profile image 2" />
              </div>
            </div>

            <div className="company-profile-actions">
              {buttons.map((b) => (
                <a
                  key={b.label}
                  className={`btn btn-${b.action}`}
                  href={b.href}
                  target={b.action === "view" ? "_blank" : undefined}
                  rel={b.action === "view" ? "noopener noreferrer" : undefined}
                  download={b.action === "download" ? "" : undefined}
                >
                  {b.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
