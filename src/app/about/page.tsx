import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "회사 소개" };

export default function AboutPage() {
  return (
    <div className="about-page">
      <section
        className="about-section about-intro"
        aria-labelledby="about-heading"
        data-about-section="introduction"
      >
        <p className="eyebrow">About</p>
        <h1 id="about-heading">회사 소개</h1>
        <p className="about-intro__description">
          (주)승종은 금형 설계 및 우레탄 성형·발포를 수행하는 제조업체입니다.
        </p>
      </section>

      <section
        className="about-section about-overview"
        aria-labelledby="about-overview-heading"
        data-about-section="company-overview"
      >
        <div>
          <p className="eyebrow">Overview</p>
          <h2 id="about-overview-heading">회사 개요</h2>
        </div>
        <dl className="overview-facts">
          <div>
            <dt>회사명</dt>
            <dd>{site.name}</dd>
          </div>
          <div>
            <dt>설립연도</dt>
            <dd>{site.founded}</dd>
          </div>
          <div>
            <dt>회사 성격</dt>
            <dd>제조업</dd>
          </div>
        </dl>
      </section>

      <section
        className="about-section"
        aria-labelledby="about-business-heading"
        data-about-section="business-areas"
      >
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Business</p>
            <h2 id="about-business-heading">사업 영역</h2>
          </div>
          <Link className="text-link" href="/business">
            사업 분야 자세히 보기
          </Link>
        </div>
        <ul className="about-business-list">
          <li>금형 설계</li>
          <li>우레탄 성형·발포</li>
        </ul>
      </section>

      <section
        className="about-section"
        aria-labelledby="company-information-heading"
        data-about-section="company-information"
      >
        <p className="eyebrow">Information</p>
        <h2 id="company-information-heading">회사 정보</h2>
        <dl className="about-company-details">
          <div>
            <dt>주소</dt>
            <dd>{site.address}</dd>
          </div>
          <div>
            <dt>전화</dt>
            <dd>
              <a href={site.phoneHref} aria-label={`전화 문의 ${site.phone}`}>
                {site.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt>이메일</dt>
            <dd>
              <a href={site.emailHref} aria-label={`이메일 문의 ${site.email}`}>
                {site.email}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <section
        className="about-section contact-section"
        aria-labelledby="about-contact-heading"
        data-about-section="contact"
      >
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="about-contact-heading">전화 문의</h2>
          <p className="contact-section__number">{site.phone}</p>
        </div>
        <div className="contact-actions">
          <a className="primary-action primary-action--inverse" href={site.phoneHref}>
            전화 문의
          </a>
          <a className="secondary-contact" href={site.emailHref}>
            이메일 문의: {site.email}
          </a>
        </div>
      </section>
    </div>
  );
}
