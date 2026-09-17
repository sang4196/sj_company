import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductsPage from "./page";

describe("Products information architecture", () => {
  it("presents the confirmed representative product and contact paths", () => {
    const { container } = render(<ProductsPage />);

    expect(screen.getByRole("heading", { level: 1, name: "제품" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "퍼즐형 층간소음매트" })).toBeVisible();
    expect(
      screen.getByText(/퍼즐형 층간소음매트는 \(주\)승종의 대표 제품으로/),
    ).toBeVisible();

    const information = screen.getByRole("region", { name: "확인된 제품 정보" });
    expect(within(information).getByText("퍼즐 형태")).toBeVisible();
    expect(within(information).getByText("층간소음매트")).toBeVisible();
    expect(within(information).getByText("우레탄 성형·발포")).toBeVisible();

    expect(screen.getByRole("link", { name: "설계·제조 사업 보기" })).toHaveAttribute(
      "href",
      "/business",
    );
    expect(screen.getByRole("link", { name: "전화 문의" })).toHaveAttribute(
      "href",
      "tel:031-674-3640",
    );
    expect(
      screen.getByRole("link", { name: "이메일 문의 sjbjh3613@daum.net" }),
    ).toHaveAttribute("href", "mailto:sjbjh3613@daum.net");

    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.querySelector("form")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /구매|주문/ })).not.toBeInTheDocument();
    expect(
      screen.queryByText(/소음 감소|안전성|친환경|최초개발|대량 OEM|특허|가격|MOQ/),
    ).not.toBeInTheDocument();
  });
});
