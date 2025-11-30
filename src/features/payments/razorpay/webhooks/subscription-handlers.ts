/**
 * Triggered on 1st payment (upfront or plan amount)
 */
export async function onSubscriptionAuthenticated(sub: any, payment: any) {
  console.log("SUB AUTHENTICATED:", sub.id);

  // Example logic you will add:
  // - Create user subscription record if not exists
  // - Mark status = pending or authenticated
  // - Store 1st payment details
}

/**
 * Subscription becomes active, ready for recurring billing
 */
export async function onSubscriptionActivated(sub: any) {
  console.log("SUB ACTIVATED:", sub.id);

  // Your logic:
  // - Update DB -> status = active
  // - Store period start/end timestamps
  // - Enable access for the user
}

/**
 * Every recurring cycle success
 */
export async function onSubscriptionCharged(sub: any, payment: any) {
  console.log("SUB CHARGED:", sub.id, "AMOUNT:", payment.amount);

  // Your logic:
  // - Log payment
  // - Update renewal count
  // - Extend user access
}

/**
 * All cycles completed (if total_count was set)
 */
export async function onSubscriptionCompleted(sub: any, payment: any) {
  console.log("SUB COMPLETED:", sub.id);

  // Your logic:
  // - Update DB -> completed
  // - Maybe downgrade user if no renewal
}

/**
 * Subscription manually cancelled
 */
export async function onSubscriptionCancelled(sub: any) {
  console.log("SUB CANCELLED:", sub.id);

  // Your logic:
  // - DB -> cancelled
  // - Revoke future access
}

/**
 * Subscription paused (payment failures, schedule ended, etc)
 */
export async function onSubscriptionPaused(sub: any) {
  console.log("SUB PAUSED:", sub.id);

  // Your logic:
  // - DB -> expired
  // - Remove app access
}
