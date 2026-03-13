import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

interface WikiArticle {
  id: string;
  title: string;
  category: string;
  content: string;
}

export const dynamic = "force-dynamic";

export async function GET() {
  const data = readJSON<WikiArticle[]>("wiki.json");
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const article = await req.json();
  const data = readJSON<WikiArticle[]>("wiki.json");
  data.push(article);
  writeJSON("wiki.json", data);
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const article = await req.json();
  const data = readJSON<WikiArticle[]>("wiki.json");
  const idx = data.findIndex((a) => a.id === article.id);
  if (idx === -1) return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
  data[idx] = article;
  writeJSON("wiki.json", data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { id } = await req.json();
  let data = readJSON<WikiArticle[]>("wiki.json");
  data = data.filter((a) => a.id !== id);
  writeJSON("wiki.json", data);
  return NextResponse.json({ success: true });
}
