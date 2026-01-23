import { useScrollPinSlidesCore } from "../../../hooks/useScrollPinSlidesCore";

export function useHomeHeroScroll({
  wrapRef,
  pinRef,
  stageRef,
  total,
  setActive,
}) {
  useScrollPinSlidesCore({
    wrapRef,
    pinRef,
    stageRef,
    total,
    setActive,
    id: "home-hero",
    perSlideVh: 1,
    parallaxY: 24,
  });
}
