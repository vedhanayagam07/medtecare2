"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Bot, ShieldCheck, Stethoscope, ChevronRight } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";

// ---- Landing Navbar ----

export function LandingNav() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-[#070A11]/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-sky-500 font-bold text-[var(--text-primary)] text-xs shadow-md shadow-blue-500/20">
            MC
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-100">
            MedTec<span className="text-sky-400">Care</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-xs font-medium text-[var(--text-tertiary)] transition-colors hover:text-slate-100">
            Clinical Features
          </a>
          <a href="#platform" className="text-xs font-medium text-[var(--text-tertiary)] transition-colors hover:text-slate-100">
            Telemetry Architecture
          </a>
          <a href="#compliance" className="text-xs font-medium text-[var(--text-tertiary)] transition-colors hover:text-slate-100">
            ISO 13485 Compliance
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden rounded-lg border border-[var(--border-default)] bg-slate-900/60 px-4 py-2 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-sky-500/30 hover:text-[var(--text-primary)] sm:inline-flex"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-2 text-xs font-semibold text-[var(--text-primary)] shadow-md shadow-blue-600/20 transition-all hover:shadow-lg hover:shadow-blue-500/30"
          >
            Launch Command Center
          </Link>
        </div>
      </nav>
    </header>
  );
}

// ---- Hero Content ----

export function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center pt-32 pb-16 text-center px-6">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />

      {/* Compliance Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 backdrop-blur-md"
      >
        <ShieldCheck className="h-4 w-4 text-sky-400" />
        <span className="text-[0.7rem] font-semibold tracking-wider text-sky-300 uppercase">
          FDA UDI & ISO 13485 Compliant Medical Telemetry
        </span>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-4xl space-y-3 mb-6"
      >
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl text-slate-100">
          Clinical Device Intelligence &{" "}
          <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
            Predictive AI Failure Prevention
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-10 max-w-2xl text-sm text-[var(--text-tertiary)] sm:text-base leading-relaxed"
      >
        Continuous real-time telemetry analysis for ICU ventilators, MRI magnets, and critical hospital assets. Powered by{" "}
        <span className="text-slate-700 font-medium">CatBoost ML anomaly detection</span> and{" "}
        <span className="text-slate-700 font-medium">LangGraph multi-agent RAG reasoning</span>.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-col items-center gap-4 sm:flex-row"
      >
        <Link href="/dashboard">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-7 py-3.5 text-sm font-semibold text-[var(--text-primary)] shadow-xl shadow-blue-600/25 transition-all hover:shadow-sky-500/35"
          >
            Enter Command Center
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </Link>

        <Link href="/dashboard/diagnostics">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2.5 rounded-xl border border-[var(--border-default)] bg-slate-900/60 px-7 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur-xl transition-all hover:border-sky-500/30 hover:bg-slate-800/80"
          >
            <Activity className="h-4 w-4 text-sky-400" />
            Explore AI Diagnostics
          </motion.button>
        </Link>
      </motion.div>

      {/* High-Fidelity Dashboard Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative mx-auto mt-14 w-full max-w-5xl"
      >
        <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[#0B101D] shadow-2xl shadow-black/80 backdrop-blur-2xl">
          {/* Chrome topbar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-slate-950/80 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-[0.7rem] font-mono text-[var(--text-tertiary)]">
                medtecare.hospital/command-center
              </span>
            </div>
            <div className="flex items-center gap-2 text-[0.65rem] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              1,420 Telemetry Feeds Active
            </div>
          </div>

          {/* Mini Dashboard Content */}
          <div className="p-5 text-left space-y-4">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Monitored Devices", value: "1,420", sub: "ICU & Radiology", color: "text-slate-100" },
                { label: "Elevated Risk", value: "14", sub: "Score > 40%", color: "text-amber-400" },
                { label: "Predicted Failure (30d)", value: "3", sub: "Critical Anomaly", color: "text-rose-400" },
                { label: "Fleet Health Index", value: "98.2%", sub: "+1.4% vs baseline", color: "text-emerald-400" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-white/[0.08] bg-slate-900/60 p-3.5">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                    {item.label}
                  </p>
                  <p className={`text-xl font-bold mt-1 ${item.color}`}>{item.value}</p>
                  <p className="text-[0.6rem] text-slate-500 mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Simulated Live Device Rows */}
            <div className="rounded-lg border border-white/[0.08] bg-slate-900/40 p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[0.65rem] font-semibold text-[var(--text-tertiary)] border-b border-[var(--border-subtle)] pb-2">
                <span>DEVICE / MODEL</span>
                <span>LOCATION</span>
                <span>TELEMETRY METRICS</span>
                <span>RISK SCORE</span>
              </div>

              {[
                {
                  name: "Ventilator Draeger V800",
                  id: "UDI-9842-ICU",
                  loc: "St. Jude — ICU Room 4",
                  metric: "O2 Flow: 42 L/min | Temp: 37.8°C",
                  risk: "18%",
                  status: "Healthy",
                  color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                },
                {
                  name: "Siemens Magnetom MRI 3T",
                  id: "UDI-3301-RAD",
                  loc: "Mayo Clinic — Bay 2",
                  metric: "Cryo Pressure: 4.2 Bar | Helium: 98%",
                  risk: "74%",
                  status: "Elevated Risk",
                  color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                },
              ].map((row) => (
                <div
                  key={row.id}
                  className="flex items-center justify-between text-xs py-2 px-2.5 rounded bg-slate-900/60 border border-white/[0.04]"
                >
                  <div>
                    <p className="font-semibold text-slate-700">{row.name}</p>
                    <p className="text-[0.6rem] font-mono text-slate-500">{row.id}</p>
                  </div>
                  <span className="text-[0.7rem] text-[var(--text-tertiary)]">{row.loc}</span>
                  <span className="text-[0.7rem] font-mono text-[var(--text-secondary)]">{row.metric}</span>
                  <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded border ${row.color}`}>
                    {row.risk} — {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ---- Feature Cards ----

const features = [
  {
    icon: Activity,
    title: "Continuous Telemetry Analysis",
    description:
      "CatBoost ML models evaluate real-time sensor streams (SpO2, pressure gradients, temperature, vibration) to detect micro-anomalies.",
  },
  {
    icon: Bot,
    title: "Autonomous RAG Reasoning",
    description:
      "LangGraph diagnostic agents cross-reference OEM service manuals, clinical maintenance databases, and sensor logs to determine root cause.",
  },
  {
    icon: Stethoscope,
    title: "Clinical Asset Optimization",
    description:
      "Unified hospital command center predicting device component failures up to 30 days before critical clinical disruption.",
  },
  {
    icon: ShieldCheck,
    title: "Biomedical Engineer Dispatch",
    description:
      "Field technicians receive instant work orders with exact manual citations, replacement part inventory, and step-by-step repair guidance.",
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="eyebrow text-sky-400 mb-2">CLINICAL ENGINE CAPABILITIES</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">
            Proactive Equipment Safety & Zero Downtime
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-[var(--text-tertiary)]">
            Designed for healthcare hospital networks and biomedical engineering teams to ensure clinical safety compliance.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <GlassCard className="h-full group">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:bg-sky-500/20">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-slate-700">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--text-tertiary)]">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

