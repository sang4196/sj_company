export const site = {
  url: "https://www.seungjong.co.kr",
  name: "(주)승종",
  representative: "배진현",
  founded: "2017",
  address: "경기도 안성시 서운면 사갑1길 296-49",
  // Google Maps Share → Embed map, verified against the address on 2026-10-01.
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x357b32690d9c9b9b%3A0xfb351da8dfabaffd!2z6rK96riw64-EIOyViOyEseyLnCDshJzsmrTrqbQg7IKs6rCRMeq4uCAyOTYtNDk!5e0!3m2!1sko!2skr!4v1790784541312!5m2!1sko!2skr",
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
