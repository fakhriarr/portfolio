const BLOCK = '#dededb';
const BAR = '#e6e6e3';

/**
 * PRD §6 — shown when a project has no cover yet: a --surface rectangle with a
 * simple wireframe mock. Never a broken image, never a new color.
 */
export function PlaceholderCover({
  variant = 0,
  className,
}: {
  variant?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="160" height="100" fill="var(--surface)" />
      {variant % 5 === 0 && (
        <>
          <rect x="14" y="18" width="66" height="9" rx="4.5" fill={BAR} />
          <rect x="14" y="33" width="86" height="7" rx="3.5" fill={BAR} />
          <rect x="14" y="46" width="58" height="7" rx="3.5" fill={BAR} />
          <rect x="14" y="66" width="40" height="16" rx="8" fill={BLOCK} />
          <rect x="110" y="18" width="36" height="64" rx="8" fill={BLOCK} />
        </>
      )}
      {variant % 5 === 1 && (
        <>
          <rect x="14" y="14" width="132" height="14" rx="7" fill={BLOCK} />
          <rect x="14" y="36" width="62" height="8" rx="4" fill={BAR} />
          <rect x="14" y="50" width="86" height="8" rx="4" fill={BAR} />
          <rect x="14" y="64" width="72" height="8" rx="4" fill={BAR} />
          <rect x="14" y="80" width="44" height="8" rx="4" fill={BLOCK} />
          <rect x="110" y="76" width="36" height="12" rx="6" fill={BAR} />
        </>
      )}
      {variant % 5 === 2 && (
        <>
          <rect x="14" y="14" width="46" height="10" rx="5" fill={BLOCK} />
          <rect x="14" y="32" width="40" height="54" rx="8" fill={BAR} />
          <rect x="60" y="32" width="40" height="54" rx="8" fill={BAR} />
          <rect x="106" y="32" width="40" height="54" rx="8" fill={BLOCK} />
        </>
      )}
      {variant % 5 === 3 && (
        <>
          <circle cx="38" cy="40" r="24" fill={BLOCK} />
          <rect x="74" y="26" width="72" height="9" rx="4.5" fill={BAR} />
          <rect x="74" y="42" width="56" height="7" rx="3.5" fill={BAR} />
          <rect x="74" y="56" width="64" height="7" rx="3.5" fill={BAR} />
          <rect x="14" y="76" width="132" height="10" rx="5" fill={BAR} />
        </>
      )}
      {variant % 5 === 4 && (
        <>
          <rect x="14" y="14" width="64" height="32" rx="8" fill={BLOCK} />
          <rect x="82" y="14" width="64" height="32" rx="8" fill={BAR} />
          <rect x="14" y="52" width="64" height="34" rx="8" fill={BAR} />
          <rect x="82" y="52" width="40" height="10" rx="5" fill={BLOCK} />
          <rect x="82" y="70" width="56" height="16" rx="8" fill={BAR} />
        </>
      )}
    </svg>
  );
}