"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type RiskLevel = "low" | "moderate" | "high" | "critical" | "healthy" | "warning" | "medium";

interface StatusBadgeProps {
  variant: RiskLevel | string;
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
  size?: "sm" | "md";
}

const variantClasses: Record<string, string> = {
  low: "bg-emerald-950/80 text-emerald-400 border-emerald-800/60",
  healthy: "bg-emerald-950/80 text-emerald-400 border-emerald-800/60",
  moderate: "bg-amber-950/80 text-amber-400 border-amber-800/60",
  warning: "bg-amber-950/80 text-amber-400 border-amber-800/60",
  medium: "bg-sky-950/80 text-sky-400 border-sky-800/60",
  high: "bg-orange-950/80 text-orange-400 border-orange-800/60",
  critical: "bg-rose-950/80 text-rose-400 border-rose-800/60",
};

export function StatusBadge({
  variant,
  children,
  className,
  pulse = false,
  size = "sm",
}: StatusBadgeProps) {
  const normalizedVariant = String(variant).toLowerCase();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded border font-mono font-semibold uppercase tracking-wider",
        size === "sm" ? "px-2 py-0.5 text-[0.65rem]" : "px-2.5 py-1 text-xs",
        variantClasses[normalizedVariant] || variantClasses.low,
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
