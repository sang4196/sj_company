import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__name">{site.name}</p>
        <dl className="company-details">
          <div>
            <dt>설립</dt>
            <dd>{site.founded}</dd>
          </div>
          <div>
            <dt>주소</dt>
            <dd>{site.address}</dd>
          </div>
          <div>
            <dt>전화</dt>
            <dd>
              <a href={site.phoneHref}>{site.phone}</a>
            </dd>
          </div>
          <div>
            <dt>이메일</dt>
            <dd>
              <a href={site.emailHref}>{site.email}</a>
            </dd>
          </div>
        </dl>
      </div>
    </footer>
  );
}
