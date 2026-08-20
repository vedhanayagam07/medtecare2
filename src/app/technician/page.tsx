"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Camera,
  Clock,
  CheckCircle2,
  ScanLine,
  History,
  UserCircle,
  Wrench,
  AlertCircle,
  Activity,
} from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  techniciansList,
  formatRelativeTime,
} from "@/lib/mock-data";
import type { MaintenanceTicket } from "@/lib/mock-data";
import { fetchTickets, updateTicketStatus } from "@/lib/api";

const currentTechnician = techniciansList[0]; // Marcus Chen

type MobileTab = "tasks" | "scan" | "history" | "profile";

function EquipmentDiagnosticGraphic({ title }: { title: string }) {
  return (
    <div className="relative mb-3 flex h-28 flex-col justify-between rounded-lg border border-white/[0.08] bg-slate-950 p-3 overflow-hidden">
      {/* Background telemetry grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:12px_12px] opacity-10" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[0.65rem] font-mono text-sky-400">
          <Activity className="h-3 w-3 animate-pulse text-sky-400" />
          <span>LIVE SENSOR DIAGNOSTIC</span>
        </div>
        <span className="text-[0.6rem] font-mono text-slate-500 uppercase">UDI-CAL-88</span>
      </div>

      {/* Waveform graphic */}
      <div className="relative z-10 my-auto h-8 w-full flex items-center">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 30">
          <polyline
            points="0,15 30,15 40,5 50,25 60,15 90,15 100,2 110,28 120,15 150,15 160,8 170,22 180,15 200,15"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[0.6rem] font-mono text-[var(--text-tertiary)]">
        <span>FREQ: 120 Hz</span>
        <span>DRIFT: 0.02%</span>
        <span className="text-emerald-400">STATUS: OK</span>
      </div>
    </div>
  );
}

function TaskCard({
  ticket,
  index,
  onComplete,
}: {
  ticket: MaintenanceTicket;
  index: number;
  onComplete: (ticketId: string) => void;
}) {
  const [completed, setCompleted] = useState(ticket.status === "resolved");

  const handleComplete = async () => {
    if (!completed) {
      onComplete(ticket.id);
      setCompleted(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <GlassCard className={`transition-all ${completed ? "opacity-60" : ""}`}>
        {/* Dynamic telemetry diagnostic graphic */}
        <EquipmentDiagnosticGraphic title={ticket.equipmentName} />

        <div className="space-y-2 text-left">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xs font-bold text-slate-100 line-clamp-1">
              {ticket.title}
            </h3>
            <StatusBadge variant={ticket.priority} pulse={ticket.priority === "critical"}>
              {ticket.priority}
            </StatusBadge>
          </div>

          <p className="text-[0.7rem] font-medium text-sky-400">{ticket.equipmentName}</p>
          <p className="text-xs text-[var(--text-tertiary)] line-clamp-2 leading-relaxed">
            {ticket.description}
          </p>

          <div className="flex items-center gap-2 text-[0.65rem] font-mono text-slate-500">
            <Clock className="h-3 w-3 text-[var(--text-tertiary)]" />
            Assigned {formatRelativeTime(ticket.createdAt)}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleComplete}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all ${
                completed
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-sky-500/10 text-sky-400 border border-sky-500/20 hover:bg-sky-500/20"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              {completed ? "Work Order Completed ✓" : "Mark Complete"}
            </button>

            <button
              type="button"
              onClick={() => {
                alert("Biomedical OCR Log Scanner: Point mobile camera at device telemetry log tag.");
              }}
              className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-slate-900/60 px-3 py-2.5 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-sky-500/30 hover:text-[var(--text-primary)]"
            >
              <Camera className="h-3.5 w-3.5 text-sky-400" />
              Scan Log
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}


function TasksFeed({
  tickets,
  onComplete,
}: {
  tickets: MaintenanceTicket[];
  onComplete: (ticketId: string) => void;
}) {
  return (
    <div className="space-y-4">
      {tickets.length > 0 ? (
        tickets.map((ticket, i) => (
          <TaskCard key={ticket.id} ticket={ticket} index={i} onComplete={onComplete} />
        ))
      ) : (
        <GlassCard className="text-center py-12">
          <CheckCircle2 className="mx-auto h-10 w-10 text-sentinel-healthy/40 mb-3" />
          <p className="text-sm text-muted-foreground">All tasks completed!</p>
        </GlassCard>
      )}
    </div>
  );
}

function ScanView() {
  return (
    <GlassCard className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-sentinel-blue/10 border border-sentinel-blue/20">
        <ScanLine className="h-10 w-10 text-sentinel-blue-light" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Scan Maintenance Log
      </h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-xs">
        Use your device camera to scan and digitize paper maintenance logs via OCR
      </p>
      <div className="flex items-center gap-2 rounded-lg bg-sentinel-warning/10 border border-sentinel-warning/20 px-4 py-2 mb-4">
        <AlertCircle className="h-4 w-4 text-sentinel-warning" />
        <span className="text-xs text-sentinel-warning">OCR endpoint pending backend implementation</span>
      </div>
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-2 rounded-lg bg-sentinel-blue/50 px-6 py-3 text-sm font-semibold text-[var(--text-primary)]/70 cursor-not-allowed"
      >
        <Camera className="h-4 w-4" />
        Open Camera
      </button>
    </GlassCard>
  );
}

function HistoryView({ tickets }: { tickets: MaintenanceTicket[] }) {
  const resolved = tickets.filter((t) => t.status === "resolved");

  return (
    <div className="space-y-3">
      {resolved.length > 0 ? (
        resolved.map((ticket, i) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard padding="sm" className="opacity-70">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {ticket.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ticket.equipmentName} • Resolved {formatRelativeTime(ticket.updatedAt)}
                  </p>
                </div>
                <CheckCircle2 className="ml-2 h-5 w-5 shrink-0 text-sentinel-healthy" />
              </div>
            </GlassCard>
          </motion.div>
        ))
      ) : (
        <GlassCard className="text-center py-12">
          <p className="text-sm text-muted-foreground">No completed tasks yet</p>
        </GlassCard>
      )}
    </div>
  );
}

function ProfileView({ activeCount, resolvedCount }: { activeCount: number; resolvedCount: number }) {
  return (
    <GlassCard className="text-center">
      <div className="mb-4 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-sentinel-blue/20 text-2xl font-bold text-sentinel-blue-light">
        {currentTechnician.avatar}
      </div>
      <h3 className="text-lg font-semibold text-foreground">
        {currentTechnician.name}
      </h3>
      <p className="text-sm text-muted-foreground">{currentTechnician.specialty}</p>
      <p className="text-xs text-muted-foreground mt-1">{currentTechnician.location}</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-sentinel-glass-border bg-sentinel-glass p-3">
          <p className="text-2xl font-bold text-foreground">
            {activeCount}
          </p>
          <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">
            Active Tasks
          </p>
        </div>
        <div className="rounded-lg border border-sentinel-glass-border bg-sentinel-glass p-3">
          <p className="text-2xl font-bold text-sentinel-healthy">{resolvedCount}</p>
          <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">
            Completed
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

export default function TechnicianPage() {
  const [activeTab, setActiveTab] = useState<MobileTab>("tasks");
  const [allTickets, setAllTickets] = useState<MaintenanceTicket[]>([]);

  useEffect(() => {
    fetchTickets().then((data) => {
      if (data.length > 0) {
        setAllTickets(data);
      }
    });
  }, []);

  // Filter tickets for current technician (or show all assigned tickets for demo)
  const assignedTickets = allTickets.filter(
    (t) =>
      t.status !== "resolved" &&
      (t.assignedTechnician === currentTechnician.name || t.assignedTechnician)
  );
  const resolvedCount = allTickets.filter((t) => t.status === "resolved").length;

  const handleComplete = async (ticketId: string) => {
    const success = await updateTicketStatus(ticketId, "resolved");
    if (success) {
      setAllTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId
            ? { ...t, status: "resolved" as const, updatedAt: new Date().toISOString() }
            : t
        )
      );
    }
  };

  const tabs: { id: MobileTab; icon: typeof ClipboardList; label: string }[] = [
    { id: "tasks", icon: ClipboardList, label: "Tasks" },
    { id: "scan", icon: ScanLine, label: "Scan" },
    { id: "history", icon: History, label: "History" },
    { id: "profile", icon: UserCircle, label: "Profile" },
  ];

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-gradient-to-b from-sentinel-bg-from to-sentinel-bg-to">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-sentinel-glass-border bg-sentinel-bg-from/80 px-4 py-4 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground">
              Sentinel<span className="text-sentinel-blue">Ops</span>
            </h1>
            <p className="text-xs text-muted-foreground">
              Welcome, {currentTechnician.name}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sentinel-blue/20 text-sm font-bold text-sentinel-blue-light">
            {currentTechnician.avatar}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        {activeTab === "tasks" && <TasksFeed tickets={assignedTickets} onComplete={handleComplete} />}
        {activeTab === "scan" && <ScanView />}
        {activeTab === "history" && <HistoryView tickets={allTickets} />}
        {activeTab === "profile" && <ProfileView activeCount={assignedTickets.length} resolvedCount={resolvedCount} />}
      </main>

      {/* Bottom nav */}
      <nav className="sticky bottom-0 z-40 border-t border-sentinel-glass-border bg-sentinel-bg-from/90 backdrop-blur-xl">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center gap-1 px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? "text-sentinel-blue-light"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="mobile-tab"
                  className="absolute -top-0.5 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-sentinel-blue"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

