"use client";

import React from "react";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingHero } from "@/components/landing/hero";
import { LandingWorkflow } from "@/components/landing/workflow";
import { LandingFeatures } from "@/components/landing/features";
import { LandingStakeholders } from "@/components/landing/stakeholders";
import { LandingEvidenceDiagram } from "@/components/landing/evidence-diagram";
import { LandingFinalCTA } from "@/components/landing/final-cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-[var(--text-primary)] selection:bg-blue-600/30 selection:text-[var(--text-primary)]">
      <LandingNavbar />
      <LandingHero />
      <LandingWorkflow />
      <LandingFeatures />
      <LandingStakeholders />
      <LandingEvidenceDiagram />
      <LandingFinalCTA />
    </main>
  );
}
