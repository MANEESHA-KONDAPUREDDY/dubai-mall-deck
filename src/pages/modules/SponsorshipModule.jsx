import { motion } from 'framer-motion';
import ModuleHeader from '../../components/layout/ModuleHeader';
import ModuleFooter from '../../components/layout/ModuleFooter';
import ModuleHero from '../../components/ui/ModuleHero';
import SectionHeading from '../../components/ui/SectionHeading';
import StatCounter from '../../components/ui/StatCounter';
import EnquiryForm from '../../components/ui/EnquiryForm';
import Reveal from '../../components/ui/Reveal';
import { sponsorshipModule } from '../../data/content';
import { revealMedia, viewportOnce } from '../../lib/motion';

/**
 * SponsorshipModule — Phase 2 expandable sub-module.
 *
 * Reached from the Partner section. Same shared module shell as Events and
 * Leasing — audience data, activation menu, partnership tiers, enquiry form.
 */
export default function SponsorshipModule() {
  const m = sponsorshipModule;
  return (
    <>
      <ModuleHeader moduleName="Sponsorship Module" />
      <main>
        <ModuleHero eyebrow={m.eyebrow} title={m.title} lead={m.lead} />

        {/* Audience data */}
        <section className="deck-section bg-ink py-24 md:py-28">
          <div className="deck-pad">
            <span className="eyebrow">{m.audienceIntro}</span>
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
              {m.audienceStats.map((s) => (
                <StatCounter key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>
        </section>

        {/* Activation menu */}
        <section className="deck-section bg-ink-soft py-24 md:py-28">
          <div className="deck-pad">
            <span className="eyebrow">Ways to activate</span>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {m.activations.map((a, i) => (
                <Reveal
                  key={a.name}
                  delay={i * 0.06}
                  className="flex flex-col gap-2.5 bg-ink-soft p-7"
                >
                  <span className="font-display text-sm text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-xl text-bone">{a.name}</h3>
                  <p className="text-sm leading-relaxed text-mist">{a.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership tiers */}
        <section className="deck-section bg-ink py-24 md:py-28">
          <div className="deck-pad">
            <span className="eyebrow">Partnership tiers</span>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {m.tiers.map((tier) => (
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
                      Most chosen
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

        {/* Enquiry */}
        <section className="deck-section bg-ink-soft py-24 md:py-28">
          <div className="deck-pad grid gap-12 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="Start a partnership"
              title="Talk to the brand partnerships team."
              lead="Tell us about your brand and goals. We'll come back with audience data, available inventory, and a tier that fits."
            />
            <div className="rounded-2xl border border-line bg-ink p-7 md:p-9">
              <EnquiryForm
                subject={m.formSubject}
                selectLabel="Partnership tier of interest"
                selectOptions={m.tiers.map((t) => t.name)}
                submitLabel="Send partnership enquiry"
              />
            </div>
          </div>
        </section>
      </main>
      <ModuleFooter moduleName="Sponsorship Module" />
    </>
  );
}
