export const dynamic = "force-dynamic";
import db from "@/utils/db";
import Transaction from "../../../../models/transaction";
import stripe from "@/utils/stripe";
import type Stripe from "stripe";

const POST = async (req: Request) => {
  await db();

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("STRIPE WEBHOOK SESSION RESPONSE => ", session);

      const transaction = new Transaction({
        sessionId: session.id,
        customerId: session.customer,
        invoiceId: session.invoice,
        subscriptionId: session.subscription,
        mode: session.mode,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        status: session.status,
      });

      await transaction.save();

      return Response.json({
        message: "Webhook received: Checkout session completed",
      });
    }
  } catch (err) {
    console.error("⚠️ Webhook error:", err);
    return new Response("Webhook Error", { status: 400 });
  }
};

export { POST };
