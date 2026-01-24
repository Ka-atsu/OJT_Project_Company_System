import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { VIEWPORT_CARDS, EASE } from "../motion/constants";

gsap.registerPlugin(ScrollTrigger);

export function useScrollPinSlidesCore({
  wrapRef,
  pinRef,
  stageRef,
  total,
  setActive,
  id = "scroll-slides",
  perSlideVh = 1,
  parallaxY = 0,
}) {
  useLayoutEffect(() => {
    if (!wrapRef.current || !pinRef.current || !total) return;

    const ctx = gsap.context(() => {
      const pin = ScrollTrigger.create({
        id: `${id}-pin`,
        trigger: wrapRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * total * perSlideVh}`,
        pin: pinRef.current,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          setActive((prev) => (prev === idx ? prev : idx));
        },
      });

      let parallax;
      if (stageRef?.current && parallaxY) {
        parallax = gsap.to(stageRef.current, {
          y: -Math.abs(parallaxY),
          ease: "none",
          scrollTrigger: {
            id: `${id}-parallax`,
            trigger: wrapRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      return () => {
        pin?.kill(true);
        parallax?.scrollTrigger?.kill(true);
        parallax?.kill();
      };
    }, wrapRef);

    return () => ctx.revert();
  }, [wrapRef, pinRef, stageRef, total, setActive, id, perSlideVh, parallaxY]);
}
