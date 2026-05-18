import SectionHeading from '../components/ui/SectionHeading';
import StatCounter from '../components/ui/StatCounter';
import Reveal from '../components/ui/Reveal';
import CTAButton from '../components/ui/CTAButton';
import VideoBackground from '../components/ui/VideoBackground';
import { events, media } from '../data/content';

/**
 * Events — the property as a media platform. Set over a background video
 * to convey live energy. The CTA leads into the Phase 2 Events Module,
 * the deck's first expandable sub-section.
 */
export default function Events() {
  return (
    <section id="events" className="deck-section relative py-24 md:py-32">
      <VideoBackground
        youtubeId={media.eventsVideoId}
        poster={media.eventsPoster}
        overlay="standard"
      />

      <div className="deck-pad relative z-10">
        <SectionHeading
          eyebrow={events.eyebrow}
          title={events.title}
          lead={events.lead}
          light
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          {/* Formats the property can host */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-eyebrow text-gold">
              What the property hosts
            </span>
            <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {events.formats.map((fmt, i) => (
                <Reveal
                  key={fmt}
                  delay={i * 0.05}
                  className="flex items-center gap-3 bg-ink/80 px-5 py-4 backdrop-blur-sm"
                >
                  <span className="text-gold" aria-hidden>
                    ◇
                  </span>
                  <span className="text-sm text-bone">{fmt}</span>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Stats + CTA */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="glass flex flex-col gap-8 p-8">
              {events.stats.map((s) => (
                <StatCounter
                  key={s.label}
                  value={s.value}
                  label={s.label}
                  light
                />
              ))}
            </div>
            <Reveal delay={0.2}>
              <CTAButton to={events.cta.target}>{events.cta.label}</CTAButton>
              <p className="mt-3 text-xs text-mist">
                Phase 2 module — venues, capacities, and a booking path.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
