import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Cursor — a custom two-part pointer: an exact gold dot, plus a ring that
 * trails on a spring and swells over anything interactive.
 *
 * Desktop only — it checks for a fine pointer and renders nothing on
 * touch devices, where the native cursor is left untouched.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;

    setEnabled(true);
    document.body.classList.add('cursor-none');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      setHovering(
        !!e.target.closest?.(
          'a, button, input, select, textarea, [data-cursor]'
        )
      );
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.body.classList.remove('cursor-none');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Exact dot */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[95] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold-bright"
      />
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 2.3 : 1,
          opacity: hovering ? 0.5 : 0.9,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[95] -ml-4 -mt-4 h-8 w-8 rounded-full border border-gold"
      />
    </>
  );
}
