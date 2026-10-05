import {
  IndicatorResult,
  DataQuality,
  TimeSeriesPoint,
  Institution,
  MonitoringCycle,
  Measurement,
  Evidence,
  IDEAssessment,
  TrainingAction,
} from '../types/dataModels';
import {
  indicatorRepository,
  institutionRepository,
  cycleRepository,
  measurementRepository,
  evidenceRepository,
  ideAssessmentRepository,
  trainingActionRepository,
  targetRepository,
} from '../repositories/localRepository';
import { calculationService } from './calculationService';

export interface NetworkOverviewData {
  cycle: MonitoringCycle;
  results: Record<string, IndicatorResult>;
  dataQuality: DataQuality;
  eligibleInstitutions: number;
  reportingInstitutions: number;
  coverageRate: number;
  validatedMeasurementsCount: number;
  pendingMeasurementsCount: number;
  totalEvidencesCount: number;
  metasAtingidasCount: number;
  ideConsolidated: {
    diversityScore: number | null;
    genderScore: number | null;
    raceScore: number | null;
    evolutionRate: number | null;
  };
}

export interface InstitutionProfileData {
  institution: Institution;
  cycle: MonitoringCycle;
  measurements: Measurement[];
  ideAssessment: IDEAssessment | null;
  evidences: Evidence[];
  trainingParticipationCount: number;
  pendingCount: number;
  validatedCount: number;
  ideScores: {
    diversity: number | null;
    gender: number | null;
    race: number | null;
  };
}

export class AnalyticsService {
  /**
   * Consolidates Network Overview for a given cycle
   */
  public async getNetworkOverview(cycleId: string): Promise<NetworkOverviewData> {
    const cycle = (await cycleRepository.getById(cycleId)) || (await cycleRepository.getActive())!;
    const institutions = await institutionRepository.getActive();
    const measurements = await measurementRepository.getAll(cycle.id);
    const assessments = await ideAssessmentRepository.getAll(cycle.id);
    const trainingActions = await trainingActionRepository.getAll(cycle.id);
    const evidences = await evidenceRepository.getAll(cycle.id);
    const indicators = await indicatorRepository.getAll();

    // Check for previous cycle for longitudinal comparison
    const previousAssessments =
      cycle.referenceYear > 2025
        ? await ideAssessmentRepository.getAll('cycle-2025')
        : [];

    const results: Record<string, IndicatorResult> = {};
    let metasAtingidasCount = 0;

    for (const ind of indicators) {
      const target = await targetRepository.getByIndicator(ind.id, cycle.id);
      const res = calculationService.calculateIndicatorResult(
        ind.id,
        cycle.id,
        !!cycle.isBaseline,
        target,
        measurements,
        assessments,
        trainingActions,
        institutions,
        previousAssessments
      );
      results[ind.id] = res;
      if (res.status === 'target_met' || res.status === 'target_exceeded') {
        metasAtingidasCount++;
      }
    }

    // Unique reporting institutions in the cycle
    const reportingSet = new Set<string>();
    measurements.forEach((m) => {
      if (m.institutionId && (m.status === 'submitted' || m.status === 'validated')) {
        reportingSet.add(m.institutionId);
      }
    });
    assessments.forEach((a) => {
      if (a.completed) reportingSet.add(a.institutionId);
    });

    const eligibleCount = institutions.length;
    const reportingCount = reportingSet.size;
    const coverageRate = eligibleCount > 0 ? Math.round((reportingCount / eligibleCount) * 100) : 0;

    const validatedCount = measurements.filter((m) => m.status === 'validated').length;
    const pendingCount = measurements.filter(
      (m) => m.status === 'draft' || m.status === 'submitted' || m.status === 'under_review'
    ).length;

    // IDE Consolidated Scores
    const ideConsolidated = {
      diversityScore: results['I05']?.actualValue ?? null,
      genderScore: results['I06']?.actualValue ?? null,
      raceScore: results['I07']?.actualValue ?? null,
      evolutionRate: results['I08']?.actualValue ?? null,
    };

    // Data quality calculations
    const totalExpected = eligibleCount * 10; // rough estimation for institutions
    const completeness =
      totalExpected > 0 ? Math.min(100, Math.round((measurements.length / totalExpected) * 100)) : 0;
    const validationRate =
      measurements.length > 0 ? Math.round((validatedCount / measurements.length) * 100) : 0;
    const measWithEvidences = measurements.filter((m) => m.evidenceIds && m.evidenceIds.length > 0).length;
    const evidenceCoverage =
      measurements.length > 0 ? Math.round((measWithEvidences / measurements.length) * 100) : 0;

    const dataQuality: DataQuality = {
      completeness,
      validationRate,
      evidenceCoverage,
      lastUpdated: new Date().toISOString(),
    };

    return {
      cycle,
      results,
      dataQuality,
      eligibleInstitutions: eligibleCount,
      reportingInstitutions: reportingCount,
      coverageRate,
      validatedMeasurementsCount: validatedCount,
      pendingMeasurementsCount: pendingCount,
      totalEvidencesCount: evidences.length,
      metasAtingidasCount,
      ideConsolidated,
    };
  }

  /**
   * Retrieves specific institution profile in a cycle
   */
  public async getInstitutionProfile(
    institutionId: string,
    cycleId: string
  ): Promise<InstitutionProfileData | null> {
    const institution = await institutionRepository.getById(institutionId);
    if (!institution) return null;

    const cycle = (await cycleRepository.getById(cycleId)) || (await cycleRepository.getActive())!;
    const measurements = await measurementRepository.getByInstitution(institutionId, cycle.id);
    const ideAssessment = await ideAssessmentRepository.getByInstitution(institutionId, cycle.id);
    const evidences = await evidenceRepository.getByInstitution(institutionId);
    const trainingActions = await trainingActionRepository.getAll(cycle.id);

    const trainingCount = trainingActions.filter((t) =>
      t.representedInstitutionIds.includes(institutionId)
    ).length;

    const validatedCount = measurements.filter((m) => m.status === 'validated').length;
    const pendingCount = measurements.filter(
      (m) => m.status === 'draft' || m.status === 'submitted' || m.status === 'under_review'
    ).length;

    const ideScores = {
      diversity: ideAssessment ? Math.round((ideAssessment.diversityMet / 7) * 100) : null,
      gender: ideAssessment ? Math.round((ideAssessment.genderMet / 31) * 100) : null,
      race: ideAssessment ? Math.round((ideAssessment.raceMet / 31) * 100) : null,
    };

    return {
      institution,
      cycle,
      measurements,
      ideAssessment,
      evidences,
      trainingParticipationCount: trainingCount,
      pendingCount,
      validatedCount,
      ideScores,
    };
  }

  /**
   * Retrieves time series trend for an indicator across all cycles
   */
  public async getIndicatorTimeSeries(indicatorId: string): Promise<TimeSeriesPoint[]> {
    const cycles = await cycleRepository.getAll();
    const institutions = await institutionRepository.getActive();
    const points: TimeSeriesPoint[] = [];

    for (const c of cycles) {
      if (c.status === 'planned') continue;

      const meas = await measurementRepository.getAll(c.id);
      const assessments = await ideAssessmentRepository.getAll(c.id);
      const trainings = await trainingActionRepository.getAll(c.id);
      const target = await targetRepository.getByIndicator(indicatorId, c.id);

      const res = calculationService.calculateIndicatorResult(
        indicatorId,
        c.id,
        !!c.isBaseline,
        target,
        meas,
        assessments,
        trainings,
        institutions
      );

      if (res.actualValue !== undefined) {
        points.push({
          cycleId: c.id,
          cycleName: c.name,
          referenceDate: `${c.referenceYear}-12-31`,
          value: res.actualValue,
          targetValue: res.targetValue,
        });
      }
    }

    return points;
  }
}

export const analyticsService = new AnalyticsService();
