"use client";

import { useState, useMemo } from "react";
import { LEADERBOARD, LeaderboardCategory } from "@/data/leaderboard";
import Image from "next/image";

const TABS: { key: LeaderboardCategory; label: string }[] = [
  { key: "kills", label: "Kills" },
  { key: "kd", label: "K/D Ratio" },
  { key: "money", label: "Richesse" },
  { key: "playtime", label: "Temps de jeu" },
];

export default function ClassementPage() {
  const [tab, setTab] = useState<LeaderboardCategory>("kills");

  const sorted = useMemo(() => {
    const entries = [...LEADERBOARD];
    switch (tab) {
      case "kills":
        return entries.sort((a, b) => b.kills - a.kills);
      case "kd":
        return entries.sort((a, b) => b.kills / (b.deaths || 1) - a.kills / (a.deaths || 1));
      case "money":
        return entries.sort((a, b) => b.money - a.money);
      case "playtime":
        return entries.sort((a, b) => parseInt(b.playtime) - parseInt(a.playtime));
    }
  }, [tab]);

  function getValue(e: (typeof LEADERBOARD)[0]) {
    switch (tab) {
      case "kills": return e.kills.toLocaleString("fr-FR");
      case "kd": return (e.kills / (e.deaths || 1)).toFixed(2);
      case "money": return e.money.toLocaleString("fr-FR") + " $";
      case "playtime": return e.playtime;
    }
  }

  const podiumColors = ["from-amber-400 to-yellow-600", "from-gray-300 to-gray-500", "from-amber-700 to-orange-800"];
  const podiumLabels = ["🥇", "🥈", "🥉"];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">Classement</h1>
        <p className="section-subtitle">Les meilleurs joueurs d&apos;Antallia.</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === t.key
                ? "bg-neon-purple text-white shadow-neon"
                : "bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
        {sorted.slice(0, 3).map((entry, i) => {
          const order = [1, 0, 2];
          const player = sorted[order[i]];
          const idx = order[i];
          return (
            <div
              key={player.pseudo}
              className={`card text-center ${i === 1 ? "md:-mt-4" : ""} border-transparent`}
            >
              <div className="text-3xl mb-2">{podiumLabels[idx]}</div>
              <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${podiumColors[idx]} p-0.5 mb-3`}>
                <Image
                  src={`https://mc-heads.net/avatar/${player.pseudo}/64`}
                  alt={player.pseudo}
                  width={64}
                  height={64}
                  className="rounded-[10px]"
                  unoptimized
                />
              </div>
              <h3 className="text-sm font-bold text-white truncate">{player.pseudo}</h3>
              <p className="text-xs text-gray-500 mb-1">{player.faction}</p>
              <p className="text-lg font-extrabold text-neon-purple">{getValue(player)}</p>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="card overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-dark-700/50 text-left">
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-12">#</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Joueur</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Faction</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Kills</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Morts</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">K/D</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  {tab === "money" ? "Argent" : tab === "playtime" ? "Temps" : "Valeur"}
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry, i) => (
                <tr key={entry.pseudo} className="border-t border-gray-800/40 hover:bg-dark-700/30 transition-colors">
                  <td className="px-4 py-3 text-gray-500 font-bold">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={`https://mc-heads.net/avatar/${entry.pseudo}/24`}
                        alt={entry.pseudo}
                        width={24}
                        height={24}
                        className="rounded"
                        unoptimized
                      />
                      <span className="font-semibold text-white">{entry.pseudo}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{entry.faction}</td>
                  <td className="px-4 py-3 text-gray-300">{entry.kills.toLocaleString("fr-FR")}</td>
                  <td className="px-4 py-3 text-gray-400">{entry.deaths.toLocaleString("fr-FR")}</td>
                  <td className="px-4 py-3 text-gray-300">{(entry.kills / (entry.deaths || 1)).toFixed(2)}</td>
                  <td className="px-4 py-3 text-right font-bold text-neon-purple">{getValue(entry)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-xs text-gray-600 mt-6">Données de démonstration — sera connecté à l&apos;API du serveur.</p>
    </div>
  );
}
