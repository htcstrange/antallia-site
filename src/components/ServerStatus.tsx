"use client";

import { useEffect, useState } from "react";

interface Status {
  online: boolean;
  players: number;
  maxPlayers: number;
  version: string;
}

export default function ServerStatus() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus({ online: false, players: 0, maxPlayers: 0, version: "—" }));
  }, []);

  return (
    <div className="card border-neon-purple/20">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-3 h-3 rounded-full ${status?.online ? "bg-neon-green animate-pulse-slow" : "bg-red-500"}`} />
        <span className="text-sm font-bold text-white uppercase tracking-wider">
          {status?.online ? "En ligne" : "Hors ligne"}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-2xl font-extrabold text-white">{status?.players ?? "—"}</p>
          <p className="text-xs text-gray-500 mt-0.5">Joueurs</p>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-white">{status?.maxPlayers ?? "—"}</p>
          <p className="text-xs text-gray-500 mt-0.5">Max</p>
        </div>
        <div>
          <p className="text-2xl font-extrabold glow-text">V1</p>
          <p className="text-xs text-gray-500 mt-0.5">Antallia</p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-800/60">
        <p className="text-xs font-mono text-gray-400">play.antallia-pvp-faction.fr</p>
      </div>
    </div>
  );
}
