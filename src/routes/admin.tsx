import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Pavulum" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const nav = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !user) nav({ to: "/login" });
  }, [loading, user, nav]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="py-32 text-center text-charcoal/60">Loading…</div>
      </SiteLayout>
    );
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h1 className="font-serif text-4xl text-deep-brown">Not an admin</h1>
          <p className="mt-4 text-charcoal/75">
            Your account ({user.email}) doesn't have admin access. Ask the owner to grant the
            <code className="mx-1 rounded bg-secondary px-1.5 py-0.5 text-xs">admin</code>
            role to your user ID:
          </p>
          <p className="mt-3 break-all rounded-2xl bg-secondary px-4 py-3 font-mono text-sm text-deep-brown">
            {user.id}
          </p>
          <button
            onClick={() => signOut()}
            className="mt-8 rounded-full border border-deep-brown/30 px-5 py-2.5 text-sm text-deep-brown hover:bg-secondary"
          >
            Sign out
          </button>
        </div>
      </SiteLayout>
    );
  }

  const links = [
    { to: "/admin", label: "Dashboard", exact: true },
    { to: "/admin/products", label: "Products" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-serif text-lg text-deep-brown">PAVULUM · Admin</Link>
            <nav className="flex gap-5 text-sm">
              {links.map((l) => {
                const active = l.exact ? path === l.to : path.startsWith(l.to);
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={active ? "text-terracotta" : "text-charcoal/75 hover:text-terracotta"}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-charcoal/60 sm:inline">{user.email}</span>
            <Link to="/" className="text-charcoal/70 hover:text-terracotta">View site</Link>
            <button onClick={() => signOut()} className="text-charcoal/70 hover:text-terracotta">
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
