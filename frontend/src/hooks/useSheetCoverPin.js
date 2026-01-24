import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSheetCoverPin({
  heroStageRef,
  heroPinRef,
  primaryRef,
  secondaryRef,
  heroPinDuration = "100%",
  heroFadeTo = 0.18,
  coverMultiplier = 0.5,
}) {
  useLayoutEffect(() => {
    if (
      !heroStageRef?.current ||
      !heroPinRef?.current ||
      !primaryRef?.current ||
      !secondaryRef?.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // ===== HERO PIN =====
      ScrollTrigger.create({
        trigger: heroStageRef.current,
        start: "top top",
        end: `+=${heroPinDuration}`,
        pin: heroPinRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      gsap.to(heroPinRef.current, {
        opacity: heroFadeTo,
        ease: "none",
        scrollTrigger: {
          trigger: heroStageRef.current,
          start: "top top",
          end: `+=${heroPinDuration}`,
          scrub: true,
        },
      });

      // ===== PRIMARY → SECONDARY COVER =====
      const getCoverPx = () => {
        const v = getComputedStyle(document.documentElement)
          .getPropertyValue("--sheet-cover")
          .trim();
        const n = parseFloat(v);
        return Number.isFinite(n) ? n : 160;
      };

      ScrollTrigger.create({
        trigger: primaryRef.current,
        start: () => `bottom bottom+=${getCoverPx() * coverMultiplier}`,
        endTrigger: secondaryRef.current,
        end: "top top",
        pin: primaryRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // Optional dim as secondary approaches
      gsap.to(primaryRef.current, {
        opacity: 0.55,
        ease: "none",
        scrollTrigger: {
          trigger: secondaryRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [
    heroStageRef,
    heroPinRef,
    primaryRef,
    secondaryRef,
    heroPinDuration,
    heroFadeTo,
    coverMultiplier,
  ]);
}
