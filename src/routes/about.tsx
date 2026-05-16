import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Pavulum" },
      { name: "description", content: "The story behind Pavulum — books, courses, and things for intentional living." },
      { property: "og:title", content: "About Pavulum" },
      { property: "og:description", content: "The story behind Pavulum." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-soft-gold">About</p>
        <h1 className="mt-3 font-serif text-5xl text-deep-brown sm:text-6xl">
          Pavulum is a small, slow studio.
        </h1>

        <div className="mt-10 overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=80"
            alt="Founder"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        <div className="prose-pavulum mt-12 space-y-6 text-lg leading-relaxed text-charcoal/85">
          <p>
            Pavulum began as late-night journal entries and conversations on the kitchen floor.
            It was never meant to be a brand. It was a practice — a way of paying attention.
          </p>
          <p>
            We make books, courses, and quiet objects for people who want to live more
            thoughtfully. As parents. As partners. As humans who would like to be a little
            less in a hurry.
          </p>
          <p>
            Everything we make is built to last longer than a season. We move slowly because
            slow is the point.
          </p>
          <p className="text-soft-gold">— Jane, founder</p>
        </div>

        <div className="mt-14">
          <Link
            to="/contact"
            className="inline-block rounded-full bg-terracotta px-6 py-3 text-cream hover:bg-terracotta-dark"
          >
            Say hello
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
