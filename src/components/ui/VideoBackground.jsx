import { useEffect, useRef, useState } from 'react';

/**
 * VideoBackground — full-bleed background video, the deck's primary
 * storytelling medium.
 *
 * Three sources, in priority order:
 *  1. youtubeId — a YouTube embed, played muted/looped as a cover layer.
 *     No download or transcoding needed; just an ID from content.js.
 *  2. src — a self-hosted MP4 (best quality + Lighthouse score).
 *  3. neither — a living gradient placeholder, so the deck is never broken.
 *
 * Self-hosted video pauses when off-screen to save CPU/battery.
 */
export default function VideoBackground({
  src,
  youtubeId,
  poster,
  overlay = 'standard',
  className = '',
}) {
  const videoRef = useRef(null);
  const [canPlay, setCanPlay] = useState(false);

  // Pause self-hosted video when off-screen.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  const overlays = {
    standard: 'bg-gradient-to-t from-ink via-ink/55 to-ink/30',
    heavy: 'bg-gradient-to-b from-ink/70 via-ink/45 to-ink/85',
    soft: 'bg-ink/40',
  };

  const ytSrc = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&rel=0&modestbranding=1&showinfo=0&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0`
    : null;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {ytSrc ? (
        // YouTube cover layer. The iframe is given oversized *real*
        // dimensions (16:9) — YouTube renders at that native size, so it
        // stays sharp — and overflow-hidden crops the player chrome out of
        // view. No CSS scale() (which would magnify and blur the footage).
        <iframe
          src={ytSrc}
          title="Background film"
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          allow="autoplay; encrypted-media; picture-in-picture"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[max(69vw,122vh)] w-[max(122vw,217vh)] -translate-x-1/2 -translate-y-1/2 border-0"
        />
      ) : src ? (
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            canPlay ? 'opacity-100' : 'opacity-0'
          }`}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setCanPlay(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        // Living placeholder — intentional-looking until real footage lands.
        <div className="absolute inset-0">
          <div className="absolute inset-0 animate-slow-zoom bg-[radial-gradient(ellipse_at_30%_20%,#2a2118_0%,transparent_55%),radial-gradient(ellipse_at_75%_75%,#1d2730_0%,transparent_55%),linear-gradient(180deg,#101012,#0a0a0b)]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(45deg,#fff_0_1px,transparent_1px_22px)]" />
        </div>
      )}

      {poster && !canPlay && src && !ytSrc && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full animate-slow-zoom object-cover"
        />
      )}

      <div className={`absolute inset-0 ${overlays[overlay]}`} />
    </div>
  );
}
