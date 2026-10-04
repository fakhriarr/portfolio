import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { projects, type Project } from '@/data/projects';
import { projectsSection } from '@/data/profile';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectModal } from '@/components/ProjectModal';
import { SectionHeading } from '@/components/About';
import { ViewCursor } from '@/components/ViewCursor';
import {
  usePointerFine,
  usePrefersReducedMotion,
} from '@/hooks/useEnvironment';

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function indexFromHash(): number | null {
  if (typeof window === 'undefined') return null;
  const match = /^#project=(.+)$/.exec(window.location.hash);
  if (!match) return null;
  const index = projects.findIndex((p) => p.slug === match[1]);
  return index >= 0 ? index : null;
}

export function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(indexFromHash);
  const triggerRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const pointerFine = usePointerFine();
  const cursor = pointerFine && !reduced;

  const openProject = (i: number) => {
    triggerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setOpenIndex(i);
  };

  // FR-MODAL-5 — keep the URL shareable while a project is open.
  useEffect(() => {
    const base = window.location.pathname + window.location.search;
    if (openIndex === null) {
      if (window.location.hash.startsWith('#project=')) {
        window.history.replaceState(null, '', base);
      }
      return;
    }
    window.history.replaceState(null, '', `${base}#project=${projects[openIndex].slug}`);
  }, [openIndex]);

  // Escape / browser-back closes the modal.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openIndex !== null) setOpenIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex]);

  const current: Project | null =
    openIndex === null ? null : (projects[openIndex] ?? null);

  return (
    <section id="projects" className="section-y">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading trigger="view">{projectsSection.heading}</SectionHeading>
          <p className="measure text-[1rem] text-muted">
            {projectsSection.subtitle}
          </p>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 md:mt-16 md:grid-cols-2 md:gap-y-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={gridVariants}
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              wide={i === projects.length - 1}
              onOpen={() => openProject(i)}
            />
          ))}
        </motion.div>
      </div>

      <ProjectModal
        project={current}
        index={openIndex ?? 0}
        total={projects.length}
        open={openIndex !== null && current !== null}
        onOpenChange={(next) => setOpenIndex(next ? openIndex : null)}
        returnFocusRef={triggerRef}
        onStep={(delta) =>
          setOpenIndex((i) =>
            i === null ? i : (i + delta + projects.length) % projects.length,
          )
        }
      />

      <ViewCursor enabled={cursor} />
    </section>
  );
}