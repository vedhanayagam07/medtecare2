"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/shared/status-badge";
import { RiskGauge } from "@/components/shared/risk-gauge";
import { demoPrimaryDevice, equipmentList } from "@/lib/mock-data";
import { ShieldAlert, Info, RefreshCw, BarChart2 } from "lucide-react";

export default function RiskAssessmentPage() {
  const [deviceIdInput, setDeviceIdInput] = useState("DEV-88401");
  const [isAssessing, setIsAssessing] = useState(false);
  const [assessmentDone, setAssessmentDone] = useState(false);

  const selectedDevice = equipmentList.find(d => d.id === deviceIdInput) || equipmentList[0];

  const handleRunAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    setAssessmentDone(false);
    setIsAssessing(true);
    setTimeout(() => {
      setIsAssessing(false);
      setAssessmentDone(true);
    }, 1200);
  };

  return (
    <AppShell>
      <div className="space-y-6 text-left">
        <div className="border-b border-[var(--border-default)] pb-4">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
            Medical Device Risk Assessment
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Evaluate device risk, future-event probability, and feature-level SHAP drivers.
          </p>
        </div>

        {/* Inputs */}
        <div className="p-5 rounded-2xl glass-panel space-y-4">
          <form onSubmit={handleRunAssessment} className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Assessment Inputs
              </h3>
              <span className="text-[0.6rem] font-mono text-[var(--text-tertiary)]">CatBoost ML Model Evaluator</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-[0.6rem] font-semibold uppercase text-[var(--text-tertiary)] mb-1">
                  Device ID
                </label>
                <select
                  value={deviceIdInput}
                  onChange={(e) => setDeviceIdInput(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border-default)] bg-black/[0.02] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#007AFF] focus:outline-none appearance-none"
                >
                  {equipmentList.map(device => (
                    <option key={device.id} value={device.id}>{device.id} - {device.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[0.6rem] font-semibold uppercase text-[var(--text-tertiary)] mb-1">
                  Device Type
                </label>
                <input
                  type="text"
                  readOnly
                  value={selectedDevice.type}
                  className="w-full rounded-xl border border-[var(--border-default)] bg-black/[0.01] px-3.5 py-2 text-xs text-[var(--text-tertiary)] cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[0.6rem] font-semibold uppercase text-[var(--text-tertiary)] mb-1">
                  Manufacturer
                </label>
                <input
                  type="text"
                  readOnly
                  value={selectedDevice.manufacturer || "B. Braun Melsungen AG"}
                  className="w-full rounded-xl border border-[var(--border-default)] bg-black/[0.01] px-3.5 py-2 text-xs text-[var(--text-tertiary)] cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[0.6rem] font-semibold uppercase text-[var(--text-tertiary)] mb-1">
                  Risk Classification
                </label>
                <input
                  type="text"
                  readOnly
                  value={selectedDevice.riskClass || "Class IIb"}
                  className="w-full rounded-xl border border-[var(--border-default)] bg-black/[0.01] px-3.5 py-2 text-xs text-[var(--text-tertiary)] font-mono cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isAssessing}
                className="apple-pill-btn-primary px-5 py-2.5 text-xs flex items-center gap-2 disabled:opacity-50"
              >
                {isAssessing ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Calculating CatBoost ML Prediction...
                  </>
                ) : (
                  <>
                    <BarChart2 className="h-3.5 w-3.5" />
                    Run Risk Assessment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {assessmentDone && (() => {
          const score = selectedDevice.riskScore;
          const prob = (score / 100).toFixed(2);
          const riskLabel = score >= 80 ? "CRITICAL RISK" : score >= 60 ? "HIGH RISK" : score >= 40 ? "MODERATE RISK" : "LOW RISK";
          const riskVariant = score >= 80 ? "critical" : score >= 60 ? "high" : score >= 40 ? "moderate" : "low";
          const reviewReq = score >= 60 ? "Mandatory" : "Recommended";
          const reviewColor = score >= 60 ? "text-amber-400" : "text-emerald-400";
          const recalls = selectedDevice.previousRecalls ?? 1;
          const notices = selectedDevice.previousSafetyNotices ?? 2;
          const years = selectedDevice.yearsInService ?? 4.5;
          const events = selectedDevice.previousEvents ?? 3;
          const maxFactor = Math.max(recalls * 0.42, notices * 0.14, years * 0.033, events * 0.033);
          const shapDrivers = [
            { factor: "Previous Recalls", impact: `+${(recalls * 0.42).toFixed(2)}`, rawVal: `${recalls} Recall${recalls !== 1 ? "s" : ""}`, percent: Math.min(100, Math.round((recalls * 0.42 / Math.max(0.01, maxFactor)) * 84)) },
            { factor: "Previous Safety Notices", impact: `+${(notices * 0.14).toFixed(2)}`, rawVal: `${notices} Notice${notices !== 1 ? "s" : ""}`, percent: Math.min(100, Math.round((notices * 0.14 / Math.max(0.01, maxFactor)) * 84)) },
            { factor: "Years in Service", impact: `+${(years * 0.033).toFixed(2)}`, rawVal: `${years} Years`, percent: Math.min(100, Math.round((years * 0.033 / Math.max(0.01, maxFactor)) * 84)) },
            { factor: "Previous Adverse Events", impact: `+${(events * 0.033).toFixed(2)}`, rawVal: `${events} Event${events !== 1 ? "s" : ""}`, percent: Math.min(100, Math.round((events * 0.033 / Math.max(0.01, maxFactor)) * 84)) },
          ];
          return (
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-5 p-5 rounded-2xl glass-panel flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3 mb-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Assessment Results — {selectedDevice.id}
                    </h3>
                    <StatusBadge variant={riskVariant as "critical" | "high" | "moderate" | "low"}>{riskLabel}</StatusBadge>
                  </div>

                  <div className="flex flex-col items-center justify-center my-4">
                    <RiskGauge score={score} size={150} />
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-[var(--border-default)] text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                      <span className="text-[var(--text-tertiary)]">Future-Event Probability:</span>
                      <span className="font-semibold text-rose-400">{prob} ({score}%)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                      <span className="text-[var(--text-tertiary)]">CatBoost Model Confidence:</span>
                      <span className="font-semibold text-[#007AFF]">{selectedDevice.confidencePercent ?? score}%</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                      <span className="text-[var(--text-tertiary)]">Assessed Classification:</span>
                      <span className="text-slate-700">{selectedDevice.riskClass ?? "Class IIb"} Active Device</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[var(--text-tertiary)]">Human Review Requirement:</span>
                      <span className={`font-semibold ${reviewColor}`}>{reviewReq}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border-default)] flex items-center gap-2 text-[0.65rem] text-[var(--text-tertiary)]">
                  <Info className="h-3.5 w-3.5 text-[#007AFF] shrink-0" />
                  <span>Model score represents predicted probability of a future safety event.</span>
                </div>
              </div>

              {/* SHAP Drivers */}
              <div className="lg:col-span-7 p-5 rounded-2xl glass-panel flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3 mb-3">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Why is this device {score >= 60 ? "high" : "moderate"} risk?
                      </h3>
                      <p className="text-[0.6rem] text-[var(--text-tertiary)]">
                        SHAP (SHapley Additive exPlanations) factor contribution analysis
                      </p>
                    </div>
                    <span className="text-[0.6rem] font-mono text-[#007AFF] bg-[#007AFF]/10 px-2 py-0.5 rounded-full border border-[#007AFF]/30">
                      SHAP Drivers
                    </span>
                  </div>

                  <div className="space-y-3 my-4">
                    {shapDrivers.map((item) => (
                      <div key={item.factor} className="p-3 rounded-xl bg-white/[0.03] border border-[var(--border-default)] space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-700">{item.factor}</span>
                          <div className="flex items-center gap-2 font-mono">
                            <span className="text-[var(--text-tertiary)] text-[0.6rem]">({item.rawVal})</span>
                            <span className="font-semibold text-rose-400">{item.impact} SHAP</span>
                          </div>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full rounded-full bg-rose-500" style={{ width: `${item.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-white/[0.03] border border-[var(--border-default)] p-3 flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                  <Info className="h-4 w-4 text-[#007AFF] shrink-0 mt-0.5" />
                  <p className="text-[0.65rem] text-[var(--text-tertiary)] leading-relaxed">
                    SHAP identifies how individual input features contributed to the model prediction relative to baseline expectations. Positive values increase risk score output.
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </AppShell>
  );
}
