import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { meta } from '../../data/content';

/**
 * IntroLoader — a brief cinematic entry sequence.
 *
 * The property name resolves into focus while a hairline progress bar and
 * a 0–100 counter fill; the panel then lifts away like a curtain to reveal
 * the hero. It sets the tone — this is a production, not a web page —
 * before a single section is seen.
 *
 * Shown once per session (sessionStorage guard lives in App).
 */
export default function IntroLoader({ onDone }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const DURATION = 1500;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      // Ease-out so the count decelerates into 100.
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 480);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: EASE }}
    >
      {/* Soft gold glow for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(200,163,90,0.10),transparent_60%)]"
      />

      <div className="relative flex flex-col items-center gap-6 px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-xs uppercase tracking-eyebrow text-gold"
        >
          Destination Deck
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, filter: 'blur(14px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: EASE }}
          className="text-center font-display leading-none tracking-tight text-bone"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
        >
          {meta.property}
        </motion.h1>

        {/* Progress line */}
        <div className="mt-2 h-px w-56 overflow-hidden bg-line sm:w-72">
          <div
            className="h-full bg-gradient-to-r from-gold to-gold-bright transition-[width] duration-100 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>

      {/* Counter, pinned bottom-right like a film leader */}
      <div className="absolute bottom-8 right-8 font-display text-sm tabular-nums text-mist">
        {String(count).padStart(3, '0')}
      </div>
    </motion.div>
  );
}
