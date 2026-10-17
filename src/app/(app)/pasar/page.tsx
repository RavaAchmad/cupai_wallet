"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, TrendingDown, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/components/ui/cn";
import { formatRupiah } from "@/lib/atm-data";

interface PriceRow {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}

const GLYPH: Record<string, string> = {
  BTC: "B",
  ETH: "E",
  SOL: "S",
  USDT: "T",
  DOGE: "D",
  BNB: "N",
  XRP: "X",
  ADA: "C",
  TRX: "R",
  DOT: "P",
  AVAX: "A",
  LTC: "L",
};

const TABS = [
  { id: "semua", label: "Semua" },
  { id: "naik", label: "Paling Untung" },
  { id: "turun", label: "Paling Rugi" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Pasar() {
  const [prices, setPrices] = useState<PriceRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<TabId>("semua");

  useEffect(() => {
    fetch("/api/prices")
      .then((r) => r.json())
      .then((data: PriceRow[]) => {
        setPrices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = (prices ?? []).filter(
      (a) =>
        a.name.toLowerCase().includes(q) || a.symbol.toLowerCase().includes(q)
    );
    if (tab === "naik") {
      rows = rows
        .filter((a) => a.change24h >= 0)
        .sort((a, b) => b.change24h - a.change24h);
    } else if (tab === "turun") {
      rows = rows
        .filter((a) => a.change24h < 0)
        .sort((a, b) => a.change24h - b.change24h);
    }
    return rows;
  }, [prices, query, tab]);

  const isEmpty = !loading && visible.length === 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-6 sm:px-6">
        <header className="mb-6">
          <Link
            href="/dashboard"
            aria-label="Kembali ke Beranda"
            className="mb-4 inline-flex h-11 items-center gap-2 rounded-xl px-3 -ml-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">
            Pasar
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Harga contoh aset crypto
          </p>
        </header>

        <div className="relative mb-4">
          <Search
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama koin atau simbol..."
            aria-label="Cari nama koin atau simbol"
            className="h-14 w-full rounded-xl border border-input bg-background pl-12 pr-4 text-lg placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
        </div>

        <div
          role="tablist"
          aria-label="Filter harga"
          className="mb-4 flex gap-2 overflow-x-auto pb-1"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "h-11 shrink-0 rounded-full px-5 text-base font-semibold transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                tab === t.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <ul className="space-y-2" aria-busy="true" aria-label="Memuat harga">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <Skeleton className="h-20 w-full rounded-xl" />
              </li>
            ))}
          </ul>
        ) : isEmpty ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-muted"
              aria-hidden="true"
            >
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold">Koin tidak ditemukan</p>
            <p className="text-base text-muted-foreground">
              Coba kata kunci lain, atau pilih filter &quot;Semua&quot;.
            </p>
          </div>
        ) : (
          <ul className="space-y-2" aria-label="Daftar harga kripto">
            {visible.map((a) => {
              const isUp = a.change24h >= 0;
              const pct = Math.abs(a.change24h).toFixed(2);
              return (
                <li key={a.symbol}>
                  <Link
                    href={`/pasar/${a.symbol.toLowerCase()}`}
                    className="flex h-20 items-center gap-4 rounded-xl border border-border bg-card px-4 transition-colors hover:border-primary/40 hover:bg-accent/50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary"
                      aria-hidden="true"
                    >
                      {GLYPH[a.symbol] ?? a.symbol.slice(0, 1)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-lg font-bold">{a.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {a.symbol}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold tabular-nums">
                        {formatRupiah(a.price)}
                      </p>
                      <span
                        className={cn(
                          "mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-sm font-bold tabular-nums",
                          isUp
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                            : "bg-red-500/15 text-red-700 dark:text-red-400"
                        )}
                      >
                        {isUp ? (
                          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        {isUp ? "+" : "-"}
                        {pct}%
                      </span>
                    </div>
                    <span className="sr-only">
                      {a.name} {a.symbol}, harga {formatRupiah(a.price)},{" "}
                      {isUp ? "naik" : "turun"} {pct} persen
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}