"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ExternalLink, ArrowUpRight } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import type { Equipment } from "@/lib/mock-data";

export function AssessmentsTable({ equipment }: { equipment: Equipment[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.55 }}
      className="card-elevated p-5"
    >
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-4">
        <div>
          <h3 className="text-[0.8rem] font-semibold text-[var(--text-primary)]">
            Recent Assessments
          </h3>
          <p className="text-[0.68rem] text-[var(--text-tertiary)] mt-0.5">
            CatBoost ML + LangGraph RAG Agent
          </p>
        </div>
        <Link
          href="/diagnostics"
          className="text-xs font-semibold text-[var(--blue-accent)] hover:underline inline-flex items-center gap-1"
        >
          View All
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-[0.6rem] uppercase font-mono text-[var(--text-tertiary)] border-b border-[var(--border-subtle)]">
              <th className="py-2.5 px-3 font-semibold">Device ID</th>
              <th className="py-2.5 px-3 font-semibold">Device Name</th>
              <th className="py-2.5 px-3 font-semibold">Manufacturer</th>
              <th className="py-2.5 px-3 font-semibold">Risk Score</th>
              <th className="py-2.5 px-3 font-semibold">Signal</th>
              <th className="py-2.5 px-3 font-semibold">Evidence</th>
              <th className="py-2.5 px-3 font-semibold">Priority</th>
              <th className="py-2.5 px-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {equipment.map((eq, idx) => {
              const scoreColor =
                eq.riskScore >= 80 ? "#ef4444"
                : eq.riskScore >= 60 ? "#f97316"
                : eq.riskScore >= 30 ? "#f59e0b"
                : "#10b981";

              return (
                <motion.tr
                  key={eq.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + idx * 0.04 }}
                  className="group hover:bg-[var(--surface-2)]/60 transition-colors duration-150"
                >
                  <td className="py-3 px-3 font-mono font-semibold text-[var(--blue-accent)]">
                    {eq.id}
                  </td>
                  <td className="py-3 px-3 font-medium text-[var(--text-primary)]">
                    {eq.name}
                  </td>
                  <td className="py-3 px-3 text-[var(--text-tertiary)]">
                    {eq.manufacturer || "—"}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-xs" style={{ color: scoreColor }}>
                        {eq.riskScore}
                      </span>
                      <div className="h-1.5 w-14 rounded-full bg-[var(--surface-3)] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: scoreColor }}
                          initial={{ width: 0 }}
                          animate={{ width: `${eq.riskScore}%` }}
                          transition={{ duration: 0.8, delay: 0.7 + idx * 0.04 }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[var(--text-secondary)] text-[0.7rem]">
                    {eq.riskScore >= 70 ? "Elevated Future Event" : "Normal Range"}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-[var(--surface-2)] px-2 py-0.5 text-[0.6rem] border border-[var(--border-default)] text-[var(--text-tertiary)]">
                      <FileText className="h-3 w-3" />
                      2 KB
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <StatusBadge variant={eq.status}>{eq.status}</StatusBadge>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href="/diagnostics"
                      className="text-[0.7rem] font-semibold text-[var(--blue-accent)] hover:underline opacity-50 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1"
                    >
                      Open <ExternalLink className="h-3 w-3" />
                    </Link>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
