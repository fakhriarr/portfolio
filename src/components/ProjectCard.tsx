import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import type { Project } from '@/data/projects';
import { ProjectMedia } from '@/components/ProjectMedia';
import { PlusIcon } from '@/components/Button';
import { useIsDesktop, usePrefersReducedMotion } from '@/hooks/useEnvironment';

const variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/** PRD FR-PROJ-4 — the whole card is one focusable button. */
export function ProjectCard({
  project,
  index,
  onOpen,
  wide = false,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
  wide?: boolean;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const reduced = usePrefersReducedMotion();
  const desktop = useIsDesktop() && !reduced;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`${project.title} — ${project.category}. Open project details.`}
      data-cursor-label="View"
      data-project-card={project.slug}
      variants={variants}
      className={`group relative flex flex-col text-left ${
        wide ? 'md:col-span-2' : ''
      }`}
      whileHover={reduced ? undefined : { y: -4 }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="relative w-full overflow-hidden rounded-2xl bg-surface">
        <div className="aspect-[16/12] w-full overflow-hidden">
          <motion.div
            className="h-full w-full"
            style={desktop ? { y: parallax } : undefined}
          >
            <motion.div
              layoutId={`project-cover-${project.slug}`}
              className="h-full w-full"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectMedia project={project} index={index} />
            </motion.div>
          </motion.div>
        </div>

        <span
          aria-hidden="true"
          className="absolute right-4 bottom-4 grid h-12 w-12 place-items-center rounded-pill bg-bg text-ink transition-colors duration-300 ease-[var(--ease-hover)] group-hover:bg-accent group-hover:text-white"
        >
          <PlusIcon className="h-[18px] w-[18px] transition-transform duration-300 ease-[var(--ease-hover)] group-hover:rotate-90" />
        </span>
      </div>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <span className="inline-flex rounded-pill bg-surface px-3 py-1.5 text-[0.78rem] font-semibold tracking-wide text-ink">
            {project.category}
          </span>
          <h3 className="mt-4 font-display text-sub font-bold">{project.title}</h3>
          <p className="mt-2 max-w-[46ch] text-[0.98rem] leading-relaxed text-muted">
            {project.short}
          </p>
        </div>
      </div>
    </motion.button>
  );
}