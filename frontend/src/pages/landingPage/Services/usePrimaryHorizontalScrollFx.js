import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function usePrimaryHorizontalScrollFx(primaryRef) {
  useLayoutEffect(() => {
    const root = primaryRef?.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stage = root.querySelector(".services-hx");
    const track = root.querySelector(".services-hx-track");
    if (!stage || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - stage.clientWidth);

      const getHold = () => {
        const v = getComputedStyle(document.documentElement)
          .getPropertyValue("--sheet-cover")
          .trim();
        const n = parseFloat(v);
        const cover = Number.isFinite(n) ? n : 160;
        return cover * 0.8;
      };

      const setX = gsap.quickSetter(track, "x", "px");

      const revealCheck = () => {
        const cards = root.querySelectorAll(".services-card");
        const vw = window.innerWidth;

        cards.forEach((card) => {
          const tl = card.__revealTl;
          if (!tl || card.__revealPlayed) return;

          const r = card.getBoundingClientRect();
          const entering = r.left <= vw * 0.85 && r.right > 0;

          if (entering) {
            card.__revealPlayed = true;
            tl.play();
          }
        });
      };

      // prevent “teleport” on first scroll
      setX(0);

      ScrollTrigger.create({
        id: "primaryHX",
        trigger: root,
        start: "top top",
        end: () => `+=${getDistance() + getHold()}`,
        pin: root,
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const dist = getDistance();
          const scrolled = Math.max(0, self.scroll() - self.start);
          setX(-Math.min(dist, scrolled));
          revealCheck();
        },
        onRefresh: (self) => {
          const dist = getDistance();
          const scrolled = Math.max(0, self.scroll() - self.start);
          setX(-Math.min(dist, scrolled));
          revealCheck();
        },
      });

      // ADD THIS
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          ScrollTrigger.refresh(true);
        });
      });

      gsap.delayedCall(0, () => ScrollTrigger.refresh());

      const imgs = Array.from(root.querySelectorAll("img"));
      const refresh = () => ScrollTrigger.refresh();

      imgs.forEach((img) => {
        if (!img) return;

        if (!img.complete) {
          img.addEventListener("load", refresh, { once: true });
          img.addEventListener("error", refresh, { once: true });
        }

        if (img.decode) {
          img
            .decode()
            .then(refresh)
            .catch(() => {});
        }
      });

      return () => {
        imgs.forEach((img) => {
          img?.removeEventListener?.("load", refresh);
          img?.removeEventListener?.("error", refresh);
        });
      };
    }, root);

    return () => ctx.revert();
  }, [primaryRef]);
}
