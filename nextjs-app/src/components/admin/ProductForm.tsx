"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Category, Product } from "@/lib/products";

export type ProductFormValues = {
  slug: string;
  title: string;
  author: string;
  category: Category;
  price: string;
  description: string;
  longDescription: string;
  digital: boolean;
  images: string;
};

export const empty: ProductFormValues = {
  slug: "",
  title: "",
  author: "",
  category: "books",
  price: "0",
  description: "",
  longDescription: "",
  digital: false,
  images: "",
};

export const fromProduct = (p: Product): ProductFormValues => ({
  slug: p.slug,
  title: p.title,
  author: p.author ?? "",
  category: p.category,
  price: String(p.price),
  description: p.description,
  longDescription: p.longDescription,
  digital: p.digital,
  images: p.images.join("\n"),
});

export function ProductForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial: ProductFormValues;
  submitLabel: string;
  onSubmit: (values: {
    slug: string;
    title: string;
    author: string | null;
    category: Category;
    price: number;
    description: string;
    long_description: string;
    digital: boolean;
    images: string[];
  }) => Promise<{ error?: string }>;
}) {
  const router = useRouter();
  const [v, setV] = useState<ProductFormValues>(initial);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof ProductFormValues>(
    k: K,
    val: ProductFormValues[K],
  ) => setV((p) => ({ ...p, [k]: val }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    setSaving(true);
    const res = await onSubmit({
      slug: v.slug.trim(),
      title: v.title.trim(),
      author: v.author.trim() || null,
      category: v.category,
      price: parseFloat(v.price) || 0,
      description: v.description.trim(),
      long_description: v.longDescription.trim(),
      digital: v.digital,
      images: v.images
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    });
    setSaving(false);
    if (res.error) return setErr(res.error);
    router.push("/admin/products");
  };

  const input =
    "w-full rounded-xl border border-border bg-card px-4 py-2.5 text-charcoal focus:border-terracotta focus:outline-none";

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Title" required>
          <input
            className={input}
            required
            value={v.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </Field>
        <Field label="Slug (URL)" required>
          <input
            className={input}
            required
            value={v.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="the-pause"
          />
        </Field>
        <Field label="Author">
          <input
            className={input}
            value={v.author}
            onChange={(e) => set("author", e.target.value)}
          />
        </Field>
        <Field label="Category" required>
          <select
            className={input}
            value={v.category}
            onChange={(e) => set("category", e.target.value as Category)}
          >
            <option value="books">Books</option>
            <option value="courses">Courses</option>
            <option value="apparel">Apparel</option>
          </select>
        </Field>
        <Field label="Price (USD)" required>
          <input
            className={input}
            type="number"
            step="0.01"
            min="0"
            required
            value={v.price}
            onChange={(e) => set("price", e.target.value)}
          />
        </Field>
        <Field label="Type">
          <label className="flex h-[42px] items-center gap-3 rounded-xl border border-border bg-card px-4">
            <input
              type="checkbox"
              checked={v.digital}
              onChange={(e) => set("digital", e.target.checked)}
            />
            <span className="text-sm text-charcoal/80">Digital product</span>
          </label>
        </Field>
      </div>

      <Field label="Short description" required>
        <textarea
          className={input}
          rows={2}
          required
          value={v.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </Field>
      <Field label="Long description">
        <textarea
          className={input}
          rows={5}
          value={v.longDescription}
          onChange={(e) => set("longDescription", e.target.value)}
        />
      </Field>
      <Field label="Image URLs (one per line)">
        <textarea
          className={`${input} font-mono text-xs`}
          rows={4}
          value={v.images}
          onChange={(e) => set("images", e.target.value)}
          placeholder="https://images.unsplash.com/..."
        />
      </Field>

      {err && (
        <p className="rounded-xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {err}
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-terracotta px-6 py-2.5 text-sm text-cream hover:bg-terracotta-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        <Link
          href="/admin/products"
          className="rounded-full border border-border px-6 py-2.5 text-sm text-charcoal/80 hover:bg-secondary"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-charcoal/60">
        {label}
        {required && <span className="text-terracotta"> *</span>}
      </span>
      {children}
    </label>
  );
}
