import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteLayout } from "@/components/site/Layout";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Pavulum — books, courses, and things for intentional living.",
  openGraph: {
    title: "About Pavulum",
    description: "The story behind Pavulum.",
  },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-soft-gold">About</p>
        <h1 className="mt-3 font-serif text-5xl text-deep-brown sm:text-6xl">
          Pavulum is a small, slow studio.
        </h1>

        <div className="mt-10 overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=80"
            alt="Founder"
            width={1600}
            height={1000}
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-charcoal/85">
          <p>
            Pavulum began as late-night journal entries and conversations on the kitchen
            floor. It was never meant to be a brand. It was a practice — a way of paying
            attention.
          </p>
          <p>
            We make books, courses, and quiet objects for people who want to live more
            thoughtfully. As parents. As partners. As humans who would like to be a little
            less in a hurry.
          </p>
          <p>
            Everything we make is built to last longer than a season. We move slowly
            because slow is the point.
          </p>
          <p className="text-soft-gold">— Jane, founder</p>
        </div>

        <div className="mt-14">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-terracotta px-6 py-3 text-cream hover:bg-terracotta-dark"
          >
            Say hello
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
