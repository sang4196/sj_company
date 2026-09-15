import Link from "next/link";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div className="home-page">
      <section
        className="home-section home-statement"
        aria-labelledby="home-heading"
        data-home-section="company-statement"
      >
        <p className="eyebrow">제조업</p>
        <h1 id="home-heading">{site.name}</h1>
        <p className="home-statement__description">
          (주)승종은 금형 설계 및 우레탄 성형·발포를 수행하는 제조업체입니다.
        </p>
      </section>

      <section
        className="home-section"
        aria-labelledby="business-overview-heading"
        data-home-section="business-overview"
      >
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Business</p>
            <h2 id="business-overview-heading">사업 분야</h2>
          </div>
          <Link className="text-link" href="/business">
            사업 분야 자세히 보기
          </Link>
        </div>
        <ul className="business-list">
          <li>
            <span className="item-index" aria-hidden="true">01</span>
            <h3>금형 설계</h3>
          </li>
          <li>
            <span className="item-index" aria-hidden="true">02</span>
            <h3>우레탄 성형·발포</h3>
          </li>
        </ul>
      </section>

      <section
        className="home-section product-overview"
        aria-labelledby="product-overview-heading"
        data-home-section="representative-product"
      >
        <div>
          <p className="eyebrow">Representative Product</p>
          <h2 id="product-overview-heading">대표 제품</h2>
        </div>
        <div className="product-overview__content">
          <h3>퍼즐형 층간소음매트</h3>
          <p>퍼즐 형태의 층간소음매트로, (주)승종의 대표 제품입니다.</p>
          <Link className="text-link" href="/products">
            제품 보기
          </Link>
        </div>
      </section>

      <section
        className="home-section"
        aria-labelledby="company-overview-heading"
        data-home-section="company-overview"
      >
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Company</p>
            <h2 id="company-overview-heading">회사 기본 정보</h2>
          </div>
          <Link className="text-link" href="/about">
            회사 소개 보기
          </Link>
        </div>
        <dl className="home-company-details">
          <div>
            <dt>회사명</dt>
            <dd>{site.name}</dd>
          </div>
          <div>
            <dt>설립연도</dt>
            <dd>{site.founded}</dd>
          </div>
          <div>
            <dt>사업</dt>
            <dd>금형 설계 / 우레탄 성형·발포</dd>
          </div>
          <div>
            <dt>주소</dt>
            <dd>{site.address}</dd>
          </div>
        </dl>
      </section>

      <section
        className="home-section contact-section"
        aria-labelledby="contact-cta-heading"
        data-home-section="contact"
      >
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-cta-heading">전화 문의</h2>
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
