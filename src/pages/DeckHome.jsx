import { useMemo } from 'react';
import Nav from '../components/layout/Nav';
import ScrollProgress from '../components/layout/ScrollProgress';
import Footer from '../components/layout/Footer';
import Hero from '../sections/Hero';
import WhyProperty from '../sections/WhyProperty';
import Retail from '../sections/Retail';
import Luxury from '../sections/Luxury';
import Dining from '../sections/Dining';
import Attractions from '../sections/Attractions';
import Events from '../sections/Events';
import Invite from '../sections/Invite';
import { navSections } from '../data/content';
import { useScrollSpy } from '../hooks/useScrollSpy';

/**
 * DeckHome — Phase 1: the core interactive overview.
 *
 * Sections are composed in narrative order but the viewer is never locked
 * into it — the Nav lets them jump to any chapter at any time. Each section
 * is a self-contained module; adding or reordering one is a one-line change.
 */
export default function DeckHome() {
  const ids = useMemo(() => navSections.map((s) => s.id), []);
  const activeId = useScrollSpy(ids);

  return (
    <>
      <ScrollProgress />
      <Nav sections={navSections} activeId={activeId} />
      <main>
        <Hero />
        <WhyProperty />
        <Retail />
        <Luxury />
        <Dining />
        <Attractions />
        <Events />
        <Invite />
      </main>
      <Footer />
    </>
  );
}
