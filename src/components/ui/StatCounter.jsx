import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

/**
 * StatCounter — animates a headline figure when it scrolls into view.
 *
 * Values in content.js are written naturally ("40M+", "~30%", "4 min",
 * "1992", "National"). This parses out the numeric core, counts up to it,
 * and preserves whatever prefix/suffix the writer intended. Non-numeric
 * values ("National") simply render as-is.
 */
function parse(value) {
  const match = String(value).match(/^(\D*)([\d.]+)(.*)$/s);
  if (!match) return { prefix: '', target: null, suffix: String(value) };
  return { prefix: match[1], target: parseFloat(match[2]), suffix: match[3] };
}

export default function StatCounter({ value, label, light = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { prefix, target, suffix } = parse(value);
  const decimals = target != null && !Number.isInteger(target) ? 1 : 0;
  const [display, setDisplay] = useState(target != null ? 0 : value);

  useEffect(() => {
    if (!inView || target == null) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, target, decimals]);

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <span className="font-display text-4xl leading-none text-gradient-gold md:text-5xl">
        {target != null ? `${prefix}${display}${suffix}` : value}
      </span>
      <span
        className={`text-sm leading-snug ${light ? 'text-bone/65' : 'text-mist'}`}
      >
        {label}
      </span>
    </div>
  );
}
