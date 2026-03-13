"use client";

import { useEffect, useState } from "react";

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  tag: "Mise à jour" | "Événement" | "Maintenance" | "Annonce";
  summary: string;
  content: string;
}

const TAGS = ["Mise à jour", "Événement", "Maintenance", "Annonce"] as const;
const TAG_COLORS: Record<string, string> = {
  "Mise à jour": "badge-cyan",
  "Événement": "badge-purple",
  "Maintenance": "badge-amber",
  "Annonce": "badge-green",
};

const emptyArticle: NewsArticle = { id: "", title: "", date: "", tag: "Annonce", summary: "", content: "" };

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/news").then((r) => r.json()).then(setArticles);
  }, []);

  function openNew() {
    setEditing({ ...emptyArticle, id: `news-${Date.now()}`, date: new Date().toISOString().split("T")[0] });
    setIsNew(true);
  }

  function openEdit(article: NewsArticle) {
    setEditing({ ...article });
    setIsNew(false);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const method = isNew ? "POST" : "PUT";
    await fetch("/api/admin/news", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const data = await fetch("/api/admin/news").then((r) => r.json());
    setArticles(data);
    setEditing(null);
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet article ?")) return;
    await fetch("/api/admin/news", {
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
          <h1 className="text-2xl font-extrabold text-white">Actualités</h1>
          <p className="text-gray-500 text-sm mt-1">{articles.length} article(s)</p>
        </div>
        <button onClick={openNew} className="btn-primary !text-xs">
          + Nouvel article
        </button>
      </div>

      {editing && (
        <div className="card mb-6 border-neon-purple/30">
          <h2 className="text-lg font-bold text-white mb-4">
            {isNew ? "Nouvel article" : "Modifier l'article"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Titre</label>
              <input
                type="text"
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Date</label>
                <input
                  type="date"
                  value={editing.date}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                  className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Tag</label>
                <select
                  value={editing.tag}
                  onChange={(e) => setEditing({ ...editing, tag: e.target.value as NewsArticle["tag"] })}
                  className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple"
                >
                  {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-400 mb-1">Résumé</label>
            <input
              type="text"
              value={editing.summary}
              onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
              className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple"
            />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-400 mb-1">Contenu (supporte **gras**)</label>
            <textarea
              value={editing.content}
              onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              rows={8}
              className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple font-mono"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="btn-primary !text-xs">
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
            <button onClick={() => setEditing(null)} className="btn-secondary !text-xs">
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {articles.map((article) => (
          <div key={article.id} className="card flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`badge ${TAG_COLORS[article.tag]}`}>{article.tag}</span>
                <span className="text-xs text-gray-500">{article.date}</span>
              </div>
              <h3 className="text-sm font-bold text-white truncate">{article.title}</h3>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{article.summary}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(article)} className="px-3 py-1.5 rounded-lg bg-dark-600 text-xs font-medium text-gray-300 hover:text-white hover:bg-dark-500 transition">
                Modifier
              </button>
              <button onClick={() => handleDelete(article.id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-xs font-medium text-red-400 hover:bg-red-500/20 transition">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-500">Aucun article. Cliquez sur "Nouvel article" pour commencer.</p>
        </div>
      )}
    </div>
  );
}
