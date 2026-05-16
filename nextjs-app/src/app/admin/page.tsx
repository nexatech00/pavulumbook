"use client";

import Link from "next/link";
import { useProducts } from "@/lib/products";

export default function AdminDashboard() {
  const { data: products = [] } = useProducts();
  const counts = {
    total: products.length,
    books: products.filter((p) => p.category === "books").length,
    courses: products.filter((p) => p.category === "courses").length,
    apparel: products.filter((p) => p.category === "apparel").length,
  };

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-4xl text-deep-brown">Dashboard</h1>
          <p className="mt-1 text-charcoal/70">Manage your shop.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-terracotta px-5 py-2.5 text-sm text-cream hover:bg-terracotta-dark"
        >
          + New product
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total products", value: counts.total },
          { label: "Books", value: counts.books },
          { label: "Courses", value: counts.courses },
          { label: "Apparel", value: counts.apparel },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-wider text-charcoal/60">{s.label}</p>
            <p className="mt-2 font-serif text-4xl text-deep-brown">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/admin/products" className="text-terracotta hover:underline">
          Manage products →
        </Link>
      </div>
    </div>
  );
}
