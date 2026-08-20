"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldAlert,
  Server,
  Database,
  Stethoscope,
  CheckSquare,
  UserCheck,
  Brain,
  GitFork,
  Briefcase,
  X,
  Settings,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/risk-assessment", label: "Risk Assessment", icon: ShieldAlert },
  { href: "/dashboard/fleet", label: "Medical Devices", icon: Server },
  { href: "/dashboard/evidence", label: "Evidence & History", icon: Database },
  { href: "/dashboard/diagnostics", label: "Diagnostics", icon: Stethoscope },
  { href: "/dashboard/recommendations", label: "Recommendations", icon: CheckSquare },
  { href: "/dashboard/human-review", label: "Human Review Queue", icon: UserCheck },
  { href: "/dashboard/explainability", label: "Model Explainability", icon: Brain },
  { href: "/dashboard/architecture", label: "System Architecture", icon: GitFork },
  { href: "/dashboard/business-value", label: "Business Value", icon: Briefcase },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const content = (
    <div className="flex flex-col h-full justify-between p-3">
      <nav className="flex flex-col gap-0.5">
        <div className="mb-2 px-2 py-1">
          <p className="text-[0.6rem] font-bold uppercase tracking-wider text-slate-500">
            Platform Navigation
          </p>
        </div>

        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-2.5 rounded px-2.5 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "bg-blue-600/15 text-blue-600 font-semibold border-l-2 border-blue-500"
                  : "text-[var(--text-tertiary)] hover:bg-slate-800/60 hover:text-slate-700"
              )}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-blue-600" : "text-slate-500")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer: System Status */}
      <div className="mt-auto border-t border-slate-800 pt-3 px-2 text-left">
        <div className="rounded bg-slate-900 border border-slate-800 p-2.5 space-y-1">
          <div className="flex items-center justify-between text-[0.65rem] font-semibold text-[var(--text-secondary)]">
            <span>Project Dataset</span>
            <span className="font-mono text-emerald-400">Squad A/B/C</span>
          </div>
          <p className="text-[0.6rem] text-slate-500">
            CatBoost ML + SHAP + LangGraph RAG Engine
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-56 lg:flex-col lg:border-r lg:border-slate-800 lg:bg-[#070D1B]">
        {content}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/80 lg:hidden"
            onClick={onClose}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-60 border-r border-slate-800 bg-[#070D1B] lg:hidden">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-100">
                MEDTECARE
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded p-1 text-[var(--text-tertiary)] hover:bg-slate-800"
                aria-label="Close sidebar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {content}
          </aside>
        </>
      )}
    </>
  );
}
