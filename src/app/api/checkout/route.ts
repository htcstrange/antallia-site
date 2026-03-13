import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { SHOP_ITEMS } from "@/data/shop";

export const dynamic = "force-dynamic";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key, { apiVersion: "2026-02-25.clover" });
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const { itemId, pseudo } = await req.json();

    if (!pseudo || typeof pseudo !== "string" || pseudo.trim().length < 3) {
      return NextResponse.json(
        { error: "Pseudo Minecraft invalide (3 caractères minimum)." },
        { status: 400 }
      );
    }

    const item = SHOP_ITEMS.find((i) => i.id === itemId);
    if (!item) {
      return NextResponse.json(
        { error: "Article introuvable." },
        { status: 404 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: item.priceInCents,
      currency: "eur",
      metadata: {
        itemId: item.id,
        itemName: item.name,
        pseudo: pseudo.trim(),
      },
      description: `${item.name} — Joueur: ${pseudo.trim()}`,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Erreur interne du serveur.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
