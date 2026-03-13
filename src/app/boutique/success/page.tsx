"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const pseudo = searchParams.get("pseudo");
  const item = searchParams.get("item");

  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center">
      <div className="card p-8">
        <div className="w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-neon-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-extrabold text-white mb-3">
          Paiement réussi !
        </h1>

        <p className="text-gray-400 mb-6">
          Merci pour ton achat. Ton article sera attribué sous quelques minutes.
        </p>

        {(pseudo || item) && (
          <div className="bg-dark-900 rounded-xl p-4 mb-6 space-y-2 text-left">
            {item && (
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Article</span>
                <span className="text-white font-semibold text-sm">{item}</span>
              </div>
            )}
            {pseudo && (
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Pseudo</span>
                <span className="text-neon-purple font-semibold text-sm">
                  {pseudo}
                </span>
              </div>
            )}
          </div>
        )}

        <Link href="/boutique" className="btn-primary">
          Retour à la boutique
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-lg mx-auto px-6 py-24 text-center text-gray-400">
          Chargement...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
