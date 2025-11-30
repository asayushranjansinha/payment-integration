import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/features/payments/utils/razorpay";

export async function POST(req: Request) {
  const data = await req.json();

  const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature } =
    data;

  if (
    !razorpay_subscription_id ||
    !razorpay_payment_id ||
    !razorpay_signature
  ) {
    console.warn("Missing required fields for Razorpay verification.", {
      razorpay_subscription_id: !!razorpay_subscription_id,
      razorpay_payment_id: !!razorpay_payment_id,
      razorpay_signature: !!razorpay_signature,
    });
    return NextResponse.json(
      { verified: false, msg: "Missing required fields" },
      { status: 400 }
    );
  }

  const body = `${razorpay_payment_id}|${razorpay_subscription_id}`;

  if (
    !verifyRazorpaySignature(
      body,
      razorpay_signature,
      process.env.RAZORPAY_KEY_SECRET!
    )
  ) {
    console.error("Razorpay signature verification failed.", {
      subscriptionId: razorpay_subscription_id,
      paymentId: razorpay_payment_id,
    });
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  console.log("Razorpay signature successfully verified.", {
    subscriptionId: razorpay_subscription_id,
    paymentId: razorpay_payment_id,
  });
  //   Signature is legit — now you can safely update DB here
  return NextResponse.json({ ok: true, verified: true });
}
