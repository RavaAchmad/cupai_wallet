"use client";

import { useEffect } from "react";
import { useWallet } from "@/lib/wallet-store";

export function ModeMudahProvider({ children }: { children: React.ReactNode }) {
  const { easyMode } = useWallet();

  useEffect(() => {
    if (easyMode) {
      document.documentElement.style.fontSize = "18px";
      document.documentElement.setAttribute("data-easy-mode", "true");
    } else {
      document.documentElement.style.fontSize = "";
      document.documentElement.removeAttribute("data-easy-mode");
    }
  }, [easyMode]);

  return <>{children}</>;
}
