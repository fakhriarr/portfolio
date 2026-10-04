import type { Transition, Variants } from 'motion/react';

/** PRD §7.2 — consistent easing and spring vocabulary. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_HOVER = [0.4, 0, 0.2, 1] as const;

export const spring: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 26,
};

export const tExpo = (duration = 0.9, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_OUT_EXPO,
});

export const riseVariants = (stagger = 0.08, distance = 40): Variants => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: stagger, delayChildren: 0 },
  },
});

export const riseItem = (duration = 0.9, distance = 40): Variants => ({
  hidden: { opacity: 0, y: distance },
  show: { opacity: 1, y: 0, transition: tExpo(duration) },
});