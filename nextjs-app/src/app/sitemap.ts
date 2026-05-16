import type { MetadataRoute } from "next";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pavulum.com";

export const revalidate = 3600; // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/shop",
    "/books",
    "/courses",
    "/apparel",
    "/podcast",
    "/journal",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));

  let productRoutes: MetadataRoute.Sitemap = [];
  
  // Only fetch products if env vars are available
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { data } = await supabaseAdmin.from("products").select("slug");
      productRoutes = (data ?? []).map((p) => ({
        url: `${BASE_URL}/product/${p.slug}`,
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    } catch (error) {
      console.warn("Failed to fetch products for sitemap:", error);
    }
  }

  return [...staticRoutes, ...productRoutes];
}
