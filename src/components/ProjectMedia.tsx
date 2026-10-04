import { useState } from 'react';
import type { Project } from '@/data/projects';
import { PlaceholderCover } from '@/components/PlaceholderCover';

/** Cover image when available, wireframe placeholder otherwise (PRD FR-PROJ-3). */
export function ProjectMedia({
  project,
  index = 0,
  priority = false,
  className,
  alt = '',
}: {
  project: Project;
  index?: number;
  priority?: boolean;
  className?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  const hasCover = Boolean(project.cover) && !failed;

  if (!hasCover) {
    return (
      <PlaceholderCover
        variant={index}
        className={`h-full w-full ${className ?? ''}`}
      />
    );
  }

  return (
    <img
      src={project.cover}
      alt={alt}
      width={1600}
      height={1200}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className ?? ''}`}
    />
  );
}