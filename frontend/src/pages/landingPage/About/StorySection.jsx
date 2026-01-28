import { motion } from "framer-motion";
import TypewriterText from "../../../motion/TypewriterText";
import { FADE_UP, STAGGER, VIEWPORT_EARLY } from "../../../motion/constants";

export default function StorySection({ founding, imageSrc, onImgLoad }) {
  return (
    <section className="section">
      <motion.div
        className="about-intro-inner"
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_EARLY}
      >
        <motion.aside className="about-intro-meta" variants={FADE_UP}>
          <span className="eyebrow">{founding.label}</span>
        </motion.aside>

        <div className="about-background-card about-background-full">
          <div className="about-background-image">
            <img
              src={imageSrc}
              alt="Cliberduche Corporation Office"
              onLoad={onImgLoad}
            />
          </div>

          <div>
            <TypewriterText
              as={motion.h2}
              className="about-intro-title"
              text={founding.title}
              start="inView"
              speed={14}
              inViewOptions={VIEWPORT_EARLY}
              variants={FADE_UP}
            />

            {founding.body.map((p, i) => (
              <motion.p key={i} className="about-intro-text" variants={FADE_UP}>
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
