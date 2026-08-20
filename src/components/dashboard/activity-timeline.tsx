"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  Scan,
  UserCheck,
  Bell,
  CheckCircle,
  Clock,
  type LucideIcon,
} from "lucide-react";

interface ActivityEvent {
  id: string;
  type: string;
  message: string;
  detail: string;
  timestamp: string;
  color: string;
  bgColor: string;
  icon: LucideIcon;
}

const activityEvents: ActivityEvent[] = [
  {
    id: "act-1",
    type: "alert",
    message: "Critical risk alert triggered",
    detail: "DEV-88401 — Smart Infusion Pump exceeded threshold (87/100)",
    timestamp: "2 min ago",
    color: "#ef4444",
    bgColor: "bg-red-50",
    icon: ShieldAlert,
  },
  {
    id: "act-2",
    type: "scan",
    message: "Batch device scan completed",
    detail: "1,250 devices processed through CatBoost risk model",
    timestamp: "18 min ago",
    color: "#3b82f6",
    bgColor: "bg-blue-50",
    icon: Scan,
  },
  {
    id: "act-3",
    type: "review",
    message: "Human review assigned",
    detail: "DEV-88401 sent to Lead Biomedical Engineering Unit",
    timestamp: "25 min ago",
    color: "#8b5cf6",
    bgColor: "bg-violet-50",
    icon: UserCheck,
  },
  {
    id: "act-4",
    type: "resolved",
    message: "Assessment resolved",
    detail: "DEV-49201 — Fresenius 6008 Dialysis Machine cleared",
    timestamp: "1h ago",
    color: "#10b981",
    bgColor: "bg-emerald-50",
    icon: CheckCircle,
  },
  {
    id: "act-5",
    type: "notification",
    message: "Weekly risk report generated",
    detail: "Summary exported for compliance review board",
    timestamp: "3h ago",
    color: "#f59e0b",
    bgColor: "bg-amber-50",
    icon: Bell,
  },
];

export function ActivityTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.6 }}
      className="card-elevated p-5"
    >
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
          <h3 className="text-[0.8rem] font-semibold text-[var(--text-primary)]">
            Recent Activity
          </h3>
        </div>
        <span className="text-[0.6rem] font-mono text-[var(--text-tertiary)] bg-[var(--surface-2)] px-2 py-0.5 rounded-md border border-[var(--border-default)]">
          Live
        </span>
      </div>

      <div className="space-y-0">
        {activityEvents.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 + idx * 0.05 }}
            className="relative flex gap-3 py-3"
          >
            {idx < activityEvents.length - 1 && (
              <div className="absolute left-[13px] top-[38px] bottom-0 w-px bg-[var(--border-default)]" />
            )}

            <div
              className={`flex h-[26px] w-[26px] items-center justify-center rounded-lg shrink-0 relative z-10 ${event.bgColor}`}
            >
              <event.icon className="h-3.5 w-3.5" style={{ color: event.color }} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[0.75rem] font-medium text-[var(--text-primary)] truncate">
                  {event.message}
                </p>
                <span className="text-[0.6rem] font-mono text-[var(--text-tertiary)] shrink-0">
                  {event.timestamp}
                </span>
              </div>
              <p className="text-[0.65rem] text-[var(--text-tertiary)] mt-0.5 truncate">
                {event.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
