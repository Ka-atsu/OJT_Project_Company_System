import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HOME } from "../home.content";
import { revealStagger, fadeUpItem, fadeInRight } from "../home.motion";
import { VIEWPORT } from "../../../../motion/constants";
import logo from "../../../../assets/Images/logo.jpg";

export default function AboutSection() {
  const { overview } = HOME;

  return (
    <section className="section home-about">
      <div className="container">
        <motion.div
          className="home-about-grid"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={revealStagger}
        >
          <motion.div variants={fadeUpItem}>
            <span className="eyebrow">{overview.about.eyebrow}</span>
            <h2>{overview.about.title}</h2>
            <p>{overview.about.desc}</p>

            <Link to="/about" className="btn btn-outline-blue">
              Learn More →
            </Link>
          </motion.div>

          <motion.div variants={fadeInRight}>
            <img src={logo} alt="Company Logo" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
