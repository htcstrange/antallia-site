"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { type ReactNode } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const APPEARANCE: StripeElementsOptions["appearance"] = {
  theme: "night",
  variables: {
    colorPrimary: "#a855f7",
    colorBackground: "#12121a",
    colorText: "#e5e7eb",
    colorDanger: "#ef4444",
    fontFamily: "Inter, system-ui, sans-serif",
    borderRadius: "12px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      border: "1px solid #2a2a42",
      boxShadow: "none",
    },
    ".Input:focus": {
      border: "1px solid #a855f7",
      boxShadow: "0 0 8px rgba(168, 85, 247, 0.3)",
    },
    ".Label": {
      color: "#9ca3af",
    },
  },
};

interface StripeProviderProps {
  clientSecret: string;
  children: ReactNode;
}

export default function StripeProvider({
  clientSecret,
  children,
}: StripeProviderProps) {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: APPEARANCE,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
