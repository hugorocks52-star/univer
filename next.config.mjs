/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const legacyHosts = [
      "universurgical.ir",
      "universurgical.com",
      "www.universurgical.com",
    ];

    return legacyHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: "https://www.universurgical.ir/:path*",
      permanent: true,
    }));
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  turbopack: {
    root: process.cwd(),
  },
  reactStrictMode: true,
};

export default nextConfig;
