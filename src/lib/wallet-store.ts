import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Holding {
  asset: string;
  amount: number;
  avgPriceIdr: number;
}

export interface TransactionRecord {
  txid: string;
  type: string;
  asset: string;
  amountIdr: number;
  feeIdr: number;
  units: number;
  createdAt: string;
}

export interface Alert {
  symbol: string;
  targetIdr: number;
  createdAt: string;
}

export interface WalletState {
  name: string;
  balanceIdr: number;
  holdings: Holding[];
  history: TransactionRecord[];
  watchlist: string[];
  alerts: Alert[];
  pinHash: string | null;
  easyMode: boolean;
  showBalance: boolean;
  setPinHash: (hash: string | null) => void;
  toggleWatchlist: (symbol: string) => void;
  setEasyMode: (on: boolean) => void;
  setShowBalance: (on: boolean) => void;
  setAlert: (symbol: string, targetIdr: number) => void;
  removeAlert: (symbol: string) => void;
  recordTransaction: (tx: Omit<TransactionRecord, "createdAt">) => void;
  resetDemo: () => void;
}

const INITIAL_BALANCE = 10_000_000;

const INITIAL_STATE = {
  name: "Budi Santoso",
  balanceIdr: INITIAL_BALANCE,
  holdings: [] as Holding[],
  history: [] as TransactionRecord[],
  watchlist: ["BTC", "ETH"] as string[],
  alerts: [] as Alert[],
  pinHash: null as string | null,
  easyMode: false,
  showBalance: true,
};

export const useWallet = create<WalletState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setPinHash: (hash) => set({ pinHash: hash }),

      toggleWatchlist: (symbol) =>
        set((s) => ({
          watchlist: s.watchlist.includes(symbol)
            ? s.watchlist.filter((w) => w !== symbol)
            : [...s.watchlist, symbol],
        })),

      setEasyMode: (on) => set({ easyMode: on }),
      setShowBalance: (on) => set({ showBalance: on }),

      setAlert: (symbol, targetIdr) =>
        set((s) => ({
          alerts: [
            ...s.alerts.filter((a) => a.symbol !== symbol),
            { symbol, targetIdr, createdAt: new Date().toISOString() },
          ],
        })),

      removeAlert: (symbol) =>
        set((s) => ({ alerts: s.alerts.filter((a) => a.symbol !== symbol) })),

      recordTransaction: (tx) =>
        set((s) => ({
          balanceIdr: s.balanceIdr - tx.amountIdr - tx.feeIdr,
          history: [{ ...tx, createdAt: new Date().toISOString() }, ...s.history],
        })),

      resetDemo: () => set({ ...INITIAL_STATE }),
    }),
    { name: "cupay-wallet" }
  )
);