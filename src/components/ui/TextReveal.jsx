import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { maskLine, maskWord, viewportOnce } from '../../lib/motion';

/**
 * TextReveal — the deck's signature heading animation.
 *
 * Each word is wrapped in an overflow-hidden span and rises up from behind
 * the mask, staggered left-to-right, as the heading scrolls into view.
 * It's the move that makes the type feel directed rather than static.
 *
 * The full string is exposed to assistive tech via aria-label; the
 * per-word spans are aria-hidden so screen readers read it normally.
 */
export default function TextReveal({
  text,
  as = 'span',
  delay = 0,
  className = '',
  wordClass = '',
  trigger = 'inView',
}) {
  const MotionTag = motion[as] ?? motion.span;
  const words = String(text).split(' ');

  // 'inView' reveals on scroll; 'mount' reveals immediately (for the hero,
  // which is already on screen at load).
  const animateProps =
    trigger === 'mount'
      ? { animate: 'show' }
      : { whileInView: 'show', viewport: viewportOnce };

  return (
    <MotionTag
      className={className}
      variants={maskLine}
      custom={delay}
      initial="hidden"
      {...animateProps}
      aria-label={text}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            aria-hidden
            className="inline-block overflow-hidden pb-[0.14em] align-top -mb-[0.14em]"
          >
            <motion.span
              variants={maskWord}
              className={`inline-block ${wordClass}`}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </MotionTag>
  );
}
