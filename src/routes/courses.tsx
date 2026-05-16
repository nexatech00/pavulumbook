import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "./books";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Pavulum" },
      { name: "description", content: "Self-paced digital courses on parenting, presence, and self-awareness." },
      { property: "og:title", content: "Courses — Pavulum" },
      { property: "og:description", content: "Self-paced digital courses from Pavulum." },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: () => (
    <CategoryPage
      title="Learn at your own pace"
      subtitle="Lifetime access. Worksheets included."
      cat="courses"
    />
  ),
});
