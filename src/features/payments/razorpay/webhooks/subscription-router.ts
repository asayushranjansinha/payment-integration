import {
  onSubscriptionAuthenticated,
  onSubscriptionActivated,
  onSubscriptionCharged,
  onSubscriptionCompleted,
  onSubscriptionCancelled,
  onSubscriptionPaused,
} from "./subscription-handlers";

export async function handleSubscriptionWebhook(event: any) {
  const eventType = event?.event;

  switch (eventType) {
    case "subscription.authenticated":
      return onSubscriptionAuthenticated(event.payload?.subscription?.entity, event.payload?.payment?.entity);

    case "subscription.activated":
      return onSubscriptionActivated(event.payload?.subscription?.entity);

    case "subscription.charged":
      return onSubscriptionCharged(event.payload?.subscription?.entity, event.payload?.payment?.entity);

    case "subscription.completed":
      return onSubscriptionCompleted(event.payload?.subscription?.entity, event.payload?.payment?.entity);

    case "subscription.cancelled":
      return onSubscriptionCancelled(event.payload?.subscription?.entity);

    case "subscription.paused":
      return onSubscriptionPaused(event.payload?.subscription?.entity);

    default:
      console.warn("Unhandled Razorpay Subscription event:", eventType);
  }
}
