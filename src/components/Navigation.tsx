// src/components/Navigation.tsx
// main navigation w/ dropdown support & delayed hover

import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '~/data/siteContent';
import { normalizePath } from '~/utils/pathUtils';

const DROPDOWN_HOVER_DELAY = 300; // milliseconds

// navigation component
export function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const currentPath = normalizePath(location.pathname);

  // cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // handle delayed dropdown open
  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(label);
    }, DROPDOWN_HOVER_DELAY);
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
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* logo/home link */}
        <a
          href="#top"
          className="font-semibold tracking-wide text-[var(--fg)]"
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
                  <button className="flex items-center gap-1 transition hover:text-[var(--fg)]">
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
                      <div className="rounded-md border border-[var(--border)] bg-[var(--card)] py-2 shadow-lg">
                        {link.dropdown.map(item => {
                          const isItemInternal = Boolean(
                            !item.external && item.href.startsWith('/')
                          );

                          if (isItemInternal) {
                            return (
                              <Link
                                key={item.href}
                                to={item.href}
                                className="block px-4 py-2 transition hover:bg-[var(--bg)]"
                              >
                                <div className="font-medium text-[var(--fg)]">
                                  {item.label}
                                </div>
                                <div className="text-xs text-[var(--color-muted)]">
                                  {item.description}
                                </div>
                              </Link>
                            );
                          }

                          return (
                            <a
                              key={item.href}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 transition hover:bg-[var(--bg)]"
                            >
                              <div className="font-medium text-[var(--fg)]">
                                {item.label}
                              </div>
                              <div className="text-xs text-[var(--color-muted)]">
                                {item.description}
                              </div>
                            </a>
                          );
                        })}
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

            if (isInternal) {
              return (
                <Link
                  key={link.href}
                  to={link.href!}
                  className={`transition hover:text-[var(--fg)] ${isActive ? 'text-[var(--accent)]' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                className={`transition hover:text-[var(--fg)] ${isActive ? 'text-[var(--accent)]' : ''}`}
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
