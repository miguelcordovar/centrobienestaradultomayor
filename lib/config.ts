export const siteConfig = {
  name: "Vitalia",
  descriptor: "Centro de Bienestar",
  slogan: "Más vida en cada día.",
  city: "Piura, Perú",
  schedule: "Lunes a sábado · 8:00 a. m. a 6:00 p. m.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "",
  phone: process.env.NEXT_PUBLIC_PHONE || "",
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  address: process.env.NEXT_PUBLIC_ADDRESS || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  claimsBook: process.env.NEXT_PUBLIC_CLAIMS_BOOK_URL || "",
  showPricing: process.env.NEXT_PUBLIC_SHOW_PRICING !== "false",
  regularPrice: "S/1,500",
  launchPrice: "S/1,500",
} as const;

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const assetPath = (path: string) => `${basePath}${path}`;
export const pagePath = (path: string) => `${basePath}${path}`;

export const whatsappHref = siteConfig.whatsapp
  ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hola, deseo recibir información sobre Vitalia Centro de Bienestar en Piura.")}`
  : "";
