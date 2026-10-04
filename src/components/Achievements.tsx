import { motion } from 'motion/react';
import { achievementsSection } from '@/data/profile';
import { SectionHeading } from '@/components/About';
import { usePrefersReducedMotion } from '@/hooks/useEnvironment';
import { EASE_OUT_EXPO } from '@/components/motion';

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

function AwardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13.5 7 22l5-2.6L17 22l-1.5-8.5" />
    </svg>
  );
}

/** Achievements — awards and competition results, shown under Work experience. */
export function Achievements() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="achievements" className="section-y">
      <div className="container-x">
        <SectionHeading trigger="view">{achievementsSection.heading}</SectionHeading>
        <p className="measure mt-5 text-[1.02rem] leading-relaxed text-muted">
          {achievementsSection.subtitle}
        </p>

        <motion.ul
          className="mt-10 grid list-none gap-5 p-0 md:grid-cols-2"
          variants={reduced ? undefined : listVariants}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'show'}
          viewport={{ once: true, amount: 0.2 }}
        >
          {achievementsSection.items.map((item) => (
            <motion.li
              key={item.title}
              variants={reduced ? undefined : itemVariants}
              className="flex items-start justify-between gap-6 rounded-[24px] border border-line bg-bg p-6 transition-colors duration-300 ease-[var(--ease-hover)] hover:bg-surface md:p-7"
            >
              <div>
                <span className="inline-grid h-10 w-10 place-items-center rounded-pill bg-accent-soft text-accent">
                  <AwardIcon />
                </span>
                <h3 className="mt-4 font-display text-[1.3rem] font-bold">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[0.98rem] leading-relaxed text-muted">
                  {item.event}
                </p>
              </div>
              <span className="shrink-0 rounded-pill bg-surface px-3 py-1.5 text-[0.8rem] font-semibold tracking-wide text-muted">
                {item.date}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
