"use client";

import Link from "next/link";
import { formatRupiah, ASSETS } from "@/lib/atm-data";
import { useWallet } from "@/lib/wallet-store";

export default function DompetPage() {
  const balanceIdr = useWallet((s) => s.balanceIdr);

  return (
    <main className="mx-auto max-w-md space-y-6 px-4 py-8">
      <h1 className="text-2xl font-bold">Dompet</h1>
      <section className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">Saldo rupiah (simulasi)</p>
        <p className="mt-1 text-2xl font-bold tabular-nums">
          {formatRupiah(balanceIdr)}
        </p>
      </section>
      <section>
        <h2 className="mb-3 text-lg font-bold">Aset</h2>
        <ul className="space-y-2">
          {ASSETS.slice(0, 6).map((a) => (
            <li
              key={a.symbol}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
            >
              <span className="text-sm font-semibold">{a.name}</span>
              <span className="text-sm text-muted-foreground">{a.symbol}</span>
            </li>
          ))}
        </ul>
      </section>
      <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
        Saldo aset per pengguna dan tombol Kirim/Terima segera hadir di Fase 3.
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