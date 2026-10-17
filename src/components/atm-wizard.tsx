"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/ui/cn";
import {
  ASSETS,
  NETWORK_FEE,
  formatRupiah,
  parseRupiah,
  type Asset,
  type TransactionType,
  TRANSACTION_TITLE,
} from "@/lib/atm-data";
import { getQuotes, type PriceQuote } from "@/lib/prices";
import {
  ChevronLeft,
  CheckCircle2,
  Copy,
  Loader2,
  Search,
  Share2,
  Delete,
} from "lucide-react";

interface AtmWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: TransactionType;
}

type Step = "asset" | "amount" | "confirm" | "pin" | "receipt";

const QUICK_AMOUNTS = [50_000, 100_000, 500_000, "max"] as const;
const BALANCE_IDR = 10_000_000;

export function AtmWizard({ open, onOpenChange, type }: AtmWizardProps) {
  const [step, setStep] = useState<Step>("asset");
  const [query, setQuery] = useState("");
  const [asset, setAsset] = useState<Asset>(ASSETS[0]);
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [txid, setTxid] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [quotes, setQuotes] = useState<PriceQuote[]>([]);

  useEffect(() => {
    if (open) {
      setStep("asset");
      setQuery("");
      setAsset(ASSETS[0]);
      setAmount("");
      setPin("");
      setTxid(null);
      setSubmitting(false);
      setCopied(false);
    }
  }, [open]);

  useEffect(() => {
    const quotes = getQuotes();
    setQuotes(quotes);
  }, []);

  const priceMap = Object.fromEntries(quotes.map((q) => [q.symbol, q.price]));
  const nominal = parseRupiah(amount);
  const fee = NETWORK_FEE[asset.symbol];
  const coins = priceMap[asset.symbol] ? nominal / priceMap[asset.symbol] : 0;

  const visibleAssets = ASSETS.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.symbol.toLowerCase().includes(query.toLowerCase())
  );

  async function submitTransaction() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, asset: asset.symbol, amount: nominal, pin }),
      });
      const data = await res.json();
      setTxid(data.txid);
      setStep("receipt");
    } catch {
      setSubmitting(false);
    }
  }

  const title = TRANSACTION_TITLE[type];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden max-h-[92vh]">
        <DialogHeader className="px-5 pt-5 pb-3 space-y-1">
          <DialogTitle className="text-lg font-bold">
            {step === "receipt" ? "Transaksi Berhasil" : title}
          </DialogTitle>
          <StepIndicator step={step} />
        </DialogHeader>

        <div className="overflow-y-auto px-5 pb-5">
          {step === "asset" && (
            <StepAsset
              query={query}
              setQuery={setQuery}
              assets={visibleAssets}
              priceMap={priceMap}
              onPick={(a) => {
                setAsset(a);
                setStep("amount");
              }}
            />
          )}

          {step === "amount" && (
            <StepAmount
              asset={asset}
              amount={amount}
              setAmount={setAmount}
              balance={BALANCE_IDR}
              onBack={() => setStep("asset")}
              onNext={() => nominal > 0 && setStep("confirm")}
            />
          )}

          {step === "confirm" && (
            <StepConfirm
              asset={asset}
              nominal={nominal}
              fee={fee}
              coins={coins}
              onBack={() => setStep("amount")}
              onNext={() => setStep("pin")}
            />
          )}

          {step === "pin" && (
            <StepPin
              pin={pin}
              setPin={setPin}
              submitting={submitting}
              onBack={() => setStep("confirm")}
              onSubmit={submitTransaction}
            />
          )}

          {step === "receipt" && (
            <StepReceipt
              asset={asset}
              nominal={nominal}
              fee={fee}
              coins={coins}
              txid={txid}
              copied={copied}
              setCopied={setCopied}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const order: Step[] = ["asset", "amount", "confirm", "pin", "receipt"];
  const current = order.indexOf(step);
  return (
    <div className="flex gap-1" aria-label={`Langkah ${current + 1} dari 5`}>
      {order.map((s, i) => (
        <div
          key={s}
          className={cn(
            "h-1 flex-1 rounded-full transition-colors",
            i <= current ? "bg-primary" : "bg-muted"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function StepAsset({
  query,
  setQuery,
  assets,
  priceMap,
  onPick,
}: {
  query: string;
  setQuery: (q: string) => void;
  assets: readonly Asset[];
  priceMap: Record<string, number>;
  onPick: (a: Asset) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari koin..."
          className="h-14 pl-10 text-lg"
          aria-label="Cari koin"
        />
      </div>
      <div className="space-y-2">
        {assets.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground text-lg">
            Koin &quot;{query}&quot; tidak ditemukan.
          </p>
        ) : (
          assets.map((a) => (
            <button
              key={a.symbol}
              type="button"
              onClick={() => onPick(a)}
              className="flex w-full items-center gap-4 rounded-xl border border-border bg-card px-4 py-4 text-left transition-colors hover:bg-accent active:scale-95"
            >
              <CoinGlyph symbol={a.symbol} glyph={a.glyph} />
              <div className="flex-1">
                <p className="font-bold text-lg">{a.name}</p>
                <p className="text-sm text-muted-foreground">{a.symbol}</p>
              </div>
              <p className="text-right text-sm text-muted-foreground tabular-nums">
                {formatRupiah(priceMap[a.symbol] ?? a.priceIdr)}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function StepAmount({
  asset,
  amount,
  setAmount,
  balance,
  onBack,
  onNext,
}: {
  asset: Asset;
  amount: string;
  setAmount: (a: string) => void;
  balance: number;
  onBack: () => void;
  onNext: () => void;
}) {
  const press = (key: string) => {
    if (key === "del") {
      setAmount(amount.slice(0, -1));
      return;
    }
    const next = (amount + key).replace(/^0+/, "");
    if (next.length <= 12) setAmount(next);
  };

  const setQuick = (q: number | "max") => {
    setAmount(String(q === "max" ? balance : q));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
        <CoinGlyph symbol={asset.symbol} glyph={asset.glyph} />
        <div>
          <p className="font-bold">{asset.name}</p>
          <p className="text-sm text-muted-foreground">
            Saldo {formatRupiah(balance)}
          </p>
        </div>
      </div>

      <div className="rounded-xl border-2 border-border bg-card px-4 py-4 text-center">
        <p className="text-4xl font-bold tabular-nums">
          {amount ? formatRupiah(parseRupiah(amount)) : "Rp 0"}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {QUICK_AMOUNTS.map((q) => (
          <Button
            key={String(q)}
            type="button"
            variant="outline"
            onClick={() => setQuick(q)}
            aria-label={`Pilih nominal ${q === "max" ? "maksimal" : q / 1000} ribu rupiah`}
            className="h-12 rounded-xl text-sm active:scale-95"
          >
            {q === "max" ? "Maks" : `${q / 1000}rb`}
          </Button>
        ))}
      </div>

      <Numpad onPress={press} />

      <div className="flex gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-12 rounded-xl active:scale-95"
          aria-label="Kembali"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={parseRupiah(amount) <= 0}
          className="h-12 flex-1 rounded-xl text-base font-bold active:scale-95"
        >
          Lanjut
        </Button>
      </div>
    </div>
  );
}

function Numpad({ onPress }: { onPress: (key: string) => void }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "del", "0"];
  return (
    <div className="grid grid-cols-3 gap-2">
      {keys.map((k) => (
        <button
          key={k}
          type="button"
          onClick={() => onPress(k)}
          aria-label={
            k === "del"
              ? "Hapus"
              : k === "0"
                ? "Nol"
                : `Angka ${k}`
          }
          className="h-14 rounded-xl border border-border bg-card text-xl font-semibold transition-colors hover:bg-accent active:scale-95 active:bg-primary active:text-primary-foreground"
        >
          {k === "del" ? <Delete className="mx-auto h-5 w-5" /> : k}
        </button>
      ))}
    </div>
  );
}

function StepConfirm({
  asset,
  nominal,
  fee,
  coins,
  onBack,
  onNext,
}: {
  asset: Asset;
  nominal: number;
  fee: number;
  coins: number;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-5 font-mono text-sm leading-relaxed">
        <div className="mb-4 border-b border-dashed border-border pb-3 text-center font-sans text-sm text-muted-foreground">
          RINCIAN TRANSAKSI
        </div>
        <ReceiptRow label="Koin" value={asset.name} />
        <ReceiptRow label="Nominal" value={formatRupiah(nominal)} />
        <ReceiptRow
          label="Biaya jaringan"
          value={formatRupiah(fee)}
          tone="sub"
        />
        <div className="mt-3 border-t border-dashed border-border pt-3">
          <ReceiptRow
            label={`Estimasi ${asset.symbol}`}
            value={coins.toFixed(8)}
            strong
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-12 rounded-xl active:scale-95"
          aria-label="Kembali"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="h-12 flex-1 rounded-xl text-base font-bold active:scale-95"
        >
          Konfirmasi
        </Button>
      </div>
    </div>
  );
}

function ReceiptRow({
  label,
  value,
  strong,
  tone,
}: {
  label: string;
  value: string;
  strong?: boolean;
  tone?: "sub";
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1">
      <span className={tone === "sub" ? "text-muted-foreground" : ""}>
        {label}
      </span>
      <span className={cn("tabular-nums", strong && "font-bold")}>{value}</span>
    </div>
  );
}

function StepPin({
  pin,
  setPin,
  submitting,
  onBack,
  onSubmit,
}: {
  pin: string;
  setPin: (p: string) => void;
  submitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const press = (key: string) => {
    if (submitting) return;
    if (key === "del") {
      setPin(pin.slice(0, -1));
      return;
    }
    if (pin.length >= 6) return;
    const next = pin + key;
    setPin(next);
    if (next.length === 6) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-5">
      <div
        className="flex justify-center gap-2"
        role="group"
        aria-label={`PIN 6 digit, ${pin.length} digit terisi`}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            role="img"
            aria-label={`Digit ${i + 1} ${i < pin.length ? "terisi" : "kosong"}`}
            className={cn(
              "h-14 w-12 rounded-lg border-2 transition-colors",
              i < pin.length
                ? "border-primary bg-primary/10"
                : "border-border bg-card"
            )}
          >
            {i < pin.length && (
              <div className="flex h-full items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-primary" />
              </div>
            )}
          </div>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {submitting
          ? "Sedang memproses transaksi"
          : pin.length === 6
            ? "PIN lengkap, memproses transaksi"
            : `${pin.length} dari 6 digit terisi`}
      </p>

      {submitting ? (
        <div className="flex flex-col items-center gap-3 py-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
          <p className="text-lg text-muted-foreground">Memproses...</p>
        </div>
      ) : (
        <Numpad onPress={press} />
      )}

      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={submitting}
        className="h-12 w-full rounded-xl active:scale-95"
        aria-label="Kembali"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
    </div>
  );
}

function StepReceipt({
  asset,
  nominal,
  fee,
  coins,
  txid,
  copied,
  setCopied,
}: {
  asset: Asset;
  nominal: number;
  fee: number;
  coins: number;
  txid: string | null;
  copied: boolean;
  setCopied: (c: boolean) => void;
}) {
  const reduce = useReducedMotion();

  async function share() {
    const text = `Transaksi Cupay Wallet\n${asset.name} ${coins.toFixed(8)}\n${formatRupiah(nominal)}\nID: ${txid}`;
    if (navigator.share) {
      await navigator.share({ text }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <motion.div
        initial={reduce ? false : { scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex justify-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-14 w-14 text-primary" aria-hidden="true" />
        </div>
      </motion.div>

      <p aria-live="polite" className="text-center text-lg font-semibold">
        Transaksi berhasil. {coins.toFixed(8)} {asset.symbol} masuk ke saldo
        Anda.
      </p>

      <div className="rounded-xl border border-border bg-card p-5 font-mono text-sm leading-relaxed">
        <div className="mb-4 border-b border-dashed border-border pb-3 text-center font-sans font-bold">
          STRUK DIGITAL
        </div>
        <ReceiptRow label="Waktu" value={new Date().toLocaleString("id-ID")} />
        <ReceiptRow label="Koin" value={asset.name} />
        <ReceiptRow label="Nominal" value={formatRupiah(nominal)} />
        <ReceiptRow label="Biaya jaringan" value={formatRupiah(fee)} tone="sub" />
        <div className="mt-3 border-t border-dashed border-border pt-3">
          <ReceiptRow
            label={`Diterima (${asset.symbol})`}
            value={coins.toFixed(8)}
            strong
          />
          <ReceiptRow label="ID Transaksi" value={txid ?? "-"} tone="sub" />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={share}
          className="h-12 flex-1 rounded-xl text-sm active:scale-95"
          aria-label="Bagikan struk"
        >
          {copied ? (
            <>
              <Copy className="h-4 w-4" />
              Tersalin
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              Bagikan
            </>
          )}
        </Button>
        <DialogClose asChild>
          <Button
            type="button"
            className="h-12 flex-1 rounded-xl text-sm active:scale-95"
          >
            Selesai
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}

function CoinGlyph({
  symbol,
  glyph,
}: {
  symbol: string;
  glyph: string;
}) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
      {glyph}
      <span className="sr-only">{symbol}</span>
    </div>
  );
}