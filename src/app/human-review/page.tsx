"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/shared/status-badge";
import { UserCheck, CheckCircle2, FileSearch } from "lucide-react";

export default function HumanReviewPage() {
  const [reviews] = useState([
    {
      id: "DEV-88401",
      name: "Smart Infusion Pump System",
      riskScore: 87,
      priority: "critical",
      confidence: "94%",
      status: "Awaiting Human Review",
      assignedTo: "Dr. Rachel Vance (Chief Biomedical Officer)",
    },
    {
      id: "DEV-33019",
      name: "Siemens Magnetom MRI 3T",
      riskScore: 74,
      priority: "high",
      confidence: "89%",
      status: "Awaiting Human Review",
      assignedTo: "Lead Maintenance Engineer",
    },
  ]);

  const [approvedIds, setApprovedIds] = useState<string[]>([]);

  const handleApprove = (id: string) => {
    setApprovedIds((prev) => [...prev, id]);
  };

  return (
    <AppShell>
      <div className="space-y-6 text-left">
        <div className="border-b border-[var(--border-default)] pb-4">
          <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            Biomedical Human Review Queue
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Review, approve, or escalate AI diagnostic risk assessments.
          </p>
        </div>

        {/* Oversight Note */}
        <div className="rounded-lg bg-[var(--surface-1)] border border-[var(--border-default)] p-4 flex items-start gap-3 text-xs text-[var(--text-secondary)]">
          <UserCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-[var(--text-primary)] block mb-0.5 text-xs">CLINICAL SAFETY PRINCIPLE</strong>
            <p className="text-[0.68rem] text-[var(--text-tertiary)] leading-relaxed">
              AI-assisted risk assessment provides decision support. It does <strong className="text-slate-700">NOT replace qualified biomedical engineers</strong> or clinical safety professionals. Final authorization requires human engineering review.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3 mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Cases Requiring Human Verification
            </h3>
            <span className="text-[0.65rem] font-mono text-[var(--text-tertiary)]">{reviews.length} Cases Pending</span>
          </div>

          <div className="space-y-3">
            {reviews.map((item) => {
              const isApproved = approvedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border font-sans transition-all ${
                    isApproved
                      ? "bg-emerald-950/20 border-emerald-800/50"
                      : "bg-[var(--surface-2)] border-[var(--border-default)]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-default)] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600">{item.id}</span>
                        <span className="text-slate-500">•</span>
                        <StatusBadge variant={item.priority}>{item.priority}</StatusBadge>
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] mt-1">{item.name}</h4>
                    </div>

                    <div className="flex items-center gap-4 font-mono text-xs text-right">
                      <div>
                        <span className="text-slate-500 text-[0.6rem] block">RISK SCORE</span>
                        <span className="font-bold text-rose-400">{item.riskScore} / 100</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[0.6rem] block">AI CONFIDENCE</span>
                        <span className="font-bold text-sky-400">{item.confidence}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[0.6rem] block">STATUS</span>
                        <span className={isApproved ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                          {isApproved ? "APPROVED BY BIOMED" : item.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3">
                    <span className="text-[0.65rem] font-mono text-[var(--text-tertiary)]">
                      Assigned: {item.assignedTo}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        href="/risk-assessment"
                        className="inline-flex items-center gap-1 rounded-md border border-[var(--border-default)] bg-[var(--surface-1)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      >
                        <FileSearch className="h-3 w-3" /> Open Assessment
                      </Link>

                      <Link
                        href="/evidence"
                        className="inline-flex items-center gap-1 rounded-md border border-[var(--border-default)] bg-[var(--surface-1)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      >
                        Review Evidence
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleApprove(item.id)}
                        disabled={isApproved}
                        className={`inline-flex items-center gap-1 rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                          isApproved
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-blue-600 text-[var(--text-primary)] hover:bg-blue-500"
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {isApproved ? "Approved ✓" : "Approve Assessment"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
