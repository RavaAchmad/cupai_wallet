"use client";

import { motion } from "framer-motion";

import { cn } from "@/components/ui/cn";

const steps = [
  {
    title: "Buat Akun",
    description: "Daftar dengan email dan verifikasi ID. Proses hanya butuh 2 menit.",
    icon: "👤",
  },
  {
    title: "Setor Rupiah",
    description: "Masukkan uang tunai ke ATM KoinATM. Saldo akan segera terupdate.",
    icon: "💰",
  },
  {
    title: "Beli Kripto",
    description: "Pilih aset dan jumlah. Koin akan segera dikirim ke dompet Anda.",
    icon: "₿",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Cara Kerja</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Langkah demi langkah, seperti menggunakan ATM tunai
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "rounded-xl border border-border/30 p-6 sm:p-8 bg-card/50 hover:bg-card/80 transition-colors"
              )}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                {step.icon}
              </div>
              <h3 className="text-xl font-medium mt-4">{step.title}</h3>
              <p className="text-muted-foreground text-sm mt-2">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}