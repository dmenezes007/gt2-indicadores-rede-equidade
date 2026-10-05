import React from 'react';
import {
  FileText,
  SlidersHorizontal,
  Sun,
  Moon,
  Search,
} from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenReport: () => void;
  onToggleFilters: () => void;
  filtersOpen: boolean;
  activeFilterCount: number;
  onFocusSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenReport,
  onToggleFilters,
  filtersOpen,
  activeFilterCount,
  onFocusSearch,
}) => {
  return (
    <header className="app-header sticky top-0 z-40 w-full backdrop-blur-xl bg-stone-50/80 dark:bg-stone-950/80 border-b border-stone-200/70 dark:border-stone-800/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between min-h-16 py-2 gap-2 sm:gap-4">
          {/* Brand Left */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-none">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="font-bold tracking-tight text-stone-950 dark:text-stone-50 text-base">
                  REDE EQUIDADE
                </span>
                <span className="hidden sm:inline text-xs px-2 py-0.5 rounded font-mono font-medium tracking-wide bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  VERSÃO DE TRABALHO • 2026
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                Painel de Indicadores <span className="text-stone-300 dark:text-stone-700">|</span> GT2
              </p>
            </div>
          </div>

          {/* Section navigation — semantic anchors styled as buttons */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-white/65 dark:bg-stone-900/65 border border-stone-200/70 dark:border-stone-800/70 shadow-sm" aria-label="Navegação pelas seções do painel">
            {[
              ['#matriz', 'Matriz'],
              ['#dimensoes', 'Dimensões'],
              ['#maturidade-ide', 'Maturidade IDE'],
              ['#analise', 'Análise'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="px-3 py-2 rounded-lg text-[11px] font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-white dark:hover:bg-stone-800 hover:shadow-sm transition-all whitespace-nowrap"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Action buttons Right */}
          <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2 shrink-0 max-w-full">
            {/* Quick search button */}
            <button
              onClick={onFocusSearch}
              title="Buscar indicador (Ctrl+K)"
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded-lg transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Filter Toggle Button */}
            <button
              onClick={onToggleFilters}
              className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                filtersOpen || activeFilterCount > 0
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filtros</span>
              {activeFilterCount > 0 && (
                <span className="ml-1 w-4 h-4 text-[10px] flex items-center justify-center font-bold rounded-full bg-amber-500 text-stone-950">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded-lg transition-colors"
              title={darkMode ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
              aria-label="Alternar tema"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>

            {/* Generate Report Button */}
            <button
              onClick={onOpenReport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 shadow-sm transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gerar Relatório</span><span className="sm:hidden">Relatório</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
