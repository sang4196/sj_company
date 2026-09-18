import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768, 1280]) {
  test(`product specification tables remain readable at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/products");
    const main = page.getByRole("main");
    const specs = page.getByRole("region", { name: "제품 규격", exact: true });
    await expect(specs.getByRole("table")).toHaveCount(4);
    await expect(specs.getByRole("row")).toHaveCount(23);
    await expect(specs.getByText(/제품 형태 예시 이미지/)).toHaveCount(4);
    const layout = await specs.evaluate((element) => {
      const cells = [...element.querySelectorAll("th, td, figcaption")];
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        clipped: cells.filter((cell) => {
          const box = cell.getBoundingClientRect();
          return box.left < 0 || box.right > innerWidth || cell.scrollWidth > cell.clientWidth + 1;
        }).map((cell) => cell.textContent),
      };
    });
    expect(layout).toEqual({ overflow: false, clipped: [] });
    await expect(main.getByRole("link", { name: "전화 문의", exact: true })).toHaveAttribute("href", "tel:031-674-3640");
    await expect(main.getByRole("link", { name: /이메일 문의/ })).toHaveAttribute("href", "mailto:sjbjh3613@daum.net");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "본문으로 건너뛰기" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(main).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(main.getByRole("link", { name: "설계·제조 사업 보기" })).toBeFocused();
    await main.getByRole("link", { name: "전화 문의", exact: true }).focus();
    await expect(main.getByRole("link", { name: "전화 문의", exact: true })).toHaveCSS("outline-style", "solid");
    await page.keyboard.press("Tab");
    await expect(main.getByRole("link", { name: /이메일 문의/ })).toBeFocused();
    await page.locator("body").click({ position: { x: 1, y: 1 } });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`products-${width}.png`), fullPage: true });
  });
}
