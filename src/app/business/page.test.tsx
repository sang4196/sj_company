import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BusinessPage from "./page";

describe("Business information architecture", () => {
  it("presents confirmed design, manufacturing, and contact capabilities", () => {
    render(<BusinessPage />);

    expect(screen.getByRole("heading", { level: 1, name: "사업 분야" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "제품 및 금형 설계·제작" })).toBeVisible();
    expect(screen.getByText(/고객이 제공한 도면/)).toBeVisible();
    expect(screen.getByText(/제품 아이디어를 설계로 구체화/)).toBeVisible();

    expect(screen.getByRole("heading", { name: "우레탄 성형·발포" })).toBeVisible();
    expect(screen.getByText(/원하는 형상에 맞춘 주문 생산과 OEM 생산/)).toBeVisible();

    const process = screen.getByRole("region", { name: "설계와 제조의 연계" });
    expect(within(process).getAllByRole("listitem")).toHaveLength(3);
    expect(within(process).getByText("제품 설계")).toBeVisible();
    expect(within(process).getByText("금형 설계·제작")).toBeVisible();

    expect(screen.getByRole("link", { name: "대표 제품 보기" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(screen.getByRole("link", { name: "전화 문의" })).toHaveAttribute(
      "href",
      "tel:031-674-3640",
    );
    expect(
      screen.getByRole("link", { name: "이메일 문의 sjbjh3613@daum.net" }),
    ).toHaveAttribute("href", "mailto:sjbjh3613@daum.net");

    expect(screen.queryByText(/최초개발|대량 OEM|특허|ODM/)).not.toBeInTheDocument();
  });
});
