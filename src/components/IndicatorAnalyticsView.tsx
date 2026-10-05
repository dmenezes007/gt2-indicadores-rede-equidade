import React, { useEffect, useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  FileCheck,
  Calculator,
  ShieldCheck,
  Clock,
  ArrowRight,
  Database,
  Info,
} from 'lucide-react';
import { IndicatorDefinition, IndicatorResult, TimeSeriesPoint } from '../types/dataModels';
import { analyticsService } from '../services/analyticsService';
import { evidenceRepository } from '../repositories/localRepository';
import { Evidence } from '../types/dataModels';

interface IndicatorAnalyticsViewProps {
  indicator: IndicatorDefinition;
  result: IndicatorResult | undefined;
  cycleName: string;
  onOpenEvidence: (evidenceId: string) => void;
}

export const IndicatorAnalyticsView: React.FC<IndicatorAnalyticsViewProps> = ({
  indicator,
  result,
  cycleName,
  onOpenEvidence,
}) => {
  const [timeSeries, setTimeSeries] = useState<TimeSeriesPoint[]>([]);
  const [evidences, setEvidences] = useState<Evidence[]>([]);

  useEffect(() => {
    let mounted = true;
    analyticsService.getIndicatorTimeSeries(indicator.id).then((pts) => {
      if (mounted) setTimeSeries(pts);
    });
    evidenceRepository.getAll().then((evs) => {
      if (mounted) {
        // filter evidences related to this indicator
        const matching = evs.filter((e) => e.measurementId.includes(indicator.id.toLowerCase()));
        setEvidences(matching);
      }
    });
    return () => {
      mounted = false;
    };
  }, [indicator.id]);

  const hasResult = result && result.actualValue !== undefined;

  return (
    <section className="py-8 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-100/40 dark:bg-stone-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950">
                {indicator.code}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                {indicator.dimensionId}
              </span>
          </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-950 dark:text-white leading-tight">
              {indicator.name}
            </h2>
            <p className="text-xs text-stone-500 max-w-3xl leading-relaxed">
              {indicator.operationalDefinition}
            </p>
          </div>

          {/* Result Card Pill */}
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60 text-right shrink-0 min-w-[200px]">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">
              Resultado Consolidado ({cycleName})
            </span>
            <div className="mt-1 flex items-baseline justify-end gap-1.5">
              <span className="text-3xl font-extrabold font-mono text-stone-950 dark:text-white">
                {hasResult ? `${result.actualValue}${indicator.unit === '%' ? '%' : ` ${indicator.unit}`}` : '—'}
              </span>
            </div>
            <div className="mt-1 text-[11px] text-stone-500">
              Meta pactuada: <strong className="text-stone-800 dark:text-stone-200">{indicator.targetDefinition}</strong>
            </div>
          </div>
        </div>

        {/* 2-Column Details: Time Series & Audit Calculation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Time Series & Evolution (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Série Histórica e Evolução Temporal</span>
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  {timeSeries.length > 0 ? `${timeSeries.length} ciclos` : 'Primeiro ciclo'}
                </span>
              </div>

              {timeSeries.length > 1 ? (
                <div className="mt-5 space-y-4">
                  <div className="space-y-2">
                    {timeSeries.map((pt, idx) => {
                      const prev = idx > 0 ? timeSeries[idx - 1] : null;
                      const diff = prev ? pt.value - prev.value : null;

                      return (
                        <div
                          key={pt.cycleId}
                          className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-semibold text-stone-900 dark:text-white">
                              {pt.cycleName}
                            </span>
                            <span className="text-[10px] text-stone-400 block font-mono">
                              Ref: {pt.referenceDate}
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="text-base font-bold font-mono text-stone-900 dark:text-white">
                              {pt.value}{indicator.unit === '%' ? '%' : ` ${indicator.unit}`}
                            </span>
                            {diff !== null && (
                              <span
                                className={`text-[10px] block font-mono font-semibold ${
                                  diff >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-amber-600'
                                }`}
                              >
                                {diff >= 0 ? `+${diff}` : `${diff}`} {indicator.unit} vs ciclo anterior
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-stone-500 space-y-2">
                  <Clock className="w-6 h-6 text-stone-400 mx-auto" />
                  <p className="font-medium text-stone-700 dark:text-stone-300">
                    Série histórica prévia inexistente para comparação
                  </p>
                  <p className="text-[11px] text-stone-400 max-w-sm mx-auto">
                    Este é o primeiro ciclo institucional padronizado. A linha de base servirá de parâmetro para as medições dos biênios subsequentes.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400">
              A evolução longitudinal só é calculada entre ciclos metodologicamente comparáveis.
            </div>
          </div>

          {/* Auditability & Calculation Notes (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-teal-500" />
                  <span>Cálculo e Transparência Metodológica</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600">
                  Auditável
                </span>
              </div>

              <div className="mt-4 space-y-3.5 text-xs">
                <div>
                  <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                    Fórmula oficial:
                  </span>
                  <code className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60 font-mono text-[11px] block leading-relaxed text-indigo-950 dark:text-indigo-300">
                    {indicator.formula}
                  </code>
                </div>

                <div className="p-3 rounded-lg bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-teal-800 dark:text-teal-300 block">
                    Memorial de Cálculo do Ciclo
                  </span>
                  <p className="text-stone-700 dark:text-stone-300 text-xs leading-relaxed">
                    {result?.calculationNotes || 'Aguardando validação dos registros para processamento do cálculo final.'}
                  </p>
                </div>

                {/* Evidences attached */}
                <div>
                  <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                    Evidências documentais anexadas ({evidences.length}):
                  </span>
                  {evidences.length > 0 ? (
                    <div className="space-y-1.5">
                      {evidences.map((e) => (
                        <button
                          key={e.id}
                          onClick={() => onOpenEvidence(e.id)}
                          className="w-full text-left p-2 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-xs hover:border-teal-400"
                        >
                          <div className="flex items-center gap-1.5 truncate pr-2">
                            <FileCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <span className="truncate">{e.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-stone-400 shrink-0">
                            {e.validationStatus === 'accepted' ? 'Validado ✓' : 'Pendente'}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span className="text-stone-400 italic text-[11px]">
                      Nenhuma evidência documental anexada no momento.
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400">
              Responsável pela validação: {indicator.suggestedResponsible.map((r) => r.role).join(', ')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
