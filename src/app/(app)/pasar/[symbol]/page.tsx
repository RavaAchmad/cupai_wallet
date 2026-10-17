import { redirect } from "next/navigation";
import { getQuote } from "@/lib/prices";
import { formatRupiah } from "@/lib/atm-data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PasarDetail({ params }: { params: { symbol: string } }) {
  const asset = getQuote(params.symbol);

  if (!asset) {
    redirect("/pasar");
  }

  const isUp = asset.change24h >= 0;

  const sparklinePoints = asset.sparkline
    .map((p, i) => {
      const x = (i / (asset.sparkline.length - 1)) * 100;
      const min = Math.min(...asset.sparkline);
      const max = Math.max(...asset.sparkline);
      const y = max === min ? 50 : 100 - ((p - min) / (max - min)) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-6 sm:px-6">
        <Link
          href="/pasar"
          aria-label="Kembali ke Pasar"
          className="mb-6 inline-flex h-11 items-center gap-2 rounded-xl px-3 -ml-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Kembali ke Pasar
        </Link>

        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{asset.name}</h1>
            <p className="text-lg text-muted-foreground">{asset.symbol}</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold tabular-nums">{formatRupiah(asset.price)}</p>
            <p
              className={isUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}
            >
              {isUp ? "+" : ""}
              {asset.change24h.toFixed(2)}% (24 jam)
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
            Harga 7 hari terakhir
          </h2>
          <div className="h-32 w-full">
            <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" preserveAspectRatio="none" aria-hidden="true">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                points={sparklinePoints}
                className={isUp ? "text-emerald-600" : "text-red-600"}
              />
            </svg>
          </div>
          <div className="mt-4 flex justify-between text-xs text-muted-foreground">
            <span>Minggu lalu</span>
            <span>Hari ini</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Perubahan 24j</p>
            <p className="text-lg font-bold">{Math.abs(asset.change24h).toFixed(2)}%</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Periode</p>
            <p className="text-lg font-bold">7 hari</p>
          </div>
        </div>
      </div>
    </main>
  );
}
