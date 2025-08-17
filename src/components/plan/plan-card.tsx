"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import toast from "react-hot-toast";
import { SignInButton, useUser } from "@clerk/nextjs";
import { createCheckoutSession } from "../../app/actions/stripeService";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

// PlanCard - это карточка подписки/плана.
const PlanCard = ({ name, image }: { name: string; image: string }) => {
  const [loading, setLoading] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleCheckout = async () => {
    if (name === "Free") {
      // Переходит на страницу url, как <Link>
      router.push("/dashboard");
      return;
    }

    setLoading(true);

    try {
      const response = await createCheckoutSession();
      const { url, error } = response;

      if (error) {
        toast.error(error);
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  //  Рендер кнопки в зависимости от состояния
  const renderButton = () => {
    if (loading) {
      return (
        <Button disabled>
          <Loader2Icon className="animate-spin mr-2" />
          Processing
        </Button>
      );
    }

    if (!isLoaded) return null;

    if (!isSignedIn) {
      return (
        <SignInButton mode="modal" forceRedirectUrl="/dashboard">
          <Button>Sign in</Button>
        </SignInButton>
      );
    }

    return <Button onClick={handleCheckout}>Get Started</Button>;
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 border">
      <Image
        width={100}
        height={100}
        className="m-5"
        src={image}
        alt="monthly membership"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name} Membership</div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          Enjoy
          {name === "Free"
            ? "Limited AI generated content forever for just $0.00/month"
            : "Unlimited AI generated content forever for just $9.99/month"}
        </p>
        <ul className="m-5">
          <li>
            ✨ {name === "Free" ? "Limited" : "Unlimited"} word generation
          </li>
          <li>🧠 Advanced AI features</li>
          <li>⚡ Faster processing times</li>
          <li>🛠️ {name === "Free" ? "" : "Priority"} customer support</li>
        </ul>
      </div>

      <div className="px-5 pb-10">{renderButton()}</div>
    </div>
  );
};

export default PlanCard;
