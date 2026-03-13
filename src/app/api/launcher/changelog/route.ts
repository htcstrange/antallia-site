import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      version: "1.2.0",
      date: "2026-03-09",
      changes: [
        "Ajout systeme de pets (12 familiers)",
        "Ajout arbre de competences",
        "Nouveaux enchantements custom",
        "Systeme de quetes",
      ],
    },
    {
      version: "1.1.0",
      date: "2026-03-01",
      changes: [
        "Ajout systeme de jobs",
        "Economie et banque",
        "7 machines custom",
        "Hotel des encheres",
      ],
    },
    {
      version: "1.0.0",
      date: "2026-02-15",
      changes: [
        "Lancement serveur Antallia",
        "5 minerais custom",
        "3 tiers d'outils",
        "Armure Celestium",
        "Blocs decoratifs",
      ],
    },
  ]);
}
