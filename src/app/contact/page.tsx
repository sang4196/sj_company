import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "연락처",
  description: `${site.name} 연락처: 전화 ${site.phone}, 이메일 ${site.email}, 주소 ${site.address}.`,
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <section
        className="contact-page__section contact-page__intro"
        aria-labelledby="contact-heading"
        data-contact-section="introduction"
      >
        <p className="eyebrow">Contact</p>
        <h1 id="contact-heading">연락처</h1>
        <p className="contact-page__company">{site.name}</p>
      </section>

      <section
        className="contact-page__section contact-primary"
        aria-labelledby="phone-contact-heading"
        data-contact-section="phone"
      >
        <div>
          <p className="eyebrow">Primary Contact</p>
          <h2 id="phone-contact-heading">전화 문의</h2>
          <p className="contact-primary__number">{site.phone}</p>
        </div>
        <a
          className="primary-action primary-action--inverse contact-primary__action"
          href={site.phoneHref}
          aria-label={`전화 문의 ${site.phone}`}
        >
          전화 문의
        </a>
      </section>

      <section
        className="contact-page__section contact-secondary"
        aria-labelledby="email-contact-heading"
        data-contact-section="email"
      >
        <div>
          <p className="eyebrow">Secondary Contact</p>
          <h2 id="email-contact-heading">이메일</h2>
        </div>
        <a
          className="contact-detail-link"
          href={site.emailHref}
          aria-label={`이메일 문의 ${site.email}`}
        >
          {site.email}
        </a>
      </section>

      <section
        className="contact-page__section contact-address"
        aria-labelledby="address-heading"
        data-contact-section="address"
      >
        <div>
          <p className="eyebrow">Address</p>
          <h2 id="address-heading">회사 주소</h2>
        </div>
        <address>{site.address}</address>
      </section>
    </div>
  );
}
