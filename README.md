# Cupay Wallet

Simulasi edukasi transaksi crypto ATM. Built with Next.js 14 (App Router), Tailwind CSS, shadcn/ui, Framer Motion, and Zustand.

> **Disclaimer:** Cupay Wallet adalah proyek simulasi edukasi. Bukan produk keuangan. Tidak ada uang sungguhan, transaksi nyata, atau akun yang dibuat. Semua saldo, harga, dan transaksi adalah data contoh.

## Features

- **Landing page** — hero, cara kerja, transparansi biaya, market ticker, edukasi, FAQ, CTA
- **Dashboard** — 4 aksi ATM: Setor, Tarik, Tukar, Kirim
- **Wizard 5 langkah** — pilih aset → nominal → biaya → PIN → struk digital
- **Halaman harga** — daftar harga aset contoh dengan pencarian
- **Edukasi** — artikel kripto singkat untuk pemula
- **Brankas** — panduan menyimpan aset dan seed phrase
- **Mode Lansia** — memperbesar seluruh teks menjadi 18px
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
| `/dashboard` | ATM dashboard + wizard |
| `/harga` | Price list |
| `/edukasi` | Education articles |
| `/brankas` | Security vault guide |
| `/settings` | Mode Lansia, theme |

## Mock API

| Endpoint | Method | Returns |
| --- | --- | --- |
| `/api/balance` | GET | Simulated IDR balance + assets |
| `/api/prices` | GET | Asset prices with 24h change |
| `/api/transaction` | POST | Simulated transaction result |

## Tests

End-to-end checks use SeleniumBase:

```bash
python -m pytest tests/e2e/test_cupay_wallet.py -v
```

Env: `BASE_URL` (default `http://localhost:3100`), optional `CHROME_PATH`.

## License

Educational simulation. See [PRD.md](./PRD.md) for the original product requirements.
