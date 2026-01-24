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

      // ===== knobs =====
      const REVEAL_START = "top 75%"; // ✅ start when image is actually near viewport
      const REVEAL_DUR = 3 // ✅ slow/fast of the reveal animation
      const REVEAL_EASE = "power3.out";

      const DRIFT_START = "top 45%";
      const DRIFT_END = "bottom 25%";
      const HOLD = 0.62;

      const getSplitX = () =>
        window.matchMedia("(max-width: 767px)").matches ? 16 : 54;

      cards.forEach((card) => {
        const row = card.querySelector(".services-card-row");
        const imgCol = card.querySelector(".services-card-image");
        const imgWrap = card.querySelector(".services-image-wrap");
        const img = card.querySelector(".services-image");
        const cover = card.querySelector(".services-image-cover");
        const bodyInner =
          card.querySelector(".services-card-body-inner") ||
          card.querySelector(".services-card-body");

        if (!row || !imgCol || !imgWrap || !img || !cover || !bodyInner) return;

        const getDir = () => {
          const flexDir = getComputedStyle(row).flexDirection;
          return flexDir.includes("reverse") ? -1 : 1;
        };

        // =========================
        // 1) REVEAL: play once on enter
        // =========================
        // initial states (always)
        gsap.set(cover, { scaleX: 1, transformOrigin: "right center" });
        gsap.set(img, { scale: 1.06, y: 10, filter: "blur(8px)" });

        const revealTl = gsap.timeline({ paused: true });

        revealTl.to(
          cover,
          { scaleX: 0, duration: REVEAL_DUR, ease: REVEAL_EASE },
          0,
        );
        revealTl.to(
          img,
          {
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: REVEAL_DUR,
            ease: REVEAL_EASE,
          },
          0,
        );

        ScrollTrigger.create({
          trigger: imgWrap,
          start: REVEAL_START,
          once: true, // ✅ will only fire one time
          onEnter: () => revealTl.play(),
        });

        // =========================
        // 2) DRIFT: still scrubbed later
        // =========================
        ScrollTrigger.create({
          trigger: card,
          start: DRIFT_START,
          end: DRIFT_END,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const splitX = getSplitX();
            const dir = getDir();

            const raw = self.progress;
            const p = raw <= HOLD ? 0 : (raw - HOLD) / (1 - HOLD);
            const t = gsap.parseEase("power2.inOut")(p);

            gsap.set(imgCol, {
              x: -splitX * t * dir,
              y: 0,
              rotate: 0,
              scale: 1,
            });
            gsap.set(bodyInner, {
              x: splitX * 0.55 * t * dir,
              y: 0,
              rotate: 0,
            });
          },
        });
      });

      ScrollTrigger.refresh();
    }, scopeRef);

    return () => ctx.revert();
  }, [scopeRef]);
}
