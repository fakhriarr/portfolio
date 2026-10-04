/**
 * Brand mark — pulls the same file the browser tab uses (public/favicon.svg), so
 * replacing that one file updates the tab icon, the nav brand and the portrait
 * fallback together. Decorative: `alt=""`.
 */
export function Logo({ className }: { className?: string }) {
  return <img src="/favicon.svg" alt="" className={className} />;
}
