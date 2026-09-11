import gsap from "gsap";

/**
 * «Add to cart» choreography: a clone of the product image arcs from the
 * card to the header cart button, shrinks and fades; the cart button bumps.
 * Pure transform/opacity, ~700ms, skipped under prefers-reduced-motion or
 * when the cart button is off-screen (mobile sticky bar handles feedback).
 */
export function flyToCart(from: HTMLElement | null) {
  if (typeof window === "undefined" || !from) return;
  const cart = document.getElementById("cart-button");
  if (!cart) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    bump(cart);
    return;
  }
  const a = from.getBoundingClientRect();
  const b = cart.getBoundingClientRect();
  if (b.width === 0 || b.bottom < 0) {
    bump(cart);
    return;
  }
  const img = from.tagName === "IMG" ? (from as HTMLImageElement) : from.querySelector("img");
  const ghost = document.createElement("div");
  ghost.setAttribute("aria-hidden", "true");
  const size = Math.min(140, a.width);
  Object.assign(ghost.style, {
    position: "fixed",
    left: `${a.left + a.width / 2 - size / 2}px`,
    top: `${a.top + a.height / 2 - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    zIndex: "1000",
    pointerEvents: "none",
    borderRadius: "16px",
    background: img ? `url(${img.currentSrc || img.src}) center/contain no-repeat` : "var(--eu-yellow)",
    filter: "drop-shadow(0 12px 20px rgba(18,42,88,.3))",
  });
  document.body.appendChild(ghost);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  const tl = gsap.timeline({ onComplete: () => ghost.remove() });
  tl.to(ghost, { x: dx * 0.55, y: dy - 120, scale: 0.7, duration: 0.34, ease: "power2.out" });
  tl.to(ghost, { x: dx, y: dy, scale: 0.15, opacity: 0.2, duration: 0.36, ease: "power2.in" });
  tl.call(() => bump(cart), [], "-=0.05");
}

function bump(el: HTMLElement) {
  el.classList.remove("eu-bump");
  void el.offsetWidth;
  el.classList.add("eu-bump");
}
