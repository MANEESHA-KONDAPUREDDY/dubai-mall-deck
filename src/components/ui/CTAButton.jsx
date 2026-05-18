import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';

/**
 * CTAButton — the deck's single call-to-action style.
 *
 * Every section pushes toward a business action, so the CTA needs to be
 * unmistakable and consistent. Renders as a router <Link> for internal
 * routes (e.g. /events), a smooth in-page scroll for "#" anchors, or a
 * plain <button> when an onClick handler is supplied — and is wrapped in
 * Magnetic so it leans toward the cursor on hover.
 */
export default function CTAButton({
  children,
  to,
  anchor,
  onClick,
  variant = 'solid',
  className = '',
}) {
  const base =
    'group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-500 ease-cinema';
  const styles =
    variant === 'solid'
      ? 'bg-gold text-ink hover:bg-gold-bright hover:shadow-[0_0_40px_-8px_rgba(200,163,90,0.6)]'
      : 'border border-line text-bone hover:border-gold hover:text-gold';

  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="translate-x-0 transition-transform duration-500 ease-cinema group-hover:translate-x-1.5"
      >
        →
      </span>
    </>
  );

  const cls = `${base} ${styles} ${className}`;

  let el;
  if (to) {
    el = (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  } else if (anchor) {
    const handleAnchor = (e) => {
      e.preventDefault();
      document
        .getElementById(anchor)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    el = (
      <a href={`#${anchor}`} onClick={handleAnchor} className={cls}>
        {inner}
      </a>
    );
  } else {
    el = (
      <button type="button" onClick={onClick} className={cls}>
        {inner}
      </button>
    );
  }

  return <Magnetic strength={0.4}>{el}</Magnetic>;
}

