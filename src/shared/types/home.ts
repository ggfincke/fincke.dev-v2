// src/shared/types/home.ts
// content types for home page sections

// about section content shape
export interface AboutContent
{
  heading: string
  paragraphs: string[]
  email: string
}

// hero section content shape
export interface HeroContent
{
  name: string
}

// social media link shape
export interface SocialLink
{
  label: string
  url: string
  openInNewTab: boolean
  icon:
    | 'email'
    | 'github'
    | 'linkedin'
    | 'phone'
    | 'medium'
    | 'instagram'
    | 'twitter'
    | 'youtube'
}
