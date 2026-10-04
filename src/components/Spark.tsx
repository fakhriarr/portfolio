/** PRD §2.5 — accent motif: Tabler "north-star" (outline), used in hero + contact. */
function NorthStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12h18" />
      <path d="M12 21v-18" />
      <path d="M7.5 7.5l9 9" />
      <path d="M7.5 16.5l9 -9" />
    </svg>
  );
}

export function Spark({ className }: { className?: string }) {
  return <NorthStar className={className} />;
}

/** Small north-star used as the marquee separator glyph. */
export function SparkGlyph({ className }: { className?: string }) {
  return <NorthStar className={className} />;
}
