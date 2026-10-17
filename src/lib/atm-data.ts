export const ASSETS = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    priceIdr: 1_052_400_000,
    glyph: "B",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    priceIdr: 42_180_000,
    glyph: "E",
  },
  {
    symbol: "SOL",
    name: "Solana",
    priceIdr: 1_845_000,
    glyph: "S",
  },
  {
    symbol: "USDT",
    name: "Tether",
    priceIdr: 16_200,
    glyph: "T",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    priceIdr: 2_940,
    glyph: "D",
  },
  {
    symbol: "BNB",
    name: "BNB",
    priceIdr: 8_720_000,
    glyph: "N",
  },
] as const;

export type Asset = (typeof ASSETS)[number];
export type AssetSymbol = Asset["symbol"];

/** Biaya jaringan simulasi per aset, dalam rupiah. */
export const NETWORK_FEE: Record<AssetSymbol, number> = {
  BTC: 15_000,
  ETH: 8_500,
  SOL: 1_000,
  USDT: 2_000,
  DOGE: 1_500,
  BNB: 2_500,
};

export type TransactionType = "deposit" | "withdraw" | "swap" | "send";

export const TRANSACTION_TITLE: Record<TransactionType, string> = {
  deposit: "Setor",
  withdraw: "Tarik",
  swap: "Tukar",
  send: "Kirim",
};

export function formatRupiah(value: number): string {
  return "Rp " + Math.round(value).toLocaleString("id-ID");
}

export function parseRupiah(value: string): number {
  const digits = value.replace(/\D/g, "");
  return digits ? parseInt(digits, 10) : 0;
}
