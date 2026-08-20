"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Cpu, BarChart2, Info } from "lucide-react";

export default function ExplainabilityPage() {
  return (
    <AppShell>
      <div className="space-y-6 text-left">
        <div className="border-b border-[var(--border-default)] pb-4">
          <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            Model Explainability & SHAP Analysis
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Squad A CatBoost machine learning model prediction drivers & feature-level SHAP breakdown.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 p-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-blue-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  CatBoost ML Model Output
                </h3>
              </div>
              <span className="text-[0.65rem] font-mono text-[var(--text-tertiary)]">Squad A ML Layer</span>
            </div>

            <div className="p-4 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] text-center space-y-2">
              <span className="text-xs text-[var(--text-tertiary)] block font-mono">TARGET PREDICTION SIGNAL</span>
              <p className="text-3xl font-black font-mono text-rose-400">87% <span className="text-xs font-normal text-[var(--text-tertiary)]">(0.87 Prob)</span></p>
              <p className="text-xs font-semibold text-[var(--text-primary)]">Predicted Future-Event Risk Score</p>
            </div>

            <div className="space-y-2 text-xs font-mono text-[var(--text-secondary)]">
              <div className="flex justify-between py-1.5 border-b border-[var(--border-subtle)]">
                <span className="text-[var(--text-tertiary)]">Model Algorithm:</span>
                <span className="font-bold text-slate-700">CatBoost Classifier</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border-subtle)]">
                <span className="text-[var(--text-tertiary)]">Dataset Source:</span>
                <span className="text-slate-700">DATA/medical_device_ml_dataset.csv</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border-subtle)]">
                <span className="text-[var(--text-tertiary)]">Target Field:</span>
                <span className="text-slate-700">future_event</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[var(--text-tertiary)]">Explainability Framework:</span>
                <span className="font-bold text-sky-400">SHAP (TreeExplainer)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-sky-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Feature-Level SHAP Drivers
                </h3>
              </div>
              <span className="text-[0.65rem] font-mono text-[var(--text-tertiary)]">Asset DEV-88401</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {[
                { feature: "Previous Recalls", val: "+0.42", width: "84%", color: "bg-rose-600" },
                { feature: "Previous Safety Notices", val: "+0.28", width: "56%", color: "bg-orange-600" },
                { feature: "Years in Service", val: "+0.15", width: "30%", color: "bg-amber-600" },
                { feature: "Previous Adverse Events", val: "+0.10", width: "20%", color: "bg-sky-600" },
              ].map((item) => (
                <div key={item.feature} className="p-3 rounded-md bg-[var(--surface-2)] border border-[var(--border-default)] space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-700 font-sans">{item.feature}</span>
                    <span className="font-bold text-rose-400">{item.val} SHAP Value</span>
                  </div>
                  <div className="h-2 w-full rounded bg-slate-800 overflow-hidden">
                    <div className={`h-full rounded ${item.color}`} style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] flex items-start gap-3 text-xs text-[var(--text-secondary)]">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-[var(--text-primary)] text-xs">Understanding SHAP Values in Medical Safety</h4>
            <p className="text-[0.68rem] text-[var(--text-tertiary)] leading-relaxed">
              SHAP provides feature-level additive explanations for model predictions, helping biomedical engineers understand which factors influenced the risk score. SHAP values explain feature contributions relative to model baselines — they provide decision-support transparency without claiming direct physical causality.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
