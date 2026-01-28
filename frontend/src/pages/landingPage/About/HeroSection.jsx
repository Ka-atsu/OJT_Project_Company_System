import { motion } from "framer-motion";
import TypewriterText from "../../../motion/TypewriterText";
import { FADE_UP, STAGGER, FADE_IN } from "../../../motion/constants";

export default function HeroSection({
  hero,
  heroRef,
  stageRef,
  headlineWrapRef,
  overlayRef,
}) {
  return (
    <motion.section
      ref={heroRef}
      className="hero hero--editorial full-bleed about-hero"
      variants={FADE_IN}
      initial="hidden"
      animate="visible"
    >
      <div className="about-hero-bg" aria-hidden="true">
        <img className="about-hero-bg-img" src={hero.bg} alt="" />
      </div>

      <div ref={overlayRef} className="hero-overlay about-hero-overlay" />

      <div ref={stageRef} className="about-hero-stage">
        <motion.div
          className="hero-content about-hero-content"
          variants={STAGGER}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="eyebrow" variants={FADE_UP}>
            {hero.eyebrow}
          </motion.span>

          <div ref={headlineWrapRef} className="about-hero-headline-wrap">
            <TypewriterText
              as={motion.h1}
              className="kinetic-headline big"
              text={hero.headline}
              start="inView"
              speed={70}
              delay={150}
              inViewOptions={{ once: true, amount: 0.6 }}
              variants={FADE_UP}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
