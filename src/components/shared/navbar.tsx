"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell, Search, Menu, ShieldCheck, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onMenuToggle?: () => void;
  className?: string;
}

export function Navbar({ onMenuToggle, className }: NavbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-14 items-center justify-between border-b border-slate-800 bg-[#070D1B] px-4 md:px-6",
        className
      )}
    >
      {/* Left: menu toggle + logo */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuToggle}
          className="rounded-md p-1.5 text-[var(--text-tertiary)] hover:bg-slate-800 hover:text-slate-100 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 font-bold text-[var(--text-primary)] text-xs">
            M
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-extrabold tracking-wider text-slate-100 uppercase">
              MEDTECARE
            </span>
            <span className="text-[0.6rem] font-medium text-[var(--text-tertiary)]">
              Medical Device Safety & Risk Intelligence
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Search */}
      <div className="mx-4 hidden flex-1 max-w-md md:block">
        <div
          className={cn(
            "relative flex items-center rounded border border-slate-800 bg-slate-900/80 transition-colors",
            searchFocused && "border-blue-600/50 bg-slate-900"
          )}
        >
          <Search className="ml-3 h-3.5 w-3.5 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Search device by ID (e.g. DEV-88401), classification, manufacturer..."
            className="w-full bg-transparent px-2.5 py-1.5 text-xs text-slate-700 placeholder:text-slate-500 focus:outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="mr-2.5 hidden rounded border border-slate-700 bg-slate-800 px-1 py-0.5 text-[0.55rem] font-mono text-[var(--text-tertiary)] lg:inline">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: User / Notifications */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 text-[0.65rem] text-[var(--text-tertiary)] border border-slate-800 bg-slate-900 px-2.5 py-1 rounded">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
          <span>Squad A + Squad B + Squad C Active</span>
        </div>

        <button
          type="button"
          className="relative rounded-md p-1.5 text-[var(--text-tertiary)] hover:bg-slate-800 hover:text-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 flex h-3 w-3 items-center justify-center rounded-full bg-rose-600 text-[0.5rem] font-bold text-[var(--text-primary)]">
            2
          </span>
        </button>

        <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-slate-800 text-xs font-bold text-blue-600 border border-slate-700">
            RV
          </div>
          <div className="hidden text-left xl:block">
            <p className="text-xs font-semibold text-slate-700">Dr. Rachel Vance</p>
            <p className="text-[0.6rem] text-[var(--text-tertiary)]">Chief Biomedical Engineer</p>
          </div>
        </div>
      </div>
    </header>
  );
}
