import { ABOUT_CONTENT } from '../data/siteContent';

export function About()
{
  return (
    <section aria-labelledby="about-heading">
      <h2
        id="about-heading"
        className="text-base font-semibold tracking-wide text-[var(--color-text-light)]"
      >
        {ABOUT_CONTENT.heading}
      </h2>
      {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
        <p key={index} className="mt-3 text-sm leading-relaxed text-[var(--color-text)]">
          {paragraph}
        </p>
      ))}
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text)]">
        Would love to collaborate or chat! Reach me at{' '}
        <a
          className="underline decoration-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-text-light)]"
          href={`mailto:${ABOUT_CONTENT.email}`}
        >
          {ABOUT_CONTENT.email}
        </a>
        .
      </p>
    </section>
  );
}
