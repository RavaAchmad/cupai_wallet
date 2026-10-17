import Link from "next/link";
import { useWallet } from "@/lib/wallet-store";

export default function RiwayatPage() {
  const history = useWallet((s) => s.history);

  return (
    <main className="mx-auto max-w-md space-y-6 px-4 py-8">
      <h1 className="text-2xl font-bold">Riwayat Transaksi</h1>

      {history.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
          Belum ada transaksi. Selesaikan permintaan beli, jual, atau kirim dari
          Beranda.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {history.map((tx) => (
            <li key={tx.txid} className="flex justify-between p-3">
              <span className="text-sm font-medium">{tx.type.toUpperCase()}</span>
              <span className="text-sm text-muted-foreground">
                {new Date(tx.createdAt).toLocaleDateString("id-ID")}
              </span>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/dashboard"
        className="inline-flex h-11 items-center rounded-xl border border-input px-4 text-sm font-semibold hover:bg-accent"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}