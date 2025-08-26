"use client";

import { ChevronRight } from "lucide-react";
import { useDashboardRedirect } from "@/hooks/useDashboardRedirect";

const SignInModal = () => {
  const handleClick = useDashboardRedirect();

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between border border-slate-300 rounded-full bg-transparent px-4 py-2 w-1/2 mx-auto mb-4 hover:bg-slate-700 hover:bg-opacity-50 cursor-pointer"
    >
      <span className="text-slate-100">🔥 Join free membership</span>
      <span className="bg-slate-500 text-slate-100 rounded-full w-8 h-8 flex items-center justify-center">
        <ChevronRight />
      </span>
    </div>
  );
};

export default SignInModal;
