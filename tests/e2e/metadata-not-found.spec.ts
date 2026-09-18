import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", title: "(주)승종 | 금형 설계·제작 및 우레탄 성형·발포", description: "(주)승종은 금형 설계·제작 및 우레탄 성형·발포를 수행하는 제조업체입니다. 대표 제품인 퍼즐형 층간소음매트와 회사의 사업을 소개합니다." },
  { path: "/about", title: "회사 소개 | (주)승종", description: "2017년 설립된 제조업체 (주)승종의 회사 소개, 금형 설계 및 우레탄 성형·발포 사업과 기본 정보를 안내합니다." },
  { path: "/business", title: "사업 분야 | (주)승종", description: "(주)승종의 제품 및 금형 설계·제작과 우레탄 성형·발포 업무를 안내합니다." },
  { path: "/products", title: "제품 | (주)승종", description: "(주)승종의 대표 제품인 퍼즐형 층간소음매트를 소개합니다." },
  { path: "/contact", title: "연락처 | (주)승종", description: "(주)승종 연락처: 전화 031-674-3640, 이메일 sjbjh3613@daum.net, 주소 경기도 안성시 서운면 사갑1길 296-49." },
];

test("production pages expose distinct factual metadata", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const entry of pages) {
    const response = await page.goto(entry.path);
    expect(response?.status()).toBe(200);
    expect(response?.headers()["content-type"]).toContain("text/html");
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute("href", `https://www.seungjong.co.kr${entry.path === "/" ? "" : entry.path}`);
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
    await expect(page).toHaveTitle(entry.title);
    await expect(page.locator("title")).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", entry.description);
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
  }
  expect(errors).toEqual([]);
});

test("missing address provides keyboard recovery in the shared shell", async ({ page }, testInfo) => {
  const missingPath = "/task-012-does-not-exist";
  const errors: string[] = [];
  const expectedNetworkErrors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    // Only the missing document's expected HTTP 404 is allowed in this test.
    if (message.text().includes("404") && new URL(message.location().url || page.url()).pathname === missingPath) {
      expectedNetworkErrors.push(message.text());
    } else {
      errors.push(message.text());
    }
  });
  const response = await page.goto(missingPath);
  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle("페이지를 찾을 수 없습니다 | (주)승종");
  await expect(page.locator("title")).toHaveCount(1);
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content", "입력한 주소를 확인하거나 홈으로 이동해 주세요.",
  );
  await expect(page.getByRole("heading", { level: 1, name: "페이지를 찾을 수 없습니다." })).toBeVisible();
  await expect(page.getByText("입력한 주소를 확인하거나 홈으로 이동해 주세요.")).toBeVisible();
  for (const role of ["banner", "main", "contentinfo"] as const) {
    await expect(page.getByRole(role)).toHaveCount(1);
  }
  await expect(page.locator('nav [aria-current="page"]')).toHaveCount(0);
  const robots = await page.locator('meta[name="robots"]').evaluateAll((elements) => elements.map((element) => element.getAttribute("content")));
  expect(robots.join(",")).toContain("noindex");
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  await page.screenshot({ path: testInfo.outputPath("not-found.png"), fullPage: true });
  await testInfo.attach("response", {
    body: JSON.stringify({ status: response?.status(), robots, expectedNetworkErrors }),
    contentType: "application/json",
  });

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "본문으로 건너뛰기" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await page.keyboard.press("Tab");
  const home = page.getByRole("main").getByRole("link", { name: "홈으로 이동" });
  await expect(home).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/");
  await page.goto(missingPath);
  await page.getByRole("main").getByRole("link", { name: "문의", exact: true }).click();
  await expect(page).toHaveURL("/contact");
  expect(errors).toEqual([]);
});


test("robots and sitemap expose only the approved production discovery URLs", async ({ request, page }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(robots.headers()["content-type"]).toContain("text/plain");
  expect((await robots.text()).trim()).toBe("User-Agent: *\nAllow: /\n\nSitemap: https://www.seungjong.co.kr/sitemap.xml");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(sitemap.headers()["content-type"]).toContain("application/xml");
  const xml = await sitemap.text();
  const contents = await page.evaluate((source) => {
    const document = new DOMParser().parseFromString(source, "application/xml");
    return {
      errors: document.querySelectorAll("parsererror").length,
      namespace: document.documentElement.namespaceURI,
      urls: [...document.querySelectorAll("url > loc")].map((entry) => entry.textContent),
      unsupported: document.querySelectorAll("lastmod, changefreq, priority").length,
    };
  }, xml);
  expect(contents).toEqual({
    errors: 0,
    namespace: "http://www.sitemaps.org/schemas/sitemap/0.9",
    urls: ["https://www.seungjong.co.kr", "https://www.seungjong.co.kr/about", "https://www.seungjong.co.kr/business", "https://www.seungjong.co.kr/products", "https://www.seungjong.co.kr/contact"],
    unsupported: 0,
  });
  for (const path of ["/careers", "/not-published"]) {
    expect((await page.goto(path))?.status()).toBe(404);
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  }
});
