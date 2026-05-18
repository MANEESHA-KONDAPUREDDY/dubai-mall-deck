import SectionHeading from './SectionHeading';
import VideoBackground from './VideoBackground';
import { media } from '../../data/content';

/**
 * ModuleHero — the shared cinematic opener for every Phase 2 sub-module.
 * Keeps all three modules visually consistent with the main deck's Hero.
 */
export default function ModuleHero({ eyebrow, title, lead }) {
  return (
    <section className="deck-section vignette flex min-h-[78svh] flex-col justify-end">
      <VideoBackground
        youtubeId={media.moduleVideoId || media.eventsVideoId}
        poster={media.eventsPoster}
        overlay="heavy"
        eager
      />
      <div className="deck-pad relative z-10 pb-16 pt-32">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          titleClass="display-xl"
          light
        />
      </div>
    </section>
  );
}
