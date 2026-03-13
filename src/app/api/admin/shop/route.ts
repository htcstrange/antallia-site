import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: string;
  priceInCents: number;
  category: string;
  rarity: string;
  features?: string[];
}

export const dynamic = "force-dynamic";

export async function GET() {
  const data = readJSON<ShopItem[]>("shop.json");
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const item = await req.json();
  const data = readJSON<ShopItem[]>("shop.json");
  data.push(item);
  writeJSON("shop.json", data);
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const item = await req.json();
  const data = readJSON<ShopItem[]>("shop.json");
  const idx = data.findIndex((i) => i.id === item.id);
  if (idx === -1) return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
  data[idx] = item;
  writeJSON("shop.json", data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { id } = await req.json();
  let data = readJSON<ShopItem[]>("shop.json");
  data = data.filter((i) => i.id !== id);
  writeJSON("shop.json", data);
  return NextResponse.json({ success: true });
}
