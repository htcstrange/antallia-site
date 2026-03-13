export interface WikiArticle {
  id: string;
  title: string;
  category: string;
  content: string;
}

export const WIKI_CATEGORIES = [
  "Commandes",
  "Factions",
  "Économie",
  "Minerais & Outils",
  "Jobs",
  "Enchantements",
  "Machines",
  "Boss",
  "Quêtes",
  "Compétences",
  "Familiers",
  "Dimension du Vide",
  "Événements",
  "Blocs Décoratifs",
];

export const WIKI_ARTICLES: WikiArticle[] = [
  // ─── Commandes ───
  {
    id: "cmd-base",
    title: "Commandes de base",
    category: "Commandes",
    content: `**/spawn** — Retour au spawn principal
**/home [nom]** — Téléportation à un home
**/sethome [nom]** — Définir un home (max 3, 5 en VIP)
**/tpa [joueur]** — Demande de téléportation
**/msg [joueur] [message]** — Message privé
**/bal** — Voir son solde
**/pay [joueur] [montant]** — Envoyer de l'argent
**/shop** — Ouvrir la boutique en jeu
**/kit** — Voir les kits disponibles`,
  },
  {
    id: "cmd-faction",
    title: "Commandes Faction",
    category: "Commandes",
    content: `**/f create [nom]** — Créer une faction
**/f invite [joueur]** — Inviter un joueur
**/f claim** — Claim le chunk actuel
**/f unclaim** — Unclaim le chunk actuel
**/f map** — Voir la carte des claims
**/f sethome** — Définir le home de la faction
**/f home** — Téléportation au home faction
**/f enemy [faction]** — Déclarer une faction ennemie
**/f ally [faction]** — Demande d'alliance
**/f kick [joueur]** — Expulser un membre
**/f disband** — Dissoudre la faction`,
  },

  // ─── Factions ───
  {
    id: "factions-guide",
    title: "Guide des Factions",
    category: "Factions",
    content: `**Créer sa faction**
Utilise /f create [nom] pour créer ta faction. Tu peux inviter jusqu'à 15 membres.

**Power & Claims**
Chaque joueur a un power max de 10. Le power total de la faction détermine le nombre de chunks que tu peux claim. Si le power descend (mort en combat), tu risques de perdre des claims.

**Raid**
Tu peux raid les bases ennemies en utilisant des TNT ou des creeper eggs. Les zones claimed ne sont pas protégées si la faction n'a pas assez de power.

**Alliances**
Maximum 1 alliance par faction. Les alliances n'empêchent pas le PvP mais permettent l'accès aux territories alliés.`,
  },

  // ─── Économie ───
  {
    id: "eco-guide",
    title: "Guide de l'économie",
    category: "Économie",
    content: `**Gagner de l'argent**
- Vendre des items au /shop
- Miner des minerais (les diamants valent 500$/u)
- Compléter des quêtes journalières
- Participer aux événements
- Tuer des mobs dans le donjon
- Voter pour le serveur (100$/vote)

**Dépenser**
- Acheter au /shop (blocs, items, spawners)
- Enchère aux enchères (/ah)
- Acheter des claims supplémentaires

**Prix de référence**
Diamant : 500$ | Émeraude : 300$ | Or : 150$ | Fer : 50$ | Spawner cochon : 25 000$ | Anthracite : 200$ | Veridium : 600$ | Azurite : 1 500$ | Celestium : 5 000$`,
  },

  // ─── Minerais & Outils ───
  {
    id: "ores-anthracite",
    title: "Anthracite",
    category: "Minerais & Outils",
    content: `**Minerai Anthracite** — Tier 1
- Localisation : Y=5 à Y=40
- Rareté : Commun
- Drop affecté par Fortune
- Utilisé pour crafter les outils Tier 1 (pioche, épée, hache, pelle)
- Outils : durabilité 500, bonus minage +10%
- Peut être fondu en lingot d'Anthracite
- Valeur : 200$/lingot`,
  },
  {
    id: "ores-veridium",
    title: "Veridium",
    category: "Minerais & Outils",
    content: `**Minerai Veridium** — Tier 2
- Localisation : Y=10 à Y=30
- Rareté : Peu commun (luminescent vert)
- Nécessite pioche Anthracite minimum
- Outils : durabilité 1 200, bonus minage +25%, auto-smelt sur pioche, dégâts augmentés sur épée
- Composant essentiel pour les machines
- Valeur : 600$/lingot`,
  },
  {
    id: "ores-azurite",
    title: "Azurite",
    category: "Minerais & Outils",
    content: `**Minerai Azurite** — Tier 3
- Localisation : Y=5 à Y=20
- Rareté : Rare (cristal bleu)
- Nécessite pioche Veridium minimum
- Outils : durabilité 2 500, bonus minage +50%, pioche 3×3, sweeping edge amélioré
- Valeur : 1 500$/gemme`,
  },
  {
    id: "ores-celestium",
    title: "Celestium",
    category: "Minerais & Outils",
    content: `**Minerai Celestium** — Ultime
- Localisation : Y=0 à Y=10
- Rareté : Très rare
- Nécessite pioche Azurite minimum
- Sert à crafter l'armure Celestium (set complet) :
  - +20 PV supplémentaires
  - Résistance I permanente
  - Réduction dégâts de chute -50%
  - Set bonus : régénération lente en combat
- Valeur : 5 000$/lingot`,
  },
  {
    id: "ores-voidstone",
    title: "Voidstone",
    category: "Minerais & Outils",
    content: `**Minerai Voidstone** — Dimension du Vide
- Localisation : Dimension du Vide uniquement
- Rareté : Rare
- Sert pour des crafts spéciaux, blocs décoratifs du Vide, et composants machines avancées
- Ne peut pas être miné avec une pioche normale — nécessite Azurite minimum`,
  },

  // ─── Jobs ───
  {
    id: "job-mineur",
    title: "Job : Mineur",
    category: "Jobs",
    content: `**Mineur** — Niveaux 1 à 50
Gagnez de l'argent en minant des blocs. XP bonus sur les minerais custom Antallia.
- Niveau 10 : +10% revenus de minage
- Niveau 25 : Double XP sur minerais custom
- Niveau 40 : Chance de double drop (5%)
- Niveau 50 : Auto-smelt passif
Revenus : 1-5$/bloc selon le minerai.`,
  },
  {
    id: "job-bucheron",
    title: "Job : Bûcheron",
    category: "Jobs",
    content: `**Bûcheron** — Niveaux 1 à 50
Récompenses pour couper du bois et des feuilles.
- Niveau 10 : +10% revenus
- Niveau 25 : Abattage automatique (tout l'arbre tombe)
- Niveau 40 : Replantage automatique
- Niveau 50 : Triple drops de bois
Revenus : 2-4$/bûche.`,
  },
  {
    id: "job-fermier",
    title: "Job : Fermier",
    category: "Jobs",
    content: `**Fermier** — Niveaux 1 à 50
Revenus en récoltant des cultures et en élevant des animaux.
- Niveau 10 : +10% revenus
- Niveau 25 : Croissance accélérée des cultures proches
- Niveau 30 : Récolte automatique (3×3)
- Niveau 50 : Double récolte permanente
Revenus : 1-3$/récolte.`,
  },
  {
    id: "job-chasseur",
    title: "Job : Chasseur",
    category: "Jobs",
    content: `**Chasseur** — Niveaux 1 à 50
Argent en tuant des mobs hostiles et passifs.
- Niveau 10 : +15% revenus
- Niveau 20 : Bonus de loot (+1 drop)
- Niveau 35 : Dégâts +10% contre les mobs
- Niveau 50 : Loot légendaire rare sur les mobs
Revenus : 5-50$/mob selon la difficulté.`,
  },
  {
    id: "job-pecheur",
    title: "Job : Pêcheur",
    category: "Jobs",
    content: `**Pêcheur** — Niveaux 1 à 50
Récompenses de pêche améliorées et poissons exclusifs.
- Niveau 10 : +10% revenus
- Niveau 15 : Poissons rares débloqués
- Niveau 30 : Temps de pêche réduit -30%
- Niveau 50 : Trésor garanti toutes les 10 prises
Revenus : 3-20$/prise.`,
  },
  {
    id: "job-forgeron",
    title: "Job : Forgeron",
    category: "Jobs",
    content: `**Forgeron** — Niveaux 1 à 50
XP et argent en craftant des items, outils et armures.
- Niveau 10 : +10% XP de craft
- Niveau 25 : Réduction coût de réparation -25%
- Niveau 40 : Chance de craft double (10%)
- Niveau 50 : Qualité supérieure (durabilité +20% sur crafts)
Revenus : 5-15$/craft.`,
  },
  {
    id: "job-enchanteur",
    title: "Job : Enchanteur",
    category: "Jobs",
    content: `**Enchanteur** — Niveaux 1 à 50
Bonus sur les enchantements et création de livres custom.
- Niveau 10 : -1 niveau requis pour enchanter
- Niveau 20 : Livres d'enchantement custom débloqués
- Niveau 35 : Chance d'enchantement bonus (+10%)
- Niveau 50 : Enchantement sans coût de niveau (1x/jour)
Revenus : 10-30$/enchantement.`,
  },
  {
    id: "job-alchimiste",
    title: "Job : Alchimiste",
    category: "Jobs",
    content: `**Alchimiste** — Niveaux 1 à 50
Potions améliorées et effets prolongés.
- Niveau 10 : Durée des potions +10%
- Niveau 20 : Potions custom débloquées (Haste, Luck)
- Niveau 30 : Potions améliorées (effets x1.5)
- Niveau 50 : Potion ultime craftable (tous effets positifs 30s)
Revenus : 5-25$/potion.`,
  },
  {
    id: "job-cuisinier",
    title: "Job : Cuisinier",
    category: "Jobs",
    content: `**Cuisinier** — Niveaux 1 à 50
Nourriture avec effets bonus et recettes exclusives.
- Niveau 10 : +10% restauration de faim
- Niveau 20 : Recettes exclusives (buffet, festin)
- Niveau 35 : Nourriture avec effets de potion
- Niveau 50 : Festin Divin (nourrit tout le groupe + buffs)
Revenus : 3-15$/plat.`,
  },
  {
    id: "job-explorateur",
    title: "Job : Explorateur",
    category: "Jobs",
    content: `**Explorateur** — Niveaux 1 à 50
Récompenses pour voyager, découvrir des biomes et structures.
- Niveau 10 : Carte étendue
- Niveau 25 : Bonus dans les donjons (+20% loot)
- Niveau 35 : Localisation de structures rares
- Niveau 50 : Accès aux zones secrètes du serveur
Revenus : 5-20$/découverte.`,
  },

  // ─── Enchantements ───
  {
    id: "ench-combat",
    title: "Enchantements de combat",
    category: "Enchantements",
    content: `**Enchantements combat** — S'appliquent sur les épées via l'enclume avec des livres obtenus en donjon.

- **Vampirisme I-III** — Vol de vie (5/10/15% des dégâts infligés)
- **Foudre I-II** — Chance d'invoquer un éclair (5/10%) + dégâts feu
- **Rage I-III** — +5/10/15% dégâts quand sous 50% PV
- **Exécution I-II** — Dégâts doublés si l'ennemi est sous 20/30% PV
- **Célérité I-II** — Boost de vitesse après un kill (5/10 secondes)`,
  },
  {
    id: "ench-defense",
    title: "Enchantements de défense",
    category: "Enchantements",
    content: `**Enchantements défense** — S'appliquent sur les armures via l'enclume.

- **Blindage I-III** — Réduction dégâts supplémentaire (3/5/8%), stack avec Protection
- **Épines Venimeuses I-II** — Empoisonne l'attaquant (3/5 secondes)
- **Bouclier Magique I-III** — Absorbe 5/10/15% des dégâts en mana
- **Résurgence I-II** — Régénération accélérée quand sous 30% PV`,
  },
  {
    id: "ench-outils",
    title: "Enchantements d'outils",
    category: "Enchantements",
    content: `**Enchantements outils** — S'appliquent sur les pioches, haches et pelles.

- **Extraction I-II** — Auto-smelt des minerais (ne combine pas avec Fortune)
- **Télékinésie I** — Les drops vont directement dans l'inventaire
- **Veine I-III** — Mine les veines entières (3/5/8 blocs maximum)
- **Excavation I-II** — Minage en 3×3 (Tier I) ou 5×5 (Tier II)`,
  },
  {
    id: "ench-utility",
    title: "Enchantements utilitaires & arc",
    category: "Enchantements",
    content: `**Enchantements utilitaires**
- **Pillage I-III** — Augmente les drops des mobs (25/50/100%)
- **Bond I-III** — Saut augmenté (1.5×/2×/3×), bottes uniquement
- **Marche sur l'eau I** — Permet de marcher sur l'eau, bottes uniquement

**Enchantements d'arc**
- **Flèche Explosive I-II** — Les flèches explosent à l'impact (rayon 1/2 blocs)
- **Flèche Traçante I** — Les flèches suivent la cible la plus proche`,
  },

  // ─── Machines ───
  {
    id: "machine-autominer",
    title: "Auto-Miner",
    category: "Machines",
    content: `**Auto-Miner** — Mine automatiquement dans un rayon de 5 blocs.
- Carburant : Charbon (1 charbon = 30 secondes)
- Craft : 4 Veridium + 1 Diamant + 4 Redstone
- Se place comme un bloc, configurable via clic droit
- Ne mine pas les blocs protégés (claims)`,
  },
  {
    id: "machine-concasseur",
    title: "Concasseur",
    category: "Machines",
    content: `**Concasseur** — Broie les minerais pour doubler la production.
- Temps de traitement : 10 secondes par item
- Craft : 3 Fer + 2 Anthracite + 1 Piston
- 50% de chance de doubler le drop, 100% au niveau Forgeron 30+
- Fonctionne avec tous les minerais vanilla et custom`,
  },
  {
    id: "machine-fonderie",
    title: "Fonderie Améliorée",
    category: "Machines",
    content: `**Fonderie Améliorée** — Fond 4 items simultanément.
- 2× plus rapide qu'un four vanilla
- Craft : 4 Briques + 2 Veridium + 1 Blaze Rod
- 4 slots d'entrée, 4 slots de sortie
- Compatible avec Hopper pour automatisation`,
  },
  {
    id: "machine-enchanteur",
    title: "Enchanteur Automatique",
    category: "Machines",
    content: `**Enchanteur Automatique** — Applique des enchantements aléatoires.
- Carburant : Lapis Lazuli (1 lapis = 1 enchantement)
- Craft : 4 Azurite + 2 Lapis + 1 Table d'Enchantement
- Enchantements aléatoires de Tier I à III
- Chance d'enchantement custom Antallia : 10%`,
  },
  {
    id: "machine-spawner",
    title: "Générateur de Mob",
    category: "Machines",
    content: `**Générateur de Mob** — Spawner personnalisable.
- Configurable via GUI (type de mob, vitesse, quantité)
- Craft : 4 Obsidienne + 2 Celestium + 1 Spawner + 2 Ender Pearl
- Maximum 3 par chunk
- Mobs possibles : Zombie, Squelette, Araignée, Blaze, Enderman`,
  },
  {
    id: "machine-collecteur",
    title: "Collecteur",
    category: "Machines",
    content: `**Collecteur** — Ramasse automatiquement les drops.
- Rayon : 8 blocs autour du collecteur
- Craft : 4 Fer + 1 Entonnoir + 2 Ender Pearl + 2 Redstone
- Stockage interne de 27 slots (comme un coffre)
- Peut être relié à des coffres adjacents`,
  },
  {
    id: "machine-teleporteur",
    title: "Téléporteur",
    category: "Machines",
    content: `**Téléporteur** — Téléportation entre deux points liés.
- Craft : 4 Celestium + 4 Ender Pearl + 1 Nether Star
- Placer 2 téléporteurs et les lier avec un Cristal de Lien
- Cooldown : 30 secondes entre chaque utilisation
- Fonctionne entre dimensions`,
  },

  // ─── Boss ───
  {
    id: "boss-shadow-king",
    title: "Roi des Ombres",
    category: "Boss",
    content: `**Roi des Ombres** — Boss du Nether
- PV : 500 | Dégâts : 8-15 | Armure : 10
- Capacités : Invoque des sbires (zombies pigmen améliorés), zone d'ombre (Wither II, 5 blocs), téléportation
- Phase 2 (sous 50% PV) : Invincibilité 3s puis rage mode (+50% vitesse)
- Drops : Lame de l'Ombre (épée custom), 5 000$, XP massive, 2 livres d'enchantement rares
- Spawn : /boss ou événement automatique à 20h chaque jour`,
  },
  {
    id: "boss-crystal-guardian",
    title: "Gardien Cristallin",
    category: "Boss",
    content: `**Gardien Cristallin** — Boss de l'End
- PV : 400 | Dégâts : 10-12 | Armure : 15
- Capacités : Bouclier de cristal (regen 20 PV/s pendant 5s), laser dévastateur (ligne droite), invoque des Shulkers
- Phase 2 : Bouclier permanent — il faut détruire 4 cristaux autour de l'arène
- Drops : Cristal de Protection (accessoire, -10% dégâts permanent), 4 000$
- Spawn : End, réapparaît toutes les 6h`,
  },
  {
    id: "boss-lava-titan",
    title: "Titan de Lave",
    category: "Boss",
    content: `**Titan de Lave** — Boss de la Dimension du Vide
- PV : 600 | Dégâts : 12-20 | Armure : 20
- Capacités : Zone de lave (3×3 autour de lui), charges dévastatrices (dash + dégâts), pluie de météores, immunité au feu
- Phase 2 : Le sol se transforme en lave, plateforme réduite
- Le boss le plus difficile du serveur — conseillé en groupe de 3+
- Drops : Cœur du Titan (composant armure Celestium ultime), 6 000$, Voidstone ×5`,
  },
  {
    id: "boss-spider-queen",
    title: "Araignée Reine",
    category: "Boss",
    content: `**Araignée Reine** — Boss du Monde Normal
- PV : 300 | Dégâts : 6-10 | Armure : 5
- Capacités : Invoque des araignées (5 par vague), toile ralentissante (Slowness II), poison puissant (Poison III, 8s)
- Phase 2 : Se suspend au plafond, attaques à distance
- Drops : Soie d'Araignée Reine (craft armure spéciale), 3 000$, Œufs d'araignée ×3
- Spawn : Cavernes profondes (Y < 20), réapparaît toutes les 4h`,
  },

  // ─── Quêtes ───
  {
    id: "quests-daily",
    title: "Quêtes Journalières",
    category: "Quêtes",
    content: `**Quêtes Journalières** — Reset chaque jour à minuit

Exemples de quêtes :
- Miner 64 minerais (n'importe lequel) — 500$
- Tuer 20 mobs hostiles — 800$
- Pêcher 10 poissons — 400$
- Crafter 5 outils — 600$
- Vendre pour 1 000$ au shop — 500$ bonus

3 quêtes par jour, récompenses : 400-2 000$ + XP de job. Bonus de complétion totale : +500$.`,
  },
  {
    id: "quests-weekly",
    title: "Quêtes Hebdomadaires",
    category: "Quêtes",
    content: `**Quêtes Hebdomadaires** — Reset chaque lundi à minuit

Exemples de quêtes :
- Tuer un boss — 5 000$
- Miner 500 minerais custom — 8 000$
- Gagner 5 combats PvP — 6 000$
- Compléter 15 quêtes journalières — 10 000$
- Découvrir la Dimension du Vide — 7 000$

2 quêtes par semaine, récompenses : 5 000-10 000$ + items rares + points de compétence.`,
  },
  {
    id: "quests-story",
    title: "Quêtes d'Histoire",
    category: "Quêtes",
    content: `**Quêtes d'Histoire** — Scénario Antallia en 10 chapitres

1. L'Éveil — Tutoriel et découverte du spawn
2. Premiers Pas — Crafter ses premiers outils custom
3. L'Appel des Mines — Miner chaque type de minerai
4. Le Forgeron — Crafter un outil de chaque tier
5. Les Profondeurs — Explorer la Dimension du Vide
6. Face à l'Ombre — Vaincre le Roi des Ombres
7. Le Cristal — Vaincre le Gardien Cristallin
8. La Reine — Vaincre l'Araignée Reine
9. Le Titan — Vaincre le Titan de Lave
10. Légende d'Antallia — Obtenir l'armure Celestium complète

Récompense finale : Titre exclusif "Légende" + armure cosmétique dorée + 50 000$.`,
  },
  {
    id: "quests-achievements",
    title: "Succès / Achievements",
    category: "Quêtes",
    content: `**Plus de 50 succès à débloquer**

**Combat** (12 succès) : Premier kill PvP, 100 kills, Tueur de boss, Sans mort, etc.
**Exploration** (10 succès) : Visiter chaque dimension, trouver chaque biome, etc.
**Artisanat** (10 succès) : Crafter un outil de chaque tier, utiliser chaque machine, etc.
**Social** (8 succès) : Créer une faction, 10 membres, alliance, etc.
**Boss** (5 succès) : Vaincre chaque boss, vaincre un boss en solo, etc.
**Collection** (8 succès) : Obtenir chaque minerai, chaque enchantement custom, etc.

Récompenses : 1-3 points de compétence par succès, titres exclusifs, cosmétiques.`,
  },

  // ─── Compétences ───
  {
    id: "skills-combat",
    title: "Arbre Combat (8 compétences)",
    category: "Compétences",
    content: `**Arbre de compétences : Combat**

1. **Force Brute** — +5% dégâts au corps à corps par niveau (3 niveaux)
2. **Parade** — Réduction de 3% des dégâts reçus par niveau (3 niveaux)
3. **Combo** — Attaques successives de plus en plus rapides (2 niveaux)
4. **Berserker** — Sous 30% PV : +25% dégâts, +10% vitesse (1 niveau)
5. **Riposte** — 10% de chance de renvoyer les dégâts (2 niveaux)
6. **Vampirisme Passif** — Vol de vie permanent 3% (1 niveau)
7. **Maîtrise des Armes** — Dégâts +10% avec les épées custom (2 niveaux)
8. **Frappe Finale** — Les coups critiques font +30% dégâts (1 niveau)

Prérequis : Débloquer dans l'ordre, chaque compétence nécessite la précédente.`,
  },
  {
    id: "skills-mining",
    title: "Arbre Minage (8 compétences)",
    category: "Compétences",
    content: `**Arbre de compétences : Minage**

1. **Mineur Expert** — +10% vitesse de minage par niveau (3 niveaux)
2. **Fortune Naturelle** — +1 drop de minerai par niveau (2 niveaux)
3. **Sens du Minerai** — Highlight des minerais proches (rayon 5/10 blocs) (2 niveaux)
4. **Minage Rapide** — Haste I permanent (1 niveau)
5. **Résistance Souterraine** — -20% dégâts sous Y=40 (1 niveau)
6. **Veine Complète** — Mine automatiquement toute la veine (1 niveau)
7. **Prospection** — Chance de trouver des gemmes bonus (15%) (2 niveaux)
8. **Maître Forgeron** — Réparation gratuite 1×/jour (1 niveau)

Prérequis : Débloquer dans l'ordre, chaque compétence nécessite la précédente.`,
  },
  {
    id: "skills-survival",
    title: "Arbre Survie (8 compétences)",
    category: "Compétences",
    content: `**Arbre de compétences : Survie**

1. **Cœur Résistant** — +2 PV max par niveau (3 niveaux, +6 PV total)
2. **Régénération** — Regen naturelle +20% par niveau (2 niveaux)
3. **Agilité** — Speed I permanent (1 niveau)
4. **Résistance Poison** — Immunité aux poisons (1 niveau)
5. **Chute Légère** — -50% dégâts de chute (1 niveau)
6. **Second Souffle** — Sous 10% PV : burst de regen (1 niveau)
7. **Endurance** — Faim réduite -30% (2 niveaux)
8. **Immunité** — Résistance aux effets négatifs -50% durée (1 niveau)

Prérequis : Débloquer dans l'ordre, chaque compétence nécessite la précédente.`,
  },
  {
    id: "skills-social",
    title: "Arbre Social (8 compétences)",
    category: "Compétences",
    content: `**Arbre de compétences : Social**

1. **Marchand** — Prix réduits au /shop -5% par niveau (3 niveaux)
2. **Charisme** — +10% XP quand en groupe par niveau (2 niveaux)
3. **Leader** — Bonus de power faction +1 par niveau (2 niveaux)
4. **Diplomate** — +1 alliance possible pour la faction (1 niveau)
5. **Mentor** — XP partagée avec les nouveaux joueurs proches (1 niveau)
6. **Stratège** — Bonus de faction en raid +10% dégâts (1 niveau)
7. **Inspirateur** — Aura : +5% dégâts pour les alliés proches (1 niveau)
8. **Légende** — Titre spécial + aura cosmétique (1 niveau)

Prérequis : Débloquer dans l'ordre, chaque compétence nécessite la précédente.`,
  },
  {
    id: "skills-points",
    title: "Points de compétence",
    category: "Compétences",
    content: `**Comment gagner des points de compétence**

- 1 point par montée de niveau joueur
- 1-3 points par succès complété
- 2 points par vote pour le serveur
- 5 points pour compléter un chapitre d'histoire

**Maximum : 32 points investissables**
Réinitialisation possible pour 10 000$ au PNJ du spawn.
Les points sont partagés entre les 4 arbres — choisissez votre spécialisation !`,
  },

  // ─── Familiers ───
  {
    id: "pet-loup",
    title: "Loup de Combat",
    category: "Familiers",
    content: `**Loup de Combat** — Pet de combat basique
- Dégâts : 4-8
- PV : 40
- Capacité : Morsure Féroce (double dégâts pendant 5 secondes, cooldown 30s)
- Obtention : Apprivoiser un loup avec 5 Anthracite
- Évolution : Niveau 10 → Loup Alpha (+50% stats)`,
  },
  {
    id: "pet-chat",
    title: "Chat Porte-Bonheur",
    category: "Familiers",
    content: `**Chat Porte-Bonheur** — Pet de loot
- Bonus : +15% loot sur tous les mobs
- PV : 20
- Capacité : Fortune (+1 drop garanti pendant 30 secondes, cooldown 60s)
- Obtention : Apprivoiser un chat avec 3 Veridium
- Évolution : Niveau 10 → Chat Doré (+25% loot au lieu de 15%)`,
  },
  {
    id: "pet-phenix",
    title: "Phénix",
    category: "Familiers",
    content: `**Phénix** — Pet de résurrection
- Capacité passive : Résurrection 1 fois par jour avec 50% PV
- Capacité active : Aura de Feu (3 dégâts/s aux ennemis dans 3 blocs, durée 10s, cooldown 45s)
- PV : 30
- Obtention : Quête d'histoire chapitre 6 (vaincre le Roi des Ombres)
- Évolution : Niveau 10 → Phénix Éternel (résurrection avec 75% PV)`,
  },
  {
    id: "pet-golem",
    title: "Golem de Fer",
    category: "Familiers",
    content: `**Golem de Fer** — Pet tank
- Capacité passive : Absorbe 20% des dégâts reçus par le joueur
- Capacité active : Bouclier de Pierre (invincibilité 3 secondes, cooldown 60s)
- PV : 100
- Obtention : Crafter avec 4 Blocs de Fer + 1 Celestium
- Évolution : Niveau 10 → Golem de Diamant (absorbe 30%)`,
  },
  {
    id: "pet-dragon",
    title: "Dragon Miniature",
    category: "Familiers",
    content: `**Dragon Miniature** — Pet d'attaque à distance
- Dégâts : 6 (boule de feu)
- Portée : 10 blocs
- Capacité : Souffle de Dragon (cône de feu, 8 dégâts AoE, cooldown 30s)
- PV : 35
- Obtention : Œuf de dragon (drop du Gardien Cristallin, 10% chance)
- Évolution : Niveau 10 → Dragon Ancien (dégâts ×2)`,
  },
  {
    id: "pet-fantome",
    title: "Fantôme",
    category: "Familiers",
    content: `**Fantôme** — Pet furtif
- Capacité passive : Invisibilité du nametag (les ennemis ne voient pas votre nom)
- Capacité active : Phase (traverse les murs pendant 5 secondes, cooldown 45s)
- PV : 15
- Obtention : Drop de la Dimension du Vide (Ombres, 5% chance)
- Évolution : Niveau 10 → Spectre (Phase dure 8s)`,
  },
  {
    id: "pet-slime",
    title: "Slime Royal",
    category: "Familiers",
    content: `**Slime Royal** — Pet d'XP
- Capacité passive : +20% XP gagnée
- Capacité active : Rebond (knockback augmenté aux ennemis dans 4 blocs, cooldown 25s)
- PV : 50
- Obtention : Tuer 100 slimes, puis invoquer avec 10 Slimeballs + 1 Azurite
- Évolution : Niveau 10 → Slime Roi (+30% XP)`,
  },
  {
    id: "pet-blaze",
    title: "Blaze Apprivoisé",
    category: "Familiers",
    content: `**Blaze Apprivoisé** — Pet de feu
- Dégâts : 5 (boule de feu)
- Capacité active : Pluie de Feu (zone AoE 5×5, 4 dégâts/s pendant 5s, cooldown 40s)
- PV : 25
- Obtention : Drop du Roi des Ombres (15% chance)
- Évolution : Niveau 10 → Blaze Infernal (Pluie de Feu 7×7)`,
  },
  {
    id: "pet-araignee",
    title: "Araignée Tissée",
    category: "Familiers",
    content: `**Araignée Tissée** — Pet de contrôle
- Capacité passive : Ralentit les ennemis dans 5 blocs (Slowness I)
- Capacité active : Toile (immobilise 1 ennemi pendant 3 secondes, cooldown 25s)
- PV : 30
- Obtention : Drop de l'Araignée Reine (20% chance)
- Évolution : Niveau 10 → Araignée Reine Jr (Toile immobilise 2 ennemis)`,
  },
  {
    id: "pet-enderman",
    title: "Enderman Lié",
    category: "Familiers",
    content: `**Enderman Lié** — Pet de mobilité
- Capacité passive : Téléportation courte distance passive (évite 10% des attaques)
- Capacité active : Déplacement (TP le joueur 10 blocs en avant, cooldown 20s)
- PV : 30
- Obtention : Ender Pearl ×20 + Azurite ×5 au PNJ
- Évolution : Niveau 10 → Enderman Ancien (TP 15 blocs, CD 15s)`,
  },
  {
    id: "pet-wither",
    title: "Wither Miniature",
    category: "Familiers",
    content: `**Wither Miniature** — Pet d'affliction
- Capacité passive : Applique Wither I aux ennemis touchés par le joueur
- Capacité active : Explosion d'Ombre (AoE Wither II 4 blocs, 5s, cooldown 50s)
- PV : 40
- Obtention : 3 Wither Skeleton Skulls + 3 Celestium au PNJ
- Évolution : Niveau 10 → Wither Lord (Wither II passif)`,
  },
  {
    id: "pet-ange",
    title: "Ange Gardien",
    category: "Familiers",
    content: `**Ange Gardien** — Pet de soin
- Capacité passive : Soin 1 PV toutes les 5 secondes
- Capacité active : Guérison Divine (full heal instantané, cooldown 120s, 1× par combat)
- PV : 20
- Obtention : Compléter toutes les quêtes d'histoire (récompense chapitre 10)
- Évolution : Niveau 10 → Archange (soin 1 PV/3s + heal groupe)`,
  },

  // ─── Dimension du Vide ───
  {
    id: "void-access",
    title: "Accéder à la Dimension du Vide",
    category: "Dimension du Vide",
    content: `**Comment accéder à la Dimension du Vide**

Portail : 10 Obsidienne (cadre classique) + 4 Ender Pearl + 2 Celestium → Clic droit avec Briquet du Vide

**Craft du Briquet du Vide :**
1 Silex + 1 Celestium + 1 Ender Pearl → Établi

Le portail s'active avec une animation violette/noire. Attention : le retour est possible uniquement via un second portail construit dans le Vide ou /spawn.`,
  },
  {
    id: "void-environment",
    title: "Environnement du Vide",
    category: "Dimension du Vide",
    content: `**La Dimension du Vide**
- Îles flottantes dans un espace sombre infini
- Gravité réduite (saut ×1.5, chute lente)
- Dégâts de vide si on tombe (Wither + dégâts, pas de mort instantanée)
- Pas de cycle jour/nuit, lumière ambiante faible
- Minerai exclusif : Voidstone
- Arbres du Vide (bois violet, feuilles noires)
- Structures : Temples du Vide (donjons avec loot)`,
  },
  {
    id: "void-mobs",
    title: "Mobs du Vide",
    category: "Dimension du Vide",
    content: `**Mobs exclusifs**

- **Ombres** — Attaquent en groupe de 3-5, invisibles dans l'obscurité, 20 PV, 4 dégâts. Drop : Essence d'Ombre.
- **Sentinelles** — Laser à distance (8 dégâts), 50 PV, stationnaires. Drop : Cœur de Sentinelle.
- **Dévoreurs** — Aspiration (attirent le joueur), 40 PV, explosion au contact. Drop : Fragment d'Étoile.
- **Titan de Lave** — Boss (voir section Boss). Spawn dans l'arène centrale du Vide.`,
  },

  // ─── Événements ───
  {
    id: "events-koth",
    title: "KOTH (King of the Hill)",
    category: "Événements",
    content: `**KOTH — Toutes les 4 heures**
- Zone de capture au centre de la map PvP
- Contrôlez la zone pendant 5 minutes consécutives pour gagner
- Contestation : le timer reset si un ennemi entre dans la zone
- Récompenses : 10 000$ + Kit Légendaire + 3 clés mystères
- Annonce 10 minutes avant le début sur le chat`,
  },
  {
    id: "events-bossraid",
    title: "Boss Raid",
    category: "Événements",
    content: `**Boss Raid — Chaque jour à 20h**
- Un boss aléatoire apparaît à l'arène du spawn
- Tout le serveur peut participer
- Récompenses partagées selon les dégâts infligés (top 3 = récompenses bonus)
- Le boss est 50% plus puissant qu'en version normale
- Durée max : 15 minutes (sinon le boss disparaît)`,
  },
  {
    id: "events-envoy",
    title: "Envoy (Largage)",
    category: "Événements",
    content: `**Envoy — Toutes les 2 heures**
- 15 caisses tombent du ciel dans la zone PvP
- Loot aléatoire : argent (500-5 000$), items, clés de crate, livres d'enchantement
- Les caisses brillent pendant 30 secondes avant de pouvoir être ouvertes
- PvP activé dans la zone de largage — attention aux embuscades !`,
  },
  {
    id: "events-tournament",
    title: "Tournoi PvP",
    category: "Événements",
    content: `**Tournoi PvP — Tous les samedis à 15h**
- Bracket 1v1 avec élimination directe
- Inscription : /tournoi join (30 minutes avant)
- Équipement standardisé fourni (pas de P2W)
- Récompenses : 1er = 50 000$ + titre "Champion" | 2e = 25 000$ | 3e = 10 000$
- Spectateurs autorisés`,
  },
  {
    id: "events-mining",
    title: "Événement Minage",
    category: "Événements",
    content: `**Événement Minage — Aléatoire**
- Annoncé sur Discord 15 minutes avant
- Durée : 1 heure
- Les minerais custom spawnent 3× plus fréquemment
- Bonus XP de minage ×2
- Zone spéciale ouverte avec minerais rares garantis`,
  },

  // ─── Blocs Décoratifs ───
  {
    id: "blocks-mineral",
    title: "Blocs de minerai",
    category: "Blocs Décoratifs",
    content: `**Blocs de minerai compressés**
Craftés avec 9 lingots/gemmes dans un établi.

- **Bloc d'Anthracite** — Gris foncé, texture métallique
- **Bloc de Veridium** — Vert luminescent, émet particules
- **Bloc d'Azurite** — Bleu cristallin, brillant
- **Bloc de Celestium** — Violet/doré, aura scintillante
- **Bloc de Voidstone** — Noir profond, particules d'ombre

Tous résistants aux explosions (résistance 15, comme l'obsidienne).`,
  },
  {
    id: "blocks-light",
    title: "Blocs lumineux",
    category: "Blocs Décoratifs",
    content: `**Sources de lumière custom**

- **Lanterne Azurite** — Lumière bleue, niveau 15. Craft : 4 Fer + 1 Azurite + 4 Vitres.
- **Torche Veridium** — Lumière verte, niveau 12. Craft : 1 Bâton + 1 Veridium.
- **Cristal Celestium** — Lumière violette, niveau 14. Craft : 4 Verre + 1 Celestium.
- **Lanterne du Vide** — Lumière noire (réduit la lumière autour), niveau 8. Craft : 4 Fer + 1 Voidstone + 4 Obsidienne.`,
  },
  {
    id: "blocks-decorative",
    title: "Blocs décoratifs",
    category: "Blocs Décoratifs",
    content: `**Blocs de construction custom**

- **Pilier Celestium** — Colonne décorative violette/dorée. Craft : 3 Celestium en colonne.
- **Escalier Veridium** — Escaliers verts luminescents. Craft : 6 Veridium en forme d'escalier.
- **Dalle Azurite** — Dalles bleues cristallines. Craft : 3 Azurite en ligne.
- **Mur Anthracite** — Mur gris métallique solide. Craft : 6 Anthracite en forme de mur.

Tous les blocs décoratifs ont une résistance aux explosions améliorée (×2 par rapport à la pierre).`,
  },
];
