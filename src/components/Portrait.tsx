import { useState } from 'react';
import { Logo } from '@/components/Logo';

/**
 * PRD §9 — portrait. Falls back to the brand logo tile if the image is missing so
 * a broken image is never shown. Swap `src` in src/data/profile.ts when the real
 * cutout PNG is ready.
 */
export function Portrait({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`grid place-items-center bg-surface ${className ?? ''}`}
        aria-hidden="true"
      >
        <Logo className="w-[38%] max-w-[220px]" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={800}
      height={1000}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className ?? ''}`}
    />
  );
}