import { motion } from 'framer-motion';
import VideoBackground from '../components/ui/VideoBackground';
import StatCounter from '../components/ui/StatCounter';
import TextReveal from '../components/ui/TextReveal';
import { hero, media } from '../data/content';
import { EASE } from '../lib/motion';
import { scrollToId } from '../lib/scroll';

/**
 * Hero — the opening. The 10-second window.
 *
 * Background video carries the energy; the copy lands the single idea
 * (scale) within seconds. Stats give instant proof. The whole section
 * animates in on load — this is the only section that doesn't wait for
 * a scroll, because the viewer is already here.
 *
 * To wire real footage: drop an MP4 at /public/assets/video/hero.mp4 and
 * a poster at /public/assets/images/hero-poster.jpg, then pass them below.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="deck-section vignette flex min-h-[100svh] flex-col justify-end"
    >
      {/* Poster loads instantly (and stays on mobile); the film fades in
          on desktop once the browser is idle. */}
      <VideoBackground
        youtubeId={media.heroVideoId}
        poster={media.heroPoster}
        overlay="heavy"
        eager
      />

      {/* Localised scrim — guarantees the headline and stats stay legible
          no matter what frame the background film is on. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[1] h-3/4 bg-gradient-to-t from-ink via-ink/80 to-transparent"
      />

      <div className="deck-pad relative z-10 pb-14 pt-32 md:pb-20">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow"
        >
          {hero.eyebrow}
        </motion.span>

        <h1 className="display-xl mt-6 max-w-5xl">
          {hero.titleLines.map((line, i) => (
            <TextReveal
              key={line}
              as="span"
              text={line}
              trigger="mount"
              delay={0.2 + i * 0.28}
              className={`block ${i === 1 ? 'text-bone' : 'text-bone'}`}
              wordClass={i === 1 ? 'text-gradient-gold' : ''}
            />
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-bone/80 md:text-xl"
        >
          {hero.lead}
        </motion.p>

        {/* Proof — three numbers, counted up */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
          className="mt-12 flex flex-wrap gap-x-12 gap-y-8 border-t border-line pt-8"
        >
          {hero.stats.map((s) => (
            <StatCounter key={s.label} value={s.value} label={s.label} light />
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => scrollToId('why')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="relative z-10 mx-auto mb-8 flex flex-col items-center gap-2 text-mist transition-colors hover:text-gold"
      >
        <span className="text-[10px] uppercase tracking-eyebrow">
          {hero.scrollHint}
        </span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
          className="text-lg"
        >
          ↓
        </motion.span>
      </motion.button>
    </section>
  );
}
