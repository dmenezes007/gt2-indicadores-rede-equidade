import { Priority, Periodicity } from './indicators';

export type UserRole =
  | 'viewer'
  | 'institution_focal_point'
  | 'gt2_analyst'
  | 'gt2_manager'
  | 'network_admin';

export type Perspective = 'network' | 'institution' | 'indicator';

export type CycleStatus =
  | 'planned'
  | 'collection_open'
  | 'validation'
  | 'closed'
  | 'archived';

export type MeasurementStatus =
  | 'not_started'
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'validated'
  | 'rejected'
  | 'not_applicable';

export type TargetType =
  | 'minimum'
  | 'maximum'
  | 'exact'
  | 'increase'
  | 'baseline'
  | 'qualitative';

export type ResultStatus =
  | 'no_data'
  | 'baseline'
  | 'below_target'
  | 'on_track'
  | 'target_met'
  | 'target_exceeded';

export type EvidenceType =
  | 'document'
  | 'normative_act'
  | 'spreadsheet'
  | 'url'
  | 'report'
  | 'attendance_list'
  | 'survey'
  | 'repository_record'
  | 'other';

export type EvidenceValidationStatus = 'pending' | 'accepted' | 'rejected';
export type EvidenceAccessLevel = 'public' | 'network' | 'restricted';

export interface Reference {
  source: string;
  articleOrSection?: string;
  description: string;
}

export interface ResponsibleParty {
  role: string;
  name?: string;
  instance: 'GT2' | 'ComiteCoordenador' | 'PontosFocais' | 'GestaoRepositorio';
}

export interface FocalPoint {
  name: string;
  email: string;
  role: 'titular' | 'suplente';
  institutionId: string;
}

// Layer 01: Master Data
export interface Institution {
  id: string;
  acronym: string;
  name: string;
  institutionType?: string;
  sphere?: 'Federal' | 'Distrital' | 'Estadual';
  region?: string;
  active: boolean;
  joinedAt?: string;
  focalPoints?: FocalPoint[];
  demo?: boolean;
}

export interface Dimension {
  id: string;
  code: string;
  name: string;
  executiveName?: string;
  description: string;
  managerialReading: string;
  order: number;
  active: boolean;
}

export interface IndicatorTarget {
  id: string;
  indicatorId: string;
  cycleId?: string;
  targetType: TargetType;
  targetValue?: number;
  targetText?: string;
  unit?: string;
}

export interface IndicatorDefinition {
  id: string;
  code: string;
  name: string;
  dimensionId: string;
  description: string;
  operationalDefinition: string;
  indicatorType: string;
  categoriaTipo: string;
  formula: string;
  unit: string;
  frequency: Periodicity;
  analysisUnit: string;
  targetDefinition: string;
  priority: Priority;
  normativeTraceability: Reference[];
  suggestedResponsible: ResponsibleParty[];
  coreRecommended: boolean;
  observation?: string;
  interpretacao?: string;
  active: boolean;
  version: number;
  validFrom: string;
  validUntil?: string;
}

// Layer 02: Operational Data
export interface MonitoringCycle {
  id: string;
  name: string;
  referenceYear: number;
  semester?: 1 | 2;
  startDate: string;
  endDate: string;
  collectionStart?: string;
  collectionEnd?: string;
  status: CycleStatus;
  isBaseline?: boolean;
}

export interface Measurement {
  id: string;
  indicatorId: string;
  institutionId?: string;
  cycleId: string;
  rawValue?: number;
  numerator?: number;
  denominator?: number;
  calculatedValue?: number;
  qualitativeValue?: string;
  status: MeasurementStatus;
  submittedAt?: string;
  submittedBy?: string;
  validatedAt?: string;
  validatedBy?: string;
  notes?: string;
  evidenceIds: string[];
  revisionsCount?: number;
}

export interface MeasurementRevision {
  measurementId: string;
  version: number;
  previousValue: unknown;
  newValue: unknown;
  changedAt: string;
  changedBy: string;
  reason: string;
}

export interface Evidence {
  id: string;
  measurementId: string;
  institutionId?: string;
  title: string;
  description?: string;
  evidenceType: EvidenceType;
  url?: string;
  fileName?: string;
  uploadedAt: string;
  uploadedBy: string;
  validationStatus: EvidenceValidationStatus;
  validationNotes?: string;
  accessLevel: EvidenceAccessLevel;
}

export interface TrainingAction {
  id: string;
  cycleId: string;
  actionType: 'ide_workshop' | 'training' | 'seminar' | 'webinar' | 'other';
  title: string;
  date: string;
  modality: 'in_person' | 'online' | 'hybrid';
  participantCount?: number;
  uniqueParticipantCount?: number;
  representedInstitutionIds: string[];
  positiveEvaluationRate?: number;
  evidenceIds: string[];
}

export interface IDEAssessment {
  id: string;
  institutionId: string;
  cycleId: string;
  diversityMet: number;
  diversityTotal: 7;
  genderMet: number;
  genderTotal: 31;
  raceMet: number;
  raceTotal: 31;
  completed: boolean;
  validated: boolean;
  submittedAt?: string;
  validatedAt?: string;
  evidenceIds: string[];
}

// Layer 03: Analytics & Results
export interface IndicatorResult {
  indicatorId: string;
  cycleId: string;
  actualValue?: number;
  targetValue?: number;
  targetText?: string;
  achievementRate?: number;
  status: ResultStatus;
  previousValue?: number;
  variation?: number;
  reportingInstitutionsCount?: number;
  eligibleInstitutionsCount?: number;
  coverageRate?: number;
  calculationNotes?: string;
}

export interface TimeSeriesPoint {
  cycleId: string;
  cycleName: string;
  referenceDate: string;
  value: number;
  targetValue?: number;
}

export interface DataQuality {
  completeness: number; // % of expected measurements submitted
  validationRate: number; // % of submitted measurements validated
  evidenceCoverage: number; // % of measurements with at least one evidence
  lastUpdated?: string;
}

export interface DomainEvent {
  id: string;
  timestamp: string;
  eventName:
    | 'cycle.opened'
    | 'measurement.created'
    | 'measurement.submitted'
    | 'measurement.validation_requested'
    | 'measurement.validated'
    | 'measurement.rejected'
    | 'evidence.uploaded'
    | 'target.reached'
    | 'cycle.closing_soon'
    | 'cycle.closed';
  payload: Record<string, unknown>;
}
