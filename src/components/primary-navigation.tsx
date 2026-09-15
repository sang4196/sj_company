"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/lib/site";

export function PrimaryNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="주요 메뉴">
      <ul className="primary-navigation">
        {primaryNavigation.map((item) => (
          <li key={item.href}>
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              className="navigation-link"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
