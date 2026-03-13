import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-800/50 border-t border-gray-800/60 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center font-extrabold text-sm text-white">A</div>
              <span className="text-lg font-bold text-white tracking-tight">Antallia</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Serveur Minecraft PVP Faction avec un gameplay sur-mesure, des événements réguliers et une communauté active.
            </p>
            <p className="text-xs text-gray-600 mt-3 font-mono">play.antallia-pvp-faction.fr</p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Navigation</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-gray-400 hover:text-neon-purple transition">Accueil</Link>
              <Link href="/boutique" className="block text-sm text-gray-400 hover:text-neon-purple transition">Boutique</Link>
              <Link href="/wiki" className="block text-sm text-gray-400 hover:text-neon-purple transition">Wiki</Link>
              <Link href="/classement" className="block text-sm text-gray-400 hover:text-neon-purple transition">Classement</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Informations</h4>
            <div className="space-y-2">
              <Link href="/actualites" className="block text-sm text-gray-400 hover:text-neon-purple transition">Actualités</Link>
              <Link href="/equipe" className="block text-sm text-gray-400 hover:text-neon-purple transition">Équipe</Link>
              <Link href="/reglement" className="block text-sm text-gray-400 hover:text-neon-purple transition">Règlement</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Communauté</h4>
            <div className="space-y-2">
              <a href="https://discord.gg/h4cuQqfNU7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                Discord
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/60 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Antallia — Non affilié à Mojang/Microsoft.</p>
        </div>
      </div>
    </footer>
  );
}
