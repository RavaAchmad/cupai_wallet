import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AkunPage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="text-2xl font-bold">Akun</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4 text-muted-foreground">Fitur auth placeholder.</p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/akun/pengaturan">Pengaturan</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/akun/brankas">Brankas</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
