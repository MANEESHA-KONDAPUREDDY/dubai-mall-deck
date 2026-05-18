import { Link } from 'react-router-dom';

/**
 * ModuleFooter — shared closing strip for every Phase 2 sub-module, with
 * a clear route back into the main deck.
 */
export default function ModuleFooter({ moduleName }) {
  return (
    <footer className="border-t border-line bg-ink py-10">
      <div className="deck-pad flex flex-col items-center gap-3 text-center">
        <Link
          to="/"
          className="text-sm uppercase tracking-eyebrow text-gold transition-colors hover:text-gold-bright"
        >
          ← Return to the full deck
        </Link>
        <span className="text-xs text-mist">
          {moduleName} · Phase 2 expandable sub-module
        </span>
      </div>
    </footer>
  );
}
