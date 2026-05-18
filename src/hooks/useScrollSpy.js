import { useEffect, useState } from 'react';

/**
 * useScrollSpy — reports which section is currently in view.
 *
 * Powers the non-linear navigation: the menu always reflects where the
 * viewer is, even though they can jump anywhere at any time. Uses a single
 * IntersectionObserver for all sections — cheap, and keeps the nav honest.
 *
 * @param {string[]} ids  Section element ids to observe.
 * @returns {string} The id of the section nearest the top of the viewport.
 */
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.intersectionRatio);
        }
        // Pick the section occupying the most of the viewport.
        let best = activeId;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (bestRatio > 0) setActiveId(best);
      },
      {
        // Bias toward the upper-middle of the viewport.
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 0.85],
      }
    );

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join('|')]);

  return activeId;
}
