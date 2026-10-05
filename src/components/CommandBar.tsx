import React, { useRef, useEffect } from 'react';
import {
  Search,
  X,
  RotateCcw,
  Check,
  ChevronDown,
} from 'lucide-react';
import { FilterState } from '../types/indicators';
import { DIMENSIONS } from '../data/dimensionsData';

interface CommandBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  totalCount: number;
  filteredCount: number;
  availableTypes: string[];
  isOpen: boolean;
  searchRef?: React.RefObject<HTMLInputElement | null>;
}

export const CommandBar: React.FC<CommandBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
  filteredCount,
  availableTypes,
  isOpen,
  searchRef,
}) => {
  const localSearchRef = useRef<HTMLInputElement>(null);
  const inputRef = searchRef || localSearchRef;

  // Active filter count (excluding search query)
  const activeChips: { label: string; onRemove: () => void }[] = [];

  filters.dimensoes.forEach((dim) => {
    const dimName = DIMENSIONS.find((d) => d.id === dim)?.nome || dim;
    activeChips.push({
      label: `Dimensão: ${dimName}`,
      onRemove: () =>
        onFilterChange({
          ...filters,
          dimensoes: filters.dimensoes.filter((d) => d !== dim),
        }),
    });
  });

  filters.periodicidades.forEach((per) => {
    activeChips.push({
      label: `Periodicidade: ${per}`,
      onRemove: () =>
        onFilterChange({
          ...filters,
          periodicidades: filters.periodicidades.filter((item) => item !== per),
        }),
    });
  });

  filters.tipos.forEach((t) => {
    activeChips.push({
      label: `Tipo: ${t}`,
      onRemove: () =>
        onFilterChange({
          ...filters,
          tipos: filters.tipos.filter((item) => item !== t),
        }),
    });
  });

  if (filters.search.trim()) {
    activeChips.push({
      label: `Busca: "${filters.search}"`,
      onRemove: () => onFilterChange({ ...filters, search: '' }),
    });
  }

  const toggleDimension = (dimId: string) => {
    const next = filters.dimensoes.includes(dimId)
      ? filters.dimensoes.filter((d) => d !== dimId)
      : [...filters.dimensoes, dimId];
    onFilterChange({ ...filters, dimensoes: next });
  };

  const togglePeriodicity = (per: string) => {
    const next = filters.periodicidades.includes(per)
      ? filters.periodicidades.filter((item) => item !== per)
      : [...filters.periodicidades, per];
    onFilterChange({ ...filters, periodicidades: next });
  };

  const toggleType = (t: string) => {
    const next = filters.tipos.includes(t)
      ? filters.tipos.filter((item) => item !== t)
      : [...filters.tipos, t];
    onFilterChange({ ...filters, tipos: next });
  };

  return (
    <section className="bg-stone-100/70 dark:bg-stone-900/60 border-b border-stone-200/80 dark:border-stone-800/80 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        {/* Main Search Bar & Quick Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              ref={inputRef}
              type="text"
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              placeholder="Buscar indicador, dimensão, fonte ou referência..."
              className="w-full pl-10 pr-9 py-2 text-sm rounded-lg bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600 transition-all shadow-xs"
            />
            {filters.search && (
              <button
                onClick={() => onFilterChange({ ...filters, search: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                aria-label="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Counter and Reset */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs shrink-0">
            <div className="text-stone-600 dark:text-stone-400">
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {filteredCount}
              </span>{' '}
              de {totalCount} indicadores
            </div>

            {activeChips.length > 0 && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white px-2 py-1 rounded bg-stone-200/60 dark:bg-stone-800 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpar filtros</span>
              </button>
            )}
          </div>
        </div>

        {/* Multi-selection Filter Rows (collapsible or toggled) */}
        {isOpen && (
          <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 text-xs animate-in fade-in duration-200">
            {/* Dimensão Filter */}
            <div>
              <span className="font-semibold text-stone-700 dark:text-stone-300 mb-1.5 block uppercase tracking-wider text-[10px]">
                Dimensão
              </span>
              <div className="flex flex-wrap gap-1.5">
                {DIMENSIONS.map((dim) => {
                  const active = filters.dimensoes.includes(dim.id);
                  return (
                    <button
                      key={dim.id}
                      onClick={() => toggleDimension(dim.id)}
                      className={`px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                        active
                          ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-medium'
                          : 'bg-white dark:bg-stone-950 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900'
                      }`}
                    >
                      {active && <Check className="w-3 h-3" />}
                      <span>{dim.nome}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Periodicidade Filter */}
            <div>
              <span className="font-semibold text-stone-700 dark:text-stone-300 mb-1.5 block uppercase tracking-wider text-[10px]">
                Periodicidade
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['Trimestral', 'Semestral', 'Anual', 'Bienal', 'Por ação'].map((per) => {
                  const active = filters.periodicidades.includes(per);
                  return (
                    <button
                      key={per}
                      onClick={() => togglePeriodicity(per)}
                      className={`px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                        active
                          ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-medium'
                          : 'bg-white dark:bg-stone-950 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900'
                      }`}
                    >
                      {active && <Check className="w-3 h-3" />}
                      <span>{per}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Active Chips Strip */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-stone-500 dark:text-stone-400 font-medium text-[11px] mr-1">
              Filtros ativos:
            </span>
            {activeChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300/60 dark:border-stone-700/60 text-xs"
              >
                <span>{chip.label}</span>
                <button
                  onClick={chip.onRemove}
                  className="p-0.5 hover:text-stone-950 dark:hover:text-white rounded-full"
                  aria-label={`Remover ${chip.label}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
