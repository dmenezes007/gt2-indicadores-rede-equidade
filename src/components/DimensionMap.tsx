import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { DIMENSIONS } from '../data/dimensionsData';
import { INDICATORS } from '../data/indicatorsData';
import { Indicator } from '../types/indicators';

interface DimensionMapProps {
  onSelectDimension: (dimensionId: string) => void;
  selectedDimensionId?: string;
  onOpenIndicator: (indicator: Indicator) => void;
}

export const DimensionMap: React.FC<DimensionMapProps> = ({
  onSelectDimension,
  selectedDimensionId,
  onOpenIndicator,
}) => {
  const [hoveredDim, setHoveredDim] = useState<string | null>(null);

  return (
    <section id="dimensoes" className="scroll-mt-24 py-10 lg:py-14 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400 mb-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Arquitetura de Avaliação</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 dark:text-white">
              Mapa das Cinco Dimensões Estratégicas
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-2xl">
              Clique em uma dimensão para filtrar os indicadores ou passe o mouse para inspecionar os indicadores vinculados.
            </p>
          </div>

          {selectedDimensionId && (
            <button
              onClick={() => onSelectDimension('')}
              className="text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 self-start md:self-auto"
            >
              <span>Limpar filtro de dimensão</span>
            </button>
          )}
        </div>

        {/* 5 Dimension Interactive Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {DIMENSIONS.map((dim) => {
            const isSelected = selectedDimensionId === dim.id;
            const isHovered = hoveredDim === dim.id;
            const dimIndicators = INDICATORS.filter((ind) =>
              dim.indicadoresIds.includes(ind.id)
            );

            return (
              <div
                key={dim.id}
                onMouseEnter={() => setHoveredDim(dim.id)}
                onMouseLeave={() => setHoveredDim(null)}
                className={`group relative rounded-xl border p-5 flex flex-col justify-between transition-all duration-300 ${
                  isSelected
                    ? 'ring-2 ring-stone-900 dark:ring-stone-100 border-stone-900 dark:border-stone-100 bg-white dark:bg-stone-900 shadow-md scale-[1.02]'
                    : isHovered
                    ? 'border-stone-400 dark:border-stone-600 bg-white dark:bg-stone-900 shadow-md'
                    : 'border-stone-200 dark:border-stone-800/80 bg-white/70 dark:bg-stone-900/50 hover:bg-white dark:hover:bg-stone-900'
                }`}
              >
                {/* Top: Number & Indicators Count */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                    <span className="font-mono text-xs font-bold text-stone-400 dark:text-stone-500">
                      {dim.numero}
                    </span>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {dim.indicadoresIds.length} {dim.indicadoresIds.length === 1 ? 'indicador' : 'indicadores'}
                    </span>
                  </div>

                  {/* Dimension Name */}
                  <h3 className="mt-3 text-base font-bold text-stone-950 dark:text-stone-100 group-hover:text-stone-900 dark:group-hover:text-white transition-colors leading-snug">
                    {dim.nome}
                  </h3>

                  {/* Leitura Gerencial Pill */}
                  <div className="mt-2">
                    <span className="inline-block text-[11px] font-medium text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/80 px-2 py-0.5 rounded">
                      Foco: <strong className="text-stone-800 dark:text-stone-200">{dim.leituraGerencial}</strong>
                    </span>
                  </div>

                  {/* Finalidade */}
                  <div className="mt-3 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">Finalidade: </span>
                    {dim.finalidade}
                  </div>

                  {/* Micro Visual representation */}
                  <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/80">
                    <div className="flex items-center gap-1.5 mb-2">
                      {dim.indicadoresIds.map((id) => (
                        <span
                          key={id}
                          className="h-1.5 flex-1 rounded-full bg-stone-200 dark:bg-stone-800 group-hover:bg-stone-400 dark:group-hover:bg-stone-600 transition-colors"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400 block truncate">
                      {dim.estadoAcompanhamento}
                    </span>
                  </div>

                  {/* Revealed indicators on hover or select */}
                  {(isHovered || isSelected) && (
                    <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 space-y-1 animate-in fade-in duration-150">
                      <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                        Indicadores vinculados:
                      </span>
                      {dimIndicators.map((ind) => (
                        <button
                          key={ind.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenIndicator(ind);
                          }}
                          className="w-full text-left text-xs py-1 px-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-between text-stone-700 dark:text-stone-300 group/ind"
                        >
                          <span className="truncate pr-1">
                            <strong className="font-mono text-stone-900 dark:text-white mr-1">
                              {ind.id}
                            </strong>
                            {ind.indicador}
                          </span>
                          <ArrowRight className="w-3 h-3 text-stone-400 opacity-0 group-hover/ind:opacity-100 transition-opacity shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Action: Click to filter */}
                <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => onSelectDimension(isSelected ? '' : dim.id)}
                    className="w-full py-1.5 px-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors"
                  >
                    <span>{isSelected ? 'Dimensão ativa ✓' : 'Filtrar por esta dimensão'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
