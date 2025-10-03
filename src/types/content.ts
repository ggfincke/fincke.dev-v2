// src/types/content.ts
// content types for static site sections

export interface AboutContent
{
  heading: string;
  paragraphs: string[];
  email: string;
}

export interface HeroContent
{
  name: string;
  tagline: string;
}
