import { STAR_PATH } from "./star";

/**
 * The brand star as a light source: a yellow star that breathes, with a
 * soft glow and rotating rays behind it. Pure CSS animation (no JS), all
 * decorative (aria-hidden). `size` is the star box; rays extend ×3.
 */
export function StarLight({ size = 56, className = "", rays = true, glow = true }: { size?: number; className?: string; rays?: boolean; glow?: boolean }) {
  return (
    <span className={`pointer-events-none absolute ${className}`} style={{ width: size, height: size }} aria-hidden>
      {rays && <span className="eu-rays" style={{ width: size * 3.4, left: -size * 1.2, top: -size * 1.2 }} />}
      {glow && <span className="absolute rounded-full bg-[radial-gradient(closest-side,rgba(241,196,0,.55),rgba(241,196,0,0))] blur-xl" style={{ inset: -size * 0.6 }} />}
      <svg viewBox="0 12 72 85" className="relative block eu-breathe" style={{ width: size, height: size }}>
        <path d={STAR_PATH} fill="var(--eu-yellow)" />
      </svg>
    </span>
  );
}
