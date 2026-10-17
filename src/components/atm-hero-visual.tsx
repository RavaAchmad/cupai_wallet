import {
  ArrowUpRight,
  DollarSign,
  RefreshCw,
  Send,
  Eye,
  Home,
  GraduationCap,
  Landmark,
  User,
} from "lucide-react";

const keys = [
  { label: "Setor", Icon: ArrowUpRight },
  { label: "Tarik", Icon: DollarSign },
  { label: "Tukar", Icon: RefreshCw },
  { label: "Kirim", Icon: Send },
];

const nav = [
  { label: "Beranda", Icon: Home },
  { label: "Edukasi", Icon: GraduationCap },
  { label: "Brankas", Icon: Landmark },
  { label: "Profil", Icon: User },
];

/**
 * Static depiction of the real ATM screen. Presentational only — the working
 * version lives at /dashboard. Kept in sync with src/app/dashboard/page.tsx.
 */
export function AtmHeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[380px] overflow-hidden rounded-2xl border border-border bg-card shadow-panel"
    >
      {/* Screen */}
      <div className="bg-slate-900 px-6 pb-7 pt-6 text-slate-50">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
            Selamat Datang
          </p>
          <span className="text-slate-400">
            <Eye className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-300">Budi Santoso</p>
        <p className="mt-4 text-4xl font-bold tabular-nums tracking-tight">
          Rp 10.000.000
        </p>
        <p className="mt-1 text-xs text-slate-400">Total saldo</p>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-2 gap-2 p-4">
        {keys.map(({ label, Icon }) => (
          <div
            key={label}
            className="flex h-16 flex-col items-start justify-center gap-1.5 rounded-xl border border-border bg-secondary px-4"
          >
            <Icon className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold">{label}</span>
          </div>
        ))}
      </div>

      {/* Nav strip */}
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        {nav.map(({ label, Icon }, i) => (
          <div
            key={label}
            className={
              "flex flex-col items-center gap-1 " +
              (i === 0 ? "text-primary" : "text-muted-foreground")
            }
          >
            <Icon className="h-4 w-4" />
            <span className="text-[10px] font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}