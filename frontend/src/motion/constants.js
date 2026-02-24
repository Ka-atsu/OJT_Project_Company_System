export const EASE = [0.22, 1, 0.36, 1];

export const VIEWPORT = {
  amount: 0.35,
  once: true,
};

export const VIEWPORT_CARDS = {
  amount: 0.25,
  once: true,
};

export const FADE_UP = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const VIEWPORT_EARLY = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -20% 0px",
};
export const FLIP_IN = {
  hidden: {
    opacity: 0,
    rotateY: -90,
    transformPerspective: 1000,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    transformPerspective: 1000,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};