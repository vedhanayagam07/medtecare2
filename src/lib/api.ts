// ============================================
// MEDTECARE — CENTRALIZED API CLIENT
// All backend communication goes through here.
// Falls back gracefully so UI never crashes.
// ============================================

import type {
  Equipment,
  Alert,
  MaintenanceTicket,
  KPIData,
  RiskDataPoint,
} from "@/lib/mock-data";

import {
  equipmentList,
  kpiData,
  riskTrendData,
} from "@/lib/mock-data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface DeviceStatsResponse {
  totalDevices: number;
  devicesAtRisk: number;
  predictedFailures30d: number;
  avgRiskScore: number;
}

export interface DiagnosticResultResponse {
  equipment_id: string;
  equipment_type: string;
  risk_score: number;
  predicted_failure: string;
  diagnosis: string;
  probable_root_causes: { cause: string; likelihood: number; description: string }[];
  evidence: { type: string; description: string; source: string; confidence: number }[];
  historical_context: Record<string, unknown>[];
  explanation: string;
  recommended_actions: { step: number; title: string; description: string; timeframe: string; urgency: string }[];
  maintenance_priority: string;
  confidence: number;
  citations: string[];
  requires_human_review: boolean;
  errors: string[];
}

// ---- Fetch helpers with graceful error handling ----

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });
    if (!res.ok) {
      console.error(`API ${path} returned ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`API ${path} fetch failed:`, err);
    return null;
  }
}

// ---- Public API functions ----

/** Fetch real devices from ML service, fallback to mock data */
export async function fetchDevices(limit = 20): Promise<Equipment[]> {
  const data = await apiFetch<{ devices: Equipment[] }>(`/api/v1/devices?limit=${limit}`);
  if (!data || !data.devices || data.devices.length === 0) {
    return equipmentList.slice(0, limit);
  }
  return data.devices;
}

/** Simulate a live telemetry spike on a random device */
export async function simulateLiveData(): Promise<{ message: string, device: Equipment } | null> {
  return apiFetch<{ message: string, device: Equipment }>(`/api/v1/devices/simulate-live`, { method: "POST" });
}

/** Fetch KPI stats computed from full dataset, fallback to mock data */
export async function fetchStats(): Promise<DeviceStatsResponse | null> {
  const data = await apiFetch<DeviceStatsResponse>("/api/v1/devices/stats");
  if (!data) {
    return {
      totalDevices: kpiData[0].value,
      devicesAtRisk: kpiData[1].value,
      predictedFailures30d: kpiData[2].value,
      avgRiskScore: 45,
    };
  }
  return data;
}

/** Fetch ML-derived alerts */
export async function fetchAlerts(): Promise<Alert[]> {
  const data = await apiFetch<{ alerts: Alert[] }>("/api/v1/alerts");
  return data?.alerts ?? [];
}

/** Fetch ML-derived maintenance tickets */
export async function fetchTickets(): Promise<MaintenanceTicket[]> {
  const data = await apiFetch<{ tickets: MaintenanceTicket[] }>("/api/v1/tickets");
  return data?.tickets ?? [];
}

/** Update ticket status */
export async function updateTicketStatus(
  ticketId: string,
  status: "open" | "in-progress" | "resolved"
): Promise<boolean> {
  const data = await apiFetch<{ updated: boolean }>(`/api/v1/tickets/${ticketId}/status`, {
    method: "POST",
    body: JSON.stringify({ status }),
  });
  return data?.updated ?? false;
}

/** Fetch 30-day risk trend data, fallback to mock data */
export async function fetchRiskTrend(): Promise<RiskDataPoint[]> {
  const data = await apiFetch<{ trend: RiskDataPoint[] }>("/api/v1/risk-trend");
  if (!data || !data.trend || data.trend.length === 0) {
    return riskTrendData;
  }
  return data.trend;
}

/** Run AI diagnostics on a device */
export async function runDiagnosticsAPI(
  deviceId: string
): Promise<DiagnosticResultResponse> {
  const res = await fetch(`${API_BASE}/api/v1/diagnose`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ device_id: deviceId }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      errData?.error?.message || errData?.detail || `Diagnostic API failed (${res.status})`
    );
  }

  return (await res.json()) as DiagnosticResultResponse;
}

/** Check if backend is healthy */
export async function checkHealth(): Promise<boolean> {
  const data = await apiFetch<{ status: string }>("/health");
  return data?.status === "ok";
}
