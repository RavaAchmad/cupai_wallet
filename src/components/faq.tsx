const items = [
  {
    question: "Apakah ini simulasi atau uang sungguhan?",
    answer:
      "Simulasi di dashboard KoinATM menggunakan data contoh. Tidak ada uang sungguhan, transaksi nyata, atau akun yang dibuat. Gunakan untuk belajar.",
  },
  {
    question: "Di mana data simulasi disimpan?",
    answer:
      "Data simulasi berasal dari endpoint API lokal yang dikembangkan khusus untuk demonstrasi. Saldo, harga, dan transaksi adalah nilai contoh.",
  },
  {
    question: "Apakah perlu daftar akun?",
    answer:
      "Tidak. Simulasi ATM bisa diakses langsung dari dashboard tanpa registrasi.",
  },
  {
    question: "Apa itu Mode Lansia?",
    answer:
      "Mode Lansia memperbesar semua teks di aplikasi menjadi 18px agar lebih mudah dibaca. Dapat diaktifkan di halaman Pengaturan.",
  },
  {
    question: "Apa yang terjadi pada data saya?",
    answer:
      "Simulasi tidak menyimpan data pribadi. Tidak ada kredensial, riwayat transaksi, atau riwayat perambatan yang dikumpulkan.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28 border-t border-border/30">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Pertanyaan yang Sering Muncul
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Jawaban untuk pertanyaan umum tentang simulasi KoinATM.
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={item.question}
              className="group rounded-xl border border-input bg-card shadow-sm open:shadow-raised"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-lg font-bold"
                aria-label={item.question}
              >
                <span>{item.question}</span>
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors group-open:bg-primary group-open:text-primary-foreground"
                  aria-hidden="true"
                >
                  <svg
                    className="h-4 w-4 transition-transform group-open:rotate-45"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="px-5 pb-5 text-base text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}