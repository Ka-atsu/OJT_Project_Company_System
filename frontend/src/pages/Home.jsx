import PageShell from "../components/layouts/PageShell";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ConstructionSite from "../assets/Images/constructionSite.jpg";
import EarthMovingEquipment from "../assets/Images/earthmoving_equipment.jpg";

import "../css/home.css";

gsap.registerPlugin(ScrollTrigger);

const HOME = {
  heroScroll: {
    tag: "What we do",
    eyebrow: "Land Development & Materials Supply",
    primaryCta: { label: "Our Capabilities", to: "/services" },
    secondaryCta: { label: "Request a Quote", to: "/contact" },
    slides: [
      {
        titleLines: ["Reliable materials", "for land development."],
        lede: "Backfill, aggregates, and soil resources—sourced and supplied for projects of all scales.",
        showActions: true,
      },
      {
        titleLines: ["Owned sites.", "Consistent quality."],
        lede: "We source from owned land development sites to maintain material consistency and reliable availability.",
        showActions: false,
      },
      {
        titleLines: ["Coordinated hauling", "and on-time delivery."],
        lede: "We plan volumes, logistics, and delivery schedules so your project keeps moving—without surprises.",
        showActions: false,
      },
    ],
  },

  modules: {
    eyebrow: "Core capabilities",
    title: "Built like a system",
    items: [
      {
        num: "01.",
        title: "Backfilling Materials",
        desc: "Engineered materials for site preparation, grading, and foundations.",
        img: EarthMovingEquipment,
        alt: "Backfilling materials",
      },
      {
        num: "02.",
        title: "Aggregates",
        desc: "Sub-base, base course, and graded aggregates supplied to spec.",
        img: EarthMovingEquipment,
        alt: "Aggregates",
      },
      {
        num: "03.",
        title: "Land Resources",
        desc: "Soil and earth materials sourced and delivered to site requirements.",
        img: EarthMovingEquipment,
        alt: "Land resources",
      },
    ],
  },

  cta: {
    eyebrow: "Next steps",
    title: "Let’s plan your materials supply",
    body: "Share your site details and required volumes, and we’ll help you determine the right materials and approach.",
    button: { label: "Start a Conversation", to: "/contact" },
  },
};

export default function Home() {
  const { heroScroll, modules, cta } = HOME;

  const wrapRef = useRef(null); // trigger region
  const pinRef = useRef(null); // element that gets pinned
  const contentRef = useRef(null);

  const [active, setActive] = useState(0);
  const total = heroScroll.slides.length;

  const slide = heroScroll.slides[active];
  const counterLeft = String(active + 1).padStart(2, "0");
  const counterRight = String(total).padStart(2, "0");

  // IMPORTANT: useLayoutEffect so cleanup runs BEFORE React removes DOM
  useLayoutEffect(() => {
    if (!wrapRef.current || !pinRef.current) return;

    // kill only our trigger (don’t nuke all ScrollTriggers)
    ScrollTrigger.getById("home-hero-pin")?.kill(true);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: "home-hero-pin",
        trigger: wrapRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * total}`,
        pin: pinRef.current,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          setActive(idx);
        },
      });

      ScrollTrigger.refresh();
    }, wrapRef);

    return () => {
      // ensure the pinned element is restored before unmount
      ScrollTrigger.getById("home-hero-pin")?.kill(true);
      ctx.revert();
    };
  }, [total]);

  // Fade text when slide changes
  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
    );
  }, [active]);

  return (
    <>
      {/* PINNED HERO */}
      <section ref={wrapRef} className="hero-scroll">
        <section
          ref={pinRef}
          className="hero full-bleed home-hero"
          style={{ "--hero-bg": `url(${ConstructionSite})` }}
        >
          <div className="hero-overlay home-hero-overlay" />

          <div className="home-hero-meta">
            <div className="home-hero-tag">{heroScroll.tag}</div>
            <div className="home-hero-counter">
              {counterLeft} <span className="home-hero-counter-divider">/</span>{" "}
              {counterRight}
            </div>
          </div>

          <div className="home-hero-stage">
            <div ref={contentRef} className="hero-content home-hero-content">
              <span className="eyebrow">{heroScroll.eyebrow}</span>

              <h1 className="hero-title">
                {slide.titleLines[0]}
                <br />
                <span className="light">{slide.titleLines[1]}</span>
              </h1>

              {slide.lede && <p className="home-hero-lede">{slide.lede}</p>}

              {slide.showActions && (
                <div className="hero-actions">
                  <Button
                    as={Link}
                    to={heroScroll.primaryCta.to}
                    variant="light"
                    size="lg"
                  >
                    {heroScroll.primaryCta.label}
                  </Button>

                  <Button
                    as={Link}
                    to={heroScroll.secondaryCta.to}
                    variant="outline-light"
                  >
                    {heroScroll.secondaryCta.label}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </section>

      {/* CONTENT BELOW */}
      <PageShell pad={false}>
        <section className="section section--tight home-modules">
          <div className="home-modules-inner">
            <span className="eyebrow">{modules.eyebrow}</span>
            <h2 className="home-section-title">{modules.title}</h2>

            <div className="home-modules-grid">
              {modules.items.map((item) => (
                <motion.article
                  key={item.num}
                  className="home-module"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="home-module-num">{item.num}</div>
                  <div className="home-module-media">
                    <img src={item.img} alt={item.alt} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </PageShell>

      {/* CTA */}
      <section
        className="section cta full-bleed home-cta"
        style={{ "--cta-bg": `url(${EarthMovingEquipment})` }}
      >
        <div className="cta-content">
          <span className="eyebrow">{cta.eyebrow}</span>
          <h2>{cta.title}</h2>
          <p>{cta.body}</p>
          <Button as={Link} to={cta.button.to} variant="light">
            {cta.button.label}
          </Button>
        </div>
      </section>
    </>
  );
}
