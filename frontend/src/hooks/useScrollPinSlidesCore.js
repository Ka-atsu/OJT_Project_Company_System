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

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        id: `${id}-pin`,
        trigger: wrapRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * total * perSlideVh}`,
        pin: pinRef.current,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = Math.max(0, Math.min(0.999, self.progress));
          const idx = Math.floor(progress * total);
          setActive(idx);
        },
      });

      // 🔥 CRITICAL PART
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          ScrollTrigger.refresh(true);
        });
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [total, perSlideVh, id]);
}
