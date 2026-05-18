import { motion } from 'framer-motion';
import ModuleHeader from '../../components/layout/ModuleHeader';
import ModuleFooter from '../../components/layout/ModuleFooter';
import ModuleHero from '../../components/ui/ModuleHero';
import SectionHeading from '../../components/ui/SectionHeading';
import EnquiryForm from '../../components/ui/EnquiryForm';
import Reveal from '../../components/ui/Reveal';
import { eventsModule } from '../../data/content';
import { revealMedia, viewportOnce } from '../../lib/motion';

/**
 * EventsModule — Phase 2 expandable sub-module.
 *
 * Reached from the Events section's CTA. Proves the brief's architecture
 * point: the deck grows into deep, clickable sub-modules without a rewrite
 * — it's just a lazy route built from shared module components plus its
 * own slice of content.js.
 */
export default function EventsModule() {
  return (
    <>
      <ModuleHeader moduleName="Events Module" />
      <main>
        <ModuleHero
          eyebrow={eventsModule.eyebrow}
          title={eventsModule.title}
          lead={eventsModule.lead}
        />

        {/* Venues */}
        <section className="deck-section bg-ink py-24 md:py-28">
          <div className="deck-pad">
            <span className="eyebrow">Venues & capacities</span>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {eventsModule.venues.map((v, i) => (
                <Reveal
                  key={v.name}
                  delay={i * 0.07}
                  className="flex flex-col gap-3 rounded-2xl border border-line bg-white/[0.02] p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-2xl text-bone">
                      {v.name}
                    </h3>
                    <span className="shrink-0 text-xs text-gold">
                      {v.capacity}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-eyebrow text-mist">
                    {v.use}
                  </span>
                  <p className="text-sm leading-relaxed text-mist">{v.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="deck-section bg-ink-soft py-24 md:py-28">
          <div className="deck-pad">
            <span className="eyebrow">Recent highlights</span>
            <ul className="mt-10 flex flex-col">
              {eventsModule.highlights.map((h, i) => (
                <Reveal
                  key={h}
                  delay={i * 0.06}
                  as="li"
                  className="flex items-center gap-5 border-t border-line py-5 last:border-b"
                >
                  <span className="font-display text-sm text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg text-bone/85 md:text-xl">{h}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Partnership tiers */}
        <section className="deck-section bg-ink py-24 md:py-28">
          <div className="deck-pad">
            <span className="eyebrow">Partnership tiers</span>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {eventsModule.tiers.map((tier) => (
                <motion.div
                  key={tier.name}
                  variants={revealMedia}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  className={`flex flex-col rounded-2xl border p-7 ${
                    tier.featured
                      ? 'border-gold/50 bg-gold/[0.06]'
                      : 'border-line bg-white/[0.02]'
                  }`}
                >
                  {tier.featured && (
                    <span className="mb-4 inline-flex w-fit rounded-full bg-gold px-3 py-1 text-[10px] uppercase tracking-eyebrow text-ink">
                      Most booked
                    </span>
                  )}
                  <h3 className="font-display text-2xl text-bone">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-mist">{tier.scope}</p>
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {tier.includes.map((inc) => (
                      <li key={inc} className="flex gap-3 text-sm text-bone/80">
                        <span className="text-gold" aria-hidden>
                          ◇
                        </span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking enquiry */}
        <section className="deck-section bg-ink-soft py-24 md:py-28">
          <div className="deck-pad grid gap-12 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="Book your moment"
              title="Start a booking enquiry."
              lead="Tell the events team what you're planning. We'll respond with availability, capacities, and a production path."
            />
            <div className="rounded-2xl border border-line bg-ink p-7 md:p-9">
              <EnquiryForm
                subject={eventsModule.formSubject}
                selectLabel="Venue of interest"
                selectOptions={eventsModule.venues.map((v) => v.name)}
                submitLabel="Send booking enquiry"
              />
            </div>
          </div>
        </section>
      </main>
      <ModuleFooter moduleName="Events Module" />
    </>
  );
}
