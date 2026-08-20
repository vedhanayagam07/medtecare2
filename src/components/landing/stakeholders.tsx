"use client";

import React from "react";
import { Building2, Stethoscope, Wrench, Factory, Server } from "lucide-react";

export function LandingStakeholders() {
  const stakeholders = [
    {
      title: "Hospitals & Health Systems",
      desc: "Reduce clinical equipment downtime and mitigate patient safety risk events.",
      icon: Building2,
    },
    {
      title: "Biomedical Engineering",
      desc: "Access evidence-backed diagnostic reports and transparent SHAP risk drivers.",
      icon: Stethoscope,
    },
    {
      title: "Clinical Engineering Safety",
      desc: "Prioritize maintenance schedules based on machine learning probability scores.",
      icon: Wrench,
    },
    {
      title: "Medical Device Manufacturers",
      desc: "Analyze post-market safety trends and recall impact signals.",
      icon: Factory,
    },
    {
      title: "Healthcare Asset Management",
      desc: "Optimize capital replacement cycles using empirical device risk data.",
      icon: Server,
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-[var(--border-default)] bg-[#050505]">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 mb-2 block">
            Target Stakeholders
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Built for Medical Device Safety Teams
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-tertiary)] max-w-xl mx-auto mt-2">
            Designed to support clinical risk decision workflows across healthcare infrastructure.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {stakeholders.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] space-y-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/[0.02] border border-[var(--border-default)]">
                <item.icon className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">{item.title}</h3>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
