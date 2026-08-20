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
    <main className="min-h-screen bg-[var(--surface-0)] relative overflow-hidden text-[var(--text-primary)] selection:bg-blue-600/30">
      {/* Premium ambient background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 blur-[100px] rounded-full -z-10" />
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
