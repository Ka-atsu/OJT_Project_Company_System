// useScrollbar.js
import { useEffect } from "react";

export function useScrollbar({ scrollerRef, trackRef, thumbRef }) {
  useEffect(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!scroller || !track || !thumb) return;

    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

    let rafId = 0;
    let cachedThumbW = 0;

    const sync = () => {
      const scrollW = scroller.scrollWidth;
      const clientW = scroller.clientWidth;
      const trackW = track.clientWidth;

      const maxScroll = Math.max(1, scrollW - clientW);

      const minThumb = 32;
      const thumbW = clamp((clientW / scrollW) * trackW, minThumb, trackW);
      cachedThumbW = thumbW;

      const maxThumbX = Math.max(0, trackW - thumbW);
      const progress = scroller.scrollLeft / maxScroll;
      const thumbX = progress * maxThumbX;

      thumb.style.width = `${thumbW}px`;
      thumb.style.transform = `translate3d(${thumbX}px, 0, 0)`;
    };

    const requestSync = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        sync();
      });
    };

    const onScroll = () => requestSync();
    scroller.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => requestSync());
    ro.observe(scroller);
    ro.observe(track);

    sync();

    let dragging = false;
    let startX = 0;
    let startLeft = 0;

    const getThumbLeft = () => {
      const m = /translate3d\(([-0-9.]+)px/.exec(thumb.style.transform || "");
      if (m) return parseFloat(m[1]);
      const m2 = /translateX\(([-0-9.]+)px\)/.exec(thumb.style.transform || "");
      return m2 ? parseFloat(m2[1]) : 0;
    };

    const onThumbDown = (e) => {
      dragging = true;
      thumb.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startLeft = getThumbLeft();
      scroller.classList.add("is-dragging");
      e.preventDefault();
    };

    const onThumbMove = (e) => {
      if (!dragging) return;

      const scrollW = scroller.scrollWidth;
      const clientW = scroller.clientWidth;
      const trackW = track.clientWidth;

      const maxScroll = Math.max(1, scrollW - clientW);
      const thumbW = cachedThumbW || thumb.clientWidth;
      const maxThumbX = Math.max(0, trackW - thumbW);

      const dx = e.clientX - startX;
      const nextLeft = clamp(startLeft + dx, 0, maxThumbX);
      const progress = maxThumbX ? nextLeft / maxThumbX : 0;

      scroller.scrollLeft = progress * maxScroll;
      requestSync();
    };

    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      scroller.classList.remove("is-dragging");
    };

    thumb.addEventListener("pointerdown", onThumbDown);
    thumb.addEventListener("pointermove", onThumbMove);
    thumb.addEventListener("pointerup", endDrag);
    thumb.addEventListener("pointercancel", endDrag);
    thumb.addEventListener("lostpointercapture", endDrag);

    const onTrackDown = (e) => {
      if (e.target === thumb) return;

      const rect = track.getBoundingClientRect();
      const x = e.clientX - rect.left;

      const scrollW = scroller.scrollWidth;
      const clientW = scroller.clientWidth;
      const trackW = track.clientWidth;

      const maxScroll = Math.max(1, scrollW - clientW);
      const thumbW = cachedThumbW || thumb.clientWidth;
      const maxThumbX = Math.max(0, trackW - thumbW);

      const nextLeft = clamp(x - thumbW / 2, 0, maxThumbX);
      const progress = maxThumbX ? nextLeft / maxThumbX : 0;

      scroller.scrollLeft = progress * maxScroll;
      requestSync();
    };

    track.addEventListener("pointerdown", onTrackDown);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerdown", onTrackDown);

      thumb.removeEventListener("pointerdown", onThumbDown);
      thumb.removeEventListener("pointermove", onThumbMove);
      thumb.removeEventListener("pointerup", endDrag);
      thumb.removeEventListener("pointercancel", endDrag);
      thumb.removeEventListener("lostpointercapture", endDrag);

      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollerRef, trackRef, thumbRef]);
}
