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

type SocialLinkIcon =
  | 'email'
  | 'github'
  | 'linkedin'
  | 'phone'
  | 'medium'
  | 'instagram'
  | 'twitter'
  | 'youtube'

interface BaseSocialLink
{
  label: string
  icon: SocialLinkIcon
}

// URL-backed social link shape
export interface UrlSocialLink extends BaseSocialLink
{
  icon: Exclude<SocialLinkIcon, 'phone'>
  url: string
  openInNewTab: boolean
}

// click-to-reveal phone entry; no URL lives in shared content
export interface PhoneSocialLink extends BaseSocialLink
{
  icon: 'phone'
}

// social media link shape
export type SocialLink = UrlSocialLink | PhoneSocialLink
