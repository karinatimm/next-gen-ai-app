"use server";
import { currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import Transaction from "../../../models/transaction";
import stripe from "@/utils/stripe";

interface CheckoutSessionResponse {
  url?: string;
  error?: string;
}

export const createCheckoutSession =
  async (): Promise<CheckoutSessionResponse> => {
    const user = await currentUser();
    const customerEmail = user?.emailAddresses[0]?.emailAddress;

    if (!customerEmail) {
      return { error: "User not found" };
    }

    try {
      await db();

      const existingTransaction = await Transaction.findOne({ customerEmail });
      if (existingTransaction) {
        const subscriptions = await stripe.subscriptions.list({
          customer: existingTransaction.customerId,
          status: "all",
          limit: 1,
        });

        const currentSubscription = subscriptions.data.find(
          (sub) => sub.status === "active"
        );

        if (currentSubscription) {
          return { error: "You already have an active subscription" };
        }
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: process.env.STRIPE_MONTHLY_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: "subscription",
        customer_email: customerEmail,
        success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
      });

      return { url: session.url ?? undefined };
    } catch (err) {
      console.error(err);
      return { error: "Error creating stripe checkout session" };
    }
  };

export const checkUserSusbcription = async () => {
  const user = await currentUser();
  const customerEmail = user?.emailAddresses[0]?.emailAddress;

  try {
    const transaction = await Transaction.findOne({
      customerEmail,
      status: "complete",
    });

    if (transaction?.subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(
        transaction.subscriptionId
      );

      return { ok: subscription.status === "active" };
    }
  } catch (err) {
    console.error(err);
    return { message: "Error checking subscription" };
  }
};

export const createCustomerPortalSession = async () => {
  const user = await currentUser();
  const customerEmail = user?.emailAddresses[0]?.emailAddress;

  try {
    const transaction = await Transaction.findOne({ customerEmail });

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: transaction.customerId,
      return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    });

    console.log("portal session => ", portalSession);

    return portalSession.url ?? `${process.env.NEXT_PUBLIC_URL}/dashboard`;
  } catch (err) {
    console.error(err);
    return null;
  }
};
