"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  const [easyMode, setEasyMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("easyMode");
    if (saved === "true") {
      setEasyMode(true);
      document.documentElement.style.fontSize = "18px";
    }
  }, []);

  const toggleEasyMode = (checked: boolean) => {
    setEasyMode(checked);
    if (checked) {
      document.documentElement.style.fontSize = "18px";
      localStorage.setItem("easyMode", "true");
    } else {
      document.documentElement.style.fontSize = "";
      localStorage.removeItem("easyMode");
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
            <Label htmlFor="easy-mode" className="text-lg">
              Mode Mudah
            </Label>
            <Switch
              id="easy-mode"
              checked={easyMode}
              onCheckedChange={toggleEasyMode}
              aria-label="Aktifkan Mode Mudah"
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