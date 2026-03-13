"use client";

import { useEffect, useState } from "react";

interface StaffMember {
  pseudo: string;
  role: string;
  description: string;
}

const ROLES = ["Fondateur", "Admin", "Responsable", "Modérateur", "Builder", "Développeur"];
const ROLE_BADGES: Record<string, string> = {
  "Fondateur": "badge-amber", "Admin": "badge-red", "Responsable": "badge-purple",
  "Modérateur": "badge-cyan", "Builder": "badge-green", "Développeur": "badge-cyan",
};

const emptyMember: StaffMember = { pseudo: "", role: "Modérateur", description: "" };

export default function AdminStaffPage() {
  const [members, setMembers] = useState<StaffMember[]>([]);
  const [editing, setEditing] = useState<StaffMember | null>(null);
  const [originalPseudo, setOriginalPseudo] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/staff").then((r) => r.json()).then(setMembers);
  }, []);

  function openNew() {
    setEditing({ ...emptyMember });
    setOriginalPseudo("");
    setIsNew(true);
  }

  function openEdit(member: StaffMember) {
    setEditing({ ...member });
    setOriginalPseudo(member.pseudo);
    setIsNew(false);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const body = isNew ? editing : { ...editing, oldPseudo: originalPseudo };
    await fetch("/api/admin/staff", {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await fetch("/api/admin/staff").then((r) => r.json());
    setMembers(data);
    setEditing(null);
    setSaving(false);
  }

  async function handleDelete(pseudo: string) {
    if (!confirm(`Retirer ${pseudo} de l'équipe ?`)) return;
    await fetch("/api/admin/staff", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo }),
    });
    setMembers((prev) => prev.filter((m) => m.pseudo !== pseudo));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Équipe</h1>
          <p className="text-gray-500 text-sm mt-1">{members.length} membre(s)</p>
        </div>
        <button onClick={openNew} className="btn-primary !text-xs">+ Nouveau membre</button>
      </div>

      {editing && (
        <div className="card mb-6 border-neon-purple/30">
          <h2 className="text-lg font-bold text-white mb-4">{isNew ? "Nouveau membre" : "Modifier"}</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Pseudo Minecraft</label>
              <input type="text" value={editing.pseudo} onChange={(e) => setEditing({ ...editing, pseudo: e.target.value })}
                className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Rôle</label>
              <select value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple">
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
            <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2}
              className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="btn-primary !text-xs">{saving ? "Enregistrement..." : "Enregistrer"}</button>
            <button onClick={() => setEditing(null)} className="btn-secondary !text-xs">Annuler</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.pseudo} className="card flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-dark-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {member.pseudo.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{member.pseudo}</h3>
                  <span className={`badge ${ROLE_BADGES[member.role] || "badge-cyan"}`}>{member.role}</span>
                </div>
                <p className="text-xs text-gray-400 truncate">{member.description}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(member)} className="px-3 py-1.5 rounded-lg bg-dark-600 text-xs font-medium text-gray-300 hover:text-white hover:bg-dark-500 transition">Modifier</button>
              <button onClick={() => handleDelete(member.pseudo)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-xs font-medium text-red-400 hover:bg-red-500/20 transition">Retirer</button>
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="card text-center py-12"><p className="text-gray-500">Aucun membre dans l'équipe.</p></div>
      )}
    </div>
  );
}
