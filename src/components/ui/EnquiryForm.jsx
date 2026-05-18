import { useState } from 'react';
import { meta } from '../../data/content';

/**
 * EnquiryForm — one reusable enquiry form for every sub-module.
 *
 * Events, Sponsorship, and Leasing each need a "get in touch" form that
 * differs only in its subject line and the dropdown options. Rather than
 * three near-identical forms, this takes those as props. Submitting
 * composes a pre-filled email — functional with no backend.
 */
export default function EnquiryForm({
  subject,
  selectLabel = 'Area of interest',
  selectOptions = [],
  submitLabel = 'Send enquiry',
}) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    choice: selectOptions[0] ?? '',
    message: '',
  });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const lines = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      selectOptions.length ? `${selectLabel}: ${form.choice}` : null,
      '',
      form.message,
    ].filter((l) => l !== null);
    window.location.href = `mailto:${meta.contactEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  const field =
    'w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-bone placeholder:text-mist/70 transition-colors focus:border-gold focus:outline-none';

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className={field}
          placeholder="Your name"
          value={form.name}
          onChange={update('name')}
          required
        />
        <input
          className={field}
          placeholder="Company / agency"
          value={form.company}
          onChange={update('company')}
          required
        />
      </div>

      {selectOptions.length > 0 && (
        <label className="flex flex-col gap-1.5">
          <span className="text-xs uppercase tracking-eyebrow text-mist">
            {selectLabel}
          </span>
          <select
            className={field}
            value={form.choice}
            onChange={update('choice')}
          >
            {selectOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-ink">
                {opt}
              </option>
            ))}
          </select>
        </label>
      )}

      <textarea
        className={`${field} min-h-28 resize-none`}
        placeholder="Tell us a little about what you have in mind…"
        value={form.message}
        onChange={update('message')}
      />

      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-all duration-500 ease-cinema hover:bg-gold-bright hover:shadow-[0_0_40px_-8px_rgba(200,163,90,0.6)]"
      >
        {submitLabel}
        <span
          aria-hidden
          className="transition-transform duration-500 ease-cinema group-hover:translate-x-1.5"
        >
          →
        </span>
      </button>
    </form>
  );
}
