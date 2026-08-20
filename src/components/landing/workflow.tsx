"use client";

import React from "react";
import { Cpu, BarChart2, Database, Brain, CheckSquare, UserCheck, ArrowRight } from "lucide-react";

export function LandingWorkflow() {
  const steps = [
    {
      num: "01",
      title: "Predict",
      sub: "CatBoost Risk Model",
      desc: "CatBoost estimates future-event risk probabilities based on historical medical device datasets.",
      icon: Cpu,
      color: "text-blue-600",
    },
    {
      num: "02",
      title: "Explain",
      sub: "SHAP Explainability",
      desc: "SHAP identifies feature contributions (recalls, safety notices, age) behind the prediction score.",
      icon: BarChart2,
      color: "text-sky-400",
    },
    {
      num: "03",
      title: "Retrieve",
      sub: "Dual RAG Search",
      desc: "BGE semantic search + BM25 lexical search with RRF hybrid ranking retrieve historical device evidence.",
      icon: Database,
      color: "text-amber-400",
    },
    {
      num: "04",
      title: "Reason",
      sub: "LangGraph Diagnostic Workflow",
      desc: "LangGraph coordinates multi-step agent reasoning to synthesize model signal and retrieved evidence.",
      icon: Brain,
      color: "text-purple-400",
    },
    {
      num: "05",
      title: "Act",
      sub: "Safety Recommendations",
      desc: "The system generates prioritized maintenance recommendations, timeframes, and responsible engineering roles.",
      icon: CheckSquare,
      color: "text-emerald-400",
    },
    {
      num: "06",
      title: "Review",
      sub: "Biomedical Officer Approval",
      desc: "Human biomedical engineers validate, approve, or escalate diagnostic assessments before action.",
      icon: UserCheck,
      color: "text-rose-400",
    },
  ];

  return (
    <section id="workflow" className="py-24 px-6 border-t border-[var(--border-default)]">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 mb-2 block">
            End-to-End Intelligence Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            From Prediction to Action
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-tertiary)] max-w-xl mx-auto mt-2">
            A structured 6-step clinical workflow connecting machine learning predictions to human engineering decisions.
          </p>
        </div>

        {/* 6 Step Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] hover:border-white/20 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-[var(--text-primary)] transition-colors">
                  STEP {step.num}
                </span>
                <step.icon className={`h-5 w-5 ${step.color}`} />
              </div>

              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">{step.title}</h3>
                <p className="text-[0.7rem] font-mono text-[var(--text-tertiary)]">{step.sub}</p>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-2 border-t border-[var(--border-subtle)]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
