import { motion } from 'framer-motion';
import { fadeUpDelayed, viewportOnce } from '../../lib/motion';

/**
 * Reveal — the deck's default scroll-triggered entrance.
 *
 * Wrap any block to have it fade and rise into view once. `delay` staggers
 * sibling reveals; `as` lets it render as the right semantic element.
 */
export default function Reveal({
  children,
  delay = 0,
  as = 'div',
  className = '',
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      variants={fadeUpDelayed}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
