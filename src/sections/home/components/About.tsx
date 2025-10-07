// src/sections/home/components/About.tsx
// about section w/ bio & contact information

import { InlineLink } from '~/shared/components/ui/InlineLink';
import { ABOUT_CONTENT } from '../content/aboutContent';

// highlight specific keywords with color
function highlightText(text: string) {
  const languages = [
    'Python',
    'TypeScript',
    'Java',
    'Go',
    'Swift',
    'JavaScript',
  ];
  const frameworks = [
    'React',
    'Next.js',
    'FastAPI',
    'Django',
    'SwiftUI',
    'UIkit',
  ];
  const companies = ['Scale AI'];

  let result = text;

  // replace companies with purple spans
  companies.forEach(company => {
    result = result.replace(
      new RegExp(company, 'g'),
      `<span class="text-[var(--purple)]">${company}</span>`
    );
  });

  // replace languages with green spans
  languages.forEach(lang => {
    result = result.replace(
      new RegExp(`\\b${lang}\\b`, 'g'),
      `<span class="text-[var(--green)]">${lang}</span>`
    );
  });

  // replace frameworks with blue spans
  frameworks.forEach(framework => {
    result = result.replace(
      new RegExp(framework.replace('.', '\\.'), 'g'),
      `<span class="text-[var(--blue)]">${framework}</span>`
    );
  });

  return result;
}

// about component
export function About() {
  return (
    <section
      aria-labelledby="about-heading"
      className="animate-slide-in-left opacity-0"
      style={{ animationDelay: '0.3s' }}
    >
      <h2
        id="about-heading"
        className="text-base font-semibold tracking-wide text-[var(--cyan)]"
      >
        {ABOUT_CONTENT.heading}
      </h2>
      <p
        className="mt-3 text-sm leading-relaxed text-[var(--muted)]"
        dangerouslySetInnerHTML={{
          __html: highlightText(ABOUT_CONTENT.paragraphs[0]),
        }}
      />
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
        Would love to collaborate or chat! Reach me at{' '}
        <InlineLink href={`mailto:${ABOUT_CONTENT.email}`}>
          {ABOUT_CONTENT.email}
        </InlineLink>
        .
      </p>
    </section>
  );
}
