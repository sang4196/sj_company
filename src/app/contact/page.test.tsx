import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactPage from "./page";

describe("Contact information architecture", () => {
  it("provides verified phone, email, and address information", () => {
    const { container } = render(<ContactPage />);

    expect(screen.getByRole("heading", { level: 1, name: "연락처" })).toBeVisible();
    expect(screen.getByText("(주)승종")).toBeVisible();
    expect(screen.getByText("031-674-3640")).toBeVisible();
    expect(screen.getByRole("link", { name: "전화 문의 031-674-3640" })).toHaveAttribute(
      "href",
      "tel:031-674-3640",
    );
    expect(
      screen.getByRole("link", { name: "이메일 문의 sjbjh3613@daum.net" }),
    ).toHaveAttribute("href", "mailto:sjbjh3613@daum.net");
    expect(screen.getByText("경기도 안성시 서운면 사갑1길 296-49")).toBeVisible();

    expect(container.querySelector("form")).not.toBeInTheDocument();
    expect(container.querySelector("iframe")).not.toBeInTheDocument();
    expect(screen.queryByText(/영업시간|담당자|영업팀|팩스/)).not.toBeInTheDocument();
  });
});
