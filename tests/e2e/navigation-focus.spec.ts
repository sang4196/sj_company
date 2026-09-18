import { expect, test } from "@playwright/test";

test("responsive navigation restores disappearing controls without taking other focus", async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 844 });
  await page.goto("/");
  const desktop = page.getByRole("navigation", { name: "주요 메뉴" });
  const toggle = page.getByRole("button", { name: /메뉴 (열기|닫기)/ });
  const mainPhone = page.getByRole("main").getByRole("link", { name: "전화 문의 031-674-3640" });

  await desktop.getByRole("link", { name: "About" }).focus();
  await expect(desktop.getByRole("link", { name: "About" })).toBeFocused();
  await page.setViewportSize({ width: 767, height: 844 });
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  await page.setViewportSize({ width: 768, height: 844 });
  await expect(desktop.getByRole("link", { name: "Home" })).toBeFocused();

  await mainPhone.focus();
  await page.setViewportSize({ width: 767, height: 844 });
  await expect(mainPhone).toBeFocused();
  await page.setViewportSize({ width: 768, height: 844 });
  await expect(mainPhone).toBeFocused();

  // Explicitly leaving a still-visible navigation link must not restore stale focus.
  await desktop.getByRole("link", { name: "About" }).focus();
  await desktop.getByRole("link", { name: "About" }).evaluate((element) => element.blur());
  await page.setViewportSize({ width: 767, height: 844 });
  await expect(toggle).not.toBeFocused();

  await toggle.click();
  const mobile = page.getByRole("navigation", { name: "모바일 주요 메뉴" });
  await mobile.getByRole("link", { name: "About" }).focus();
  await page.setViewportSize({ width: 768, height: 844 });
  await expect(desktop.getByRole("link", { name: "Home" })).toBeFocused();
  await page.setViewportSize({ width: 767, height: 844 });
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  await toggle.click();
  await mainPhone.focus();
  await page.setViewportSize({ width: 768, height: 844 });
  await expect(mainPhone).toBeFocused();
  await page.setViewportSize({ width: 767, height: 844 });
  await expect(mainPhone).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});
