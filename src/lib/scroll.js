/**
 * scroll.js — a tiny bridge between the Lenis instance and any component
 * that needs to trigger a programmatic scroll (the nav, CTAs, the section
 * jump menu).
 *
 * Avoids prop-drilling the Lenis instance through the whole tree. The
 * smooth-scroll hook registers the instance here on mount; everyone else
 * just calls scrollToId(). Falls back to native scrolling when Lenis is
 * absent (e.g. reduced-motion users).
 */

let lenis = null;

export function registerLenis(instance) {
  lenis = instance;
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}
