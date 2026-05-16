"use client";

import Link from "next/link";
import { use } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductForm, fromProduct } from "@/components/admin/ProductForm";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/lib/products";

export default function EditProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const qc = useQueryClient();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product-id", id],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return {
        id: data.id,
        slug: data.slug,
        title: data.title,
        author: data.author,
        category: data.category as Product["category"],
        price:
          typeof data.price === "string" ? parseFloat(data.price) : data.price,
        description: data.description ?? "",
        longDescription: data.long_description ?? "",
        digital: data.digital,
        images: data.images ?? [],
      };
    },
  });

  return (
    <div>
      <Link
        href="/admin/products"
        className="text-sm text-charcoal/60 hover:text-terracotta"
      >
        ← Back to products
      </Link>
      <h1 className="mt-3 font-serif text-4xl text-deep-brown">Edit product</h1>

      {isLoading && <p className="mt-8 text-charcoal/60">Loading…</p>}
      {!isLoading && !product && (
        <p className="mt-8 text-charcoal/60">Not found.</p>
      )}
      {product && (
        <div className="mt-8">
          <ProductForm
            initial={fromProduct(product)}
            submitLabel="Save changes"
            onSubmit={async (values) => {
              const { error } = await supabase
                .from("products")
                .update(values)
                .eq("id", id);
              if (error) return { error: error.message };
              qc.invalidateQueries({ queryKey: ["products"] });
              qc.invalidateQueries({ queryKey: ["product-id", id] });
              qc.invalidateQueries({ queryKey: ["product", values.slug] });
              return {};
            }}
          />
        </div>
      )}
    </div>
  );
}
