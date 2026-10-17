export const MIN_IDR = 10_000;
export const MAX_IDR = 50_000_000;
export const FEE_RATE = 0.0015;

/**
 * Hitung biaya simulasi dari nominal IDR.
 * Biaya dibulatkan ke rupiah terdekat.
 */
export function feeFor(amountIdr: number): number {
  return Math.round(amountIdr * FEE_RATE);
}

/**
 * Validasi nominal transaksi.
 * @returns null jika valid, atau pesan error string jika tidak valid.
 */
export function validateAmount(amountIdr: number, balanceIdr: number): string | null {
  if (amountIdr < MIN_IDR) {
    return `Nominal minimal ${MIN_IDR.toLocaleString("id-ID")}`;
  }
  if (amountIdr > MAX_IDR) {
    return `Nominal maksimal ${MAX_IDR.toLocaleString("id-ID")}`;
  }
  if (amountIdr > balanceIdr) {
    return "Saldo tidak mencukupi";
  }
  return null;
}