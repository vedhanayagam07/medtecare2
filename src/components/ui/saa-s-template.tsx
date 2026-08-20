"use client";

import React from "react";

// Inline Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "gradient";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className = "", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-white text-black hover:bg-gray-100",
      secondary: "bg-gray-800 text-[var(--text-primary)] hover:bg-gray-700",
      ghost: "hover:bg-gray-800/50 text-[var(--text-primary)]",
      gradient:
        "bg-gradient-to-b from-white via-white/95 to-white/60 text-black hover:scale-105 active:scale-95",
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-10 px-5 text-sm",
      lg: "h-12 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Icons
const ArrowRight = ({ className = "", size = 16 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const Menu = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const X = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// Navigation Component
const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-[var(--text-primary)]">Medtecare</div>

          <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="/dashboard" className="text-sm text-[var(--text-primary)]/60 hover:text-[var(--text-primary)] transition-colors">
              Overview
            </a>
            <a href="/dashboard/risk-assessment" className="text-sm text-[var(--text-primary)]/60 hover:text-[var(--text-primary)] transition-colors">
              Risk Assessment
            </a>
            <a href="/dashboard/diagnostics" className="text-sm text-[var(--text-primary)]/60 hover:text-[var(--text-primary)] transition-colors">
              Diagnostics
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="/dashboard">
              <Button type="button" variant="ghost" size="sm">
                Dashboard
              </Button>
            </a>
            <a href="/dashboard/risk-assessment">
              <Button type="button" variant="default" size="sm">
                Run Assessment
              </Button>
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-[var(--text-primary)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800/50">
          <div className="px-6 py-4 flex flex-col gap-4">
            <a
              href="/dashboard"
              className="text-sm text-[var(--text-primary)]/60 hover:text-[var(--text-primary)] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Overview
            </a>
            <a
              href="/dashboard/risk-assessment"
              className="text-sm text-[var(--text-primary)]/60 hover:text-[var(--text-primary)] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Risk Assessment
            </a>
            <a
              href="/dashboard/diagnostics"
              className="text-sm text-[var(--text-primary)]/60 hover:text-[var(--text-primary)] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Diagnostics
            </a>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-800/50">
              <a href="/dashboard">
                <Button type="button" variant="ghost" size="sm" className="w-full">
                  Dashboard
                </Button>
              </a>
              <a href="/dashboard/risk-assessment">
                <Button type="button" variant="default" size="sm" className="w-full">
                  Run Assessment
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

Navigation.displayName = "Navigation";

// Hero Component
const Hero = React.memo(() => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start px-6 py-20 md:py-24">
      <aside className="mb-8 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm max-w-full">
        <span className="text-xs text-center whitespace-nowrap" style={{ color: "#9ca3af" }}>
          Medtecare ML Risk Intelligence v2.0
        </span>
        <a
          href="/dashboard/architecture"
          className="flex items-center gap-1 text-xs hover:text-[var(--text-primary)] transition-all active:scale-95 whitespace-nowrap"
          style={{ color: "#9ca3af" }}
          aria-label="Read more about system architecture"
        >
          View Architecture
          <ArrowRight size={12} />
        </a>
      </aside>

      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-medium text-center max-w-3xl px-6 leading-tight mb-6"
        style={{
          background: "linear-gradient(to bottom, #ffffff, #ffffff, rgba(255, 255, 255, 0.6))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.05em",
        }}
      >
        Medical Device Safety <br />& Risk Intelligence
      </h1>

      <p className="text-sm md:text-base text-center max-w-2xl px-6 mb-10" style={{ color: "#9ca3af" }}>
        CatBoost machine learning risk scoring, SHAP explainability drivers, and LangGraph RAG diagnostic reasoning for clinical engineering teams.
      </p>

      <div className="flex items-center gap-4 relative z-10 mb-16">
        <a href="/dashboard">
          <Button
            type="button"
            variant="gradient"
            size="lg"
            className="rounded-lg flex items-center justify-center"
            aria-label="Launch Clinical Command Center"
          >
            Launch Command Center
          </Button>
        </a>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

// Main Component
export default function Component() {
  return (
    <main className="min-h-screen bg-white text-[var(--text-primary)]">
      <Navigation />
      <Hero />
    </main>
  );
}
