// src/sections/home/components/SocialLinks.tsx
// social media links w/ icons

import { useEffect, useRef, useState } from 'react'
import type { SimpleIcon } from 'simple-icons'
import { siInstagram, siMedium, siX, siYoutube } from 'simple-icons'

import type { SocialLink } from '~/shared/types'
import { SOCIAL_LINKS } from '~/content/home'
import { IconLink } from '~/shared/components/ui/IconLink'
import { GitHubIcon as SharedGitHubIcon } from '~/shared/components/ui/icons'
import { ANIMATION_DELAYS } from '~/shared/utils/animationConfig'
import { ICON_LINK_CLASSES } from '~/shared/utils/classNames'

// email SVG icon
function EmailIcon()
{
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

// phone SVG icon
function PhoneIcon()
{
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

// create icon component from simple-icons data
function createSimpleIcon(icon: SimpleIcon)
{
  return function SimpleIconComponent()
  {
    return (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path d={icon.path} />
      </svg>
    )
  }
}

// GitHub icon wrapper
function GitHubIcon()
{
  return <SharedGitHubIcon size={24} className="h-6 w-6" />
}
// icon components from simple-icons
const MediumIcon = createSimpleIcon(siMedium)
const InstagramIcon = createSimpleIcon(siInstagram)
const TwitterIcon = createSimpleIcon(siX)
const YouTubeIcon = createSimpleIcon(siYoutube)

// LinkedIn SVG icon
function LinkedInIcon()
{
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// map social link types to icon components
const iconMap = {
  email: EmailIcon,
  github: GitHubIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  medium: MediumIcon,
  phone: PhoneIcon,
  twitter: TwitterIcon,
  youtube: YouTubeIcon,
}

// click-to-reveal phone button — keeps tel: URL out of static HTML
function PhoneRevealButton()
{
  const [revealed, setRevealed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // assemble at runtime so the digits don't appear as a contiguous string in JSX
  const digits = ['+1', '724', '777', '7186'].join('')
  const formatted = '+1 (724) 777-7186'

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
        <PhoneIcon />
      </button>
      {revealed && (
        <a
          href={`tel:${digits}`}
          className="absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-xs text-[var(--white)] shadow-md transition hover:text-[var(--accent)]"
        >
          {formatted}
        </a>
      )}
    </div>
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

        const Icon = iconMap[link.icon]
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
