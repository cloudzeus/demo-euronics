import Image from "next/image";
import type { ReactNode } from "react";

/**
 * The one product-image frame. Every product photo on the site (card,
 * row, compare, cart, mini cart, guide, recently viewed, order lines)
 * renders through this: a square white frame with the same relative
 * inner padding, so photos of different shapes and sizes never move the
 * title, price or buttons next to them. Missing photos get a neutral
 * placeholder of the same size. Badges and buttons overlay via children.
 */
export function ProductImage({ src, alt = "", sizes = "320px", priority = false, className = "w-full", pad = "p-[9%]", rounded = "rounded-xl", frame = true, children }: { src?: string | null; alt?: string; sizes?: string; priority?: boolean; className?: string; pad?: string; rounded?: string; frame?: boolean; children?: ReactNode }) {
  return (
    <div className={`relative aspect-square shrink-0 overflow-hidden bg-white ${rounded} ${frame ? "border border-eu-line-2" : ""} ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-contain ${pad}`} unoptimized={src.startsWith("http")} />
      ) : (
        <div className="absolute inset-0 bg-eu-placeholder text-eu-placeholder-ink font-semibold text-[length:var(--fs-14)] flex items-center justify-center text-center p-2" aria-hidden>
          φωτογραφία προϊόντος
        </div>
      )}
      {children}
    </div>
  );
}
