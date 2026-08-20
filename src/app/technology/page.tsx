"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Cpu, BarChart2, Database, Brain, Code2 } from "lucide-react";

export default function TechnologyPage() {
  const stack = [
    {
      squad: "Squad A — Machine Learning",
      items: [
        { name: "CatBoost Classifier", desc: "Gradient boosting model for medical-device future-event risk scoring." },
        { name: "SHAP (TreeExplainer)", desc: "SHapley Additive exPlanations for feature-level contribution analysis." },
      ],
      icon: Cpu,
      color: "text-blue-600",
    },
    {
      squad: "Squad B — Agentic RAG & Reasoning",
      items: [
        { name: "LangGraph", desc: "Multi-step diagnostic agent workflow orchestration." },
        { name: "BGE Embeddings", desc: "BAAI/bge-small-en-v1.5 vector semantic retrieval." },
        { name: "BM25 Lexical Search", desc: "Keyword-based sparse index for medical terminology matching." },
        { name: "RRF (Reciprocal Rank Fusion)", desc: "Hybrid ranking algorithm combining dense and sparse search scores." },
        { name: "Groq / LLM Engine", desc: "Generative LLM for diagnostic explanation and recommendation synthesis." },
      ],
      icon: Brain,
      color: "text-purple-400",
    },
    {
      squad: "Squad C — Backend & Frontend Integration",
      items: [
        { name: "FastAPI", desc: "High-performance Python backend REST services." },
        { name: "Next.js 16 (App Router)", desc: "React framework with server & client-side routing." },
        { name: "TypeScript & Tailwind CSS", desc: "Strongly typed component architecture with custom dark theme." },
      ],
      icon: Code2,
      color: "text-emerald-400",
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6 text-left">
        <div className="border-b border-[var(--border-default)] pb-4">
          <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            MedteCare Technology Stack
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Squad A (Machine Learning), Squad B (Agentic RAG), and Squad C (FastAPI + Next.js).
          </p>
        </div>

        <div className="space-y-6">
          {stack.map((group) => (
            <div key={group.squad} className="p-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] space-y-4">
              <div className="flex items-center gap-2 border-b border-[var(--border-default)] pb-3">
                <group.icon className={`h-4 w-4 ${group.color}`} />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  {group.squad}
                </h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 font-mono text-xs">
                {group.items.map((tech) => (
                  <div key={tech.name} className="p-3.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] space-y-1">
                    <h4 className="font-bold text-[var(--text-primary)] font-sans text-xs">{tech.name}</h4>
                    <p className="text-[0.68rem] text-[var(--text-tertiary)] font-sans leading-relaxed">{tech.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
