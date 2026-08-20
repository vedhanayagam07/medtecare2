"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { RiskDataPoint } from "@/lib/mock-data";

const timeRanges = ["All", "Q1–Q2", "Q3–Q4"] as const;

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-white px-3 py-2.5 shadow-lg text-xs">
      <p className="mb-1.5 text-[0.65rem] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 py-0.5">
          <div className="h-2 w-2 rounded-full shrink-0" style={{ background: entry.color }} />
          <span className="text-[var(--text-secondary)] capitalize">{entry.dataKey}:</span>
          <span className="font-bold text-[var(--text-primary)] font-mono">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export function RiskTrendChart({ data }: { data: RiskDataPoint[] }) {
  const [activeRange, setActiveRange] = useState<(typeof timeRanges)[number]>("All");

  const filteredData = (() => {
    if (activeRange === "Q1–Q2") return data.slice(0, 3);
    if (activeRange === "Q3–Q4") return data.slice(2);
    return data;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.35 }}
      className="card-elevated p-5 h-full"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-[0.8rem] font-semibold text-[var(--text-primary)]">
            Risk Progression
          </h3>
          <p className="text-[0.68rem] text-[var(--text-tertiary)] mt-0.5">
            Historical vs model prediction
          </p>
        </div>
        <div className="flex items-center gap-0.5 bg-[var(--surface-2)] border border-[var(--border-default)] rounded-lg p-0.5">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={cn(
                "px-2.5 py-1 text-[0.65rem] font-medium rounded-md transition-all duration-200",
                activeRange === range
                  ? "bg-white text-[var(--text-primary)] shadow-sm"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-[0.65rem] text-[var(--text-tertiary)]">Historical</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-[0.65rem] text-[var(--text-tertiary)]">Model Predicted</span>
        </div>
      </div>

      <div className="h-[210px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="riskActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="riskPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#86868b", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "#86868b", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#riskActual)"
              dot={{ r: 3, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 5, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#riskPredicted)"
              dot={{ r: 3, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 5, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
