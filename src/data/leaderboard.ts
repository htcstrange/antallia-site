export interface LeaderboardEntry {
  rank: number;
  pseudo: string;
  kills: number;
  deaths: number;
  faction: string;
  playtime: string;
  money: number;
}

export type LeaderboardCategory = "kills" | "kd" | "money" | "playtime";

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, pseudo: "DarkSlayer_77", kills: 1243, deaths: 312, faction: "Shadow", playtime: "342h", money: 2450000 },
  { rank: 2, pseudo: "xN1ghtmare", kills: 1087, deaths: 298, faction: "Inferno", playtime: "298h", money: 1870000 },
  { rank: 3, pseudo: "LeFrancais_", kills: 956, deaths: 401, faction: "Eclipse", playtime: "412h", money: 3120000 },
  { rank: 4, pseudo: "CyberPvP", kills: 891, deaths: 267, faction: "Shadow", playtime: "256h", money: 1540000 },
  { rank: 5, pseudo: "DragonFire42", kills: 834, deaths: 389, faction: "Phoenix", playtime: "378h", money: 980000 },
  { rank: 6, pseudo: "xMathis_PvP", kills: 756, deaths: 312, faction: "Inferno", playtime: "234h", money: 1230000 },
  { rank: 7, pseudo: "AzureFalcon", kills: 698, deaths: 287, faction: "Eclipse", playtime: "198h", money: 890000 },
  { rank: 8, pseudo: "ToxicBlade", kills: 645, deaths: 432, faction: "Vortex", playtime: "312h", money: 670000 },
  { rank: 9, pseudo: "StormRider_", kills: 612, deaths: 198, faction: "Phoenix", playtime: "456h", money: 4200000 },
  { rank: 10, pseudo: "LeKingDu13", kills: 587, deaths: 345, faction: "Vortex", playtime: "267h", money: 1100000 },
  { rank: 11, pseudo: "NovaStrike", kills: 534, deaths: 276, faction: "Shadow", playtime: "189h", money: 760000 },
  { rank: 12, pseudo: "BlazePvP_FR", kills: 498, deaths: 312, faction: "Inferno", playtime: "223h", money: 540000 },
  { rank: 13, pseudo: "xWither_", kills: 467, deaths: 198, faction: "Eclipse", playtime: "345h", money: 2890000 },
  { rank: 14, pseudo: "IronClaw99", kills: 423, deaths: 367, faction: "Phoenix", playtime: "178h", money: 430000 },
  { rank: 15, pseudo: "ShadowMC_", kills: 398, deaths: 156, faction: "Shadow", playtime: "167h", money: 980000 },
];
