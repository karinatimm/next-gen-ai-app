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
  const [count, setCount] = useState(0); // счетчик использованных кредитов
  const [openModal, setOpenModal] = useState(false); // модальное окно превышения лимита
  const [subscribed, setSubscribed] = useState(false); // статус подписки
  const [loading, setLoading] = useState(true); // статус загрузки данных

  // Получаем пользователя из Clerk
  const { user, isLoaded } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress; // email пользователя

  // Функция для получения данных об использовании и подписке
  const fetchUsage = useCallback(async () => {
    if (!email) return; // если email нет, ничего не делаем

    setLoading(true); // включаем индикатор загрузки
    try {
      // Параллельно получаем количество использованных кредитов и статус подписки
      const [usedCredits, subscriptionStatus] = await Promise.all([
        usageCount(email), // сколько кредитов уже использовано
        checkUserSusbcription(), // проверка подписки
      ]);

      setCount(usedCredits); // обновляем счетчик кредитов
      setSubscribed(subscriptionStatus?.ok || false); // обновляем статус подписки

      // Если нет подписки и превышен лимит бесплатного плана — показываем модалку
      if (
        !subscriptionStatus?.ok &&
        usedCredits > Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE)
      ) {
        setOpenModal(true);
      } else {
        setOpenModal(false);
      }
    } finally {
      setLoading(false); // отключаем индикатор загрузки
    }
  }, [email]); // функция зависит только от email

  // Ждем полной загрузки пользователя и его email, после чего загружаем данные
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

// Хук для удобного использования контекста
export const useUsage = () => {
  const context = useContext(UsageContext);
  if (!context) {
    throw new Error("useUsage must be used within a UsageProvider");
  }
  return context;
};
