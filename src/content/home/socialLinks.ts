// src/content/home/socialLinks.ts
// social media links data

import type { SocialLink, SocialLinksContent } from '~/shared/types'
import { EMAIL } from '~/content/home/about'
import { deepFreeze } from '~/shared/utils/deepFreeze'

export const SOCIAL_LINKS_CONTENT = deepFreeze({
  ariaLabel: 'Social media links',
  showPhoneLabel: 'Show phone number',
  hidePhoneLabel: 'Hide phone number',
} satisfies SocialLinksContent)

// social link entries w/ icons & URLs
export const SOCIAL_LINKS = deepFreeze([
  {
    label: 'Email',
    url: `mailto:${EMAIL}`,
    icon: 'email',
    openInNewTab: false,
  },
  {
    label: 'Phone',
    icon: 'phone',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/ggfincke',
    icon: 'github',
    openInNewTab: true,
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/garrett-fincke/',
    icon: 'linkedin',
    openInNewTab: true,
  },
  {
    label: 'Medium',
    url: 'https://medium.com/@ggfincke',
    icon: 'medium',
    openInNewTab: true,
  },
  {
    label: 'Instagram',
    url: 'https://instagram.com/ggfincke',
    icon: 'instagram',
    openInNewTab: true,
  },
  {
    label: 'Twitter',
    url: 'https://twitter.com/finckedev',
    icon: 'twitter',
    openInNewTab: true,
  },
  {
    label: 'YouTube',
    url: 'https://youtube.com/@tterrag456',
    icon: 'youtube',
    openInNewTab: true,
  },
] satisfies SocialLink[])
