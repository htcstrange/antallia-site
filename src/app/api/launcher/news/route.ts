import { NextResponse } from "next/server";
import { readJSON } from "@/lib/data";

export async function GET() {
  const news = readJSON("news.json");
  return NextResponse.json(news);
}
