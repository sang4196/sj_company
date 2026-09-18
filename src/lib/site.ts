export const site = {
  url: "https://www.seungjong.co.kr",
  name: "(주)승종",
  founded: "2017",
  address: "경기도 안성시 서운면 사갑1길 296-49",
  phone: "031-674-3640",
  phoneHref: "tel:031-674-3640",
  email: "sjbjh3613@daum.net",
  emailHref: "mailto:sjbjh3613@daum.net",
} as const;

export const primaryNavigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/business", label: "Business" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
] as const;
