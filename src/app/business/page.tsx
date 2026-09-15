import type { Metadata } from "next";

export const metadata: Metadata = { title: "사업 분야" };

export default function BusinessPage() {
  return (
    <section className="page-intro" aria-labelledby="business-heading">
      <p className="eyebrow">Business</p>
      <h1 id="business-heading">사업 분야</h1>
      <ul className="fact-list" aria-label="사업 분야 목록">
        <li>금형 설계</li>
        <li>우레탄 성형·발포</li>
      </ul>
    </section>
  );
}
