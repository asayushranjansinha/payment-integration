import {
  handlePaymentAuthorized,
  handlePaymentCaptured,
  handlePaymentFailed,
  handleOrderPaid,
} from "./payment-handlers";

export async function handlePaymentsWebhook(event: any) {
  const eventType = event.event;
  const payment = event.payload?.payment?.entity;
  const order = event.payload?.order?.entity;

  switch (eventType) {
    case "payment.authorized":
      return handlePaymentAuthorized(payment);

    case "payment.captured":
      return handlePaymentCaptured(payment);

    case "payment.failed":
      return handlePaymentFailed(payment);

    case "order.paid":
      return handleOrderPaid(order, payment);

    default:
      console.warn("Unhandled webhook event:", eventType);
  }
}
