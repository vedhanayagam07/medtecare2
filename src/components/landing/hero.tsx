"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";
import { demoPrimaryDevice } from "@/lib/mock-data";
import { RiskGauge } from "@/components/shared/risk-gauge";
import { StatusBadge } from "@/components/shared/status-badge";

export function LandingHero() {
  return (
    <section id="overview" className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 text-center">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-black/[0.02] px-3.5 py-1 text-xs text-[var(--text-secondary)] backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#007AFF] animate-pulse" />
          <span className="font-semibold tracking-wide uppercase text-[0.65rem]">
            AI-ASSISTED MEDICAL DEVICE SAFETY
          </span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1]">
            Predict Risk Before <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              Medical Devices Fail.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-tertiary)] font-normal leading-relaxed max-w-2xl mx-auto">
            MedteCare combines machine learning, explainability, historical medical-device evidence, and AI-assisted diagnostic reasoning to help biomedical engineering teams identify devices requiring attention.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/command-center"
            className="apple-pill-btn-primary px-6 py-3 text-xs font-semibold flex items-center gap-2"
          >
            Launch Command Center
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#workflow"
            className="apple-pill-btn-secondary px-6 py-3 text-xs font-medium"
          >
            Explore Platform
          </a>
        </div>

        {/* Apple Glass Command Center Mockup Preview Container */}
        <div className="pt-8 mx-auto max-w-4xl">
          <div className="rounded-2xl glass-panel p-4 md:p-6 text-left shadow-2xl space-y-5">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-semibold text-[var(--text-primary)] ml-2">
                  MedteCare | Clinical Device Command Center
                </span>
              </div>
              <span className="text-[0.6rem] font-mono text-[var(--text-tertiary)] border border-[var(--border-default)] bg-black/[0.02] px-2 py-0.5 rounded-full">
                Squad A/B/C Active
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-black/[0.01] border border-[var(--border-subtle)] space-y-1">
                <span className="text-[0.6rem] font-semibold text-[var(--text-tertiary)] uppercase">
                  TOTAL DEVICES ASSESSED
                </span>
                <p className="text-xl font-semibold font-mono text-[var(--text-primary)]">1,250</p>
                <span className="text-[0.58rem] text-slate-500 block">Dataset Records</span>
              </div>

              <div className="p-3 rounded-xl bg-black/[0.01] border border-[var(--border-subtle)] space-y-1">
                <span className="text-[0.6rem] font-semibold text-[var(--text-tertiary)] uppercase">
                  HIGH RISK DEVICES
                </span>
                <p className="text-xl font-semibold font-mono text-orange-400">14</p>
                <span className="text-[0.58rem] text-slate-500 block">CatBoost Risk &gt; 60</span>
              </div>

              <div className="p-3 rounded-xl bg-black/[0.01] border border-[var(--border-subtle)] space-y-1">
                <span className="text-[0.6rem] font-semibold text-[var(--text-tertiary)] uppercase">
                  CRITICAL REVIEWS
                </span>
                <p className="text-xl font-semibold font-mono text-rose-400">3</p>
                <span className="text-[0.58rem] text-slate-500 block">Event Prob &gt; 0.80</span>
              </div>

              <div className="p-3 rounded-xl bg-black/[0.01] border border-[var(--border-subtle)] space-y-1">
                <span className="text-[0.6rem] font-semibold text-[var(--text-tertiary)] uppercase">
                  PENDING HUMAN REVIEW
                </span>
                <p className="text-xl font-semibold font-mono text-amber-400">4</p>
                <span className="text-[0.58rem] text-slate-500 block">Biomedical Approval</span>
              </div>
            </div>

            {/* Spotlight Card */}
            <div className="p-4 rounded-xl bg-black/[0.01] border border-rose-900/40 border-l-4 border-l-rose-600 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <RiskGauge score={demoPrimaryDevice.riskScore} size={85} />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#007AFF]">
                      {demoPrimaryDevice.id}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs text-[var(--text-tertiary)]">{demoPrimaryDevice.manufacturer}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-[var(--text-primary)]">{demoPrimaryDevice.name}</h4>
                  <p className="text-[0.7rem] text-[var(--text-tertiary)]">
                    SHAP Drivers: <strong className="text-[var(--text-primary)]">Previous Recalls (+0.42)</strong>, <strong className="text-[var(--text-primary)]">Safety Notices (+0.28)</strong>
                  </p>
                </div>
              </div>

              <StatusBadge variant="critical">HUMAN REVIEW REQUIRED</StatusBadge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
