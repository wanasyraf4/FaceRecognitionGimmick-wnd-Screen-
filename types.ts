
export enum AnalysisStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  FINALIZING = 'FINALIZING',
  APPROVAL = 'APPROVAL',
  GENERATING = 'GENERATING',
  ONBOARDING = 'ONBOARDING',
  COMPLETE = 'COMPLETE',
}

export enum StepStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETE = 'COMPLETE',
}

export interface ScanStep {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
}

export interface RiskReport {
  kycStatus: string;
  worldCheckMatches: number;
  amlScore: number; // 0-100
  narrative: string;
}