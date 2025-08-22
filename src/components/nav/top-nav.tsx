"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Toaster } from "react-hot-toast";
import { useUser, useClerk } from "@clerk/nextjs";
import { useDashboardRedirect } from "@/hooks/useDashboardRedirect";

const TopNav = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk(); // добавляем signOut
  const [isMounted, setIsMounted] = useState(false);
  const handleClick = useDashboardRedirect(); // наш хук

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="flex justify-between items-center p-2 shadow">
      <Toaster />
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={50}
          className="cursor-pointer"
        />
      </Link>

      <Link href="/gen-ai">Gen AI</Link>

      <div className="flex items-center gap-4">
        {isSignedIn && isMounted && user?.fullName && (
          <>
            <Link href="/dashboard">{user.fullName}&apos;s Dashboard</Link>
            <button
              onClick={() => signOut()}
              className="bg-red-600 text-white rounded-full px-4 py-2"
            >
              Sign Out
            </button>
          </>
        )}

        {!isSignedIn && isMounted && (
          <button
            onClick={handleClick}
            className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
          >
            Sign In / Sign Up
          </button>
        )}

        <div className="ml-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
