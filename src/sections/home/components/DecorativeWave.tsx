// src/sections/home/components/DecorativeWave.tsx
// displays the three solid fincke ribbons across the home page

import type { Ref } from 'react'

// 172px at the default root size
const WAVE_HEIGHT = '10.75rem'

interface DecorativeWaveProps
{
  ref?: Ref<HTMLDivElement>
}

// anchored to the page bottom; height in rem so it scales w/ the home fit
export function DecorativeWave({ ref }: DecorativeWaveProps)
{
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute bottom-0 left-0 hidden w-full lg:block"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        style={{ height: WAVE_HEIGHT }}
        viewBox="0 -28.5 1440 172.5"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M462 101.335C228.6 101.335 143.4 28.1958 0 28.1958V58.6706C96 58.6706 253.8 131.81 462 131.81C670.2 131.81 869.4 101.335 960 101.335C1084.8 101.335 1330.2 144 1440 144V113.525C1330.2 113.525 1084.8 70.8605 960 70.8605C867 70.8605 624.6 101.335 462 101.335Z"
          fill="var(--accent-dark)"
        />
        <path
          d="M462 72.5035C228.6 72.5035 143.4 0 0 0V30.2098C96 30.2098 253.8 102.713 462 102.713C670.2 102.713 869.4 72.5035 960 72.5035C1084.8 72.5035 1330.2 114.797 1440 114.797V84.5874C1330.2 84.5874 1084.8 42.2937 960 42.2937C867 42.2937 624.6 72.5035 462 72.5035Z"
          fill="var(--accent)"
        />
        <path
          d="M462 72.5035C228.6 72.5035 143.4 0 0 0V30.2098C96 30.2098 253.8 102.713 462 102.713C670.2 102.713 869.4 72.5035 960 72.5035C1084.8 72.5035 1330.2 114.797 1440 114.797V84.5874C1330.2 84.5874 1084.8 42.2937 960 42.2937C867 42.2937 624.6 72.5035 462 72.5035Z"
          transform="translate(0 -28.5)"
          fill="var(--accent-light)"
        />
      </svg>
    </div>
  )
}
