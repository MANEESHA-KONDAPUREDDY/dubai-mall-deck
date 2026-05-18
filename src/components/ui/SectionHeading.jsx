import Reveal from './Reveal';
import TextReveal from './TextReveal';

/**
 * SectionHeading — the consistent header for every section: a small-caps
 * eyebrow, an editorial display title, and an optional lead paragraph.
 * Keeping it in one component guarantees identical rhythm deck-wide.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  titleClass = 'display-lg',
  light = false,
}) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start';
  const leadColor = light ? 'text-bone/80' : 'text-mist';

  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${alignClass}`}>
      <Reveal as="span" className="eyebrow">
        {eyebrow}
      </Reveal>
      <TextReveal
        as="h2"
        text={title}
        delay={0.1}
        className={`${titleClass} text-bone`}
      />
      {lead && (
        <Reveal
          as="p"
          delay={0.16}
          className={`text-lg leading-relaxed ${leadColor} text-balance md:text-xl`}
        >
          {lead}
        </Reveal>
      )}
    </div>
  );
}
