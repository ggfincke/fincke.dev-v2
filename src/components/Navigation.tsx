// src/components/Navigation.tsx
// main navigation w/ dropdown support & delayed hover

import { useState, useRef, useEffect } from 'react';
import { NAV_LINKS } from '../data/siteContent';

const normalizePath = (pathname: string): string => {
  if (pathname === '/') {
    return pathname;
  }

  return pathname.replace(/\/$/, '') || '/';
};

// navigation component
export function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(window.location?.pathname ?? '/')
  );

  // cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // handle delayed dropdown open
  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(label);
    }, 300);
  };

  // handle dropdown close
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(null);
  };

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background-alt)]/80 backdrop-blur"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* logo/home link */}
        <a
          href="#top"
          className="font-semibold tracking-wide text-[var(--color-text-light)]"
          aria-label="Go to top of page"
        >
          gf
        </a>
        {/* nav links w/ dropdown support */}
        <div className="flex items-center gap-6 text-sm">
          {NAV_LINKS.map(link => {
            if (link.dropdown) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center gap-1 transition hover:text-[var(--color-text-light)]">
                    {link.label}
                    <svg
                      className={`h-3 w-3 transition-transform duration-150 ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {activeDropdown === link.label && (
                    <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2">
                      <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background-alt)] py-2 shadow-lg">
                        {link.dropdown.map(item => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 transition hover:bg-[var(--color-background)]"
                            target={item.external ? '_blank' : undefined}
                            rel={
                              item.external ? 'noopener noreferrer' : undefined
                            }
                          >
                            <div className="font-medium text-[var(--color-text-light)]">
                              {item.label}
                            </div>
                            <div className="text-xs text-[var(--color-text-secondary)]">
                              {item.description}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            const isInternal = Boolean(
              link.href && !link.external && link.href.startsWith('/')
            );
            const isActive =
              isInternal && normalizePath(link.href!) === currentPath;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`transition hover:text-[var(--color-text-light)] ${isActive ? 'text-[var(--color-primary)]' : ''}`}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
