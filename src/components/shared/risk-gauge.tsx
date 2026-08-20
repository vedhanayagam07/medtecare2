"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RiskGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
  animate?: boolean;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "#DC2626"; // Critical Red
  if (score >= 60) return "#EA580C"; // High Orange
  if (score >= 30) return "#D97706"; // Moderate Amber
  return "#16A34A"; // Low Green
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "CRITICAL RISK";
  if (score >= 60) return "HIGH RISK";
  if (score >= 30) return "MODERATE RISK";
  return "LOW RISK";
}

export function RiskGauge({
  score,
  size = 140,
  strokeWidth = 8,
  className,
  showLabel = true,
  animate = true,
}: RiskGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={animate ? { strokeDashoffset: circumference } : { strokeDashoffset: circumference - progress }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span
          className="text-2xl font-black font-mono tracking-tight"
          style={{ color }}
          initial={animate ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {score} <span className="text-xs font-normal text-[var(--text-tertiary)]">/ 100</span>
        </motion.span>
        {showLabel && (
          <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[var(--text-secondary)] mt-0.5">
            {getScoreLabel(score)}
          </span>
        )}
      </div>
    </div>
  );
}

interface ConfidenceRingProps {
  percent: number;
  size?: number;
  className?: string;
}

export function ConfidenceRing({ percent, size = 36, className }: ConfidenceRingProps) {
  const sw = 3;
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const p = (percent / 100) * c;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={sw} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#2563EB"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - p }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute text-[0.6rem] font-bold font-mono text-sky-400">
        {percent}%
      </span>
    </div>
  );
}
