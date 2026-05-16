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

  const { data } = await supabaseAdmin.from("products").select("slug");
  const productRoutes: MetadataRoute.Sitemap = (data ?? []).map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
