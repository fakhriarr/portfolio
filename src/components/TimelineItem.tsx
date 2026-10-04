import { useRef } from 'react';
import {
  motion,
  useInView,
  useTransform,
  type MotionValue,
  type Variants,
} from 'motion/react';
import {
  elapsedSince,
  formatMonth,
  formatMonthLong,
  type Experience,
} from '@/data/experience';
import { usePrefersReducedMotion } from '@/hooks/useEnvironment';
import { EASE_OUT_EXPO } from '@/components/motion';

const EASE = EASE_OUT_EXPO as unknown as [number, number, number, number];

const entryVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const maskUp: Variants = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 0.8, ease: EASE } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.32, ease: EASE } },
};

const listStagger = (each: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each } },
});

const identity: Variants = { hidden: {}, show: {} };

/** Clip wrapper used by the date and role so they slide out from behind a mask. */
function Mask({
  variants,
  className = '',
  children,
}: {
  variants: Variants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className="block overflow-hidden pb-[0.16em] -mb-[0.16em]">
      <motion.span variants={variants} className={`block ${className}`}>
        {children}
      </motion.span>
    </span>
  );
}

/** M18 — accent-soft background wipes in from the left behind the key phrase. */
function Emphasis({ children }: { children: string }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const layer =
    'absolute inset-x-[-0.18em] inset-y-[-0.12em] origin-left rounded-[6px] bg-accent-soft';
  const wrap = 'relative inline-block';

  return (
    <span ref={ref} className={wrap}>
      {reduced ? (
        <span aria-hidden="true" className={layer} />
      ) : (
        <motion.span
          aria-hidden="true"
          className={layer}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        />
      )}
      <span className="relative">{children}</span>
    </span>
  );
}

function highlight(text: string, emphasis?: string) {
  if (!emphasis || !text.includes(emphasis)) return text;
  const [before, after] = text.split(emphasis);
  return (
    <>
      {before}
      <Emphasis>{emphasis}</Emphasis>
      {after}
    </>
  );
}

/** M16 — "Present" badge with a pulsing accent dot. Pauses while off-screen. */
function PresentBadge({ pulse }: { pulse: boolean }) {
  const reduced = usePrefersReducedMotion();
  const animate = pulse && !reduced;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill bg-surface px-2.5 py-1 text-[0.8rem] leading-none font-medium text-ink">
      <span className="relative grid h-2 w-2 place-items-left" aria-hidden="true">
        {animate ? (
          <>
            <motion.span
              className="absolute inset-0 rounded-pill bg-white"
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <span className="absolute inset-0 rounded-pill bg-accent" />
          </>
        ) : (
          <span className="absolute inset-0 rounded-pill bg-accent" />
        )}
      </span>
      Present
    </span>
  );
}

export function TimelineItem({
  entry,
  progress,
  ratio,
  reduced,
  pulse,
  hoverEnabled,
  dimmed,
  active,
  onHover,
}: {
  entry: Experience;
  progress: MotionValue<number>;
  /** Vertical position of this dot in the spine, 0–1, measured from the DOM. */
  ratio: number;
  reduced: boolean;
  pulse: boolean;
  hoverEnabled: boolean;
  dimmed: boolean;
  active: boolean;
  onHover: (id: string | null) => void;
}) {
  const isPresent = entry.end === null;
  const dotOpacity = useTransform(progress, [ratio - 0.06, ratio], [0, 1]);
  const dotScale = useTransform(dotOpacity, [0, 0.55, 1], [0.72, 1.28, 1]);

  const vMask = reduced ? identity : maskUp;
  const vRise = reduced ? identity : rise;
  const vPop = reduced ? identity : pop;
  const vEntry = reduced ? identity : entryVariants;
  const vHighlights = reduced ? identity : listStagger(0.05);
  const vChips = reduced ? identity : listStagger(0.03);

  const dateRow = (
    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[0.85rem] leading-[1.4] text-muted">
      {isPresent ? (
        <>
          <time dateTime={entry.start}>
            <span aria-hidden="true">{formatMonth(entry.start)}</span>
            <span className="sr-only">{formatMonthLong(entry.start)} to present</span>
          </time>
          <PresentBadge pulse={pulse} />
          <span className="text-muted">· {elapsedSince(entry.start)}</span>
        </>
      ) : (
        <>
          <time dateTime={entry.start}>{formatMonth(entry.start)}</time>
          <span aria-hidden="true">–</span>
          <span className="sr-only">to</span>
          <time dateTime={entry.end ?? undefined}>{formatMonth(entry.end!)}</time>
        </>
      )}
    </span>
  );

  return (
    <motion.li
      className="relative py-7 pl-8 transition-opacity duration-[250ms] ease-[var(--ease-hover)]"
      style={{ opacity: dimmed ? 0.45 : 1 }}
      variants={vEntry}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      onMouseEnter={hoverEnabled ? () => onHover(entry.id) : undefined}
      onMouseLeave={hoverEnabled ? () => onHover(null) : undefined}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 -right-4 rounded-[24px]"
        initial={false}
        animate={{ opacity: active && hoverEnabled ? 1 : 0 }}
        transition={{ duration: 0.25, ease: EASE }}
      />

      <div className="relative pl-4 max-w-[60ch]">
        <Mask variants={vMask}>{dateRow}</Mask>

        <h3 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.02] font-bold">
          <Mask variants={vMask}>{entry.role}</Mask>
        </h3>

        <motion.p
          variants={vRise}
          className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.98rem]"
        >
          <span className="text-muted">{entry.company}</span>
          {entry.type ? (
            <span className="rounded-pill bg-surface px-2.5 py-1 text-[0.78rem] leading-none font-medium text-ink">
              {entry.type}
            </span>
          ) : null}
        </motion.p>

        <motion.ul
          variants={vHighlights}
          className="mt-5 list-none space-y-3 p-0 text-[1rem] leading-[1.65]"
        >
          {entry.highlights.map((item, i) => (
            <motion.li key={i} variants={vRise} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-pill bg-ink/60"
              />
              <span>{highlight(item, entry.emphasis)}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.ul
          variants={vChips}
          className="mt-6 flex list-none flex-wrap gap-2 p-0"
        >
          {entry.skills.map((skill) => (
            <motion.li
              key={skill}
              variants={vPop}
              className="rounded-pill bg-surface px-3.5 py-2 text-[0.85rem] leading-none font-medium text-ink"
            >
              {skill}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <span
        data-dot
        aria-hidden="true"
        className="absolute left-1.5 top-[1.95rem] h-3 w-3"
      >
        <span className="absolute inset-0 rounded-pill border-2 border-line" />
        {reduced ? (
          <span className="absolute inset-0 rounded-pill bg-accent" />
        ) : (
          <motion.span
            className="absolute inset-0 rounded-pill bg-accent"
            style={{ opacity: dotOpacity, scale: dotScale }}
          />
        )}
      </span>
    </motion.li>
  );
}
