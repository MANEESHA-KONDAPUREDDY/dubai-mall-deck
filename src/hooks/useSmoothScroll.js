import { useEffect } from 'react';
import Lenis from 'lenis';
import { registerLenis } from '../lib/scroll';

/**
 * useSmoothScroll — mounts Lenis for inertial, cinematic scrolling and
 * registers it with the scroll bridge so the nav and CTAs can drive
 * programmatic jumps.
 *
 * Disabled automatically for users who prefer reduced motion — they get
 * native scrolling, and scrollToId() falls back gracefully.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    document.documentElement.classList.add('lenis');

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    registerLenis(lenis);

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      registerLenis(null);
      document.documentElement.classList.remove('lenis');
    };
  }, []);
}
