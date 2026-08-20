"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Clock } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { StatusBadge } from "@/components/shared/status-badge";
import type { Alert } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/mock-data";

interface AlertsFeedProps {
  alerts: Alert[];
  maxItems?: number;
}

export function AlertsFeed({ alerts, maxItems = 6 }: AlertsFeedProps) {
  const sorted = [...alerts]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, maxItems);

  return (
    <GlassCard hover={false} padding="md">
      <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Recent Risk Alerts
          </h3>
        </div>
        <span className="text-[0.65rem] font-mono text-[var(--text-tertiary)]">
          {alerts.filter((a) => a.status === "open").length} Open
        </span>
      </div>

      <div className="space-y-2 text-left">
        {sorted.map((alert, i) => (
          <div
            key={alert.id}
            className="flex items-start gap-3 rounded p-2.5 bg-slate-900/60 border border-slate-800/80"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-700 truncate font-sans">
                  {alert.equipmentName}
                </span>
                <StatusBadge variant={alert.severity}>
                  {alert.severity}
                </StatusBadge>
              </div>
              <p className="text-[0.68rem] text-[var(--text-tertiary)] font-sans">
                {alert.riskDriver}
              </p>
              <div className="mt-1 flex items-center gap-3 text-[0.6rem] font-mono text-[var(--text-tertiary)]">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatRelativeTime(alert.timestamp)}
                </span>
                {alert.assignedTo && (
                  <span className="text-blue-600 font-sans">
                    Assigned: {alert.assignedTo}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
