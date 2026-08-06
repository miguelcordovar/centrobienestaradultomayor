export const siteConfig = {
  name: "VivaMayor",
  descriptor: "Centro de Bienestar",
  slogan: "Bienestar, compañía y tranquilidad cada día.",
  city: "Piura, Perú",
  schedule: "Lunes a viernes · 8:00 a. m. a 6:00 p. m.",
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
  regularPrice: "S/2,250",
  launchPrice: "S/2,200",
} as const;

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const assetPath = (path: string) => `${basePath}${path}`;
export const pagePath = (path: string) => `${basePath}${path}`;

export const whatsappHref = siteConfig.whatsapp
  ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hola, deseo recibir información sobre VivaMayor Centro de Bienestar en Piura.")}`
  : "";
