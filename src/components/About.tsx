import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { about, profile } from '@/data/profile';
import { MaskLine } from '@/components/Reveal';
import { usePrefersReducedMotion } from '@/hooks/useEnvironment';
import { EASE_OUT_EXPO } from '@/components/motion';

export function SectionHeading({
  children,
  id,
  className = '',
  trigger = 'view',
}: {
  children: string;
  id?: string;
  className?: string;
  trigger?: 'mount' | 'view';
}) {
  return (
    <h2 id={id} className={`text-section font-bold ${className}`}>
      <MaskLine trigger={trigger}>{children}</MaskLine>
    </h2>
  );
}

/** PRD M5 — words fill from gray to ink as the block scrolls through the viewport. */
function ScrubParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.25'],
  });

  const words = text.split(' ');

  if (reduced) {
    return (
      <p
        ref={ref}
        className="measure mt-7 text-[1.05rem] leading-[1.7] sm:text-[1.12rem]"
      >
        {text}
      </p>
    );
  }

  return (
    <p
      ref={ref}
      className="measure mt-7 text-[1.05rem] leading-[1.7] sm:text-[1.12rem]"
    >
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          index={i}
          total={words.length}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  index,
  total,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = (index + 1.4) / total;
  const color = useTransform(
    progress,
    [start, end],
    ['var(--line)', 'var(--ink)'],
  );

  return (
    <motion.span style={{ color }} className="inline">
      {children}
      {' '}
    </motion.span>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();

  const fade = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
  };

  return (
    <motion.div
      className="relative grid gap-2 py-6 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-6 sm:py-7"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
      }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-line"
        initial={reduced ? undefined : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reduced ? 0.15 : 0.8, ease: EASE_OUT_EXPO }}
      />
      <motion.dt
        className="text-[0.9rem] font-medium text-muted"
        variants={fade}
      >
        {label}
      </motion.dt>
      <motion.dd className="m-0 text-[1.02rem] leading-relaxed" variants={fade}>
        {children}
      </motion.dd>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="section-y">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading>{about.heading}</SectionHeading>
          <ScrubParagraph text={about.paragraph} />
        </div>

        <div>
          <dl>
            {about.details.map((row) => (
              <Row key={row.label} label={row.label}>
                {row.value}
                {'note' in row && row.note ? (
                  <span className="text-muted"> · {row.note}</span>
                ) : null}
              </Row>
            ))}
            <Row label="Tools">
              <ul className="flex flex-wrap gap-2">
                {profile.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-pill bg-surface px-3.5 py-2 text-[0.88rem] font-medium text-ink"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </Row>
          </dl>
        </div>
      </div>
    </section>
  );
}