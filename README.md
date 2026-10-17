# Cupay Wallet

Simulasi edukasi transaksi crypto ATM. Built with Next.js 14 (App Router), Tailwind CSS, shadcn/ui, Framer Motion, and Zustand.

> **Disclaimer:** Cupay Wallet adalah proyek simulasi edukasi. Bukan produk keuangan. Tidak ada uang sungguhan, transaksi nyata, atau akun yang dibuat. Semua saldo, harga, dan transaksi adalah data contoh.

## Features

- **Landing page** — hero, cara kerja, transparansi biaya, market ticker, edukasi, FAQ, CTA
- **App shell** — bottom nav 5 tab (Beranda, Pasar, Dompet, Portofolio, Akun)
- **Transaction wizards** — Beli, Jual, Tukar, Kirim, Setor, Tarik (step-by-step ATM flow)
- **Price list** — 12 aset (BTC, ETH, USDT, BNB, SOL, XRP, ADA, DOGE, TRX, DOT, AVAX, LTC)
- **Education** — artikel kripto singkat untuk pemula
- **Security vault** — panduan menyimpan aset dan seed phrase
- **Easy Mode** — memperbesar seluruh teks menjadi 18px untuk semua halaman
- **Dark mode** — toggle terang/gelap

## Tech Stack

| Layer | Tool |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Icons | Lucide React |
| Animations | Framer Motion |
| State | Zustand |
| Mock API | Next.js Route Handlers |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run start   # serve production build
npm run lint    # lint
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/dashboard` | ATM dashboard + transaction wizards |
| `/pasar` | Price list |
| `/portofolio` | Portfolio, allocation, P&L |
| `/dompet` | Wallet balances & assets |
| `/riwayat` | Transaction history |
| `/akademi` | Education articles |
| `/akun` | Account (placeholder auth) |
| `/akun/brankas` | Security vault guide |
| `/akun/pengaturan` | Easy Mode, theme |

Legacy routes (`/harga`, `/edukasi`, `/brankas`, `/settings`) redirect to their new locations.

## Mock API

| Endpoint | Method | Returns |
| --- | --- | --- |
| `/api/balance` | GET | Simulated IDR balance + assets |
| `/api/prices` | GET | Asset prices with 24h change |
| `/api/transaction` | POST | Simulated transaction result |

## Tests

E2E checks use SeleniumBase (not installed by default):

```bash
python -m pytest tests/e2e/test_cupay_wallet.py -v
```

Env: `BASE_URL` (default `http://localhost:3100`), optional `CHROME_PATH`.

## License

Educational simulation. See [PRD.md](./PRD.md) for product requirements and honest scope notes.
