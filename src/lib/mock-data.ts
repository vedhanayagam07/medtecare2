// ============================================
// MEDTECARE — REALISTIC DEMO DATA & TYPES
// Strictly matches DATA/medical_device_ml_dataset.csv schema
// ============================================

export type EquipmentStatus = "low" | "moderate" | "high" | "critical";
export type AlertSeverity = "low" | "medium" | "high" | "critical";
export type AlertStatus = "open" | "acknowledged" | "resolved";
export type TicketStatus = "open" | "in-progress" | "resolved";
export type TicketPriority = "low" | "medium" | "high" | "critical";

export interface SensorReading {
  name: string;
  value: number;
  unit: string;
  normalRange: [number, number];
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  classification?: string;
  riskClass?: string;
  manufacturer?: string;
  country?: string;
  yearsInService?: number;
  previousEvents?: number;
  previousRecalls?: number;
  previousSafetyNotices?: number;
  location: string;
  riskScore: number;
  status: EquipmentStatus;
  lastUpdated: string;
  confidencePercent: number;
  sensorReadings: SensorReading[];
  imageUrl?: string;
}

export interface Alert {
  id: string;
  equipmentId: string;
  equipmentName: string;
  riskDriver: string;
  severity: AlertSeverity;
  timestamp: string;
  status: AlertStatus;
  assignedTo?: string;
}

export interface RiskDataPoint {
  date: string;
  score: number;
  predicted: number;
}

export interface Technician {
  id: string;
  name: string;
  avatar: string;
  assignedTickets: number;
  location: string;
  specialty: string;
}

export interface MaintenanceTicket {
  id: string;
  equipmentId: string;
  equipmentName: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTechnician?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  direction: "positive" | "negative";
}

export interface DiagnosticMessage {
  role: "agent" | "system";
  content: string;
  timestamp: string;
}

export interface ManualReference {
  id: string;
  title: string;
  section: string;
  excerpt: string;
  relevance: number;
}

export interface KPIData {
  label: string;
  value: number;
  change: number;
  changeLabel: string;
  sparkline: number[];
  prefix?: string;
  suffix?: string;
}

// ---- DEMO DATA (Labeled Demo Dataset Records) ----

export const kpiData: KPIData[] = [
  {
    label: "Total Devices Assessed",
    value: 1250,
    change: 0,
    changeLabel: "Historical Dataset Records",
    sparkline: [1200, 1210, 1225, 1240, 1250],
  },
  {
    label: "High & Critical Risk Devices",
    value: 14,
    change: 0,
    changeLabel: "Risk Score > 60 / 100",
    sparkline: [18, 16, 15, 14],
  },
  {
    label: "Critical Reviews Required",
    value: 3,
    change: 0,
    changeLabel: "CatBoost Risk Prob > 0.80",
    sparkline: [5, 4, 3],
  },
  {
    label: "Pending Human Review",
    value: 4,
    change: 0,
    changeLabel: "Awaiting Biomedical Engineer Approval",
    sparkline: [6, 5, 4],
  },
];

export const demoPrimaryDevice: Equipment = {
  id: "DEV-88401",
  name: "Smart Infusion Pump System",
  type: "Volumetric Infusion Pump",
  classification: "Active Infusion Equipment",
  riskClass: "Class IIb",
  manufacturer: "B. Braun Melsungen AG",
  country: "Germany",
  yearsInService: 4.5,
  previousEvents: 3,
  previousRecalls: 1,
  previousSafetyNotices: 2,
  location: "St. Jude Hospital — ICU Suite B",
  riskScore: 87,
  status: "critical",
  lastUpdated: new Date().toISOString(),
  confidencePercent: 94,
  sensorReadings: [
    { name: "Years in Service", value: 4.5, unit: "yrs", normalRange: [0, 5] },
    { name: "Previous Recalls", value: 1, unit: "count", normalRange: [0, 0] },
    { name: "Safety Notices", value: 2, unit: "count", normalRange: [0, 1] },
    { name: "Adverse Events", value: 3, unit: "count", normalRange: [0, 1] },
  ],
};

export const equipmentList: Equipment[] = [
  demoPrimaryDevice,
  {
    id: "DEV-33019",
    name: "Siemens Magnetom MRI 3T",
    type: "Magnetic Resonance Imaging System",
    classification: "Diagnostic Imaging Equipment",
    riskClass: "Class IIb",
    manufacturer: "Siemens Healthcare GmbH",
    country: "Germany",
    yearsInService: 6.2,
    previousEvents: 2,
    previousRecalls: 1,
    previousSafetyNotices: 1,
    location: "Mayo Clinic — Radiology Bay 2",
    riskScore: 74,
    status: "high",
    lastUpdated: new Date(Date.now() - 3600000).toISOString(),
    confidencePercent: 89,
    sensorReadings: [
      { name: "Years in Service", value: 6.2, unit: "yrs", normalRange: [0, 7] },
      { name: "Previous Recalls", value: 1, unit: "count", normalRange: [0, 0] },
      { name: "Safety Notices", value: 1, unit: "count", normalRange: [0, 1] },
    ],
  },
  {
    id: "DEV-10492",
    name: "Draeger Evita V800 Ventilator",
    type: "Intensive Care Ventilator",
    classification: "Life Support Respirator",
    riskClass: "Class III",
    manufacturer: "Draegerwerk AG",
    country: "Germany",
    yearsInService: 3.1,
    previousEvents: 0,
    previousRecalls: 0,
    previousSafetyNotices: 1,
    location: "Johns Hopkins — Critical Care Ward",
    riskScore: 42,
    status: "moderate",
    lastUpdated: new Date(Date.now() - 7200000).toISOString(),
    confidencePercent: 91,
    sensorReadings: [
      { name: "Years in Service", value: 3.1, unit: "yrs", normalRange: [0, 5] },
      { name: "Previous Recalls", value: 0, unit: "count", normalRange: [0, 0] },
      { name: "Safety Notices", value: 1, unit: "count", normalRange: [0, 1] },
    ],
  },
  {
    id: "DEV-49201",
    name: "Fresenius 6008 Dialysis Machine",
    type: "Hemodialysis System",
    classification: "Extracorporeal Therapy Equipment",
    riskClass: "Class IIb",
    manufacturer: "Fresenius Medical Care",
    country: "Germany",
    yearsInService: 2.4,
    previousEvents: 0,
    previousRecalls: 0,
    previousSafetyNotices: 0,
    location: "Cleveland Clinic — Nephrology Wing",
    riskScore: 18,
    status: "low",
    lastUpdated: new Date(Date.now() - 14400000).toISOString(),
    confidencePercent: 96,
    sensorReadings: [
      { name: "Years in Service", value: 2.4, unit: "yrs", normalRange: [0, 5] },
      { name: "Previous Recalls", value: 0, unit: "count", normalRange: [0, 0] },
      { name: "Safety Notices", value: 0, unit: "count", normalRange: [0, 1] },
    ],
  },
];

export const alertsList: Alert[] = [
  {
    id: "ALT-901",
    equipmentId: "DEV-88401",
    equipmentName: "Smart Infusion Pump System",
    riskDriver: "Previous Recalls & Safety Notices Accumulation",
    severity: "critical",
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    status: "open",
    assignedTo: "Biomedical Engineering Unit",
  },
  {
    id: "ALT-902",
    equipmentId: "DEV-33019",
    equipmentName: "Siemens Magnetom MRI 3T",
    riskDriver: "High Service Age (6.2 yrs) & Safety Notice Drift",
    severity: "high",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: "open",
    assignedTo: "Radiology Maintenance Team",
  },
];

export const riskTrendData: RiskDataPoint[] = [
  { date: "Baseline", score: 28, predicted: 30 },
  { date: "Q1", score: 32, predicted: 34 },
  { date: "Q2", score: 35, predicted: 38 },
  { date: "Q3", score: 41, predicted: 45 },
  { date: "Q4", score: 48, predicted: 52 },
];

export const featureImportanceData: FeatureImportance[] = [
  { feature: "Previous Recalls", importance: 0.42, direction: "positive" },
  { feature: "Previous Safety Notices", importance: 0.28, direction: "positive" },
  { feature: "Years in Service", importance: 0.15, direction: "positive" },
  { feature: "Previous Adverse Events", importance: 0.10, direction: "positive" },
  { feature: "Risk Classification (Class IIb)", importance: 0.05, direction: "positive" },
];

export const diagnosticMessages: DiagnosticMessage[] = [
  {
    role: "system",
    content: "CatBoost Model Signal: High future-event risk (0.87). Initiating Squad B LangGraph RAG reasoning workflow.",
    timestamp: new Date().toISOString(),
  },
  {
    role: "agent",
    content: `## Diagnostic Model Signal
CatBoost ML model predicts an elevated future-event risk (Score: 87 / 100).

## Key Contributors (SHAP Explainability)
- **Previous Recalls (+0.42)**: Device model family has 1 registered recall.
- **Previous Safety Notices (+0.28)**: 2 field safety notices registered in database.
- **Years in Service (+0.15)**: Device age (4.5 years) approaches typical major overhaul lifecycle.

## Retrieved Historical Evidence
Relevant infusion pump safety records were retrieved from the Medical Device Global Safety Database via BGE + BM25 RRF hybrid search.

## Evidence Limitation Notice
*Retrieved historical safety records provide historical context and may not directly correspond to this exact individual physical unit.*`,
    timestamp: new Date().toISOString(),
  },
];

export const manualReferences: ManualReference[] = [
  {
    id: "cite-1",
    title: "Infusomat Volumetric Infusion Pump Safety Guide",
    section: "Medical Device Global Safety Database",
    excerpt: "HISTORICAL_EVIDENCE: Infusomat volumetric infusion pump records indicate occlusion pressure sensor calibration requirements after 4+ years of service.",
    relevance: 1.0,
  },
  {
    id: "cite-2",
    title: "Argus Infusion Pump Field Inspection Manual",
    section: "Global Maintenance Knowledge Base",
    excerpt: "HISTORICAL_EVIDENCE: Battery cycle degradation and safety notice verification protocol for Class IIb active infusion devices.",
    relevance: 0.9334,
  },
];

export const ticketsList: MaintenanceTicket[] = [
  {
    id: "TCK-881",
    equipmentId: "DEV-88401",
    equipmentName: "Smart Infusion Pump System (DEV-88401)",
    title: "Safety & Operational Audit Inspection",
    description: "Audit safety notices, verify occlusion pressure calibration, and check battery health cycle following CatBoost high-risk assessment.",
    priority: "critical",
    status: "open",
    assignedTechnician: "Marcus Chen, Lead Biomedical Engineer",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const techniciansList: Technician[] = [
  {
    id: "TECH-01",
    name: "Marcus Chen",
    avatar: "MC",
    assignedTickets: 3,
    location: "St. Jude Hospital — Biomedical Dept",
    specialty: "Active Infusion & Critical Care Equipment",
  },
];

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
