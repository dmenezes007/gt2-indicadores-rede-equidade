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
import {
  OFFICIAL_INDICATORS,
  OFFICIAL_DIMENSIONS,
  OFFICIAL_CYCLES,
  OFFICIAL_TARGETS,
} from '../data/masterData';
import {
  DEMO_INSTITUTIONS,
  DEMO_MEASUREMENTS,
  DEMO_EVIDENCES,
  DEMO_TRAINING_ACTIONS,
  DEMO_IDE_ASSESSMENTS,
} from '../data/demoData';
import {
  IndicatorRepository,
  DimensionRepository,
  InstitutionRepository,
  CycleRepository,
  MeasurementRepository,
  EvidenceRepository,
  TrainingActionRepository,
  IDEAssessmentRepository,
  TargetRepository,
} from './repositoryInterfaces';
import { domainEventsService } from '../services/domainEventsService';

class LocalDataStore {
  public demoMode = false;

  private measurements: Measurement[] = [];
  private evidences: Evidence[] = [];
  private trainingActions: TrainingAction[] = [];
  private ideAssessments: IDEAssessment[] = [];
  private revisions: MeasurementRevision[] = [];

  constructor() {
    this.resetData();
  }

  public setDemoMode(active: boolean) {
    this.demoMode = active;
    this.resetData();
  }

  public resetData() {
    if (this.demoMode) {
      this.measurements = [...DEMO_MEASUREMENTS];
      this.evidences = [...DEMO_EVIDENCES];
      this.trainingActions = [...DEMO_TRAINING_ACTIONS];
      this.ideAssessments = [...DEMO_IDE_ASSESSMENTS];
    } else {
      // In real/production mode, operational data is empty or populated from real submissions
      this.measurements = [];
      this.evidences = [];
      this.trainingActions = [];
      this.ideAssessments = [];
    }
  }

  public getInstitutions(): Institution[] {
    return this.demoMode ? DEMO_INSTITUTIONS : [];
  }

  public getMeasurements(cycleId?: string): Measurement[] {
    if (!cycleId) return this.measurements;
    return this.measurements.filter((m) => m.cycleId === cycleId);
  }

  public getEvidences(cycleId?: string): Evidence[] {
    if (!cycleId) return this.evidences;
    // Map through measurements for cycle
    const cycleMeasIds = new Set(this.getMeasurements(cycleId).map((m) => m.id));
    return this.evidences.filter((e) => cycleMeasIds.has(e.measurementId));
  }

  public getTrainingActions(cycleId?: string): TrainingAction[] {
    if (!cycleId) return this.trainingActions;
    return this.trainingActions.filter((t) => t.cycleId === cycleId);
  }

  public getIDEAssessments(cycleId?: string): IDEAssessment[] {
    if (!cycleId) return this.ideAssessments;
    return this.ideAssessments.filter((a) => a.cycleId === cycleId);
  }

  public addMeasurement(data: Omit<Measurement, 'id'>): Measurement {
    const newMeas: Measurement = {
      ...data,
      id: `meas-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    this.measurements.push(newMeas);
    domainEventsService.emitDomainEvent('measurement.created', { measurementId: newMeas.id });
    return newMeas;
  }

  public updateMeasurement(
    id: string,
    data: Partial<Measurement>,
    updatedBy: string,
    reason = 'Atualização cadastral'
  ): Measurement {
    const idx = this.measurements.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error(`Measurement ${id} not found`);

    const prev = this.measurements[idx];
    const updated: Measurement = {
      ...prev,
      ...data,
      revisionsCount: (prev.revisionsCount || 0) + 1,
    };

    this.revisions.push({
      measurementId: id,
      version: updated.revisionsCount || 1,
      previousValue: prev,
      newValue: updated,
      changedAt: new Date().toISOString(),
      changedBy: updatedBy,
      reason,
    });

    this.measurements[idx] = updated;

    if (data.status === 'submitted') {
      domainEventsService.emitDomainEvent('measurement.submitted', { measurementId: id });
    } else if (data.status === 'validated') {
      domainEventsService.emitDomainEvent('measurement.validated', { measurementId: id });
    }

    return updated;
  }

  public getRevisions(measurementId: string): MeasurementRevision[] {
    return this.revisions.filter((r) => r.measurementId === measurementId);
  }

  public addEvidence(data: Omit<Evidence, 'id'>): Evidence {
    const newEvi: Evidence = {
      ...data,
      id: `evi-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    this.evidences.push(newEvi);
    domainEventsService.emitDomainEvent('evidence.uploaded', { evidenceId: newEvi.id });
    return newEvi;
  }

  public updateEvidenceValidation(
    id: string,
    status: 'pending' | 'accepted' | 'rejected',
    notes?: string
  ): Evidence {
    const idx = this.evidences.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error(`Evidence ${id} not found`);
    this.evidences[idx].validationStatus = status;
    if (notes) this.evidences[idx].validationNotes = notes;
    return this.evidences[idx];
  }
}

export const localDataStore = new LocalDataStore();

// Repositories Implementations
export const indicatorRepository: IndicatorRepository = {
  async getAll() {
    return OFFICIAL_INDICATORS;
  },
  async getById(id: string) {
    return OFFICIAL_INDICATORS.find((i) => i.id === id) || null;
  },
  async getByDimension(dimensionId: string) {
    return OFFICIAL_INDICATORS.filter((i) => i.dimensionId === dimensionId);
  },
};

export const dimensionRepository: DimensionRepository = {
  async getAll() {
    return OFFICIAL_DIMENSIONS;
  },
  async getById(id: string) {
    return OFFICIAL_DIMENSIONS.find((d) => d.id === id) || null;
  },
};

export const cycleRepository: CycleRepository = {
  async getAll() {
    return OFFICIAL_CYCLES;
  },
  async getById(id: string) {
    return OFFICIAL_CYCLES.find((c) => c.id === id) || null;
  },
  async getActive() {
    return OFFICIAL_CYCLES.find((c) => c.status === 'collection_open') || OFFICIAL_CYCLES[0];
  },
};

export const institutionRepository: InstitutionRepository = {
  async getAll() {
    return localDataStore.getInstitutions();
  },
  async getById(id: string) {
    return localDataStore.getInstitutions().find((i) => i.id === id) || null;
  },
  async getActive() {
    return localDataStore.getInstitutions().filter((i) => i.active);
  },
};

export const targetRepository: TargetRepository = {
  async getAll(cycleId?: string) {
    if (!cycleId) return OFFICIAL_TARGETS;
    return OFFICIAL_TARGETS.filter((t) => !t.cycleId || t.cycleId === cycleId);
  },
  async getByIndicator(indicatorId: string, cycleId?: string) {
    return (
      OFFICIAL_TARGETS.find(
        (t) => t.indicatorId === indicatorId && (!cycleId || !t.cycleId || t.cycleId === cycleId)
      ) || null
    );
  },
};

export const measurementRepository: MeasurementRepository = {
  async getAll(cycleId?: string) {
    return localDataStore.getMeasurements(cycleId);
  },
  async getByIndicator(indicatorId: string, cycleId?: string) {
    return localDataStore
      .getMeasurements(cycleId)
      .filter((m) => m.indicatorId === indicatorId);
  },
  async getByInstitution(institutionId: string, cycleId?: string) {
    return localDataStore
      .getMeasurements(cycleId)
      .filter((m) => m.institutionId === institutionId);
  },
  async getById(id: string) {
    return localDataStore.getMeasurements().find((m) => m.id === id) || null;
  },
  async create(data) {
    return localDataStore.addMeasurement(data);
  },
  async update(id, data, updatedBy, reason) {
    return localDataStore.updateMeasurement(id, data, updatedBy, reason);
  },
  async getRevisions(measurementId: string) {
    return localDataStore.getRevisions(measurementId);
  },
};

export const evidenceRepository: EvidenceRepository = {
  async getAll(cycleId?: string) {
    return localDataStore.getEvidences(cycleId);
  },
  async getByMeasurement(measurementId: string) {
    return localDataStore.getEvidences().filter((e) => e.measurementId === measurementId);
  },
  async getByInstitution(institutionId: string) {
    return localDataStore.getEvidences().filter((e) => e.institutionId === institutionId);
  },
  async getById(id: string) {
    return localDataStore.getEvidences().find((e) => e.id === id) || null;
  },
  async create(data) {
    return localDataStore.addEvidence(data);
  },
  async updateValidation(id, status, notes) {
    return localDataStore.updateEvidenceValidation(id, status, notes);
  },
};

export const trainingActionRepository: TrainingActionRepository = {
  async getAll(cycleId?: string) {
    return localDataStore.getTrainingActions(cycleId);
  },
  async getById(id: string) {
    return localDataStore.getTrainingActions().find((t) => t.id === id) || null;
  },
  async create(data) {
    const item: TrainingAction = {
      ...data,
      id: `train-${Date.now()}`,
    };
    localDataStore.getTrainingActions().push(item);
    return item;
  },
};

export const ideAssessmentRepository: IDEAssessmentRepository = {
  async getAll(cycleId?: string) {
    return localDataStore.getIDEAssessments(cycleId);
  },
  async getByInstitution(institutionId: string, cycleId?: string) {
    return (
      localDataStore
        .getIDEAssessments(cycleId)
        .find((a) => a.institutionId === institutionId) || null
    );
  },
  async getById(id: string) {
    return localDataStore.getIDEAssessments().find((a) => a.id === id) || null;
  },
  async save(data: IDEAssessment) {
    const list = localDataStore.getIDEAssessments();
    const idx = list.findIndex((a) => a.id === data.id);
    if (idx >= 0) {
      list[idx] = data;
    } else {
      list.push(data);
    }
    return data;
  },
};
