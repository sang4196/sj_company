import Link from "next/link";
import { site } from "@/lib/site";
import { PrimaryNavigation } from "./primary-navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-identity" href="/" aria-label={`${site.name} 홈`}>
          {site.name}
        </Link>
        <a
          aria-label={`전화 문의 ${site.phone}`}
          className="phone-link"
          href={site.phoneHref}
        >
          <span>전화 문의</span>
          <span className="phone-link__number">{site.phone}</span>
        </a>
        <PrimaryNavigation />
      </div>
    </header>
  );
}
