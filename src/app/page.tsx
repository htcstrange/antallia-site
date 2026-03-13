"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ServerStatus from "@/components/ServerStatus";
import CopyIP from "@/components/CopyIP";
import DiscordWidget from "@/components/DiscordWidget";

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  tag: string;
  summary: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const features = [
  {
    icon: "⚔️",
    title: "PVP Faction",
    desc: "Crée ta faction, recrute des alliés, construis ta base et raid tes ennemis.",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: "🏰",
    title: "Donjons & Boss",
    desc: "Affronte des boss PvE dans des donjons avec du loot épique et des enchantements custom.",
    color: "from-neon-purple to-purple-600",
  },
  {
    icon: "🎯",
    title: "Événements",
    desc: "KOTH, Boss Raid, Envoy et tournois PvP réguliers avec des récompenses exclusives.",
    color: "from-neon-cyan to-cyan-600",
  },
  {
    icon: "📜",
    title: "Quêtes",
    desc: "Des quêtes journalières et hebdomadaires pour gagner de l'argent et du loot rare.",
    color: "from-neon-green to-emerald-600",
  },
];

export default function HomePage() {
  const [recentNews, setRecentNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    fetch("/api/admin/news")
      .then((r) => r.json())
      .then((data: NewsArticle[]) => setRecentNews(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-purple/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-cyan/6 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-neon-purple/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-neon-cyan/3 rounded-full" />

        <motion.div
          className="relative max-w-5xl mx-auto px-6 text-center"
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-neon-purple/10 text-neon-purple text-sm font-semibold px-4 py-1.5 rounded-full mb-8 border border-neon-purple/20">
            <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse-slow" />
            Serveur Minecraft PVP Faction
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
            Rejoins
            <br />
            <span className="glow-text">Antallia</span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Gameplay sur-mesure, événements réguliers, quêtes et donjons.
            Une communauté active t&apos;attend.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            <CopyIP className="!py-3 !px-6 !text-sm" />
            <a href="https://discord.gg/h4cuQqfNU7" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.373-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              Rejoindre Discord
            </a>
            <Link href="/boutique" className="btn-secondary">
              Boutique
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Server Status */}
      <section className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        <ServerStatus />
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="section-title">Un gameplay <span className="glow-text">unique</span></h2>
          <p className="section-subtitle">Découvre ce qui rend Antallia différent des autres serveurs.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-hover group text-center"
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent News */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="section-title">Dernières <span className="glow-text">nouvelles</span></h2>
          <Link href="/actualites" className="btn-secondary !py-2 !px-4 !text-xs">
            Voir tout
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {recentNews.map((n) => (
            <Link key={n.id} href={`/actualites#${n.id}`} className="card-hover">
              <div className="flex items-center gap-2 mb-3">
                <span className={`badge ${n.tag === "Mise à jour" ? "badge-cyan" : n.tag === "Événement" ? "badge-purple" : n.tag === "Maintenance" ? "badge-amber" : "badge-green"}`}>
                  {n.tag}
                </span>
                <span className="text-xs text-gray-500">{new Date(n.date).toLocaleDateString("fr-FR")}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{n.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{n.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Discord Widget */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="section-title mb-4">Rejoins la <span className="glow-text">communauté</span></h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Discute avec les autres joueurs, suis les annonces en temps réel et participe aux événements directement depuis Discord.
            </p>
            <a href="https://discord.gg/h4cuQqfNU7" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.373-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              Rejoindre le Discord
            </a>
          </div>
          <DiscordWidget />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-dark-900 to-neon-cyan/10" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-3xl mx-auto px-6 text-center"
        >
          <h2 className="section-title mb-4">Prêt à <span className="glow-text">rejoindre</span> l&apos;aventure ?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Connecte-toi dès maintenant et découvre un gameplay PvP Faction inédit.
          </p>
          <CopyIP className="!py-3.5 !px-8 !text-base mx-auto" />
        </motion.div>
      </section>
    </div>
  );
}
