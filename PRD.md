# PRODUCT REQUIREMENTS DOCUMENT (PRD)
**Nama Proyek:** Cupay Wallet
**Visi Produk:** Membantu pemula di Indonesia memahami transaksi crypto melalui antarmuka "ATM" yang familiar — sebagai **simulasi edukasi**, bukan produk keuangan.

> **Status: Simulasi.** Semua saldo, harga, dan transaksi adalah data contoh yang disimpan di browser (Zustand + persist). Tidak ada uang sungguhan, transaksi on-chain, akun, atau data pengguna.

## 1. Filosofi Desain & UX (The "ATM" Concept)
*   **Estetika:** Clean, banyak *white space*, kartu dengan *soft shadow*, tipografi sans-serif yang mudah dibaca (Inter).
*   **UX ATM (Semua Generasi):**
    *   **Satu Layar = Satu Keputusan:** Layar utama adalah "Menu Utama ATM", bukan dashboard penuh grafik.
    *   **Tombol Besar:** Target sentuh minimal 48x48px.
    *   **Flow Berurutan:** Pilih jenis transaksi ➔ Pilih aset ➔ Masukkan nominal ➔ Tinjau biaya ➔ PIN ➔ Struk digital.
    *   **Jargon Bebas Teknis:** "Biaya Jaringan", "Estimasi Harga Diterima", "Kunci Pemulihan" — bukan *gas fee*, *slippage*, *private key*.

## 2. Target Pengguna (All Generations)
*   **Gen Z & Milenial:** Proses cepat, UI estetik, *dark mode*.
*   **Gen X & Boomers:** Teks besar (Mode Mudah), panduan wizard *step-by-step*, tombol bantuan jelas.

## 3. Spesifikasi Fitur

### A. Landing Page
1.  **Navbar:** logo, menu Produk/Fitur/Biaya/Keamanan/Akademi, tombol "Masuk" (outline) dan "Coba Simulasi" (utama).
2.  **Hero:** judul jujur, 2 CTA (Coba Simulasi, Lihat Cara Kerja), mockup ponsel statis.
3.  **Kenapa Cupay:** 3 kartu — belajar tanpa risiko, alur ATM, biaya terlihat.
4.  **Cara Kerja:** 3 langkah — Buka dashboard, Isi saldo (simulasi), Beli aset pertama.
5.  **Market sneak peek:** harga aset populer dari sumber data tunggal dengan sparkline.
6.  **Biaya transparan:** tabel ringkas (biaya 0,15% per transaksi, minimum/maksimum nominal).
7.  **Kalkulator DCA** dan **Auto-invest/Earn/Price alert** berlabel ilustrasi.
8.  **Akademi:** kartu pelajaran untuk pemula.
9.  **FAQ:** jujur soal status simulasi.
10. **Footer:** 5 kolom (Produk, Fitur, Biaya, Pelajari, Perusahaan), tautan hukum, disclaimer.

### B. Core App (App Shell + Bottom Nav 5 Tab)
Tab: **Beranda, Pasar, Dompet, Portofolio, Akun**.

1.  **Beranda (`/dashboard`):** saldo total IDR (bisa disembunyikan), 6 aksi transaksi sebagai tombol besar.
2.  **Wizard transaksi:**
    *   *Beli:* nominal Rp → pilih aset → tinjau (harga dikunci 15 detik) → PIN → struk.
    *   *Jual:* pilih aset → jumlah (25/50/75/100%) → tinjau → PIN → struk.
    *   *Tukar:* aset asal → aset tujuan → jumlah → tinjau (kurs + biaya) → PIN → struk.
    *   *Kirim:* aset → alamat (validasi format per jaringan) → jumlah → tinjau → PIN → status bertahap.
    *   *Setor:* metode → nominal → instruksi + tombol simulasi → saldo bertambah.
    *   *Tarik:* rekening → nominal → PIN → status Diproses → Berhasil.
3.  **Riwayat (`/riwayat`):** dikelompokkan per tanggal, filter, detail stepper, ekspor CSV.
4.  **Portofolio:** nilai sekarang, total modal, unrealized P/L, alokasi, harga rata-rata.
5.  **Dompet:** saldo rupiah, daftar aset, tombol Kirim/Terima.
6.  **Akun:** placeholder auth, Brankas, Pengaturan (Mode Mudah, tema), reset demo.

### C. Aturan Transaksi (Simulasi)
*   Minimum Rp10.000 per transaksi, maksimum Rp50.000.000.
*   Biaya 0,15% per transaksi.
*   PIN salah 5× → kunci 5 menit.
*   Saldo awal simulasi: Rp10.000.000.

## 4. Data & API
Karena fokusnya UX frontend, tidak ada backend nyata. State transaksi disimpan di browser lewat Zustand + persist. Route handler Next.js mengembalikan data contoh dari satu sumber (`lib/atm-data.ts`).

*   **`GET /api/prices`** — 12 aset dengan perubahan 24 jam (deterministik per hari) dan sparkline 7 hari.
*   **`POST /api/transaction`** — validasi PIN hash, idempotency key, delay simulasi 800–1500 ms, TXID unik `CPY-<base36>`.

## 5. Tech Stack
*   **Framework:** Next.js 14 (App Router)
*   **Styling:** Tailwind CSS + shadcn/ui
*   **Icons:** Lucide React
*   **Animations:** Framer Motion
*   **State:** Zustand (+ persist middleware)
