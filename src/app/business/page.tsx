import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "사업 분야",
  description: "(주)승종의 제품 및 금형 설계·제작과 우레탄 성형·발포 업무를 안내합니다.",
};

export default function BusinessPage() {
  return (
    <div className="business-page">
      <section
        className="business-section business-intro"
        aria-labelledby="business-heading"
        data-business-section="introduction"
      >
        <p className="eyebrow">Business</p>
        <h1 id="business-heading">사업 분야</h1>
        <p className="business-intro__message">
          제품 설계부터 금형 제작, 우레탄 성형·발포까지
        </p>
        <p className="business-intro__description">
          {site.name}은 고객의 도면이나 제품 아이디어를 바탕으로 제품 설계와 금형
          설계·제작을 진행하고, 우레탄 성형·발포를 통해 제품을 생산합니다.
        </p>
      </section>

      <section
        className="business-section"
        aria-labelledby="capabilities-heading"
        data-business-section="capabilities"
      >
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Capabilities</p>
            <h2 id="capabilities-heading">주요 업무</h2>
          </div>
        </div>

        <div className="business-capabilities">
          <article>
            <span className="item-index" aria-hidden="true">01</span>
            <h3>제품 및 금형 설계·제작</h3>
            <p>
              인테그랄 스킨 폼, 층간소음매트 등 우레탄 폼 제품과 자동차 부품·사무용
              가구에 사용되는 금형을 설계하고 제작합니다. 고객이 제공한 도면을
              활용하거나, 제품 아이디어를 설계로 구체화하여 진행할 수 있습니다.
            </p>
          </article>

          <article>
            <span className="item-index" aria-hidden="true">02</span>
            <h3>우레탄 성형·발포</h3>
            <p>
              스펀지, 베개, 층간소음매트, 자동차 부품 등 우레탄 제품을 성형·발포합니다.
              제품 설계 및 금형 제작과 연계한 생산이 가능하며, 고객이 원하는 형상에
              맞춘 주문 생산과 OEM 생산을 진행합니다.
            </p>
          </article>
        </div>
      </section>

      <section
        className="business-section business-process"
        aria-labelledby="process-heading"
        data-business-section="linked-process"
      >
        <div>
          <p className="eyebrow">Connected Scope</p>
          <h2 id="process-heading">설계와 제조의 연계</h2>
          <p className="business-process__description">
            필요한 업무 범위에 따라 설계와 제조를 연계해 진행할 수 있습니다.
          </p>
        </div>
        <ol className="business-process__steps" aria-label="연계 가능한 업무 범위">
          <li>제품 설계</li>
          <li>금형 설계·제작</li>
          <li>우레탄 성형·발포</li>
        </ol>
      </section>

      <section
        className="business-section business-product"
        aria-labelledby="business-product-heading"
        data-business-section="representative-product"
      >
        <div>
          <p className="eyebrow">Representative Product</p>
          <h2 id="business-product-heading">퍼즐형 층간소음매트</h2>
        </div>
        <div className="business-product__content">
          <p>
            대표 제품인 퍼즐형 층간소음매트는 우레탄 성형·발포 공정으로 생산합니다.
          </p>
          <Link className="text-link" href="/products">
            대표 제품 보기
          </Link>
        </div>
      </section>

      <section
        className="business-section contact-section"
        aria-labelledby="business-contact-heading"
        data-business-section="contact"
      >
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="business-contact-heading">사업 문의</h2>
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
