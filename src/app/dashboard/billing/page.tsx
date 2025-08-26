"use client";
import React from "react";
import { createCustomerPortalSession } from "../../actions/stripeService";
import { Button } from "@/components/ui/button";
import { useUsage } from "context/usageProvider";

const Billing = () => {
  const { subscribed } = useUsage();

  const handleClick = async () => {
    if (!subscribed) {
      alert("You need a subscription to access the billing portal");
      return;
    }

    const response = await createCustomerPortalSession();

    window.location.href = response as string;
  };

  return (
    <div>
      <div className="p-10 my-5 mx-5 mb-5 rounded-lg bg-slate-200 dark:bg-slate-800 flex flex-col justify-center items-center">
        <h1 className="text-xl">Billing</h1>
        <p>Manage your subscription plan</p>
      </div>

      <div className="p-5">
        <Button onClick={handleClick}>Access Stripe Customer Portal</Button>
      </div>
    </div>
  );
};

export default Billing;
