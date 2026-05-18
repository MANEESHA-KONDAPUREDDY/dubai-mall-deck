import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Tilt — gives a card a subtle 3D lean that tracks the cursor. It makes
 * cards feel like physical objects rather than flat panels — tactile,
 * alive, premium.
 *
 * Pointer-driven, so it stays flat on touch devices.
 */
export default function Tilt({ children, className = '', max = 7 }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const srx = useSpring(rotateX, spring);
  const sry = useSpring(rotateY, spring);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * max);
    rotateX.set(-py * max);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
