"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/components/ui/cn";

const mockPrices = [
  { symbol: "BTC", price: "Rp 600.000.000", change: "+2.5%" },
  { symbol: "ETH", price: "Rp 40.000.000", change: "-1.2%" },
  { symbol: "SOL", price: "Rp 1.500.000", change: "+5.0%" },
  { symbol: "BNB", price: "Rp 2.800.000", change: "+1.8%" },
  { symbol: "XRP", price: "Rp 3.200", change: "-0.5%" },
  { symbol: "ADA", price: "Rp 2.800", change: "+3.1%" },
  { symbol: "AVAX", price: "Rp 5.200.000", change: "+4.2%" },
  { symbol: "DOT", price: "Rp 8.500", change: "-2.1%" },
];

export function MarketTicker() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate items for seamless loop
  const items = [...mockPrices, ...mockPrices];

  return (
    <section className="py-8 bg-background/50 border-y border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex items-center gap-8 py-3"
            animate={isHovered ? { x: 0 } : { x: "-100%" }}
            transition={{
              duration: isHovered ? 0.5 : 25,
              ease: "linear",
              repeat: isHovered ? 0 : Infinity,
            }}
          >
            {items.map((item, i) => (
              <motion.div
                key={`${item.symbol}-${i}`}
                className="flex items-center gap-3 whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="text-sm font-medium text-primary">{item.symbol}</span>
                <span className="text-sm text-muted-foreground">{item.price}</span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    item.change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {item.change}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}