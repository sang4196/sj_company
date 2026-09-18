import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "회사 소개",
  description: `${site.founded}년 설립된 제조업체 ${site.name}의 회사 소개, 금형 설계 및 우레탄 성형·발포 사업과 기본 정보를 안내합니다.`,
};

type Registration = {
  title: string;
  number: string;
  date: string;
  basicDesign?: string;
};

// Only records with an explicit company holder in docs/brand-ip-evidence.md.
const patentRegistrations: Registration[] = [
  { title: "워셔블 베개", number: "제10-1992471호", date: "2019-06-18" },
  {
    title: "기능성 바닥마감재를 구비한 퍼즐형 쿠션매트",
    number: "제10-2436238호",
    date: "2022-08-22",
  },
];

const designRegistrations: Registration[] = [
  { title: "조립식 매트용 블록", number: "제30-1142566호", date: "2021-12-14" },
  {
    title: "조립식 매트용 블록",
    number: "제30-1142571호",
    date: "2021-12-14",
    basicDesign: "제30-1142566호",
  },
  { title: "조립식 매트용 블록", number: "제30-1168426호", date: "2022-06-10" },
  {
    title: "조립식 매트용 블록",
    number: "제30-1168430호",
    date: "2022-06-10",
    basicDesign: "제30-1168426호",
  },
  {
    title: "조립식 매트용 블록",
    number: "제30-1168431호",
    date: "2022-06-10",
    basicDesign: "제30-1168426호",
  },
  { title: "바닥매트용 연결부재", number: "제30-1294831호", date: "2025-02-11" },
];

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
        className="about-section about-registrations"
        aria-labelledby="about-registrations-heading"
        data-about-section="registrations"
      >
        <p className="eyebrow">Registrations</p>
        <h2 id="about-registrations-heading">특허·디자인 등록</h2>
        <p className="about-registrations__description">
          제공된 등록증에 주식회사 승종이 권리자로 기재된 특허·디자인의 등록 정보입니다.
          현재 권리의 유효 여부를 나타내지는 않습니다.
        </p>
        {[
          { id: "patents", label: "특허", records: patentRegistrations },
          { id: "designs", label: "디자인", records: designRegistrations },
        ].map((group) => (
          <div className="about-registrations__group" key={group.id}>
            <h3 id={`about-${group.id}-heading`}>{group.label}</h3>
            <ul className="about-registration-list" aria-labelledby={`about-${group.id}-heading`}>
              {group.records.map((record) => (
                <li key={record.number}>
                  <div>
                    <p className="about-registration-list__title">{record.title}</p>
                    {record.basicDesign && (
                      <p className="about-registration-list__relation">
                        관련디자인 · 기본디자인 {record.basicDesign}
                      </p>
                    )}
                  </div>
                  <dl className="about-registration-list__details">
                    <div>
                      <dt>등록번호</dt>
                      <dd>{record.number}</dd>
                    </div>
                    <div>
                      <dt>등록일</dt>
                      <dd><time dateTime={record.date}>{record.date}</time></dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
