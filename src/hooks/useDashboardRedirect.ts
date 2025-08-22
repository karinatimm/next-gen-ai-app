"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const useDashboardRedirect = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  const redirectToDashboard = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      openSignIn();
    }
  };

  return redirectToDashboard;
};
