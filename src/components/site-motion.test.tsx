import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SiteMotion } from "./site-motion";

const mockUsePathname = vi.fn();
vi.mock("next/navigation", () => ({ usePathname: () => mockUsePathname() }));

class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0];
  readonly scrollMargin = "0px";
  readonly delay = 0;
  readonly trackVisibility = false;
  readonly targets = new Set<Element>();
  readonly observe = vi.fn((element: Element) => { this.targets.add(element); });
  readonly unobserve = vi.fn((element: Element) => { this.targets.delete(element); });
  readonly disconnect = vi.fn(() => { this.targets.clear(); });
  readonly takeRecords = () => [];

  constructor(private readonly callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }

  intersect(element: Element, isIntersecting: boolean) {
    const rect = element.getBoundingClientRect();
    this.callback([{
      target: element,
      isIntersecting,
      intersectionRatio: isIntersecting ? 1 : 0,
      boundingClientRect: rect,
      intersectionRect: rect,
      rootBounds: null,
      time: 0,
    }], this);
  }
}

function addReveal(top = 1200) {
  const element = document.createElement("section");
  element.className = "reveal";
  element.textContent = "설계 및 제조 안내";
  element.getBoundingClientRect = () => new DOMRect(0, top, 300, 200);
  document.body.append(element);
  return element;
}

describe("progressive site motion", () => {
  let mediaEvents: EventTarget;
  let media: { matches: boolean; addEventListener: EventTarget["addEventListener"]; removeEventListener: EventTarget["removeEventListener"] };

  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
    MockIntersectionObserver.instances = [];
    mediaEvents = new EventTarget();
    media = {
      matches: false,
      addEventListener: vi.fn(mediaEvents.addEventListener.bind(mediaEvents)),
      removeEventListener: vi.fn(mediaEvents.removeEventListener.bind(mediaEvents)),
    };
    vi.stubGlobal("matchMedia", vi.fn(() => media));
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    vi.stubGlobal("scrollY", 0);
  });

  afterEach(() => {
    cleanup();
    document.body.replaceChildren();
    document.documentElement.removeAttribute("data-scrolled");
    document.documentElement.removeAttribute("data-hero-passed");
    vi.unstubAllGlobals();
  });

  it("keeps initial viewport content visible and reveals approaching content only once", () => {
    const firstScreen = addReveal(20);
    const laterSections = Array.from({ length: 5 }, () => addReveal());
    expect(firstScreen).not.toHaveClass("motion-ready");
    render(<SiteMotion />);

    const observer = MockIntersectionObserver.instances[0];
    expect(firstScreen).toHaveClass("is-visible");
    expect(firstScreen).not.toHaveClass("motion-ready");
    expect(observer.targets.has(firstScreen)).toBe(false);
    for (const element of laterSections) {
      expect(element).toHaveClass("motion-ready");
      expect(element).not.toHaveClass("is-visible");
      expect(Number.parseInt(element.style.transitionDelay)).toBeLessThanOrEqual(240);
      expect(Number.parseInt(element.style.transitionDelay) % 80).toBe(0);
    }

    act(() => observer.intersect(laterSections[0], false));
    expect(laterSections[0]).not.toHaveClass("is-visible");
    act(() => observer.intersect(laterSections[0], true));
    expect(laterSections[0]).toHaveClass("is-visible");
    expect(observer.targets.has(laterSections[0])).toBe(false);
  });

  it("immediately reveals a keyboard target and any containing reveal region", () => {
    const outer = addReveal();
    const inner = addReveal();
    const link = document.createElement("a");
    link.href = "/business";
    link.textContent = "사업 안내";
    inner.append(link);
    outer.append(inner);
    render(<SiteMotion />);

    act(() => link.focus());
    expect(link).toHaveFocus();
    for (const element of [outer, inner]) {
      expect(element).toHaveClass("is-visible");
      expect(element).not.toHaveClass("motion-ready");
      expect(element.style.transitionDelay).toBe("0ms");
      expect(MockIntersectionObserver.instances[0].targets.has(element)).toBe(false);
    }
  });

  it("does not conceal content or start observers when reduced motion is requested", () => {
    media.matches = true;
    const element = addReveal();
    render(<SiteMotion />);
    expect(element).toHaveClass("is-visible");
    expect(element).not.toHaveClass("motion-ready");
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  it("reveals pending content and disconnects when the motion preference changes", () => {
    const element = addReveal();
    const { unmount } = render(<SiteMotion />);
    const observer = MockIntersectionObserver.instances[0];
    expect(element).toHaveClass("motion-ready");

    act(() => {
      media.matches = true;
      mediaEvents.dispatchEvent(new Event("change"));
    });
    expect(observer.disconnect).toHaveBeenCalledOnce();
    expect(element).toHaveClass("is-visible");
    expect(element).not.toHaveClass("motion-ready");

    act(() => {
      media.matches = false;
      mediaEvents.dispatchEvent(new Event("change"));
    });
    expect(element).toHaveClass("is-visible");
    expect(element).not.toHaveClass("motion-ready");
    unmount();
    expect(media.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("falls back to visible content when IntersectionObserver is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const element = addReveal();
    render(<SiteMotion />);
    expect(element).toHaveClass("is-visible");
    expect(element).not.toHaveClass("motion-ready");
  });

  it("shows the contact prompt only after the Home hero passes or internal-page scrolling begins", () => {
    const hero = document.createElement("section");
    hero.className = "home-statement";
    hero.getBoundingClientRect = () => new DOMRect(0, -window.scrollY, 390, 500);
    document.body.append(hero);
    const { rerender } = render(<SiteMotion />);
    expect(document.documentElement).toHaveAttribute("data-hero-passed", "false");
    act(() => {
      vi.stubGlobal("scrollY", 200);
      window.dispatchEvent(new Event("scroll"));
    });
    expect(document.documentElement).toHaveAttribute("data-scrolled", "true");
    expect(document.documentElement).toHaveAttribute("data-hero-passed", "false");
    act(() => {
      vi.stubGlobal("scrollY", 500);
      window.dispatchEvent(new Event("scroll"));
    });
    expect(document.documentElement).toHaveAttribute("data-hero-passed", "true");

    hero.remove();
    vi.stubGlobal("scrollY", 0);
    mockUsePathname.mockReturnValue("/contact");
    rerender(<SiteMotion />);
    expect(document.documentElement).toHaveAttribute("data-hero-passed", "false");
    act(() => {
      vi.stubGlobal("scrollY", 160);
      window.dispatchEvent(new Event("scroll"));
    });
    expect(document.documentElement).toHaveAttribute("data-hero-passed", "false");
    act(() => {
      vi.stubGlobal("scrollY", 161);
      window.dispatchEvent(new Event("scroll"));
    });
    expect(document.documentElement).toHaveAttribute("data-hero-passed", "true");
  });

  it("cleans up the previous route and leaves no hidden content or live scroll listener on unmount", () => {
    const oldSection = addReveal();
    oldSection.style.transitionDelay = "15ms";
    const { rerender, unmount } = render(<SiteMotion />);
    const oldObserver = MockIntersectionObserver.instances[0];
    expect(document.documentElement).toHaveAttribute("data-scrolled", "false");
    act(() => {
      vi.stubGlobal("scrollY", 41);
      window.dispatchEvent(new Event("scroll"));
    });
    expect(document.documentElement).toHaveAttribute("data-scrolled", "true");

    oldSection.remove();
    const newSection = addReveal();
    mockUsePathname.mockReturnValue("/business");
    rerender(<SiteMotion />);
    expect(oldObserver.disconnect).toHaveBeenCalledOnce();
    expect(oldSection).not.toHaveClass("motion-ready");
    expect(oldSection.style.transitionDelay).toBe("15ms");
    expect(newSection).toHaveClass("motion-ready");
    act(() => oldObserver.intersect(oldSection, true));
    expect(oldSection).not.toHaveClass("is-visible");

    const newObserver = MockIntersectionObserver.instances[1];
    unmount();
    expect(newObserver.disconnect).toHaveBeenCalledOnce();
    expect(newSection).not.toHaveClass("motion-ready");
    expect(newSection.style.transitionDelay).toBe("");
    expect(document.documentElement).not.toHaveAttribute("data-scrolled");
    expect(document.documentElement).not.toHaveAttribute("data-hero-passed");
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(document.documentElement).not.toHaveAttribute("data-scrolled");
    expect(document.documentElement).not.toHaveAttribute("data-hero-passed");
  });
});
