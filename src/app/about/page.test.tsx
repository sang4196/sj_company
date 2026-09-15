import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "./page";

describe("About information architecture", () => {
  it("presents confirmed company information and contact paths", () => {
    const { container } = render(<AboutPage />);

    expect(screen.getByRole("heading", { level: 1, name: "회사 소개" })).toBeVisible();
    expect(
      screen.getByText(
        "(주)승종은 금형 설계 및 우레탄 성형·발포를 수행하는 제조업체입니다.",
      ),
    ).toBeVisible();

    const overview = screen.getByRole("region", { name: "회사 개요" });
    expect(within(overview).getByText("(주)승종")).toBeVisible();
    expect(within(overview).getByText("2017")).toBeVisible();
    expect(within(overview).getByText("제조업")).toBeVisible();

    const business = screen.getByRole("region", { name: "사업 영역" });
    expect(within(business).getByText("금형 설계")).toBeVisible();
    expect(within(business).getByText("우레탄 성형·발포")).toBeVisible();
    expect(within(business).getByRole("link", { name: "사업 분야 자세히 보기" })).toHaveAttribute(
      "href",
      "/business",
    );

    expect(screen.getByText("경기도 안성시 서운면 사갑1길 296-49")).toBeVisible();
    for (const phoneLink of screen.getAllByRole("link", { name: /전화 문의/ })) {
      expect(phoneLink).toHaveAttribute("href", "tel:031-674-3640");
    }
    for (const emailLink of screen.getAllByRole("link", { name: /이메일 문의/ })) {
      expect(emailLink).toHaveAttribute("href", "mailto:sjbjh3613@daum.net");
    }

    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(screen.queryByText(/비전|미션|최초개발|대량 OEM|특허/)).not.toBeInTheDocument();
  });
});
