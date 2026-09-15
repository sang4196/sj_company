import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home information architecture", () => {
  it("presents confirmed company, business, product, and contact information", () => {
    const { container } = render(<Home />);

    expect(
      screen.getByText(
        "(주)승종은 금형 설계 및 우레탄 성형·발포를 수행하는 제조업체입니다.",
      ),
    ).toBeInTheDocument();

    const businessSection = screen.getByRole("region", { name: "사업 분야" });
    expect(within(businessSection).getByRole("heading", { name: "금형 설계" })).toBeVisible();
    expect(
      within(businessSection).getByRole("heading", { name: "우레탄 성형·발포" }),
    ).toBeVisible();

    expect(screen.getByRole("heading", { name: "퍼즐형 층간소음매트" })).toBeVisible();
    expect(screen.getByText("2017")).toBeVisible();
    expect(screen.getByText("경기도 안성시 서운면 사갑1길 296-49")).toBeVisible();
    expect(screen.getByRole("link", { name: "전화 문의" })).toHaveAttribute(
      "href",
      "tel:031-674-3640",
    );
    expect(screen.getByRole("link", { name: /이메일 문의/ })).toHaveAttribute(
      "href",
      "mailto:sjbjh3613@daum.net",
    );

    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(screen.queryByText(/최초개발|대량 OEM|특허/)).not.toBeInTheDocument();
  });
});
