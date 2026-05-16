import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { episodes } from "@/lib/products";
import { Play } from "lucide-react";

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "Podcast — Pavulum" },
      { name: "description", content: "Conversations on parenting, partnership, and being human." },
      { property: "og:title", content: "The Pavulum Podcast" },
      { property: "og:description", content: "Honest conversations on parenting, partnership, and being human." },
    ],
    links: [{ rel: "canonical", href: "/podcast" }],
  }),
  component: PodcastPage,
});

function PodcastPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-soft-gold">Podcast</p>
          <h1 className="mt-3 font-serif text-5xl text-deep-brown">The Pavulum Podcast</h1>
          <p className="mt-3 italic text-charcoal/70">
            Honest conversations on parenting, partnership, and being human.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-soft-gold">
            <a href="#" className="hover:text-terracotta">Spotify</a>
            <span className="text-border">·</span>
            <a href="#" className="hover:text-terracotta">Apple Podcasts</a>
            <span className="text-border">·</span>
            <a href="#" className="hover:text-terracotta">YouTube</a>
          </div>
        </header>

        <ul className="mt-14 divide-y divide-border">
          {episodes.map((ep, i) => (
            <li key={ep.slug} className="flex gap-5 py-7">
              <button
                aria-label={`Play ${ep.title}`}
                className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta text-cream hover:bg-terracotta-dark"
              >
                <Play className="h-4 w-4" fill="currentColor" />
              </button>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-soft-gold">
                  Ep. {String(episodes.length - i).padStart(2, "0")} · {ep.duration}
                </p>
                <h2 className="mt-1 font-serif text-2xl text-deep-brown">{ep.title}</h2>
                <p className="mt-2 text-charcoal/80">{ep.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SiteLayout>
  );
}
