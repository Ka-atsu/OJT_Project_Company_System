import { motion } from "framer-motion";
import TypewriterText from "../../../motion/TypewriterText";
import { FADE_UP, STAGGER, VIEWPORT_EARLY } from "../../../motion/constants";

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
        <motion.span className="eyebrow about-whyus-eyebrow" variants={FADE_UP}>
          {eyebrowOverride ?? intro.label}
        </motion.span>

        <div className="about-whyus-content">
          <div>
            <TypewriterText
              as={motion.h2}
              className="about-intro-title"
              text={intro.title}
              start="inView"
              speed={14}
              inViewOptions={VIEWPORT_EARLY}
            />

            {intro.body.map((p, i) => (
              <motion.p key={i} className="about-intro-text" variants={FADE_UP}>
                {p}
              </motion.p>
            ))}
          </div>

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
