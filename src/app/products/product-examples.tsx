function ShapeExample({ shape, label }: {
  shape: "square" | "hexagon" | "rug";
  label: string;
}) {
  return (
    <figure className="product-shape">
      <svg viewBox="0 0 280 190" aria-hidden="true" focusable="false">
        {shape === "hexagon" ? (
          <path d="M95 28H185L230 95L185 162H95L50 95Z" />
        ) : (
          <>
            <rect x={shape === "square" ? 75 : 35}
              y={shape === "square" ? 30 : 25}
              width={shape === "square" ? 130 : 210}
              height={shape === "square" ? 130 : 140} />
            {shape === "rug" && <path className="product-shape__seams" d="M105 25V165M175 25V165M35 95H245" />}
          </>
        )}
      </svg>
      <figcaption>
        <span className="product-shape__caption">제품 형태 예시 이미지 · {label}</span>
      </figcaption>
    </figure>
  );
}

export function ProductExamples() {
  return (
    <section className="products-section product-examples" aria-labelledby="product-examples-heading"
      data-products-section="examples">
      <p className="eyebrow">다양한 형태의 매트</p>
      <h2 id="product-examples-heading">제품 형태 예시</h2>
      <p className="product-examples__availability">모든 치수 양산 가능</p>
      <p className="product-examples__note">
        형태 예시는 윤곽을 단순화한 도식으로, 실제 연결부·색상·표면을 나타내지 않습니다.
      </p>
      <div className="product-examples__grid">
        <div>
          <h3>사각형 매트</h3>
          <ShapeExample shape="square" label="사각형" />
        </div>
        <div>
          <h3>육각 매트</h3>
          <ShapeExample shape="hexagon" label="육각형" />
        </div>
        <div>
          <h3>러그형 세트</h3>
          <ShapeExample shape="rug" label="조합형" />
        </div>
      </div>
    </section>
  );
}
