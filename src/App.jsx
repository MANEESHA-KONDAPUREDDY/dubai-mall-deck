import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { scrollToTop } from './lib/scroll';
import DeckHome from './pages/DeckHome';
import IntroLoader from './components/layout/IntroLoader';
import Cursor from './components/ui/Cursor';

/**
 * Phase 2 expandable sub-modules. Each is lazy-loaded so it never weighs
 * down the core deck — sub-modules ship as separate chunks and load only
 * when a viewer chooses that path. This is the expandability pattern:
 * a new module = a new lazy route, no change to the core.
 */
const EventsModule = lazy(() => import('./pages/modules/EventsModule'));
const SponsorshipModule = lazy(() =>
  import('./pages/modules/SponsorshipModule')
);
const LeasingModule = lazy(() => import('./pages/modules/LeasingModule'));

/** Reset scroll position whenever the route changes. */
function RouteScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTop();
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** Minimal full-screen fallback while a module chunk loads. */
function ModuleFallback() {
  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-ink">
      <span className="animate-pulse text-xs uppercase tracking-eyebrow text-gold">
        Loading module…
      </span>
    </div>
  );
}

export default function App() {
  useSmoothScroll();

  // The cinematic intro plays once per session, on a first landing at the
  // home route, and is skipped for reduced-motion users.
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    const seen = sessionStorage.getItem('introSeen');
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    return !seen && !reduced && window.location.pathname === '/';
  });

  return (
    <>
      <Cursor />
      <AnimatePresence>
        {showIntro && (
          <IntroLoader
            key="intro"
            onDone={() => {
              sessionStorage.setItem('introSeen', '1');
              setShowIntro(false);
            }}
          />
        )}
      </AnimatePresence>

      <RouteScrollReset />
      <Suspense fallback={<ModuleFallback />}>
        <Routes>
          <Route path="/" element={<DeckHome />} />
          <Route path="/events" element={<EventsModule />} />
          <Route path="/sponsorship" element={<SponsorshipModule />} />
          <Route path="/leasing" element={<LeasingModule />} />
          <Route path="*" element={<DeckHome />} />
        </Routes>
      </Suspense>
    </>
  );
}
