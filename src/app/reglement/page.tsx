"use client";

import { useEffect, useState } from "react";

interface Rule {
  title: string;
  severity: string;
  description: string;
}

interface RuleCategory {
  name: string;
  icon: string;
  rules: Rule[];
}

const SEVERITY_LABELS: Record<string, { label: string; class: string }> = {
  info: { label: "Info", class: "badge-cyan" },
  warning: { label: "Avertissement", class: "badge-amber" },
  ban_temp: { label: "Ban temporaire", class: "badge-purple" },
  ban_def: { label: "Ban définitif", class: "badge-red" },
};

export default function ReglementPage() {
  const [rules, setRules] = useState<RuleCategory[]>([]);

  useEffect(() => {
    fetch("/api/admin/rules").then((r) => r.json()).then(setRules).catch(() => {});
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">Règlement</h1>
        <p className="section-subtitle">Les règles du serveur à respecter pour une expérience agréable pour tous.</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {Object.entries(SEVERITY_LABELS).map(([key, s]) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`badge ${s.class}`}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {rules.map((cat) => (
          <div key={cat.name} className="card">
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
              <span className="text-2xl">{cat.icon}</span>
              {cat.name}
            </h2>
            <div className="space-y-3">
              {cat.rules.map((rule) => (
                <div
                  key={rule.title}
                  className="bg-dark-700/50 rounded-xl p-4 border border-gray-800/40 hover:border-neon-purple/20 transition-colors"
                >
                  <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
                    <h3 className="font-semibold text-white">{rule.title}</h3>
                    <span className={`badge ${SEVERITY_LABELS[rule.severity]?.class || "badge-cyan"} shrink-0`}>
                      {SEVERITY_LABELS[rule.severity]?.label || rule.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">{rule.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card border-neon-purple/20 mt-10 text-center">
        <p className="text-gray-400 text-sm">
          Le non-respect de ces règles entraîne des sanctions. En cas de question, contacte le staff sur{" "}
          <a href="https://discord.gg/h4cuQqfNU7" target="_blank" rel="noopener noreferrer" className="text-neon-purple hover:underline">
            Discord
          </a>.
        </p>
      </div>
    </div>
  );
}
