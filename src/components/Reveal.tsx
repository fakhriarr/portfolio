import { motion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useEnvironment';
import { EASE_OUT_EXPO } from '@/components/motion';

const EASE = EASE_OUT_EXPO as unknown as [number, number, number, number];

function maskVariants(distance: string, duration: number, delay: number): Variants {
  return {
    hidden: { y: distance },
    show: { y: '0%', transition: { duration, delay, ease: EASE } },
  };
}

const VIEWPORT = { once: true, amount: 0.35 } as const;

/**
 * PRD M1 — text enters from behind a mask.
 *
 * The observer lives on the *outer* mask: the inner block starts fully clipped
 * by `overflow-hidden`, so observing the inner element would never report an
 * intersection. `trigger="view"` defers the reveal until the block is scrolled
 * into view; `trigger="mount"` plays immediately (hero).
 */
export function MaskLine({
  children,
  delay = 0,
  duration = 0.9,
  distance = '110%',
  className = '',
  fadeOnly = false,
  trigger = 'mount',
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: string;
  className?: string;
  /** Repeat visits in the same session get a short fade instead (PRD M1). */
  fadeOnly?: boolean;
  trigger?: 'mount' | 'view';
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced || fadeOnly) {
    return (
      <motion.span
        className={`block ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0.15 : 0.3, delay: reduced ? 0 : delay }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={`block overflow-hidden pb-[0.14em] -mb-[0.14em] ${className}`}
      initial="hidden"
      {...(trigger === 'view'
        ? { whileInView: 'show', viewport: VIEWPORT }
        : { animate: 'show' })}
    >
      <motion.span
        className="block"
        variants={maskVariants(distance, duration, delay)}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Block-level mask — safe for wrapping headings, lists and paragraphs. */
export function MaskBlock({
  children,
  delay = 0,
  duration = 0.9,
  distance = '110%',
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: string;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="overflow-hidden pb-[0.14em] -mb-[0.14em]"
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <motion.div variants={maskVariants(distance, duration, delay)}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Fades and lifts content in place (no mask). */
export function Reveal({
  children,
  delay = 0,
  distance = 24,
  duration = 0.9,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: reduced ? 0.15 : duration,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}