"use client";

import { useEffect, useState } from "react";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: string;
  priceInCents: number;
  category: string;
  rarity: "commun" | "rare" | "epique" | "legendaire";
  features?: string[];
}

const CATEGORIES = ["Grades", "Kits", "Cosmétiques", "Divers"];
const RARITIES = ["commun", "rare", "epique", "legendaire"] as const;
const RARITY_LABELS: Record<string, string> = { commun: "Commun", rare: "Rare", epique: "Épique", legendaire: "Légendaire" };

const emptyItem: ShopItem = { id: "", name: "", description: "", price: "", priceInCents: 0, category: "Grades", rarity: "commun", features: [] };

export default function AdminShopPage() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [editing, setEditing] = useState<ShopItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [featuresText, setFeaturesText] = useState("");

  useEffect(() => {
    fetch("/api/admin/shop").then((r) => r.json()).then(setItems);
  }, []);

  function openNew() {
    setEditing({ ...emptyItem, id: `item-${Date.now()}` });
    setFeaturesText("");
    setIsNew(true);
  }

  function openEdit(item: ShopItem) {
    setEditing({ ...item });
    setFeaturesText(item.features?.join("\n") || "");
    setIsNew(false);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const features = featuresText.split("\n").map((f) => f.trim()).filter(Boolean);
    const toSave = { ...editing, features: features.length > 0 ? features : undefined };
    await fetch("/api/admin/shop", {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toSave),
    });
    const data = await fetch("/api/admin/shop").then((r) => r.json());
    setItems(data);
    setEditing(null);
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet article ?")) return;
    await fetch("/api/admin/shop", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Boutique</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} article(s)</p>
        </div>
        <button onClick={openNew} className="btn-primary !text-xs">+ Nouvel article</button>
      </div>

      {editing && (
        <div className="card mb-6 border-neon-purple/30">
          <h2 className="text-lg font-bold text-white mb-4">{isNew ? "Nouvel article" : "Modifier"}</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Nom</label>
              <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Catégorie</label>
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Rareté</label>
                <select value={editing.rarity} onChange={(e) => setEditing({ ...editing, rarity: e.target.value as ShopItem["rarity"] })}
                  className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple">
                  {RARITIES.map((r) => <option key={r} value={r}>{RARITY_LABELS[r]}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
            <input type="text" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Prix affiché (ex: 4,99 €)</label>
              <input type="text" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Prix en centimes (Stripe)</label>
              <input type="number" value={editing.priceInCents} onChange={(e) => setEditing({ ...editing, priceInCents: parseInt(e.target.value) || 0 })}
                className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-400 mb-1">Features (une par ligne, optionnel)</label>
            <textarea value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} rows={3}
              className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple font-mono" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="btn-primary !text-xs">{saving ? "Enregistrement..." : "Enregistrer"}</button>
            <button onClick={() => setEditing(null)} className="btn-secondary !text-xs">Annuler</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="card flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs text-gray-500">{item.category}</span>
                <span className="text-xs text-gray-600">•</span>
                <span className="text-xs text-gray-500">{RARITY_LABELS[item.rarity]}</span>
              </div>
              <h3 className="text-sm font-bold text-white">{item.name}</h3>
              <p className="text-xs text-gray-400 truncate">{item.description}</p>
            </div>
            <span className="text-sm font-bold text-neon-purple shrink-0">{item.price}</span>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(item)} className="px-3 py-1.5 rounded-lg bg-dark-600 text-xs font-medium text-gray-300 hover:text-white hover:bg-dark-500 transition">Modifier</button>
              <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-xs font-medium text-red-400 hover:bg-red-500/20 transition">Supprimer</button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="card text-center py-12"><p className="text-gray-500">Aucun article en boutique.</p></div>
      )}
    </div>
  );
}
