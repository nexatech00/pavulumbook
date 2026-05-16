import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Music2, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-deep-brown text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="font-serif text-2xl text-soft-gold">Pavulum</div>
          <p className="mt-3 max-w-xs text-sm text-cream/70">
            Books, courses, and things for people who want to live more thoughtfully.
          </p>
        </div>
        <FooterCol title="Shop" links={[["Books","/books"],["Courses","/courses"],["Apparel","/apparel"]]} />
        <FooterCol title="Learn" links={[["All Courses","/courses"],["Journal","/journal"],["Podcast","/podcast"]]} />
        <FooterCol title="About" links={[["Our Story","/about"],["Contact","/contact"]]} />
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
          <p className="text-xs text-cream/60">© Pavulum — intentionally made</p>
          <div className="flex items-center gap-4 text-soft-gold">
            <a href="#" aria-label="Instagram" className="hover:text-cream"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Spotify" className="hover:text-cream"><Music2 className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-cream"><Youtube className="h-4 w-4" /></a>
            <a href="#" aria-label="Substack" className="hover:text-cream"><BookOpen className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-sm font-medium uppercase tracking-wider text-soft-gold">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-cream/80">
        {links.map(([l, to]) => (
          <li key={to}>
            <Link to={to} className="hover:text-cream">{l}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
