import React from 'react';
import { ShieldCheck, Database, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { DataQuality } from '../types/dataModels';

interface DataQualityPanelProps {
  dataQuality: DataQuality;
  hasData: boolean;
  eligibleCount: number;
  reportingCount: number;
  validatedCount: number;
}

export const DataQualityPanel: React.FC<DataQualityPanelProps> = ({
  dataQuality,
  hasData,
  eligibleCount,
  reportingCount,
  validatedCount,
}) => {
  return (
    <section className="py-4 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-50/60 dark:bg-stone-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          {/* Label Left */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 shrink-0">
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <span className="font-bold text-stone-900 dark:text-white block">
                Auditoria & Qualidade dos Dados Operacionais
              </span>
              <p className="text-[11px] text-stone-500">
                Métricas de completude, integridade de evidências e índice de validação do ciclo.
              </p>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Completude */}
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                Completude
              </span>
              <span className="font-mono font-bold text-stone-900 dark:text-white">
                {hasData ? `${dataQuality.completeness}%` : '—'}
              </span>
            </div>

            <div className="h-6 w-px bg-stone-200 dark:bg-stone-800 hidden sm:block" />

            {/* Validados */}
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                Validação
              </span>
              <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                {hasData ? `${dataQuality.validationRate}%` : '—'}
              </span>
            </div>

            <div className="h-6 w-px bg-stone-200 dark:bg-stone-800 hidden sm:block" />

            {/* Com Evidência */}
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                Com Evidência
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {hasData ? `${dataQuality.evidenceCoverage}%` : '—'}
              </span>
            </div>

            <div className="h-6 w-px bg-stone-200 dark:bg-stone-800 hidden sm:block" />

            {/* Última Atualização */}
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                Última Atualização
              </span>
              <span className="text-[11px] font-mono text-stone-500">
                {hasData ? new Date(dataQuality.lastUpdated || '').toLocaleDateString('pt-BR') : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
