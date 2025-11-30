"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createRazorpayOrder,
  createRazorpaySubscription,
} from "@/features/payments/razorpay/server/actions";
import { Theme } from "@/features/theming/components/ThemeToggle";

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
    <main className="min-h-screen flex flex-col items-center justify-center p-6 space-y-8 bg-background">
      <Theme
        variant="tabs"
        size="md"
        showLabel
        themes={["light", "dark", "system"]}
      />

      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">
            Razorpay Test
          </CardTitle>
          <CardDescription>Payments & Subscriptions demo</CardDescription>
        </CardHeader>

        <CardContent className="mt-6 flex flex-col gap-4">
          <Button onClick={handleOneTimePurchase} className="w-full">
            Pay ₹100 Once
          </Button>

          <Button
            onClick={handleSubscriptionPurchase}
            variant="secondary"
            className="w-full"
          >
            Start Subscription
          </Button>
        </CardContent>

        <footer className="text-center mt-6 text-muted-foreground text-xs pb-4">
          Template • Next.js • Razorpay
        </footer>
      </Card>
    </main>
  );
};

export default Page;
