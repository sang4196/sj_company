import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ProductSpecifications } from "./product-specifications";

export const metadata: Metadata = {
  alternates: { canonical: "/products" },
  title: "제품",
  description: "(주)승종의 대표 제품인 퍼즐형 층간소음매트를 소개합니다.",
};

export default function ProductsPage() {
  return (
    <div className="products-page">
      <section
        className="products-section products-intro"
        aria-labelledby="products-heading"
        data-products-section="introduction"
      >
        <h1 id="products-heading">제품</h1>
        <p className="products-intro__label">대표 제품</p>
        <h2>퍼즐형 층간소음매트</h2>
        <p className="products-intro__description">
          퍼즐형 층간소음매트는 {site.name}의 대표 제품으로, 우레탄 성형·발포 공정으로
          생산합니다.
        </p>
      </section>

      <section
        className="products-section product-facts"
        aria-labelledby="product-facts-heading"
        data-products-section="confirmed-information"
      >
        <div>
          <h2 id="product-facts-heading">확인된 제품 정보</h2>
        </div>
        <dl className="product-facts__list">
          <div>
            <dt>형태</dt>
            <dd>퍼즐 형태</dd>
          </div>
          <div>
            <dt>제품 범주</dt>
            <dd>층간소음매트</dd>
          </div>
          <div>
            <dt>생산 방식</dt>
            <dd>우레탄 성형·발포</dd>
          </div>
        </dl>
      </section>

      <ProductSpecifications />

      <section
        className="products-section product-business-link"
        aria-labelledby="product-business-heading"
        data-products-section="business-link"
      >
        <div>
          <h2 id="product-business-heading">설계·제조 사업</h2>
        </div>
        <div className="product-business-link__content">
          <p>제품 설계와 금형 제작, 우레탄 성형·발포 업무는 사업 분야에서 확인할 수 있습니다.</p>
          <Link className="text-link" href="/business">
            설계·제조 사업 보기
          </Link>
        </div>
      </section>

      <section
        className="products-section contact-section"
        aria-labelledby="product-contact-heading"
        data-products-section="contact"
      >
        <div>
          <h2 id="product-contact-heading">제품 문의</h2>
          <p className="contact-section__number">{site.phone}</p>
        </div>
        <div className="contact-actions">
          <a className="primary-action primary-action--inverse" href={site.phoneHref}>
            전화 문의
          </a>
          <a
            className="secondary-contact"
            href={site.emailHref}
            aria-label={`이메일 문의 ${site.email}`}
          >
            이메일 {site.email}
          </a>
        </div>
      </section>
    </div>
  );
}
