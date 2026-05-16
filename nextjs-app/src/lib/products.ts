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

// Mock products for demo/development
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "the-pause-book",
    title: "The Pause",
    author: "Jane",
    category: "books",
    price: 24.99,
    description: "A guide to intentional living",
    longDescription: "Learn how to pause and reflect in our fast-paced world.",
    digital: false,
    images: ["https://images.unsplash.com/photo-1507842217343-583f20270319?auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: "2",
    slug: "conversations-that-matter",
    title: "Conversations That Matter",
    author: "Jane",
    category: "books",
    price: 22.99,
    description: "Deep dialogues for meaningful relationships",
    longDescription: "Explore how to have conversations that truly connect.",
    digital: false,
    images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: "3",
    slug: "parenting-with-intention",
    title: "Parenting with Intention",
    author: "Jane",
    category: "books",
    price: 26.99,
    description: "Thoughtful approaches to raising children",
    longDescription: "A practical guide for intentional parenting.",
    digital: false,
    images: ["https://images.unsplash.com/photo-1507842217343-583f20270319?auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: "4",
    slug: "mindfulness-course",
    title: "Mindfulness Essentials",
    category: "courses",
    price: 49.99,
    description: "8-week course on mindfulness and meditation",
    longDescription: "Learn practical mindfulness techniques for daily life.",
    digital: true,
    images: ["https://images.unsplash.com/photo-1516321318423-f06f70504504?auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: "5",
    slug: "writing-course",
    title: "Writing Your Story",
    category: "courses",
    price: 59.99,
    description: "Learn to write with clarity and purpose",
    longDescription: "A comprehensive course on personal and professional writing.",
    digital: true,
    images: ["https://images.unsplash.com/photo-1455849318169-8c8e4f1a629b?auto=format&fit=crop&w=800&q=80"],
  },
];

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data as Row[]).map(mapRow);
  } catch (error) {
    // Return mock data if Supabase fails
    console.warn("Using mock products - Supabase not configured");
    return MOCK_PRODUCTS;
  }
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
  // Return empty array if query fails (e.g., missing Supabase config)
  return { ...q, data: q.data?.filter((p) => p.category === cat) ?? [] };
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
  });
}

// Editorial content (static)
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
