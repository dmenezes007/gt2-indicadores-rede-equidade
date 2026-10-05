import {
  IndicatorResult,
  ResultStatus,
  Measurement,
  IDEAssessment,
  TrainingAction,
  Institution,
  IndicatorTarget,
} from '../types/dataModels';

export class CalculationService {
  /**
   * Calculates network-level result for a given indicator in a cycle
   */
  public calculateIndicatorResult(
    indicatorId: string,
    cycleId: string,
    isBaselineCycle: boolean,
    target: IndicatorTarget | null,
    measurements: Measurement[],
    assessments: IDEAssessment[],
    trainingActions: TrainingAction[],
    institutions: Institution[],
    previousCycleAssessments: IDEAssessment[] = []
  ): IndicatorResult {
    const eligibleInstitutionsCount = institutions.length;

    // Special calculations for IDE Assessment indicators (I04 - I08)
    if (['I04', 'I05', 'I06', 'I07', 'I08'].includes(indicatorId)) {
      return this.calculateIDEResult(
        indicatorId,
        cycleId,
        isBaselineCycle,
        target,
        assessments,
        eligibleInstitutionsCount,
        previousCycleAssessments
      );
    }

    // Special calculations for Training Action indicators (I09 - I12)
    if (['I09', 'I10', 'I11', 'I12'].includes(indicatorId)) {
      return this.calculateTrainingResult(
        indicatorId,
        cycleId,
        isBaselineCycle,
        target,
        trainingActions,
        eligibleInstitutionsCount
      );
    }

    // Institutional percentage indicators based on validated measurements (I01, I02, I03, I13, I14, I15)
    const indMeasurements = measurements.filter(
      (m) => m.indicatorId === indicatorId && m.status === 'validated'
    );

    if (indMeasurements.length === 0 || eligibleInstitutionsCount === 0) {
      return {
        indicatorId,
        cycleId,
        status: isBaselineCycle ? 'baseline' : 'no_data',
        targetText: target?.targetText,
        targetValue: target?.targetValue,
        reportingInstitutionsCount: 0,
        eligibleInstitutionsCount,
        coverageRate: 0,
        calculationNotes: isBaselineCycle
          ? 'Ciclo de linha de base. Aguardando submissão e validação dos dados operacionais.'
          : 'Nenhuma medição validada para este indicador no ciclo selecionado.',
      };
    }

    const meetingCount = indMeasurements.filter((m) => (m.rawValue ?? 0) >= 1).length;
    const actualPercent = Math.round((meetingCount / indMeasurements.length) * 100);
    const targetVal = target?.targetValue ?? 80;

    let status: ResultStatus = 'on_track';
    if (isBaselineCycle) {
      status = 'baseline';
    } else if (actualPercent >= targetVal) {
      status = actualPercent > targetVal ? 'target_exceeded' : 'target_met';
    } else {
      status = 'below_target';
    }

    return {
      indicatorId,
      cycleId,
      actualValue: actualPercent,
      targetValue: targetVal,
      targetText: target?.targetText,
      achievementRate: Math.round((actualPercent / targetVal) * 100),
      status,
      reportingInstitutionsCount: indMeasurements.length,
      eligibleInstitutionsCount,
      coverageRate: Math.round((indMeasurements.length / eligibleInstitutionsCount) * 100),
      calculationNotes: `${meetingCount} de ${indMeasurements.length} instituições validadas atenderam ao critério (${actualPercent}%).`,
    };
  }

  private calculateIDEResult(
    indicatorId: string,
    cycleId: string,
    isBaselineCycle: boolean,
    target: IndicatorTarget | null,
    assessments: IDEAssessment[],
    eligibleCount: number,
    previousAssessments: IDEAssessment[]
  ): IndicatorResult {
    const validatedAssessments = assessments.filter((a) => a.completed && a.validated);

    if (validatedAssessments.length === 0 || eligibleCount === 0) {
      return {
        indicatorId,
        cycleId,
        status: isBaselineCycle ? 'baseline' : 'no_data',
        targetText: target?.targetText,
        targetValue: target?.targetValue,
        reportingInstitutionsCount: 0,
        eligibleInstitutionsCount: eligibleCount,
        coverageRate: 0,
        calculationNotes: isBaselineCycle
          ? 'Construção de linha de base para o Modelo IDE no 1º ciclo.'
          : 'Aguardando autoavaliações consolidadas e validadas no ciclo.',
      };
    }

    // I04: Cobertura da autoavaliação
    if (indicatorId === 'I04') {
      const coverage = Math.round((validatedAssessments.length / eligibleCount) * 100);
      const targetVal = target?.targetValue ?? 90;
      const status: ResultStatus =
        coverage >= targetVal
          ? coverage > targetVal
            ? 'target_exceeded'
            : 'target_met'
          : 'below_target';

      return {
        indicatorId,
        cycleId,
        actualValue: coverage,
        targetValue: targetVal,
        targetText: target?.targetText,
        achievementRate: Math.round((coverage / targetVal) * 100),
        status,
        reportingInstitutionsCount: validatedAssessments.length,
        eligibleInstitutionsCount: eligibleCount,
        coverageRate: coverage,
        calculationNotes: `(${validatedAssessments.length} autoavaliações validadas ÷ ${eligibleCount} partícipes elegíveis) × 100 = ${coverage}%.`,
      };
    }

    // I05: Escala Diversidade (0 a 7 requisitos)
    if (indicatorId === 'I05') {
      const totalScores = validatedAssessments.reduce(
        (sum, a) => sum + (a.diversityMet / 7) * 100,
        0
      );
      const avgScore = Math.round(totalScores / validatedAssessments.length);

      return {
        indicatorId,
        cycleId,
        actualValue: avgScore,
        targetText: target?.targetText,
        status: isBaselineCycle ? 'baseline' : 'on_track',
        reportingInstitutionsCount: validatedAssessments.length,
        eligibleInstitutionsCount: eligibleCount,
        coverageRate: Math.round((validatedAssessments.length / eligibleCount) * 100),
        calculationNotes: `Média dos escores institucionais em Diversidade entre ${validatedAssessments.length} respondentes válidos = ${avgScore}%.`,
      };
    }

    // I06: Escala Gênero (0 a 31 requisitos)
    if (indicatorId === 'I06') {
      const totalScores = validatedAssessments.reduce(
        (sum, a) => sum + (a.genderMet / 31) * 100,
        0
      );
      const avgScore = Math.round(totalScores / validatedAssessments.length);

      return {
        indicatorId,
        cycleId,
        actualValue: avgScore,
        targetText: target?.targetText,
        status: isBaselineCycle ? 'baseline' : 'on_track',
        reportingInstitutionsCount: validatedAssessments.length,
        eligibleInstitutionsCount: eligibleCount,
        coverageRate: Math.round((validatedAssessments.length / eligibleCount) * 100),
        calculationNotes: `Média dos escores institucionais em Gênero entre ${validatedAssessments.length} respondentes válidos = ${avgScore}%.`,
      };
    }

    // I07: Escala Raça (0 a 31 requisitos)
    if (indicatorId === 'I07') {
      const totalScores = validatedAssessments.reduce(
        (sum, a) => sum + (a.raceMet / 31) * 100,
        0
      );
      const avgScore = Math.round(totalScores / validatedAssessments.length);

      return {
        indicatorId,
        cycleId,
        actualValue: avgScore,
        targetText: target?.targetText,
        status: isBaselineCycle ? 'baseline' : 'on_track',
        reportingInstitutionsCount: validatedAssessments.length,
        eligibleInstitutionsCount: eligibleCount,
        coverageRate: Math.round((validatedAssessments.length / eligibleCount) * 100),
        calculationNotes: `Média dos escores institucionais em Raça entre ${validatedAssessments.length} respondentes válidos = ${avgScore}%.`,
      };
    }

    // I08: Taxa de evolução entre ciclos (Longitudinal)
    if (indicatorId === 'I08') {
      if (previousAssessments.length === 0) {
        return {
          indicatorId,
          cycleId,
          status: 'baseline',
          targetText: target?.targetText,
          targetValue: target?.targetValue ?? 70,
          calculationNotes:
            'A evolução longitudinal requer dois ciclos comparáveis. Linha de base em consolidação.',
        };
      }

      // Check improvements
      let comparableCount = 0;
      let improvedCount = 0;

      validatedAssessments.forEach((current) => {
        const prev = previousAssessments.find((p) => p.institutionId === current.institutionId);
        if (prev) {
          comparableCount++;
          const prevTotal = prev.diversityMet + prev.genderMet + prev.raceMet;
          const currTotal = current.diversityMet + current.genderMet + current.raceMet;
          if (currTotal > prevTotal) {
            improvedCount++;
          }
        }
      });

      if (comparableCount === 0) {
        return {
          indicatorId,
          cycleId,
          status: 'baseline',
          calculationNotes: 'Nenhuma instituição com histórico comparável entre ciclos.',
        };
      }

      const evolutionRate = Math.round((improvedCount / comparableCount) * 100);
      const targetVal = target?.targetValue ?? 70;
      const status: ResultStatus =
        evolutionRate >= targetVal
          ? evolutionRate > targetVal
            ? 'target_exceeded'
            : 'target_met'
          : 'below_target';

      return {
        indicatorId,
        cycleId,
        actualValue: evolutionRate,
        targetValue: targetVal,
        targetText: target?.targetText,
        achievementRate: Math.round((evolutionRate / targetVal) * 100),
        status,
        reportingInstitutionsCount: comparableCount,
        eligibleInstitutionsCount: eligibleCount,
        calculationNotes: `${improvedCount} de ${comparableCount} instituições comparáveis ampliaram seus escores (${evolutionRate}%).`,
      };
    }

    return {
      indicatorId,
      cycleId,
      status: 'no_data',
    };
  }

  private calculateTrainingResult(
    indicatorId: string,
    cycleId: string,
    isBaselineCycle: boolean,
    target: IndicatorTarget | null,
    trainingActions: TrainingAction[],
    eligibleCount: number
  ): IndicatorResult {
    const cycleActions = trainingActions.filter((t) => t.cycleId === cycleId);

    // I09: Oficinas do Modelo IDE (Meta: 2 oficinas)
    if (indicatorId === 'I09') {
      const workshops = cycleActions.filter((a) => a.actionType === 'ide_workshop').length;
      const targetVal = target?.targetValue ?? 2;
      const achievement = Math.min(100, Math.round((workshops / targetVal) * 100));

      let status: ResultStatus = 'no_data';
      if (workshops === 0) {
        status = 'no_data';
      } else if (workshops >= targetVal) {
        status = workshops > targetVal ? 'target_exceeded' : 'target_met';
      } else {
        status = 'on_track';
      }

      return {
        indicatorId,
        cycleId,
        actualValue: workshops,
        targetValue: targetVal,
        targetText: target?.targetText,
        achievementRate: achievement,
        status,
        calculationNotes: `Execução real: ${workshops} oficina(s). Meta do ciclo: ${targetVal} oficinas. Cumprimento: ${achievement}%.`,
      };
    }

    // I10: Capacitações em IDE (Meta: 4 ações)
    if (indicatorId === 'I10') {
      const trainings = cycleActions.filter((a) => a.actionType === 'training').length;
      const targetVal = target?.targetValue ?? 4;
      const achievement = Math.min(100, Math.round((trainings / targetVal) * 100));

      let status: ResultStatus = 'no_data';
      if (trainings === 0) {
        status = 'no_data';
      } else if (trainings >= targetVal) {
        status = trainings > targetVal ? 'target_exceeded' : 'target_met';
      } else {
        status = 'on_track';
      }

      return {
        indicatorId,
        cycleId,
        actualValue: trainings,
        targetValue: targetVal,
        targetText: target?.targetText,
        achievementRate: achievement,
        status,
        calculationNotes: `Execução real: ${trainings} capacitação(ões). Meta do ciclo: ${targetVal} ações. Cumprimento: ${achievement}%.`,
      };
    }

    // I11: Alcance das ações (Participantes e % órgãos representados)
    if (indicatorId === 'I11') {
      const totalParticipants = cycleActions.reduce(
        (sum, a) => sum + (a.uniqueParticipantCount || a.participantCount || 0),
        0
      );

      const allRepresented = new Set<string>();
      cycleActions.forEach((a) => a.representedInstitutionIds.forEach((id) => allRepresented.add(id)));
      const coverageRate = eligibleCount > 0 ? Math.round((allRepresented.size / eligibleCount) * 100) : 0;

      return {
        indicatorId,
        cycleId,
        actualValue: totalParticipants,
        status: isBaselineCycle ? 'baseline' : totalParticipants > 0 ? 'on_track' : 'no_data',
        reportingInstitutionsCount: allRepresented.size,
        eligibleInstitutionsCount: eligibleCount,
        coverageRate,
        calculationNotes: `${totalParticipants} participações únicas acumuladas; ${allRepresented.size} instituições partícipes representadas (${coverageRate}%).`,
      };
    }

    // I12: Efetividade percebida (Meta: ≥ 85%)
    if (indicatorId === 'I12') {
      const evaluations = cycleActions
        .map((a) => a.positiveEvaluationRate)
        .filter((rate): rate is number => rate !== undefined);

      if (evaluations.length === 0) {
        return {
          indicatorId,
          cycleId,
          status: 'no_data',
          targetText: target?.targetText,
          targetValue: 85,
          calculationNotes: 'Nenhuma avaliação de reação pós-ação registrada no ciclo.',
        };
      }

      const avgEval = Math.round(evaluations.reduce((a, b) => a + b, 0) / evaluations.length);
      const targetVal = target?.targetValue ?? 85;

      return {
        indicatorId,
        cycleId,
        actualValue: avgEval,
        targetValue: targetVal,
        targetText: target?.targetText,
        achievementRate: Math.round((avgEval / targetVal) * 100),
        status: avgEval >= targetVal ? 'target_met' : 'below_target',
        calculationNotes: `Média de avaliação positiva nos itens de aplicabilidade: ${avgEval}% em ${evaluations.length} ações avaliadas.`,
      };
    }

    return {
      indicatorId,
      cycleId,
      status: 'no_data',
    };
  }
}

export const calculationService = new CalculationService();
