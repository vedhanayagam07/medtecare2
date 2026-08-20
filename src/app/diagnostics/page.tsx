"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/shared/status-badge";
import { RiskGauge } from "@/components/shared/risk-gauge";
import { demoPrimaryDevice, manualReferences } from "@/lib/mock-data";
import { Stethoscope, AlertTriangle, BookOpen } from "lucide-react";

export default function DiagnosticsPage() {
  return (
    <AppShell>
      <div className="space-y-6 text-left">
        <div className="border-b border-[var(--border-subtle)] pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
              AI Diagnostic Assessment Report
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Diagnostic reasoning generated via CatBoost ML + LangGraph RAG Agent.
            </p>
          </div>
          <StatusBadge variant="critical" size="md" pulse>
            Human Review Required
          </StatusBadge>
        </div>

        {/* Device Banner */}
        <div className="card-elevated p-5 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-shrink-0 flex items-center justify-center p-2 rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)]">
             <RiskGauge score={demoPrimaryDevice.riskScore} size={120} />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-[var(--blue-accent)]">{demoPrimaryDevice.id}</span>
              <span className="text-[var(--text-tertiary)]">•</span>
              <span className="text-xs text-[var(--text-tertiary)]">{demoPrimaryDevice.manufacturer}</span>
            </div>

            <h2 className="text-lg font-bold text-[var(--text-primary)]">{demoPrimaryDevice.name}</h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Classification: <span className="font-mono text-[var(--text-primary)]">{demoPrimaryDevice.classification}</span> | Risk Class: <span className="font-mono text-[var(--text-primary)]">{demoPrimaryDevice.riskClass}</span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 mt-1 border-t border-[var(--border-subtle)] text-xs font-mono">
              <div>
                <span className="text-[0.6rem] text-[var(--text-tertiary)] block">PREVIOUS RECALLS</span>
                <span className="font-bold text-red-500">{demoPrimaryDevice.previousRecalls}</span>
              </div>
              <div>
                <span className="text-[0.6rem] text-[var(--text-tertiary)] block">SAFETY NOTICES</span>
                <span className="font-bold text-amber-500">{demoPrimaryDevice.previousSafetyNotices}</span>
              </div>
              <div>
                <span className="text-[0.6rem] text-[var(--text-tertiary)] block">SERVICE AGE</span>
                <span className="font-bold text-[var(--text-primary)]">{demoPrimaryDevice.yearsInService} yrs</span>
              </div>
              <div>
                <span className="text-[0.6rem] text-[var(--text-tertiary)] block">ADVERSE EVENTS</span>
                <span className="font-bold text-orange-500">{demoPrimaryDevice.previousEvents}</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Explanation */}
        <div className="card-elevated p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-[var(--blue-accent)]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                Diagnostic Explanation
              </h3>
            </div>
            <span className="text-[0.65rem] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              AI-Generated Reasoning — Decision Support Only
            </span>
          </div>

          <div className="space-y-4 text-xs leading-relaxed text-[var(--text-secondary)]">
            <div className="p-3.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] space-y-1">
              <h4 className="font-bold text-[var(--blue-accent)] uppercase text-[0.68rem] tracking-wider">
                1. Model Signal
              </h4>
              <p className="text-[var(--text-primary)]">
                CatBoost machine learning model predicts an elevated future-event risk (Score: 87 / 100, Probability: 0.87).
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] space-y-1">
              <h4 className="font-bold text-[var(--blue-accent)] uppercase text-[0.68rem] tracking-wider">
                2. Key Contributors (SHAP Explainability)
              </h4>
              <p className="text-[var(--text-primary)]">
                Previous recalls (+0.42 SHAP), previous safety notices (+0.28 SHAP), and service age (4.5 years) are the dominant model contributors.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] space-y-1">
              <h4 className="font-bold text-[var(--blue-accent)] uppercase text-[0.68rem] tracking-wider">
                3. Probable Root Causes
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-[var(--text-primary)]">
                <li>Historical Safety Notice & Event Pattern Alignment</li>
                <li>Operational Service Longevity & Lifecycle Degradation Risk</li>
                <li>Manufacturer Recall Recurrence Susceptibility</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 space-y-1 text-amber-900">
              <h4 className="font-bold uppercase text-[0.68rem] tracking-wider flex items-center gap-1.5 text-amber-700">
                <AlertTriangle className="h-3.5 w-3.5" /> 4. Evidence Limitation Notice
              </h4>
              <p className="text-[0.68rem] leading-relaxed text-amber-800">
                Retrieved historical records provide domain knowledge context and do NOT directly correspond to this exact individual physical unit. AI reasoning is for decision support only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
