"use client";

import { NEWS, NEWS_TAG_COLORS } from "@/data/news";

export default function ActualitesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">Actualités</h1>
        <p className="section-subtitle">Les dernières nouvelles et mises à jour du serveur.</p>
      </div>

      <div className="space-y-6">
        {NEWS.map((article) => (
          <article key={article.id} id={article.id} className="card scroll-mt-24">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`badge ${NEWS_TAG_COLORS[article.tag]}`}>{article.tag}</span>
              <time className="text-sm text-gray-500">{new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</time>
            </div>
            <h2 className="text-xl font-bold text-white mb-3">{article.title}</h2>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">{article.summary}</p>
            <details className="group">
              <summary className="text-sm text-neon-purple font-semibold cursor-pointer hover:underline flex items-center gap-1">
                Lire la suite
                <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          </article>
        ))}
      </div>
    </div>
  );
}
