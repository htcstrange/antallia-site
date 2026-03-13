"use client";

import { useEffect, useState } from "react";

interface WikiArticle {
  id: string;
  title: string;
  category: string;
  content: string;
}

const CATEGORIES = [
  "Commandes", "Factions", "Économie", "Minerais & Outils", "Jobs",
  "Enchantements", "Machines", "Boss", "Quêtes", "Compétences",
  "Familiers", "Dimension du Vide", "Événements", "Blocs Décoratifs",
];

const emptyArticle: WikiArticle = { id: "", title: "", category: "Commandes", content: "" };

export default function AdminWikiPage() {
  const [articles, setArticles] = useState<WikiArticle[]>([]);
  const [editing, setEditing] = useState<WikiArticle | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterCat, setFilterCat] = useState("Tous");

  useEffect(() => {
    fetch("/api/admin/wiki").then((r) => r.json()).then(setArticles);
  }, []);

  const filtered = filterCat === "Tous" ? articles : articles.filter((a) => a.category === filterCat);

  function openNew() {
    setEditing({ ...emptyArticle, id: `wiki-${Date.now()}` });
    setIsNew(true);
  }

  function openEdit(article: WikiArticle) {
    setEditing({ ...article });
    setIsNew(false);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    await fetch("/api/admin/wiki", {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const data = await fetch("/api/admin/wiki").then((r) => r.json());
    setArticles(data);
    setEditing(null);
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet article ?")) return;
    await fetch("/api/admin/wiki", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Wiki</h1>
          <p className="text-gray-500 text-sm mt-1">{articles.length} article(s)</p>
        </div>
        <button onClick={openNew} className="btn-primary !text-xs">+ Nouvel article</button>
      </div>

      {editing && (
        <div className="card mb-6 border-neon-purple/30">
          <h2 className="text-lg font-bold text-white mb-4">{isNew ? "Nouvel article" : "Modifier"}</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Titre</label>
              <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Catégorie</label>
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-400 mb-1">Contenu (supporte **gras**)</label>
            <textarea value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={12}
              className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple font-mono" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="btn-primary !text-xs">{saving ? "Enregistrement..." : "Enregistrer"}</button>
            <button onClick={() => setEditing(null)} className="btn-secondary !text-xs">Annuler</button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {["Tous", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterCat === cat ? "bg-neon-purple text-white" : "bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((article) => (
          <div key={article.id} className="card flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="badge badge-purple">{article.category}</span>
              </div>
              <h3 className="text-sm font-bold text-white">{article.title}</h3>
              <p className="text-xs text-gray-400 truncate">{article.content.substring(0, 100)}...</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(article)} className="px-3 py-1.5 rounded-lg bg-dark-600 text-xs font-medium text-gray-300 hover:text-white hover:bg-dark-500 transition">Modifier</button>
              <button onClick={() => handleDelete(article.id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-xs font-medium text-red-400 hover:bg-red-500/20 transition">Supprimer</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card text-center py-12"><p className="text-gray-500">Aucun article wiki trouvé.</p></div>
      )}
    </div>
  );
}
