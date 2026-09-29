import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteMotion } from "@/components/site-motion";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "(주)승종",
    template: "%s | (주)승종",
  },
  description: "(주)승종은 금형 설계 및 우레탄 성형·발포를 수행하는 제조업체입니다.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preload" href="/fonts/SUIT-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body id="page-top">
        <SiteMotion />
        <a className="skip-link" href="#main-content">
          본문으로 건너뛰기
        </a>
        <div className="site-shell">
          <SiteHeader />
          <main className="site-main" id="main-content" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <aside className="site-actions" aria-label="빠른 문의">
            <a href={site.phoneHref} aria-label="전화 바로 연결">전화 문의</a>
            <a href={site.emailHref} aria-label="이메일 작성">이메일 문의</a>
            <Link href="/contact" aria-label="문의 페이지 열기">문의 안내 <span aria-hidden="true">↗</span></Link>
          </aside>
        </div>
      </body>
    </html>
  );
}
