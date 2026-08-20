"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/shared/status-badge";
import { equipmentList as mockEquipmentList, demoPrimaryDevice } from "@/lib/mock-data";
import type { Equipment } from "@/lib/mock-data";

export default function DevicesPage() {
  const [selectedDevice, setSelectedDevice] = useState<Equipment>(demoPrimaryDevice);

  return (
    <AppShell>
      <div className="space-y-6 text-left">
        <div className="border-b border-[var(--border-default)] pb-4">
          <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            Medical Device Inventory & Enterprise Asset Profile
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Enterprise clinical device records, risk classifications, and historical safety metrics.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* List */}
          <div className="lg:col-span-5 p-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Monitored Devices ({mockEquipmentList.length})
              </h3>
              <span className="text-[0.65rem] font-mono text-[var(--text-tertiary)]">Select to View Record</span>
            </div>

            <div className="space-y-2">
              {mockEquipmentList.map((dev) => (
                <div
                  key={dev.id}
                  onClick={() => setSelectedDevice(dev)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedDevice.id === dev.id
                      ? "border-blue-500/80 bg-[var(--surface-2)]"
                      : "border-[var(--border-default)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-600 block">{dev.id}</span>
                      <h4 className="text-xs font-bold text-[var(--text-primary)]">{dev.name}</h4>
                    </div>
                    <StatusBadge variant={dev.status}>{dev.status}</StatusBadge>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[0.65rem] text-[var(--text-tertiary)] font-mono border-t border-[var(--border-subtle)] pt-2">
                    <span>{dev.manufacturer || "B. Braun Melsungen AG"}</span>
                    <span>Risk: {dev.riskScore} / 100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-7 p-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] space-y-5">
            <div className="flex items-start justify-between border-b border-[var(--border-default)] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)]">
                  <span className="text-blue-600 font-bold">{selectedDevice.id}</span>
                  <span>•</span>
                  <span>{selectedDevice.classification || "Active Infusion Equipment"}</span>
                </div>
                <h2 className="text-lg font-bold text-[var(--text-primary)] mt-1">{selectedDevice.name}</h2>
                <p className="text-xs text-[var(--text-tertiary)]">{selectedDevice.location}</p>
              </div>

              <div className="text-right">
                <StatusBadge variant={selectedDevice.status} size="md">
                  {selectedDevice.status} Priority
                </StatusBadge>
                <p className="text-[0.65rem] font-mono text-[var(--text-tertiary)] mt-1">
                  Risk Score: <strong className="text-[var(--text-primary)]">{selectedDevice.riskScore} / 100</strong>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                1. Enterprise Asset Profile
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs bg-[var(--surface-2)] p-3.5 rounded-lg border border-[var(--border-default)] font-mono">
                <div>
                  <span className="text-[0.6rem] text-slate-500 block">DEVICE ID</span>
                  <span className="font-bold text-slate-700">{selectedDevice.id}</span>
                </div>
                <div>
                  <span className="text-[0.6rem] text-slate-500 block">CLASSIFICATION</span>
                  <span className="font-bold text-slate-700">{selectedDevice.classification || "Active Infusion Equipment"}</span>
                </div>
                <div>
                  <span className="text-[0.6rem] text-slate-500 block">RISK CLASS</span>
                  <span className="font-bold text-slate-700">{selectedDevice.riskClass || "Class IIb"}</span>
                </div>
                <div>
                  <span className="text-[0.6rem] text-slate-500 block">MANUFACTURER</span>
                  <span className="font-bold text-slate-700">{selectedDevice.manufacturer || "B. Braun Melsungen AG"}</span>
                </div>
                <div>
                  <span className="text-[0.6rem] text-slate-500 block">COUNTRY OF ORIGIN</span>
                  <span className="font-bold text-slate-700">{selectedDevice.country || "Germany"}</span>
                </div>
                <div>
                  <span className="text-[0.6rem] text-slate-500 block">YEARS IN SERVICE</span>
                  <span className="font-bold text-slate-700">{selectedDevice.yearsInService || 4.5} years</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                2. Historical Safety Metrics
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)]">
                  <span className="text-[0.65rem] font-bold uppercase text-[var(--text-tertiary)] block">Previous Recalls</span>
                  <span className="text-lg font-bold font-mono text-rose-400">{selectedDevice.previousRecalls ?? 1}</span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)]">
                  <span className="text-[0.65rem] font-bold uppercase text-[var(--text-tertiary)] block">Safety Notices</span>
                  <span className="text-lg font-bold font-mono text-amber-400">{selectedDevice.previousSafetyNotices ?? 2}</span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)]">
                  <span className="text-[0.65rem] font-bold uppercase text-[var(--text-tertiary)] block">Adverse Events</span>
                  <span className="text-lg font-bold font-mono text-orange-400">{selectedDevice.previousEvents ?? 3}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
