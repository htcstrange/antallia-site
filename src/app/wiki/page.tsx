"use client";

import { useState } from "react";
import { WIKI_ARTICLES, WIKI_CATEGORIES } from "@/data/wiki";

export default function WikiPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filtered = WIKI_ARTICLES.filter((a) => {
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "Tous" || a.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">Wiki / Guide</h1>
        <p className="section-subtitle">Tout ce que tu dois savoir pour bien débuter et progresser sur Antallia.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un guide..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-dark-700 border border-gray-800/60 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-purple/40 transition"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {["Tous", ...WIKI_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === cat
                ? "bg-neon-purple text-white"
                : "bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {filtered.map((article) => (
          <details key={article.id} className="card group">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <div className="flex items-center gap-3">
                <span className="badge badge-purple">{article.category}</span>
                <h3 className="font-bold text-white">{article.title}</h3>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-4 pt-4 border-t border-gray-800/60 text-sm text-gray-300 leading-relaxed whitespace-pre-line">
              {article.content.split(/(\*\*.*?\*\*)/g).map((part, i) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </div>
          </details>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-16">Aucun article trouvé.</p>
      )}
    </div>
  );
}
