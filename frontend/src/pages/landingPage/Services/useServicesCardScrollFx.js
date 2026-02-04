// useServicesCardScrollFx.js
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin once so ScrollTrigger works.
// (Safe to call multiple times, GSAP ignores duplicates.)
gsap.registerPlugin(ScrollTrigger);

export function useServicesCardScrollFx(scopeRef) {
  useLayoutEffect(() => {
    // Hook must run inside a DOM scope (page wrapper ref)
    // so GSAP can find/clean up all animations on unmount.
    const root = scopeRef?.current;
    if (!root) return;

    // Accessibility: if user prefers reduced motion, do nothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // gsap.context() scopes selectors + ensures revert() kills ALL triggers/tweens created here.
    const ctx = gsap.context(() => {
      // Collect all cards within the scope.
      // NOTE: because we use a selector string, gsap.context makes it scoped.
      const cards = gsap.utils.toArray(".services-card");

      // ---------------------------------------------------------
      // REVEAL TIMING (cover wipes away + image sharpens)
      // ---------------------------------------------------------
      // Start reveal when the card enters the viewport.
      // 75% means the trigger hits when the card is ~25% from bottom.
      const REVEAL_START = "top 75%";

      // Reveal is intentionally long + smooth so it feels “premium”.
      // If you want snappier: try 1.2–1.8.
      const REVEAL_DUR = 3;

      // Easing used for the cover wipe + blur removal.
      const REVEAL_EASE = "power3.out";

      // ---------------------------------------------------------
      // DRIFT TIMING (secondary-only parallax split)
      // ---------------------------------------------------------
      // Start the drift earlier so the sideways motion begins
      // while the card is still approaching center.
      const DRIFT_START = "top 45%";

      // End drift before the card fully exits so it doesn't feel like it "slides away".
      const DRIFT_END = "bottom 25%";

      // HOLD = portion of scroll progress where drift stays still first.
      // Higher HOLD = drift starts later. Lower HOLD = drift starts earlier.
      const HOLD = 0.62;

      // ---------------------------------------------------------
      // RESPONSIVE DRIFT STRENGTH
      // ---------------------------------------------------------
      // Sideways “split” distance (px).
      // Keep small on mobile so it doesn't cause edge clipping.
      const getSplitX = () =>
        window.matchMedia("(max-width: 767px)").matches ? 16 : 54;

      cards.forEach((card) => {
        // Key elements we animate.
        const row = card.querySelector(".services-card-row");
        const imgCol = card.querySelector(".services-card-image");
        const img = card.querySelector(".services-image");
        const cover = card.querySelector(".services-image-cover");

        // Body wrapper: prefer the inner wrapper if it exists,
        // otherwise fall back to the outer column.
        const bodyInner =
          card.querySelector(".services-card-body-inner") ||
          card.querySelector(".services-card-body");

        // If a card is missing any required elements, skip it safely.
        if (!row || !imgCol || !img || !cover || !bodyInner) return;

        // Detect if the card belongs to the PRIMARY block.
        // Primary is horizontal-scrolled; we avoid vertical triggers that fight it.
        const isPrimary = !!card.closest(".services-block--primary");

        // Determine direction based on Bootstrap flex reverse class.
        // If row is reversed, we flip drift direction so it always drifts "outward".
        const getDir = () => {
          const flexDir = getComputedStyle(row).flexDirection;
          return flexDir.includes("reverse") ? -1 : 1;
        };

        // ---------------------------------------------------------
        // INITIAL STATE (before reveal)
        // ---------------------------------------------------------
        // Cover starts fully closed (scaleX 1) and opens to the left.
        gsap.set(cover, { scaleX: 1, transformOrigin: "right center" });

        // Image starts slightly zoomed + lowered + blurred.
        // This makes the reveal feel like it "comes into focus".
        gsap.set(img, { scale: 1.06, y: 10, filter: "blur(8px)" });

        // ---------------------------------------------------------
        // REVEAL TIMELINE (shared by primary + secondary)
        // ---------------------------------------------------------
        // Timeline is paused by default and played when the card "enters".
        const revealTl = gsap.timeline({ paused: true });

        // Cover wipe (scaleX -> 0)
        revealTl.to(
          cover,
          { scaleX: 0, duration: REVEAL_DUR, ease: REVEAL_EASE },
          0,
        );

        // Image focus: zoom back to 1, lift to y=0, remove blur
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

        // ---------------------------------------------------------
        // PRIMARY BEHAVIOR (horizontal)
        // ---------------------------------------------------------
        if (isPrimary) {
          // Primary reveal is NOT triggered by vertical ScrollTrigger.
          // Instead, the horizontal hook "manually" checks when cards enter
          // and plays this timeline.
          //
          // This prevents:
          // - reveal playing before the horizontal scroll actually starts
          // - weird timing/teleport as pinning begins
          card.__revealTl = revealTl;
          card.__revealPlayed = false;

          // Also skip drift: drift would fight the horizontal transform.
          return;
        }

        // ---------------------------------------------------------
        // SECONDARY REVEAL (vertical)
        // ---------------------------------------------------------
        // Secondary is normal vertical scroll, so we can use ScrollTrigger normally.
        ScrollTrigger.create({
          trigger: card,
          start: REVEAL_START,
          once: true, // reveal should only happen once
          onEnter: () => revealTl.play(),
        });

        // ---------------------------------------------------------
        // SECONDARY DRIFT (vertical parallax split)
        // ---------------------------------------------------------
        // Adds subtle sideways motion between image and text.
        ScrollTrigger.create({
          trigger: card,
          start: DRIFT_START,
          end: DRIFT_END,
          scrub: true, // ties motion to scroll position
          invalidateOnRefresh: true, // recalculates on resize/refresh
          onUpdate: (self) => {
            const splitX = getSplitX();
            const dir = getDir();

            // raw progress 0..1
            const raw = self.progress;

            // HOLD logic:
            // - until HOLD: do nothing (t = 0)
            // - after HOLD: remap remaining range into 0..1
            const p = raw <= HOLD ? 0 : (raw - HOLD) / (1 - HOLD);

            // Smooth the remapped progress
            const t = gsap.parseEase("power2.inOut")(p);

            // Image column slides left/right
            gsap.set(imgCol, { x: -splitX * t * dir });

            // Text slides opposite direction slightly (55% of image drift)
            gsap.set(bodyInner, { x: splitX * 0.55 * t * dir });
          },
        });
      });

      // After setting up triggers, refresh to ensure all start/end values are correct.
      // This is important when images are still loading or layout shifts.
      ScrollTrigger.refresh();
    }, scopeRef);

    // Cleanup: kill all triggers/tweens created in this context
    return () => ctx.revert();
  }, [scopeRef]);
}
