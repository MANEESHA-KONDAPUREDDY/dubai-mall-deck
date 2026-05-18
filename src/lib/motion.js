/**
 * motion.js — shared Framer Motion variants.
 *
 * Centralising motion keeps timing and easing consistent across every
 * section, so the whole deck feels like one choreographed experience
 * rather than a collection of independently animated components.
 */

// Signature easing — a slow, confident settle. Used everywhere.
export const EASE = [0.16, 1, 0.3, 1];

/** Fade + rise. The default entrance for headings, paragraphs, panels. */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

/**
 * Same as fadeUp but accepts a custom delay via the `custom` prop, and
 * settles a soft blur — content resolves into focus rather than just
 * appearing. A subtle, premium touch used for body copy and panels.
 */
export const fadeUpDelayed = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

/**
 * Masked text reveal. Words are wrapped in overflow-hidden spans and rise
 * up from behind the mask, staggered — the signature heading animation of
 * luxury brand sites. `maskLine` is the container, `maskWord` each word.
 */
export const maskLine = {
  hidden: {},
  show: (delay = 0) => ({
    transition: { staggerChildren: 0.05, delayChildren: delay },
  }),
};

export const maskWord = {
  hidden: { y: '120%' },
  show: { y: 0, transition: { duration: 0.85, ease: EASE } },
};

/** Container that releases its children in a staggered cascade. */
export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

/** A child of `stagger` — no explicit delay, the parent schedules it. */
export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/** Soft scale-in for media tiles and cards. */
export const revealMedia = {
  hidden: { opacity: 0, scale: 1.04 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE } },
};

/** Shared viewport config — animate once, trigger slightly early. */
export const viewportOnce = { once: true, amount: 0.25 };
