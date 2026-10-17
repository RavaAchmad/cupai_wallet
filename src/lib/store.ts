import { create } from "zustand";

interface ATMState {
  step: string;
  selectedAsset: string | null;
  amount: string | null;
  setStep: (step: string) => void;
  setSelectedAsset: (asset: string | null) => void;
  setAmount: (amount: string | null) => void;
  reset: () => void;
}

export const useStore = create<ATMState>((set) => ({
  step: "select-asset",
  selectedAsset: null,
  amount: null,
  setStep: (step) => set({ step }),
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
  setAmount: (amount) => set({ amount }),
  reset: () => set({ step: "select-asset", selectedAsset: null, amount: null }),
}));