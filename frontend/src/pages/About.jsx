import { motion } from "framer-motion";
import KineticHeadline from "../components/Kinetics/KineticHeadline";
import SplitKinetic from "../components/Kinetics/SplitKinetic";
import ConstructionSite from "../assets/Images/ConstructionSite.jpg";

export default function About() {
  return (
    <main style={{ background: "#fff", color: "#000" }}>
      {/* HERO */}
      <section className="section">
        <KineticHeadline text="ABOUT" size="big" />
      </section>

      {/* MANIFESTO */}
      <section className="section editorial">
        <motion.p
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1], // editorial easing
          }}
        >
          CLIBERDUCHE CORPORATION provides the best quality backfill materials
          as specified by clients like, sub-base, aggregates and boulders to
          interested customers in CALABARZON area and beyond.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Our land development sites which we own are located in the heart of
          Laguna and Cavite Provinces, Philippines, with over 14 Million Cubic
          Meter of Landfill / Backfilling Materials on both sites to meet the
          growing needs of the industry. We're proud of our growing roster of
          satisfied clients and look forward to servicing more.
        </motion.p>
      </section>

      {/* SUPPLY ↔ DEVELOPMENT */}
      <section className="section">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="section-line"
        />

        <SplitKinetic />
      </section>

      {/* IMAGE + OFFSET TEXT */}
      <section className="section">
        <div className="image-text-grid">
          {/* IMAGE */}
          <motion.img
            src={ConstructionSite}
            alt="Land development and materials supply"
            className="about-image"
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{
              duration: 1.1,
              ease: [1, 1, 0.36, 1],
            }}
          />

          {/* TEXT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Our company is equally keen to pursue potential business
              relationships and long-term arrangements that mutually benefit
              both parties. We also believe in a sustainable and eco-friendly
              business venture, thus we follow strict protocol and guidelines of
              concerned Government institutions like the Department of
              Environment and Natural Resources (DENR).
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              The company grew and from thereon, covering services like General
              Engineering and Civil works as the clients are clamoring if we can
              also provide other needs such as Construction and Development for
              both horizontal and vertical, with the same situation and to
              satisfy client’s needs, we endeavored and worked hard to achieve
              the status of a One Stop Shop Company.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <KineticHeadline text="LET’S TALK" />
      </section>
    </main>
  );
}
