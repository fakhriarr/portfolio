import { profile, siteMeta } from '@/data/profile';
import { useAnchorScroll } from '@/lib/scroll';

export function Footer() {
  const onAnchorClick = useAnchorScroll();

  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
        <p className="text-[0.9rem] text-muted">
          &copy; {siteMeta.year} {profile.name}
        </p>
        <a
          href="#top"
          onClick={(e) => onAnchorClick(e, '#top')}
          className="u-line -my-3 inline-block py-3 text-[0.9rem] font-medium"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}