"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation } from "@/lib/site";

const desktopMediaQuery = "(min-width: 48rem)";

export function PrimaryNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationRef = useRef<HTMLElement>(null);
  const desktopNavigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const mediaQuery = window.matchMedia(desktopMediaQuery);

    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      const activeElement = document.activeElement;

      setIsOpen(false);

      if (event.matches && activeElement === toggleRef.current) {
        desktopNavigationRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      } else if (!event.matches && desktopNavigationRef.current?.contains(activeElement)) {
        toggleRef.current?.focus();
      } else if (event.matches && mobileNavigationRef.current?.contains(activeElement)) {
        desktopNavigationRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      }
    };

    mediaQuery.addEventListener("change", handleBreakpointChange);
    return () => mediaQuery.removeEventListener("change", handleBreakpointChange);
  }, []);

  function closeMobileNavigation() {
    setIsOpen(false);
    toggleRef.current?.focus();
  }

  const navigationItems = primaryNavigation.map((item) => (
    <li key={item.href}>
      <Link
        aria-current={pathname === item.href ? "page" : undefined}
        className="navigation-link"
        href={item.href}
      >
        {item.label}
      </Link>
    </li>
  ));

  return (
    <>
      <button
        aria-controls="mobile-primary-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        className="navigation-toggle"
        onClick={() => setIsOpen((open) => !open)}
        ref={toggleRef}
        type="button"
      >
        <span
          aria-hidden="true"
          className="navigation-toggle__icon"
          data-open={isOpen ? "true" : "false"}
        >
          <span className="navigation-toggle__line" />
          <span className="navigation-toggle__line" />
          <span className="navigation-toggle__line" />
        </span>
      </button>

      <nav
        aria-label="모바일 주요 메뉴"
        className="mobile-navigation"
        hidden={!isOpen}
        id="mobile-primary-navigation"
        onKeyDown={(event) => {
          if (event.key === "Escape") closeMobileNavigation();
        }}
        ref={mobileNavigationRef}
      >
        <ul className="mobile-navigation__list">
          {primaryNavigation.map((item) => (
            <li key={item.href}>
              <Link
                aria-current={pathname === item.href ? "page" : undefined}
                className="mobile-navigation__link"
                href={item.href}
                onClick={closeMobileNavigation}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="주요 메뉴" className="desktop-navigation" ref={desktopNavigationRef}>
        <ul className="primary-navigation">
          {navigationItems}
        </ul>
      </nav>
    </>
  );
}
