/**
 * SideRail — a persistent, always-on navigation indicator pinned to the
 * right edge (desktop only).
 *
 * Each section is a tick. The active tick is longer and gold, so the
 * viewer always knows where they are; hovering any tick reveals its name
 * and lets them jump straight there. Minimal chrome, maximum orientation —
 * it complements the full Index overlay without competing with it.
 */
export default function SideRail({ sections, activeId, hidden, onJump }) {
  return (
    <nav
      aria-label="Section quick navigation"
      className={`fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-0.5 transition-opacity duration-300 lg:flex ${
        hidden ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {sections.map((s) => {
        const isActive = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => onJump(s.id)}
            aria-label={`Go to ${s.label}`}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center justify-end gap-3 py-1.5"
          >
            <span
              className={`whitespace-nowrap text-[11px] uppercase tracking-eyebrow transition-all duration-300 ${
                isActive
                  ? 'translate-x-0 text-gold opacity-100'
                  : 'translate-x-1 text-mist opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
              }`}
            >
              {s.label}
            </span>
            <span
              className={`h-px rounded-full transition-all duration-300 ease-cinema ${
                isActive
                  ? 'w-9 bg-gold'
                  : 'w-5 bg-mist/40 group-hover:w-7 group-hover:bg-bone'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
