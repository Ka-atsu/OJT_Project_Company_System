import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ConstructionSite from "../assets/Images/ConstructionSite.jpg";
import PageShell from "../components/layouts/PageShell";
import "../css/about.css";

const VIEWPORT = { amount: 0.35 };
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};

const ABOUT = {
  hero: {
    bg: ConstructionSite,
    headline: "ABOUT",
    eyebrow: "About us",
  },

  intro: {
    label: "About",
    title:
      "A responsible land development company supplying high-quality backfill materials across CALABARZON and beyond.",
    body: [
      "CLIBERDUCHE CORPORATION provides high-quality backfill materials as specified by clients—such as sub-base, aggregates, and boulders—to customers in the CALABARZON area and beyond.",
      "Our company-owned land development sites are located in Laguna and Cavite, Philippines, with over 14 million cubic meters of landfill/backfilling materials across both sites to meet the growing needs of the industry.",
      "We are proud of our growing roster of satisfied clients and look forward to servicing more.",
      "We pursue potential business relationships and long-term arrangements that mutually benefit both parties. We also believe in a sustainable and eco-friendly business venture, and we follow strict protocols and guidelines of government institutions such as the Department of Environment and Natural Resources (DENR).",
      "As client needs evolved, the company expanded into General Engineering and Civil Works. We also provide Construction and Development for both horizontal and vertical projects—working hard to achieve the status of a one-stop shop company.",
    ],
    stats: [
      { k: "14M+ m³", v: "Landfill / backfilling materials" },
      { k: "Laguna + Cavite", v: "Company-owned sites" },
      { k: "CALABARZON+", v: "Service area coverage" },
    ],
  },

  quote: {
    label: "Statement",
    text: "We are a responsible land development company that provides high-quality backfill materials for land development projects and other infrastructures, including but not limited to sub-base materials like aggregates, mixed soil, and boulders. We support sustainable land development by adhering to the existing environmental regulations of the Philippines. We provide jobs for fellow Filipinos, contributing to the economy, and we aim to deliver excellent value to partner communities, investors, employees, and stakeholders.",
  },

  sections: [
    {
      label: "Projects information",
      title: "From small to large commercial and industrial projects.",
      body: "CLIBERDUCHE CORPORATION handles a variety of projects—from small and medium to large commercial and industrial work. We specialize in supplying backfilling materials, aggregates, and other land resources based on client requirements.",
    },
    {
      label: "Land development",
      title: "End-to-end site preparation and civil works support.",
      body: "We also engage in land development services including clearing, cutting and peeling, levelling, and RCP/PVC pipe laying. Our work includes bridges, concrete roads, gutters, ripraps, easements, slope protection, and solutions that support erosion prevention and reduce liquefaction risk.",
    },
    {
      label: "Mission",
      title: "Quality materials, sustainable operations, and shared value.",
      body: "We provide high-quality backfill materials and land development services while adhering to environmental regulations in the Philippines. We create jobs, support communities, and deliver strong value to investors, employees, and stakeholders through responsible operations.",
    },
    {
      label: "Vision",
      title: "To be a highly respected, world-class land development company.",
      body: "Our vision is to be a highly respected, world-class natural resource land development company committed to international standards in operations and environmental conservation—developing sustainable projects and enabling future economic use of land development sites.",
    },
    {
      label: "Values",
      title: "Quality. Safety. Integrity.",
      body: "We take pride in offering services at competitive prices while prioritizing Quality, Safety, and Integrity in every project and transaction.",
      bullets: [
        {
          k: "Quality",
          v: "Ensures projects are of high quality and aligned with local standards to remain competitive in national and local markets.",
        },
        {
          k: "Safety",
          v: "Ensures safety at worksites, safety of projects, and safety of personnel—before, during, and after execution of projects.",
        },
        {
          k: "Integrity",
          v: "Ensures compliance with existing laws covering the construction industry, reliable workforce, and timely project delivery.",
        },
      ],
    },
  ],

  cta: {
    eyebrow: "Next steps",
    title: "Let’s talk about your requirements.",
    body: "Tell us about your site location, volumes, and timeline—and we’ll align on the right materials and delivery plan.",
    button: "Contact Us",
    to: "/contact",
    bg: ConstructionSite,
  },
};

function AboutSection({ label, title, body, bullets }) {
  return (
    <section className="section about-slice">
      <motion.div
        className="about-slice-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <motion.aside
          className="about-slice-meta"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="eyebrow about-eyebrow">{label}</span>
        </motion.aside>

        <div className="about-slice-body">
          <motion.h2
            className="about-slice-title"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="about-slice-text"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {body}
          </motion.p>

          {Array.isArray(bullets) && bullets.length > 0 && (
            <motion.div
              className="about-bullets"
              variants={fadeUp}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {bullets.map((b) => (
                <div key={b.k} className="about-bullet">
                  <div className="about-bullet-k">{b.k}</div>
                  <div className="about-bullet-v">{b.v}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export default function About() {
  const navigate = useNavigate();
  const { hero, intro, quote, sections, cta } = ABOUT;

  return (
    <>
      {/* HERO */}
      <section
        className="hero hero--editorial full-bleed about-hero"
        style={{ "--hero-bg": `url(${hero.bg})` }}
      >
        <div className="hero-overlay about-hero-overlay" />
      </section>

      <PageShell>
        {/* INTRO */}
        <section className="section section--after-hero about-intro">
          <motion.div
            className="about-intro-inner"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.aside
              className="about-intro-meta"
              variants={fadeUp}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="eyebrow about-eyebrow">{intro.label}</span>
            </motion.aside>

            <div className="about-intro-body">
              <motion.h2
                className="about-intro-title"
                variants={fadeUp}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {intro.title}
              </motion.h2>

              {intro.body.map((p, i) => (
                <motion.p
                  key={i}
                  className="about-intro-text"
                  variants={fadeUp}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  {p}
                </motion.p>
              ))}

              <motion.div
                className="about-stats"
                variants={fadeUp}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {intro.stats.map((s) => (
                  <div key={s.k} className="about-stat">
                    <div className="about-stat-k">{s.k}</div>
                    <div className="about-stat-v">{s.v}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* QUOTE */}
        <section className="section about-quote">
          <motion.div
            className="about-quote-inner"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.aside
              className="about-quote-meta"
              variants={fadeUp}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="eyebrow about-eyebrow">{quote.label}</span>
            </motion.aside>

            <motion.blockquote
              className="about-quote-text"
              variants={fadeUp}
              transition={{ duration: 0.8, ease: EASE }}
            >
              “{quote.text}”
            </motion.blockquote>
          </motion.div>
        </section>

        {/* IMAGE */}
        <section className="section about-image-section">
          <div className="image-band about-image-band">
            <motion.img
              src={ConstructionSite}
              alt="Land development and materials supply"
              className="about-image"
              initial={{ opacity: 0, scale: 1.03 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ ...VIEWPORT, margin: "-120px" }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          </div>
        </section>

        {/* SLICES */}
        {sections.map((s) => (
          <AboutSection key={s.label} {...s} />
        ))}
      </PageShell>

      {/* CTA */}
      <section
        className="section cta full-bleed about-cta"
        style={{ "--cta-bg": `url(${cta.bg})` }}
      >
        <motion.div
          className="cta-content"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <motion.span
            className="eyebrow"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {cta.eyebrow}
          </motion.span>

          <motion.h2
            className="about-cta-title"
            variants={fadeUp}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {cta.title}
          </motion.h2>

          <motion.p
            className="about-cta-text"
            variants={fadeUp}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {cta.body}
          </motion.p>

          <motion.div
            className="about-cta-button"
            role="button"
            tabIndex={0}
            onClick={() => navigate(cta.to)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {cta.button}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}