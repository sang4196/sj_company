import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "./robots";

afterEach(() => vi.unstubAllEnvs());

describe("crawl policy", () => {
  it("permits production crawling and advertises the production sitemap", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://www.seungjong.co.kr/sitemap.xml",
    });
  });

  it("does not invite crawlers into Vercel previews", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });
});
