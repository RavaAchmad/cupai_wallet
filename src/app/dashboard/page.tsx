"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  TrendingUp,
  Receipt,
  DollarSign,
  ArrowUpRight,
  RefreshCw,
  Send,
  Home,
  BookOpen,
  CreditCard,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/reveal";
import { cn } from "@/components/ui/cn";
import { AtmWizard } from "@/components/atm-wizard";
import { PriceCard } from "@/components/price-card";
import { formatRupiah } from "@/lib/atm-data";

const userName = "Budi Santoso";

const actionButtons = [
  { label: "Setor", type: "deposit" as const, Icon: ArrowUpRight },
  { label: "Tarik", type: "withdraw" as const, Icon: DollarSign },
  { label: "Tukar", type: "swap" as const, Icon: RefreshCw },
  { label: "Kirim", type: "send" as const, Icon: Send },
];

const bottomNav = [
  { label: "Beranda", Icon: Home, href: "/" },
  { label: "Edukasi", Icon: BookOpen, href: "/edukasi" },
  { label: "Brankas", Icon: CreditCard, href: "/brankas" },
  { label: "Profil", Icon: User, href: "/profil" },
];

interface PriceRow {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}

export default function Dashboard() {
  const [balance, setBalance] = useState<string | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [prices, setPrices] = useState<PriceRow[] | null>(null);
  const [loadingPrices, setLoadingPrices] = useState(true);

  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardType, setWizardType] = useState<
    "deposit" | "withdraw" | "swap" | "send"
  >("deposit");
  const [showPrices, setShowPrices] = useState(false);

  useEffect(() => {
    fetch("/api/balance")
      .then((r) => r.json())
      .then((data) => {
        setBalance(formatRupiah(data.idr ?? 0));
        setLoadingBalance(false);
      })
      .catch(() => setLoadingBalance(false));

    fetch("/api/prices")
      .then((r) => r.json())
      .then((data: PriceRow[]) => {
        setPrices(data);
        setLoadingPrices(false);
      })
      .catch(() => setLoadingPrices(false));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="flex min-h-screen flex-col items-center justify-center px-4 pb-24 sm:px-6 sm:pb-0 lg:px-8">
        <Reveal className="w-full max-w-md space-y-8">
          <p className="text-sm font-medium text-muted-foreground text-center">
            Selamat Datang, {userName}
          </p>

          <div className="space-y-2">
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl font-bold tracking-tight tabular-nums">
                {loadingBalance
                  ? <Skeleton className="w-40 h-10 rounded-full" />
                  : balance ?? formatRupiah(0)}
              </span>
              <button
                type="button"
                aria-label={loadingBalance ? "Memuat saldo" : "Tampilkan saldo"}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                disabled={loadingBalance}
              >
                {loadingBalance ? (
                  <Skeleton className="h-6 w-6 rounded-full" />
                ) : (
                  <Eye className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Total saldo
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {actionButtons.map((action) => (
              <Button
                key={action.label}
                type="button"
                className="h-28 w-full flex-col items-start justify-center gap-3 rounded-2xl px-5 text-left active:scale-95 transition-transform duration-100"
                onClick={() => {
                  setWizardType(action.type);
                  setWizardOpen(true);
                }}
              >
                <action.Icon className="h-8 w-8" aria-hidden="true" />
                <span className="text-base font-bold">{action.label}</span>
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="h-14 gap-2 rounded-xl active:scale-95 transition-transform duration-100"
              onClick={() => setShowPrices((prev) => !prev)}
              aria-expanded={showPrices}
            >
              <TrendingUp className="h-5 w-5" aria-hidden="true" />
              Cek Harga
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-14 gap-2 rounded-xl active:scale-95 transition-transform duration-100"
              onClick={() => {
                setWizardType("deposit");
                setWizardOpen(true);
              }}
            >
              <Receipt className="h-5 w-5" aria-hidden="true" />
              Struk Transaksi
            </Button>
          </div>

          {showPrices && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {loadingPrices
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-44 w-full rounded-xl" />
                    ))
                  : (prices ?? []).slice(0, 3).map((asset) => (
                      <PriceCard key={asset.symbol} asset={asset} />
                    ))}
              </div>
              <Button
                type="button"
                variant="ghost"
                asChild
                className="h-12 w-full rounded-xl text-sm active:scale-95"
              >
                <a href="/harga">Lihat Semua Harga</a>
              </Button>
            </div>
          )}
        </Reveal>
      </main>

      <nav
        aria-label="Navigasi utama"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/80 backdrop-blur-md sm:hidden"
      >
        <div className="flex h-16 items-center justify-around px-4">
          {bottomNav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={item.href === "/dashboard" ? "page" : undefined}
              className={cn(
                "flex min-w-[64px] flex-col items-center justify-center gap-1 rounded-lg py-2 text-xs transition-colors active:scale-95",
                item.href === "/dashboard"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <item.Icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>

      <AtmWizard open={wizardOpen} onOpenChange={setWizardOpen} type={wizardType} />
    </div>
  );
}
