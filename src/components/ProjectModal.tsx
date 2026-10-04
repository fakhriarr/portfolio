import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'motion/react';
import { useRef } from 'react';
import type { Project } from '@/data/projects';
import { ProjectMedia } from '@/components/ProjectMedia';
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks/useEnvironment';
import { EASE_OUT_EXPO, spring } from '@/components/motion';
import { ButtonLink } from '@/components/Button';

type Props = {
  project: Project | null;
  index: number;
  total: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStep: (delta: number) => void;
  /** Element focus returns to when the modal closes (the originating card). */
  returnFocusRef: React.RefObject<HTMLElement | null>;
};

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="h-4 w-4"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

/** PRD §4.6 — three content blocks only: Overview, Project goals, Key takeaways. */
export function ProjectModal({
  project,
  index,
  total,
  open,
  onOpenChange,
  onStep,
  returnFocusRef,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const desktop = useMediaQuery('(min-width: 768px)');
  const panelRef = useRef<HTMLDivElement>(null);

  const panelTransition = reduced
    ? { duration: 0.15 }
    : desktop
      ? { duration: 0.5, ease: EASE_OUT_EXPO }
      : spring;

  const initial = reduced
    ? { opacity: 0 }
    : desktop
      ? { opacity: 0, scale: 0.97 }
      : { opacity: 1, y: '100%' };
  const animate = reduced
    ? { opacity: 1 }
    : desktop
      ? { opacity: 1, scale: 1 }
      : { opacity: 1, y: '0%' };
  const exit = reduced
    ? { opacity: 0 }
    : desktop
      ? { opacity: 0, scale: 0.97 }
      : { opacity: 1, y: '100%' };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && project && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-[4px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0.15 : 0.3 }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              forceMount
              onOpenAutoFocus={(event) => {
                event.preventDefault();
                panelRef.current?.focus();
              }}
              onCloseAutoFocus={(event) => {
                const target =
                  returnFocusRef.current ??
                  document.querySelector<HTMLElement>(
                    `[data-project-card="${project.slug}"]`,
                  );
                if (!target?.isConnected) return;
                event.preventDefault();
                target.focus();
              }}
            >
              <motion.div
                ref={panelRef}
                tabIndex={-1}
                aria-modal="true"
                aria-labelledby="project-modal-title"
                aria-describedby="project-modal-overview"
                className={`fixed z-[70] flex flex-col bg-bg shadow-modal outline-none ${
                  desktop
                    ? 'top-1/2 left-1/2 w-[min(820px,calc(100vw-32px))] max-h-[min(86dvh,900px)] rounded-[28px]'
                    : 'inset-x-0 bottom-0 max-h-[92dvh] rounded-t-[28px]'
                }`}
                style={desktop ? { x: '-50%', y: '-50%' } : undefined}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={panelTransition}
                drag={desktop || reduced ? false : 'y'}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.55}
                onDragEnd={(_event, info) => {
                  if (info.offset.y > 120 || info.velocity.y > 700) {
                    onOpenChange(false);
                  }
                }}
              >
                <div className="flex items-center justify-between gap-4 px-6 py-4 md:px-8">
                  <span className="inline-flex rounded-pill bg-surface px-3 py-1.5 text-[0.78rem] font-semibold tracking-wide text-ink">
                    {project.category}
                  </span>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close project details"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-pill border border-line text-ink transition-colors duration-300 ease-[var(--ease-hover)] hover:bg-ink hover:text-white"
                    >
                      <CloseIcon />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 md:px-8">
                  <motion.div
                    layoutId={`project-cover-${project.slug}`}
                    className="aspect-[16/12] w-full overflow-hidden rounded-xl"
                    transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  >
                    <ProjectMedia project={project} index={index} priority />
                  </motion.div>

                  <div className="pt-7 pb-8 md:pt-9 md:pb-10">
                    <Dialog.Title
                      asChild
                      id="project-modal-title"
                      className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold"
                    >
                      <motion.h3
                        initial={reduced ? undefined : { opacity: 0, y: 18 }}
                        animate={reduced ? undefined : { opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: EASE_OUT_EXPO,
                          delay: 0.08,
                        }}
                      >
                        {project.title}
                      </motion.h3>
                    </Dialog.Title>

                    <motion.div
                      className="mt-7 space-y-8"
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: {},
                        show: {
                          transition: { staggerChildren: 0.06, delayChildren: 0.12 },
                        },
                      }}
                    >
                      <Block label="Overview">
                        <Dialog.Description asChild>
                          <p
                            id="project-modal-overview"
                            className="measure text-[1.02rem] text-ink/80"
                          >
                            {project.overview}
                          </p>
                        </Dialog.Description>
                      </Block>

                      <Block label="Project goals">
                        <ul className="space-y-2.5">
                          {project.goals.map((goal) => (
                            <li key={goal} className="flex gap-3">
                              <span
                                aria-hidden="true"
                                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-pill bg-ink"
                              />
                              <span className="text-[1.02rem]">
                                {goal}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </Block>

                      <Block label="Key takeaways">
                        <div className="rounded-[20px] bg-accent-soft p-5 md:p-6">
                          <p className="measure text-[1.02rem] text-ink">
                            {project.takeaways}
                          </p>
                        </div>
                      </Block>

                      {project.gallery && project.gallery.length > 0 && (
                        <Block label="Gallery">
                          <div className="grid gap-4 sm:grid-cols-2">
                            {project.gallery.map((src, i) => (
                              <img
                                key={`${src}-${i}`}
                                src={src}
                                alt={`${project.title} — gallery image ${i + 1}`}
                                loading="lazy"
                                decoding="async"
                                className="w-full rounded-[16px] border border-line bg-surface"
                              />
                            ))}
                          </div>
                        </Block>
                      )}
                    </motion.div>

                    {project.links && project.links.length > 0 && (
                      <div className="mt-8 flex flex-wrap gap-3">
                        {project.links.map((link) => (
                          <ButtonLink
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                          >
                            {link.label}
                          </ButtonLink>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4 md:px-8">
                  <span className="text-[0.85rem] tabular-nums text-muted">
                    {String(index + 1).padStart(2, '0')} /{' '}
                    {String(total).padStart(2, '0')}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onStep(-1)}
                      className="min-h-11 rounded-pill border border-line px-5 text-[0.9rem] font-medium transition-colors duration-300 ease-[var(--ease-hover)] hover:bg-ink hover:text-white"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={() => onStep(1)}
                      className="min-h-11 rounded-pill border border-line px-5 text-[0.9rem] font-medium transition-colors duration-300 ease-[var(--ease-hover)] hover:bg-ink hover:text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
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
      <h4 className="mb-4 text-[1.2rem] font-medium text-muted">
        {label}
      </h4>
      {children}
    </motion.section>
  );
}