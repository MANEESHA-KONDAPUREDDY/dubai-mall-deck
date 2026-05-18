import SectionHeading from '../components/ui/SectionHeading';
import MediaFrame from '../components/ui/MediaFrame';
import Reveal from '../components/ui/Reveal';
import { luxury } from '../data/content';

/**
 * Luxury — elevated / flagship retail. The most restrained section by
 * design: more space, slower rhythm, a single pull quote as the anchor.
 * Restraint is the point — it signals premium positioning.
 */
export default function Luxury() {
  return (
    <section id="luxury" className="deck-section relative bg-ink py-24 md:py-32">
      {/* Warm wash to lift this section above the surrounding dark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_15%,rgba(200,163,90,0.10),transparent_55%)]"
      />

      <div className="deck-pad relative">
        <SectionHeading
          eyebrow={luxury.eyebrow}
          title={luxury.title}
          lead={luxury.lead}
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <MediaFrame
            ratio="aspect-[5/6]"
            src="/assets/images/fashion-avenue.jpg"
            alt="Fashion Avenue, the luxury wing of The Dubai Mall"
          />

          <ul className="flex flex-col">
            {luxury.points.map((point, i) => (
              <Reveal
                key={point}
                delay={i * 0.08}
                as="li"
                className="flex gap-4 border-b border-line py-5 first:pt-0"
              >
                <span className="mt-1 text-gold" aria-hidden>
                  ◇
                </span>
                <span className="text-base leading-relaxed text-bone/85 md:text-lg">
                  {point}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Pull quote */}
        <Reveal className="mt-20 border-t border-line pt-14">
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="font-display text-2xl italic leading-snug text-gradient-gold md:text-4xl">
              “{luxury.pullQuote}”
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
