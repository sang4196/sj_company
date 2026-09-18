import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const mockUsePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("application shell", () => {
  beforeEach(() => mockUsePathname.mockReturnValue("/business"));

  it("provides company identity, primary routes, and the phone action", () => {
    render(
      <>
        <SiteHeader />
        <SiteFooter />
      </>,
    );

    expect(screen.getAllByText("(주)승종").length).toBeGreaterThan(0);

    const navigation = screen.getByRole("navigation", { name: "주요 메뉴" });
    for (const label of ["Home", "About", "Business", "Products", "Contact"]) {
      expect(navigation).toContainElement(screen.getByRole("link", { name: label }));
    }

    expect(screen.queryByRole("link", { name: "Careers" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Projects" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Business" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    for (const phoneLink of screen.getAllByRole("link", { name: /031-674-3640|전화 문의/ })) {
      expect(phoneLink).toHaveAttribute("href", "tel:031-674-3640");
    }

    expect(screen.getByRole("link", { name: "sjbjh3613@daum.net" })).toHaveAttribute(
      "href",
      "mailto:sjbjh3613@daum.net",
    );
    expect(screen.getByText("경기도 안성시 서운면 사갑1길 296-49")).toBeInTheDocument();
  });

  it("opens and closes the mobile navigation with accessible state and focus", () => {
    render(<SiteHeader />);

    const toggle = screen.getByRole("button", { name: "메뉴 열기" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-primary-navigation");
    expect(
      screen.queryByRole("navigation", { name: "모바일 주요 메뉴" }),
    ).not.toBeInTheDocument();

    fireEvent.click(toggle);

    const mobileNavigation = screen.getByRole("navigation", { name: "모바일 주요 메뉴" });
    expect(screen.getByRole("button", { name: "메뉴 닫기" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(mobileNavigation.getElementsByTagName("a")).toHaveLength(5);
    expect(
      within(mobileNavigation).getByRole("link", { name: "Business", current: "page" }),
    ).toBeInTheDocument();

    fireEvent.keyDown(mobileNavigation, { key: "Escape" });

    expect(
      screen.queryByRole("navigation", { name: "모바일 주요 메뉴" }),
    ).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });

  it("closes the mobile navigation when the current page link is selected", () => {
    render(<SiteHeader />);

    const toggle = screen.getByRole("button", { name: "메뉴 열기" });
    fireEvent.click(toggle);
    fireEvent.click(
      within(screen.getByRole("navigation", { name: "모바일 주요 메뉴" })).getByRole(
        "link",
        { name: "Business" },
      ),
    );

    expect(
      screen.queryByRole("navigation", { name: "모바일 주요 메뉴" }),
    ).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });
});
