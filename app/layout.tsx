import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/config";
import "./globals.css";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#176B73",
};
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Vitalia | Centro de Bienestar para Personas Mayores en Piura",
  description:
    "Centro diurno para personas mayores en Piura. Actividades, alimentación, enfermería básica y acompañamiento de lunes a sábado, con planes flexibles desde media jornada.",
  keywords: [
    "Centro diurno para personas mayores en Piura",
    "Centro de bienestar para personas mayores",
    "Actividades para adultos mayores en Piura",
    "Acompañamiento para personas mayores",
    "Vitalia Piura",
  ],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: "es_PE",
    title: "Vitalia Centro de Bienestar",
    description: "Más vida en cada día. Bienestar para ellos y tranquilidad para la familia.",
    url: siteConfig.url,
    images: [
      {
        url: `${siteConfig.url}/images/hero-vitalia.webp`,
        width: 1400,
        height: 700,
        alt: "Personas mayores compartiendo actividades en Vitalia, centro de bienestar en Piura",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitalia Centro de Bienestar",
    description: "Más vida en cada día. Bienestar para ellos y tranquilidad para la familia.",
    images: [`${siteConfig.url}/images/hero-vitalia.webp`],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
