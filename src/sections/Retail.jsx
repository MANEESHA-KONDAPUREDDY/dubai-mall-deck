import SectionHeading from '../components/ui/SectionHeading';
import StatCounter from '../components/ui/StatCounter';
import MediaFrame from '../components/ui/MediaFrame';
import Reveal from '../components/ui/Reveal';
import CTAButton from '../components/ui/CTAButton';
import { retail } from '../data/content';

/**
 * Retail — the core commercial floor. A two-column layout: the argument
 * and segments on the left, a stacked media column on the right. Ends on
 * a leasing CTA — every section moves the viewer toward an action.
 */
export default function Retail() {
  return (
    <section id="retail" className="deck-section bg-ink-soft py-24 md:py-32">
      <div className="deck-pad">
        <SectionHeading
          eyebrow={retail.eyebrow}
          title={retail.title}
          lead={retail.lead}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          {/* Segments */}
          <div className="flex flex-col gap-px lg:col-span-7">
            {retail.segments.map((seg, i) => (
              <Reveal
                key={seg.name}
                delay={i * 0.07}
                className="group flex items-baseline gap-5 border-t border-line py-5 last:border-b"
              >
                <span className="font-display text-sm text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl text-bone transition-colors group-hover:text-gold-bright md:text-2xl">
                    {seg.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-mist">
                    {seg.copy}
                  </p>
                </div>
              </Reveal>
            ))}

            <div className="mt-9 flex flex-wrap gap-x-10 gap-y-6">
              {retail.stats.map((s) => (
                <StatCounter key={s.label} value={s.value} label={s.label} />
              ))}
            </div>

            <div className="mt-9">
              <CTAButton to={retail.cta.to} variant="outline">
                {retail.cta.label}
              </CTAButton>
            </div>
          </div>

          {/* Media column */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            <MediaFrame
              ratio="aspect-[4/5]"
              src="/assets/images/retail-concourse.jpg"
              alt="The Dubai Mall retail concourse"
            />
            <div className="grid grid-cols-2 gap-5">
              <MediaFrame
                ratio="aspect-square"
                src="/assets/images/retail-storefront.jpg"
                alt="Storefronts inside The Dubai Mall"
              />
              <MediaFrame
                ratio="aspect-square"
                src="/assets/images/retail-crowd.jpg"
                alt="Visitors across the retail floor"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
