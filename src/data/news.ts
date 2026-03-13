export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  tag: "Mise à jour" | "Événement" | "Maintenance" | "Annonce";
  summary: string;
  content: string;
}

export const NEWS_TAG_COLORS: Record<string, string> = {
  "Mise à jour": "badge-cyan",
  "Événement": "badge-purple",
  "Maintenance": "badge-amber",
  "Annonce": "badge-green",
};

export const NEWS: NewsArticle[] = [
  {
    id: "update-v1",
    title: "Lancement du serveur — Version 1.0",
    date: "2026-03-01",
    tag: "Annonce",
    summary: "Antallia ouvre ses portes ! Découvrez toutes les features disponibles au lancement.",
    content: `Le serveur Antallia PVP Faction est officiellement ouvert !

**Ce qui vous attend :**
- Système de Factions complet avec power et claims
- Économie équilibrée avec /shop et /ah
- 6 enchantements exclusifs
- Donjons PvE avec boss
- Événements automatiques (KOTH, Boss Raid, Envoy)
- Système de quêtes journalières

Rejoignez-nous sur play.antallia-pvp-faction.fr !`,
  },
  {
    id: "event-koth",
    title: "Premier tournoi KOTH ce samedi",
    date: "2026-03-08",
    tag: "Événement",
    summary: "Le premier King of the Hill officiel aura lieu samedi à 16h. Récompenses exclusives à gagner !",
    content: `Le premier grand tournoi KOTH d'Antallia arrive ce samedi !

**Détails :**
- Date : Samedi 8 mars à 16h
- Durée : 30 minutes
- Lieu : Arène KOTH (warp automatique)

**Récompenses :**
- 1er : Grade Héros + 100 000$ + Kit Légendaire
- 2ème : 50 000$ + Kit Épique
- 3ème : 25 000$ + Kit Rare

Préparez vos armures et potions !`,
  },
  {
    id: "update-enchants",
    title: "Nouveaux enchantements custom",
    date: "2026-03-05",
    tag: "Mise à jour",
    summary: "3 nouveaux enchantements exclusifs ont été ajoutés : Célérité, Pillage et Extraction.",
    content: `Mise à jour des enchantements !

**Nouveaux enchantements :**
- **Célérité I-II** — Boost de vitesse après un kill
- **Pillage I-III** — Augmente les drops des mobs
- **Extraction I-II** — Auto-smelt des minerais

Ces livres sont obtenables dans les donjons et lors des événements Boss Raid.`,
  },
  {
    id: "maintenance-1",
    title: "Maintenance prévue mardi",
    date: "2026-03-10",
    tag: "Maintenance",
    summary: "Une maintenance de 2h est prévue mardi pour améliorer les performances du serveur.",
    content: `Maintenance prévue mardi 10 mars de 14h à 16h.

**Améliorations :**
- Optimisation du TPS en zone de raid
- Fix du bug de duplication d'items au /ah
- Amélioration de l'anti-cheat
- Réinitialisation du End

Le serveur sera inaccessible pendant cette période. Merci de votre compréhension !`,
  },
];
