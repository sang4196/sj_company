import { partSpecifications, rugSpecifications, squareSpecifications } from "./specifications";

function ShapeExample({ shape, label, dimensions }: {
  shape: "square" | "rectangle" | "hexagon" | "rug";
  label: string;
  dimensions: string;
}) {
  return (
    <figure className="product-shape">
      <svg viewBox="0 0 280 190" aria-hidden="true" focusable="false">
        {shape === "hexagon" ? (
          <path d="M95 28H185L230 95L185 162H95L50 95Z" />
        ) : (
          <>
            <rect x={shape === "square" ? 75 : shape === "rug" ? 35 : 30}
              y={shape === "square" ? 30 : shape === "rug" ? 25 : 45}
              width={shape === "square" ? 130 : shape === "rug" ? 210 : 220}
              height={shape === "square" ? 130 : shape === "rug" ? 140 : 110} />
            {shape === "rug" && <path className="product-shape__seams" d="M105 25V165M175 25V165M35 95H245" />}
          </>
        )}
      </svg>
      <figcaption>
        <span className="product-shape__caption">제품 형태 예시 이미지 · {label}</span>
        <strong>{dimensions}</strong>
      </figcaption>
    </figure>
  );
}

export function ProductSpecifications() {
  return (
    <section className="products-section product-specifications" aria-labelledby="product-specifications-heading"
      data-products-section="specifications">
      <p className="eyebrow">Sizes &amp; Forms</p>
      <h2 id="product-specifications-heading">제품 규격</h2>
      <p className="product-specifications__intro">
        확인된 크기와 두께를 형태별로 안내합니다. 단위는 mm이며, 같은 크기에서도 두께는 제품에 따라 다릅니다.
      </p>
      <p className="product-specifications__note">
        아래 수치는 제품 표기치수입니다. 결합 후 유효치수와 연결부 포함 범위는 문의 시 확인해 주세요.
        형태 예시는 윤곽을 단순화한 도식으로, 실제 연결부·색상·표면을 나타내지 않습니다.
      </p>

      <section className="product-specification-group" aria-labelledby="square-specifications-heading">
        <div className="product-specification-group__visual">
          <h3 id="square-specifications-heading">정사각 매트</h3>
          <ShapeExample shape="square" label="정사각형" dimensions="680 × 680 × 22 mm" />
        </div>
        <div>
          <table className="product-specification-table">
            <caption>정사각 매트 표기치수 · 단위 mm</caption>
            <thead><tr><th scope="col">가로 × 세로</th><th scope="col">두께</th></tr></thead>
            <tbody>{squareSpecifications.map((spec) => (
              <tr key={spec.size}><th scope="row">{spec.size}</th><td>{spec.thickness}</td></tr>
            ))}</tbody>
          </table>
          <p className="product-specifications__note">
            / 는 선택 가능한 각각의 두께를 구분합니다. 500·600·650 계열의 센터·사이드·코너별 상세 치수는 문의해 주세요.
          </p>
        </div>
      </section>

      <section className="product-specification-group" aria-labelledby="part-specifications-heading">
        <div className="product-specification-group__visual">
          <h3 id="part-specifications-heading">사이드·코너·복도형</h3>
          <ShapeExample shape="rectangle" label="사이드" dimensions="1,300 × 650 × 24 mm" />
        </div>
        <table className="product-specification-table">
          <caption>부품별 표기치수 · 단위 mm</caption>
          <thead><tr><th scope="col">구분 / 가로 × 세로</th><th scope="col">두께</th></tr></thead>
          <tbody>{partSpecifications.map((spec) => (
            <tr key={spec.type}><th scope="row"><span className="product-specification-table__type">{spec.type}</span>{" "}{spec.size}</th><td>{spec.thickness}</td></tr>
          ))}</tbody>
        </table>
      </section>

      <section className="product-specification-group" aria-labelledby="hexagon-specifications-heading">
        <div className="product-specification-group__visual">
          <h3 id="hexagon-specifications-heading">육각 매트</h3>
          <ShapeExample shape="hexagon" label="육각형" dimensions="표기치수 460 × 460 mm · 두께 21 mm" />
        </div>
        <div>
          <table className="product-specification-table">
            <caption>육각 매트 표기치수 · 단위 mm</caption>
            <thead><tr><th scope="col">표기치수</th><th scope="col">두께</th></tr></thead>
            <tbody><tr><th scope="row">460 × 460</th><td>21</td></tr></tbody>
          </table>
          <p className="product-specifications__note">
            육각형의 측정 방향과 꼭짓점·변 기준은 확인이 필요합니다. 표기치수를 한 변의 길이나 시공 면적으로 환산하지 않습니다.
          </p>
        </div>
      </section>

      <section className="product-specification-group" aria-labelledby="rug-specifications-heading">
        <div className="product-specification-group__visual">
          <h3 id="rug-specifications-heading">러그형 세트</h3>
          <ShapeExample shape="rug" label="6장 구성" dimensions="3,000 × 2,000 × 23 mm" />
        </div>
        <div>
          <table className="product-specification-table">
            <caption>러그형 단위 매트와 구성별 표기치수 · 단위 mm</caption>
            <thead><tr><th scope="col">구성 / 가로 × 세로</th><th scope="col">두께</th></tr></thead>
            <tbody>{rugSpecifications.map((spec) => (
              <tr key={spec.type}><th scope="row"><span className="product-specification-table__type">{spec.type}</span>{" "}{spec.size}</th><td>{spec.thickness}</td></tr>
            ))}</tbody>
          </table>
          <p className="product-specifications__note">
            여러 장을 조합한 구성입니다. 전체 크기는 구성도 표기 기준이며, 납품 구성과 마감 치수는 문의 시 확인해 주세요.
          </p>
        </div>
      </section>
    </section>
  );
}
