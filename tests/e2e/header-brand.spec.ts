import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768, 1280]) {
  test(`official identity and navigation fit at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");

    const header = page.getByRole("banner");
    const identity = header.getByRole("link", { name: "(주)승종 홈", exact: true });
    const logo = identity.locator("img");
    const phone = header.getByRole("link", { name: "전화 문의 031-674-3640" });
    await expect(identity).toHaveText("(주)승종");
    await expect(identity).toHaveAttribute("href", "/");
    await expect(logo).toHaveAttribute("src", "/brand/seung-jong.png");
    await expect(logo).toHaveAttribute("alt", "");
    await expect(logo).toBeVisible();
    await expect.poll(() => logo.evaluate((image: HTMLImageElement) =>
      image.complete && image.naturalWidth === 171 && image.naturalHeight === 167,
    )).toBe(true);
    const logoBox = await logo.boundingBox();
    if (!logoBox) throw new Error("Logo is not rendered");
    expect(logoBox.width / logoBox.height).toBeCloseTo(171 / 167, 2);
    expect(logoBox.width).toBeLessThanOrEqual(171);
    expect(logoBox.width).toBeGreaterThanOrEqual(32);
    await expect(phone).toHaveAttribute("href", "tel:031-674-3640");

    const toggle = header.getByRole("button", { name: "메뉴 열기" });
    const navigation = header.getByRole("navigation", { name: "주요 메뉴", exact: true });
    if (width < 768) {
      await expect(toggle).toBeVisible();
      await expect(navigation).toBeHidden();
    } else {
      await expect(toggle).toBeHidden();
      await expect(navigation).toBeVisible();
      await expect(navigation.getByRole("link")).toHaveText([
        "Home", "About", "Business", "Products", "Contact",
      ]);
      await expect(navigation.locator('a[aria-current="page"]')).toHaveText("Home");
    }

    const layout = await header.evaluate((element) => {
      const selectors = innerWidth < 768
        ? [".site-identity", ".phone-link", ".navigation-toggle"]
        : [".site-identity", ".desktop-navigation", ".phone-link"];
      const boxes = selectors.map((selector) => {
        const target = element.querySelector(selector);
        if (!target) throw new Error(`Missing ${selector}`);
        return target.getBoundingClientRect().toJSON();
      });
      const linkTops = Array.from(element.querySelectorAll(".navigation-link"))
        .map((link) => link.getBoundingClientRect().top);
      return { boxes, linkTops, overflow: document.documentElement.scrollWidth > innerWidth };
    });
    expect(layout.overflow).toBe(false);
    for (let index = 0; index < layout.boxes.length; index += 1) {
      const box = layout.boxes[index];
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.right).toBeLessThanOrEqual(width);
      expect(Math.abs(box.y + box.height / 2 -
        (layout.boxes[0].y + layout.boxes[0].height / 2)))
        .toBeLessThan(1);
      if (index > 0) expect(layout.boxes[index - 1].right).toBeLessThanOrEqual(box.x);
    }
    if (width >= 768) expect(new Set(layout.linkTops).size).toBe(1);

    await page.screenshot({ path: testInfo.outputPath(`after-${width}.png`) });
    if (width < 768) {
      const main = page.getByRole("main");
      const closedMain = await main.boundingBox();
      await phone.focus();
      await expect(phone).toHaveCSS("outline-style", "solid");
      await page.keyboard.press("Tab");
      await expect(toggle).toBeFocused();
      await expect(toggle).toHaveCSS("outline-style", "solid");
      await page.keyboard.press("Enter");
      const menu = header.getByRole("navigation", { name: "모바일 주요 메뉴" });
      await expect(menu).toBeVisible();
      const menuBox = await menu.boundingBox();
      const openMain = await main.boundingBox();
      if (!closedMain || !menuBox || !openMain) throw new Error("Missing layout boxes");
      expect(openMain.y - closedMain.y).toBeGreaterThanOrEqual(menuBox.height);
      expect(openMain.y).toBeGreaterThanOrEqual(menuBox.y + menuBox.height);
      await page.screenshot({ path: testInfo.outputPath(`after-${width}-menu.png`) });
      await page.keyboard.press("Tab");
      await page.keyboard.press("Escape");
      await expect(toggle).toBeFocused();
      await expect(menu).toBeHidden();
    }

    await page.goto("/about");
    await identity.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1, name: "(주)승종" })).toBeVisible();
  });
}
