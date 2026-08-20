"use client";

import React, { useState } from "react";
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
  Cpu,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Separator from "@radix-ui/react-separator";

const navGroups = [
  {
    label: "Operations",
    items: [
      { href: "/command-center", label: "Command Center", icon: LayoutDashboard },
      { href: "/risk-assessment", label: "Risk Assessment", icon: ShieldAlert },
      { href: "/devices", label: "Medical Devices", icon: Server },
      { href: "/evidence", label: "Evidence & History", icon: Database },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/diagnostics", label: "Diagnostics", icon: Stethoscope },
      { href: "/recommendations", label: "Recommendations", icon: CheckSquare },
      { href: "/human-review", label: "Human Review", icon: UserCheck },
      { href: "/explainability", label: "Explainability", icon: Brain },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/architecture", label: "Architecture", icon: GitFork },
      { href: "/business", label: "Business Value", icon: Briefcase },
      { href: "/technology", label: "Tech Stack", icon: Cpu },
    ],
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState<Record<string, boolean>>({
    Operations: true,
    Intelligence: true,
    System: true,
  });

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between">
      <nav className="flex-1 overflow-y-auto px-3 pt-5 pb-2 space-y-0.5">
        {navGroups.map((group, gi) => (
          <Collapsible.Root
            key={group.label}
            open={groupOpen[group.label]}
            onOpenChange={() =>
              setGroupOpen((p) => ({ ...p, [group.label]: !p[group.label] }))
            }
          >
            {gi > 0 && (
              <Separator.Root className="my-3 h-px bg-black/[0.06]" />
            )}
            <Collapsible.Trigger className="flex w-full items-center justify-between px-2.5 py-1.5 group cursor-pointer">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)] transition-colors">
                {group.label}
              </span>
              <ChevronDown
                className={cn(
                  "h-3 w-3 text-[var(--text-tertiary)] transition-transform duration-200",
                  groupOpen[group.label] && "rotate-180"
                )}
              />
            </Collapsible.Trigger>

            <Collapsible.Content className="mt-0.5 space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[0.8rem] font-medium transition-all duration-150 group/link relative",
                      isActive
                        ? "bg-[var(--blue-accent)]/[0.08] text-[var(--blue-accent)] font-semibold"
                        : "text-[var(--text-secondary)] hover:bg-black/[0.03] hover:text-[var(--text-primary)]"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2.5px] rounded-r-full bg-[var(--blue-accent)]" />
                    )}
                    <item.icon
                      className={cn(
                        "h-[15px] w-[15px] shrink-0 transition-colors",
                        isActive
                          ? "text-[var(--blue-accent)]"
                          : "text-[var(--text-tertiary)] group-hover/link:text-[var(--text-secondary)]"
                      )}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </Collapsible.Content>
          </Collapsible.Root>
        ))}
      </nav>

      {/* Bottom status */}
      <div className="px-3 pb-4">
        <Separator.Root className="mb-3 h-px bg-black/[0.06]" />
        <div className="rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] p-3 space-y-1.5">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-[0.7rem] font-semibold text-[var(--text-primary)]">
              ML Engine Online
            </span>
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-[0.6rem] text-[var(--text-tertiary)] leading-relaxed">
            CatBoost + SHAP + LangGraph RAG
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--surface-0)] text-[var(--text-primary)]">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 flex h-[52px] items-center justify-between glass-nav px-4 md:px-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-black/[0.04] lg:hidden transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--blue-accent)] font-bold text-[var(--text-primary)] text-[0.65rem] shadow-sm">
              MC
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[0.85rem] font-semibold tracking-tight text-[var(--text-primary)]">
                MedteCare
              </span>
              <span className="text-[0.55rem] text-[var(--text-tertiary)] -mt-0.5">
                Clinical Risk Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Search */}
        <div className="mx-4 hidden flex-1 max-w-md md:block">
          <div className="relative flex items-center rounded-xl bg-[var(--surface-2)] border border-transparent px-3.5 py-[6px] focus-within:border-[var(--blue-accent)]/30 focus-within:bg-white focus-within:shadow-sm transition-all duration-200">
            <Search className="h-3.5 w-3.5 text-[var(--text-tertiary)] shrink-0 mr-2" />
            <input
              type="text"
              placeholder="Search devices, reports, assessments..."
              className="w-full bg-transparent text-[0.8rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
            />
            <kbd className="hidden rounded-md bg-white border border-[var(--border-default)] px-1.5 py-0.5 text-[0.55rem] font-mono text-[var(--text-tertiary)] lg:inline shadow-sm">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 text-[0.68rem] text-[var(--text-secondary)] bg-[var(--surface-2)] px-2.5 py-1 rounded-full border border-[var(--border-default)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>All Systems Active</span>
          </div>

          <button
            type="button"
            className="relative rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-black/[0.04] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-0.5 top-0.5 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-red-500 text-[0.5rem] font-bold text-[var(--text-primary)] ring-2 ring-white">
              3
            </span>
          </button>

          {/* User dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-2 border-l border-[var(--border-default)] pl-2.5 cursor-pointer hover:opacity-80 transition-opacity outline-none">
                <Avatar.Root className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden shadow-sm">
                  <Avatar.Fallback className="text-[0.6rem] font-bold text-[var(--text-primary)]">
                    RV
                  </Avatar.Fallback>
                </Avatar.Root>
                <div className="hidden text-left xl:block">
                  <p className="text-[0.75rem] font-semibold text-[var(--text-primary)] leading-tight">
                    Dr. Rachel Vance
                  </p>
                  <p className="text-[0.6rem] text-[var(--text-tertiary)] leading-tight">
                    Chief Biomedical Engineer
                  </p>
                </div>
                <ChevronDown className="h-3 w-3 text-[var(--text-tertiary)] hidden xl:block" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="z-[100] min-w-[200px] rounded-xl border border-[var(--border-default)] bg-white p-1.5 shadow-xl animate-fade-in-up"
                sideOffset={8}
                align="end"
              >
                <div className="px-2.5 py-2 border-b border-[var(--border-subtle)] mb-1">
                  <p className="text-xs font-semibold text-[var(--text-primary)]">Dr. Rachel Vance</p>
                  <p className="text-[0.65rem] text-[var(--text-tertiary)]">rachel.vance@medtecare.io</p>
                </div>
                <DropdownMenu.Item className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] cursor-pointer outline-none transition-colors">
                  <User className="h-3.5 w-3.5" />
                  Profile
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] cursor-pointer outline-none transition-colors">
                  <Settings className="h-3.5 w-3.5" />
                  Settings
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-px bg-[var(--border-subtle)]" />
                <DropdownMenu.Item className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-red-500 hover:bg-red-50 cursor-pointer outline-none transition-colors">
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </header>

      {/* ─── Body ─── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-[220px] lg:flex-col sidebar-surface">
          <SidebarContent />
        </aside>

        {/* Mobile Overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative z-50 w-[260px] bg-white border-r border-[var(--border-default)] flex flex-col shadow-2xl">
              <div className="flex items-center justify-between border-b border-[var(--border-default)] px-4 py-3">
                <span className="text-xs font-semibold text-[var(--text-primary)]">Navigation</span>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-black/[0.04] transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[var(--surface-0)]">
          <div className="mx-auto max-w-[1360px] p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
