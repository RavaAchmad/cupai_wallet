# Cupay Wallet — Design Plan

Rencana desain sebelum implementasi Fase 3-6, mengikuti proses `frontend-design`:
plan → review terhadap brief → build → critique.

**Prioritas keputusan:** instruksi eksplisit pemilik > sistem proyek yang sudah ada
(token globals.css, komponen Radix/shadcn di `src/components/ui`, Tailwind) > default skill.
Tidak membuat pola kedua di samping yang sudah ada.

---

## 1. Konteks & brief

- **Subjek:** simulasi edukasi transaksi crypto bergaya mesin ATM untuk Indonesia.
- **Audiens:** pemula dan generasi lebih tua (Gen X/Boomer) yang butuh alur jelas dan teks besar, dan milenial yang butuh kecepatan.
- **Pekerjaan utama halaman:** membuat orang percaya bahwa ini mudah, dan bahwa ini jujur sebagai simulasi.

Subjek "ATM" adalah material desain kita: struk kertas, angka monospace berjajar, langkah bernomor, tombol fisik besar. Kita memakainya secara **semantik** (struk, langkah, angka) bukan sebagai tekstur dekoratif.

---

## 2. Sistem token

Sistem yang ada di `globals.css` (HSL variables + Tailwind map) dipertahankan. Yang ditambahkan di bawah ini adalah *token baru*, bukan pengganti.

### Warna (basis)

| Token | Nilai | Peran |
| --- | --- | --- |
| `--background` / `--foreground` | HSL yang ada | Kanvas; tidak diubah |
| `--primary` | HSL yang ada (biru 221°) | Aksi utama, fokus |
| `--success` (baru) | `152 60% 36%` | Nilai naik, konfirmasi berhasil |
| `--danger` (baru) | `0 72% 51%` | Nilai turun, peringatan kerugian |
| `--ink` (baru) | `222 47% 11%` | Panel struk/gelap, teks di atasnya |

**Aturan pemisahan:** `--primary` tidak pernah dipakai untuk menandakan untung/rugi. Semantik pasar selalu `--success`/`--danger` **plus** ikon panah dan tanda +/− (bukan warna saja) — WCAG 1.4.1.

### Tipografi

- **Satu keluarga:** Inter (sudah dimuat via `next/font`). Tidak menambah font ketiga tanpa alasan; dua keluarga yang berbeda akan membuat produk terasa terpecah dan menambah beban CLS.
- **Skala 1.25**, berbasis 4px, dinyatakan sebagai utilitas Tailwind (`text-xs`..`text-4xl`) yang sudah dipakai proyek.
- **Tabular numerals** wajib untuk semua angka uang dan kripto (`tabular-nums`), sudah jadi kebiasaan di repo.
- **Line length:** body ≤ 70ch (`max-w-prose` di area artikel).

### Spasi, radius, bayangan

- Basis 4px; komponen memakai `gap`/`space-y`, bukan margin manual.
- Radius bertingkat sesuai hierarki: kontrol kecil `rounded-lg` (8px), kartu `rounded-xl` (12px), panel besar `rounded-2xl` (16px). **Tidak** semua elemen `rounded-2xl`.
- Bayangan: `shadow-card` (kartu diam), `shadow-raised` (elemen yang bisa ditekan), `shadow-panel` (panel CTA gelap). Tidak ada bayangan generik seragam di semua elemen.

### Gerak

- Durasi 150–250 ms, `ease-out` untuk masuk, `ease-in` untuk keluar.
- Hanya dua jenis gerak yang diizinkan: (a) respons terhadap aksi pengguna (dialog terbuka, struk muncul, angka berganti status), (b) satu reveal halaman saat pertama kali dimuat.
- Semua gerak dibungkus `motion-safe:` sehingga otomatis mati di `prefers-reduced-motion: reduce`.

---

## 3. Konsep layout

Arah: **"struk dan mesin"** — halaman terasa seperti dokumen transaksi yang tertata dan mudah diaudit, bukan seperti dashboard SaaS.

```
LANDING (desktop)                          APP (mobile-first)
┌──────────────────────────────────┐       ┌──────────────────┐
│ Navbar ringkas, 1 tombol utama   │       │ banner simulasi  │
├──────────────────┬───────────────┤       ├──────────────────┤
│ H1 + 2 CTA       │ mockup ponsel │       │ saldo + 6 aksi   │
│ (kiri, rata kiri)│ statis        │       │ dalam grid 2 x 3 │
├──────────────────┴───────────────┤       ├──────────────────┤
│ "Kenapa Cupay" 3 kolom tak sama  │       │ aset populer     │
│ lebar (1.2 / 1 / 0.8)            │       ├──────────────────┤
├──────────────────────────────────┤       │ struk terakhir   │
│ Cara kerja: garis waktu vertikal │       │ (baris monospace)│
│ bernomor — isinya benar berurut  │       ├──────────────────┤
├──────────────────────────────────┤       │ bottom nav 5 tab │
│ Harga contoh (baris tabel-like)  │       └──────────────────┘
├──────────────────────────────────┤
│ Biaya: tabel dua kolom           │
│ Akademi: daftar kartu 2x2        │
│ FAQ: <details> akordeon          │
│ CTA gelap (panel --ink)          │
│ Footer 5 kolom                   │
└──────────────────────────────────┘
```

**Alignment:** landing rata kiri untuk teks (bukan rata tengah kecuali satu headline di panel CTA akhir); app shell rata tengah dengan `max-w-md`.

**Dihindari secara sadar:** grid tiga kartu identik dengan bayangan seragam di setiap section, eyebrow ALL-CAPS di atas semua heading, label "01/02/03" di tempat yang bukan urutan.

---

## 4. Prinsip

1. **Satu hal yang diingat:** struk. Setiap transaksi berakhir dengan struk monospace yang bisa disalin/dibagikan. Tata letak lain dibuat tenang supaya struk menonjol.
2. **Kejujuran terlihat:** banner simulasi selalu ada di app shell; setiap angka contoh diberi label. Disclaimer adalah bagian desain, bukan tempelan.
3. **Satu primari per layar.** Pilih satu aksi yang jelas menonjol per layar (Hick's Law); aksi lain sekunder/outline.
4. **Status tidak pernah diam.** Setiap transaksi punya status yang tampil (Diproses → Berhasil), setiap pemuatan punya skeleton yang menyerupai hasil akhir.
5. **Aksesibilitas sebagai lantai, bukan fitur.** Fokus terlihat, target sentuh ≥44px, kontras teks ≥4.5:1, angka + ikon untuk makna pasar.
6. **Kelompokkan, jangan ratakan.** Kelompokkan input menjadi 3–5 langkah per layar (Miller's Law) — dasar wizard.

---

## 5. Peta halaman & pola

| Route | Pekerjaan halaman | Pola utama |
| --- | --- | --- |
| `/` | Meyakinkan + mengedukasi | Navbar sticky, hero 2 kolom, garis waktu, tabel biaya, akordeon FAQ, panel CTA |
| `/dashboard` | Satu keputusan: jenis transaksi | Saldo + grid aksi 2×3 + aset populer |
| `/pasar`, `/pasar/[symbol]` | Menemukan aset | Daftar tabel-like, filter tab, sparkline SVG + tabel data |
| `/dompet` | Melihat saldo & aset | Kartu saldo + daftar aset + aksi Kirim/Terima |
| `/portofolio` | Memahami kinerja | Ringkasan angka + alokasi (bar bertumpuk, bukan donat 3D) + P/L berikon |
| `/riwayat` | Mengaudit transaksi | Kelompok per tanggal, filter, detail stepper, ekspor CSV |
| `/akun/*` | Menyesuaikan & keamanan | Kartu pengaturan, switch, brankas bertahap |
| `/akademi` | Belajar | Kartu pelajaran → `/akademi/[slug]` |

---

## 6. Wizard transaksi (pola terpenting)

Setiap jenis (Beli, Jual, Tukar, Kirim, Setor, Tarik) memakai **Shell yang sama**:

```
Header: judul langkah + indikator progres (garis, bukan nomor besar)
Isi:    satu tugas per layar
Footer: [Kembali]  [Aksi utama — label = apa yang terjadi]
```

- Label tombol akhir menyebut hasilnya ("Beli BTC", "Kirim ETH"), bukan "Konfirmasi" generik.
- Tinjauan sebelum PIN berupa **struk pratinjau** (monospace) dengan harga dikunci + hitung mundur 15 detik, supaya ketidakpastian harga terlihat, bukan disembunyikan.
- Setelah PIN: status bertahap (Memproses → Struk). Angka struk muncul dengan satu animasi kecil saja.

---

## 7. Review rencana terhadap brief (pass 1 → revisi)

| Terlihat generik | Revisi |
| --- | --- |
| Grid 3 kartu identik untuk "Kenapa Cupay" | Kolom tak sama lebar (1.2/1/0.8) dan salah satu kartu memuat contoh struk mini — sesuai subjek |
| Donat alokasi portofolio (default dashboard crypto) | Bar bertumpuk horizontal dengan legenda berlabel nilai; mengurangi beban membaca, lebih mudah diakses pembaca layar lewat tabel tersembunyi |
| Eyebrow label di atas semua heading | Hanya di panel CTA akhir, satu kali |
| Animasi reveal di setiap section | Satu reveal per halaman pada bagian hero; sisanya hanya respons aksi |
| Tombol seragam dengan bayangan sama | Tiga tingkat radius/bayangan sesuai hierarki (control/card/panel) |

---

## 8. Definition of Done desain (dijalankan sebelum menutup Fase 6)

- [ ] Setiap elemen interaktif punya fokus terlihat dan bisa dipakai keyboard saja
- [ ] Kontras teks ≥4.5:1 (≥3:1 untuk teks besar dan batas komponen)
- [ ] Tanpa scroll horizontal di 320px dan pada zoom 400%
- [ ] Tema terang dan gelap sama-sama disengaja; gerak mengikuti `prefers-reduced-motion`
- [ ] Ada state loading, kosong, dan error untuk setiap daftar/pemuatan
- [ ] Tidak ada hex/px baru yang menduplikasi token yang sudah ada
- [ ] Setiap pilihan visual bisa dijelaskan dengan alasan
- [ ] Dilihat langsung di browser, bukan hanya dibaca dari source
