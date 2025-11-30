/**
 * Payment just got authorized (money not settled yet)
 */
export async function handlePaymentAuthorized(payment: any) {
  console.log("PAYMENT AUTHORIZED:", payment.id);

  // You will add logic like:
  // - Mark payment status in DB (if tracking payments table)
  // - Send email/notif if you want
}

/**
 * Payment fully captured (money settled to you)
 */
export async function handlePaymentCaptured(payment: any) {
  console.log("PAYMENT CAPTURED:", payment.id, "AMOUNT:", payment.amount);

  // Your actual logic:
  // - Update order as paid if you match using receipt/order_id/metadata
//   await db.update(orders)
//     .set({
//       status: "paid",
//       razorpayPaymentId: payment.id,
//       paidAt: payment.created_at,
//       method: payment.method,
//     })
//     .where(eq(orders.razorpayOrderId, payment.order_id)); // store this field
}

/**
 * Payment failed
 */
export async function handlePaymentFailed(payment: any) {
  console.log("PAYMENT FAILED:", payment.id, "REASON:", payment.error_description);

  // You will add logic like:
  // - Mark payment/order failed in DB
  // - Notify user to retry
}

/**
 * Order successfully paid
 * (Razorpay guarantees order completion here)
 */
export async function handleOrderPaid(order: any, payment: any) {
  console.log("ORDER PAID:", order?.id);

  // Your real logic:
  // - Mark order paid
  // - Grant subscription / activate license / deliver product
//   await db.update(orders)
//     .set({
//       status: "paid",
//       razorpayOrderId: order.id,
//       razorpayPaymentId: payment?.id,
//       paidAt: payment?.created_at,
//     })
//     .where(eq(orders.razorpayOrderId, order.id));
}
