import {
  IndicatorDefinition,
  Dimension,
  Institution,
  MonitoringCycle,
  Measurement,
  Evidence,
  TrainingAction,
  IDEAssessment,
  IndicatorTarget,
  MeasurementRevision,
} from '../types/dataModels';

export interface IndicatorRepository {
  getAll(): Promise<IndicatorDefinition[]>;
  getById(id: string): Promise<IndicatorDefinition | null>;
  getByDimension(dimensionId: string): Promise<IndicatorDefinition[]>;
}

export interface DimensionRepository {
  getAll(): Promise<Dimension[]>;
  getById(id: string): Promise<Dimension | null>;
}

export interface InstitutionRepository {
  getAll(): Promise<Institution[]>;
  getById(id: string): Promise<Institution | null>;
  getActive(): Promise<Institution[]>;
}

export interface CycleRepository {
  getAll(): Promise<MonitoringCycle[]>;
  getById(id: string): Promise<MonitoringCycle | null>;
  getActive(): Promise<MonitoringCycle | null>;
}

export interface MeasurementRepository {
  getAll(cycleId?: string): Promise<Measurement[]>;
  getByIndicator(indicatorId: string, cycleId?: string): Promise<Measurement[]>;
  getByInstitution(institutionId: string, cycleId?: string): Promise<Measurement[]>;
  getById(id: string): Promise<Measurement | null>;
  create(data: Omit<Measurement, 'id'>): Promise<Measurement>;
  update(id: string, data: Partial<Measurement>, updatedBy: string, reason?: string): Promise<Measurement>;
  getRevisions(measurementId: string): Promise<MeasurementRevision[]>;
}

export interface EvidenceRepository {
  getAll(cycleId?: string): Promise<Evidence[]>;
  getByMeasurement(measurementId: string): Promise<Evidence[]>;
  getByInstitution(institutionId: string): Promise<Evidence[]>;
  getById(id: string): Promise<Evidence | null>;
  create(data: Omit<Evidence, 'id'>): Promise<Evidence>;
  updateValidation(id: string, status: 'pending' | 'accepted' | 'rejected', notes?: string): Promise<Evidence>;
}

export interface TrainingActionRepository {
  getAll(cycleId?: string): Promise<TrainingAction[]>;
  getById(id: string): Promise<TrainingAction | null>;
  create(data: Omit<TrainingAction, 'id'>): Promise<TrainingAction>;
}

export interface IDEAssessmentRepository {
  getAll(cycleId?: string): Promise<IDEAssessment[]>;
  getByInstitution(institutionId: string, cycleId?: string): Promise<IDEAssessment | null>;
  getById(id: string): Promise<IDEAssessment | null>;
  save(data: IDEAssessment): Promise<IDEAssessment>;
}

export interface TargetRepository {
  getAll(cycleId?: string): Promise<IndicatorTarget[]>;
  getByIndicator(indicatorId: string, cycleId?: string): Promise<IndicatorTarget | null>;
}
