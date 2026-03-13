export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  rarity: "commun" | "rare" | "epique" | "legendaire";
  features?: string[];
}

export const SHOP_CATEGORIES = ["Grades", "Kits", "Cosmétiques", "Divers"];

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "grade-vip",
    name: "Grade VIP",
    description: "Accès aux commandes /fly, /heal, /feed et kit VIP quotidien.",
    price: "4,99 €",
    category: "Grades",
    rarity: "rare",
    features: ["/fly en zone protégée", "/heal & /feed", "Kit VIP quotidien"],
  },
  {
    id: "grade-hero",
    name: "Grade Héros",
    description: "Tous les avantages VIP + /enchant, /repair et accès au /warp secret.",
    price: "9,99 €",
    category: "Grades",
    rarity: "epique",
    features: ["Tout le VIP inclus", "/enchant & /repair", "Warp secret"],
  },
  {
    id: "grade-legende",
    name: "Grade Légende",
    description: "Le grade ultime avec tous les avantages et des bonus exclusifs.",
    price: "19,99 €",
    category: "Grades",
    rarity: "legendaire",
    features: ["Tout le Héros inclus", "/nick & /disguise", "Particules personnalisées"],
  },
  {
    id: "kit-pvp",
    name: "Kit PvP Starter",
    description: "Armure en diamant Protection I + épée Tranchant III.",
    price: "2,99 €",
    category: "Kits",
    rarity: "commun",
  },
  {
    id: "kit-raid",
    name: "Kit Raid Master",
    description: "TNT x64, ender pearls x16, potions de force et de régénération.",
    price: "4,99 €",
    category: "Kits",
    rarity: "rare",
  },
  {
    id: "kit-builder",
    name: "Kit Builder Pro",
    description: "Blocs variés x256, outils Efficacité V, échafaudages x64.",
    price: "3,49 €",
    category: "Kits",
    rarity: "commun",
  },
  {
    id: "cosm-aura",
    name: "Aura de Flammes",
    description: "Particules de flammes qui suivent ton personnage.",
    price: "1,99 €",
    category: "Cosmétiques",
    rarity: "rare",
  },
  {
    id: "cosm-trail",
    name: "Trail Arc-en-ciel",
    description: "Laisse une traînée colorée derrière toi en marchant.",
    price: "1,49 €",
    category: "Cosmétiques",
    rarity: "commun",
  },
  {
    id: "cosm-wings",
    name: "Ailes d",
    description: "Des ailes d",
    price: "4,99 €",
    category: "Cosmétiques",
    rarity: "legendaire",
  },
  {
    id: "money-pack",
    name: "Pack 50 000$",
    description: "50 000$ de monnaie en jeu pour acheter au /shop.",
    price: "2,49 €",
    category: "Divers",
    rarity: "commun",
  },
];
