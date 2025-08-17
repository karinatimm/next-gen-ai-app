"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { usageCount } from "src/app/actions/ai";
// import { checkUserSusbcription } from "src/app/actions/stripe";
import { useUser } from "@clerk/nextjs";

// Тип данных, передаваемых через контекст
interface UsageContextType {
  count: number; // Сколько пользователь уже использовал
  fetchUsage: () => void; // Функция для получения текущего использования
  openModal: boolean; // Нужно ли показывать модальное окно (если превышен лимит)
  setOpenModal: (open: boolean) => void; // Функция для управления модалкой
  subscribed: boolean; // Есть ли у пользователя активная подписка
}

// Создаём сам контекст
const UsageContext = createContext<UsageContextType | null>(null);

// Провайдер, оборачивает всё приложение или нужную часть, чтобы передавать
// usage-данные
export const UsageProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // state
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  // hooks
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  // Получение количества использованных слов/токенов из базы
  const fetchUsage = useCallback(async () => {
    const res = await usageCount(email);
    setCount(res);
  }, [email]);

  // Проверка, есть ли подписка у пользователя (через Stripe)
  // const fetchSubscription = useCallback(async () => {
  //   const response = await checkUserSusbcription();
  //   setSubscribed(response?.ok || false);
  // }, []);

  // При появлении email загружаем данные об использовании и подписке
  useEffect(() => {
    if (email) {
      fetchUsage(); // загружаем usage
      // fetchSubscription(); // проверяем подписку
    }
  }, [email, fetchUsage]);
  // [email, fetchUsage, fetchSubscription]);

  // Если нет подписки и usage превышает лимит — показываем модалку
  // useEffect(() => {
  //   if (
  //     !subscribed &&
  //     count > Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE) // лимит из .env файла
  //   ) {
  //     setOpenModal(true);
  //   } else {
  //     setOpenModal(false);
  //   }
  // }, [count, subscribed]);

  // Передаём всё в контекст
  return (
    <UsageContext.Provider
      value={{ count, fetchUsage, openModal, setOpenModal, subscribed }}
    >
      {children}
    </UsageContext.Provider>
  );
};
// value={{ count, fetchUsage, openModal, setOpenModal, subscribed }}

// Хук для использования контекста в компонентах
export const useUsage = () => {
  const context = useContext(UsageContext);
  if (context === null) {
    throw new Error("useUsage must be used within a UsageProvider");
  }
  return context;
};
