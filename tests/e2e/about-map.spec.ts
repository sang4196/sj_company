import { expect, test } from "@playwright/test";

const embedRequest = /^https:\/\/www\.google\.com\/maps\/embed\?/;

test("company information follows registrations and contains a responsive map", async ({ page }) => {
  // Keep provider availability out of the regression suite; live rendering is checked separately.
  await page.route(embedRequest, (route) => route.fulfill({
    contentType: "text/html; charset=utf-8",
    body: "<!doctype html><html lang='ko'><body>지도 제공자 응답</body></html>",
  }));
  await page.goto("/about");
  const registrations = page.getByRole("region", { name: "특허·디자인 등록" });
  await registrations.scrollIntoViewIfNeeded();
  await expect(registrations).toHaveCSS("transform", "none");
  const information = page.getByRole("region", { name: "회사 정보", exact: true });
  const map = information.getByTitle("(주)승종 위치 지도");
  await map.scrollIntoViewIfNeeded();
  await expect(map).toBeInViewport();
  await expect(page.frameLocator('iframe[title="(주)승종 위치 지도"]').locator("body"))
    .toContainText("지도 제공자 응답");
  await expect(information).toHaveCSS("transform", "none");

  const registrationsBox = await registrations.boundingBox();
  const informationBox = await information.boundingBox();
  const mapBox = await map.boundingBox();
  if (!registrationsBox || !informationBox || !mapBox) throw new Error("Missing About sections or map");
  expect(informationBox.y).toBeGreaterThanOrEqual(registrationsBox.y + registrationsBox.height);
  expect(mapBox.width).toBeCloseTo(informationBox.width, 0);
  expect(mapBox.height).toBeGreaterThanOrEqual(288);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
});

test.describe("unavailable embedded map without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("company contacts and external map remain usable", async ({ page, context }) => {
    await context.route(embedRequest, (route) => route.abort());
    await context.route("https://www.google.com/maps/search/**", (route) => route.fulfill({
      contentType: "text/html; charset=utf-8",
      body: "<!doctype html><html lang='ko'><body>외부 지도</body></html>",
    }));
    await page.goto("/about");
    const information = page.getByRole("region", { name: "회사 정보", exact: true });
    await information.scrollIntoViewIfNeeded();
    await expect(information.getByText("경기도 안성시 서운면 사갑1길 296-49", { exact: true })).toBeVisible();
    await expect(information.getByRole("link", { name: "전화 문의 031-674-3640" })).toHaveAttribute("href", "tel:031-674-3640");
    await expect(information.getByRole("link", { name: "이메일 문의 sjbjh3613@daum.net" })).toHaveAttribute("href", "mailto:sjbjh3613@daum.net");
    const mapLink = information.getByRole("link", { name: "지도 크게 보기" });
    await mapLink.focus();
    await expect(mapLink).toHaveCSS("outline-style", "solid");
    const popupPromise = page.waitForEvent("popup");
    await page.keyboard.press("Enter");
    const popup = await popupPromise;
    await popup.waitForURL("https://www.google.com/maps/search/**");
    expect(new URL(popup.url()).searchParams.get("query")).toBe("경기도 안성시 서운면 사갑1길 296-49");
    await expect(page).toHaveURL("/about");
  });
});
