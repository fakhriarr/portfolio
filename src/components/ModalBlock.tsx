import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/useEnvironment';
import { EASE_OUT_EXPO } from '@/components/motion';

export function ModalBlock({
  label,
  headerAction,
  children,
}: {
  label: string;
  /** Rendered on the label row (right-aligned) — used for gallery controls. */
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.section
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE_OUT_EXPO },
        },
      }}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <h4 className="text-[1.2rem] font-medium text-muted">{label}</h4>
        {headerAction}
      </div>
      {children}
    </motion.section>
  );
}