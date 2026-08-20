"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Database, Search, Layers, ShieldAlert, AlertTriangle } from "lucide-react";

export default function EvidencePage() {
  return (
    <AppShell>
      <div className="space-y-6 text-left">
        <div className="border-b border-[var(--border-default)] pb-4">
          <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            Evidence Explorer & Historical Records
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Squad B LangGraph RAG hybrid retrieval pipeline (BGE + BM25 + RRF + Cohere).
          </p>
        </div>

        {/* Visual Pipeline */}
        <div className="p-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                RAG Hybrid Retrieval Pipeline
              </h3>
            </div>
            <span className="text-[0.65rem] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
              Squad B Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
            <div className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] space-y-1">
              <Search className="h-4 w-4 text-blue-600 mx-auto" />
              <span className="font-bold text-slate-700 block">1. Query</span>
              <span className="text-[0.6rem] text-[var(--text-tertiary)]">Device Telemetry</span>
            </div>
            <div className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] space-y-1">
              <Database className="h-4 w-4 text-sky-400 mx-auto" />
              <span className="font-bold text-slate-700 block">2. Dual Retrieval</span>
              <span className="text-[0.6rem] text-[var(--text-tertiary)]">BGE + BM25</span>
            </div>
            <div className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] space-y-1">
              <Layers className="h-4 w-4 text-amber-400 mx-auto" />
              <span className="font-bold text-slate-700 block">3. RRF Fusion</span>
              <span className="text-[0.6rem] text-[var(--text-tertiary)]">Ranked Score</span>
            </div>
            <div className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] space-y-1">
              <ShieldAlert className="h-4 w-4 text-purple-400 mx-auto" />
              <span className="font-bold text-slate-700 block">4. Cohere Rerank</span>
              <span className="text-[0.6rem] text-[var(--text-tertiary)]">Contextual Re-scoring</span>
            </div>
            <div className="p-3 rounded-lg bg-blue-950/60 border border-blue-200 space-y-1">
              <Database className="h-4 w-4 text-emerald-400 mx-auto" />
              <span className="font-bold text-emerald-300 block">5. Evidence</span>
              <span className="text-[0.6rem] text-[var(--text-tertiary)]">Passages</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-lg bg-amber-950/30 border border-amber-800/50 p-3.5 flex items-start gap-3 text-xs text-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 block mb-0.5">HISTORICAL EVIDENCE NOTICE</strong>
            <p className="text-[0.68rem] text-amber-200/90 leading-relaxed">
              Historical records below were retrieved from the global medical-device safety database based on failure mode similarities. They provide historical domain evidence and do NOT imply direct correspondence to the exact individual unit being evaluated.
            </p>
          </div>
        </div>

        {/* Evidence Table */}
        <div className="p-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Retrieved Historical Evidence Records
            </h3>
            <span className="text-[0.65rem] font-mono text-[var(--text-tertiary)]">Query Target: DEV-88401</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              {
                title: "Infusomat volumetric infusion pump safety record",
                source: "Medical Device Global Safety Database",
                type: "HISTORICAL_EVIDENCE",
                confidence: "1.0000",
                excerpt: "Infusomat volumetric infusion pump records indicate occlusion pressure sensor calibration requirements after 4+ years of service.",
              },
              {
                title: "Argus infusion pump field maintenance audit",
                source: "Global Maintenance Knowledge Base",
                type: "HISTORICAL_EVIDENCE",
                confidence: "0.9334",
                excerpt: "Argus infusion pump records detail battery cycle degradation protocols and safety notice verification requirements.",
              },
              {
                title: "Infusion pumps general safety guidance note",
                source: "Clinical Device Safety Repository",
                type: "HISTORICAL_EVIDENCE",
                confidence: "0.5164",
                excerpt: "General guidance note on Class IIb active infusion equipment safety inspection intervals.",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-600 border border-blue-200 text-[0.6rem] font-bold">
                        {item.type}
                      </span>
                      <h4 className="font-bold text-slate-700 font-sans">{item.title}</h4>
                    </div>
                    <p className="text-[0.65rem] text-[var(--text-tertiary)] font-sans">Source: {item.source}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[0.6rem] text-[var(--text-tertiary)] block">RRF Rank Score</span>
                    <span className="font-bold text-emerald-400">{item.confidence}</span>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] italic font-mono bg-[var(--surface-2)] p-2 rounded border border-[var(--border-subtle)]">
                  "{item.excerpt}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
