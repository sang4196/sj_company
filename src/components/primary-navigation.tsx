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

    function restoreNavigationFocus(activeElement: Element | null, isDesktop: boolean) {
      if (isDesktop && activeElement === toggleRef.current) {
        desktopNavigationRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      } else if (!isDesktop && desktopNavigationRef.current?.contains(activeElement)) {
        toggleRef.current?.focus();
      } else if (isDesktop && mobileNavigationRef.current?.contains(activeElement)) {
        desktopNavigationRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      }
    }

    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      restoreNavigationFocus(document.activeElement, event.matches);
      setIsOpen(false);
    };

    const handleFocusOut = (event: FocusEvent) => {
      // CSS can hide the focused control before matchMedia emits change.
      // Use that blur's target, without retaining stale focus or stealing a new target.
      if (
        event.relatedTarget === null &&
        event.target instanceof HTMLElement &&
        event.target.getClientRects().length === 0 &&
        document.hasFocus()
      ) {
        restoreNavigationFocus(event.target, mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener("change", handleBreakpointChange);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      mediaQuery.removeEventListener("change", handleBreakpointChange);
      document.removeEventListener("focusout", handleFocusOut);
    };
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
