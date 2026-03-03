import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollPinSlidesCore({
  wrapRef,
  pinRef,
  total,
  setActive,
  id = "scroll-slides",
  perSlideVh = 1,
}) {
  useLayoutEffect(() => {
    if (!wrapRef.current || !pinRef.current || !total) return;

    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: `${id}-pin`,
        trigger: wrapRef.current,
        start: "top top",
        // Calculated end point
        end: () => `+=${window.innerHeight * total * perSlideVh}`,
        pin: pinRef.current,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true, // Crucial for responsive resizing
        refreshPriority: 1, // Ensures this pins before other triggers
        onUpdate: (self) => {
          const progress = Math.max(0, Math.min(0.999, self.progress));
          const idx = Math.floor(progress * total);
          setActive(idx);
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [total, perSlideVh, id, setActive, wrapRef, pinRef]);
}
