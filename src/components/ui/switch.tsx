"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./cn";

const switchVariants = cva("inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input");

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> &
    VariantProps<typeof switchVariants>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(switchVariants(), className)}
    {...props}
    ref={ref}
  />
));
Switch.displayName = SwitchPrimitive.Root.displayName;

const SwitchThumb = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Thumb>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Thumb
    className={cn(
      "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-md ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
SwitchThumb.displayName = SwitchPrimitive.Thumb.displayName;

export { Switch, SwitchThumb };