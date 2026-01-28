import { motion } from "framer-motion";
import TypewriterText from "../../../motion/TypewriterText";
import { FADE_UP, STAGGER, VIEWPORT_EARLY } from "../../../motion/constants";

export default function StorySection({ founding, images = [], onImgLoad }) {
  const tiles = images.slice(0, 5);

  return (
    <section className="section">
      <motion.div
        className="about-story-inner"
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_EARLY}
      >
        {/* Eyebrow on top */}
        <motion.span className="eyebrow about-story-eyebrow" variants={FADE_UP}>
          {founding.label}
        </motion.span>

        {/* Card (collage left, text right) */}
        <div className="about-story-card">
          {/* LEFT: Collage */}
          <motion.div className="about-story-collage" variants={FADE_UP}>
            <div className="about-story-grid">
              {tiles.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className={`about-story-tile tile-${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`${founding.label} image ${i + 1}`}
                    onLoad={onImgLoad}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Text */}
          <div className="about-story-content">
            <TypewriterText
              as={motion.h2}
              className="about-story-title"
              text={founding.title}
              start="inView"
              speed={14}
              inViewOptions={VIEWPORT_EARLY}
              variants={FADE_UP}
            />

            {founding.body.map((p, i) => {
              const isStack = typeof p === "string" && p.includes("\n");

              return (
                <motion.p
                  key={i}
                  className={`about-story-text ${
                    isStack ? "about-story-text--stack" : ""
                  }`}
                  variants={FADE_UP}
                >
                  {p}
                </motion.p>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
