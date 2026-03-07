import { motion } from "framer-motion";
import TypewriterText from "../../../motion/TypewriterText";
import { FADE_UP, STAGGER, VIEWPORT_EARLY } from "../../../motion/constants";

export default function StorySection({ story, images = [], onImgLoad }) {
  const tiles = images.slice(0, 5);

  return (
    <section className="section">
      <motion.div
        className="about-story-inner"
        variants={STAGGER}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow on top */}
        <motion.span className="eyebrow about-story-eyebrow" variants={FADE_UP}>
          {story.label}
        </motion.span>

        {/* Card */}
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
                    alt={`${story.label} image ${i + 1}`}
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
              text={story.title}
              start="inView"
              speed={14}
              inViewOptions={VIEWPORT_EARLY}
              variants={FADE_UP}
            />

            {story.body.map((p, i) => {
              const isStack = typeof p === "string" && p.includes("\n");

              return (
                <motion.p
                  key={i}
                  className={`about-story-text ${
                    isStack ? "about-story-text--stack" : ""
                  }`}
                  variants={FADE_UP}
                >
                  {isStack
                    ? p.split("\n").map((line, idx) => (
                        <span key={idx}>
                          {idx === 0 ? (
                            line
                          ) : (
                            <strong>{line}</strong>
                          )}
                          <br />
                        </span>
                      ))
                    : p}
                </motion.p>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}