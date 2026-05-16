"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { useProduct, useProducts } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductPageClient({ slug }: { slug: string }) {
  const { data: product, isLoading } = useProduct(slug);
  const { data: allProducts = [] } = useProducts();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-6 py-32 text-center text-charcoal/60">
          Loading…
        </div>
      </SiteLayout>
    );
  }

  if (!product) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <h1 className="font-serif text-4xl text-deep-brown">Not found</h1>
          <p className="mt-3 text-charcoal/70">We couldn't find that product.</p>
          <Link href="/shop" className="mt-6 inline-block text-terracotta hover:underline">
            ← Back to shop
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Link
          href="/shop"
          className="mb-10 inline-block text-sm text-charcoal/60 hover:text-terracotta"
        >
          ← Back to shop
        </Link>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-2xl bg-secondary">
              <Image
                src={product.images[active]}
                alt={product.title}
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActive(i)}
                    className={`overflow-hidden rounded-lg border ${
                      i === active ? "border-terracotta" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      width={150}
                      height={150}
                      className="aspect-square w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-soft-gold">
              {product.category}
            </p>
            <h1 className="mt-2 font-serif text-4xl text-deep-brown sm:text-5xl">
              {product.title}
            </h1>
            {product.author && (
              <p className="mt-2 italic text-soft-gold">{product.author}</p>
            )}
            <p className="mt-6 text-2xl text-deep-brown">${product.price.toFixed(2)}</p>
            <p className="mt-6 leading-relaxed text-charcoal/85">
              {product.longDescription}
            </p>

            {product.digital && (
              <p className="mt-5 rounded-2xl bg-secondary/70 px-4 py-3 text-sm italic text-deep-brown">
                Buy once, access forever. Digital delivery to your inbox.
              </p>
            )}

            <div className="mt-8 flex items-center gap-4">
              <div className="inline-flex items-center rounded-full border border-border bg-card">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-3 text-charcoal/70 hover:text-terracotta"
                  aria-label="Decrease"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-charcoal">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="p-3 text-charcoal/70 hover:text-terracotta"
                  aria-label="Increase"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  add(product.id, qty);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1500);
                }}
                className="rounded-full bg-terracotta px-7 py-3 text-cream transition-colors hover:bg-terracotta-dark"
              >
                {added ? "Added ✓" : "Add to cart"}
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="mb-8 font-serif text-3xl text-deep-brown">
              You may also like
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/product/${r.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-2xl bg-secondary">
                    <Image
                      src={r.images[0]}
                      alt={r.title}
                      width={400}
                      height={500}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <h3 className="mt-3 font-serif text-xl text-deep-brown">{r.title}</h3>
                  <p className="text-sm text-charcoal/70">${r.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
