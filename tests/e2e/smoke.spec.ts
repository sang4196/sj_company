import { expect, type Page, test } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page) {
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);
}

test("application shell navigation reaches every active route", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const response = await page.goto("/");

  expect(response?.ok()).toBe(true);
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expect(page.getByRole("link", { name: "(주)승종 홈" })).toBeVisible();

  const navigation = page.getByRole("navigation", { name: "주요 메뉴" });
  await expect(navigation.getByRole("link", { name: "Careers" })).toHaveCount(0);
  await expect(navigation.getByRole("link", { name: "Projects" })).toHaveCount(0);

  const phoneLink = page.getByRole("banner").getByRole("link", { name: /전화 문의/ });
  await expect(phoneLink).toHaveAttribute("href", "tel:031-674-3640");

  const routes = [
    { label: "About", heading: "회사 소개", path: "/about" },
    { label: "Business", heading: "사업 분야", path: "/business" },
    { label: "Products", heading: "제품", path: "/products" },
    { label: "Contact", heading: "연락처", path: "/contact" },
    { label: "Home", heading: "(주)승종", path: "/" },
  ];

  for (const route of routes) {
    await navigation.getByRole("link", { name: route.label }).click();
    await expect(page).toHaveURL(route.path);
    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
    await expect(
      navigation.getByRole("link", { name: route.label }),
    ).toHaveAttribute("aria-current", "page");
    await expectNoHorizontalOverflow(page);
  }

  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test("Home presents the confirmed information flow", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/");

  const sections = page.locator("[data-home-section]");
  await expect(sections).toHaveCount(5);
  expect(await sections.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("data-home-section")),
  )).toEqual([
    "company-statement",
    "business-overview",
    "representative-product",
    "company-overview",
    "contact",
  ]);

  await expect(
    page.getByText("(주)승종은 금형 설계 및 우레탄 성형·발포를 수행하는 제조업체입니다."),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "금형 설계" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "우레탄 성형·발포" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "퍼즐형 층간소음매트" })).toBeVisible();

  const contactSection = page.locator('[data-home-section="contact"]');
  await expect(contactSection.getByRole("link", { name: "전화 문의" })).toHaveAttribute(
    "href",
    "tel:031-674-3640",
  );
  await expect(contactSection.getByRole("link", { name: /이메일 문의/ })).toHaveAttribute(
    "href",
    "mailto:sjbjh3613@daum.net",
  );

  await expect(page.locator("main img")).toHaveCount(0);
  await expect(page.getByText(/최초개발|대량 OEM|특허/)).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test("About presents confirmed company information and contact paths", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const response = await page.goto("/about");

  expect(response?.ok()).toBe(true);
  await expect(page.getByRole("heading", { level: 1, name: "회사 소개" })).toBeVisible();
  await expect(
    page.getByText("(주)승종은 금형 설계 및 우레탄 성형·발포를 수행하는 제조업체입니다."),
  ).toBeVisible();

  const sections = page.locator("[data-about-section]");
  expect(await sections.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("data-about-section")),
  )).toEqual([
    "introduction",
    "company-overview",
    "business-areas",
    "company-information",
    "contact",
  ]);

  await expect(page.getByText("2017").first()).toBeVisible();
  await expect(page.getByText("금형 설계", { exact: true })).toBeVisible();
  await expect(page.getByText("우레탄 성형·발포", { exact: true })).toBeVisible();
  await expect(page.getByText("경기도 안성시 서운면 사갑1길 296-49").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "사업 분야 자세히 보기" })).toHaveAttribute(
    "href",
    "/business",
  );

  const aboutMain = page.getByRole("main");
  await expect(aboutMain.getByRole("link", { name: /전화 문의/ }).first()).toHaveAttribute(
    "href",
    "tel:031-674-3640",
  );
  await expect(aboutMain.getByRole("link", { name: /이메일 문의/ }).first()).toHaveAttribute(
    "href",
    "mailto:sjbjh3613@daum.net",
  );

  await expect(aboutMain.locator("img")).toHaveCount(0);
  await expect(aboutMain.getByText(/비전|미션|최초개발|대량 OEM|특허/)).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test("Business presents confirmed design and manufacturing capabilities", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const response = await page.goto("/business");

  expect(response?.ok()).toBe(true);
  await expect(page.getByRole("heading", { level: 1, name: "사업 분야" })).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "주요 메뉴" }).getByRole("link", { name: "Business" }),
  ).toHaveAttribute("aria-current", "page");

  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { name: "제품 및 금형 설계·제작" })).toBeVisible();
  await expect(main.getByText(/고객이 제공한 도면/)).toBeVisible();
  await expect(main.getByText(/제품 아이디어를 설계로 구체화/)).toBeVisible();
  await expect(main.getByRole("heading", { name: "우레탄 성형·발포" })).toBeVisible();
  await expect(main.getByText(/원하는 형상에 맞춘 주문 생산과 OEM 생산/)).toBeVisible();

  const process = main.getByRole("region", { name: "설계와 제조의 연계" });
  await expect(process.getByText("제품 설계", { exact: true })).toBeVisible();
  await expect(process.getByText("금형 설계·제작", { exact: true })).toBeVisible();
  await expect(process.getByText("우레탄 성형·발포", { exact: true })).toBeVisible();

  await expect(main.getByRole("link", { name: "전화 문의" })).toHaveAttribute(
    "href",
    "tel:031-674-3640",
  );
  await expect(
    main.getByRole("link", { name: "이메일 문의 sjbjh3613@daum.net" }),
  ).toHaveAttribute("href", "mailto:sjbjh3613@daum.net");
  await expect(main.getByText(/최초개발|대량 OEM|특허|ODM/)).toHaveCount(0);
  await expectNoHorizontalOverflow(page);

  await main.getByRole("link", { name: "대표 제품 보기" }).click();
  await expect(page).toHaveURL("/products");
  await expect(page.getByRole("heading", { level: 1, name: "제품" })).toBeVisible();

  await expectNoHorizontalOverflow(page);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test("Products presents the confirmed representative product and contact paths", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const response = await page.goto("/products");

  expect(response?.ok()).toBe(true);
  await expect(page.getByRole("heading", { level: 1, name: "제품" })).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "주요 메뉴" }).getByRole("link", { name: "Products" }),
  ).toHaveAttribute("aria-current", "page");

  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { name: "퍼즐형 층간소음매트" })).toBeVisible();
  await expect(
    main.getByText(/퍼즐형 층간소음매트는 \(주\)승종의 대표 제품으로/),
  ).toBeVisible();

  const information = main.getByRole("region", { name: "확인된 제품 정보" });
  await expect(information.getByText("퍼즐 형태")).toBeVisible();
  await expect(information.getByText("층간소음매트")).toBeVisible();
  await expect(information.getByText("우레탄 성형·발포")).toBeVisible();

  await expect(main.getByRole("link", { name: "전화 문의" })).toHaveAttribute(
    "href",
    "tel:031-674-3640",
  );
  await expect(
    main.getByRole("link", { name: "이메일 문의 sjbjh3613@daum.net" }),
  ).toHaveAttribute("href", "mailto:sjbjh3613@daum.net");
  await expect(main.locator("img, form")).toHaveCount(0);
  await expect(main.getByText(/소음 감소|안전성|친환경|최초개발|대량 OEM|특허/)).toHaveCount(0);
  await expectNoHorizontalOverflow(page);

  await main.getByRole("link", { name: "설계·제조 사업 보기" }).click();
  await expect(page).toHaveURL("/business");
  await expect(page.getByRole("heading", { level: 1, name: "사업 분야" })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test("Contact prioritizes a real phone action and verified contact details", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const response = await page.goto("/contact");

  expect(response?.ok()).toBe(true);
  await expect(page.getByRole("heading", { level: 1, name: "연락처" })).toBeVisible();
  await expect(page.getByRole("main").getByText("(주)승종")).toBeVisible();

  const sections = page.locator("[data-contact-section]");
  expect(await sections.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("data-contact-section")),
  )).toEqual(["introduction", "phone", "email", "address"]);

  const main = page.getByRole("main");
  await expect(main.getByText("031-674-3640")).toBeVisible();
  await expect(main.getByRole("link", { name: "전화 문의 031-674-3640" })).toHaveAttribute(
    "href",
    "tel:031-674-3640",
  );
  await expect(
    main.getByRole("link", { name: "이메일 문의 sjbjh3613@daum.net" }),
  ).toHaveAttribute("href", "mailto:sjbjh3613@daum.net");
  await expect(main.getByText("경기도 안성시 서운면 사갑1길 296-49")).toBeVisible();

  await expect(main.locator("form")).toHaveCount(0);
  await expect(main.locator("iframe")).toHaveCount(0);
  await expect(main.getByText(/영업시간|담당자|영업팀|팩스/)).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});
