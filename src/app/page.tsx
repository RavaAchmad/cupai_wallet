import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HowItWorks } from "@/components/how-it-works";
import { MarketTicker } from "@/components/market-ticker";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold">K</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">KoinATM</h1>
          </div>
          <nav className="hidden sm:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Fitur</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">Cara Kerja</a>
            <a href="#market" className="text-sm font-medium hover:text-primary transition-colors">Market</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button className="hidden sm:inline-flex">Mulai Sekarang</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Bappebti Terdaftar &amp; Berlisensi
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-balance">
              Investasi Kripto{" "}
              <span className="text-primary">Semudah Tarik Tunai</span> di ATM
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              KoinATM adalah gerbang crypto paling mudah digunakan di Indonesia.
              Antarmuka ATM yang familiar, aman, dan terpercaya untuk semua orang.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                Daftar Sekarang — Gratis
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Lihat Simulasi ATM
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Tanpa biaya tersembunyi. Mulai dari Rp 10.000.
            </p>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-[280px] h-[540px] rounded-[3rem] border-8 border-foreground/90 bg-gradient-to-br from-primary/20 to-primary/5 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground/90 rounded-b-2xl" />
              <div className="h-full flex flex-col items-center justify-center gap-4 p-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">₿</span>
                </div>
                <div className="w-full space-y-2">
                  <div className="h-3 rounded-full bg-foreground/10 w-3/4 mx-auto" />
                  <div className="h-3 rounded-full bg-foreground/10 w-1/2 mx-auto" />
                </div>
                <div className="grid grid-cols-2 gap-3 w-full mt-4">
                  <div className="h-16 rounded-xl bg-primary/10" />
                  <div className="h-16 rounded-xl bg-primary/10" />
                  <div className="h-16 rounded-xl bg-primary/10" />
                  <div className="h-16 rounded-xl bg-primary/10" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 sm:right-8 flex items-center gap-2 rounded-full bg-card border border-border px-3 py-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs font-medium">Market Pulse</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-10 border-y border-border/20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground mb-8">
            Dipercaya &amp; didukung oleh
          </p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 items-center">
            {["Bappebti", "OJK", "ISO 27001", "Kominfo", "Google Cloud"].map(
              (name) => (
                <div
                  key={name}
                  className="flex items-center justify-center h-12 rounded-lg border border-border/40 bg-card/50 text-sm font-semibold text-muted-foreground"
                >
                  {name}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Market Section */}
      <section id="market" className="py-16 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Harga Terkini</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Harga kripto diperbarui secara real-time
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">₿</span>
                  <span className="text-sm font-medium">BTC</span>
                </div>
                <span className="text-xs text-muted-foreground">Saham Digital</span>
              </div>
              <p className="text-2xl font-bold mt-2">Rp 600.000.000</p>
              <p className="text-sm text-muted-foreground">+2.5% 24h</p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">Ξ</span>
                  <span className="text-sm font-medium">ETH</span>
                </div>
                <span className="text-xs text-muted-foreground">Smart Contract</span>
              </div>
              <p className="text-2xl font-bold mt-2">Rp 40.000.000</p>
              <p className="text-sm text-muted-foreground">-1.2% 24h</p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">◎</span>
                  <span className="text-sm font-medium">SOL</span>
                </div>
                <span className="text-xs text-muted-foreground">High Speed</span>
              </div>
              <p className="text-2xl font-bold mt-2">Rp 1.500.000</p>
              <p className="text-sm text-muted-foreground">+5.0% 24h</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Ticker */}
      <MarketTicker />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-3xl font-bold tracking-tight">
              Siap Memulai Investasi?
            </p>
            <p className="text-muted-foreground text-lg mt-2 max-w-xl mx-auto">
              Gabung ribuan pengguna yang sudah mempermudah investasi kripto mereka
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="w-full sm:w-auto">
                Daftar Sekarang
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Lihat Fitur
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background/50 border-t border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-bold mb-4">KoinATM</h3>
              <p className="text-muted-foreground text-sm">
                Investasi kripto yang mudah dan terpercaya
              </p>
              <div className="mt-6">
                <a
                  href="#"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Syarat & Ketentuan
                </a>
                <a
                  href="#"
                  className="text-sm hover:text-primary transition-colors ms-4"
                >
                  Kebijakan Privasi
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Produk</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">Cara Kerja</a></li>
                <li><a href="#market" className="hover:text-primary transition-colors">Market</a></li>
                <li><a href="#features" className="hover:text-primary transition-colors">Fitur</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Bantuan</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Bantuan</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Kontak</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Regulasi</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Bappebti</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Laporan</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/20 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="text-sm hover:text-primary transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-sm hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-xs text-muted-foreground">
              2024 KoinATM. Semua hak dilindungi.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}