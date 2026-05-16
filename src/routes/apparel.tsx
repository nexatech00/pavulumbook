import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "./books";

export const Route = createFileRoute("/apparel")({
  head: () => ({
    meta: [
      { title: "Apparel — Pavulum" },
      { name: "description", content: "Wear your values. Heavyweight basics in warm, lived-in tones." },
      { property: "og:title", content: "Apparel — Pavulum" },
      { property: "og:description", content: "Heavyweight basics from Pavulum." },
    ],
    links: [{ rel: "canonical", href: "/apparel" }],
  }),
  component: () => (
    <CategoryPage
      title="Wear your values"
      subtitle="Heavyweight basics. Garment-dyed. Made to soften with time."
      cat="apparel"
    />
  ),
});
