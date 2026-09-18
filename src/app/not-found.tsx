import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description: "입력한 주소를 확인하거나 홈으로 이동해 주세요.",
};

export default function NotFound() {
  return (
    <div className="page-intro">
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p className="page-intro__description">
        입력한 주소를 확인하거나 홈으로 이동해 주세요.
      </p>
      <Link className="primary-action" href="/">
        홈으로 이동
      </Link>
      <p>
        <Link className="text-link" href="/contact">문의</Link>
      </p>
    </div>
  );
}
