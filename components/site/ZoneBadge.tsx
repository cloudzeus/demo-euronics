/** Numbered badge of the design zones; visible only with ?zones=1 (html[data-zones]). */
export function ZoneBadge({ no }: { no?: number }) {
  if (!no) return null;
  return (
    <span className="eu-zone-badge" aria-hidden>
      {no}
    </span>
  );
}
