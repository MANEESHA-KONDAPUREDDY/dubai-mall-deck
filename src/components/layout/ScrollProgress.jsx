import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress — a hairline gold bar across the top edge that tracks
 * reading progress. Subtle, but it gives a self-guided viewer a constant
 * sense of how much property is left to explore.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold via-gold-bright to-gold"
    />
  );
}
