import React, { useState, useMemo } from 'react';
import {
  ArrowUpDown,
  Search,
  SlidersHorizontal,
  Download,
  GitCompare,
  FileText,
  CheckSquare,
  Square,
  ChevronDown,
  Sparkles,
  Table as TableIcon,
} from 'lucide-react';
import { Indicator, Priority } from '../types/indicators';
import { exportIndicatorsToCSV, getPriorityBadgeClass } from '../utils/helpers';

interface AnalyticsMatrixProps {
  indicators: Indicator[];
  onOpenIndicator: (indicator: Indicator) => void;
  selectedIndicators: string[];
  onToggleSelect: (indicatorId: string) => void;
  onSelectAll: (indicatorIds: string[]) => void;
  onClearSelection: () => void;
  onOpenComparison: () => void;
  onOpenReportWithSelected: () => void;
}

type SortField = 'id' | 'indicador' | 'dimensao' | 'tipo' | 'periodicidade' | 'prioridade' | 'nucleoRecomendado';

export const AnalyticsMatrix: React.FC<AnalyticsMatrixProps> = ({
  indicators,
  onOpenIndicator,
  selectedIndicators,
  onToggleSelect,
  onSelectAll,
  onClearSelection,
  onOpenComparison,
  onOpenReportWithSelected,
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showExtraColumns, setShowExtraColumns] = useState(false);

  // Sorting and local filtering
  const processedIndicators = useMemo(() => {
    let result = [...indicators];

    if (localSearch.trim()) {
      const q = localSearch.toLowerCase();
      result = result.filter(
        (i) =>
          i.id.toLowerCase().includes(q) ||
          i.indicador.toLowerCase().includes(q) ||
          i.dimensao.toLowerCase().includes(q) ||
          i.responsavel.toLowerCase().includes(q) ||
          i.tipo.toLowerCase().includes(q) ||
          i.fonte.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (sortField === 'nucleoRecomendado') {
        valA = a.nucleoRecomendado ? 1 : 0;
        valB = b.nucleoRecomendado ? 1 : 0;
      }

      if (typeof valA === 'string') {
        return sortDirection === 'asc'
          ? valA.localeCompare(valB, 'pt-BR')
          : valB.localeCompare(valA, 'pt-BR');
      }

      return sortDirection === 'asc' ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
    });

    return result;
  }, [indicators, localSearch, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const allFilteredSelected =
    processedIndicators.length > 0 &&
    processedIndicators.every((i) => selectedIndicators.includes(i.id));

  const toggleSelectAllFiltered = () => {
    if (allFilteredSelected) {
      onClearSelection();
    } else {
      onSelectAll(processedIndicators.map((i) => i.id));
    }
  };

  const handleExportSelectedOrAll = () => {
    const toExport =
      selectedIndicators.length > 0
        ? indicators.filter((i) => selectedIndicators.includes(i.id))
        : processedIndicators;
    exportIndicatorsToCSV(toExport, 'rede-equidade-matriz-indicadores-gt2.csv');
  };

  return (
    <section id="matriz" className="scroll-mt-24 py-10 lg:py-14 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400 mb-1.5">
              <TableIcon className="w-3.5 h-3.5" />
              <span>Matriz Analítica Interativa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 dark:text-white">
              Tabela Completa de Indicadores
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Explore colunas operacionais, ordene por qualquer atributo e selecione registros para comparação ou emissão de relatório.
            </p>
          </div>

          {/* Quick Table Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Filtrar tabela..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
            </div>

            {/* Extra Columns Toggle */}
            <button
              onClick={() => setShowExtraColumns(!showExtraColumns)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                showExtraColumns
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 border-stone-900'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-50'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>{showExtraColumns ? 'Ocultar extras' : 'Colunas técnicas (+)'}</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={handleExportSelectedOrAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              title="Baixar CSV"
            >
              <Download className="w-3 h-3" />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* Selected Rows Action Banner */}
        {selectedIndicators.length > 0 && (
          <div className="p-3 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 flex flex-wrap items-center justify-between gap-3 shadow-md animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-200 dark:bg-stone-200 dark:text-stone-900">
                {selectedIndicators.length}
              </span>
              <span>
                {selectedIndicators.length === 1 ? 'indicador selecionado' : 'indicadores selecionados'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={onOpenComparison}
                disabled={selectedIndicators.length < 2 || selectedIndicators.length > 4}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  selectedIndicators.length >= 2 && selectedIndicators.length <= 4
                    ? 'bg-amber-400 text-stone-950 hover:bg-amber-300 shadow-xs'
                    : 'opacity-50 cursor-not-allowed bg-stone-800 text-stone-400 dark:bg-stone-300 dark:text-stone-600'
                }`}
                title={
                  selectedIndicators.length < 2
                    ? 'Selecione de 2 a 4 para comparar'
                    : selectedIndicators.length > 4
                    ? 'Máximo de 4 para comparação lado a lado'
                    : 'Comparar indicadores selecionados'
                }
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>Comparar ({selectedIndicators.length})</span>
              </button>

              <button
                onClick={onOpenReportWithSelected}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 dark:bg-stone-900/10 hover:bg-white/30 text-white dark:text-stone-900 font-semibold transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Gerar Relatório</span>
              </button>

              <button
                onClick={onClearSelection}
                className="px-2 py-1.5 text-stone-400 dark:text-stone-600 hover:text-white dark:hover:text-stone-900 transition-colors text-xs"
              >
                Desmarcar
              </button>
            </div>
          </div>
        )}

        {/* Table Container */}
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs text-left divide-y divide-stone-200 dark:divide-stone-800">
              {/* Sticky Header */}
              <thead className="bg-stone-50 dark:bg-stone-950/80 text-stone-600 dark:text-stone-400 font-medium">
                <tr>
                  <th className="py-3 px-3 w-10 text-center">
                    <button
                      onClick={toggleSelectAllFiltered}
                      className="text-stone-400 hover:text-stone-900 dark:hover:text-white"
                      title={allFilteredSelected ? 'Desmarcar todos' : 'Selecionar todos'}
                      aria-label="Selecionar todos"
                    >
                      {allFilteredSelected ? (
                        <CheckSquare className="w-4 h-4 text-stone-900 dark:text-stone-100" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>

                  <th
                    onClick={() => handleSort('id')}
                    className="py-3 px-3 cursor-pointer hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>ID</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('indicador')}
                    className="py-3 px-3 cursor-pointer hover:text-stone-900 dark:hover:text-white transition-colors min-w-[220px]"
                  >
                    <div className="flex items-center gap-1">
                      <span>Indicador</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('dimensao')}
                    className="py-3 px-3 cursor-pointer hover:text-stone-900 dark:hover:text-white transition-colors min-w-[150px]"
                  >
                    <div className="flex items-center gap-1">
                      <span>Dimensão</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('tipo')}
                    className="py-3 px-3 cursor-pointer hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Tipo</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('periodicidade')}
                    className="py-3 px-3 cursor-pointer hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Periodicidade</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>

                  <th className="py-3 px-3 min-w-[140px]">Meta Pactuada</th>

                  <th
                    onClick={() => handleSort('prioridade')}
                    className="py-3 px-3 cursor-pointer hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Prioridade</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>

                  <th className="py-3 px-3 min-w-[150px]">Responsável</th>

                  <th
                    onClick={() => handleSort('nucleoRecomendado')}
                    className="py-3 px-3 cursor-pointer hover:text-stone-900 dark:hover:text-white transition-colors text-center"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>Núcleo</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>

                  {/* Extra Technical Columns */}
                  {showExtraColumns && (
                    <>
                      <th className="py-3 px-3 min-w-[200px]">Definição</th>
                      <th className="py-3 px-3 min-w-[200px]">Fórmula</th>
                      <th className="py-3 px-3">Unidade</th>
                      <th className="py-3 px-3 min-w-[180px]">Fonte</th>
                      <th className="py-3 px-3 min-w-[180px]">Rastreabilidade</th>
                    </>
                  )}
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                {processedIndicators.map((ind) => {
                  const isSelected = selectedIndicators.includes(ind.id);
                  const priorityStyle = getPriorityBadgeClass(ind.prioridade);

                  return (
                    <tr
                      key={ind.id}
                      onClick={() => onOpenIndicator(ind)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-amber-50/60 dark:bg-amber-950/20'
                          : 'hover:bg-stone-50/80 dark:hover:bg-stone-800/40'
                      }`}
                    >
                      {/* Checkbox */}
                      <td
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSelect(ind.id);
                        }}
                        className="py-3 px-3 text-center"
                      >
                        <button
                          className="text-stone-400 hover:text-stone-900 dark:hover:text-white"
                          aria-label={`Selecionar ${ind.id}`}
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-stone-900 dark:text-stone-100" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* ID */}
                      <td className="py-3 px-3 font-mono font-bold text-stone-900 dark:text-white">
                        {ind.id}
                      </td>

                      {/* Name */}
                      <td className="py-3 px-3 font-semibold text-stone-900 dark:text-white">
                        {ind.indicador}
                      </td>

                      {/* Dimensão */}
                      <td className="py-3 px-3 text-stone-600 dark:text-stone-400">
                        {ind.dimensao}
                      </td>

                      {/* Tipo */}
                      <td className="py-3 px-3 font-mono text-[11px] text-stone-500">
                        {ind.tipo}
                      </td>

                      {/* Periodicidade */}
                      <td className="py-3 px-3 font-mono text-stone-600 dark:text-stone-400">
                        {ind.periodicidade}
                      </td>

                      {/* Meta */}
                      <td className="py-3 px-3 font-mono font-medium text-stone-900 dark:text-white text-[11px]">
                        {ind.meta}
                      </td>

                      {/* Prioridade */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${priorityStyle.dot}`} />
                          <span className="font-medium text-[11px]">{ind.prioridade}</span>
                        </div>
                      </td>

                      {/* Responsável */}
                      <td className="py-3 px-3 text-stone-600 dark:text-stone-400 text-[11px]">
                        {ind.responsavel}
                      </td>

                      {/* Núcleo */}
                      <td className="py-3 px-3 text-center">
                        {ind.nucleoRecomendado ? (
                          <span className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                            Sim
                          </span>
                        ) : (
                          <span className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500">
                            Não
                          </span>
                        )}
                      </td>

                      {/* Extra Columns */}
                      {showExtraColumns && (
                        <>
                          <td className="py-3 px-3 text-[11px] text-stone-500 max-w-xs truncate" title={ind.definicao}>
                            {ind.definicao}
                          </td>
                          <td className="py-3 px-3 font-mono text-[10px] text-stone-500 max-w-xs truncate" title={ind.formula}>
                            {ind.formula}
                          </td>
                          <td className="py-3 px-3 font-mono text-[11px]">
                            {ind.unidade}
                          </td>
                          <td className="py-3 px-3 text-[11px] text-stone-500 max-w-xs truncate" title={ind.fonte}>
                            {ind.fonte}
                          </td>
                          <td className="py-3 px-3 text-[11px] text-stone-500 max-w-xs truncate" title={ind.rastreabilidade}>
                            {ind.rastreabilidade}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer of Table */}
          <div className="p-3 bg-stone-50 dark:bg-stone-950/60 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
            <span>
              Exibindo <strong>{processedIndicators.length}</strong> de {indicators.length} indicadores
            </span>
            <span className="text-[11px]">
              Dica: Clique em qualquer linha para abrir os detalhes operacionais no drawer lateral.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
