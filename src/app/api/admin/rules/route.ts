import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

interface Rule {
  title: string;
  severity: string;
  description: string;
}

interface RuleCategory {
  name: string;
  icon: string;
  rules: Rule[];
}

export const dynamic = "force-dynamic";

export async function GET() {
  const data = readJSON<RuleCategory[]>("rules.json");
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const data = await req.json();
  writeJSON("rules.json", data);
  return NextResponse.json({ success: true });
}
