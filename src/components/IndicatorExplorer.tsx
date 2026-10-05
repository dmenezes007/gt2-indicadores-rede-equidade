import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  BookmarkPlus,
  CheckSquare,
  Square,
  Sparkles,
  Layers,
  Clock,
  Target,
  LayoutGrid,
  List,
} from 'lucide-react';
import { Indicator, Priority } from '../types/indicators';
import { getPriorityBadgeClass } from '../utils/helpers';

interface IndicatorExplorerProps {
  indicators: Indicator[];
  onOpenIndicator: (indicator: Indicator) => void;
  selectedIndicators: string[];
  onToggleSelect: (indicatorId: string) => void;
  onOpenComparison: () => void;
}

export const IndicatorExplorer: React.FC<IndicatorExplorerProps> = ({
  indicators,
  onOpenIndicator,
  selectedIndicators,
  onToggleSelect,
  onOpenComparison,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <section id="indicadores" className="scroll-mt-24 py-10 lg:py-14 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400 mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Catálogo Técnico</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 dark:text-white">
              Explorador de Indicadores
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Exibindo <strong className="text-stone-900 dark:text-white">{indicators.length}</strong> de 15 indicadores estruturados para o GT2.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Visualização em cards"
                aria-label="Cards"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Visualização em lista"
                aria-label="Lista"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* If items selected, quick compare trigger */}
            {selectedIndicators.length >= 2 && (
              <button
                onClick={onOpenComparison}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 shadow-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <span>Comparar ({selectedIndicators.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {indicators.length === 0 ? (
          <div className="p-12 text-center rounded-xl border border-dashed border-stone-300 dark:border-stone-800 bg-white/50 dark:bg-stone-900/50">
            <Compass className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
              Nenhum indicador corresponde aos filtros selecionados
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              Tente redefinir os filtros de busca ou limpar a barra de filtros para exibir os 15 indicadores.
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View of Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {indicators.map((ind) => {
              const priorityStyle = getPriorityBadgeClass(ind.prioridade);
              const isSelected = selectedIndicators.includes(ind.id);

              return (
                <div
                  key={ind.id}
                  onClick={() => onOpenIndicator(ind)}
                  className="group relative rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 flex flex-col justify-between hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-md transition-all cursor-pointer"
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-extrabold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100">
                          {ind.id}
                        </span>
                        {ind.nucleoRecomendado ? (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40">
                            Núcleo Recomendado
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-900/40">
                            Complementar
                          </span>
                        )}
                      </div>

                      {/* Checkbox for Compare Selection */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSelect(ind.id);
                        }}
                        className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 p-1"
                        title={isSelected ? 'Remover da seleção' : 'Selecionar para comparar'}
                        aria-label="Selecionar"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-stone-900 dark:text-stone-100" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Indicator Name */}
                    <h3 className="mt-3 text-base font-bold text-stone-950 dark:text-stone-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                      {ind.indicador}
                    </h3>

                    {/* Dimensão & Tipo */}
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                        {ind.dimensao}
                      </div>
                      <div className="text-[11px] font-mono text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/60 px-2 py-0.5 rounded inline-block">
                        {ind.tipo}
                      </div>
                    </div>

                    {/* Definition preview */}
                    <p className="mt-3 text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {ind.definicao}
                    </p>
                  </div>

                  {/* Card Footer: Target, Periodicity & Priority */}
                  <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-3">
                    {/* Meta Propsta */}
                    <div className="text-xs flex items-baseline justify-between">
                      <span className="text-stone-400 font-medium">Meta pactuada:</span>
                      <span className="font-mono font-bold text-stone-900 dark:text-white truncate max-w-[65%] text-right" title={ind.meta}>
                        {ind.meta}
                      </span>
                    </div>

                    {/* Priority & Periodicity Row */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${priorityStyle.dot}`} />
                        <span className="text-[11px] font-medium text-stone-600 dark:text-stone-300">
                          {ind.prioridade}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-stone-500 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{ind.periodicidade}</span>
                      </div>
                    </div>

                    {/* Ver Detalhes Button */}
                    <div className="pt-2 flex justify-end">
                      <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-stone-950 dark:group-hover:text-white flex items-center gap-1">
                        <span>Ver detalhes</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 divide-y divide-stone-100 dark:divide-stone-800 shadow-xs">
            {indicators.map((ind) => {
              const priorityStyle = getPriorityBadgeClass(ind.prioridade);
              const isSelected = selectedIndicators.includes(ind.id);

              return (
                <div
                  key={ind.id}
                  onClick={() => onOpenIndicator(ind)}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSelect(ind.id);
                      }}
                      className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 mt-1"
                      aria-label="Selecionar"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-stone-900 dark:text-stone-100" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white">
                          {ind.id}
                        </span>
                        <h3 className="text-sm font-bold text-stone-950 dark:text-stone-100 hover:text-indigo-600 transition-colors">
                          {ind.indicador}
                        </h3>
                        {ind.nucleoRecomendado && (
                          <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                            Núcleo
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                        {ind.dimensao} • <span className="font-mono">{ind.tipo}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 text-xs shrink-0 pl-7 md:pl-0">
                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 block">Meta</span>
                      <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">
                        {ind.meta}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 block">Periodicidade</span>
                      <span className="font-mono text-stone-600 dark:text-stone-400">
                        {ind.periodicidade}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${priorityStyle.dot}`} />
                      <span className="font-medium text-stone-700 dark:text-stone-300">
                        {ind.prioridade}
                      </span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
