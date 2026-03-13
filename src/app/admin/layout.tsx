"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/actualites", label: "Actualités", icon: "📰" },
  { href: "/admin/boutique", label: "Boutique", icon: "🛒" },
  { href: "/admin/equipe", label: "Équipe", icon: "👥" },
  { href: "/admin/reglement", label: "Règlement", icon: "📋" },
  { href: "/admin/wiki", label: "Wiki", icon: "📖" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthed(true);
      return;
    }
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) router.push("/admin/login");
        else setAuthed(true);
      })
      .catch(() => router.push("/admin/login"));
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (authed === null) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-gray-400">Chargement...</div>
      </div>
    );
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-dark-800 border-r border-gray-800/60 flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-gray-800/60">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center font-extrabold text-sm text-white">
              A
            </div>
            <div>
              <span className="text-white font-bold text-sm">Antallia</span>
              <span className="block text-[10px] text-gray-500 -mt-0.5">Panel Admin</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-neon-purple/15 text-neon-purple border border-neon-purple/20"
                    : "text-gray-400 hover:text-white hover:bg-dark-700"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-800/60 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-dark-700 transition-all"
          >
            <span className="text-base">🌐</span>
            Voir le site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full text-left"
          >
            <span className="text-base">🚪</span>
            Déconnexion
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-dark-900/80 backdrop-blur-sm border-b border-gray-800/60 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-dark-700 text-gray-300 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-bold text-white">Panel Admin</span>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
