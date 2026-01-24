import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useServicesCardScrollFx(scopeRef) {
  useLayoutEffect(() => {
    const root = scopeRef?.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".services-card");

      // responsive tuning
      const getTuning = () => {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        return isMobile ? { splitX: 20 } : { splitX: 70 };
      };

      cards.forEach((card) => {
        const row = card.querySelector(".services-card-row");
        const imgCol = card.querySelector(".services-card-image");
        const img = card.querySelector(".services-image");
        const bodyInner =
          card.querySelector(".services-card-body-inner") ||
          card.querySelector(".services-card-body");

        if (!row || !imgCol || !img || !bodyInner) return;

        // updates correctly on resize + refresh
        const getDir = () => {
          const flexDir = getComputedStyle(row).flexDirection;
          return flexDir.includes("reverse") ? -1 : 1;
        };

        ScrollTrigger.create({
          trigger: card,

          // Start when it's comfortably in view
          start: "top 60%",

          // Make the effect last ~1.1 viewports of scroll (longer range)
          end: () => "+=" + window.innerHeight * 1.1,

          scrub: true,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const { splitX } = getTuning();
            const dir = getDir();

            // hold period (no drift) so you can read first
            const HOLD = 0.6;
            const raw = self.progress;
            const p = raw <= HOLD ? 0 : (raw - HOLD) / (1 - HOLD);

            const t = gsap.parseEase("power2.inOut")(p);

            // IMAGE moves away from text
            gsap.set(imgCol, { x: -splitX * t * dir });

            // TEXT moves opposite direction
            gsap.set(bodyInner, { x: splitX * 0.55 * t * dir });

            gsap.set(img, { filter: "none" });
          },
        });
      });

      ScrollTrigger.refresh();
    }, scopeRef);

    return () => ctx.revert();
  }, [scopeRef]);
}
