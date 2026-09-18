import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768, 1280]) {
  test(`About certificate records remain readable at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/about");
    const registrations = page.getByRole("region", { name: "특허·디자인 등록" });
    await expect(registrations).toBeVisible();
    await expect(registrations.getByRole("list", { name: "특허", exact: true }).getByRole("listitem"))
      .toHaveCount(2);
    await expect(registrations.getByRole("list", { name: "디자인", exact: true }).getByRole("listitem"))
      .toHaveCount(6);
    const rows = registrations.getByRole("listitem");
    await expect(rows).toHaveCount(8);
    for (const row of await rows.all()) {
      await row.scrollIntoViewIfNeeded();
      await expect(row).toBeInViewport();
      const layout = await row.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left,
          right: rect.right,
          clipped: Array.from(element.querySelectorAll("p, dt, dd"))
            .some((child) => child.scrollWidth > child.clientWidth),
        };
      });
      expect(layout.left).toBeGreaterThanOrEqual(0);
      expect(layout.right).toBeLessThanOrEqual(width);
      expect(layout.clipped).toBe(false);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    // Capture from the document origin so fixed offscreen controls stay offscreen.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`after-${width}.png`), fullPage: true });
    const sectionBox = await registrations.boundingBox();
    if (!sectionBox) throw new Error("Missing registration section");
    await page.screenshot({
      path: testInfo.outputPath(`after-${width}-registrations.png`),
      fullPage: true,
      clip: sectionBox,
    });
    await expect(page.getByRole("region", { name: "전화 문의", exact: true })
      .getByRole("link", { name: "전화 문의", exact: true }))
      .toHaveAttribute("href", "tel:031-674-3640");
  });
}
