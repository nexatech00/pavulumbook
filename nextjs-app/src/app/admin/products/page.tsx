"use client";

import Link from "next/link";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { useProducts } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";

export default function AdminProducts() {
  const { data: products = [], isLoading } = useProducts();
  const qc = useQueryClient();

  const remove = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return alert(error.message);
    qc.invalidateQueries({ queryKey: ["products"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-4xl text-deep-brown">Products</h1>
          <p className="mt-1 text-charcoal/70">{products.length} items</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-terracotta px-5 py-2.5 text-sm text-cream hover:bg-terracotta-dark"
        >
          + New product
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-left">
          <thead className="border-b border-border bg-secondary/40 text-xs uppercase tracking-wider text-charcoal/60">
            <tr>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-charcoal/60">
                  Loading…
                </td>
              </tr>
            )}
            {!isLoading && products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-charcoal/60">
                  No products yet.
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {p.images[0] && (
                      <Image
                        src={p.images[0]}
                        alt=""
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-deep-brown">{p.title}</p>
                      <p className="text-xs text-charcoal/60">/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 capitalize text-charcoal/80">{p.category}</td>
                <td className="px-5 py-4 text-charcoal/80">${p.price.toFixed(2)}</td>
                <td className="px-5 py-4 text-charcoal/80">
                  {p.digital ? "Digital" : "Physical"}
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-charcoal/70 hover:bg-secondary hover:text-terracotta"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => remove(p.id, p.title)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-charcoal/70 hover:bg-secondary hover:text-destructive"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
