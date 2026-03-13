"use client";

import { useState, type FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import StripeProvider from "./StripeProvider";
import { type ShopItem } from "@/data/shop";

interface CheckoutModalProps {
  item: ShopItem;
  onClose: () => void;
}

function PaymentForm({
  item,
  pseudo,
  onClose,
}: {
  item: ShopItem;
  pseudo: string;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/boutique/success?pseudo=${encodeURIComponent(pseudo)}&item=${encodeURIComponent(item.name)}`,
      },
    });

    if (submitError) {
      setError(submitError.message ?? "Une erreur est survenue.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary flex-1"
          disabled={loading}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn-primary flex-1"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Paiement...
            </span>
          ) : (
            `Payer ${item.price}`
          )}
        </button>
      </div>
    </form>
  );
}

export default function CheckoutModal({ item, onClose }: CheckoutModalProps) {
  const [pseudo, setPseudo] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePseudoSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (pseudo.trim().length < 3) {
      setError("Le pseudo doit contenir au moins 3 caractères.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id, pseudo: pseudo.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de la création du paiement.");
        setLoading(false);
        return;
      }

      setClientSecret(data.clientSecret);
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative bg-dark-800 border border-gray-700/60 rounded-2xl p-6 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-white">{item.name}</h2>
          <p className="text-gray-400 text-sm mt-1">{item.description}</p>
          <p className="text-neon-purple font-extrabold text-lg mt-2">
            {item.price}
          </p>
        </div>

        {!clientSecret ? (
          <form onSubmit={handlePseudoSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Pseudo Minecraft
              </label>
              <input
                type="text"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                placeholder="Ton pseudo en jeu..."
                className="w-full bg-dark-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50 transition-all"
                autoFocus
                minLength={3}
                maxLength={16}
                required
              />
              <p className="text-xs text-gray-500 mt-1.5">
                L&apos;article sera attribué à ce pseudo.
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || pseudo.trim().length < 3}
              className="btn-primary w-full"
            >
              {loading ? "Chargement..." : "Continuer vers le paiement"}
            </button>
          </form>
        ) : (
          <StripeProvider clientSecret={clientSecret}>
            <PaymentForm item={item} pseudo={pseudo} onClose={onClose} />
          </StripeProvider>
        )}
      </div>
    </div>
  );
}
