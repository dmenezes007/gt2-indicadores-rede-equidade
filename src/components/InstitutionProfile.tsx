import React from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  FileCheck,
  Award,
  Layers,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { InstitutionProfileData } from '../services/analyticsService';
import { IndicatorDefinition } from '../types/dataModels';

interface InstitutionProfileProps {
  data: InstitutionProfileData | null;
  indicators: IndicatorDefinition[];
  onOpenIndicator: (id: string) => void;
  onOpenEvidence: (evidenceId: string) => void;
}

export const InstitutionProfile: React.FC<InstitutionProfileProps> = ({
  data,
  indicators,
  onOpenIndicator,
  onOpenEvidence,
}) => {
  if (!data) {
    return (
      <section className="py-12 border-b border-stone-200/80 dark:border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Building2 className="w-8 h-8 text-stone-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
            Nenhuma Instituição Selecionada
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
            Selecione uma instituição na barra de perspectiva acima para visualizar o perfil individual de monitoramento.
          </p>
        </div>
      </section>
    );
  }

  const {
    institution,
    cycle,
    measurements,
    ideAssessment,
    evidences,
    trainingParticipationCount,
    pendingCount,
    validatedCount,
    ideScores,
  } = data;

  return (
    <section className="py-8 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-100/40 dark:bg-stone-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Profile Header */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
              {institution.acronym.substring(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                  {institution.sphere || 'Esfera Distrital'} • {institution.institutionType}
                </span>
                <span className="text-[10px] text-teal-700 dark:text-teal-400 font-semibold">
                  Membro Ativo da Rede
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-950 dark:text-white mt-1">
                {institution.name}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Perfil de Monitoramento • {cycle.name}
              </p>
            </div>
          </div>

          {/* Quick Metrics Badge Strip */}
          <div className="flex flex-wrap gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Validados</span>
              <span className="font-mono text-base font-bold text-teal-600 dark:text-teal-400">
                {validatedCount}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Pendências</span>
              <span className="font-mono text-base font-bold text-amber-600 dark:text-amber-400">
                {pendingCount}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Evidências</span>
              <span className="font-mono text-base font-bold text-indigo-600 dark:text-indigo-400">
                {evidences.length}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Columns: IDE Assessment in Institution & Operational Indicators */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: IDE Assessment (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Autoavaliação do Modelo IDE
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  ideAssessment?.validated ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300' : 'bg-stone-100 text-stone-600'
                }`}>
                  {ideAssessment?.validated ? 'Validada ✓' : 'Em validação'}
                </span>
              </div>

              {ideAssessment ? (
                <div className="mt-4 space-y-4 text-xs">
                  {/* Diversidade */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="font-medium text-stone-800 dark:text-stone-200">
                        Diversidade ({ideAssessment.diversityMet} de 7 requisitos)
                      </span>
                      <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                        {ideScores.diversity}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-teal-600 rounded-full"
                        style={{ width: `${ideScores.diversity}%` }}
                      />
                    </div>
                  </div>

                  {/* Gênero */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="font-medium text-stone-800 dark:text-stone-200">
                        Gênero ({ideAssessment.genderMet} de 31 requisitos)
                      </span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {ideScores.gender}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${ideScores.gender}%` }}
                      />
                    </div>
                  </div>

                  {/* Raça */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="font-medium text-stone-800 dark:text-stone-200">
                        Raça ({ideAssessment.raceMet} de 31 requisitos)
                      </span>
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                        {ideScores.race}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-600 rounded-full"
                        style={{ width: `${ideScores.race}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-stone-400 text-xs mt-4">
                  Nenhuma autoavaliação submetida pela instituição neste ciclo.
                </div>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
              <span>Participação em capacitações: {trainingParticipationCount} ações</span>
              <span className="font-mono font-semibold text-stone-700 dark:text-stone-300">
                {ideAssessment ? `${ideAssessment.diversityMet + ideAssessment.genderMet + ideAssessment.raceMet} / 69 total` : ''}
              </span>
            </div>
          </div>

          {/* Right: Responded Measurements & Evidences List (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Medições Institucionais Registradas ({measurements.length})
                </span>
                <span className="text-xs text-stone-400">
                  {cycle.name}
                </span>
              </div>

              {measurements.length > 0 ? (
                <div className="mt-3 divide-y divide-stone-100 dark:divide-stone-800 max-h-64 overflow-y-auto">
                  {measurements.map((m) => {
                    const ind = indicators.find((i) => i.id === m.indicatorId);
                    return (
                      <div
                        key={m.id}
                        onClick={() => onOpenIndicator(m.indicatorId)}
                        className="py-2.5 flex items-center justify-between gap-3 text-xs hover:bg-stone-50 dark:hover:bg-stone-800/40 rounded px-1.5 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-stone-900 dark:text-white">
                            {m.indicatorId}
                          </span>
                          <span className="font-medium text-stone-800 dark:text-stone-200 truncate max-w-xs">
                            {ind?.name || m.indicatorId}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            m.status === 'validated'
                              ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300'
                              : m.status === 'submitted'
                              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          }`}>
                            {m.status === 'validated' ? 'Validado' : m.status === 'submitted' ? 'Enviado' : 'Rascunho'}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center text-stone-400 text-xs mt-4">
                  Nenhuma medição reportada até o momento.
                </div>
              )}
            </div>

            {/* Evidences list preview */}
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
              <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1.5">
                Evidências e Atos Anexados ({evidences.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {evidences.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => onOpenEvidence(e.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-[11px] font-medium"
                    title={e.description}
                  >
                    <FileCheck className="w-3 h-3 text-teal-600" />
                    <span className="truncate max-w-[200px]">{e.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
