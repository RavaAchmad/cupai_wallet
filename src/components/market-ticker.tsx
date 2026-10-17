"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
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
};

export function MarketTicker() {
  const [rows, setRows] = useState<PriceRow[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/prices")
      .then((r) => r.json())
      .then((data: PriceRow[]) => {
        setRows(data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="harga" className="py-20 sm:py-28 border-t border-border/30">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Harga contoh hari ini
            </h2>
            <p className="mt-3 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Angka di bawah adalah data contoh untuk simulasi, bukan harga
              pasar sungguhan.
            </p>
          </div>
          <a
            href="/harga"
            className="inline-flex h-11 shrink-0 items-center rounded-lg border border-input px-4 text-sm font-semibold transition-colors hover:bg-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Lihat semua harga
          </a>
        </div>

        <ul className="space-y-2" aria-label="Harga contoh kripto">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <li key={i}>
                  <Skeleton className="h-16 w-full rounded-xl" />
                </li>
              ))
            : (rows ?? []).map((asset) => {
                const isUp = asset.change24h >= 0;
                const pct = Math.abs(asset.change24h).toFixed(2);
                return (
                  <li
                    key={asset.symbol}
                    className="flex h-16 items-center gap-4 rounded-xl border border-input bg-card px-4 sm:px-5"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-foreground"
                      aria-hidden="true"
                    >
                      {GLYPH[asset.symbol] ?? asset.symbol.slice(0, 1)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-bold">
                        {asset.name}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {asset.symbol}
                      </span>
                    </span>
                    <span className="text-right">
                      <span className="block font-semibold tabular-nums">
                        {formatRupiah(asset.price)}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 text-sm font-bold tabular-nums",
                          isUp ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
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
                    </span>
                  </li>
                );
              })}
        </ul>
      </div>
    </section>
  );
}