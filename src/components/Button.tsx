import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useEnvironment';

type Variant = 'primary' | 'outline' | 'accent' | 'inverted';
type Size = 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap transition-colors duration-300 ease-[var(--ease-hover)] select-none';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-white hover:bg-accent',
  outline: 'bg-transparent text-ink border border-line hover:border-ink',
  accent: 'bg-accent border-1 border-accent text-white hover:border-1 hover:border-white hover:bg-[#1a1a1a]',
  inverted: 'bg-white text-ink hover:bg-accent hover:text-white',
};

const sizes: Record<Size, string> = {
  md: 'px-6 py-3.5 text-[0.95rem] min-h-11',
  lg: 'px-7 py-4 text-base min-h-12',
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

/** PRD M11 — hover swaps the label with a vertical roll; reduced motion drops it. */
function Roll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <span className="relative block">{children}</span>;

  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-300 ease-[var(--ease-hover)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[var(--ease-hover)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      <Roll>{children}</Roll>
    </button>
  );
}

export function ButtonLink({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      <Roll>{children}</Roll>
    </a>
  );
}

export function ArrowIcon({ className = '' }: { className?: string }) {
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
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function PlusIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={`h-4 w-4 ${className}`}
    >
      <path d="M8 2.5v11M2.5 8h11" />
    </svg>
  );
}