// src/shared/types/home.ts
// content types for home page sections

// about section content shape
export interface AboutContent
{
  readonly heading: string
  readonly paragraphs: readonly string[]
  readonly email: string
  readonly contact: {
    readonly prefix: string
    readonly suffix: string
  }
}

// hero section content shape
export interface HeroContent
{
  readonly name: string
  readonly tagline: string
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
  readonly label: string
  readonly icon: SocialLinkIcon
}

// URL-backed social link shape
export interface UrlSocialLink extends BaseSocialLink
{
  readonly icon: Exclude<SocialLinkIcon, 'phone'>
  readonly url: string
  readonly openInNewTab: boolean
}

// click-to-reveal phone entry; no URL lives in shared content
export interface PhoneSocialLink extends BaseSocialLink
{
  readonly icon: 'phone'
}

// social media link shape
export type SocialLink = UrlSocialLink | PhoneSocialLink

export interface SocialLinksContent
{
  readonly ariaLabel: string
  readonly showPhoneLabel: string
  readonly hidePhoneLabel: string
}
