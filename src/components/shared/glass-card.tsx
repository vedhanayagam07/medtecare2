"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  hover?: boolean;
  glow?: "blue" | "healthy" | "warning" | "critical" | "none";
  className?: string;
  padding?: "sm" | "md" | "lg" | "none";
}

export function GlassCard({
  children,
  hover = true,
  glow = "none",
  className,
  padding = "md",
  ...props
}: GlassCardProps) {
  const paddingClasses = {
    sm: "p-3",
    md: "p-4.5",
    lg: "p-6",
    none: "",
  };

  return (
    <motion.div
      className={cn(
        "panel-card text-left",
        hover && "panel-card-hover",
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
