"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  news: number;
  shop: number;
  staff: number;
  rules: number;
  wiki: number;
}

const CARDS = [
  { key: "news", label: "Actualités", icon: "📰", href: "/admin/actualites", color: "from-cyan-500 to-blue-600" },
  { key: "shop", label: "Articles Boutique", icon: "🛒", href: "/admin/boutique", color: "from-neon-purple to-purple-600" },
  { key: "staff", label: "Membres Staff", icon: "👥", href: "/admin/equipe", color: "from-neon-green to-emerald-600" },
  { key: "rules", label: "Catégories Règles", icon: "📋", href: "/admin/reglement", color: "from-amber-500 to-orange-600" },
  { key: "wiki", label: "Articles Wiki", icon: "📖", href: "/admin/wiki", color: "from-neon-pink to-rose-600" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ news: 0, shop: 0, staff: 0, rules: 0, wiki: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/news").then((r) => r.json()),
      fetch("/api/admin/shop").then((r) => r.json()),
      fetch("/api/admin/staff").then((r) => r.json()),
      fetch("/api/admin/rules").then((r) => r.json()),
      fetch("/api/admin/wiki").then((r) => r.json()),
    ]).then(([news, shop, staff, rules, wiki]) => {
      setStats({
        news: news.length,
        shop: shop.length,
        staff: staff.length,
        rules: rules.reduce((sum: number, c: { rules: unknown[] }) => sum + c.rules.length, 0),
        wiki: wiki.length,
      });
    });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Vue d'ensemble du contenu du site</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {CARDS.map((card) => (
          <Link key={card.key} href={card.href} className="group">
            <div className="card hover:border-neon-purple/30 transition-all group-hover:-translate-y-1">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-lg mb-3`}>
                {card.icon}
              </div>
              <p className="text-2xl font-extrabold text-white">
                {stats[card.key as keyof Stats]}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-bold text-white mb-4">Actions rapides</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link href="/admin/actualites" className="flex items-center gap-3 p-3 rounded-xl bg-dark-700/50 hover:bg-dark-600 transition-colors">
            <span className="text-lg">📰</span>
            <div>
              <p className="text-sm font-semibold text-white">Ajouter une actualité</p>
              <p className="text-xs text-gray-500">Publier une news</p>
            </div>
          </Link>
          <Link href="/admin/boutique" className="flex items-center gap-3 p-3 rounded-xl bg-dark-700/50 hover:bg-dark-600 transition-colors">
            <span className="text-lg">🛒</span>
            <div>
              <p className="text-sm font-semibold text-white">Gérer la boutique</p>
              <p className="text-xs text-gray-500">Ajouter/modifier des articles</p>
            </div>
          </Link>
          <Link href="/admin/equipe" className="flex items-center gap-3 p-3 rounded-xl bg-dark-700/50 hover:bg-dark-600 transition-colors">
            <span className="text-lg">👥</span>
            <div>
              <p className="text-sm font-semibold text-white">Gérer l'équipe</p>
              <p className="text-xs text-gray-500">Ajouter/retirer des membres</p>
            </div>
          </Link>
          <Link href="/admin/reglement" className="flex items-center gap-3 p-3 rounded-xl bg-dark-700/50 hover:bg-dark-600 transition-colors">
            <span className="text-lg">📋</span>
            <div>
              <p className="text-sm font-semibold text-white">Modifier le règlement</p>
              <p className="text-xs text-gray-500">Ajouter/modifier des règles</p>
            </div>
          </Link>
          <Link href="/admin/wiki" className="flex items-center gap-3 p-3 rounded-xl bg-dark-700/50 hover:bg-dark-600 transition-colors">
            <span className="text-lg">📖</span>
            <div>
              <p className="text-sm font-semibold text-white">Gérer le wiki</p>
              <p className="text-xs text-gray-500">Ajouter/modifier des guides</p>
            </div>
          </Link>
          <Link href="/" className="flex items-center gap-3 p-3 rounded-xl bg-dark-700/50 hover:bg-dark-600 transition-colors">
            <span className="text-lg">🌐</span>
            <div>
              <p className="text-sm font-semibold text-white">Voir le site</p>
              <p className="text-xs text-gray-500">Ouvrir le site public</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
