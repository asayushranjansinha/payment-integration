import Link from "next/link";
import { FC } from "react";

interface Props {
  searchParams: Promise<{ orderId?: string }>;
}

const PaymentSuccess: FC<Props> = async ({ searchParams }) => {
  const { orderId } = await searchParams;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-green-900/15 border border-green-700/40 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Payment Successful</h1>
        <p className="text-neutral-400 mb-5">Your order has been completed.</p>

        {orderId && (
          <div className="bg-neutral-800/50 px-3 py-2 rounded-lg text-sm break-all font-mono mb-6">
            {orderId}
          </div>
        )}

        <Link
          href="/"
          className="inline-block px-6 py-2.5 rounded-xl text-lg font-semibold border border-neutral-600/60 hover:border-neutral-200/80 hover:bg-neutral-800/40 transition active:scale-95"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
};

export default PaymentSuccess;
