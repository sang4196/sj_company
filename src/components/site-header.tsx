import Link from "next/link";
import { site } from "@/lib/site";
import { PrimaryNavigation } from "./primary-navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__topline">
          <Link className="site-identity" href="/" aria-label={`${site.name} 홈`}>
            {site.name}
          </Link>
          <a className="phone-link" href={site.phoneHref}>
            <span>전화 문의</span>
            <span className="phone-link__number">{site.phone}</span>
          </a>
        </div>
        <PrimaryNavigation />
      </div>
    </header>
  );
}
