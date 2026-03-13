"use client";

import { useEffect, useState } from "react";

interface Rule {
  title: string;
  severity: "info" | "warning" | "ban_temp" | "ban_def";
  description: string;
}

interface RuleCategory {
  name: string;
  icon: string;
  rules: Rule[];
}

const SEVERITIES = [
  { value: "info", label: "Info" },
  { value: "warning", label: "Avertissement" },
  { value: "ban_temp", label: "Ban temporaire" },
  { value: "ban_def", label: "Ban définitif" },
];

export default function AdminRulesPage() {
  const [categories, setCategories] = useState<RuleCategory[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/rules").then((r) => r.json()).then(setCategories);
  }, []);

  function updateCategory(idx: number, field: keyof RuleCategory, value: string) {
    const copy = [...categories];
    copy[idx] = { ...copy[idx], [field]: value };
    setCategories(copy);
  }

  function updateRule(catIdx: number, ruleIdx: number, field: keyof Rule, value: string) {
    const copy = [...categories];
    copy[catIdx] = {
      ...copy[catIdx],
      rules: copy[catIdx].rules.map((r, i) => i === ruleIdx ? { ...r, [field]: value } : r),
    };
    setCategories(copy);
  }

  function addCategory() {
    setCategories([...categories, { name: "Nouvelle catégorie", icon: "📌", rules: [] }]);
  }

  function removeCategory(idx: number) {
    if (!confirm("Supprimer cette catégorie et toutes ses règles ?")) return;
    setCategories(categories.filter((_, i) => i !== idx));
  }

  function addRule(catIdx: number) {
    const copy = [...categories];
    copy[catIdx].rules.push({ title: "Nouvelle règle", severity: "info", description: "" });
    setCategories(copy);
  }

  function removeRule(catIdx: number, ruleIdx: number) {
    const copy = [...categories];
    copy[catIdx].rules = copy[catIdx].rules.filter((_, i) => i !== ruleIdx);
    setCategories(copy);
  }

  async function handleSave() {
    setSaving(true);
    await fetch("/api/admin/rules", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categories),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Règlement</h1>
          <p className="text-gray-500 text-sm mt-1">{categories.length} catégorie(s)</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addCategory} className="btn-secondary !text-xs">+ Catégorie</button>
          <button onClick={handleSave} disabled={saving} className="btn-primary !text-xs">
            {saving ? "Enregistrement..." : saved ? "Enregistré !" : "Enregistrer tout"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((cat, catIdx) => (
          <div key={catIdx} className="card">
            <div className="flex items-center gap-3 mb-4">
              <input
                type="text"
                value={cat.icon}
                onChange={(e) => updateCategory(catIdx, "icon", e.target.value)}
                className="w-12 bg-dark-900 border border-gray-700 rounded-lg px-2 py-1.5 text-center text-lg focus:outline-none focus:border-neon-purple"
              />
              <input
                type="text"
                value={cat.name}
                onChange={(e) => updateCategory(catIdx, "name", e.target.value)}
                className="flex-1 bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-neon-purple"
              />
              <button onClick={() => removeCategory(catIdx)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-xs font-medium text-red-400 hover:bg-red-500/20 transition">
                Supprimer
              </button>
            </div>

            <div className="space-y-3">
              {cat.rules.map((rule, ruleIdx) => (
                <div key={ruleIdx} className="bg-dark-700/50 rounded-xl p-3 border border-gray-800/40">
                  <div className="grid sm:grid-cols-[1fr_auto_auto] gap-2 mb-2">
                    <input
                      type="text"
                      value={rule.title}
                      onChange={(e) => updateRule(catIdx, ruleIdx, "title", e.target.value)}
                      className="bg-dark-900 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-neon-purple"
                      placeholder="Titre de la règle"
                    />
                    <select
                      value={rule.severity}
                      onChange={(e) => updateRule(catIdx, ruleIdx, "severity", e.target.value)}
                      className="bg-dark-900 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-neon-purple"
                    >
                      {SEVERITIES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                    <button onClick={() => removeRule(catIdx, ruleIdx)} className="px-2 py-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition text-xs">
                      Retirer
                    </button>
                  </div>
                  <textarea
                    value={rule.description}
                    onChange={(e) => updateRule(catIdx, ruleIdx, "description", e.target.value)}
                    rows={2}
                    className="w-full bg-dark-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neon-purple"
                    placeholder="Description de la règle"
                  />
                </div>
              ))}
            </div>

            <button onClick={() => addRule(catIdx)} className="mt-3 px-3 py-1.5 rounded-lg bg-dark-600 text-xs font-medium text-gray-400 hover:text-white hover:bg-dark-500 transition">
              + Ajouter une règle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
