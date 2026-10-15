Berikut adalah **Product Requirements Document (PRD) Super Detail** dan **Prompt untuk AI Agent** Anda untuk membangun aplikasi crypto wallet dengan konsep "ATM" (sederhana, transaksional, step-by-step) dan estetika modern terpercaya seperti Pluang.com.

---

# 📘 PRODUCT REQUIREMENTS DOCUMENT (PRD)
**Nama Proyek:** CupaiWallet (Sementara)
**Visi Produk:** Menjadi gerbang crypto paling mudah digunakan di Indonesia yang menghilangkan intimidasi teknologi blockchain melalui antarmuka "ATM" yang familiar dan landing page yang membangun kepercayaan ala Pluang.com.

## 1. Filosofi Desain & UX (The "ATM" Concept)
*   **Estetika (Pluang Style):** Clean, banyak *white space*, kartu (cards) dengan *soft shadow*, gradient halus untuk CTA utama, tipografi sans-serif yang bold dan mudah dibaca (seperti Plus Jakarta Sans atau Inter).
*   **UX ATM (Semua Generasi):**
    *   **Satu Layar = Satu Keputusan:** Tidak ada dashboard yang berantakan. Layar utama adalah "Menu Utama ATM".
    *   **Tombol Raksasa (Large Touch Targets):** Cocok untuk lansia atau pemula. Minimal ukuran 48x48px (standar accessibility).
    *   **Flow Transaksional Berurutan:** Masukkan PIN/Biometrik ➔ Pilih Aset ➔ Masukkan Nominal (Rupiah/Kripto) ➔ Konfirmasi ➔ "Cetak Struk" (Notifikasi Sukses).
    *   **Jargon Bebas Teknis:** Mengganti istilah *Gas Fee, Slippage, Private Key* dengan bahasa awam seperti *Biaya Jaringan, Estimasi Harga Diterima, Kunci Pemulihan*.

## 2. Target Pengguna (All Generations)
*   **Gen Z & Milenial:** Ingin proses cepat, UI estetik, *dark mode*, dan akses ke market insights.
*   **Gen X & Boomers:** Membutuhkan teks besar, panduan *step-by-step* (wizard), kepercayaan tinggi (security badges), dan tombol bantuan yang jelas.

---

## 3. Spesifikasi Fitur Utama (Frontend-First)

### A. Landing Page (Pluang-Inspired)
1.  **Hero Section:** Headline kuat ("Investasi Kripto Semudah Tarik Tunai di ATM"), ilustrasi 3D minimalis smartphone, dan 2 CTA (Daftar Sekarang / Lihat Simulasi).
2.  **Trust & Security Bar:** Logo regulasi (Bappebti placeholder), sertifikasi keamanan ISO, enkripsi end-to-end.
3.  **How It Works (The ATM Flow):** Animasi sederhana 3 langkah (1. Buat Akun, 2. Setor Rupiah, 3. Beli Kripto).
4.  **Market Sneak Peek:** Ticker harga aset populer (BTC, ETH, SOL) dengan kartu berwarna hijau/merah yang bersih.
5.  **Footer:** Edukasi, Bantuan, Kontak, Regulasi.

### B. Core App: The ATM Dashboard (Mobile First)
1.  **Layar Login/Welcome:** "Selamat Datang di KoinATM". Meminta PIN 6 digit atau Biometrik.
2.  **Beranda (Menu Utama ATM):**
    *   Saldo Total (Dalam Rupiah - bisa di-hide dengan ikon 'Mata').
    *   Grid 4 Tombol Raksasa: **Setor (Deposit)**, **Tarik (Withdraw)**, **Tukar (Swap)**, **Kirim (Send)**.
3.  **Flow Transaksi (Wizard Step-by-Step):**
    *   *Step 1:* Pilih Koin dari daftar (dengan logo & nama jelas).
    *   *Step 2:* Masukkan Nominal (Tombol numpad besar di layar seperti mesin ATM asli, ada tombol "Rp 100rb", "Rp 500rb", "Maks").
    *   *Step 3:* Ringkasan & Biaya (Tampilan seperti struk ATM sebelum keluar).
    *   *Step 4:* Animasi sukses & "Struk Digital".

### C. Modul Pendukung (Agar Aplikasi Terasa "Hidup")
1.  **Pojok Edukasi (Bite-sized Learning):**
    *   Artikel 1-menit baca: "Apa itu Bitcoin?", "Cara Aman Menyimpan Kripto".
    *   Quiz berhadiah poin/voucher kecil.
2.  **Market Pulse (Sentimen Harian):**
    *   Bukan chart rumit. Hanya indikator "Cuaca Pasar" (Cerah/Bullish, Mendung/Bearish, Hujan/Crash) dengan penjelasan *kenapa* dalam bahasa manusia.
3.  **Brankas Keamanan (Security Vault):**
    *   Panduan interaktif cara mencatat *Seed Phrase* di kertas (bukan di screenshot/notes HP).
    *   Fitur "Kontak Darurat" (Waris).
4.  **Auto-Nabung (DCA - Dollar Cost Averaging):**
    *   Fitur "Jadikan Rutin": Beli Rp 50.000 setiap hari Senin.

---

## 4. Spesifikasi Backend (Seadanya / Mock Tester)
Karena fokus utama adalah UX Frontend, backend akan menggunakan **Mock API** (bisa via Next.js Route Handlers atau MSW - Mock Service Worker) dengan data *hardcoded*.

*   **`GET /api/user/profile`**: Mengembalikan nama, status KYC, dan preferensi UI.
*   **`GET /api/balance`**: Mengembalikan saldo IDR dan aset kripto.
*   **`GET /api/prices`**: Mengembalikan array harga aset dengan persentase perubahan 24 jam (statis/lorem ipsum).
*   **`POST /api/transaction`**: Menerima payload `{type, asset, amount, pin}`, delay 1.5 detik (simulasi proses ATM), dan kembalikan `status: "success"`.

---

## 5. Tech Stack Rekomendasi
*   **Frontend Framework:** Next.js 14 (App Router) - Untuk SEO Landing page & kecepatan dashboard.
*   **Styling:** Tailwind CSS + **Shadcn UI** (Sangat penting untuk aksesibilitas komponen bawaan).
*   **Icons:** Lucide React (Modern & clean).
*   **Animations:** Framer Motion (Untuk transisi layar ATM yang mulus).
*   **State Management:** Zustand (Ringan, cocok untuk flow wizard).
*   **Mocking:** MSW (Mock Service Worker) atau Next.js API Routes.
