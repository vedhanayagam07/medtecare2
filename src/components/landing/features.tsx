"use client";

import React from "react";
import { Cpu, BarChart2, Database, ShieldCheck } from "lucide-react";

export function LandingFeatures() {
  const features = [
    {
      id: "01",
      title: "Predictive Risk Modeling",
      subtitle: "CatBoost Machine Learning Engine",
      desc: "Evaluates medical-device dataset attributes to estimate future-event probability and classify device risk levels from Low to Critical.",
      icon: Cpu,
      badge: "Squad A",
    },
    {
      id: "02",
      title: "Explainable AI Drivers",
      subtitle: "SHAP Additive Feature Analysis",
      desc: "Provides feature-level breakdown explaining exactly how previous recalls, safety notices, and device age influenced the risk prediction.",
      icon: BarChart2,
      badge: "SHAP Engine",
    },
    {
      id: "03",
      title: "Hybrid Evidence Retrieval",
      subtitle: "BGE + BM25 + RRF RAG Search",
      desc: "Retrieves relevant historical device safety evidence from the knowledge base using dual semantic and lexical ranking.",
      icon: Database,
      badge: "Squad B RAG",
    },
    {
      id: "04",
      title: "Human-in-the-Loop Oversight",
      subtitle: "Biomedical Officer Approval Queue",
      desc: "Ensures AI recommendations remain decision support only, requiring explicit verification and sign-off by qualified clinical engineers.",
      icon: ShieldCheck,
      badge: "Safety Control",
    },
  ];

  return (
    <section id="features" className="py-24 px-6 border-t border-[var(--border-default)]">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 mb-2 block">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            One Platform. Complete Risk Intelligence.
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-tertiary)] max-w-xl mx-auto mt-2">
            Four specialized AI capabilities working together for clinical medical device safety.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 text-left">
          {features.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] hover:border-white/20 transition-all space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/[0.02] border border-[var(--border-default)] group-hover:border-white/25 transition-colors">
                  <item.icon className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-[0.65rem] font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-700 border border-blue-200">
                  {item.badge}
                </span>
              </div>

              <div>
                <span className="text-[0.65rem] font-mono text-slate-500 font-bold block mb-1">
                  FEATURE {item.id}
                </span>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{item.title}</h3>
                <p className="text-xs font-mono text-[var(--text-tertiary)] mt-0.5">{item.subtitle}</p>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-3 border-t border-[var(--border-subtle)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
