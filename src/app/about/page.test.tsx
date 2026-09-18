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

    const registrations = screen.getByRole("region", { name: "특허·디자인 등록" });
    expect(within(registrations).getByText(/제공된 등록증에 주식회사 승종이 권리자로 기재/))
      .toHaveTextContent("현재 권리의 유효 여부를 나타내지는 않습니다.");

    const patents = within(registrations).getByRole("list", { name: "특허" });
    const designs = within(registrations).getByRole("list", { name: "디자인" });
    expect(within(patents).getAllByRole("listitem")).toHaveLength(2);
    expect(within(designs).getAllByRole("listitem")).toHaveLength(6);

    // Expected certificate facts are independent of the page's rendering data.
    const expectedPatents: [string, string, string, string?][] = [
      ["제10-1992471호", "워셔블 베개", "2019-06-18"],
      ["제10-2436238호", "기능성 바닥마감재를 구비한 퍼즐형 쿠션매트", "2022-08-22"],
    ];
    const expectedDesigns: [string, string, string, string?][] = [
      ["제30-1142566호", "조립식 매트용 블록", "2021-12-14", undefined],
      ["제30-1142571호", "조립식 매트용 블록", "2021-12-14", "제30-1142566호"],
      ["제30-1168426호", "조립식 매트용 블록", "2022-06-10", undefined],
      ["제30-1168430호", "조립식 매트용 블록", "2022-06-10", "제30-1168426호"],
      ["제30-1168431호", "조립식 매트용 블록", "2022-06-10", "제30-1168426호"],
      ["제30-1294831호", "바닥매트용 연결부재", "2025-02-11", undefined],
    ];
    for (const [list, records] of [[patents, expectedPatents], [designs, expectedDesigns]] as const) {
      const items = within(list).getAllByRole("listitem");
      records.forEach(([number, title, date, basicDesign], index) => {
        const item = within(items[index]);
        expect(item.getByText(number, { exact: true })).toBeVisible();
        expect(item.getByText(title, { exact: true })).toBeVisible();
        expect(item.getByText(date, { exact: true })).toHaveAttribute("datetime", date);
        if (basicDesign) {
          expect(item.getByText(`관련디자인 · 기본디자인 ${basicDesign}`)).toBeVisible();
        } else {
          expect(item.queryByText(/관련디자인/)).not.toBeInTheDocument();
        }
      });
    }
    for (const excludedNumber of ["10-2919672", "30-1294832", "30-1294833", "30-1294844", "30-1294845"]) {
      expect(registrations).not.toHaveTextContent(excludedNumber);
    }
    expect(container.querySelector('a[href$=".pdf"], iframe, embed, object')).not.toBeInTheDocument();

    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(screen.queryByText(/비전|미션|최초개발|대량 OEM|현재 보유|독점|안전성|소음 감소/)).not.toBeInTheDocument();
  });
});
