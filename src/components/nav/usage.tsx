"use client";
import React, { useEffect, useState } from "react";
import { useUsage } from "../../../context/usageProvider";
import { Button } from "@/components/ui/button";

export default function Usage() {
  const { count, subscribed, loading } = useUsage();
  const credits = Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) {
      const target = subscribed ? 100 : Math.min((count / credits) * 100, 100);
      setProgress(target);
    }
  }, [count, subscribed, loading, credits]);

  return (
    <div className="m-2">
      <div className="rounded-lg shadow border p-2">
        <h2 className="font-medium">Credits</h2>

        <div className="h-2 w-full bg-slate-200 rounded-full mt-3 overflow-hidden">
          <div
            className="h-2 bg-slate-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="text-sm my-2">
          {loading
            ? "Loading credits..."
            : subscribed
            ? "Unlimited credits"
            : `${count} / ${credits} credits used`}
        </h2>
      </div>

      <Button
        className="w-full my-3"
        variant="secondary"
        disabled={subscribed}
        onClick={() => {
          if (!subscribed) {
            window.location.href = "/membership";
          }
        }}
      >
        Upgrade
      </Button>
    </div>
  );
}
