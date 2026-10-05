import React from 'react';
import {
  TrendingUp,
  Clock,
  Layers,
  Sparkles,
  Info,
  Calendar,
  Compass,
} from 'lucide-react';
import { GLOSSARY } from '../utils/helpers';
import { CYCLE_STATUS_ITEMS } from '../data/cycleData';

interface ExecutiveOverviewProps {
  onSelectDimension: (dimId: string) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  onSelectDimension,
}) => {
  return (
    <section id="visao-executiva" className="scroll-mt-24 py-8 lg:py-12 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-700 dark:text-amber-400 mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Painel Executivo • GT2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-950 dark:text-white">
              Monitoramento Estratégico de Diversidade, Equidade e Inclusão
            </h1>
            <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
              Estrutura técnica para acompanhamento da maturidade, institucionalização e cooperação interinstitucional no âmbito da Rede Equidade.
            </p>
          </div>

          {/* Institutional Legend of Statuses */}
          <div className="flex flex-wrap items-center gap-2 p-2 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-xs">
            <span className="text-stone-500 dark:text-stone-400 font-medium text-[11px] mr-1">
              Convenção metodológica:
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
              META
            </span>
            <span className="text-stone-300 dark:text-stone-700">·</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
              RESULTADO
            </span>
            <span className="text-stone-300 dark:text-stone-700">·</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              LINHA DE BASE
            </span>
            <span className="text-stone-300 dark:text-stone-700">·</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
              PROJEÇÃO
            </span>
          </div>
        </div>

        {/* Asymmetric Editorial Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Main Key Card: 15 Indicadores Propostos (5 cols) */}
          <div className="md:col-span-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400">
                  Matriz Técnica Completa
                </span>
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 font-mono">
                  15
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  indicadores
                </span>
              </div>
              <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-normal">
                Distribuídos harmonicamente entre governança estrutural, autoavaliação institucional, ações formativas e cooperação em rede.
              </p>
            </div>

            {/* Micro visual: Segmented ratio bar (14 núcleo + 1 complementar) */}
            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80">
              <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400 mb-1.5">
                <span>14 Núcleo Recomendado</span>
                <span className="font-mono">93.3%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden flex gap-0.5">
                <div className="h-full bg-indigo-600 rounded-l-full" style={{ width: '93.3%' }} />
                <div className="h-full bg-amber-500 rounded-r-full" style={{ width: '6.7%' }} title="I11: Indicador complementar de alcance" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-indigo-600 inline-block" />
                  Núcleo prioritário
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-amber-500 inline-block" />
                  Complementar (I11)
                </span>
              </div>
            </div>
          </div>

          {/* 5 Dimensões Estratégicas (4 cols) */}
          <div className="md:col-span-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400">
                  Eixos de Atuação
                </span>
                <Layers className="w-4 h-4 text-stone-400" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 font-mono">
                  5
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  dimensões estratégicas
                </span>
              </div>
              <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-normal">
                Alinhadas à finalidade do ACT e aos 69 requisitos de maturidade do Modelo IDE.
              </p>
            </div>

            {/* Micro visual: 5-bar dimension distribution */}
            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80">
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block mb-2 font-medium">
                Distribuição de indicadores por dimensão:
              </span>
              <div className="grid grid-cols-5 gap-1.5 text-center">
                <button
                  onClick={() => onSelectDimension('governanca')}
                  className="p-1.5 rounded bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 transition-colors"
                  title="Governança: 3 indicadores"
                >
                  <span className="block text-xs font-bold text-indigo-700 dark:text-indigo-400 font-mono">3</span>
                  <span className="text-[9px] text-indigo-900/70 dark:text-indigo-300 truncate block">Gov.</span>
                </button>
                <button
                  onClick={() => onSelectDimension('modelo_ide')}
                  className="p-1.5 rounded bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 transition-colors"
                  title="Modelo IDE: 5 indicadores"
                >
                  <span className="block text-xs font-bold text-teal-700 dark:text-teal-400 font-mono">5</span>
                  <span className="text-[9px] text-teal-900/70 dark:text-teal-300 truncate block">IDE</span>
                </button>
                <button
                  onClick={() => onSelectDimension('capacitacao')}
                  className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 transition-colors"
                  title="Capacitação: 4 indicadores"
                >
                  <span className="block text-xs font-bold text-amber-700 dark:text-amber-400 font-mono">4</span>
                  <span className="text-[9px] text-amber-900/70 dark:text-amber-300 truncate block">Capac.</span>
                </button>
                <button
                  onClick={() => onSelectDimension('representatividade')}
                  className="p-1.5 rounded bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 transition-colors"
                  title="Representatividade & Prevenção: 2 indicadores"
                >
                  <span className="block text-xs font-bold text-rose-700 dark:text-rose-400 font-mono">2</span>
                  <span className="text-[9px] text-rose-900/70 dark:text-rose-300 truncate block">Repr.</span>
                </button>
                <button
                  onClick={() => onSelectDimension('cooperacao')}
                  className="p-1.5 rounded bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 transition-colors"
                  title="Cooperação: 1 indicador"
                >
                  <span className="block text-xs font-bold text-sky-700 dark:text-sky-400 font-mono">1</span>
                  <span className="text-[9px] text-sky-900/70 dark:text-sky-300 truncate block">Coop.</span>
                </button>
              </div>
            </div>
          </div>

          {/* Horizontes Temporais (4 cols) */}
          <div className="md:col-span-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400">
                  Periodicidade
                </span>
                <Clock className="w-4 h-4 text-stone-400" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 font-mono">
                  3
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  horizontes principais
                </span>
              </div>
              <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-normal">
                Equilíbrio entre acompanhamento de curto prazo (ações) e avaliação de impacto sustentável (bienal).
              </p>
            </div>

            {/* Micro visual: Periodicity distribution pills */}
            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  Bienal (Maturidade & Modelo IDE)
                </span>
                <span className="font-mono font-semibold">5 ind.</span>
              </div>
              <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Anual (Governança & Representação)
                </span>
                <span className="font-mono font-semibold">5 ind.</span>
              </div>
              <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Semestral / Trimestral / Ação
                </span>
                <span className="font-mono font-semibold">5 ind.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Big Block: VISÃO DO CICLO */}
        <div className="rounded-xl bg-stone-900 dark:bg-stone-900/90 text-stone-100 p-6 sm:p-8 shadow-md border border-stone-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase">
                  Visão do Ciclo de Implementação
                </h2>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-stone-400">
                Status de prontidão para a primeira rodada de coleta dos indicadores do GT2.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs bg-stone-800/80 px-3 py-2 rounded-lg border border-stone-700/60 self-start lg:self-auto">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Ciclo de Referência:{' '}
                <strong className="text-white font-mono">Biênio 2025–2026</strong>
              </span>
            </div>
          </div>

          {/* 5 Cycle Status Blocks */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {CYCLE_STATUS_ITEMS.map((item, idx) => {
              const statusColor =
                item.status === 'Meta definida'
                  ? 'border-indigo-500/50 bg-indigo-950/30 text-indigo-300'
                  : item.status === 'Primeiro ciclo'
                  ? 'border-teal-500/50 bg-teal-950/30 text-teal-300'
                  : item.status === 'Aguardando linha de base'
                  ? 'border-amber-500/50 bg-amber-950/30 text-amber-300'
                  : item.status === 'Dados ainda não coletados'
                  ? 'border-rose-500/50 bg-rose-950/30 text-rose-300'
                  : 'border-stone-700 bg-stone-800/40 text-stone-400';

              return (
                <div
                  key={idx}
                  className="rounded-lg bg-stone-950/60 border border-stone-800/80 p-4 flex flex-col justify-between hover:border-stone-700 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-stone-400 block mb-1">
                      {item.dimensao}
                    </span>
                    <h3 className="text-sm font-semibold text-white leading-snug">
                      {item.titulo}
                    </h3>

                    {/* Status Pill */}
                    <div className="mt-2.5">
                      <span
                        className={`inline-block text-[11px] px-2 py-0.5 rounded border font-medium ${statusColor}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                      {item.detalhe}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800/80 text-[11px]">
                    <div className="text-stone-500 font-medium">Meta pactuada:</div>
                    <div className="text-stone-200 font-mono font-medium truncate" title={item.meta}>
                      {item.meta}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explicit Governance Note */}
          <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-start gap-2.5 text-xs text-stone-400">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-stone-200">Rigor Metodológico:</strong> O painel diferencia categoricamente metas pactuadas de resultados apurados. Onde ainda não há mensuração consolidada, os indicadores apresentam o estado de prontidão e a indicação de linha de base a ser fixada, garantindo total transparência e fidelidade técnica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
