// вебхук - это способ, с помощью которого Stripe уведомляет ваш сервер о
// событиях, чтобы вы могли на них реагировать: сохранять данные, выдавать
// доступ к продукту, отправлять email и т.д.
// Вебхук Stripe срабатывает на сервере, и не по твоей инициативе, а когда Stripe
// решает, что произошло событие (оплата, отмена, возврат и т.д.).

// вебхуки нельзя отдавать из статических страниц (SSG), нужна динамическая страница.
export const dynamic = "force-dynamic"; // defaults to auto-dynamic
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
    // verify the webhook signature and parse the event
    //  Проверяем подпись и создаем объект события Stripe
    // проверяет, что запрос реально от Stripe
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("STRIPE WEBHOOK SESSION RESPONSE => ", session);

      // Создаем новую транзакцию в базе данных на основе данных Stripe
      const transaction = await new Transaction({
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
    console.error(err);
    return new Response("Webhook Error", { status: 400 });
  }
};

export { POST };
