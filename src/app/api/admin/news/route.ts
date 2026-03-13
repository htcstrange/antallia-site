import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  tag: string;
  summary: string;
  content: string;
}

export const dynamic = "force-dynamic";

export async function GET() {
  const data = readJSON<NewsArticle[]>("news.json");
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const article = await req.json();
  const data = readJSON<NewsArticle[]>("news.json");
  data.unshift(article);
  writeJSON("news.json", data);
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const article = await req.json();
  const data = readJSON<NewsArticle[]>("news.json");
  const idx = data.findIndex((a) => a.id === article.id);
  if (idx === -1) return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
  data[idx] = article;
  writeJSON("news.json", data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { id } = await req.json();
  let data = readJSON<NewsArticle[]>("news.json");
  data = data.filter((a) => a.id !== id);
  writeJSON("news.json", data);
  return NextResponse.json({ success: true });
}
