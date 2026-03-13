import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD } from "@/data/leaderboard";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "users.json");

export async function GET(request: NextRequest) {
  const pseudo = request.nextUrl.searchParams.get("pseudo");

  if (!pseudo) {
    return NextResponse.json({ error: "Pseudo requis" }, { status: 400 });
  }

  // Leaderboard stats
  const stats = LEADERBOARD.find(
    (e) => e.pseudo.toLowerCase() === pseudo.toLowerCase()
  );

  // User data from local DB
  let grade = "Joueur";
  try {
    if (fs.existsSync(DB_PATH)) {
      const users = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
      const user = users.find(
        (u: any) => u.pseudo.toLowerCase() === pseudo.toLowerCase()
      );
      if (user) grade = user.grade;
    }
  } catch {}

  return NextResponse.json({
    pseudo,
    grade,
    faction: stats?.faction || null,
    kills: stats?.kills || 0,
    deaths: stats?.deaths || 0,
    money: stats?.money || 0,
    playtime: stats?.playtime || "0h",
    rank: stats?.rank || null,
  });
}
