"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#007AFF] font-bold text-[var(--text-primary)] text-xs shadow-sm">
            MC
          </div>
          <span className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
            MedteCare
          </span>
        </Link>

        {/* Center: Apple-style Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[var(--text-tertiary)]">
          <a href="#overview" className="transition-colors hover:text-[var(--text-primary)]">
            Overview
          </a>
          <a href="#workflow" className="transition-colors hover:text-[var(--text-primary)]">
            How It Works
          </a>
          <a href="#features" className="transition-colors hover:text-[var(--text-primary)]">
            Capabilities
          </a>
          <a href="#architecture" className="transition-colors hover:text-[var(--text-primary)]">
            Technology
          </a>
        </nav>

        {/* Right: Launch Command Center Pill Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/command-center"
            className="apple-pill-btn-primary px-4 py-2 text-xs flex items-center gap-1.5"
          >
            Launch Command Center
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-default)] bg-[var(--surface-1)] px-4 py-4 space-y-3 font-medium text-xs text-[var(--text-secondary)]">
          <a href="#overview" onClick={() => setMobileMenuOpen(false)} className="block py-1">
            Overview
          </a>
          <a href="#workflow" onClick={() => setMobileMenuOpen(false)} className="block py-1">
            How It Works
          </a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-1">
            Capabilities
          </a>
          <a href="#architecture" onClick={() => setMobileMenuOpen(false)} className="block py-1">
            Technology
          </a>
          <div className="pt-3 border-t border-[var(--border-default)]">
            <Link
              href="/command-center"
              onClick={() => setMobileMenuOpen(false)}
              className="apple-pill-btn-primary flex w-full items-center justify-center gap-2 px-4 py-2.5 text-xs"
            >
              Launch Command Center <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
