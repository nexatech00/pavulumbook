import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Category = "books" | "courses" | "apparel";

export type Product = {
  id: string;
  slug: string;
  title: string;
  author?: string | null;
  category: Category;
  price: number;
  description: string;
  longDescription: string;
  digital: boolean;
  images: string[];
};

type Row = {
  id: string;
  slug: string;
  title: string;
  author: string | null;
  category: string;
  price: number | string;
  description: string;
  long_description: string;
  digital: boolean;
  images: string[] | null;
};

const mapRow = (r: Row): Product => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  author: r.author,
  category: r.category as Category,
  price: typeof r.price === "string" ? parseFloat(r.price) : r.price,
  description: r.description ?? "",
  longDescription: r.long_description ?? "",
  digital: r.digital,
  images: r.images ?? [],
});

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data as Row[]).map(mapRow);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRow(data as Row) : null;
}

export function useProducts() {
  return useQuery({ queryKey: ["products"], queryFn: fetchProducts });
}

export function useProductsByCategory(cat: Category) {
  const q = useProducts();
  return { ...q, data: q.data?.filter((p) => p.category === cat) ?? [] };
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
  });
}

// Editorial content (still static)
export const essays = [
  {
    slug: "why-we-stop-listening",
    title: "Why we stop listening (and how to start)",
    readTime: "5 min read",
    excerpt:
      "Somewhere between the ages of seven and seventeen, most of us stop listening. Here is how to find your way back.",
  },
  {
    slug: "letter-to-my-younger-self",
    title: "A letter to my younger self",
    readTime: "4 min read",
    excerpt: "What I'd say to her, if she'd stop long enough to hear me.",
  },
  {
    slug: "the-art-of-doing-nothing",
    title: "The art of doing nothing",
    readTime: "6 min read",
    excerpt: "On idleness, and why it might be the most productive thing you do this week.",
  },
];

export const episodes = [
  {
    slug: "parenting-without-perfection",
    title: "Parenting without perfection",
    description:
      "A conversation about showing up messy, apologizing, and starting over.",
    duration: "42 min",
  },
  {
    slug: "the-conversations-we-avoid",
    title: "The conversations we avoid",
    description: "Why the hardest sentences are usually the ones worth saying.",
    duration: "38 min",
  },
  {
    slug: "rest-as-resistance",
    title: "Rest as resistance",
    description: "An interview with a sleep researcher and a tired mother of three.",
    duration: "51 min",
  },
];
