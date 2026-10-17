import { cn } from "@/components/ui/cn";

export function SimulationBanner({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-200",
        className
      )}
    >
      Simulasi edukasi: tidak ada uang sungguhan, transaksi nyata, atau akun yang
      dibuat.
    </p>
  );
}