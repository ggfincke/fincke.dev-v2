// src/content/home/socialLinks.ts
// social media links data

import type { SocialLink } from '~/shared/types'
import { EMAIL } from './about'

// social link entries w/ icons & URLs
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Email',
    url: `mailto:${EMAIL}`,
    icon: 'email',
    openInNewTab: false,
  },
  {
    label: 'Phone',
    // not rendered as an href — SocialLinks renders a click-to-reveal button for this entry. URL retained for inventory/contact-data parity.
    url: 'tel:+17247777186',
    icon: 'phone',
    openInNewTab: false,
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
]
