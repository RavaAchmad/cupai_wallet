import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Brankas() {
  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <h1 className="mb-6 text-2xl font-bold">Brankas</h1>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-lg">Cara Menulis Seed Phrase di Kertas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-lg">
            <li>Siapkan kertas dan pena yang tidak mudah pudar.</li>
            <li>Tulis 12 atau 24 kata seed phrase secara berurutan.</li>
            <li>Jangan simpan foto atau screenshot di HP.</li>
            <li>Simpan di tempat aman, jauh dari air dan api.</li>
            <li>Jangan beri tahu siapa pun tentang seed phrase Anda.</li>
          </ol>
          <div className="pt-4">
            <Button className="w-full py-3 text-lg font-semibold active:scale-95">
              Saya Mengerti
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}