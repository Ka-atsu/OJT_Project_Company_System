import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import KineticHeadline from "../components/Kinetics/KineticHeadline";
import SplitKinetic from "../components/Kinetics/SplitKinetic";
import ConstructionSite from "../assets/Images/ConstructionSite.jpg";
import "./css/about.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <main className="about-page">
      {/* =====================
         HERO
      ===================== */}
      <section className="section section--hero">
        <KineticHeadline text="ABOUT" size="big" />
      </section>

      {/* =====================
         COMPANY OVERVIEW
      ===================== */}
      <section className="section editorial">
        <motion.p
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          CLIBERDUCHE CORPORATION supplies high-quality backfilling materials,
          including sub-base, aggregates, and boulders, to support construction
          and land development projects across CALABARZON and nearby regions.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-120px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Our company-owned land development sites in Laguna and Cavite provide
          access to over 14 million cubic meters of backfilling and landfill
          materials, enabling us to support infrastructure, commercial, and
          private developments at scale.
        </motion.p>
      </section>

      {/* =====================
         SUPPLY ↔ DEVELOPMENT
      ===================== */}
      <section className="section">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          className="section-line"
        />
        <SplitKinetic />
      </section>

      {/* =====================
         IMAGE + VALUES
      ===================== */}
      <section className="section">
        <div className="image-text-grid">
          {/* IMAGE */}
          <motion.img
            src={ConstructionSite}
            alt="Land development and materials supply"
            className="about-image"
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-120px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* TEXT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-120px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              We pursue long-term business relationships built on reliability,
              transparency, and mutual benefit. Sustainability and responsible
              land use guide our operations, with strict adherence to the
              guidelines of government agencies such as the Department of
              Environment and Natural Resources (DENR).
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              As client needs evolved, the company expanded into general
              engineering and civil works, offering construction and development
              services for both horizontal and vertical projects—allowing us to
              operate as a dependable one-stop partner.
            </motion.p>

            {/* SAFETY COMMITMENT */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="about-safety"
            >
              <span className="eyebrow">Safety</span>
              <h3 className="about-subtitle">Our Commitment to Safety</h3>

              <p>
                CLIBERDUCHE CORPORATION is committed to providing a safe and
                healthy working environment for all employees, contractors, and
                site visitors. Protecting personnel from injury and occupational
                illness is a core objective of our operations.
              </p>

              <p>
                Management, supervisors, and workers share responsibility for
                maintaining safe work practices, complying with applicable laws,
                and continuously reducing risk across all sites and activities.
              </p>

              <p>
                Safety is integrated into planning and daily operations and
                forms an essential part of how we work—from leadership to every
                individual on site.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =====================
         CTA
      ===================== */}
      <section className="section cta">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-120px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="cta-inner"
        >
          <KineticHeadline text="LET’S TALK" />

          <p className="cta-text">
            Ready to discuss your next land development or materials supply
            project?
          </p>

          <motion.div
            className="cta-button"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/contact")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/contact")}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Us
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
