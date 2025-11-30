import { NextResponse } from "next/server";

import { verifyRazorpaySignature } from "@/features/payments/utils/razorpay";
import { handlePaymentsWebhook } from "@/features/payments/razorpay/webhooks/payment-router";
import { handleSubscriptionWebhook } from "@/features/payments/razorpay/webhooks/subscription-router";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const event = JSON.parse(body);
    const eventType = event.event;

    console.log(`[Razorpay Webhook] Received event: ${eventType}`);

    if (
      !verifyRazorpaySignature(
        body,
        signature,
        process.env.RAZORPAY_WEBHOOK_SECRET!
      )
    ) {
      console.warn(`[Razorpay Webhook] Invalid signature for event: ${eventType}`);
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 400 }
      );
    }

    // Dispatch based on webhook type
    if (eventType.startsWith("subscription.")) {
      console.log(`[Razorpay Webhook] Handling subscription event: ${eventType}`);
      await handleSubscriptionWebhook(event);
      console.log(`[Razorpay Webhook] Successfully processed subscription event: ${eventType}`);
    } else if (
      eventType.startsWith("payment.") ||
      eventType.startsWith("order.")
    ) {
      console.log(`[Razorpay Webhook] Handling payment/order event: ${eventType}`);
      await handlePaymentsWebhook(event);
      console.log(`[Razorpay Webhook] Successfully processed payment/order event: ${eventType}`);
    } else {
      console.warn(`[Razorpay Webhook] Unhandled event type: ${eventType}`);
    }

    console.log(`[Razorpay Webhook] Finished processing event: ${eventType}`);
    return NextResponse.json({ message: "Webhook OK" }, { status: 200 });
  } catch (err) {
    console.error(`[Razorpay Webhook] Error processing webhook:`, err);
    return NextResponse.json({ message: "Webhook error" }, { status: 500 });
  }
}
