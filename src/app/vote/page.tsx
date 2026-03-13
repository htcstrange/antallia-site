"use client";

import { useState, useEffect } from "react";

interface VoteSite {
  name: string;
  url: string;
  icon: string;
  color: string;
}

interface TopVoter {
  rank: number;
  pseudo: string;
  votes: number;
}

const VOTE_SITES: VoteSite[] = [
  {
    name: "Serveur Minecraft",
    url: "https://serveur-minecraft.com/vote/antallia",
    icon: "🇫🇷",
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "Minecraft Server List",
    url: "https://minecraft-server-list.com/server/antallia/vote/",
    icon: "🌍",
    color: "from-green-600 to-green-800",
  },
  {
    name: "TopG",
    url: "https://topg.org/minecraft-servers/server-antallia/vote/",
    icon: "🏆",
    color: "from-yellow-600 to-yellow-800",
  },
  {
    name: "Serveur Minecraft.org",
    url: "https://serveur-minecraft.org/vote/antallia",
    icon: "⭐",
    color: "from-purple-600 to-purple-800",
  },
  {
    name: "MinecraftServers.org",
    url: "https://minecraftservers.org/vote/antallia",
    icon: "🎮",
    color: "from-red-600 to-red-800",
  },
];

const MOCK_TOP_VOTERS: TopVoter[] = [
  { rank: 1, pseudo: "xNightKing", votes: 124 },
  { rank: 2, pseudo: "DarkBlade77", votes: 98 },
  { rank: 3, pseudo: "ShadowMiner", votes: 87 },
  { rank: 4, pseudo: "CraftLord", votes: 76 },
  { rank: 5, pseudo: "DiamondHunter", votes: 65 },
  { rank: 6, pseudo: "PvPMaster_", votes: 54 },
  { rank: 7, pseudo: "Zer0Cool", votes: 48 },
  { rank: 8, pseudo: "AzuriteQueen", votes: 42 },
  { rank: 9, pseudo: "VoidWalker", votes: 37 },
  { rank: 10, pseudo: "CelestiumKing", votes: 31 },
];

export default function VotePage() {
  const [topVoters, setTopVoters] = useState<TopVoter[]>(MOCK_TOP_VOTERS);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    setTotalVotes(topVoters.reduce((sum, v) => sum + v.votes, 0));
  }, [topVoters]);

  const rankColors: Record<number, string> = {
    1: "text-yellow-400",
    2: "text-gray-300",
    3: "text-amber-600",
  };

  const rankBg: Record<number, string> = {
    1: "bg-yellow-500/10 border-yellow-500/30",
    2: "bg-gray-400/10 border-gray-400/30",
    3: "bg-amber-600/10 border-amber-600/30",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Voter pour Antallia
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Soutenez le serveur en votant chaque jour et recevez des récompenses exclusives !
          </p>

          {/* Rewards Banner */}
          <div className="inline-flex items-center gap-6 bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-8 py-4">
            <div className="text-center">
              <p className="text-2xl font-black text-green-400">100$</p>
              <p className="text-xs text-gray-500">in-game par vote</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-black text-purple-400">+2</p>
              <p className="text-xs text-gray-500">points de compétence</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-black text-cyan-400">{totalVotes}</p>
              <p className="text-xs text-gray-500">votes ce mois</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vote Sites */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sites de vote</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VOTE_SITES.map((site) => (
            <a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/40 hover:bg-white/[0.08] transition-all"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${site.color} flex items-center justify-center text-xl`}
                >
                  {site.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors">
                    {site.name}
                  </h3>
                  <p className="text-xs text-gray-500">Cliquez pour voter</p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Votez sur chaque site pour maximiser vos récompenses ! Les votes sont comptabilisés toutes les 24h.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Comment ça marche ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StepCard
            step={1}
            title="Votez"
            description="Cliquez sur un site de vote ci-dessus et entrez votre pseudo Minecraft."
          />
          <StepCard
            step={2}
            title="Réclamez"
            description="Connectez-vous au serveur et tapez /vote claim pour récupérer vos récompenses."
          />
          <StepCard
            step={3}
            title="Profitez"
            description="Recevez 100$ in-game + 2 points de compétence par vote validé."
          />
        </div>
      </section>

      {/* Leaderboard */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Top Voteurs du Mois</h2>
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
          {/* Podium */}
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/10">
            {topVoters.slice(0, 3).map((voter) => (
              <div
                key={voter.rank}
                className={`text-center p-4 rounded-xl border ${rankBg[voter.rank] || "bg-white/5 border-white/10"}`}
              >
                <p className={`text-3xl font-black ${rankColors[voter.rank] || "text-white"}`}>
                  #{voter.rank}
                </p>
                <p className="text-sm font-bold text-white mt-2">{voter.pseudo}</p>
                <p className="text-xs text-gray-400">{voter.votes} votes</p>
              </div>
            ))}
          </div>

          {/* Rest of leaderboard */}
          <div className="divide-y divide-white/5">
            {topVoters.slice(3).map((voter) => (
              <div key={voter.rank} className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-500 w-8">#{voter.rank}</span>
                  <span className="text-sm text-white font-medium">{voter.pseudo}</span>
                </div>
                <span className="text-sm text-gray-400">{voter.votes} votes</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-4">
          Classement mis à jour en temps réel. Le top 3 reçoit des récompenses bonus en fin de mois.
        </p>
      </section>
    </div>
  );
}

function StepCard({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-sm font-black mx-auto mb-3">
        {step}
      </div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
