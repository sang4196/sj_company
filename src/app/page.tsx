import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: `${site.name} | 금형 설계·제작 및 우레탄 성형·발포` },
  description: `${site.name}은 금형 설계·제작 및 우레탄 성형·발포를 수행하는 제조업체입니다. 대표 제품인 퍼즐형 층간소음매트와 회사의 사업을 소개합니다.`,
};

export default function Home() {
  return (
    <div className="home-page">
      <section
        className="home-section home-statement"
        aria-labelledby="home-heading"
        data-home-section="company-statement"
      >
        <div className="home-statement__content">
          <h1 id="home-heading">{site.name}</h1>
          <p className="home-statement__message">
            제품의 시작부터,<br />
            <span>설계와 제조를 잇다.</span>
          </p>
          <p className="home-statement__description">
            (주)승종은 금형 설계 및 우레탄 성형·발포를 수행하는 제조업체입니다.
          </p>
          <Link className="primary-action primary-action--inverse" href="/business">
            사업 알아보기 <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <p className="home-statement__art-credit">형태와 소재를 표현한 AI 그래픽</p>
        <div className="home-statement__scope">
          <ul aria-label="주요 업무 범위">
            <li>제품 설계</li>
            <li>금형 설계·제작</li>
            <li>우레탄 성형·발포</li>
          </ul>
        </div>
      </section>

      <section
        className="home-section"
        aria-labelledby="business-overview-heading"
        data-home-section="business-overview"
      >
        <div className="section-heading-row">
          <div>
            <h2 id="business-overview-heading">사업 분야</h2>
          </div>
          <Link className="text-link" href="/business">
            사업 분야 자세히 보기
          </Link>
        </div>
        <ul className="business-list">
          <li>
            <div className="business-list__heading"><h3>금형 설계</h3></div>
            <p>제품 아이디어와 도면을 바탕으로 제품 및 금형을 설계하고 제작합니다.</p>
          </li>
          <li>
            <div className="business-list__heading"><h3>우레탄 성형·발포</h3></div>
            <p>원하는 형상에 맞춘 우레탄 제품의 주문 생산과 OEM 생산을 진행합니다.</p>
          </li>
        </ul>
      </section>

      <section
        className="home-section product-overview"
        aria-labelledby="product-overview-heading"
        data-home-section="representative-product"
      >
        <div>
          <p className="eyebrow">대표 제품</p>
          <h2 id="product-overview-heading">퍼즐형 층간소음매트</h2>
        </div>
        <div className="product-overview__content">
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
            <dt>주소</dt>
            <dd>{site.address}</dd>
          </div>
        </dl>
      </section>

      <section
        className="home-section home-contact"
        aria-labelledby="contact-cta-heading"
        data-home-section="contact"
      >
        <h2 id="contact-cta-heading">전화 문의</h2>
        <div className="home-contact__links">
          <a className="primary-action" href={site.phoneHref} aria-label={`전화 문의 ${site.phone}`}>
            {site.phone}
          </a>
          <a className="text-link" href={site.emailHref} aria-label={`이메일 문의 ${site.email}`}>
            {site.email}
          </a>
        </div>
      </section>
    </div>
  );
}
