import { useEffect, useRef, useState } from 'react';

type Direction = 'up' | 'down';

/** PRD M9: track scroll direction to hide the nav on scroll down, show on scroll up. */
export function useScrollDirection(threshold = 8): Direction {
  const [direction, setDirection] = useState<Direction>('up');
  const last = useRef(0);

  useEffect(() => {
    last.current = window.scrollY;

    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      const diff = y - last.current;

      if (Math.abs(diff) < threshold) return;
      setDirection(diff > 0 ? 'down' : 'up');
      last.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return direction;
}

/** True once the page has been scrolled past the hero (PRD FR-NAV-3). */
export function useScrolledPast(offset = 24): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return past;
}

/** PRD M4: signed scroll velocity, used to speed up / reverse the marquee. */
export function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(0);
  const last = useRef(0);
  const lastTime = useRef(0);
  const frame = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const now = performance.now();
      if (frame.current) return;

      frame.current = window.requestAnimationFrame(() => {
        const dt = now - lastTime.current;
        if (dt > 0) {
          setVelocity((window.scrollY - last.current) / dt);
        }
        last.current = window.scrollY;
        lastTime.current = now;
        frame.current = 0;
      });
    };

    last.current = window.scrollY;
    lastTime.current = performance.now();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return velocity;
}

/** PRD FR-NAV-2: highlight the nav link whose section is in view. */
export function useActiveSection(ids: readonly string[], fallback = ''): string {
  const [active, setActive] = useState(fallback);
  const ratios = useRef(new Map<string, number>());

  useEffect(() => {
    const visible = new Set<string>();

    const pick = () => {
      if (visible.size === 0) {
        setActive(fallback);
        return;
      }
      let best = fallback;
      let bestRatio = -1;
      for (const id of ids) {
        if (!visible.has(id)) continue;
        const ratio = ratios.current.get(id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      }
      setActive(best);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          ratios.current.set(id, entry.intersectionRatio);
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        pick();
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, fallback]);

  return active;
}