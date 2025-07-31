"use client";

import {
  LayoutDashboard,
  FileClock,
  WalletCards,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideNav = () => {
  const currentActivePath = usePathname();

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <ul className="flex-1 space-y-2">
        {menu.map((item) => (
          <div
            key={item.path}
            className={`flex m-2 mr-4 p-2 rounded-lg cursor-pointer border ${
              currentActivePath === item.path
                ? "border-primary text-primary"
                : "hover:border-primary hover:text-primary"
            }`}
          >
            <Link href={item.path}>
              <div className="flex justify-center items-center md:justify-start w-full">
                <item.icon />
                {/* use hidden class to show only icon in small screen */}
                <span className="ml-2 hidden md:inline">{item.name}</span>
              </div>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
