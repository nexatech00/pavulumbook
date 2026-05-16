import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="overflow-hidden rounded-2xl bg-secondary">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-xl text-deep-brown">{product.title}</h3>
        {product.author && (
          <p className="text-sm italic text-soft-gold">{product.author}</p>
        )}
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm text-charcoal/80">${product.price.toFixed(2)}</span>
          <span className="text-sm text-terracotta group-hover:underline">Buy →</span>
        </div>
      </div>
    </Link>
  );
}
