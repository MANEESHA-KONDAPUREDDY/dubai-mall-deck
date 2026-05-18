import ModuleHeader from '../../components/layout/ModuleHeader';
import ModuleFooter from '../../components/layout/ModuleFooter';
import ModuleHero from '../../components/ui/ModuleHero';
import SectionHeading from '../../components/ui/SectionHeading';
import StatCounter from '../../components/ui/StatCounter';
import EnquiryForm from '../../components/ui/EnquiryForm';
import MediaFrame from '../../components/ui/MediaFrame';
import Reveal from '../../components/ui/Reveal';
import { leasingModule } from '../../data/content';

/**
 * LeasingModule — Phase 2 expandable sub-module.
 *
 * Reached from the Retail section and the Partner section. Segments the
 * leasing pitch by category, then lays out the leasing process, using the
 * same shared module shell as Events and Sponsorship.
 */
export default function LeasingModule() {
  const m = leasingModule;
  return (
    <>
      <ModuleHeader moduleName="Leasing Module" />
      <main>
        <ModuleHero eyebrow={m.eyebrow} title={m.title} lead={m.lead} />

        {/* Leasing paths by category */}
        <section className="deck-section bg-ink py-24 md:py-28">
          <div className="deck-pad">
            <span className="eyebrow">Leasing paths by category</span>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {m.paths.map((path, i) => (
                <Reveal
                  key={path.k}
                  delay={i * 0.07}
                  className="flex flex-col gap-4 rounded-2xl border border-line bg-white/[0.02] p-7 md:p-8"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-sm text-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-2xl text-bone">
                      {path.k}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-mist">
                    {path.copy}
                  </p>
                  <span className="mt-auto text-xs uppercase tracking-eyebrow text-gold">
                    Best fit · {path.fit}
                  </span>
                </Reveal>
              ))}
            </div>

            <div className="mt-14 grid grid-cols-3 gap-8 border-t border-line pt-12">
              {m.stats.map((s) => (
                <StatCounter key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>
        </section>

        {/* Leasing process */}
        <section className="deck-section bg-ink-soft py-24 md:py-28">
          <div className="deck-pad grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="The leasing process"
                title="Four steps to opening day."
                lead="A clear path from first enquiry to launch — with support at every stage."
              />
            </div>
            <div className="flex flex-col lg:col-span-7">
              {m.process.map((p, i) => (
                <Reveal
                  key={p.step}
                  delay={i * 0.08}
                  className="flex gap-5 border-t border-line py-5 last:border-b"
                >
                  <span className="font-display text-sm text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-bone">
                      {p.step}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-mist">
                      {p.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry */}
        <section className="deck-section bg-ink py-24 md:py-28">
          <div className="deck-pad grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-8">
              <SectionHeading
                eyebrow="Enquire about space"
                title="Start a leasing conversation."
                lead="Tell us your brand, format, and timing. The leasing team will respond with available space and a tailored proposal."
              />
              <MediaFrame
                ratio="aspect-[16/9]"
                src="/assets/images/retail-crowd.jpg"
                alt="Retail space across The Dubai Mall concourse"
              />
            </div>
            <div className="rounded-2xl border border-line bg-ink-soft p-7 md:p-9">
              <EnquiryForm
                subject={m.formSubject}
                selectLabel="Leasing category"
                selectOptions={m.paths.map((p) => p.k)}
                submitLabel="Send leasing enquiry"
              />
            </div>
          </div>
        </section>
      </main>
      <ModuleFooter moduleName="Leasing Module" />
    </>
  );
}
