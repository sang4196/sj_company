// Verified source mapping and unresolved measurement bases: docs/product-spec-evidence.md.
// Thickness choices belong only to their own row; never form a cross-product across rows.
export const squareSpecifications = [
  { size: "500 × 500", thickness: "22 / 25" },
  { size: "600 × 600", thickness: "21" },
  { size: "650 × 650", thickness: "24" },
  { size: "680 × 680", thickness: "21 / 22 / 26" },
  { size: "1,000 × 1,000", thickness: "22 / 24" },
  { size: "1,200 × 1,200", thickness: "24" },
  { size: "1,300 × 1,300", thickness: "24" },
];

export const partSpecifications = [
  { type: "사이드 · 1,000 계열", size: "1,040 × 1,000", thickness: "24" },
  { type: "코너 · 1,000 계열", size: "1,040 × 1,040", thickness: "24" },
  { type: "복도형 · 1,000 계열", size: "640 × 1,000", thickness: "24" },
  { type: "복도형 · 1,200 계열", size: "640 × 1,200", thickness: "24" },
  { type: "사이드 · 1,300 계열", size: "1,300 × 650", thickness: "24" },
];

export const rugSpecifications = [
  { type: "단위 매트 · 1장", size: "1,000 × 1,000", thickness: "23" },
  { type: "4장 구성", size: "2,000 × 2,000", thickness: "23" },
  { type: "6장 구성", size: "3,000 × 2,000", thickness: "23" },
  { type: "8장 구성", size: "4,000 × 2,000", thickness: "23" },
  { type: "9장 구성", size: "3,000 × 3,000", thickness: "23" },
  { type: "12장 구성", size: "4,000 × 3,000", thickness: "23" },
];
