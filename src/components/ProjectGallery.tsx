import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ModalBlock } from '@/components/ModalBlock';
import { EASE_OUT_EXPO } from '@/components/motion';
import { usePrefersReducedMotion } from '@/hooks/useEnvironment';

/**
 * Gallery: horizontal track with prev/next controls on the label row.
 * Clicking a slide opens it full screen (Radix dialog) with click-to-zoom.
 */

/** Show the prev/next controls once there are more than two slides. */
const ARROWS_MIN_SLIDES = 3;

/**
 * Thumbnail shape for full-page screenshots (very tall, ratio ~0.2-0.9).
 * Portrait ratio + object-top shows the first screen of the page, not the middle.
 */
const THUMB_ASPECT = 'aspect-[3/4]';
const THUMB_POSITION = 'object-cover object-top origin-top';

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
    >
      <path d="M10 3.5 5.5 8l4.5 4.5" />
    </svg>
  );
}

export function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  const total = images.length;

  const syncEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    syncEdges();
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(syncEdges);
    observer.observe(track);
    return () => observer.disconnect();
  }, [syncEdges, total]);

  /** Move one slide-width at a time so the track keeps its snap alignment. */
  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.firstElementChild as HTMLElement | null;
    const amount =
      (slide ? slide.offsetWidth + 16 : track.clientWidth * 0.8) * direction;
    track.scrollBy({ left: amount, behavior: reduced ? 'auto' : 'smooth' });
  };

  const zoomed = zoomIndex !== null ? images[zoomIndex] : null;

  const showControls = total >= ARROWS_MIN_SLIDES;

  return (
    <ModalBlock
      label="Gallery"
      headerAction={
        showControls ? (
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-[0.85rem] tabular-nums text-muted">
              {total} images
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={atStart}
                aria-label="Previous gallery images"
                className="grid h-11 w-11 place-items-center rounded-pill border border-line text-ink transition-colors duration-300 ease-[var(--ease-hover)] hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-35"
              >
                <ChevronIcon />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={atEnd}
                aria-label="Next gallery images"
                className="grid h-11 w-11 place-items-center rounded-pill border border-line text-ink transition-colors duration-300 ease-[var(--ease-hover)] hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-35"
              >
                <ChevronIcon className="rotate-180" />
              </button>
            </div>
          </div>
        ) : null
      }
    >
      <div
        ref={trackRef}
        onScroll={syncEdges}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 scroll-px-6 md:-mx-8 md:px-8 md:scroll-px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setZoomIndex(i)}
            aria-label={`Open image ${i + 1} of ${total} full screen`}
            className="group w-[82%] shrink-0 snap-start overflow-hidden rounded-[16px] border border-line bg-surface text-left sm:w-[62%] lg:w-[46%]"
          >
            <img
              src={src}
              alt={`${title} — gallery image ${i + 1}`}
              loading="lazy"
              decoding="async"
              className={`${THUMB_ASPECT} ${THUMB_POSITION} w-full transition-transform duration-500 ease-[var(--ease-hover)] group-hover:scale-[1.04]`}
            />
          </button>
        ))}
      </div>

      <Dialog.Root
        open={zoomIndex !== null}
        onOpenChange={(open) => {
          if (!open) setZoomIndex(null);
        }}
      >
        <AnimatePresence>
          {zoomed && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[90] bg-ink/94 backdrop-blur-[6px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0.15 : 0.25 }}
                />
              </Dialog.Overlay>

              <Dialog.Content
                asChild
                forceMount
                onOpenAutoFocus={(event) => event.preventDefault()}
              >
                <motion.div
                  className="fixed inset-0 z-[100] flex flex-col"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: reduced ? 0.15 : 0.35, ease: EASE_OUT_EXPO }}
                >
                  <ZoomViewer
                    src={zoomed}
                    alt={`${title} — gallery image ${(zoomIndex ?? 0) + 1}`}
                    index={zoomIndex ?? 0}
                    total={total}
                    title={title}
                    onClose={() => setZoomIndex(null)}
                    onStep={(delta) =>
                      setZoomIndex((current) => {
                        if (current === null || total === 0) return current;
                        return (current + delta + total) % total;
                      })
                    }
                  />
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </ModalBlock>
  );
}

function ZoomViewer({
  src,
  alt,
  index,
  total,
  title,
  onClose,
  onStep,
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
  title: string;
  onClose: () => void;
  onStep: (delta: 1 | -1) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Close only this viewer: the project modal also listens for Escape.
        event.stopImmediatePropagation();
        onClose();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onStep(1);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onStep(-1);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose, onStep]);

  const zoomScale = 2;

  return (
    <>
      <div className="flex items-center justify-between gap-4 px-5 py-4 text-white md:px-8">
        <Dialog.Title className="font-display text-[1.05rem] font-semibold">
          {title}
          <span className="ml-3 text-[0.85rem] font-normal tabular-nums text-white/60">
            {String(index + 1).padStart(2, '0')} /{' '}
            {String(total).padStart(2, '0')}
          </span>
        </Dialog.Title>
        <Dialog.Close asChild>
          <button
            type="button"
            aria-label="Close full screen image"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-pill border border-white/25 text-white transition-colors duration-300 ease-[var(--ease-hover)] hover:bg-white hover:text-ink"
          >
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="h-4 w-4"
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </Dialog.Close>
      </div>

      <div
        className={`min-h-0 flex-1 overflow-auto px-5 pb-4 md:px-8 ${
          zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onClick={() => setZoomed((value) => !value)}
      >
        <div className="flex min-h-full items-center justify-center">
          <motion.img
            key={src}
            src={src}
            alt={alt}
            draggable={false}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={
              zoomed
                ? { opacity: 1, scale: zoomScale }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: reduced ? 0.15 : 0.4, ease: EASE_OUT_EXPO }}
            style={{ transformOrigin: 'center center' }}
            className="max-h-full w-auto max-w-full cursor-inherit select-none object-contain"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-white md:px-8">
        <p className="text-[0.8rem] text-white/60">
          {zoomed ? 'Click the image to zoom out' : 'Click the image to zoom in'}
        </p>
        <div className="flex items-center gap-2">
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous image"
                className="grid h-11 w-11 place-items-center rounded-pill border border-white/25 text-white transition-colors duration-300 ease-[var(--ease-hover)] hover:bg-white hover:text-ink"
              >
                <ChevronIcon />
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next image"
                className="grid h-11 w-11 place-items-center rounded-pill border border-white/25 text-white transition-colors duration-300 ease-[var(--ease-hover)] hover:bg-white hover:text-ink"
              >
                <ChevronIcon className="rotate-180" />
              </button>
            </>
          )}
        </div>
      </div>

      <Dialog.Description className="sr-only">{alt}</Dialog.Description>
    </>
  );
}