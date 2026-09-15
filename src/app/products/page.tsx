import type { Metadata } from "next";

export const metadata: Metadata = { title: "제품" };

export default function ProductsPage() {
  return (
    <section className="page-intro" aria-labelledby="products-heading">
      <p className="eyebrow">Products</p>
      <h1 id="products-heading">제품</h1>
      <p className="page-intro__description">대표 제품: 퍼즐형 층간소음매트</p>
    </section>
  );
}
