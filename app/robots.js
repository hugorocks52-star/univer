import { siteConfig } from "@/lib/site-data";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/panel"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
