export interface StaffMember {
  pseudo: string;
  role: "Fondateur" | "Admin" | "Responsable" | "Modérateur" | "Builder" | "Développeur";
  description: string;
}

export const ROLE_COLORS: Record<string, string> = {
  "Fondateur": "from-amber-500 to-red-500",
  "Admin": "from-red-500 to-neon-pink",
  "Responsable": "from-neon-purple to-purple-600",
  "Modérateur": "from-neon-cyan to-cyan-600",
  "Builder": "from-neon-green to-emerald-600",
  "Développeur": "from-blue-500 to-indigo-600",
};

export const ROLE_BADGES: Record<string, string> = {
  "Fondateur": "badge-amber",
  "Admin": "badge-red",
  "Responsable": "badge-purple",
  "Modérateur": "badge-cyan",
  "Builder": "badge-green",
  "Développeur": "badge-cyan",
};

export const STAFF: StaffMember[] = [
  {
    pseudo: "DarkSlayer_77",
    role: "Fondateur",
    description: "Créateur et gérant principal du serveur Antallia.",
  },
  {
    pseudo: "xN1ghtmare",
    role: "Admin",
    description: "Administration générale, gestion des plugins et configuration.",
  },
  {
    pseudo: "LeFrancais_",
    role: "Responsable",
    description: "Responsable de l'équipe de modération et des événements.",
  },
  {
    pseudo: "AzureFalcon",
    role: "Modérateur",
    description: "Modération du chat et du gameplay, support joueurs.",
  },
  {
    pseudo: "NovaStrike",
    role: "Modérateur",
    description: "Modération du chat, vérification anti-cheat.",
  },
  {
    pseudo: "DragonFire42",
    role: "Builder",
    description: "Création des maps, arènes et donjons du serveur.",
  },
  {
    pseudo: "CyberPvP",
    role: "Développeur",
    description: "Développement des plugins custom et de l'API.",
  },
];
