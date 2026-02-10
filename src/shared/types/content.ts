// src/shared/types/content.ts
// content types for static site sections

// about section content shape
export interface AboutContent {
  heading: string;
  paragraphs: string[];
  email: string;
}

// hero section content shape
export interface HeroContent {
  name: string;
}

// work experience entry shape
export interface WorkExperience {
  title: string;
  company: string;
  dateRange: string;
  description: string;
  technologies?: string[];
  link?: string;
  visibility?: 'default' | 'wide';
}

// social media link shape
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
