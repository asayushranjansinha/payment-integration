import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2Icon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface Props {
  searchParams: Promise<{ orderId?: string }>;
}

const PaymentSuccess: FC<Props> = async ({ searchParams }) => {
  const { orderId } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-2">
          <CheckCircle2Icon className="h-14 w-14 mx-auto text-emerald-600 opacity-90" />
          <CardTitle className="text-2xl font-bold tracking-tight text-emerald-600">
            Payment Successful
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Your payment has been received.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-7 pb-7 flex flex-col gap-5 text-center">
          {orderId && (
            <div className="w-full px-4 py-3 rounded-xl bg-muted font-mono text-xs text-foreground border border-border break-all">
              {orderId}
            </div>
          )}

          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full rounded-xl"
          >
            <Link href="/" prefetch replace>
              Go Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default PaymentSuccess;
