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

describe("verified product specifications", () => {
  it("keeps verified thickness combinations and distinct part/set dimensions", () => {
    render(<ProductsPage />);
    const square = screen.getByRole("table", { name: "정사각 매트 표기치수 · 단위 mm" });
    const expectedSquareRows = [
      ["500 × 500", "22 / 25"], ["600 × 600", "21"], ["650 × 650", "24"],
      ["680 × 680", "21 / 22 / 26"], ["1,000 × 1,000", "22 / 24"],
      ["1,200 × 1,200", "24"], ["1,300 × 1,300", "24"],
    ];
    expect(within(square).getAllByRole("row")).toHaveLength(8);
    for (const [size, thickness] of expectedSquareRows) {
      const row = within(square).getByRole("row", { name: `${size} ${thickness}` });
      expect(within(row).getByRole("cell")).toHaveTextContent(thickness);
    }
    const parts = screen.getByRole("table", { name: "부품별 표기치수 · 단위 mm" });
    for (const name of [
      "사이드 · 1,000 계열 1,040 × 1,000 24", "코너 · 1,000 계열 1,040 × 1,040 24",
      "복도형 · 1,000 계열 640 × 1,000 24", "복도형 · 1,200 계열 640 × 1,200 24",
      "사이드 · 1,300 계열 1,300 × 650 24",
    ]) expect(within(parts).getByRole("row", { name })).toBeVisible();
    expect(within(parts).getAllByRole("row")).toHaveLength(6);
    const rug = screen.getByRole("table", { name: "러그형 단위 매트와 구성별 표기치수 · 단위 mm" });
    for (const name of [
      "단위 매트 · 1장 1,000 × 1,000 23", "4장 구성 2,000 × 2,000 23", "6장 구성 3,000 × 2,000 23",
      "8장 구성 4,000 × 2,000 23", "9장 구성 3,000 × 3,000 23", "12장 구성 4,000 × 3,000 23",
    ]) expect(within(rug).getByRole("row", { name })).toBeVisible();
    expect(within(rug).getAllByRole("row")).toHaveLength(7);
    const hex = screen.getByRole("table", { name: "육각 매트 표기치수 · 단위 mm" });
    expect(within(hex).getByRole("row", { name: "460 × 460 21" })).toBeVisible();
    expect(screen.getByText(/육각형의 측정 방향/)).toBeVisible();
    expect(screen.getByText(/결합 후 유효치수/)).toBeVisible();
    expect(screen.getAllByText(/제품 형태 예시 이미지/)).toHaveLength(4);
    expect(screen.queryByText(/띠아모|바오밥|이편한/)).not.toBeInTheDocument();
  });
});
