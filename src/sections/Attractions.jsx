import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import StatCounter from '../components/ui/StatCounter';
import Tilt from '../components/ui/Tilt';
import { attractions } from '../data/content';
import { revealMedia, viewportOnce } from '../lib/motion';
import { asset } from '../lib/asset';

/**
 * Attractions — the differentiator section, so it's the loudest.
 *
 * A bento grid of feature cards (the first and last span wide) keeps the
 * eye moving. The `spark` accent appears only here — entertainment energy,
 * deliberately separate from the gold luxury thread.
 */
function FeatureCard({ feature, span }) {
  return (
    <Tilt max={6} className={span}>
      <motion.article
        variants={revealMedia}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="group relative flex h-full min-h-[20rem] flex-col justify-end overflow-hidden rounded-2xl border border-line p-7 md:min-h-[24rem]"
      >
        <img
          src={asset(feature.image)}
          alt={feature.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.8s] ease-cinema group-hover:scale-110"
        />
        {/* Readability gradient over the photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/15" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-spark/40 bg-spark/15 px-3 py-1 text-[10px] uppercase tracking-eyebrow text-spark backdrop-blur-sm">
            {feature.tag}
          </span>
          <h3 className="mt-3 font-display text-2xl text-bone md:text-3xl">
            {feature.name}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-bone/75">
            {feature.copy}
          </p>
        </div>
      </motion.article>
    </Tilt>
  );
}

export default function Attractions() {
  return (
    <section id="attractions" className="deck-section bg-ink py-24 md:py-32">
      <div className="deck-pad">
        <SectionHeading
          eyebrow={attractions.eyebrow}
          title={attractions.title}
          lead={attractions.lead}
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          <FeatureCard feature={attractions.features[0]} span="lg:col-span-2" />
          <FeatureCard feature={attractions.features[1]} span="lg:col-span-1" />
          <FeatureCard feature={attractions.features[2]} span="lg:col-span-1" />
          <FeatureCard feature={attractions.features[3]} span="lg:col-span-2" />
        </div>

        <div className="mt-14 grid grid-cols-3 gap-8 border-t border-line pt-12">
          {attractions.stats.map((s) => (
            <StatCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
