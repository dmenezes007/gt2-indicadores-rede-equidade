import React, { useState, useMemo } from 'react';
import {
  ArrowUpDown, ArrowUp, ArrowDown, Search, SlidersHorizontal, Download,
  GitCompare, FileText, CheckSquare, Square, ChevronDown, ChevronUp,
  Table as TableIcon,
  X, Layers3,
} from 'lucide-react';
import { Indicator } from '../types/indicators';
import { exportIndicatorsToCSV } from '../utils/helpers';
import { DIMENSIONS } from '../data/dimensionsData';

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

type SortField = 'id' | 'indicador' | 'dimensao' | 'tipo' | 'periodicidade';
type SortDirection = 'asc' | 'desc';

export const AnalyticsMatrix: React.FC<AnalyticsMatrixProps> = ({
  indicators, onOpenIndicator, selectedIndicators, onToggleSelect, onSelectAll,
  onClearSelection, onOpenComparison, onOpenReportWithSelected,
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [dimensionFilter, setDimensionFilter] = useState('todas');
  const [periodicityFilter, setPeriodicityFilter] = useState('todas');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showExtraColumns, setShowExtraColumns] = useState(false);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const dimensions = useMemo(() => Array.from(new Set(indicators.map(i => i.dimensao))).sort(), [indicators]);
  const periodicities = useMemo(() => Array.from(new Set(indicators.map(i => i.periodicidade))), [indicators]);

  const processedIndicators = useMemo(() => {
    let result = [...indicators];
    const q = localSearch.trim().toLocaleLowerCase('pt-BR');

    if (q) {
      result = result.filter(i => [
        i.id, i.indicador, i.dimensao, i.tipo, i.categoriaTipo,
        i.fonte, i.definicao, i.formula, i.meta, i.rastreabilidade, i.observacao,
      ].some(value => String(value || '').toLocaleLowerCase('pt-BR').includes(q)));
    }
    if (dimensionFilter !== 'todas') result = result.filter(i => i.dimensao === dimensionFilter);
    if (periodicityFilter !== 'todas') result = result.filter(i => i.periodicidade === periodicityFilter);

    result.sort((a, b) => {
      const valA = String(a[sortField] ?? '');
      const valB = String(b[sortField] ?? '');
      const comparison = typeof valA === 'string'
        ? valA.localeCompare(String(valB), 'pt-BR', { numeric: true, sensitivity: 'base' })
        : Number(valA) - Number(valB);
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    return result;
  }, [indicators, localSearch, dimensionFilter, periodicityFilter, sortField, sortDirection]);

  const allFilteredSelected = processedIndicators.length > 0 && processedIndicators.every(i => selectedIndicators.includes(i.id));
  const hasLocalFilters = !!localSearch || dimensionFilter !== 'todas' || periodicityFilter !== 'todas';

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDirection('asc'); }
  };
  const sortIcon = (field: SortField) => sortField !== field
    ? <ArrowUpDown className="w-3 h-3 opacity-45" />
    : sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />;

  const toggleSelectAll = () => allFilteredSelected ? onClearSelection() : onSelectAll(processedIndicators.map(i => i.id));

  const toggleExpanded = (id: string) => setExpandedRows(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  );

  const clearLocalFilters = () => {
    setLocalSearch(''); setDimensionFilter('todas'); setPeriodicityFilter('todas');
  };

  const handleExportSelectedOrAll = () => {
    const toExport = selectedIndicators.length
      ? indicators.filter(i => selectedIndicators.includes(i.id))
      : processedIndicators;
    exportIndicatorsToCSV(toExport, 'rede-equidade-matriz-indicadores-gt2.csv');
  };

  const SortHeader = ({ field, children, className = '' }: { field: SortField; children: React.ReactNode; className?: string }) => (
    <th onClick={() => handleSort(field)} className={`py-3 px-3 cursor-pointer select-none hover:text-stone-950 dark:hover:text-white transition-colors ${className}`}>
      <div className="flex items-center gap-1.5">{children}{sortIcon(field)}</div>
    </th>
  );

  return (
    <section id="matriz" className="design-section design-section--matrix scroll-mt-24 py-12 lg:py-20 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400 mb-1.5">
              <TableIcon className="w-3.5 h-3.5" /><span>Matriz de Indicadores</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 dark:text-white">Tabela Dinâmica de Indicadores</h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Pesquise, cruze filtros, ordene colunas e expanda cada registro para revelar a camada técnica sem sobrecarregar a leitura principal.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowExtraColumns(v => !v)} className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${showExtraColumns ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 border-stone-900' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'}`}>
              <SlidersHorizontal className="w-3.5 h-3.5" />{showExtraColumns ? 'Ocultar colunas técnicas' : 'Colunas técnicas'}
            </button>
            <button onClick={handleExportSelectedOrAll} className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800">
              <Download className="w-3.5 h-3.5" />Exportar CSV
            </button>
          </div>
        </div>

        <div className="matrix-surface rounded-[1.75rem] border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-sm p-3 sm:p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(260px,1.6fr)_1fr_1fr_1fr_auto] gap-2.5">
            <label className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input value={localSearch} onChange={e => setLocalSearch(e.target.value)} placeholder="Buscar em todos os campos..." className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-300/60" />
            </label>
            <select value={dimensionFilter} onChange={e => setDimensionFilter(e.target.value)} className="px-3 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
              <option value="todas">Todas as dimensões</option>{dimensions.map(v => <option key={v}>{v}</option>)}
            </select>

            <select value={periodicityFilter} onChange={e => setPeriodicityFilter(e.target.value)} className="px-3 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
              <option value="todas">Todas as periodicidades</option>{periodicities.map(v => <option key={v}>{v}</option>)}
            </select>
            <button onClick={clearLocalFilters} disabled={!hasLocalFilters} className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-800 disabled:opacity-35 hover:bg-stone-50 dark:hover:bg-stone-800">
              <X className="w-3.5 h-3.5" />Limpar
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
            <span><strong className="text-stone-800 dark:text-stone-200">{processedIndicators.length}</strong> registros após cruzamento dos filtros</span>
            <span className="flex items-center gap-1"><Layers3 className="w-3.5 h-3.5" /> Busca textual + filtros operam em conjunto</span>
          </div>
        </div>

        {selectedIndicators.length > 0 && (
          <div className="p-3 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 flex flex-wrap items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2 text-xs"><span className="font-bold font-mono px-2 py-0.5 rounded bg-stone-700 dark:bg-stone-200">{selectedIndicators.length}</span><span>indicador(es) selecionado(s)</span></div>
            <div className="flex items-center gap-2 text-xs">
              <button onClick={onOpenComparison} disabled={selectedIndicators.length < 2 || selectedIndicators.length > 4} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-amber-400 text-stone-950 disabled:opacity-40"><GitCompare className="w-3.5 h-3.5" />Comparar</button>
              <button onClick={onOpenReportWithSelected} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 font-semibold"><FileText className="w-3.5 h-3.5" />Gerar relatório</button>
              <button onClick={onClearSelection} className="px-2 py-1.5 opacity-75 hover:opacity-100">Desmarcar</button>
            </div>
          </div>
        )}

        <div className="matrix-surface rounded-[1.75rem] border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs text-left border-separate border-spacing-0">
              <thead className="sticky top-0 z-20 bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 shadow-[0_1px_0_rgba(0,0,0,.08)]">
                <tr>
                  <th className="py-3 px-2 w-9 text-center"><button onClick={toggleSelectAll} title="Selecionar todos">{allFilteredSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}</button></th>
                  <th className="py-3 px-1 w-8" />
                  <SortHeader field="id">ID</SortHeader>
                  <SortHeader field="indicador" className="min-w-[260px]">Indicador</SortHeader>
                  <SortHeader field="dimensao" className="min-w-[170px]">Dimensão</SortHeader>
                  <SortHeader field="tipo">Tipo</SortHeader>
                  <SortHeader field="periodicidade">Periodicidade</SortHeader>
                  <th className="py-3 px-3 min-w-[180px]"><div className="flex flex-col gap-0.5"><span>Meta Proposta</span><span className="normal-case font-normal text-[9px] text-stone-400">Sujeita à pactuação institucional</span></div></th>
                  {showExtraColumns && <><th className="py-3 px-3 min-w-[220px]">Fonte</th><th className="py-3 px-3 min-w-[220px]">Rastreabilidade</th></>}
                </tr>
              </thead>
              <tbody className="text-stone-700 dark:text-stone-300">
                {processedIndicators.map(ind => {
                  const isSelected = selectedIndicators.includes(ind.id);
                  const isExpanded = expandedRows.includes(ind.id);
                  const columnCount = showExtraColumns ? 10 : 8;
                  const dimension = DIMENSIONS.find(d => d.id === ind.dimensaoId);
                  const dimensionRowClass = dimension ? `${dimension.cor.bgLight} ${dimension.cor.borderLight}` : 'border-stone-100 dark:border-stone-800';
                  return <React.Fragment key={ind.id}>
                    <tr onClick={() => toggleExpanded(ind.id)} className={`border-b transition-colors cursor-pointer ${dimensionRowClass} ${isSelected ? 'ring-1 ring-inset ring-stone-400/40' : 'hover:brightness-[0.98] dark:hover:brightness-110'}`}>
                      <td onClick={(e) => { e.stopPropagation(); onToggleSelect(ind.id); }} className="py-3 px-2 text-center cursor-pointer">{isSelected ? <CheckSquare className="w-4 h-4 mx-auto" /> : <Square className="w-4 h-4 mx-auto text-stone-400" />}</td>
                      <td className="py-3 px-1"><button onClick={(e) => { e.stopPropagation(); toggleExpanded(ind.id); }} className="w-6 h-6 rounded-md grid place-items-center border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800" aria-label={isExpanded ? 'Recolher detalhes' : 'Expandir detalhes'}>{isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}</button></td>
                      <td className="py-3 px-3 font-mono font-bold text-stone-950 dark:text-white">{ind.id}</td>
                      <td className="py-3 px-3 font-semibold text-stone-950 dark:text-white">{ind.indicador}</td>
                      <td className="py-3 px-3"><span className={`inline-flex px-2 py-1 rounded-md font-semibold ${dimension?.cor.badgeBg || 'bg-stone-100 dark:bg-stone-800'} ${dimension?.cor.badgeText || 'text-stone-600 dark:text-stone-300'}`}>{ind.dimensao}</span></td>
                      <td className="py-3 px-3 font-mono text-[10px]">{ind.tipo}</td>
                      <td className="py-3 px-3">{ind.periodicidade}</td>
                      <td className="py-3 px-3 font-medium">{ind.meta}</td>
                      {showExtraColumns && <><td className="py-3 px-3 text-[11px]">{ind.fonte}</td><td className="py-3 px-3 text-[11px]">{ind.rastreabilidade}</td></>}
                    </tr>
                    {isExpanded && <tr className={dimension ? `${dimension.cor.bgLight} ${dimension.cor.borderLight}` : "bg-stone-50/80 dark:bg-stone-950/55"}>
                      <td colSpan={columnCount} className="p-0">
                        <div className="px-5 sm:px-12 py-5 grid md:grid-cols-3 gap-5 border-y border-stone-200 dark:border-stone-800">
                          <div><p className="text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">Definição</p><p className="text-xs leading-relaxed">{ind.definicao}</p></div>
                          <div><p className="text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">Fórmula e unidade</p><p className="text-xs font-mono leading-relaxed">{ind.formula}</p><p className="mt-1 text-[11px] text-stone-500">{ind.unidade} · {ind.unidadeAnalise}</p></div>
                          <div><p className="text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">Observação / interpretação</p><p className="text-xs leading-relaxed">{ind.observacao || ind.interpretacao || 'Sem observação adicional.'}</p><button onClick={(e) => { e.stopPropagation(); onOpenIndicator(ind); }} className="mt-3 text-[11px] font-bold underline underline-offset-4">Abrir ficha completa →</button></div>
                        </div>
                      </td>
                    </tr>}
                  </React.Fragment>;
                })}
                {processedIndicators.length === 0 && <tr><td colSpan={10} className="py-14 text-center text-stone-500">Nenhum indicador corresponde aos filtros aplicados.</td></tr>}
              </tbody>
            </table>
          </div>

          <div className="p-3 sm:p-4 bg-stone-50 dark:bg-stone-950/60 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 text-xs text-stone-500">
            <span><strong className="text-stone-700 dark:text-stone-300">{processedIndicators.length}</strong> indicadores exibidos na mesma página</span>
            <span>Use busca, filtros e ordenação para refinar a matriz.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
