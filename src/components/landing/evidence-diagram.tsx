"use client";

import React from "react";
import { Database, Cpu, BarChart2, BookOpen, Brain, CheckSquare, ArrowRight } from "lucide-react";

export function LandingEvidenceDiagram() {
  const flowNodes = [
    { label: "DEVICE DATA", sub: "Dataset Attributes", icon: Database, color: "text-[var(--text-secondary)]" },
    { label: "ML PREDICTION", sub: "CatBoost Model", icon: Cpu, color: "text-blue-600" },
    { label: "SHAP EXPLANATION", sub: "Feature Contributors", icon: BarChart2, color: "text-sky-400" },
    { label: "HISTORICAL EVIDENCE", sub: "BGE + BM25 RAG", icon: BookOpen, color: "text-amber-400" },
    { label: "AI REASONING", sub: "LangGraph LLM Agent", icon: Brain, color: "text-purple-400" },
    { label: "SAFETY ACTION", sub: "Biomed Maintenance", icon: CheckSquare, color: "text-emerald-400" },
  ];

  return (
    <section id="architecture" className="py-24 px-6 border-t border-[var(--border-default)] bg-[#050505]">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 mb-2 block">
            System Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Built Around Evidence
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-tertiary)] max-w-xl mx-auto mt-2">
            Every AI diagnostic recommendation is grounded in verifiable historical data and SHAP explainability.
          </p>
        </div>

        {/* Flow Visualizer Box */}
        <div className="p-6 md:p-8 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] text-left font-mono">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] font-sans">
              Authoritative Data Pipeline
            </span>
            <span className="text-[0.65rem] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
              Squad A → Squad B → Squad C
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-center">
            {flowNodes.map((node, i) => (
              <React.Fragment key={node.label}>
                <div className="p-4 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] flex flex-col items-center justify-center text-center space-y-2 group hover:border-white/20 transition-all">
                  <node.icon className={`h-5 w-5 ${node.color}`} />
                  <span className="text-xs font-bold text-[var(--text-primary)] font-sans">{node.label}</span>
                  <span className="text-[0.6rem] text-[var(--text-tertiary)]">{node.sub}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
