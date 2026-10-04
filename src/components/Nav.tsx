import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { navLinks, profile } from '@/data/profile';
import { useActiveSection, useScrolledPast, useScrollDirection } from '@/hooks/useScroll';
import { usePrefersReducedMotion } from '@/hooks/useEnvironment';
import { useAnchorScroll } from '@/lib/scroll';
import { EASE_OUT_EXPO } from '@/components/motion';
import { Logo } from '@/components/Logo';

const SECTION_IDS = navLinks.map((l) => l.href.replace('#', ''));

export function Nav() {
  const direction = useScrollDirection();
  const scrolledPast = useScrolledPast(80);
  const active = useActiveSection(SECTION_IDS);
  const reduced = usePrefersReducedMotion();
  const onAnchorClick = useAnchorScroll();

  const listRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-nav-link="${active}"]`);
    if (!el) {
      setPill(null);
      return;
    }
    setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  const hidden = direction === 'down' && scrolledPast;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-[max(12px,env(safe-area-inset-top))]"
      initial={{ y: reduced ? 0 : -20, opacity: 0 }}
      animate={{
        y: hidden && !reduced ? '-150%' : 0,
        opacity: hidden && !reduced ? 0 : 1,
      }}
      transition={{
        y: { duration: 0.4, ease: EASE_OUT_EXPO },
        opacity: { duration: 0.25 },
      }}
    >
      <nav
        aria-label="Primary"
        className="rounded-pill border border-line bg-bg/80 shadow-nav backdrop-blur-md"
      >
        <div className="flex items-center gap-1.5 py-1.5 pr-1 pl-2 sm:gap-2 sm:pr-1.5 sm:pl-4">
          <a
            href="#top"
            onClick={(e) => onAnchorClick(e, '#top')}
            aria-label={`${profile.name} — back to top`}
            className="grid min-h-11 min-w-11 place-items-center max-[359px]:hidden"
          >
            <Logo className="h-5 w-5" />
          </a>

          <span
            aria-hidden="true"
            className="h-5 w-px bg-line max-[359px]:hidden"
          />

          <div ref={listRef} className="relative flex items-center gap-0.5">
            {pill && !reduced && (
              <motion.span
                aria-hidden="true"
                className="absolute top-0 bottom-0 -z-10 rounded-pill bg-ink"
                initial={false}
                animate={{ left: pill.left, width: pill.width }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-nav-link={id}
                  onClick={(e) => onAnchorClick(e, link.href)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={link.label}
                  className={`relative grid min-h-11 place-items-center rounded-pill px-2.5 text-[0.9rem] leading-none font-medium transition-colors duration-300 ease-[var(--ease-hover)] sm:px-3.5 ${
                    isActive
                      ? pill && !reduced
                        ? 'text-white'
                        : 'text-ink'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <span className="sm:hidden">{link.shortLabel}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}