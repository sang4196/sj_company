import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__columns">
          <div className="site-footer__brand">
            <Link className="site-footer__identity" href="/" aria-label={`${site.name} 홈`}>
              <Image src="/brand/seung-jong.png" width={171} height={167} alt="" unoptimized />
              <span>{site.name}</span>
            </Link>
            <div className="site-footer__meta">
              <p>금형 설계·제작 · 우레탄 성형·발포</p>
              <p>{site.founded}년 설립</p>
              <p>{site.address}</p>
            </div>
          </div>
          <nav className="site-footer__navigation" aria-label="하단 바로가기">
            <p className="site-footer__column-label">Sitemap</p>
            <Link href="/about">회사소개</Link>
            <Link href="/business">사업분야</Link>
            <Link href="/products">제품</Link>
            <Link href="/contact">문의</Link>
          </nav>
          <div className="site-footer__contact">
            <p className="site-footer__column-label">Contact</p>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={site.emailHref}>{site.email}</a>
            <Link href="/contact">연락처 안내</Link>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p className="site-footer__copyright">© 2026 (주)승종. All rights reserved.</p>
          <a className="site-footer__top-link" href="#page-top">
            맨 위로 <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
