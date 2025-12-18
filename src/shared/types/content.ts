// src/types/content.ts
// content types for static site sections

export interface AboutContent {
  heading: string;
  paragraphs: string[];
  email: string;
}

export interface HeroContent {
  name: string;
  tagline: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  dateRange: string;
  description: string;
  technologies?: string[];
  link?: string;
  visibility?: 'default' | 'wide';
}

export interface SocialLink {
  label: string;
  url: string;
  icon:
    | 'email'
    | 'github'
    | 'linkedin'
    | 'phone'
    | 'medium'
    | 'instagram'
    | 'twitter'
    | 'youtube';
}
