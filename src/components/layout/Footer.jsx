import { navSections, meta } from '../../data/content';
import { scrollToId, scrollToTop } from '../../lib/scroll';

/**
 * Footer — closes the deck with a quiet index and a single clear contact
 * line. No marketing noise; just a way back into the experience.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-soft">
      <div className="deck-pad flex flex-col gap-12 py-16 md:py-20">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <p className="font-display text-2xl text-bone">{meta.property}</p>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              {meta.tagline}
            </p>
            <p className="mt-4 text-xs uppercase tracking-eyebrow text-gold">
              {meta.location}
            </p>
          </div>

          {/* Mini index — every section, one click away */}
          <nav className="grid grid-cols-2 gap-x-12 gap-y-2.5 sm:grid-cols-3">
            {navSections.map((s) => (
              <button
                key={s.id}
                onClick={() => (s.id === 'hero' ? scrollToTop() : scrollToId(s.id))}
                className="flex items-center gap-2 text-left text-sm text-mist transition-colors hover:text-gold"
              >
                <span className="text-[10px] text-gold/60">{s.index}</span>
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-8 text-xs text-mist md:flex-row md:items-center md:justify-between">
          <span>
            Interactive sales experience · Built as a screening project for
            LIAT.ai
          </span>
          <span>
            Concept demo — content drawn from public sources, some figures
            illustrative.
          </span>
        </div>
      </div>
    </footer>
  );
}
