import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const BUBBLE = 48;

/**
 * PRD M7 — custom cursor bubble over project cards, desktop + fine pointer only.
 * Uses margin offsets instead of a translate so it does not fight Motion's transform.
 */
export function ViewCursor({ enabled }: { enabled: boolean }) {
  const x = useMotionValue(-BUBBLE);
  const y = useMotionValue(-BUBBLE);
  const springX = useSpring(x, { stiffness: 500, damping: 34, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 34, mass: 0.4 });
  const [label, setLabel] = useState('View');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;

    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const card = target?.closest?.('[data-cursor-label]');
      x.set(event.clientX);
      y.set(event.clientY);

      if (card) {
        setLabel(card.getAttribute('data-cursor-label') || 'View');
        setVisible(true);
        root.classList.add('has-card-cursor');
      } else if (visible) {
        setVisible(false);
        root.classList.remove('has-card-cursor');
      }
    };

    const onLeave = () => {
      setVisible(false);
      root.classList.remove('has-card-cursor');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      root.classList.remove('has-card-cursor');
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[80] grid place-items-center rounded-pill bg-accent/50 border-1 border-accent text-[0.7rem] font-semibold tracking-wide text-white"
      style={{
        x: springX,
        y: springY,
        width: BUBBLE,
        height: BUBBLE,
        marginLeft: -BUBBLE / 2,
        marginTop: -BUBBLE / 2,
      }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.6,
      }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {label}
    </motion.div>
  );
}