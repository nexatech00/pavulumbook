import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { useProductsByCategory, essays, episodes } from "@/lib/products";
import { Play } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pavulum — Thoughts, books, and things for intentional living" },
      {
        name: "description",
        content:
          "An author-led brand of books, courses, apparel, and a podcast for parents, partners, and humans who want to grow.",
      },
      { property: "og:title", content: "Pavulum" },
      { property: "og:description", content: "Thoughts, books, and things for intentional living." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const HERO =
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=2000&q=80";
const APPAREL_BG =
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=2000&q=80";
const FOUNDER =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80";
const PODCAST_ART =
  "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80";

function HomePage() {
  const books = useProductsByCategory("books").data.slice(0, 3);
  const courses = useProductsByCategory("courses").data.slice(0, 2);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[620px] w-full overflow-hidden">
        <img src={HERO} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-brown/30 via-deep-brown/10 to-deep-brown/70" />
        <div className="paper-grain absolute inset-0" />
        <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-6xl tracking-wide text-soft-gold sm:text-7xl md:text-8xl">
            PAVULUM
          </h1>
          <p className="mt-6 max-w-xl text-lg italic text-cream/95 sm:text-2xl">
            Thoughts, books, and things for intentional living.
          </p>
          <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/shop"
              className="rounded-full bg-terracotta px-8 py-3 text-center text-cream shadow-lg shadow-deep-brown/20 transition-colors hover:bg-terracotta-dark"
            >
              Shop Now
            </Link>
            <Link
              to="/podcast"
              className="rounded-full border border-cream/80 px-8 py-3 text-center text-cream transition-colors hover:bg-cream/10"
            >
              Listen to Podcast
            </Link>
          </div>
        </div>
      </section>

      {/* BOOKS */}
      <Section
        eyebrow="Books"
        title="Books that start conversations"
        subtitle="For parents, partners, and humans who want to grow."
      >
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => (
            <ProductCard key={b.id} product={b} />
          ))}
        </div>
        <ViewAll to="/books" label="View all books" />
      </Section>

      {/* COURSES */}
      <Section eyebrow="Courses" title="Learn at your own pace">
        <div className="grid gap-10 md:grid-cols-2">
          {courses.map((c) => (
            <Link
              key={c.id}
              to="/product/$slug"
              params={{ slug: c.slug }}
              className="group block overflow-hidden rounded-2xl bg-card shadow-sm shadow-deep-brown/5 transition-shadow hover:shadow-md hover:shadow-deep-brown/10"
            >
              <div className="overflow-hidden">
                <img
                  src={c.images[0]}
                  alt={c.title}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-7">
                <h3 className="font-serif text-2xl text-deep-brown">{c.title}</h3>
                <p className="mt-2 text-sm italic text-charcoal/70">{c.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-lg text-deep-brown">${c.price}</span>
                  <span className="rounded-full bg-terracotta px-5 py-2 text-sm text-cream transition-colors group-hover:bg-terracotta-dark">
                    Enroll Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <ViewAll to="/courses" label="View all courses" />
      </Section>

      {/* APPAREL */}
      <section className="relative my-24 w-full overflow-hidden">
        <img src={APPAREL_BG} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-deep-brown/40" />
        <div className="relative mx-auto flex max-w-6xl items-center justify-center px-6 py-28">
          <div className="w-full max-w-md rounded-2xl bg-cream/95 p-10 text-center shadow-xl shadow-deep-brown/20 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-soft-gold">Apparel</p>
            <h2 className="mt-3 font-serif text-3xl text-deep-brown sm:text-4xl">
              Wear your values
            </h2>
            <ul className="mt-6 space-y-2 text-charcoal/85">
              <li>The Pause Hoodie — $68</li>
              <li>The Journal Tee — $34</li>
            </ul>
            <Link
              to="/apparel"
              className="mt-7 inline-block rounded-full bg-terracotta px-7 py-3 text-cream transition-colors hover:bg-terracotta-dark"
            >
              Shop Apparel →
            </Link>
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <Section eyebrow="Journal" title="Reflections">
        <div className="mx-auto max-w-2xl divide-y divide-border/70">
          {essays.map((e) => (
            <Link
              key={e.slug}
              to="/journal"
              className="group block py-7"
            >
              <h3 className="font-serif text-2xl text-deep-brown transition-colors group-hover:text-terracotta">
                {e.title}
              </h3>
              <div className="mt-2 flex items-center gap-3 text-sm text-charcoal/60">
                <span>{e.readTime}</span>
                <span className="text-terracotta">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
        <ViewAll to="/journal" label="Read all essays" />
      </Section>

      {/* PODCAST */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-lg shadow-deep-brown/10">
            <img src={PODCAST_ART} alt="Podcast cover" className="aspect-square w-full object-cover" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-soft-gold">🎧 Latest Episode</p>
            <h2 className="mt-3 font-serif text-4xl text-deep-brown">
              {episodes[0].title}
            </h2>
            <p className="mt-4 text-charcoal/80">
              {episodes[0].description} {episodes[0].duration}.
            </p>
            <FakePlayer />
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-soft-gold">
              <a href="#" className="hover:text-terracotta">Listen on Spotify</a>
              <span className="text-border">·</span>
              <a href="#" className="hover:text-terracotta">Apple Podcasts</a>
              <span className="text-border">·</span>
              <a href="#" className="hover:text-terracotta">Watch on YouTube</a>
            </div>
            <div className="mt-8">
              <Link to="/podcast" className="text-terracotta hover:underline">
                See all episodes →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="paper-grain bg-secondary/40">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-soft-gold">About</p>
            <h2 className="mt-3 font-serif text-4xl text-deep-brown">I'm Jane</h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/85">
              Pavulum began as late-night journal entries and conversations on the kitchen
              floor. We make books, courses, and things for people who want to live more
              thoughtfully — as parents, partners, and humans.
            </p>
            <Link to="/about" className="mt-6 inline-block text-terracotta hover:underline">
              Read my story →
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src={FOUNDER}
              alt="Founder portrait"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h2 className="font-serif text-4xl text-deep-brown">The Pavulum Letter</h2>
        <p className="mt-3 text-charcoal/75">
          Weekly essays, recommendations, and quiet thoughts. No spam. Just substance.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks for subscribing.");
          }}
          className="mt-7 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 rounded-full border border-border bg-card px-5 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-terracotta focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-terracotta px-7 py-3 text-cream hover:bg-terracotta-dark"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-xs text-charcoal/50">Unsubscribe anytime.</p>
      </section>
    </SiteLayout>
  );
}

function Section({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 text-center">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.2em] text-soft-gold">{eyebrow}</p>
        )}
        <h2 className="mt-3 font-serif text-4xl text-deep-brown sm:text-5xl">{title}</h2>
        {subtitle && (
          <p className="mt-3 text-lg italic text-charcoal/70">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function ViewAll({ to, label }: { to: string; label: string }) {
  return (
    <div className="mt-12 text-center">
      <Link to={to} className="text-terracotta hover:underline">
        {label} →
      </Link>
    </div>
  );
}

function FakePlayer() {
  return (
    <div className="mt-6 flex items-center gap-4 rounded-full bg-card px-4 py-3 shadow-sm shadow-deep-brown/5">
      <button
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-cream hover:bg-terracotta-dark"
        aria-label="Play"
      >
        <Play className="h-4 w-4" fill="currentColor" />
      </button>
      <div className="flex-1">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-1/3 rounded-full bg-soft-gold" />
        </div>
      </div>
      <span className="text-xs text-charcoal/60">14:21 / 42:00</span>
    </div>
  );
}
