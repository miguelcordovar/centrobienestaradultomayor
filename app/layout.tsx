import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-title",
  display: "swap",
});
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#176B73",
};
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "VivaMayor | Centro de Bienestar para Adultos Mayores en Piura",
  description:
    "Centro diurno de bienestar para adultos mayores en Piura, con alimentación, actividades, acompañamiento y enfermería básica. Solicita información o agenda una visita.",
  keywords: [
    "Centro de día para adultos mayores en Piura",
    "Centro de bienestar para adultos mayores",
    "Cuidado diurno del adulto mayor",
    "Actividades para adultos mayores en Piura",
    "Acompañamiento para adultos mayores",
  ],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: "es_PE",
    title: "VivaMayor | Centro de Bienestar en Piura",
    description: "Bienestar, compañía y tranquilidad cada día.",
    url: siteConfig.url,
    images: [
      {
        url: `${siteConfig.url}/images/hero-vivamayor.webp`,
        width: 1400,
        height: 700,
        alt: "Personas adultas mayores compartiendo una actividad en VivaMayor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VivaMayor Centro de Bienestar",
    description: "Una vida activa, acompañada y cerca de la familia.",
    images: [`${siteConfig.url}/images/hero-vivamayor.webp`],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
