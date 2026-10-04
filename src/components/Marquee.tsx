import { useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from 'motion/react';
import { marqueeTools, type MarqueeTool } from '@/data/profile';
import { SparkGlyph } from '@/components/Spark';
import { useNearViewport, usePrefersReducedMotion } from '@/hooks/useEnvironment';
import { useScrollVelocity } from '@/hooks/useScroll';

/** Seconds for one full loop of the marquee. Lower = faster. */
const LOOP_SECONDS = 90;
const BASE_SPEED = 100 / LOOP_SECONDS; // percent per second

/**
 * Optional tool logo (shown before the name). Renders nothing when `icon` is
 * missing, and silently hides itself if the file fails to load, so a wrong path
 * never shows a broken image.
 */
function ToolIcon({ tool }: { tool: MarqueeTool }) {
  const [failed, setFailed] = useState(false);

  if (!tool.icon || failed) return null;

  return (
    <img
      src={tool.icon}
      alt=""
      aria-hidden="true"
      width={20}
      height={20}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-5 w-5 shrink-0 object-contain"
    />
  );
}

function Group({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={duplicate ? 'true' : undefined}>
      {marqueeTools.map((tool) => (
        <li key={tool.name} className="flex shrink-0 items-center">
          <ToolIcon tool={tool} />
          <span className="ml-3 text-[0.95rem] font-medium whitespace-nowrap text-ink">
            {tool.name}
          </span>
          {/* Separator only — equal space on both sides, like a wide gap. */}
          <SparkGlyph className="mx-12 h-4 w-4 shrink-0 text-accent" />
        </li>
      ))}
    </ul>
  );
}

/** PRD M4 — infinite loop; speed and direction react to scroll velocity, pauses on hover. */
export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const velocity = useScrollVelocity();
  const near = useNearViewport(trackRef, '100px');

  const paused = useRef(false);
  const x = useMotionValue(0);
  const xPct = useTransform(x, (v) => `${v}%`);

  useAnimationFrame((_time, delta) => {
    if (reduced || !near || paused.current) return;

    const dt = Math.min(delta, 50) / 1000;
    const direction = velocity === 0 ? 1 : Math.sign(velocity);
    const speed = BASE_SPEED * (1 + Math.min(Math.abs(velocity) * 0.9, 2.2));

    let next = x.get() + direction * speed * dt;
    if (next <= -50) next += 50;
    if (next >= 0) next -= 50;
    x.set(next);
  });

  if (reduced) {
    return (
      <div className="border-y border-line py-6">
        <ul className="container-x flex flex-wrap items-center justify-center gap-2">
          {marqueeTools.map((tool) => (
            <li
              key={tool.name}
              className="flex items-center gap-2 rounded-pill bg-surface px-4 py-2 text-[0.9rem] font-medium"
            >
              <ToolIcon tool={tool} />
              {tool.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      ref={trackRef}
      className="overflow-hidden border-y border-line py-5"
      onPointerEnter={() => {
        paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
      }}
      onFocusCapture={() => {
        paused.current = true;
      }}
      onBlurCapture={() => {
        paused.current = false;
      }}
    >
      <motion.div className="flex w-max" style={{ x: xPct }}>
        <Group />
        <Group duplicate />
      </motion.div>
    </div>
  );
}