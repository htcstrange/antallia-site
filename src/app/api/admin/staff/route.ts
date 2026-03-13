import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

interface StaffMember {
  pseudo: string;
  role: string;
  description: string;
}

export const dynamic = "force-dynamic";

export async function GET() {
  const data = readJSON<StaffMember[]>("staff.json");
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const member = await req.json();
  const data = readJSON<StaffMember[]>("staff.json");
  data.push(member);
  writeJSON("staff.json", data);
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { oldPseudo, ...member } = await req.json();
  const data = readJSON<StaffMember[]>("staff.json");
  const idx = data.findIndex((m) => m.pseudo === (oldPseudo || member.pseudo));
  if (idx === -1) return NextResponse.json({ error: "Membre non trouvé" }, { status: 404 });
  data[idx] = member;
  writeJSON("staff.json", data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { pseudo } = await req.json();
  let data = readJSON<StaffMember[]>("staff.json");
  data = data.filter((m) => m.pseudo !== pseudo);
  writeJSON("staff.json", data);
  return NextResponse.json({ success: true });
}
