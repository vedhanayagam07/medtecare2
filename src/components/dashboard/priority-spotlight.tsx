"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { RiskGauge } from "@/components/shared/risk-gauge";
import { StatusBadge } from "@/components/shared/status-badge";
import type { Equipment } from "@/lib/mock-data";

export function PrioritySpotlight({ device }: { device: Equipment }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.45 }}
      className="card-glow-critical relative overflow-hidden p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-red-100 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50">
            <ShieldAlert className="h-4 w-4 text-red-500" />
          </div>
          <div>
            <h3 className="text-[0.8rem] font-semibold text-[var(--text-primary)]">
              Priority Risk Spotlight
            </h3>
            <p className="text-[0.6rem] text-[var(--text-tertiary)]">Highest-risk device requiring attention</p>
          </div>
        </div>
        <StatusBadge variant="critical" pulse>
          Human Review Required
        </StatusBadge>
      </div>

      {/* Content */}
      <div className="grid gap-5 sm:grid-cols-12 items-start">
        <div className="sm:col-span-3 flex flex-col items-center justify-center p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)]">
          <RiskGauge score={device.riskScore} size={120} />
          <p className="text-[0.6rem] text-[var(--text-tertiary)] mt-2.5 font-mono">
            CatBoost Prob: <span className="font-semibold text-[var(--text-secondary)]">0.87</span>
          </p>
        </div>

        <div className="sm:col-span-9 space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-[var(--blue-accent)]">{device.id}</span>
              <span className="text-[var(--text-tertiary)]">•</span>
              <span className="text-[0.7rem] text-[var(--text-tertiary)]">{device.manufacturer}</span>
            </div>
            <h4 className="text-[1.05rem] font-semibold text-[var(--text-primary)] leading-tight">
              {device.name}
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: "Classification", value: device.classification || "—" },
              { label: "Risk Class", value: device.riskClass || "—" },
              { label: "Prev. Recalls", value: String(device.previousRecalls ?? 0), highlight: (device.previousRecalls ?? 0) > 0 ? "text-red-500" : undefined },
              { label: "Safety Notices", value: String(device.previousSafetyNotices ?? 0), highlight: (device.previousSafetyNotices ?? 0) > 0 ? "text-amber-600" : undefined },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] px-3 py-2">
                <span className="text-[0.55rem] text-[var(--text-tertiary)] uppercase tracking-wider font-mono block mb-0.5">
                  {item.label}
                </span>
                <span className={`text-xs font-semibold font-mono ${item.highlight || "text-[var(--text-primary)]"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[0.75rem] text-[var(--text-secondary)] leading-relaxed">
            Primary Model Drivers:{" "}
            <strong className="text-[var(--text-primary)]">Previous Recalls (+0.42 SHAP)</strong>,{" "}
            <strong className="text-[var(--text-primary)]">Safety Notices (+0.28 SHAP)</strong>, and{" "}
            <strong className="text-[var(--text-primary)]">Service Age ({device.yearsInService} yrs)</strong>.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t border-red-100 flex items-center justify-between">
        <span className="text-[0.7rem] text-[var(--text-tertiary)]">
          Assigned: Lead Biomedical Engineering Unit
        </span>
        <Link href="/risk-assessment" className="btn-primary inline-flex items-center gap-1.5">
          Inspect Assessment
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
