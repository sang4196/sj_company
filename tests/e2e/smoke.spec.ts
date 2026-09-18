import { expect, type Locator, type Page, test } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page) {
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);
}

async function getVisiblePrimaryNavigation(page: Page): Promise<Locator> {
  const toggle = page.getByRole("button", { name: /메뉴 (열기|닫기)/ });

  if (await toggle.isVisible()) {
    if ((await toggle.getAttribute("aria-expanded")) === "false") await toggle.click();
    return page.getByRole("navigation", { name: "모바일 주요 메뉴" });
  }

  return page.getByRole("navigation", { name: "주요 메뉴" });
}

test("skip link moves keyboard focus into main content on every active route", async ({
  page,
}) => {
  const routes = ["/", "/about", "/business", "/products", "/contact"];

  for (const route of routes) {
    await page.goto(route);

    const skipLink = page.getByRole("link", { name: "본문으로 건너뛰기" });
    const main = page.getByRole("main");
    const firstMainControl = main.locator("a[href], button:not([disabled])").first();

    await page.keyboard.press("Tab");
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
    await expect(main).toHaveAttribute("tabindex", "-1");

    await page.keyboard.press("Enter");
    await expect(main).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(firstMainControl).toBeFocused();
    await expect(page.getByRole("banner").locator(":focus")).toHaveCount(0);
  }

  await page.goto("/");
  const navigation = await getVisiblePrimaryNavigation(page);
  await navigation.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL("/about");

  const skipLink = page.getByRole("link", { name: "본문으로 건너뛰기" });
  for (let step = 0; step < 8; step += 1) {
    if (await skipLink.evaluate((element) => element === document.activeElement)) break;
    await page.keyboard.press("Shift+Tab");
  }

  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("main").locator("a[href], button:not([disabled])").first())
    .toBeFocused();
});

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
  await expect(page.getByRole("banner").getByRole("link", { name: "(주)승종 홈" })).toBeVisible();

  let navigation = await getVisiblePrimaryNavigation(page);
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
    navigation = await getVisiblePrimaryNavigation(page);
    await navigation.getByRole("link", { name: route.label }).click();
    await expect(page).toHaveURL(route.path);
    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
    const mobileToggle = page.getByRole("button", { name: "메뉴 열기" });
    if (await mobileToggle.isVisible()) {
      await expect(mobileToggle).toHaveAttribute("aria-expanded", "false");
      await expect(page.getByRole("navigation", { name: "모바일 주요 메뉴" })).toHaveCount(0);
    }
    await expect(
      (await getVisiblePrimaryNavigation(page)).getByRole("link", { name: route.label }),
    ).toHaveAttribute("aria-current", "page");
    await expectNoHorizontalOverflow(page);
  }

  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test("mobile navigation supports disclosure, keyboard dismissal, and responsive transitions", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/business");

  const header = page.getByRole("banner");
  const toggle = header.getByRole("button", { name: /메뉴 (열기|닫기)/ });
  await expect(header.getByRole("link", { name: "(주)승종 홈" })).toBeVisible();
  await expect(header.getByRole("link", { name: "전화 문의 031-674-3640" })).toHaveAttribute(
    "href",
    "tel:031-674-3640",
  );
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toHaveAttribute("aria-controls", "mobile-primary-navigation");
  await expect(page.getByRole("navigation", { name: "모바일 주요 메뉴" })).toHaveCount(0);

  const mobileControlStyles = await header.evaluate((element) => {
    const phone = element.querySelector<HTMLElement>(".phone-link");
    const button = element.querySelector<HTMLElement>(".navigation-toggle");
    const icon = element.querySelector<HTMLElement>(".navigation-toggle__icon");
    if (!phone || !button || !icon) throw new Error("Header controls are missing");

    const phoneStyle = getComputedStyle(phone);
    const buttonStyle = getComputedStyle(button);
    const phoneRect = phone.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();

    return {
      buttonBackground: buttonStyle.backgroundColor,
      buttonBorder: buttonStyle.borderTopWidth,
      buttonHeight: buttonRect.height,
      buttonShadow: buttonStyle.boxShadow,
      buttonWidth: buttonRect.width,
      iconHeight: iconRect.height,
      iconWidth: iconRect.width,
      phoneBackground: phoneStyle.backgroundColor,
      phoneBorder: phoneStyle.borderTopWidth,
      phoneFontSize: phoneStyle.fontSize,
      phoneFontWeight: phoneStyle.fontWeight,
      phoneHeight: phoneRect.height,
      phoneShadow: phoneStyle.boxShadow,
      phoneWidth: phoneRect.width,
    };
  });

  expect(mobileControlStyles).toMatchObject({
    buttonBackground: "rgba(0, 0, 0, 0)",
    buttonBorder: "0px",
    buttonShadow: "none",
    iconHeight: 18,
    iconWidth: 18,
    phoneBackground: "rgba(0, 0, 0, 0)",
    phoneBorder: "0px",
    phoneFontSize: "14px",
    phoneFontWeight: "500",
    phoneShadow: "none",
  });
  expect(mobileControlStyles.buttonHeight).toBeGreaterThanOrEqual(44);
  expect(mobileControlStyles.buttonWidth).toBeGreaterThanOrEqual(44);
  expect(mobileControlStyles.phoneHeight).toBeGreaterThanOrEqual(44);
  expect(mobileControlStyles.phoneWidth).toBeGreaterThanOrEqual(44);

  await toggle.focus();
  expect(await toggle.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe("solid");

  await toggle.click();
  const mobileNavigation = page.getByRole("navigation", { name: "모바일 주요 메뉴" });
  await expect(mobileNavigation.getByRole("link")).toHaveCount(5);
  await expect(mobileNavigation.getByRole("link", { name: "Business" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(toggle.locator(".navigation-toggle__icon")).toHaveAttribute("data-open", "true");

  await toggle.focus();
  await page.keyboard.press("Tab");
  await expect(mobileNavigation.getByRole("link", { name: "Home" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "메뉴 열기" })).toBeFocused();
  await expect(mobileNavigation).toHaveCount(0);

  await page.getByRole("button", { name: "메뉴 열기" }).click();
  await page.getByRole("navigation", { name: "모바일 주요 메뉴" })
    .getByRole("link", { name: "Business" })
    .click();
  await expect(page).toHaveURL("/business");
  await expect(page.getByRole("navigation", { name: "모바일 주요 메뉴" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "메뉴 열기" })).toBeFocused();

  await page.getByRole("button", { name: "메뉴 열기" }).click();
  await page.getByRole("navigation", { name: "모바일 주요 메뉴" })
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL("/about");
  await expect(page.getByRole("navigation", { name: "모바일 주요 메뉴" })).toHaveCount(0);

  await page.setViewportSize({ width: 800, height: 844 });
  await expect(page.getByRole("button", { name: /메뉴/ })).toBeHidden();
  const desktopNavigation = page.getByRole("navigation", { name: "주요 메뉴" });
  await expect(desktopNavigation.getByRole("link")).toHaveCount(5);
  await expect(desktopNavigation).toBeVisible();
  await expect(header.getByRole("link", { name: "전화 문의 031-674-3640" })).toHaveCSS(
    "font-weight",
    "700",
  );

  await desktopNavigation.getByRole("link", { name: "About" }).focus();
  await page.setViewportSize({ width: 767, height: 844 });
  await expect(page.getByRole("button", { name: "메뉴 열기" })).toBeFocused();
  await expect(page.getByRole("navigation", { name: "모바일 주요 메뉴" })).toHaveCount(0);

  await page.getByRole("button", { name: "메뉴 열기" }).focus();
  await page.setViewportSize({ width: 768, height: 844 });
  await expect(desktopNavigation).toBeVisible();
  await expect(page.getByRole("button", { name: /메뉴/ })).toBeHidden();
  expect(
    await page.evaluate(() => {
      const activeElement = document.activeElement;
      return activeElement?.matches(".navigation-toggle, .mobile-navigation a") ?? false;
    }),
  ).toBe(false);

  await page.setViewportSize({ width: 320, height: 800 });
  await expect(page.getByRole("button", { name: "메뉴 열기" })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  const skipLink = page.getByRole("link", { name: "본문으로 건너뛰기" });
  await expect(skipLink).toHaveAttribute("href", "#main-content");

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
  const homePhoneLink = contactSection.getByRole("link", { name: "전화 문의 031-674-3640", exact: true });
  await expect(homePhoneLink).toHaveText("031-674-3640");
  await expect(homePhoneLink).toHaveAccessibleName("전화 문의 031-674-3640");
  await expect(homePhoneLink).toHaveAttribute(
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
    "registrations",
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
  await expect(aboutMain.getByText(/비전|미션|최초개발|대량 OEM|현재 보유|독점|안전성|소음 감소/)).toHaveCount(0);
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
    (await getVisiblePrimaryNavigation(page)).getByRole("link", { name: "Business" }),
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
    (await getVisiblePrimaryNavigation(page)).getByRole("link", { name: "Products" }),
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
