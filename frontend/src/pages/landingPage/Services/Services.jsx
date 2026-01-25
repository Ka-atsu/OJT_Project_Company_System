import "./services.css";
import { useRef } from "react";
import { motion } from "framer-motion";
import { VIEWPORT, EASE, FADE_UP } from "../../../motion/constants";
import { useSheetCoverPin } from "../../../hooks/useSheetCoverPin";
import { ServicesSection } from "./ServicesSection";
import { SERVICES } from "./services.content";
import { useServicesCardScrollFx } from "./useServicesCardScrollFx";

export default function Services() {
  const { hero, blocks, primary, secondary } = SERVICES;

  const heroStageRef = useRef(null);
  const heroPinRef = useRef(null);
  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);

  const pageRef = useRef(null);
  useServicesCardScrollFx(pageRef);

  useSheetCoverPin({
    heroStageRef,
    heroPinRef,
    primaryRef,
    secondaryRef,
  });

  return (
    <div ref={pageRef}>
      {/* PINNED HERO STAGE */}
      <section ref={heroStageRef} className="services-hero-stage">
        <div ref={heroPinRef} className="services-hero-pin" data-hero>
          <div className="services-hero-underlay" aria-hidden="true">
            <div className="services-hero-underlay-inner">
              <span className="eyebrow">{blocks.primary.eyebrow}</span>
              <h2 className="services-hero-underlay-title">
                {blocks.primary.title}
              </h2>
              <p className="services-hero-underlay-lede">
                Scroll to explore the full list of services.
              </p>
            </div>
          </div>

          <section className="services-editorial full-bleed">
            <motion.div
              className="services-intro"
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="eyebrow">{hero.eyebrow}</span>
              <h1 className="services-hero-title">
                Built for land development at scale.
              </h1>
              <p className="services-intro-text">{hero.intro}</p>

              <div className="services-hero-actions">
                <a className="btn btn-dark services-hero-btn" href="#primary">
                  View core services
                </a>
                <a
                  className="btn btn-outline-dark services-hero-btn"
                  href="/contact"
                >
                  Request a quote
                </a>
              </div>
            </motion.div>

            <div className="services-hero-visual">
              <div
                className="services-hero-media services-hero-media--land"
                aria-hidden
              >
                <div className="services-hero-card">
                  <div className="services-hero-chip">Core</div>

                  <div className="services-hero-metric">
                    <span className="services-hero-metric-num">04</span>
                    <span className="services-hero-metric-label">
                      Primary Function
                    </span>
                  </div>

                  <div className="services-hero-metric">
                    <span className="services-hero-metric-num">02</span>
                    <span className="services-hero-metric-label">
                      Secondary Function
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <ServicesSection
        id="primary"
        innerRef={primaryRef}
        variant="primary"
        eyebrow={blocks.primary.eyebrow}
        title={blocks.primary.title}
        items={primary}
      />

      <ServicesSection
        id="secondary"
        innerRef={secondaryRef}
        variant="secondary"
        eyebrow={blocks.secondary.eyebrow}
        title={blocks.secondary.title}
        items={secondary}
      />
    </div>
  );
}
