import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/features/payments/utils/razorpay";

export async function POST(req: Request) {
  const raw = await req.text();

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    console.error("Body is not valid JSON");
    return NextResponse.json(
      { verified: false, msg: "Invalid JSON" },
      { status: 400 }
    );
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    console.error("Missing one or more required fields");
    return NextResponse.json(
      { verified: false, msg: "Missing fields" },
      { status: 400 }
    );
  }

  const sigBody = `${razorpay_order_id}|${razorpay_payment_id}`;

  const isValid = verifyRazorpaySignature(
    sigBody,
    razorpay_signature,
    process.env.RAZORPAY_KEY_SECRET!
  );

  if (!isValid) {
    console.error("Signature validation FAILED - mismatch");
    return NextResponse.json(
      { verified: false, msg: "Invalid signature body or secret mismatch" },
      { status: 400 }
    );
  }

  console.log("Signature is LEGIT. Request passes.");

  return NextResponse.json({ ok: true, verified: true });
}
