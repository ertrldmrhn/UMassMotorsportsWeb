import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
/**
 * Required by `output: "export"`: route handlers must opt in to being emitted
 * as a static file at build time rather than served per request.
 */
export const dynamic = "force-static";


/**
 * Generated at build time into out/robots.txt. Everything here is public, so
 * nothing is disallowed; the point is pointing crawlers at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
