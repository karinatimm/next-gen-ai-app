"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Toaster } from "react-hot-toast";
import { useClerk, useUser } from "@clerk/nextjs";
import { useDashboardRedirect } from "@/hooks/useDashboardRedirect";
import { useUsage } from "context/usageProvider";

const TopNav = () => {
  const { signOut } = useClerk();
  const { isSignedIn } = useUser();
  const { subscribed } = useUsage();
  const [isMounted, setIsMounted] = useState(false);
  const handleClick = useDashboardRedirect();

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

      {!subscribed && (
        <Link href="/membership">🔥 Join free or $9.99/month</Link>
      )}
      <Link href="/gen-ai">Gen AI</Link>

      <div className="flex items-center gap-4">
        {isMounted && (
          <>
            {isSignedIn ? (
              <button
                onClick={() =>
                  signOut(() => {
                    window.location.href = "/";
                  })
                }
                className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={handleClick}
                className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
              >
                Sign In / Sign Up
              </button>
            )}
          </>
        )}

        <div className="ml-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
