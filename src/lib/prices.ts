import { ASSETS } from "@/lib/atm-data";

export interface PriceQuote {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  sparkline: number[];
}

const DAY_MS = 86_400_000;
const STABLE_RANGE = 0.01;
const VOLATILE_RANGE = 0.06;

/** Hash string → seed numerik, supaya harga & perubahan stabil per hari. */
function seed(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** PRNG sederhana, deterministik dari seed. */
function random(seedValue: number): () => number {
  let state = seedValue || 1;
  return () => {
    state = (Math.imul(state, 48271) % 2147483647) % 2147483647;
    return state / 2147483647;
  };
}

function dailyChange(symbol: string, dayIndex: number, price: number): number {
  const rng = random(seed(`${symbol}:${dayIndex}`));
  const range = symbol === "USDT" ? STABLE_RANGE : VOLATILE_RANGE;
  return (rng() * 2 - 1) * range * price;
}

/**
 * Harga contoh deterministik: seed dari simbol + hari, sehingga semua halaman
 * menampilkan angka yang sama tanpa perlu state bersama.
 */
export function getQuotes(now: number = Date.now()): PriceQuote[] {
  const today = Math.floor(now / DAY_MS);

  return ASSETS.map((asset) => {
    const sparkline: number[] = [];
    let close = asset.priceIdr;

    for (let offset = 7; offset >= 1; offset -= 1) {
      close -= dailyChange(asset.symbol, today - offset, close);
      sparkline.push(Math.round(close));
    }

    const price = sparkline[sparkline.length - 1];
    const previous = sparkline[sparkline.length - 2] ?? price;
    const change24h = previous === 0 ? 0 : ((price - previous) / previous) * 100;

    return {
      name: asset.name,
      symbol: asset.symbol,
      price,
      change24h,
      sparkline,
    };
  });
}

export function getQuote(symbol: string): PriceQuote | null {
  return (
    getQuotes().find(
      (q) => q.symbol.toLowerCase() === symbol.toLowerCase()
    ) ?? null
  );
}