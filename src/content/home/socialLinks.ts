// src/content/home/socialLinks.ts
// social media links data

import type { SocialLink } from '~/shared/types';
import { EMAIL } from './about';

// social link entries w/ icons & URLs
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Email',
    url: `mailto:${EMAIL}`,
    icon: 'email',
  },
  {
    label: 'Phone',
    url: 'tel:+17247777186',
    icon: 'phone',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/ggfincke',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/garrett-fincke/',
    icon: 'linkedin',
  },
  {
    label: 'Medium',
    url: 'https://medium.com/@ggfincke',
    icon: 'medium',
  },
  {
    label: 'Instagram',
    url: 'https://instagram.com/ggfincke',
    icon: 'instagram',
  },
  {
    label: 'Twitter',
    url: 'https://twitter.com/finckedev',
    icon: 'twitter',
  },
  {
    label: 'YouTube',
    url: 'https://youtube.com/@tterrag456',
    icon: 'youtube',
  },
];
