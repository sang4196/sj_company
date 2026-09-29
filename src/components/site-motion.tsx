"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const originalStates = elements.map((element) => ({
      element,
      ready: element.classList.contains("motion-ready"),
      visible: element.classList.contains("is-visible"),
      delay: element.style.transitionDelay,
    }));
    const reducedMotion = typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
    let observer: IntersectionObserver | undefined;
    let disposed = false;

    function reveal(element: HTMLElement, immediate = false) {
      if (immediate) {
        element.classList.remove("motion-ready");
        element.style.transitionDelay = "0ms";
      }
      element.classList.add("is-visible");
      observer?.unobserve(element);
    }

    function configureMotion() {
      observer?.disconnect();
      observer = undefined;
      if (!reducedMotion || reducedMotion.matches || typeof IntersectionObserver !== "function") {
        elements.forEach((element) => reveal(element, true));
        return;
      }

      observer = new IntersectionObserver((entries) => {
        if (disposed) return;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) reveal(entry.target);
        }
      });

      elements.forEach((element, index) => {
        const bounds = element.getBoundingClientRect();
        const inViewport = bounds.bottom > 0 && bounds.top < window.innerHeight;
        if (inViewport || element.classList.contains("is-visible") || element.contains(document.activeElement)) {
          // Initial content and keyboard destinations must never wait for an observer.
          reveal(element, true);
          return;
        }
        element.style.transitionDelay = `${(index % 4) * 80}ms`;
        element.classList.add("motion-ready");
        observer?.observe(element);
      });
    }

    function handleFocus(event: FocusEvent) {
      // Pointer focus must not move a link between pointer-down and pointer-up.
      if (!(event.target instanceof Element) || !event.target.matches(":focus-visible")) return;
      let element = event.target.closest<HTMLElement>(".reveal");
      while (element) {
        reveal(element, true);
        element = element.parentElement?.closest<HTMLElement>(".reveal") ?? null;
      }
    }

    const root = document.documentElement;
    const previousScrolled = root.getAttribute("data-scrolled");
    const previousHeroPassed = root.getAttribute("data-hero-passed");
    const hero = document.querySelector<HTMLElement>(".home-statement");
    function updateScrolled() {
      root.setAttribute("data-scrolled", window.scrollY > 40 ? "true" : "false");
      const heroPassed = hero ? hero.getBoundingClientRect().bottom <= 0 : window.scrollY > 160;
      root.setAttribute("data-hero-passed", heroPassed ? "true" : "false");
    }

    configureMotion();
    updateScrolled();
    reducedMotion?.addEventListener("change", configureMotion);
    document.addEventListener("focusin", handleFocus);
    window.addEventListener("scroll", updateScrolled, { passive: true });
    window.addEventListener("resize", updateScrolled, { passive: true });

    return () => {
      disposed = true;
      observer?.disconnect();
      reducedMotion?.removeEventListener("change", configureMotion);
      document.removeEventListener("focusin", handleFocus);
      window.removeEventListener("scroll", updateScrolled);
      window.removeEventListener("resize", updateScrolled);
      for (const { element, ready, visible, delay } of originalStates) {
        element.classList.toggle("motion-ready", ready);
        element.classList.toggle("is-visible", visible);
        element.style.transitionDelay = delay;
      }
      if (previousScrolled === null) root.removeAttribute("data-scrolled");
      else root.setAttribute("data-scrolled", previousScrolled);
      if (previousHeroPassed === null) root.removeAttribute("data-hero-passed");
      else root.setAttribute("data-hero-passed", previousHeroPassed);
    };
  }, [pathname]);

  return null;
}
