import { expect, test } from "@playwright/test";

const approvedMobileHeights = new Map([
  [360, 408.5], [390, 411.125], [412, 413.359375], [767, 480.203125],
]);

for (const [width, height] of [[1920, 1080], [1366, 768], [2560, 1440], [768, 1024], [390, 844], [360, 800], [412, 915], [767, 1024], [1279, 900], [1280, 900], [1281, 900]]) {
  test(`Home preserves full photo geometry and approved layout at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    const response = await page.request.get("/visuals/sj-main.png");
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("image/png");
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const photo = page.getByRole("img", { name: "승종 건물 전경과 하단 소개 항목" });
    await expect.poll(() => photo.evaluate((image: HTMLImageElement) =>
      image.complete && image.naturalWidth === 1672 && image.naturalHeight === 941,
    )).toBe(true);
    const box = await photo.boundingBox();
    const copy = await page.locator(".home-statement__inner").boundingBox();
    const header = await page.getByRole("banner").boundingBox();
    if (!box || !copy || !header) throw new Error("Missing Hero layout");
    expect(box.width).toBeCloseTo(width, 0);
    expect(box.height).toBeCloseTo(box.width * 941 / 1672, 0);
    expect(box.y).toBeGreaterThanOrEqual(header.y + header.height - 1);
    const hero = page.locator('[data-home-section="company-statement"]');
    await expect(hero).toHaveCount(1);
    await expect(hero.locator("img")).toHaveCount(1);
    if (width < 768) {
      const content = await hero.locator(".home-statement__content").boundingBox();
      const heroBox = await hero.boundingBox();
      if (!content || !heroBox) throw new Error("Missing mobile foreground");
      await expect(photo).toHaveCSS("position", "absolute");
      expect(box.y).toBeLessThan(content.y + content.height);
      // The user approved center alignment at the original content-driven height,
      // including foreground occlusion of part of the image's lower strip.
      expect(box.y + box.height / 2).toBeCloseTo(heroBox.y + heroBox.height / 2, 1);
      const approvedHeight = approvedMobileHeights.get(width);
      if (approvedHeight === undefined) throw new Error("Missing approved mobile height");
      expect(heroBox.height).toBeCloseTo(approvedHeight, 0);
    } else if (width < 1280) {
      expect(box.y).toBeGreaterThanOrEqual(copy.y + copy.height - 1);
    } else {
      expect(copy.y).toBeGreaterThanOrEqual(box.y);
      const caption = await hero.locator(".hero-caption").boundingBox();
      if (!caption) throw new Error("Missing Hero caption");
      expect(caption.y + caption.height).toBeLessThan(box.y + box.height * 795 / 941 - 24);
    }
    await expect(photo).toHaveCSS("filter", "none");
    await expect(photo).toHaveCSS("opacity", "1");
    await expect(photo).toHaveCSS("pointer-events", "none");
    if (width < 768) {
      const matrix = await photo.evaluate((image) => {
        const transform = new DOMMatrixReadOnly(getComputedStyle(image).transform);
        return { a: transform.a, b: transform.b, c: transform.c, d: transform.d, x: transform.e, y: transform.f };
      });
      expect(matrix).toMatchObject({ a: 1, b: 0, c: 0, d: 1, x: 0 });
      expect(matrix.y).toBeCloseTo(-box.height / 2, 1);
    } else {
      await expect(photo).toHaveCSS("transform", "none");
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);

    // Each actual image corner must be reachable through scrolling and exposed,
    // rather than clipped by an ancestor or covered by a Header/overlay.
    for (const [right, bottom] of [[false, false], [true, false], [false, true], [true, true]]) {
      expect(await photo.evaluate((image, corner) => {
        const before = image.getBoundingClientRect();
        const documentY = before.top + scrollY + (corner.bottom ? before.height - 2 : 2);
        window.scrollTo({ top: Math.max(0, documentY - innerHeight / 2), behavior: "instant" });
        const rect = image.getBoundingClientRect();
        return document.elementFromPoint(
          corner.right ? rect.right - 2 : rect.left + 2,
          corner.bottom ? rect.bottom - 2 : rect.top + 2,
        ) === image.closest(".home-statement");
      }, { right, bottom })).toBe(true);
    }
    await page.locator(".hero-actions").getByRole("link", { name: "사업 알아보기" }).focus();
    await expect(page.locator(".hero-actions").getByRole("link", { name: "사업 알아보기" })).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/business");
    await page.goto("/");
    await page.locator(".hero-actions").getByRole("link", { name: "대표 제품 보기" }).click();
    await expect(page).toHaveURL("/products");
  });
}
