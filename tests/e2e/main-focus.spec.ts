import { expect, test } from "@playwright/test";

test("main whitespace does not show an outline after a click or tap", async ({ page, hasTouch }) => {
  for (const route of ["/", "/about", "/business", "/products", "/contact"]) {
    await page.goto(route);
    const main = page.getByRole("main");
    const point = await main.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      return { x: bounds.right - 8, y: Math.max(bounds.top, headerBottom) + 16 };
    });

    if (hasTouch) await page.touchscreen.tap(point.x, point.y);
    else await page.mouse.click(point.x, point.y);

    await expect(main).toBeFocused();
    await expect(main).toHaveCSS("outline-style", "none");

    // Switching back to the keyboard must still reveal the next control's focus.
    await page.keyboard.press("Tab");
    const firstControl = main.locator("a[href], button:not([disabled])").first();
    await expect(firstControl).toBeFocused();
    await expect(firstControl).toHaveCSS("outline-style", "solid");
  }
});
