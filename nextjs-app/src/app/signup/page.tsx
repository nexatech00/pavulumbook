"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { supabase } from "@/integrations/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          typeof window !== "undefined" ? window.location.origin : undefined,
      },
    });
    setLoading(false);
    if (error) return setErr(error.message);
    router.push("/admin");
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-md px-6 py-24">
        <h1 className="font-serif text-4xl text-deep-brown">Create account</h1>
        <p className="mt-2 text-charcoal/70">Sign up to access your space.</p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-full border border-border bg-card px-5 py-3 text-charcoal focus:outline-none focus:border-terracotta"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 chars)"
            className="w-full rounded-full border border-border bg-card px-5 py-3 text-charcoal focus:outline-none focus:border-terracotta"
          />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-terracotta px-7 py-3 text-cream hover:bg-terracotta-dark disabled:opacity-60"
          >
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-sm text-charcoal/70">
          Already have an account?{" "}
          <Link href="/login" className="text-terracotta hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </SiteLayout>
  );
}
