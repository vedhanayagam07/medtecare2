"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";

const riskData = [
  { name: "Low Risk", range: "0–29", count: 1180, percent: 94.4, color: "#10b981" },
  { name: "Moderate", range: "30–59", count: 56, percent: 4.5, color: "#f59e0b" },
  { name: "High Risk", range: "60–79", count: 11, percent: 0.9, color: "#f97316" },
  { name: "Critical", range: "80–100", count: 3, percent: 0.2, color: "#ef4444" },
];

const TOTAL = riskData.reduce((acc, d) => acc + d.count, 0);

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: (typeof riskData)[0] }>;
}) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-white px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-[var(--text-primary)]">{d.name}</p>
      <p className="text-[var(--text-secondary)] font-mono">
        {d.count.toLocaleString()} devices ({d.percent}%)
      </p>
    </div>
  );
}

export function RiskDonut() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.3 }}
      className="card-elevated p-5 h-full"
    >
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-4">
        <div>
          <h3 className="text-[0.8rem] font-semibold text-[var(--text-primary)]">
            Risk Distribution
          </h3>
          <p className="text-[0.68rem] text-[var(--text-tertiary)] mt-0.5">ML model categorization</p>
        </div>
        <span className="text-[0.6rem] font-mono text-[var(--text-tertiary)] bg-[var(--surface-2)] px-2 py-0.5 rounded-md border border-[var(--border-default)]">
          CatBoost v3
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-[190px] h-[190px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={84}
                paddingAngle={3}
                dataKey="count"
                strokeWidth={0}
                isAnimationActive={true}
                animationBegin={200}
                animationDuration={1000}
              >
                {riskData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold font-mono text-[var(--text-primary)]">
              {TOTAL.toLocaleString()}
            </span>
            <span className="text-[0.6rem] text-[var(--text-tertiary)] uppercase tracking-wider">
              Devices
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-2 mt-4 w-full max-w-[260px]">
          {riskData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ background: item.color }}
              />
              <span className="text-[0.7rem] text-[var(--text-secondary)]">{item.name}</span>
              <span className="text-[0.6rem] font-mono text-[var(--text-tertiary)] ml-auto">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[0.6rem] text-[var(--text-tertiary)] mt-4 pt-3 border-t border-[var(--border-subtle)] text-center">
        Derived from CatBoost ML model probability scores
      </p>
    </motion.div>
  );
}
