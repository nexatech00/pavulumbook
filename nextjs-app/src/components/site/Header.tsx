"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/books", label: "Books" },
  { href: "/courses", label: "Courses" },
  { href: "/apparel", label: "Apparel" },
  { href: "/podcast", label: "Podcast" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
] as const;

export function Header() {
  const { count } = useCart();
  const { user, isAdmin } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="font-serif text-2xl tracking-wide text-deep-brown">
          PAVULUM
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-sm transition-colors hover:text-terracotta ${
                pathname === n.href ? "text-terracotta" : "text-charcoal/80"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="hidden rounded-full border border-deep-brown/30 px-3 py-1.5 text-xs text-deep-brown hover:bg-secondary md:inline-flex"
            >
              Admin
            </Link>
          )}
          {!user && (
            <Link
              href="/login"
              className="hidden text-sm text-charcoal/80 hover:text-terracotta md:inline"
            >
              Sign in
            </Link>
          )}
          <Link
            href="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-deep-brown hover:bg-secondary"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-[11px] font-medium text-cream">
                {count}
              </span>
            )}
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-deep-brown hover:bg-secondary md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-charcoal/85"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
