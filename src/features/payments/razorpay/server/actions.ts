"use server";

import razorpayInstance from "@/features/payments/razorpay/lib/razorpay";

export async function createRazorpayOrder(amount: number, currency: string) {
  try {
    const options = {
      amount: amount * 100, // Razorpay expects amount in paisa
      currency: currency,
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1, // Auto-capture payment
    };

    const order = await razorpayInstance.orders.create(options);

    return {
      orderId: order.id,
      amount: order.amount, // Amount in paisa
      currency: order.currency,
    };
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new Error("Failed to create Razorpay order.");
  }
}

export async function createRazorpaySubscription(
  planId: string,
  customerEmail: string,
  totalCount = 12 // max billing cycles, null means infinite
) {
  const subscription = await razorpayInstance.subscriptions.create({
    plan_id: planId,
    total_count: totalCount,
    customer_notify: 1,
    notes: {
      email: customerEmail,
      purpose: "Subscription payment",
    },
  });

  return {
    subscriptionId: subscription.id,
    status: subscription.status,
    planId: subscription.plan_id,
    currentStart: subscription.current_start,
    currentEnd: subscription.current_end,
  };
}
