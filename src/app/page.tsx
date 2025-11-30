"use client";
import { useRouter } from "next/navigation";

import {
  createRazorpayOrder,
  createRazorpaySubscription,
} from "@/features/payments/razorpay/server/actions";

const CUSTOMER_EMAIL = "asayushranjansinha@gmail.com";
const CUSTOMER_NAME = "Ayush Ranjan Sinha";
const CUSTOMER_CONTACT = "+919876543210";
const PRODUCT_NAME = "Razorpay Integration Template";

const Page = () => {
  const router = useRouter();

  async function handleOneTimePurchase() {
    const { amount, orderId } = await createRazorpayOrder(100, "INR");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      currency: "INR",
      name: PRODUCT_NAME,
      description: "One-time purchase",
      order_id: orderId,
      prefill: {
        name: CUSTOMER_NAME,
        email: CUSTOMER_EMAIL,
        contact: CUSTOMER_CONTACT,
      },
      handler: async (response: any) => {
        const res = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });
        const body = await res.json();
        router.push(
          body.verified
            ? `/payments/success?orderId=${encodeURIComponent(orderId)}`
            : `/payments/failure?orderId=${encodeURIComponent(orderId)}`
        );
      },
    };

    new (window as any).Razorpay(options).open();
  }

  async function handleSubscriptionPurchase() {
    const planId = process.env.NEXT_PUBLIC_PLAN_ID!;
    const { subscriptionId } = await createRazorpaySubscription(
      planId,
      CUSTOMER_EMAIL,
      12
    );

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subscriptionId,
      name: PRODUCT_NAME,
      description: "Recurring subscription",
      currency: "INR",
      prefill: {
        name: CUSTOMER_NAME,
        email: CUSTOMER_EMAIL,
        contact: CUSTOMER_CONTACT,
      },
      handler: async (response: any) => {
        const res = await fetch("/api/razorpay/verify-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_subscription_id: response.razorpay_subscription_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });
        const body = await res.json();
        router.push(
          body.verified
            ? `/subscription/success?subscriptionId=${encodeURIComponent(
                subscriptionId
              )}`
            : `/subscription/failure?subscriptionId=${encodeURIComponent(
                subscriptionId
              )}`
        );
      },
    };

    new (window as any).Razorpay(options).open();
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-neutral-900 to-black text-white flex items-center justify-center p-6">
      <section className="w-full max-w-md bg-neutral-800/40 backdrop-blur-lg border border-neutral-700/50 rounded-2xl p-8 shadow-xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Razorpay Test
          </h1>
          <p className="text-neutral-400 text-sm">
            Payments & Subscriptions demo
          </p>
        </header>

        <div className="grid gap-4">
          <button
            onClick={handleOneTimePurchase}
            className="w-full py-3 text-lg font-semibold rounded-2xl border border-neutral-600/60 hover:border-neutral-400 hover:bg-neutral-700/40 transition transform hover:scale-[1.02] active:scale-95 shadow-md"
          >
            Pay ₹100 Once
          </button>

          <button
            onClick={handleSubscriptionPurchase}
            className="w-full py-3 text-lg font-semibold rounded-2xl border border-neutral-600/60 hover:border-neutral-400 hover:bg-neutral-700/40 transition transform hover:scale-[1.02] active:scale-95 shadow-md"
          >
            Start Subscription
          </button>
        </div>

        <footer className="text-center mt-8 text-neutral-500 text-xs">
          Template • Next.js • Razorpay
        </footer>
      </section>
    </main>
  );
};

export default Page;
