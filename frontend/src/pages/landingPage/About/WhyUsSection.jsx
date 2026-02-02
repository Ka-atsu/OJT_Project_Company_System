import { motion } from "framer-motion";
import { FADE_UP, STAGGER, VIEWPORT_EARLY } from "../../../motion/constants";

const ICONS = {
  badge: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-3V5h4l3-3z"
        fill="white"
      />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
      <path
        d="M3 12h18M12 3c3 4 3 14 0 18M12 3c-3 4-3 14 0 18"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" fill="white" />
    </svg>
  ),
};

export default function WhyUsSection({
  intro,
  eyebrowOverride = null,
  imageSrc,
  imageAlt = "Why Us",
}) {
  return (
    <section className="section section--after-hero">
      <motion.div
        className="about-whyus-inner"
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_EARLY}
      >
        {/* Eyebrow ONLY */}
        <motion.span className="eyebrow about-whyus-eyebrow" variants={FADE_UP}>
          {eyebrowOverride ?? intro.label}
        </motion.span>

        <div className="about-whyus-content">
          {/* LEFT: Feature box */}
          <div className="about-whyus-box">
            {intro.body.map((item, i) => (
              <motion.div
                key={i}
                className="about-whyus-item"
                variants={FADE_UP}
              >
                <span className="about-whyus-icon">{ICONS[item.icon]}</span>

                <div className="about-whyus-item-text">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Image */}
          {imageSrc && (
            <motion.div className="about-whyus-media" variants={FADE_UP}>
              <img src={imageSrc} alt={imageAlt} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
