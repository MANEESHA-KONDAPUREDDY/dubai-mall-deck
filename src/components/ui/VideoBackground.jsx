import { useEffect, useState } from 'react';
import { asset } from '../../lib/asset';

/**
 * VideoBackground — full-bleed background media.
 *
 * Performance-first strategy:
 *  - A poster still renders immediately — it is the LCP element and is the
 *    final image on mobile.
 *  - The YouTube film loads ONLY on larger screens, and only once the
 *    browser is idle — so it never blocks first paint or interactivity,
 *    and phones are spared a heavy embed entirely.
 *  - With no poster and no video, a living gradient stands in.
 *
 * This keeps the deck cinematic on desktop and fast on mobile.
 */
export default function VideoBackground({
  youtubeId,
  poster,
  overlay = 'standard',
  eager = false,
  className = '',
}) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!youtubeId) return;
    // Video is a large-screen enhancement; phones keep the poster.
    if (!window.matchMedia('(min-width: 1024px)').matches) return;

    // Defer the embed until the browser is idle.
    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 1800));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = schedule(() => setShowVideo(true));
    return () => cancel(id);
  }, [youtubeId]);

  const overlays = {
    standard: 'bg-gradient-to-t from-ink via-ink/55 to-ink/30',
    heavy: 'bg-gradient-to-b from-ink/70 via-ink/45 to-ink/85',
    soft: 'bg-ink/40',
  };

  const ytSrc = showVideo
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&rel=0&modestbranding=1&showinfo=0&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0`
    : null;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {poster ? (
        <img
          src={asset(poster)}
          alt=""
          aria-hidden
          fetchpriority={eager ? 'high' : undefined}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full animate-slow-zoom object-cover"
        />
      ) : (
        // Living placeholder — only when no poster is supplied.
        <div className="absolute inset-0">
          <div className="absolute inset-0 animate-slow-zoom bg-[radial-gradient(ellipse_at_30%_20%,#2a2118_0%,transparent_55%),radial-gradient(ellipse_at_75%_75%,#1d2730_0%,transparent_55%),linear-gradient(180deg,#101012,#0a0a0b)]" />
        </div>
      )}

      {ytSrc && (
        // Oversized + centred so the player chrome is cropped out of view.
        <iframe
          src={ytSrc}
          title="Background film"
          tabIndex={-1}
          aria-hidden="true"
          allow="autoplay; encrypted-media; picture-in-picture"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[max(69vw,122vh)] w-[max(122vw,217vh)] -translate-x-1/2 -translate-y-1/2 animate-[fade-up_0.8s_ease-out] border-0"
        />
      )}

      <div className={`absolute inset-0 ${overlays[overlay]}`} />
    </div>
  );
}
