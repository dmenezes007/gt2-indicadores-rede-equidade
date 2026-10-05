import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Compass,
  Building2,
  Layers,
  FileText,
  FileCheck,
  Calendar,
  X,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { IndicatorDefinition, Institution, MonitoringCycle } from '../types/dataModels';
import { DIMENSIONS } from '../data/dimensionsData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  indicators: IndicatorDefinition[];
  institutions: Institution[];
  cycles: MonitoringCycle[];
  onSelectIndicator: (id: string) => void;
  onSelectInstitution: (id: string) => void;
  onSelectDimension: (dimId: string) => void;
  onSelectCycle: (cycleId: string) => void;
  onOpenReport: () => void;
  onOpenEvidences: () => void;
  onOpenPendingTasks: () => void;
  onResetFilters: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  indicators,
  institutions,
  cycles,
  onSelectIndicator,
  onSelectInstitution,
  onSelectDimension,
  onSelectCycle,
  onOpenReport,
  onOpenEvidences,
  onOpenPendingTasks,
  onResetFilters,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingIndicators = indicators.filter(
    (i) =>
      i.code.toLowerCase().includes(q) ||
      i.name.toLowerCase().includes(q) ||
      i.dimensionId.toLowerCase().includes(q)
  );

  const matchingInstitutions = institutions.filter(
    (inst) =>
      inst.acronym.toLowerCase().includes(q) ||
      inst.name.toLowerCase().includes(q) ||
      (inst.institutionType && inst.institutionType.toLowerCase().includes(q))
  );

  const matchingDimensions = DIMENSIONS.filter(
    (d) =>
      d.nome.toLowerCase().includes(q) ||
      d.nomeCurto.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar comando, indicador, instituição, dimensão ou ciclo..."
            className="w-full text-sm bg-transparent border-none text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4 text-xs">
          {/* Quick Actions */}
          {!q && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-2 block mb-1">
                Ações Rápidas
              </span>
              <div className="space-y-0.5">
                <button
                  onClick={() => {
                    onOpenReport();
                    onClose();
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 flex items-center justify-between text-stone-800 dark:text-stone-200"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-stone-500" />
                    <span>Gerar Relatório Executivo</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </button>
                <button
                  onClick={() => {
                    onOpenEvidences();
                    onClose();
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 flex items-center justify-between text-stone-800 dark:text-stone-200"
                >
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-teal-500" />
                    <span>Abrir Repositório de Evidências</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </button>
                <button
                  onClick={() => {
                    onOpenPendingTasks();
                    onClose();
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 flex items-center justify-between text-stone-800 dark:text-stone-200"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Ver Central de Pendências do Ciclo</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </button>
                <button
                  onClick={() => {
                    onResetFilters();
                    onClose();
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 flex items-center justify-between text-stone-800 dark:text-stone-200"
                >
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-stone-500" />
                    <span>Limpar Todos os Filtros Ativos</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </button>
              </div>
            </div>
          )}

          {/* Indicators */}
          {matchingIndicators.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-2 block mb-1">
                Indicadores ({matchingIndicators.length})
              </span>
              <div className="space-y-0.5">
                {matchingIndicators.slice(0, 5).map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => {
                      onSelectIndicator(ind.id);
                      onClose();
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 flex items-center justify-between text-stone-800 dark:text-stone-200"
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="font-mono font-bold text-stone-900 dark:text-white">
                        {ind.code}
                      </span>
                      <span className="truncate">{ind.name}</span>
                    </div>
                    <span className="text-[10px] text-stone-400 shrink-0 font-mono">
                      {ind.dimensionId}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Institutions */}
          {matchingInstitutions.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-2 block mb-1">
                Instituições Partícipes ({matchingInstitutions.length})
              </span>
              <div className="space-y-0.5">
                {matchingInstitutions.slice(0, 4).map((inst) => (
                  <button
                    key={inst.id}
                    onClick={() => {
                      onSelectInstitution(inst.id);
                      onClose();
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 flex items-center justify-between text-stone-800 dark:text-stone-200"
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <Building2 className="w-3.5 h-3.5 text-teal-600" />
                      <span className="font-bold">{inst.acronym}</span>
                      <span className="truncate text-stone-500">{inst.name}</span>
                    </div>
                    <span className="text-[10px] text-stone-400 shrink-0">
                      {inst.institutionType}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dimensions */}
          {matchingDimensions.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-2 block mb-1">
                Dimensões Estratégicas
              </span>
              <div className="space-y-0.5">
                {matchingDimensions.map((dim) => (
                  <button
                    key={dim.id}
                    onClick={() => {
                      onSelectDimension(dim.id);
                      onClose();
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 flex items-center justify-between text-stone-800 dark:text-stone-200"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{dim.numero}. {dim.nome}</span>
                    </div>
                    <span className="text-[10px] text-stone-400">{dim.leituraGerencial}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Shortcut Info */}
        <div className="p-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-between text-[11px] text-stone-400">
          <span>Dica: Pressione <strong>ESC</strong> para fechar ou <strong>Ctrl+K</strong> em qualquer tela.</span>
          <span>Rede Equidade GT2</span>
        </div>
      </div>
    </div>
  );
};
