"use client";

import { useState } from "react";
import { SHOP_ITEMS, SHOP_CATEGORIES, ShopItem } from "@/data/shop";
import CheckoutModal from "@/components/CheckoutModal";

const RARITY_BADGES: Record<string, string> = {
  commun: "badge-cyan",
  rare: "badge-purple",
  epique: "badge-pink",
  legendaire: "badge-amber",
};

const RARITY_LABELS: Record<string, string> = {
  commun: "Commun",
  rare: "Rare",
  epique: "Épique",
  legendaire: "Légendaire",
};

const RARITY_GLOW: Record<string, string> = {
  commun: "",
  rare: "hover:shadow-neon",
  epique: "hover:shadow-[0_0_25px_-4px_rgba(236,72,153,0.4)]",
  legendaire: "hover:shadow-[0_0_25px_-4px_rgba(245,158,11,0.4)]",
};

function ProductCard({
  item,
  onBuy,
}: {
  item: ShopItem;
  onBuy: (item: ShopItem) => void;
}) {
  return (
    <div className={`card-hover flex flex-col h-full ${RARITY_GLOW[item.rarity]}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`badge ${RARITY_BADGES[item.rarity]}`}>{RARITY_LABELS[item.rarity]}</span>
        <span className="text-xl font-extrabold text-white">{item.price}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
      <p className="text-sm text-gray-400 mb-4 flex-1">{item.description}</p>
      {item.features && (
        <ul className="space-y-1 mb-4">
          {item.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-gray-300">
              <span className="text-neon-green">✓</span> {f}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => onBuy(item)}
        className="btn-primary w-full !text-xs mt-auto"
      >
        Acheter
      </button>
    </div>
  );
}

export default function BoutiquePage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

  const filtered = activeCategory === "Tous"
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">Boutique</h1>
        <p className="section-subtitle">Améliore ton expérience avec des grades, kits et cosmétiques.</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {["Tous", ...SHOP_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeCategory === cat
                ? "bg-neon-purple text-white shadow-neon"
                : "bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <ProductCard key={item.id} item={item} onBuy={setSelectedItem} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-16">Aucun article dans cette catégorie.</p>
      )}

      {selectedItem && (
        <CheckoutModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
