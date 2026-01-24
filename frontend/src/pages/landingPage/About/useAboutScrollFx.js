import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useAboutScrollFx({
  rootRef,
  heroRef,
  stageRef,
  headlineWrapRef,
  overlayRef,
  imageBandRef,
  imageParallaxRef,
}) {
  useLayoutEffect(() => {
    if (!rootRef.current || !heroRef.current) return;

    // prevent ScrollTrigger from restoring/adjusting previous scroll
    ScrollTrigger.clearScrollMemory();
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      if (stageRef.current) {
        gsap.to(stageRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            id: "about-hero-stage",
            trigger: heroRef.current,
            start: "top top",
            end: "+=500",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      if (headlineWrapRef.current) {
        gsap.to(headlineWrapRef.current, {
          y: -70,
          ease: "none",
          scrollTrigger: {
            id: "about-hero-headline",
            trigger: heroRef.current,
            start: "top top",
            end: "+=500",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            id: "about-hero-overlay",
            trigger: heroRef.current,
            start: "top top",
            end: "+=500",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      const shift = window.innerWidth < 768 ? 16 : 28;

      if (imageParallaxRef.current && imageBandRef.current) {
        gsap.fromTo(
          imageParallaxRef.current,
          { y: shift },
          {
            y: -shift,
            ease: "none",
            scrollTrigger: {
              id: "about-image-parallax",
              trigger: imageBandRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      ScrollTrigger.refresh();

      // force top AFTER refresh/pin math
      requestAnimationFrame(() => window.scrollTo(0, 0));
    }, rootRef);

    return () => ctx.revert();
  }, []);
}
