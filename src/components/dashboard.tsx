"use client";

import React, { useState, useEffect } from "react";
import { KPICard } from "@/components/dashboard/kpi-card";
import { RiskDonut } from "@/components/dashboard/risk-donut";
import { RiskTrendChart } from "@/components/dashboard/risk-trend-chart";
import { PrioritySpotlight } from "@/components/dashboard/priority-spotlight";
import { AssessmentsTable } from "@/components/dashboard/assessments-table";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import {
  kpiData,
  demoPrimaryDevice,
} from "@/lib/mock-data";
import type { Equipment, RiskDataPoint } from "@/lib/mock-data";
import { fetchDevices, fetchStats, fetchRiskTrend } from "@/lib/api";

export function Dashboard() {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [kpis, setKpis] = useState(kpiData);
  const [riskTrend, setRiskTrend] = useState<RiskDataPoint[]>([]);

  useEffect(() => {
    Promise.allSettled([fetchDevices(20), fetchStats(), fetchRiskTrend()]).then(
      ([devRes, statsRes, trendRes]) => {
        if (devRes.status === "fulfilled" && devRes.value && devRes.value.length > 0) {
          setEquipmentList(devRes.value);
        }
        if (statsRes.status === "fulfilled" && statsRes.value) {
          const s = statsRes.value;
          setKpis((prev) =>
            prev.map((k) => {
              if (k.label === "Total Devices Assessed" && s.totalDevices)
                return { ...k, value: s.totalDevices };
              if (k.label === "High & Critical Risk Devices" && s.devicesAtRisk)
                return { ...k, value: s.devicesAtRisk };
              if (k.label === "Critical Reviews Required" && s.predictedFailures30d)
                return { ...k, value: s.predictedFailures30d };
              return k;
            })
          );
        }
        if (trendRes.status === "fulfilled" && trendRes.value && trendRes.value.length > 0) {
          setRiskTrend(trendRes.value);
        }
      }
    );
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
            Command Center
          </h1>
          <p className="text-[0.8rem] text-[var(--text-secondary)] mt-0.5">
            Clinical device risk intelligence • Real-time monitoring
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <KPICard key={kpi.label} data={kpi} index={i} />
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <RiskDonut />
        </div>
        <div className="lg:col-span-8">
          <RiskTrendChart data={riskTrend} />
        </div>
      </div>

      <PrioritySpotlight device={demoPrimaryDevice} />

      <div className="grid gap-5 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <AssessmentsTable equipment={equipmentList} />
        </div>
        <div className="lg:col-span-4">
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
