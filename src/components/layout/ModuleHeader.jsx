import { Link } from 'react-router-dom';
import { meta } from '../../data/content';

/**
 * ModuleHeader — the shared top bar for every Phase 2 sub-module.
 *
 * One component, used by Events / Sponsorship / Leasing alike — adding a
 * new module never means rebuilding navigation chrome. Just pass its name.
 */
export default function ModuleHeader({ moduleName }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <nav className="deck-pad flex h-16 items-center justify-between md:h-20">
        <div className="flex items-baseline gap-2.5">
          <span className="font-display text-lg tracking-tight text-bone md:text-xl">
            {meta.property}
          </span>
          <span className="text-[10px] uppercase tracking-eyebrow text-gold">
            {moduleName}
          </span>
        </div>
        <Link
          to="/"
          className="group flex items-center gap-2 text-sm text-mist transition-colors hover:text-gold"
        >
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          Back to deck
        </Link>
      </nav>
    </header>
  );
}
