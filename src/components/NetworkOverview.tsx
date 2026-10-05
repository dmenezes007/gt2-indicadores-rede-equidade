import React from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  Layers,
  FileCheck,
  Award,
  Users,
  Share2,
  TrendingUp,
  HelpCircle,
} from 'lucide-react';
import { NetworkOverviewData } from '../services/analyticsService';
import { IndicatorDefinition } from '../types/dataModels';

interface NetworkOverviewProps {
  data: NetworkOverviewData;
  indicators: IndicatorDefinition[];
  onOpenIndicator: (id: string) => void;
  onOpenEvidenceExplorer: () => void;
  onOpenPendingTasks: () => void;
}

export const NetworkOverview: React.FC<NetworkOverviewProps> = ({
  data,
  indicators,
  onOpenIndicator,
  onOpenEvidenceExplorer,
  onOpenPendingTasks,
}) => {
  const {
    cycle,
    results,
    dataQuality,
    eligibleInstitutions,
    reportingInstitutions,
    coverageRate,
    validatedMeasurementsCount,
    pendingMeasurementsCount,
    totalEvidencesCount,
    metasAtingidasCount,
    ideConsolidated,
  } = data;

  const hasData = eligibleInstitutions > 0 && reportingInstitutions > 0;

  return (
    <section className="py-6 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-100/30 dark:bg-stone-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-indigo-700 dark:text-indigo-400 mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Panorama da Rede • Visão Consolidada</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-950 dark:text-white">
              {cycle.name}
            </h2>
            <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
              Acompanhamento integrado de maturidade institucional, governança colaborativa e capacitações da Rede Equidade.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={onOpenPendingTasks}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-50"
            >
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Central de Pendências ({pendingMeasurementsCount})</span>
            </button>
            <button
              onClick={onOpenEvidenceExplorer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-50"
            >
              <FileCheck className="w-3.5 h-3.5 text-teal-500" />
              <span>Evidências ({totalEvidencesCount})</span>
            </button>
          </div>
        </div>

        {/* Dynamic KPI Cards Grid derived from Data Layer */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          {/* Card 1: Cobertura da Coleta */}
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">
              Cobertura do Ciclo
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold font-mono text-stone-950 dark:text-white">
                {hasData ? `${coverageRate}%` : '—'}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-stone-500 truncate" title={`${reportingInstitutions} de ${eligibleInstitutions} órgãos`}>
              {hasData
                ? `${reportingInstitutions} de ${eligibleInstitutions} partícipes`
                : 'Aguardando início das coletas'}
            </p>
          </div>

          {/* Card 2: Instituições Monitoradas */}
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">
              Instituições Elegíveis
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold font-mono text-stone-950 dark:text-white">
                {eligibleInstitutions > 0 ? eligibleInstitutions : '—'}
              </span>
              <span className="text-xs text-stone-400">órgãos</span>
            </div>
            <p className="mt-1 text-[11px] text-stone-500">
              {eligibleInstitutions > 0
                ? `${reportingInstitutions} respondentes ativas`
                : 'Cadastramento em consolidação'}
            </p>
          </div>

          {/* Card 3: Medições Validadas */}
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">
              Medições Validadas
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold font-mono text-teal-600 dark:text-teal-400">
                {hasData ? validatedMeasurementsCount : '—'}
              </span>
              <span className="text-xs text-stone-400">registros</span>
            </div>
            <p className="mt-1 text-[11px] text-stone-500">
              {hasData
                ? `${dataQuality.validationRate}% taxa de validação`
                : 'Nenhuma medição homologada'}
            </p>
          </div>

          {/* Card 4: Metas Atingidas */}
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">
              Metas Atingidas / Superadas
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                {hasData ? metasAtingidasCount : '—'}
              </span>
              <span className="text-xs text-stone-400">de 15 metas</span>
            </div>
            <p className="mt-1 text-[11px] text-stone-500">
              {hasData
                ? `${Math.round((metasAtingidasCount / 15) * 100)}% de conformidade`
                : 'Metas aguardando apuração'}
            </p>
          </div>

          {/* Card 5: Qualidade dos Dados */}
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">
              Completude dos Dados
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
                {hasData ? `${dataQuality.completeness}%` : '—'}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-stone-500">
              {hasData
                ? `${dataQuality.evidenceCoverage}% com evidência formal`
                : 'Linha de base em estruturação'}
            </p>
          </div>
        </div>

        {/* IDE Consolidated Summary Banner */}
        <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400">
                Maturidade Consolidada no Modelo IDE
              </span>
              <h3 className="text-base font-bold text-stone-950 dark:text-white mt-0.5">
                Escores Médios Transversais da Rede Equidade
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              69 requisitos estruturantes • Ciclo {cycle.referenceYear}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Diversidade (I05) */}
            <div
              onClick={() => onOpenIndicator('I05')}
              className="p-3 rounded-lg bg-teal-50/60 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 hover:border-teal-300 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-center text-teal-900 dark:text-teal-300 font-semibold mb-1">
                <span>Diversidade (I05)</span>
                <span className="font-mono text-xs">7 reqs</span>
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl font-bold font-mono text-teal-700 dark:text-teal-400">
                  {ideConsolidated.diversityScore !== null ? `${ideConsolidated.diversityScore}%` : '—'}
                </span>
              </div>
              <span className="text-[10px] text-stone-500 block mt-1">
                {ideConsolidated.diversityScore !== null
                  ? 'Escore institucional médio'
                  : 'Aguardando 1º ciclo de autoavaliação'}
              </span>
            </div>

            {/* Gênero (I06) */}
            <div
              onClick={() => onOpenIndicator('I06')}
              className="p-3 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 hover:border-indigo-300 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-center text-indigo-900 dark:text-indigo-300 font-semibold mb-1">
                <span>Gênero (I06)</span>
                <span className="font-mono text-xs">31 reqs</span>
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl font-bold font-mono text-indigo-700 dark:text-indigo-400">
                  {ideConsolidated.genderScore !== null ? `${ideConsolidated.genderScore}%` : '—'}
                </span>
              </div>
              <span className="text-[10px] text-stone-500 block mt-1">
                {ideConsolidated.genderScore !== null
                  ? 'Escore institucional médio'
                  : 'Aguardando 1º ciclo de autoavaliação'}
              </span>
            </div>

            {/* Raça (I07) */}
            <div
              onClick={() => onOpenIndicator('I07')}
              className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 hover:border-amber-300 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-center text-amber-900 dark:text-amber-300 font-semibold mb-1">
                <span>Raça (I07)</span>
                <span className="font-mono text-xs">31 reqs</span>
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl font-bold font-mono text-amber-700 dark:text-amber-400">
                  {ideConsolidated.raceScore !== null ? `${ideConsolidated.raceScore}%` : '—'}
                </span>
              </div>
              <span className="text-[10px] text-stone-500 block mt-1">
                {ideConsolidated.raceScore !== null
                  ? 'Escore institucional médio'
                  : 'Aguardando 1º ciclo de autoavaliação'}
              </span>
            </div>

            {/* Evolução Longitudinal (I08) */}
            <div
              onClick={() => onOpenIndicator('I08')}
              className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 hover:border-stone-400 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-center text-stone-900 dark:text-stone-100 font-semibold mb-1">
                <span>Evolução Longitudinal (I08)</span>
                <TrendingUp className="w-3.5 h-3.5 text-stone-500" />
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl font-bold font-mono text-stone-900 dark:text-white">
                  {ideConsolidated.evolutionRate !== null ? `${ideConsolidated.evolutionRate}%` : '—'}
                </span>
              </div>
              <span className="text-[10px] text-stone-500 block mt-1">
                {ideConsolidated.evolutionRate !== null
                  ? 'Órgãos com evolução positiva'
                  : 'Exige série histórica prévia'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
