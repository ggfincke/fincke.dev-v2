// src/sections/home/components/DecorativeWave.tsx
// decorative SVG wave w/ gradient

// decorative wave component
export function DecorativeWave() {
  return (
    <div
      className="pointer-events-none absolute left-0 hidden w-full lg:block"
      style={{ top: 'calc(85vh - 20px)' }}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="144"
        viewBox="0 0 1440 144"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M462 101.335C228.6 101.335 143.4 28.1958 0 28.1958V58.6706C96 58.6706 253.8 131.81 462 131.81C670.2 131.81 869.4 101.335 960 101.335C1084.8 101.335 1330.2 144 1440 144V113.525C1330.2 113.525 1084.8 70.8605 960 70.8605C867 70.8605 624.6 101.335 462 101.335Z"
          fill="url(#paint0_linear_theme)"
        />
        <path
          d="M462 72.5035C228.6 72.5035 143.4 0 0 0V30.2098C96 30.2098 253.8 102.713 462 102.713C670.2 102.713 869.4 72.5035 960 72.5035C1084.8 72.5035 1330.2 114.797 1440 114.797V84.5874C1330.2 84.5874 1084.8 42.2937 960 42.2937C867 42.2937 624.6 72.5035 462 72.5035Z"
          fill="url(#paint1_linear_theme)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_theme"
            x1="721.524"
            y1="0.0119269"
            x2="716.661"
            y2="310.697"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.1" stopColor="var(--accent)" />
            <stop offset="0.9" stopColor="var(--bg)" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_theme"
            x1="721.524"
            y1="0.00950815"
            x2="718.433"
            y2="247.71"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="1" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
