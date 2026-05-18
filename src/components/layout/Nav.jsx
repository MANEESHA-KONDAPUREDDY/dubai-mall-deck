import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SideRail from './SideRail';
import { meta } from '../../data/content';
import { scrollToId, scrollToTop } from '../../lib/scroll';
import { EASE } from '../../lib/motion';

/**
 * Nav — the deck's non-linear navigation system. Three coordinated layers:
 *
 *  1. Top bar — a slim, always-present wordmark + Index trigger.
 *  2. SideRail — a persistent right-edge indicator (see SideRail.jsx).
 *  3. Index overlay — a full-screen "visual preview" menu: a compact
 *     section list on the left, a large live preview of the hovered
 *     section on the right. The viewer browses by content, not by label,
 *     and can jump anywhere in any order.
 */

/** Self-contained preview image — falls back to a labelled placeholder
 *  when the real asset isn't wired in yet. Remounts per section, so the
 *  fallback state always reflects the current image. */
function PreviewImage({ section }) {
  const [ok, setOk] = useState(true);
  if (ok && section.image) {
    return (
      <img
        src={section.image}
        alt={section.label}
        onError={() => setOk(false)}
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_50%_30%,#211a14_0%,#0c0c0e_78%)]">
      <span className="text-2xl text-gold/30">◇</span>
      <div className="absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(45deg,#fff_0_1px,transparent_1px_20px)]" />
    </div>
  );
}

export default function Nav({ sections, activeId }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Which section the Index overlay is currently previewing.
  const [previewId, setPreviewId] = useState(activeId);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // When the overlay opens, preview the section the viewer is currently in.
  useEffect(() => {
    if (open) setPreviewId(activeId);
  }, [open, activeId]);

  // Esc closes the index; lock body scroll while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const jump = (id) => {
    setOpen(false);
    setTimeout(() => (id === 'hero' ? scrollToTop() : scrollToId(id)), 140);
  };

  const active = sections.find((s) => s.id === activeId) ?? sections[0];
  const preview =
    sections.find((s) => s.id === previewId) ?? sections[0];

  return (
    <>
      {/* ---- Top bar ---------------------------------------------------- */}
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ease-cinema ${
          scrolled || open
            ? 'border-b border-line bg-ink/90 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="deck-pad flex h-16 items-center justify-between md:h-20">
          <button
            onClick={() => jump('hero')}
            className="flex items-baseline gap-2.5 text-left"
          >
            <span className="font-display text-lg tracking-tight text-bone md:text-xl">
              {meta.property}
            </span>
            <span className="hidden text-[10px] uppercase tracking-eyebrow text-gold sm:inline">
              Destination Deck
            </span>
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="group flex items-center gap-3.5"
            aria-expanded={open}
            aria-label={open ? 'Close section index' : 'Open section index'}
          >
            <span className="hidden text-xs text-mist sm:inline">
              {open ? (
                'Close'
              ) : (
                <>
                  <span className="text-gold">{active.index}</span>
                  <span className="px-1.5 text-line">/</span>
                  <span className="text-bone">{active.label}</span>
                </>
              )}
            </span>
            <span className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-line transition-colors duration-300 group-hover:border-gold">
              <span
                className={`h-px w-4 bg-bone transition-all duration-300 ${
                  open ? 'translate-y-[3px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-4 bg-bone transition-all duration-300 ${
                  open ? '-translate-y-[3px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* ---- Persistent side rail -------------------------------------- */}
      <SideRail
        sections={sections}
        activeId={activeId}
        hidden={open}
        onJump={jump}
      />

      {/* ---- Index overlay — visual preview menu ----------------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[60] bg-ink"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(200,163,90,0.10),transparent_55%)]"
            />

            <div className="deck-pad relative flex h-full flex-col pb-10 pt-24 md:pt-28">
              <div className="flex shrink-0 items-center justify-between">
                <span className="eyebrow">Index — explore the property</span>
                <span className="text-xs text-mist">
                  <span className="text-gold">{preview.index}</span> / 08
                </span>
              </div>

              <div className="mt-8 grid flex-1 items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
                {/* Compact section list */}
                <ul className="flex flex-col">
                  {sections.map((s, i) => {
                    const isPreview = s.id === previewId;
                    return (
                      <motion.li
                        key={s.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.05 + i * 0.04,
                          ease: EASE,
                          duration: 0.45,
                        }}
                      >
                        <button
                          onClick={() => jump(s.id)}
                          onMouseEnter={() => setPreviewId(s.id)}
                          onFocus={() => setPreviewId(s.id)}
                          className="group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-4 border-b border-line py-3 text-left md:py-3.5"
                        >
                          <span
                            className={`font-display text-xs tabular-nums transition-colors duration-300 ${
                              isPreview ? 'text-gold' : 'text-mist'
                            }`}
                          >
                            {s.index}
                          </span>
                          <span
                            className={`font-display text-xl tracking-tight transition-all duration-300 ease-cinema md:text-2xl ${
                              isPreview
                                ? 'translate-x-1 text-gradient-gold'
                                : 'text-bone group-hover:translate-x-1 group-hover:text-gold-bright'
                            }`}
                          >
                            {s.label}
                          </span>
                          <span
                            aria-hidden
                            className={`text-sm text-gold transition-opacity duration-300 ${
                              isPreview ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            →
                          </span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Live preview panel — desktop only */}
                <div className="hidden h-full max-h-[62vh] flex-col justify-center lg:flex">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-line">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={preview.id}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="absolute inset-0"
                      >
                        <PreviewImage section={preview} />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Caption pinned over the image */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={preview.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                        >
                          <span className="text-xs uppercase tracking-eyebrow text-gold">
                            Chapter {preview.index}
                          </span>
                          <p className="mt-1.5 font-display text-2xl text-bone md:text-3xl">
                            {preview.label}
                          </p>
                          <p className="mt-1 text-sm text-mist">
                            {preview.tagline}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  <button
                    onClick={() => jump(preview.id)}
                    className="group mt-5 inline-flex w-fit items-center gap-3 self-start rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition-all duration-500 ease-cinema hover:bg-gold-bright"
                  >
                    Open “{preview.label}”
                    <span
                      aria-hidden
                      className="transition-transform duration-500 ease-cinema group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </button>
                </div>
              </div>

              <span className="shrink-0 pt-6 text-xs text-mist">
                Esc to close · Hover a chapter to preview · You control the
                journey
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
