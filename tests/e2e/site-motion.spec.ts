import { expect, test } from "@playwright/test";

test("Home reveals scrolled content and keeps quick contact usable with keyboard focus", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const root = page.locator("html");
  const hero = page.locator('[data-home-section="company-statement"]');
  await expect(root).toHaveAttribute("data-scrolled", "false");
  await expect(root).toHaveAttribute("data-hero-passed", "false");
  await expect(page.getByRole("banner")).toBeInViewport();
  await expect(page.getByRole("banner")).toHaveCSS("background-color", "rgb(247, 249, 252)");
  await expect(hero.getByRole("heading", { level: 1, name: "(주)승종" })).toBeInViewport();
  await expect(hero.getByRole("link", { name: "사업 알아보기" })).toBeVisible();

  const company = page.locator('[data-home-section="company-overview"]');
  const revealedHeading = company.locator(".reveal").first();
  await expect(revealedHeading).toHaveCSS("opacity", "0");
  await company.scrollIntoViewIfNeeded();
  await expect(root).toHaveAttribute("data-scrolled", "true");
  await expect(page.getByRole("banner")).toHaveCSS("background-color", "rgb(247, 249, 252)");
  await expect(root).toHaveAttribute("data-hero-passed", "true");
  await expect(revealedHeading).toHaveCSS("opacity", "1");
  await expect(revealedHeading).toHaveCSS("transform", "none");
  await expect(company.getByRole("heading", { name: "회사 기본 정보" })).toBeVisible();

  const actions = page.getByRole("complementary", { name: "빠른 문의" });
  const phone = actions.getByRole("link", { name: "전화 바로 연결" });
  const email = actions.getByRole("link", { name: "이메일 작성" });
  const contact = actions.getByRole("link", { name: "문의 페이지 열기" });
  await expect(actions).toBeInViewport();
  await expect(phone).toHaveAttribute("href", "tel:031-674-3640");
  await expect(email).toHaveAttribute("href", "mailto:sjbjh3613@daum.net");
  await expect(contact).toHaveAttribute("href", "/contact");

  await phone.focus();
  await expect(phone).toBeFocused();
  await expect(phone).toHaveCSS("outline-style", "solid");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(root).toHaveAttribute("data-hero-passed", "false");
  await expect(phone).toBeFocused();
  await expect(actions).toBeInViewport();
  await expect(actions).toHaveCSS("visibility", "visible");
  await page.keyboard.press("Tab");
  await expect(email).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(contact).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/contact");
  await expect(page.getByRole("heading", { level: 1, name: "연락처" })).toBeVisible();
});

test("a pointer click follows a link while its section is waiting to reveal", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/products");
  // Keep the link in the stagger interval through pointer-down and pointer-up.
  await page.addStyleTag({ content: ".reveal.motion-ready { transition-delay: 2s !important; }" });
  const section = page.locator('[data-products-section="business-link"]');
  await expect(section).toHaveCSS("opacity", "0");
  await section.getByRole("link", { name: "설계·제조 사업 보기" }).click();
  await expect(page).toHaveURL("/business");
  await expect(page.getByRole("heading", { name: "사업 분야", level: 1 })).toBeVisible();
});

test("Footer top link returns to the opening without leaving the page", async ({ page }) => {
  await page.goto("/");
  const topLink = page.getByRole("contentinfo").getByRole("link", { name: "맨 위로" });
  await topLink.scrollIntoViewIfNeeded();
  await expect(page.locator("html")).toHaveAttribute("data-hero-passed", "true");
  await expect(topLink).toHaveAttribute("href", "#page-top");
  await topLink.click();
  await expect(page).toHaveURL(/\/#page-top$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(2);
  await expect(page.locator("html")).toHaveAttribute("data-scrolled", "false");
  await expect(page.locator(".home-statement").getByRole("heading", { level: 1 })).toBeInViewport();
});

test("reduced motion leaves every reveal readable and disables decorative animations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-scrolled", "false");

  const reveals = page.locator(".reveal");
  expect(await reveals.count()).toBeGreaterThan(0);
  expect(await reveals.evaluateAll((elements) => elements.every((element) => {
    const style = getComputedStyle(element);
    return style.opacity === "1" && style.transform === "none" && style.visibility === "visible";
  }))).toBe(true);
  await expect(page.locator(".hero-detail__image")).toHaveCSS("animation-name", "none");
  expect(await page.locator(".scroll-cue i").evaluate((element) =>
    getComputedStyle(element, "::after").animationName,
  )).toBe("none");
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);

  const company = page.locator('[data-home-section="company-overview"]');
  await company.scrollIntoViewIfNeeded();
  await expect(company.getByRole("heading", { name: "회사 기본 정보" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-hero-passed", "true");
});

test.describe("progressive enhancement without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("Home information and real page links remain available", async ({ page }) => {
    await page.goto("/");
    const main = page.getByRole("main");
    await expect(page.getByRole("banner").getByRole("link", { name: "(주)승종 홈" })).toBeVisible();
    await expect(main.getByRole("heading", { level: 1, name: "(주)승종" })).toBeVisible();
    await expect(main.getByText("(주)승종은 금형 설계 및 우레탄 성형·발포를 수행하는 제조업체입니다.")).toBeVisible();
    await expect(main.getByRole("link", { name: "사업 알아보기" })).toHaveAttribute("href", "/business");
    await expect(main.getByRole("link", { name: "전화 문의 031-674-3640", exact: true })).toHaveAttribute("href", "tel:031-674-3640");
    await expect(page.locator(".reveal.motion-ready")).toHaveCount(0);
    expect(await page.locator(".reveal").evaluateAll((elements) => elements.every((element) =>
      getComputedStyle(element).opacity === "1" && getComputedStyle(element).transform === "none",
    ))).toBe(true);

    // Footer navigation remains a complete route list even without the mobile disclosure script.
    const navigation = page.getByRole("navigation", { name: "하단 바로가기" });
    await navigation.scrollIntoViewIfNeeded();
    for (const [name, href] of [["회사소개", "/about"], ["사업분야", "/business"], ["제품", "/products"], ["문의", "/contact"]]) {
      const link = navigation.getByRole("link", { name, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", href);
    }
    await navigation.getByRole("link", { name: "사업분야", exact: true }).click();
    await expect(page).toHaveURL("/business");
    await expect(page.getByRole("heading", { level: 1, name: "사업 분야" })).toBeVisible();
  });
});
