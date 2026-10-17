"use client";

import { UserPlus, Wallet, ArrowLeftRight, ReceiptText } from "lucide-react";

const steps = [
  {
    title: "Buat profil demo",
    icon: <UserPlus className="h-5 w-5" />,
    description:
      "Buka simulasi di dashboard. Tidak perlu daftar dan tidak ada uang sungguhan terlibat.",
  },
  {
    title: "Lihat saldo simulasi",
    icon: <Wallet className="h-5 w-5" />,
    description:
      "Saldo dalam simulasi ditampilkan sebesar Rp 10.000.000 dalam rupiah.",
  },
  {
    title: "Pilih transaksi ATM",
    icon: <ArrowLeftRight className="h-5 w-5" />,
    description:
      "Pilih Setor, Tarik, Tukar, atau Kirim di layar simulasi ATM.",
  },
  {
    title: "Terima struk digital",
    icon: <ReceiptText className="h-5 w-5" />,
    description:
      "Konfirmasi dengan PIN simulasi dan lihat struk transaksi digital.",
  },
];

/**
 * Sequential process section. Uses a vertical timeline with a connecting rail —
 * the numbering is meaningful here because the steps must be done in order.
 */
export function HowItWorks() {
  return (
    <section
      id="cara-kerja"
      className="border-t border-border/30 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Cara kerja simulasi
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
              Empat langkah yang sama seperti alur transaksi pada crypto ATM —
              dijalankan tanpa uang sungguhan.
            </p>
          </div>

          <ol className="relative">
            {steps.map((step, i) => (
              <li key={step.title} className="relative flex gap-5 pb-9 last:pb-0">
                {/* Connecting rail */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[21px] top-11 bottom-0 w-px bg-border"
                  />
                )}
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-input bg-card text-primary shadow-sm">
                  {step.icon}
                </span>
                <div className="pt-1.5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                    Langkah {i + 1}
                  </p>
                  <h3 className="mt-1 text-lg font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}