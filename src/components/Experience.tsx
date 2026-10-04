import { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'motion/react';
import { sortedExperience } from '@/data/experience';
import { experienceSection } from '@/data/profile';
import { SectionHeading } from '@/components/About';
import { TimelineItem } from '@/components/TimelineItem';
import { ButtonLink } from '@/components/Button';
import {
  useNearViewport,
  usePointerFine,
  usePrefersReducedMotion,
} from '@/hooks/useEnvironment';

/**
 * Measures where each timeline dot sits on the spine (0–1 of the list height)
 * so M14 can fill a dot exactly when the scrubbed progress line reaches it.
 */
function useDotRatios(
  listRef: React.RefObject<HTMLOListElement | null>,
  count: number,
): number[] {
  const [ratios, setRatios] = useState<number[]>([]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const listRect = list.getBoundingClientRect();
      if (!listRect.height) return;
      const dots = Array.from(list.querySelectorAll<HTMLElement>('[data-dot]'));
      setRatios(
        dots.map((dot) => {
          const rect = dot.getBoundingClientRect();
          return (rect.top + rect.height / 2 - listRect.top) / listRect.height;
        }),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    window.addEventListener('resize', measure);
    void document.fonts?.ready.then(measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [listRef, count]);

  return ratios;
}

/** FR-EXP-8 — reveal the Download CV button only when the PDF exists. */
function useCvAvailable(url: string): boolean {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(url, { method: 'HEAD' })
      .then((res) => {
        if (!alive) return;
        const type = res.headers.get('content-type') ?? '';
        setAvailable(res.ok && type.includes('pdf'));
      })
      .catch(() => {
        /* Missing/served as HTML → keep the button hidden. */
      });
    return () => {
      alive = false;
    };
  }, [url]);

  return available;
}

export function Experience() {
  const reduced = usePrefersReducedMotion();
  const pointerFine = usePointerFine();
  const listRef = useRef<HTMLOListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const near = useNearViewport(sectionRef, '150px');
  const cvAvailable = useCvAvailable(experienceSection.cvUrl);
  const [hovered, setHovered] = useState<string | null>(null);

  const hoverEnabled = pointerFine && !reduced;
  const count = sortedExperience.length;

  // M14 — spine fills top→bottom as the list travels through the viewport.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start center', 'end center'],
  });

  const ratios = useDotRatios(listRef, count);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="exp-title"
      className="section-y"
    >
      <div className="container-x grid gap-12 lg:grid-cols-[4fr_8fr] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+var(--gutter)+16px)] lg:self-start">
          <SectionHeading id="exp-title" trigger="view">
            {experienceSection.heading}
          </SectionHeading>
          <p className="measure mt-5 text-[1.02rem] leading-relaxed text-muted">
            {experienceSection.subtitle}
          </p>
          {cvAvailable ? (
            <ButtonLink
              href={experienceSection.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="mt-8"
            >
              Download CV
            </ButtonLink>
          ) : null}
        </div>

        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-3 w-px bg-line"
          />
          {reduced ? (
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-3 w-px origin-top bg-ink"
            />
          ) : (
            <motion.span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-3 w-px origin-top bg-ink"
              style={{ scaleY: scrollYProgress }}
            />
          )}

          <ol ref={listRef} className="relative m-0 list-none p-0">
            {sortedExperience.map((entry, i) => (
              <TimelineItem
                key={entry.id}
                entry={entry}
                progress={scrollYProgress}
                ratio={ratios[i] ?? (i + 0.5) / count}
                reduced={reduced}
                pulse={near}
                hoverEnabled={hoverEnabled}
                dimmed={hoverEnabled && hovered !== null && hovered !== entry.id}
                active={hovered === entry.id}
                onHover={setHovered}
              />
            ))}
          </ol>

        </div>
      </div>
    </section>
  );
}
