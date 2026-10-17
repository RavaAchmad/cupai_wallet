"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TrendingUp, Wallet, PieChart, User } from "lucide-react";
import { cn } from "@/components/ui/cn";

const TABS = [
  { label: "Beranda", href: "/dashboard", Icon: Home },
  { label: "Pasar", href: "/pasar", Icon: TrendingUp },
  { label: "Dompet", href: "/dompet", Icon: Wallet },
  { label: "Portofolio", href: "/portofolio", Icon: PieChart },
  { label: "Akun", href: "/akun", Icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/80 backdrop-blur-md"
    >
      <ul className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {TABS.map((tab) => {
          const active = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-w-[56px] flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-xs transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <tab.Icon className="h-5 w-5" aria-hidden="true" />
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}