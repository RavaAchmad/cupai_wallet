import Link from "next/link";
import { HowItWorks } from "@/components/how-it-works";
import { MarketTicker } from "@/components/market-ticker";
import { FAQ } from "@/components/faq";
import { AtmHeroVisual } from "@/components/atm-hero-visual";
import { ThemeToggle } from "@/components/theme-toggle";
import { Reveal } from "@/components/reveal";
import { SimulationBanner } from "@/components/simulation-banner";
import {
  ShieldCheck,
  Accessibility,
  ReceiptText,
  ArrowRight,
  BookOpen,
  Calculator,
  Landmark,
  KeyRound,
} from "lucide-react";

const navLinks = [
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Harga", href: "#harga" },
  { label: "Fitur", href: "#fitur" },
  { label: "FAQ", href: "#faq" },
];

const transparencyItems = [
  {
    icon: <Calculator className="h-6 w-6" />,
    title: "Biaya tampil sebelum konfirmasi",
    description:
      "Simulasi menampilkan biaya jaringan sebelum Anda memasukkan PIN, sehingga Anda tahu apa yang akan dibayar.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Tanpa uang sungguhan",
    description:
      "Semua saldo dan transaksi adalah data contoh. Tidak ada dana yang berpindah.",
  },
  {
    icon: <ReceiptText className="h-6 w-6" />,
    title: "Struk digital setiap transaksi",
    description:
      "Setiap simulasi berakhir dengan struk berisi rincian nominal, biaya, dan estimasi koin.",
  },
  {
    icon: <Accessibility className="h-6 w-6" />,
    title: "Dirancang untuk semua usia",
    description:
        "Tombol besar, teks jelas, dan Mode Mudah yang memperbesar seluruh tampilan.",
  },
];

const educationCards = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Kripto untuk pemula",
    description:
      "Dasar-dasar blockchain dan cara kerja transaksi, dijelaskan tanpa istilah rumit.",
    href: "/edukasi",
  },
  {
    icon: <Landmark className="h-5 w-5" />,
    title: "Cara mengamankan aset",
    description:
      "Langkah praktis menyimpan aset dengan aman, termasuk penggunaan seed phrase.",
    href: "/brankas",
  },
  {
    icon: <KeyRound className="h-5 w-5" />,
    title: "Panduan seed phrase",
    description:
      "Cara menuliskan seed phrase di kertas dan menghindari kesalahan umum.",
    href: "/brankas",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SimulationBanner />

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-base font-bold text-primary-foreground"
              aria-hidden="true"
            >
              C
            </span>
            <span className="text-lg font-bold tracking-tight">Cupay</span>
          </Link>

          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-1 md:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex min-h-[44px] items-center rounded-lg px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-lg border border-input px-3 text-sm font-medium transition-colors hover:bg-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-3.5"
            >
              <span className="hidden sm:inline">Buka simulasi</span>
              <span className="sm:hidden">Simulasi</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative border-b border-border/30">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20 lg:px-10">
          <Reveal className="space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-semibold text-muted-foreground">
              <span
                className="h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              Simulasi edukasi — tanpa uang sungguhan
            </p>

            <h1 className="text-[2.5rem]/[1.12] font-bold tracking-tight sm:text-[3rem]/[1.1] lg:text-[3.4rem]/[1.08]">
              Kripto, lebih mudah
              <br />
              dipahami.
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Kenali cara kerja crypto ATM lewat simulasi yang sederhana dan
              transparan. Pilih aset, masukkan nominal, lihat rincian biaya, dan
              terima struk digital — semuanya tanpa risiko.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-primary px-7 text-base font-bold text-primary-foreground shadow-raised transition-colors hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Coba Simulasi ATM
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#cara-kerja"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-input px-6 text-base font-semibold transition-colors hover:bg-accent active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Pelajari Cara Kerjanya
              </a>
            </div>

            <dl className="flex flex-wrap gap-x-10 gap-y-4 pt-2">
              <div>
                <dt className="text-sm text-muted-foreground">
                  Saldo simulasi
                </dt>
                <dd className="text-lg font-bold tabular-nums">
                  Rp 10.000.000
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Langkah</dt>
                <dd className="text-lg font-bold">5 langkah</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Biaya daftar</dt>
                <dd className="text-lg font-bold">Tidak ada</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.08} className="lg:pl-4">
            <AtmHeroVisual />
          </Reveal>
        </div>
      </section>

      {/* Cara kerja */}
      <HowItWorks />

      {/* Transparansi & biaya */}
      <section id="fitur" className="border-t border-border/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Rincian sebelum Anda memutuskan
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
                Simulasi menampilkan angka dan biaya secara terbuka, tanpa klaim
                berlebihan tentang keamanan atau legalitas.
              </p>
            </div>

            <div className="divide-y divide-border border-y border-border">
              {transparencyItems.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.05}>
                  <div className="flex gap-4 py-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="text-base font-bold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Harga */}
      <MarketTicker />

      {/* Edukasi */}
      <section id="edukasi" className="border-t border-border/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Belajar dulu, baru mencoba
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Materi singkat untuk Anda yang baru mengenal kripto.
              </p>
            </div>
            <Link
              href="/edukasi"
              className="inline-flex h-11 shrink-0 items-center gap-1.5 self-start rounded-lg border border-input px-4 text-sm font-semibold transition-colors hover:bg-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:self-auto"
            >
              Semua artikel
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Editorial layout: one featured item + compact list */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <Reveal>
              <Link
                href={educationCards[0].href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-input bg-card p-8 shadow-card transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-10"
              >
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                    {educationCards[0].icon}
                  </span>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
                    {educationCards[0].title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                    {educationCards[0].description}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Mulai baca
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>

            <ul className="divide-y divide-border border-y border-border">
              {educationCards.slice(1).map((card, i) => (
                <li key={card.title}>
                  <Reveal delay={(i + 1) * 0.05}>
                    <Link
                      href={card.href}
                      className="group flex items-start gap-4 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                        {card.icon}
                      </span>
                      <span className="flex-1">
                        <span className="block text-base font-bold tracking-tight group-hover:text-primary">
                          {card.title}
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                          {card.description}
                        </span>
                      </span>
                      <ArrowRight
                        className="mt-2.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="border-t border-border/30 px-6 py-20 sm:px-8 sm:py-24 lg:px-10">
        <Reveal className="mx-auto max-w-5xl">
          <div className="rounded-2xl bg-slate-900 px-8 py-12 text-center shadow-panel sm:px-14 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              Langkah terakhir
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Sudah paham alurnya?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
              Jalankan sendiri kelima langkahnya. Tanpa daftar, tanpa uang
              sungguhan — selesai dalam beberapa menit.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-7 text-base font-bold text-slate-900 transition-colors hover:bg-slate-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Mulai simulasi
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#harga"
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-slate-600 px-6 text-base font-semibold text-slate-200 transition-colors hover:bg-slate-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Lihat harga contoh
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-14">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
               <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-base font-bold text-primary-foreground">
                 C
               </span>
               <span className="text-lg font-bold tracking-tight">
                 Cupay
               </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Simulasi edukasi untuk memahami cara kerja transaksi crypto ATM.
                Tidak ada uang sungguhan yang terlibat.
              </p>
            </div>

            <nav aria-label="Produk">
              <h3 className="text-sm font-bold">Produk</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link
                    href="/dashboard"
                    className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                  >
                    Simulasi ATM
                  </Link>
                </li>
                <li>
                  <Link
                    href="/harga"
                    className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                  >
                    Daftar Harga
                  </Link>
                </li>
                <li>
                  <a
                    href="#cara-kerja"
                    className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                  >
                    Cara Kerja
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label="Belajar">
              <h3 className="text-sm font-bold">Belajar</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link
                    href="/edukasi"
                    className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                  >
                    Edukasi Kripto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brankas"
                    className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                  >
                    Brankas Keamanan
                  </Link>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label="Pengaturan">
              <h3 className="text-sm font-bold">Pengaturan</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                <Link
                    href="/settings"
                    className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                >
                    Mode Mudah
                </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-border/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Cupay Wallet adalah proyek simulasi edukasi. Bukan produk keuangan.
            </p>
            <p className="text-xs text-muted-foreground">
              Saldo, harga, dan transaksi adalah data contoh.
            </p>
          </div>

          <div className="mt-6">
            <SimulationBanner />
          </div>
        </div>
      </footer>
    </div>
  );
}
