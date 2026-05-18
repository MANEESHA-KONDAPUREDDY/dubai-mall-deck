import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Tilt from '../components/ui/Tilt';
import { invite, meta } from '../data/content';
import { revealMedia, viewportOnce } from '../lib/motion';

/**
 * Invite — the close. Three explicit business actions (lease, sponsor,
 * book), each a destination. The deck never ends on a slide; it ends on
 * a decision.
 */
const ACTIONS = {
  Lease: { type: 'route', to: '/leasing' },
  Sponsor: { type: 'route', to: '/sponsorship' },
  Book: { type: 'route', to: '/events' },
};

function PathCard({ path, index }) {
  const action = ACTIONS[path.k];
  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span className="font-display text-sm text-gold">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          aria-hidden
          className="text-gold opacity-0 transition-all duration-500 ease-cinema group-hover:translate-x-1 group-hover:opacity-100"
        >
          →
        </span>
      </div>
      <h3 className="mt-6 font-display text-2xl text-bone md:text-3xl">
        {path.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">
        {path.copy}
      </p>
      <span className="mt-6 text-xs uppercase tracking-eyebrow text-gold">
        {path.action}
      </span>
    </>
  );

  const cls =
    'group flex h-full flex-col rounded-2xl border border-line bg-white/[0.02] p-7 transition-all duration-500 ease-cinema hover:-translate-y-1 hover:border-gold/50 hover:bg-white/[0.04]';

  return (
    <motion.div
      variants={revealMedia}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <Tilt max={6} className="h-full">
        {action.type === 'route' ? (
          <Link to={action.to} className={cls}>
            {inner}
          </Link>
        ) : (
          <a
            href={`mailto:${meta.contactEmail}?subject=${encodeURIComponent(
              action.subject
            )}`}
            className={cls}
          >
            {inner}
          </a>
        )}
      </Tilt>
    </motion.div>
  );
}

export default function Invite() {
  return (
    <section id="invite" className="deck-section relative bg-ink py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(200,163,90,0.12),transparent_60%)]"
      />
      <div className="deck-pad relative">
        <SectionHeading
          eyebrow={invite.eyebrow}
          title={invite.title}
          lead={invite.lead}
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
          {invite.paths.map((p, i) => (
            <PathCard key={p.k} path={p} index={i} />
          ))}
        </div>

        {/* Closing line */}
        <Reveal className="mt-24 text-center">
          <p className="display-lg mx-auto max-w-4xl text-balance text-bone">
            {invite.closingLine}
          </p>
          <a
            href={`mailto:${meta.contactEmail}`}
            className="mt-8 inline-block text-sm uppercase tracking-eyebrow text-gold transition-colors hover:text-gold-bright"
          >
            {meta.contactEmail}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
