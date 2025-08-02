"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";

const TopNav = () => {
  const { isSignedIn, user } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  // console.log({ isSignedIn, user });

  // useEffect не срабатывает при серверном рендере — только в браузере, после
  // того как компонент отрисовался.
  // Как только компонент "смонтировался" в браузере, useEffect срабатывает и
  // вызывает setIsMounted(true).
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="flex justify-between items-center p-2 shadow">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={50}
          className="cursor-pointer"
        />
      </Link>
      <div className="flex items-center gap-4">
        {isSignedIn && isMounted && user?.fullName && (
          <Link href="/dashboard">{user.fullName}&apos;s Dashboard</Link>
        )}
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div className="ml-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
