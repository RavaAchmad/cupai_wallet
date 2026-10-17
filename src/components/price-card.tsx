import { cn } from "@/components/ui/cn";
import { formatRupiah } from "@/lib/atm-data";

export interface PriceCardAsset {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}

const GLYPH: Record<string, string> = {
  BTC: "₿",
  ETH: "Ξ",
  SOL: "◎",
  USDT: "₮",
  DOGE: "Ð",
  BNB: "B",
};

export function PriceCard({ asset }: { asset: PriceCardAsset }) {
  const isUp = asset.change24h >= 0;

  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
      <div
        className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary"
        aria-hidden="true"
      >
        {GLYPH[asset.symbol] ?? asset.symbol.slice(0, 1)}
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold">{asset.name}</h3>
        <p className="text-sm text-muted-foreground">{asset.symbol}</p>
        <p className="mt-2 text-lg font-semibold tabular-nums">
          {formatRupiah(asset.price)}
        </p>
        <p
          className={cn(
            "mt-1 text-sm tabular-nums",
            isUp ? "text-emerald-600" : "text-red-600"
          )}
        >
          {isUp ? "+" : ""}
          {asset.change24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}