import type { NextConfig } from "next";
const nextConfig: NextConfig = { images: { formats: ["image/avif", "image/webp"], qualities: [55, 75] }, poweredByHeader: false };
export default nextConfig;
