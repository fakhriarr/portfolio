import { usePrefersReducedMotion } from '@/hooks/useEnvironment';

export const NAV_OFFSET = 96;

/**
 * PRD M12 — in-page anchor scroll with a nav-height offset.
 * Uses native smooth scrolling (respects `prefers-reduced-motion` via CSS),
 * and always honours the reduced-motion preference explicitly.
 */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
}

export function useAnchorScroll(): (event: React.MouseEvent, href: string) => void {
  const reduced = usePrefersReducedMotion();
  void reduced;

  return (event, href) => {
    const id = href.replace('#', '');
    if (!id || !document.getElementById(id)) return;
    event.preventDefault();
    scrollToId(id);
    window.history.replaceState(null, '', href);
  };
}