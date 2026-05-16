import type { Metadata } from "next";
import { CategoryPage } from "@/components/site/CategoryPage";

export const metadata: Metadata = {
  title: "Books",
  description: "Books from Pavulum Press for parents, partners, and humans.",
  openGraph: {
    title: "Books — Pavulum",
    description: "Books from Pavulum Press.",
  },
  alternates: { canonical: "/books" },
};

export default function BooksPage() {
  return (
    <CategoryPage
      title="The library"
      subtitle="Small books with long lives."
      cat="books"
    />
  );
}
