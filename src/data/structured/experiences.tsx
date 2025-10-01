// src/data/structured/experiences.tsx
// professional experience & education structured data

import { GoogleLogo, MetaLogo, OpenAILogo, PSULogo } from '~/components/logos';
import type { Experience, Education } from '~/types/experience';

// work experience data w/ logos & detailed content
export const experiences: Experience[] = [
  {
    id: 'scale',
    date: 'MAY 2024 — JUL 2025',
    title: 'Software Engineering Contractor',
    company: 'Scale AI',
    companyUrl: 'https://scale.com/',
    technologies: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Swift', 'PostgreSQL'],
    companyLogos: (
      <>
        <GoogleLogo />
        <MetaLogo />
        <OpenAILogo />
      </>
    ),
    content: (
      <>
        <p className="mb-4">
          Built internal tooling and harnesses to evaluate LLM-generated code for clients including Google, Meta, and OpenAI
        </p>

        <p className="mb-4">
          Automated compilation, execution, linting, and test orchestration to measure pass@k and correctness
        </p>

        <p className="mb-4">
          Contributed to{' '}<a href="https://www.theverge.com/news/670773/google-labs-stitch-ui-coding-design-tool" target="_blank" rel="noopener noreferrer" className="hover:underline">Google&apos;s Stitch UI code-generation workflow</a>{' '}
          by building prompt templates and evaluation harnesses that improved component fidelity and layout accuracy
        </p>

        <p className="mb-4">
          Designed data pipelines for training/eval (schema/versioning, validation, deterministic sampling) that replaced manual review with scripted checks and reduced turnaround time
        </p>

        <p className="mb-4">
          Instrumented metrics and built dashboards (syntax/style error rates, test failure modes); triaged failures with research/eng partners to accelerate model iteration cycles
        </p>

        <p className="mb-4">
          Authored seed datasets and context frameworks emphasizing clean, idiomatic solutions and explicit performance trade-offs
        </p>

        <p className="mb-4">
          Enforced schema normalization and deduplication at ingest via scripted checks for data quality assurance
        </p>

      </>
    )
  },
  {
    id: 'psu',
    date: 'AUG — DEC 2024',
    title: 'CMPSC 475 Learning Assistant',
    company: 'Pennsylvania State University',
    companyUrl: 'https://www.psu.edu',
    technologies: ['Swift', 'SwiftUI', 'UIKit', 'iOS', 'iPadOS', 'macOS'],
    companyLogos: <PSULogo />,
    content: (
      <>
        <p className="mb-4">
          Mentored students in iOS/mobile application development for CMPSC 475: Applications Programming, emphasizing clean code practices and best programming principles.
        </p>
        <p className="mb-4">
          Reviewed and debugged student code, enhancing their understanding of application programming concepts while teaching code quality standards and maintainable design patterns.
        </p>
        <p className="mb-4">
          Collaborated with faculty to tailor instruction based on student progress and technical challenges, with focus on developing strong coding fundamentals.
        </p>
      </>
    )
  },
  {
    id: 'pink-ocean',
    date: 'APR 2020 — PRESENT',
    title: 'Owner / Operator',
    company: 'Pink Ocean Collectibles',
    companyUrl: 'https://www.ebay.com/usr/tterrag456',
    technologies: ['Python', 'eBay APIs', 'TCGPlayer APIs'],
    companyLogos: <></>,
    content: (
      <>
        <p className="mb-4">
          Built and operate multi-channel storefront for collectibles and refurbished electronics (eBay, TCGPlayer, Facebook Marketplace) with 2000+ sales since launch
        </p>
        <p className="mb-4">
          Generated over $60k in lifetime profit through data-driven sourcing and dynamic pricing strategies across trading cards, comics, video games, retro consoles, and consumer electronics
        </p>
        <p className="mb-4">
          Maintained exceptional customer relationships with 100% positive rating on eBay (105 feedback), TCGPlayer (700+ orders), and 5-star rating on Facebook Marketplace
        </p>
        <p className="mb-4">
          Developed comprehensive automation suite including listing pipelines (Python + marketplace APIs), dynamic pricing tools based on market trends, and analytics dashboard for performance tracking
        </p>
        <p className="mb-4">
          Repaired and modded consumer electronics (iPhones, Game Boys/GameCubes, PCs, and more) and sold restored units through storefront
        </p>
      </>
    )
  }
];

// education data
export const education: Education = {
  institution: "Pennsylvania State University",
  degree: "Bachelor of Science in Computer Science",
  period: "August 2021 - December 2024"
}; 
