import crypto from "crypto";

export function verifyRazorpaySignature(
  body: string,
  signature: string | null,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
}
