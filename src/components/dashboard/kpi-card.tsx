"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
  type LucideIcon,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import type { KPIData } from "@/lib/mock-data";

const kpiConfig: Record<string, { icon: LucideIcon; color: string; bg: string; sparkColor: string }> = {
  "Total Devices Assessed": {
    icon: Shield,
    color: "#0071e3",
    bg: "bg-blue-50",
    sparkColor: "#0071e3",
  },
  "High & Critical Risk Devices": {
    icon: AlertTriangle,
    color: "#e67e22",
    bg: "bg-orange-50",
    sparkColor: "#e67e22",
  },
  "Critical Reviews Required": {
    icon: Clock,
    color: "#e74c3c",
    bg: "bg-red-50",
    sparkColor: "#e74c3c",
  },
  "Pending Human Review": {
    icon: Users,
    color: "#8b5cf6",
    bg: "bg-violet-50",
    sparkColor: "#8b5cf6",
  },
};

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const steps = 45;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = 1 - Math.pow(1 - step / steps, 3);
      setDisplay(Math.round(value * progress));
      if (step >= steps) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [value]);

  return <>{display.toLocaleString()}</>;
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const chartData = data.map((v, i) => ({ v, i }));
  return (
    <div className="h-[36px] w-[72px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`sp-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#sp-${color.replace("#", "")})`}
            dot={false}
            isAnimationActive={true}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function KPICard({ data, index = 0 }: { data: KPIData; index?: number }) {
  const config = kpiConfig[data.label] || kpiConfig["Total Devices Assessed"];
  const Icon = config.icon;
  const isNeutral = data.change === 0;
  const isPositive = data.change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="card-elevated p-4 group">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg", config.bg)}>
                <Icon className="h-3.5 w-3.5" style={{ color: config.color }} />
              </div>
              <p className="text-[0.68rem] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                {data.label}
              </p>
            </div>

            <p className="text-[1.6rem] font-bold tracking-tight text-[var(--text-primary)] font-mono leading-none">
              {data.prefix}
              <AnimatedCounter value={data.value} />
              {data.suffix}
            </p>

            <div className="flex items-center gap-1.5">
              {isNeutral ? (
                <Minus className="h-3 w-3 text-[var(--text-tertiary)]" />
              ) : isPositive ? (
                <TrendingUp className="h-3 w-3 text-amber-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-emerald-500" />
              )}
              <span className={cn(
                "text-[0.68rem] font-medium",
                isNeutral ? "text-[var(--text-tertiary)]" : isPositive ? "text-amber-600" : "text-emerald-600"
              )}>
                {isPositive ? "+" : ""}
                {data.change !== 0 ? `${data.change}% ` : ""}
                {data.changeLabel}
              </span>
            </div>
          </div>

          <Sparkline data={data.sparkline} color={config.sparkColor} />
        </div>
      </div>
    </motion.div>
  );
}
