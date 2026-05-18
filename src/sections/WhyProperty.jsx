import SectionHeading from '../components/ui/SectionHeading';
import StatCounter from '../components/ui/StatCounter';
import MediaFrame from '../components/ui/MediaFrame';
import Reveal from '../components/ui/Reveal';
import { why } from '../data/content';

/**
 * WhyProperty — the case. Why this address is structurally different:
 * reach, access, dwell, and a tax advantage. Data-led, but framed as
 * commercial leverage rather than trivia.
 */
export default function WhyProperty() {
  return (
    <section id="why" className="deck-section bg-ink py-24 md:py-32">
      <div className="deck-pad">
        <SectionHeading eyebrow={why.eyebrow} title={why.title} lead={why.lead} />

        {/* Cinematic aerial banner */}
        <MediaFrame
          className="mt-12"
          ratio="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
          src="/assets/images/why-aerial.jpg"
          alt="Downtown Dubai and the Burj Khalifa"
        >
          <span className="text-xs uppercase tracking-eyebrow text-gold">
            Downtown Dubai · the city’s centre of gravity
          </span>
        </MediaFrame>

        {/* Four pillars */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {why.pillars.map((p, i) => (
            <Reveal
              key={p.k}
              delay={i * 0.08}
              className="flex flex-col gap-3 bg-ink p-7 md:p-9"
            >
              <span className="text-xs uppercase tracking-eyebrow text-gold">
                {p.k}
              </span>
              <h3 className="font-display text-xl text-bone md:text-2xl">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-mist">{p.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Stat band */}
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-12 lg:grid-cols-4">
          {why.stats.map((s) => (
            <StatCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
