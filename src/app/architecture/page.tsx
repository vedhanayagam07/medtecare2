"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { GitFork } from "lucide-react";

export default function ArchitecturePage() {
  return (
    <AppShell>
      <div className="space-y-6 text-left">
        <div className="border-b border-[var(--border-default)] pb-4">
          <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            MedteCare System Architecture
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Squad A (Machine Learning) → Squad B (LangGraph RAG) → Squad C (FastAPI & Next.js).
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] space-y-6 font-mono">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3">
            <div className="flex items-center gap-2">
              <GitFork className="h-4 w-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-sans">
                Authoritative System Pipeline Flow
              </h3>
            </div>
            <span className="text-[0.65rem] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
              Active Production Flow
            </span>
          </div>

          <div className="flex flex-col items-center space-y-3 text-xs">
            <div className="w-72 p-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] text-center font-bold text-slate-700">
              Medical Device Dataset (DATA/medical_device_ml_dataset.csv)
            </div>
            <div className="text-slate-500">│</div>
            <div className="text-slate-500">▼</div>

            <div className="w-80 p-3 rounded-lg bg-blue-950/60 border border-blue-800/80 text-center space-y-1">
              <span className="text-[0.6rem] font-bold text-blue-600 uppercase tracking-wider block">Squad A ML Layer</span>
              <p className="font-bold text-[var(--text-primary)]">CatBoost Prediction + SHAP Explainability</p>
            </div>
            <div className="text-slate-500">│</div>
            <div className="text-slate-500">▼</div>

            <div className="w-60 p-2 rounded-md bg-[var(--surface-2)] border border-[var(--border-default)] text-center font-bold text-sky-400">
              MLPrediction Schema
            </div>
            <div className="text-slate-500">│</div>
            <div className="text-slate-500">▼</div>

            <div className="w-80 p-3 rounded-lg bg-purple-950/60 border border-purple-800/80 text-center space-y-1">
              <span className="text-[0.6rem] font-bold text-purple-400 uppercase tracking-wider block">Squad B Logic Layer</span>
              <p className="font-bold text-[var(--text-primary)]">LangGraph Diagnostic Workflow</p>
            </div>
            <div className="text-slate-500">│</div>
            <div className="text-slate-500">▼</div>

            <div className="grid grid-cols-2 gap-4 w-96 text-center">
              <div className="p-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)]">
                <span className="font-bold text-slate-700 block text-[0.7rem]">BGE Semantic Search</span>
                <span className="text-[0.6rem] text-[var(--text-tertiary)]">Vector Embeddings</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)]">
                <span className="font-bold text-slate-700 block text-[0.7rem]">BM25 Lexical Search</span>
                <span className="text-[0.6rem] text-[var(--text-tertiary)]">Keyword Indexing</span>
              </div>
            </div>
            <div className="text-slate-500">│</div>
            <div className="text-slate-500">▼</div>

            <div className="w-64 p-2 rounded-md bg-[var(--surface-2)] border border-[var(--border-default)] text-center font-bold text-amber-400">
              RRF (Reciprocal Rank Fusion)
            </div>
            <div className="text-slate-500">│</div>
            <div className="text-slate-500">▼</div>

            <div className="w-72 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-center font-bold text-emerald-300">
              Historical Medical Device Evidence
            </div>
            <div className="text-slate-500">│</div>
            <div className="text-slate-500">▼</div>

            <div className="w-64 p-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] text-center font-bold text-[var(--text-primary)]">
              LLM Reasoning (Groq Provider)
            </div>
            <div className="text-slate-500">│</div>
            <div className="text-slate-500">▼</div>

            <div className="grid grid-cols-3 gap-2 w-96 text-center text-[0.65rem]">
              <div className="p-2 rounded-md bg-[var(--surface-2)] border border-[var(--border-default)] font-bold text-[var(--text-secondary)]">Recommendations</div>
              <div className="p-2 rounded-md bg-[var(--surface-2)] border border-[var(--border-default)] font-bold text-[var(--text-secondary)]">Priority</div>
              <div className="p-2 rounded-md bg-[var(--surface-2)] border border-[var(--border-default)] font-bold text-amber-400">Human Review</div>
            </div>
            <div className="text-slate-500">│</div>
            <div className="text-slate-500">▼</div>

            <div className="w-72 p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] text-center space-y-1">
              <span className="text-[0.6rem] font-bold text-[var(--text-tertiary)] uppercase tracking-wider block">Squad C Integration</span>
              <p className="font-bold text-[var(--text-primary)]">FastAPI REST Backend → Next.js Frontend Shell</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
