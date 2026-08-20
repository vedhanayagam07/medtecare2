"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ShieldAlert, CheckCircle2, Building2, ArrowUpRight } from "lucide-react";

export default function BusinessValuePage() {
  return (
    <AppShell>
      <div className="space-y-6 text-left">
        <div className="border-b border-[var(--border-default)] pb-4">
          <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            From Reactive Maintenance to Predictive Device Safety
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Clinical value proposition, target healthcare stakeholders, and business benefits.
          </p>
        </div>

        {/* Traditional vs MedteCare */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="p-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] border-l-4 border-l-rose-600 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4" /> Traditional Reactive Workflow
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-mono">
              Device Failure → Incident / Breakdown → Manual Investigation → Maintenance Dispatch
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] border-l-4 border-l-blue-600 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> MedteCare Predictive Safety Workflow
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-mono">
              Device Data → CatBoost Risk Scoring → SHAP Explainability → RAG Evidence → AI Diagnostic Reasoning → Recommended Action → Human Review
            </p>
          </div>
        </div>

        {/* Business Benefits */}
        <div className="p-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] space-y-4">
          <div className="border-b border-[var(--border-default)] pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Core Enterprise Value Proposition
            </h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-xs font-sans">
            {[
              { title: "Earlier Risk Identification", desc: "Identify high-risk devices before physical breakdown occurs." },
              { title: "Reduced Unplanned Downtime", desc: "Minimize critical equipment availability gaps across clinical wards." },
              { title: "Prioritized Maintenance", desc: "Focus engineering resources on high-probability future event assets." },
              { title: "Evidence-Backed Audits", desc: "Validate inspection decisions with historical safety records." },
              { title: "Biomedical Efficiency", desc: "Reduce manual investigation hours with AI-generated context." },
              { title: "Human-in-the-Loop Safety", desc: "Maintain regulatory safety compliance with mandatory human authorization." },
            ].map((item) => (
              <div key={item.title} className="p-3.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] space-y-1">
                <h4 className="font-bold text-[var(--text-primary)]">{item.title}</h4>
                <p className="text-[0.68rem] text-[var(--text-tertiary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Integrations Roadmap */}
        <div className="p-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Future Enterprise Integrations
            </h3>
            <span className="text-[0.65rem] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
              Future Roadmap
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 font-mono text-xs">
            {[
              { name: "Hospital CMMS / EAM", desc: "Integration with Maximo, Nuvolo, or MediMaint for work order dispatch." },
              { name: "FDA UDI Systems", desc: "Unique Device Identification lookup APIs for instant asset lookup." },
              { name: "Manufacturer Safety Feeds", desc: "Ingestion of global field safety notices and recall alerts." },
              { name: "Real-time Telemetry APIs", desc: "Direct IoT telemetry streaming for ICU and operating room equipment." },
              { name: "Regulatory Registries", desc: "Audit report generation for Joint Commission & regulatory compliance." },
            ].map((item) => (
              <div key={item.name} className="p-3.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[var(--text-primary)] font-sans">{item.name}</h4>
                  <ArrowUpRight className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                </div>
                <p className="text-[0.65rem] text-[var(--text-tertiary)] font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
