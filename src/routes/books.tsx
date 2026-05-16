import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { useProductsByCategory, type Category } from "@/lib/products";

type Cfg = { title: string; subtitle: string; cat: Category };

export function CategoryPage({ title, subtitle, cat }: Cfg) {
  const { data: items } = useProductsByCategory(cat);
  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-soft-gold">{cat}</p>
          <h1 className="mt-3 font-serif text-5xl text-deep-brown">{title}</h1>
          <p className="mt-3 italic text-charcoal/70">{subtitle}</p>
        </header>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </SiteLayout>
  );
}

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Books — Pavulum" },
      { name: "description", content: "Books from Pavulum Press for parents, partners, and humans." },
      { property: "og:title", content: "Books — Pavulum" },
      { property: "og:description", content: "Books from Pavulum Press." },
    ],
    links: [{ rel: "canonical", href: "/books" }],
  }),
  component: () => (
    <CategoryPage
      title="The library"
      subtitle="Small books with long lives."
      cat="books"
    />
  ),
});
