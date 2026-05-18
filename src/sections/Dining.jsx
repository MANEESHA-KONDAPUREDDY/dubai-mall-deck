import SectionHeading from '../components/ui/SectionHeading';
import StatCounter from '../components/ui/StatCounter';
import MediaFrame from '../components/ui/MediaFrame';
import { dining } from '../data/content';

/**
 * Dining — food as a dwell-time engine. A four-tile gallery, each tile a
 * dining mode, with copy surfacing on the image. Visual variety from the
 * sections around it: this one is image-forward.
 */
export default function Dining() {
  return (
    <section id="dining" className="deck-section bg-ink-soft py-24 md:py-32">
      <div className="deck-pad">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={dining.eyebrow}
            title={dining.title}
            lead={dining.lead}
          />
          <div className="flex shrink-0 gap-10">
            {dining.stats.map((s) => (
              <StatCounter key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dining.experiences.map((exp) => (
            <MediaFrame
              key={exp.name}
              ratio="aspect-[3/4]"
              src={exp.image}
              alt={`${exp.name} at The Dubai Mall`}
            >
              <h3 className="font-display text-lg text-bone">{exp.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-bone/70">
                {exp.copy}
              </p>
            </MediaFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
