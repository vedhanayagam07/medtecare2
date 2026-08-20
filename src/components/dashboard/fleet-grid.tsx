"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Activity } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { ConfidenceRing } from "@/components/shared/risk-gauge";
import type { Equipment } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/mock-data";

interface EquipmentCardProps {
  equipment: Equipment;
  index?: number;
}

export function EquipmentCard({ equipment, index = 0 }: EquipmentCardProps) {
  const isCritical = equipment.status === "critical";
  const isHigh = equipment.status === "high";
  const isModerate = equipment.status === "moderate";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <GlassCard className="relative overflow-hidden pl-5">
        {/* Left accent bar */}
        <div
          className="absolute top-0 left-0 h-full w-1 rounded-l-xl"
          style={{
            background: isCritical
              ? "#DC2626"
              : isHigh
              ? "#EA580C"
              : isModerate
              ? "#D97706"
              : "#16A34A",
          }}
        />

        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1 space-y-1.5 text-left">
            <div className="flex items-center gap-2">
              <h4 className="truncate text-xs font-bold text-slate-100 font-mono">
                {equipment.id}
              </h4>
              <StatusBadge variant={equipment.status} pulse={isCritical}>
                {equipment.status}
              </StatusBadge>
            </div>

            <h5 className="text-xs font-semibold text-slate-700">{equipment.name}</h5>

            <p className="text-[0.65rem] font-medium text-[var(--text-tertiary)]">
              {equipment.manufacturer} • Class: {equipment.riskClass || "Class IIb"}
            </p>

            <div className="flex items-center gap-3 text-[0.65rem] text-[var(--text-tertiary)]">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-slate-500" />
                {equipment.location}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 ml-3 shrink-0">
            <ConfidenceRing percent={equipment.confidencePercent} />
            <span className="text-[0.55rem] font-mono text-[var(--text-tertiary)]">Confidence</span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

interface FleetGridProps {
  equipment: Equipment[];
}

export function FleetGrid({ equipment }: FleetGridProps) {
  return (
    <GlassCard hover={false} padding="lg">
      <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Medical Asset Risk Inventory</h3>
          <p className="text-xs text-[var(--text-tertiary)]">
            {equipment.length} dataset records evaluated for future-event probability
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono">
          {(["critical", "high", "moderate", "low"] as const).map((status) => (
            <div key={status} className="flex items-center gap-1.5">
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  background:
                    status === "critical"
                      ? "#DC2626"
                      : status === "high"
                      ? "#EA580C"
                      : status === "moderate"
                      ? "#D97706"
                      : "#16A34A",
                }}
              />
              <span className="text-[0.65rem] capitalize text-[var(--text-tertiary)] font-medium">{status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {equipment.map((eq, i) => (
          <EquipmentCard key={eq.id} equipment={eq} index={i} />
        ))}
      </div>
    </GlassCard>
  );
}

