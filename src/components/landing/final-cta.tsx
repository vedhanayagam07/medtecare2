"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function LandingFinalCTA() {
  return (
    <footer className="border-t border-[var(--border-default)] bg-[#050505] text-left">
      {/* CTA Box */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center border-b border-[var(--border-default)]">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Turn Device Risk Into <br />Preventive Action.
          </h2>
          <p className="text-sm md:text-base text-[var(--text-tertiary)] max-w-xl mx-auto leading-relaxed">
            Assess risk, understand the evidence, and prioritize the devices that require expert attention.
          </p>

          <div className="pt-4">
            <Link
              href="/command-center"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 shadow-xl"
            >
              Launch Command Center
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 font-extrabold text-[var(--text-primary)] text-[0.65rem]">
            MC
          </div>
          <div>
            <span className="font-bold text-[var(--text-primary)] uppercase tracking-wider block">MedteCare</span>
            <span className="text-[0.65rem] text-slate-500">Medical Device Safety & Risk Intelligence</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-500 font-mono text-[0.65rem]">
          <span>CatBoost ML</span>
          <span>•</span>
          <span>SHAP</span>
          <span>•</span>
          <span>LangGraph RAG</span>
          <span>•</span>
          <span>Squad A/B/C</span>
        </div>
      </div>
    </footer>
  );
}
