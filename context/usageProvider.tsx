"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { usageCount } from "src/app/actions/ai";
import { checkUserSusbcription } from "src/app/actions/stripeService";
import { useUser } from "@clerk/nextjs";

interface UsageContextType {
  count: number;
  fetchUsage: () => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  subscribed: boolean;
  loading: boolean;
}

const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user, isLoaded } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const fetchUsage = useCallback(async () => {
    if (!email) return;

    setLoading(true);
    try {
      const [usedCredits, subscriptionStatus] = await Promise.all([
        usageCount(email),
        checkUserSusbcription(),
      ]);

      setCount(usedCredits);
      setSubscribed(subscriptionStatus?.ok || false);

      if (
        !subscriptionStatus?.ok &&
        usedCredits > Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE)
      ) {
        setOpenModal(true);
      } else {
        setOpenModal(false);
      }
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    if (isLoaded && email) fetchUsage();
  }, [isLoaded, email, fetchUsage]);

  return (
    <UsageContext.Provider
      value={{
        count,
        fetchUsage,
        openModal,
        setOpenModal,
        subscribed,
        loading,
      }}
    >
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (!context) {
    throw new Error("useUsage must be used within a UsageProvider");
  }
  return context;
};
