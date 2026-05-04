// src/sections/home/components/SocialLinks.tsx
// social media links w/ icons

import { useEffect, useRef, useState } from 'react'

import type { SocialLink } from '~/shared/types'
import { SOCIAL_LINKS } from '~/content/home'
import { IconLink } from '~/shared/components/ui/IconLink'
import {
  EmailIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MediumIcon,
  PhoneIcon,
  XIcon,
  YouTubeIcon,
} from '~/shared/components/ui/icons'
import { ANIMATION_DELAYS } from '~/shared/utils/animationConfig'
import { ICON_LINK_CLASSES } from '~/shared/utils/classNames'

const iconClass = 'h-6 w-6'

// map social link types to icon components
const SOCIAL_ICON_MAP = {
  email: () => <EmailIcon className={iconClass} />,
  github: () => <GitHubIcon size={24} className={iconClass} />,
  instagram: () => <InstagramIcon size={24} className={iconClass} />,
  linkedin: () => <LinkedInIcon size={24} className={iconClass} />,
  medium: () => <MediumIcon size={24} className={iconClass} />,
  phone: () => <PhoneIcon className={iconClass} />,
  twitter: () => <XIcon size={24} className={iconClass} />,
  youtube: () => <YouTubeIcon size={24} className={iconClass} />,
}

// click-to-reveal phone button — defer constructing the tel: URL until reveal
function PhoneRevealButton()
{
  const [revealed, setRevealed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() =>
  {
    if (!revealed)
    {
      return
    }

    function handlePointerDown(event: PointerEvent)
    {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      )
      {
        setRevealed(false)
      }
    }
    function handleKey(event: KeyboardEvent)
    {
      if (event.key === 'Escape')
      {
        setRevealed(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKey)
    return () =>
    {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKey)
    }
  }, [revealed])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setRevealed((current) => !current)}
        aria-label={revealed ? 'Hide phone number' : 'Show phone number'}
        aria-expanded={revealed}
        className={ICON_LINK_CLASSES}
      >
        <PhoneIcon className={iconClass} />
      </button>
      {revealed && <RevealedPhoneLink />}
    </div>
  )
}

// only mounts once the user clicks reveal — keeps the digits out of the static JSX
function RevealedPhoneLink()
{
  const digits = ['+1', '724', '777', '7186'].join('')
  const formatted = '+1 (724) 777-7186'
  return (
    <a
      href={`tel:${digits}`}
      className="absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-xs text-[var(--white)] shadow-md transition hover:text-[var(--accent)]"
    >
      {formatted}
    </a>
  )
}

// social media links w/ icons
export function SocialLinks()
{
  return (
    <nav
      aria-label="Social media links"
      className="animate-slide-in-left flex gap-4 opacity-0"
      style={{ animationDelay: ANIMATION_DELAYS.socialLinks }}
    >
      {SOCIAL_LINKS.map((link: SocialLink) =>
      {
        if (link.icon === 'phone')
        {
          return <PhoneRevealButton key={link.icon} />
        }

        const Icon = SOCIAL_ICON_MAP[link.icon]
        return (
          <IconLink
            key={link.icon}
            href={link.url}
            label={link.label}
            openInNewTab={link.openInNewTab}
            className="text-[var(--muted)] transition hover:text-[var(--accent)]"
          >
            <Icon />
          </IconLink>
        )
      })}
    </nav>
  )
}
