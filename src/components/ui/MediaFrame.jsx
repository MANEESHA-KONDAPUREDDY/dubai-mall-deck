import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { revealMedia, viewportOnce } from '../../lib/motion';

/**
 * MediaFrame — an image tile with a cinematic scale-in reveal and a subtle
 * scroll-driven parallax: the image drifts slightly slower than the page,
 * which keeps every section feeling alive rather than static.
 *
 * When no `src` is supplied it renders a labelled placeholder — the label
 * doubles as a production note for whatever asset belongs there.
 */
export default function MediaFrame({
  src,
  alt = '',
  label,
  ratio = 'aspect-[4/3]',
  className = '',
  parallax = true,
  children,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // The image is rendered 114% tall; this drifts it within that overflow.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    parallax ? ['-7%', '7%'] : ['0%', '0%']
  );

  return (
    <motion.div
      ref={ref}
      variants={revealMedia}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`group relative overflow-hidden rounded-2xl border border-line ${ratio} ${className}`}
    >
      {src ? (
        <motion.img
          src={src}
          alt={alt || label || ''}
          loading="lazy"
          decoding="async"
          style={{ y }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 -top-[7%] h-[114%] w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_50%_30%,#1f1f25_0%,#0d0d0f_75%)]">
          <div className="flex flex-col items-center gap-2 px-6 text-center">
            <span className="text-2xl text-gold/40">◇</span>
            <span className="text-xs uppercase tracking-eyebrow text-mist">
              {label ?? 'Media'}
            </span>
          </div>
          <div className="absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(45deg,#fff_0_1px,transparent_1px_18px)]" />
        </div>
      )}

      {/* Caption / overlay content slot */}
      {children && (
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/95 via-ink/45 to-transparent p-5">
          {children}
        </div>
      )}
    </motion.div>
  );
}
