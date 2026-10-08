import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
/**
 * Required by `output: "export"`: route handlers must opt in to being emitted
 * as a static file at build time rather than served per request.
 */
export const dynamic = "force-static";


/**
 * Tells search engines which pages exist. Generated at build time into
 * out/sitemap.xml, which is what you submit in Google Search Console.
 *
 * Routes are listed by hand because there are few of them and they rarely
 * change. Add new pages here when you add them to the nav.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/schedule", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/photos", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/forms", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/sponsors", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
