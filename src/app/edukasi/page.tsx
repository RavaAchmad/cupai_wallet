import { Card, CardContent } from "@/components/ui/card";

const articles = [
  {
    title: "Kripto untuk Pemula",
    excerpt:
      "Artikel ini menjelaskan dasar-dasar kripto, mulai dari apa itu blockchain, cara transaksi kerja, hingga bagaimana menyimpan aset dengan aman.",
    thumbnail:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800",
    minutes: 3,
  },
  {
    title: "Cara Mengamankan Aset",
    excerpt:
      "Panduan langkah demi langkah untuk mengamankan aset kripto Anda, termasuk penggunaan hardware wallet, seed phrase, dan kebiasaan keamanan yang baik.",
    thumbnail:
      "https://images.unsplash.com/photo-1614064641938-3bbee3920175?w=800",
    minutes: 4,
  },
  {
    title: "Mengenal Ethereum",
    excerpt:
      "Ethereum bukan sekadar koin. Pelajari bagaimana jaringan ini menjalankan aplikasi dan kontrak pintar di atas blockchain.",
    thumbnail:
      "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800",
    minutes: 5,
  },
  {
    title: "Memahami Naik Turun Harga",
    excerpt:
      "Kenapa harga kripto bisa bergerak tajam dalam sehari? Pelajari cara membaca perubahan 24 jam tanpa panik.",
    thumbnail:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
    minutes: 4,
  },
  {
    title: "Menjaga Diri dari Penipuan",
    excerpt:
      "Modus penipuan kripto makin rapi. Kenali ciri-cirinya sebelum Anda mengirim dana ke siapa pun.",
    thumbnail:
      "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800",
    minutes: 3,
  },
];

export default function Edukasi() {
  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <h1 className="mb-6 text-2xl font-bold">Edukasi Kripto</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.title} className="h-full overflow-hidden">
            <div className="aspect-video overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.thumbnail}
                alt={article.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="space-y-2 pt-5">
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-lg text-muted-foreground">
                {article.excerpt}
              </p>
              <p className="pt-2 text-sm text-muted-foreground">
                {article.minutes} menit baca
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}