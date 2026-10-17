import { BottomNav } from "@/components/bottom-nav";
import { SimulationBanner } from "@/components/simulation-banner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
          <SimulationBanner className="px-4 py-2 text-center" />
      <main className="flex-1 pb-20">{children}</main>
      <BottomNav />
    </>
  );
}
