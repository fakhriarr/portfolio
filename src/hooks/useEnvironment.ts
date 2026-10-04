import { useEffect, useState } from 'react';

function initialMatch(query: string, fallback = false): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return fallback;
  return window.matchMedia(query).matches;
}

/**
 * Read the initial value synchronously so the first paint already respects the
 * preference. Flipping after mount would leave motion values applied from the
 * pre-flip render (e.g. masks stuck at `y: 115%` under reduced motion).
 */
function useMediaMatch(query: string, fallback = false): boolean {
  const [matches, setMatches] = useState(() => initialMatch(query, fallback));

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaMatch('(prefers-reduced-motion: reduce)');
}

/** True only for mouse/trackpad pointers (PRD §7.4: disable cursor effects on touch). */
export function usePointerFine(): boolean {
  return useMediaMatch('(pointer: fine)');
}

/** True on viewports ≥1024px, where desktop-only motion is allowed. */
export function useIsDesktop(): boolean {
  return useMediaMatch('(min-width: 1024px)');
}

/** PRD M1: hero intro plays once per session, shortened on repeat. */
export function usePlayedOnce(key: string): boolean {
  const [played] = useState(() => {
    try {
      return sessionStorage.getItem(key) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, '1');
    } catch {
      /* ignore storage errors (private mode, etc.) */
    }
  }, [key]);

  return played;
}

/** Reactive media query, SSR-safe and updated on change. */
export function useMediaQuery(query: string, initial = false): boolean {
  return useMediaMatch(query, initial);
}

/** Returns true while the element is anywhere near the viewport (PRD §7.5). */
export function useNearViewport<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  rootMargin = '200px',
): boolean {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return near;
}