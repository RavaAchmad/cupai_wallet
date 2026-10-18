"use client";

import Link from "next/link";
import { useWallet } from "@/lib/wallet-store";
import { formatRupiah } from "@/lib/atm-data";

export default function PortofolioPage() {
  const history = useWallet((s) => s.history);

  return (
    <main className="mx-auto max-w-md space-y-6 px-4 py-8">
      <h1 className="text-2xl font-bold">Portofolio</h1>

      <section className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          Nilai sekarang (belum ada aset)
        </p>
        <p className="mt-1 text-2xl font-bold tabular-nums">{formatRupiah(0)}</p>
      </section>

      <section className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">Total modal</p>
        <p className="mt-1 text-xl font-bold tabular-nums">
          {formatRupiah(0)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Unrealized P/L: {formatRupiah(0)}
        </p>
      </section>

      <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
        {history.length === 0
          ? "Belum ada transaksi. Mulai dari Beranda untuk membeli aset simulasi pertama Anda."
          : `${history.length} transaksi tercatat. Rincian modal dan alokasi segera hadir di Fase 3.`}
      </p>

      <Link
        href="/dashboard"
        className="inline-flex h-11 items-center rounded-xl border border-input px-4 text-sm font-semibold hover:bg-accent"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}