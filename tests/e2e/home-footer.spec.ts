import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768, 1280]) {
  test(`Home and Footer reflow with enlarged text at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    const hero = page.locator('[data-home-section="company-statement"]');
    const normalHeight = (await hero.boundingBox())?.height;
    if (!normalHeight) throw new Error("Missing Home introduction");
    await expect(page.getByRole("main").getByRole("heading", { name: "퍼즐형 층간소음매트", level: 2 })).toBeVisible();
    // User font-size preference: increase rem-based text to 200%, without a fixed-height shortcut.
    await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
    const expandedHeight = (await hero.boundingBox())?.height;
    expect(expandedHeight).toBeGreaterThan(normalHeight);
    const layout = await page.evaluate(() => {
      const bad: string[] = [];
      for (const element of document.querySelectorAll("header a, header button, main h1, main h2, main h3, main p, main li, main dd, main a, footer a, footer p")) {
        const box = element.getBoundingClientRect();
        if (!box.width) continue;
        if (box.left < -1 || box.right > innerWidth + 1 || element.scrollWidth > element.clientWidth + 1)
          bad.push(element.textContent?.trim() || element.tagName);
      }
      const controls = [...document.querySelectorAll("header .site-identity, header .phone-link, header .navigation-toggle")]
        .map((e) => e.getBoundingClientRect()).filter((b) => b.width);
      const overlap = controls.some((a, i) => controls.slice(i + 1).some((b) =>
        a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top));
      return { bad, overlap, overflow: document.documentElement.scrollWidth > innerWidth };
    });
    expect(layout).toEqual({ bad: [], overlap: false, overflow: false });
    const footer = page.getByRole("contentinfo");
    const inquiry = footer.getByRole("link", { name: "문의", exact: true });
    await inquiry.focus();
    await expect(inquiry).toBeFocused();
    await expect(inquiry).toHaveCSS("outline-style", "solid");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/contact");
  });
}

test("Footer identity, contact and shortcuts work on every route and 404", async ({ page }) => {
  const routes = ["/", "/about", "/business", "/products", "/contact", "/missing-footer-review"];
  const shortcuts = [
    { name: "회사소개", href: "/about" }, { name: "사업분야", href: "/business" },
    { name: "제품", href: "/products" }, { name: "문의", href: "/contact" },
  ];
  for (const route of routes) {
    await page.goto(route);
    const footer = page.getByRole("contentinfo");
    const logo = footer.getByRole("link", { name: "(주)승종 홈", exact: true }).locator("img");
    await expect.poll(() => logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth === 171 && image.naturalHeight === 167)).toBe(true);
    await expect(logo).toHaveAttribute("alt", "");
    const box = await logo.boundingBox();
    if (!box) throw new Error("Missing Footer logo");
    expect(box.width / box.height).toBeCloseTo(171 / 167, 2);
    await expect(footer.getByText("© 2026 (주)승종. All rights reserved.")).toBeVisible();
    await expect(footer.getByText("금형 설계·제작 · 우레탄 성형·발포")).toBeVisible();
    await expect(footer.getByText("경기도 안성시 서운면 사갑1길 296-49")).toBeVisible();
    await expect(footer.getByRole("link", { name: "031-674-3640" })).toHaveAttribute("href", "tel:031-674-3640");
    await expect(footer.getByRole("link", { name: "sjbjh3613@daum.net" })).toHaveAttribute("href", "mailto:sjbjh3613@daum.net");
    const navigation = footer.getByRole("navigation", { name: "하단 바로가기" });
    for (const { name, href } of shortcuts) {
      const link = navigation.getByRole("link", { name, exact: true });
      await expect(link).toHaveAttribute("href", href);
      const target = await link.boundingBox();
      expect(target?.height).toBeGreaterThanOrEqual(44);
    }
  }
  for (const { name, href } of shortcuts) {
    await page.getByRole("contentinfo").getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(href);
  }
  await page.getByRole("contentinfo").getByRole("link", { name: "(주)승종 홈", exact: true }).click();
  await expect(page).toHaveURL("/");
});
