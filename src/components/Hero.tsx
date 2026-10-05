import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from 'motion/react';
import { hero, profile } from '@/data/profile';
import { Button } from '@/components/Button';
import { MaskLine } from '@/components/Reveal';
import { Portrait } from '@/components/Portrait';
import { Spark } from '@/components/Spark';
import {
  useNearViewport,
  usePlayedOnce,
  usePrefersReducedMotion,
} from '@/hooks/useEnvironment';
import { scrollToId } from '@/lib/scroll';

/** Inline image woven into the headline (fixed size, aligned to the text). */
function ThumbImage({ src, alt = '' }: { src: string; alt?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : 'true'}
      width={160}
      height={160}
      decoding="async"
      className="mx-[0.06em] inline-block h-[1em] w-[1em] shrink-0 rounded-sm object-cover align-middle z-99"
    />
  );
}

/** Tune the decorative spark's softness and strength here. */
const SPARK_BLUR = 48; // px of blur
const SPARK_OPACITY = 0.15; // 0 (invisible) – 1 (solid)

/** PRD M3 — 20s spin plus a scroll-driven extra quarter turn. */
function HeroSpark({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const sparkRef = useRef<HTMLSpanElement>(null);
  const spin = useMotionValue(0);
  const reduced = usePrefersReducedMotion();
  /** Watch the spark itself so the spin keeps running while it stays on screen. */
  const near = useNearViewport(sparkRef, '0px');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const scrollRot = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotation = useTransform([scrollRot, spin], ([a, b]: number[]) => a + b);

  useEffect(() => {
    if (reduced || !near) return;
    const controls = animate(spin, 360, {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    });
    return () => controls.stop();
  }, [reduced, near, spin]);

  return (
    <motion.span
      ref={sparkRef}
      className="pointer-events-none absolute top-[10%] right-[6%] -z-10 block h-16 w-16 text-accent sm:h-480 sm:w-480 lg:top-[-20%] lg:right-[-40%]"
      style={{
        rotate: reduced ? undefined : rotation,
        filter: `blur(${SPARK_BLUR}px)`,
        opacity: SPARK_OPACITY,
      }}
      aria-hidden="true"
    >
      <Spark className="h-full w-full" />
    </motion.span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  /** PRD M1 — the full masked intro plays once per session. */
  const replay = usePlayedOnce('portfolio:hero-intro');

  return (
    <section
      id="top"
      ref={sectionRef}
      className="isolate relative pt-[calc(var(--nav-h)+var(--gutter)+52px)] pb-[0px] lg:pt-[calc(var(--nav-h)+var(--gutter)+16px)] lg:pb-[0px]"
    >
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_clamp(200px,28vw,400px)] lg:gap-6 xl:gap-8">
          {/* Portrait — above the headline on mobile, right column on desktop */}
          <div className="order-2">
            <div className="relative mx-auto w-[min(300px,72vw)] overflow-hidden rounded-t-[999px] rounded-b-[28px] lg:w-full">
              <div className="aspect-[10/16] w-full overflow-hidden">
                <div
                  className={`h-full w-full ${
                    reduced || replay ? 'hero-portrait-fade' : 'hero-portrait-rise'
                  }`}
                >
                  <Portrait
                    src={profile.heroPortrait}
                    alt={`Portrait of ${profile.name}, ${profile.role}`}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="order-1">
            <MaskLine fadeOnly={replay} delay={0.05} duration={0.8}>
              <span className="mr-4 inline-block -rotate-3 rounded-pill bg-[#1a1a1a] px-4 py-2 text-[0.82rem] font-semibold tracking-wide text-white">
                  {profile.role}
                </span>
              <span className="text-[0.95rem] font-medium text-muted sm:text-base">
                {hero.intro}
              </span>
            </MaskLine>

            <h1 className="mt-5 font-display text-hero font-bold text-balance">
              <MaskLine fadeOnly={replay} delay={0.13}>
                {hero.headline.before}{' '}
                <ThumbImage src={hero.thumbTop} />
              </MaskLine>
              <MaskLine fadeOnly={replay} delay={0.21}>
                {hero.headline.middle}{' '}
                <ThumbImage src={hero.thumbBottom} />
              </MaskLine>
              <MaskLine fadeOnly={replay} delay={0.29}>
                {hero.headline.after}
              </MaskLine>
            </h1>

            {/* <MaskLine fadeOnly={replay} delay={0.4} duration={0.8}>
              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3">
                <span className="inline-block -rotate-3 rounded-pill bg-ink px-4 py-2 text-[0.82rem] font-semibold tracking-wide text-white">
                  {profile.role}
                </span>
                <p className="measure text-[0.98rem] text-muted sm:text-base">
                  {hero.supporting}
                </p>
              </div>
            </MaskLine> */}

            <MaskLine fadeOnly={replay} delay={0.48} duration={0.8}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button onClick={() => scrollToId('projects')}>View Projects</Button>
                <Button variant="outline" onClick={() => scrollToId('contact')}>
                  Let&rsquo;s talk
                </Button>
              </div>
            </MaskLine>
          </div>
        </div>
      </div>

      <HeroSpark containerRef={sectionRef} />
    </section>
  );
}