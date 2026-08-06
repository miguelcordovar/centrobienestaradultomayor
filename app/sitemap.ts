import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/privacidad", "/terminos"].map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: new Date(), changeFrequency: path ? "yearly" as const : "weekly" as const, priority: path ? 0.4 : 1 })); }
