"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  const [lansiaMode, setLansiaMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lansiaMode");
    if (saved === "true") {
      setLansiaMode(true);
      document.documentElement.style.fontSize = "18px";
    }
  }, []);

  const toggleLansiaMode = (checked: boolean) => {
    setLansiaMode(checked);
    if (checked) {
      document.documentElement.style.fontSize = "18px";
      localStorage.setItem("lansiaMode", "true");
    } else {
      document.documentElement.style.fontSize = "";
      localStorage.removeItem("lansiaMode");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <h1 className="mb-6 text-2xl font-bold">Pengaturan</h1>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-lg">Mode Aksesibilitas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="lansia-mode" className="text-lg">
              Mode Lansia
            </Label>
            <Switch
              id="lansia-mode"
              checked={lansiaMode}
              onCheckedChange={toggleLansiaMode}
              aria-label="Aktifkan Mode Lansia"
            />
          </div>
          <p className="text-lg text-muted-foreground">
            Mode ini memperbesar semua teks di aplikasi menjadi 18px untuk memudahkan baca.
          </p>
          <Button className="w-full py-3 text-lg font-semibold active:scale-95">
            Simpan
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}