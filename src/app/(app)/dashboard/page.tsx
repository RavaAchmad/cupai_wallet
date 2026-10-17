"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@/lib/wallet-store";
import { formatRupiah } from "@/lib/atm-data";
import { getQuotes } from "@/lib/prices";

interface PriceRow {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}

const actionButtons = [
  { label: "Setor", href: "/riwayat" },
  { label: "Tarik", href: "/riwayat" },
  { label: "Tukar", href: "/riwayat" },
  { label: "Kirim", href: "/riwayat" },
];

export default function Dashboard() {
  const { balanceIdr, showBalance } = useWallet();
  const [prices, setPrices] = useState<PriceRow[]>([]);

  useEffect(() => {
    setPrices(getQuotes());
  }, []);

  return (
    <div className="mx-auto max-w-md space-y-8 px-4 py-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">Selamat Datang</p>
        <a
          href="/akun"
          className="text-sm font-medium text-primary hover:underline"
        >
          Akun
        </a>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-4xl font-bold tracking-tight tabular-nums">
            {showBalance ? formatRupiah(balanceIdr) : "Rp ••••••••"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Total saldo</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {actionButtons.map((action) => (
          <a
            key={action.label}
            href={action.href}
            className="flex h-28 flex-col items-start justify-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 transition-transform active:scale-95 hover:border-primary/40"
          >
            <span className="text-lg font-bold">{action.label}</span>
          </a>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold">Aset populer</h2>
        <div className="space-y-3">
          {prices.slice(0, 3).map((asset) => (
            <a
              key={asset.symbol}
              href={`/pasar/${asset.symbol.toLowerCase()}`}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {asset.symbol[0]}
                </div>
                <div>
                  <p className="text-sm font-bold">{asset.name}</p>
                  <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold tabular-nums">
                  {formatRupiah(asset.price)}
                </p>
                <p
                  className={`text-xs ${
                    asset.change24h >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {asset.change24h >= 0 ? "+" : ""}{asset.change24h.toFixed(2)}%
                </p>
              </div>
            </a>
          ))}
        </div>
        <a
          href="/pasar"
          className="block w-full rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium hover:bg-accent"
        >
          Lihat Semua Harga
        </a>
      </div>
    </div>
  );
}
