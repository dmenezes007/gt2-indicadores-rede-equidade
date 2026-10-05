import React, { useState, useMemo } from 'react';
import {
  X,
  FileText,
  Download,
  Printer,
  Check,
  Eye,
  Sliders,
  Sparkles,
  Layers,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { Indicator, Priority } from '../types/indicators';
import { DIMENSIONS } from '../data/dimensionsData';
import { exportIndicatorsToCSV, exportIndicatorsToJSON } from '../utils/helpers';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  allIndicators: Indicator[];
  filteredIndicators: Indicator[];
  selectedIndicatorIds: string[];
}

type ReportScope = 'todos' | 'filtrados' | 'selecionados' | 'dimensao';
type ReportType = 'executivo' | 'gerencial' | 'matriz' | 'fichas';

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  allIndicators,
  filteredIndicators,
  selectedIndicatorIds,
}) => {
  const [scope, setScope] = useState<ReportScope>(
    selectedIndicatorIds.length > 0 ? 'selecionados' : 'todos'
  );
  const [reportType, setReportType] = useState<ReportType>('executivo');
  const [selectedDimension, setSelectedDimension] = useState<string>('governanca');

  // Options checkboxes
  const [includeMethodology, setIncludeMethodology] = useState(true);
  const [includeTraceability, setIncludeTraceability] = useState(true);
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [includeVisualSummary, setIncludeVisualSummary] = useState(true);

  // Compute active dataset based on scope
  const targetIndicators = useMemo(() => {
    switch (scope) {
      case 'selecionados':
        return allIndicators.filter((i) => selectedIndicatorIds.includes(i.id));
      case 'filtrados':
        return filteredIndicators;
      case 'dimensao':
        return allIndicators.filter((i) => i.dimensaoId === selectedDimension);
      case 'todos':
      default:
        return allIndicators;
    }
  }, [scope, allIndicators, filteredIndicators, selectedIndicatorIds, selectedDimension]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    exportIndicatorsToCSV(
      targetIndicators,
      `relatorio-indicadores-gt2-${reportType}.csv`
    );
  };

  const handleExportJSON = () => {
    exportIndicatorsToJSON(
      targetIndicators,
      `relatorio-indicadores-gt2-${reportType}.json`
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 flex items-center justify-center font-bold shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-950 dark:text-white">
                Central de Relatórios & Fichas Técnicas
              </h2>
              <p className="text-xs text-stone-500">
                Personalize o escopo, tipologia e formato documental para exportação ou impressão executiva.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Split into Settings & Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 divide-y lg:divide-y-0 lg:divide-x divide-stone-200 dark:divide-stone-800">
          {/* Settings Left Column (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-6 space-y-6 text-xs text-stone-700 dark:text-stone-300">
            {/* 1. Scope selection */}
            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider block mb-2 text-[10px]">
                1. Escopo de Indicadores
              </span>
              <div className="space-y-1.5">
                {[
                  { id: 'todos', label: `Todos os 15 Indicadores (${allIndicators.length})` },
                  { id: 'filtrados', label: `Somente Filtrados no Painel (${filteredIndicators.length})` },
                  {
                    id: 'selecionados',
                    label: `Somente Selecionados na Matriz (${selectedIndicatorIds.length})`,
                    disabled: selectedIndicatorIds.length === 0,
                  },
                  { id: 'dimensao', label: 'Filtrar por Dimensão Estratégica' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                      item.disabled
                        ? 'opacity-40 cursor-not-allowed border-stone-200 dark:border-stone-800'
                        : scope === item.id
                        ? 'border-stone-900 bg-stone-100 dark:border-stone-100 dark:bg-stone-800 font-semibold text-stone-950 dark:text-white'
                        : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 cursor-pointer'
                    }`}
                  >
                    <input
                      type="radio"
                      name="scope"
                      disabled={item.disabled}
                      checked={scope === item.id}
                      onChange={() => setScope(item.id as ReportScope)}
                      className="text-stone-900"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>

              {scope === 'dimensao' && (
                <div className="mt-2.5">
                  <select
                    value={selectedDimension}
                    onChange={(e) => setSelectedDimension(e.target.value)}
                    className="w-full py-1.5 px-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-medium"
                  >
                    {DIMENSIONS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.numero}. {d.nome}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* 2. Report Type */}
            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider block mb-2 text-[10px]">
                2. Tipo de Relatório
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'executivo', label: 'Resumo Executivo', desc: 'KPIs, cobertura e metas' },
                  { id: 'gerencial', label: 'Relatório Gerencial', desc: 'Análise por dimensão' },
                  { id: 'matriz', label: 'Matriz Técnica', desc: 'Tabela completa' },
                  { id: 'fichas', label: 'Fichas Detalhadas', desc: 'Fórmula, fonte e cálculo' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setReportType(type.id as ReportType)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      reportType === type.id
                        ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-950 font-semibold'
                        : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900'
                    }`}
                  >
                    <div className="font-bold text-xs">{type.label}</div>
                    <div className="text-[10px] opacity-75 mt-0.5">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Sections to Include */}
            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider block mb-2 text-[10px]">
                3. Seções a Incluir
              </span>
              <div className="space-y-1.5">
                {[
                  {
                    checked: includeVisualSummary,
                    setChecked: setIncludeVisualSummary,
                    label: 'Incluir visualizações e gráficos sintéticos',
                  },
                  {
                    checked: includeMethodology,
                    setChecked: setIncludeMethodology,
                    label: 'Incluir metodologia e requisitos do Modelo IDE',
                  },
                  {
                    checked: includeTraceability,
                    setChecked: setIncludeTraceability,
                    label: 'Incluir rastreabilidade normativa (ACT & Decretos)',
                  },
                  {
                    checked: includeRecommendations,
                    setChecked: setIncludeRecommendations,
                    label: 'Incluir 5 diretrizes de implementação do GT2',
                  },
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => item.setChecked(e.target.checked)}
                      className="rounded text-stone-900"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Right Column (7 cols) */}
          <div className="lg:col-span-7 p-5 sm:p-6 bg-stone-50/70 dark:bg-stone-900/30 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Pré-visualização do Documento</span>
                </div>
                <span className="font-mono text-[11px] text-stone-400">
                  {targetIndicators.length} {targetIndicators.length === 1 ? 'indicador' : 'indicadores'}
                </span>
              </div>

              {/* Document Mockup Box */}
              <div
                id="printable-report"
                className="mt-4 p-6 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 shadow-sm space-y-5 text-xs text-stone-800 dark:text-stone-200"
              >
                {/* Header of Report Document */}
                <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono tracking-wider uppercase text-stone-400 font-bold">
                        Rede Equidade • GT2
                      </span>
                      <h3 className="text-base font-extrabold text-stone-950 dark:text-white mt-0.5">
                        Relatório Técnico de Indicadores
                      </h3>
                      <p className="text-xs text-stone-500">
                        {reportType === 'executivo'
                          ? 'Resumo Executivo para Tomada de Decisão'
                          : reportType === 'gerencial'
                          ? 'Relatório Gerencial por Dimensão Estratégica'
                          : reportType === 'matriz'
                          ? 'Matriz Analítica Consolidada'
                          : 'Caderno de Fichas Técnicas dos Indicadores'}
                      </p>
                    </div>

                    <div className="text-right text-[10px] text-stone-400 font-mono">
                      <span>Ciclo 2025–2026</span>
                      <br />
                      <span>{new Date().toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                {/* Synthesis Strip */}
                {includeVisualSummary && (
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center">
                    <div>
                      <span className="text-[10px] text-stone-400 block">Indicadores</span>
                      <span className="text-base font-bold font-mono text-stone-950 dark:text-white">
                        {targetIndicators.length}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-[10px] text-stone-400 block">Horizontes</span>
                      <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                        Sem. • Anual • Bienal
                      </span>
                    </div>
                  </div>
                )}

                {/* Indicators Preview Table or List */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Relação dos Indicadores Incluídos
                  </span>
                  <div className="max-h-56 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800 border border-stone-100 dark:border-stone-800 rounded-lg">
                    {targetIndicators.map((ind) => (
                      <div key={ind.id} className="p-2.5 flex items-center justify-between text-[11px]">
                        <div>
                          <span className="font-mono font-bold mr-2 text-stone-900 dark:text-white">
                            {ind.id}
                          </span>
                          <span className="font-medium text-stone-800 dark:text-stone-200">
                            {ind.indicador}
                          </span>
                        </div>
                        <span className="font-mono text-stone-500 font-semibold shrink-0 ml-2">
                          {ind.meta}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Methodology note */}
                {includeMethodology && (
                  <div className="p-2.5 rounded bg-stone-50 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800 text-[11px] text-stone-500 leading-relaxed">
                    <strong className="text-stone-700 dark:text-stone-300">Metodologia IDE:</strong> Inclui requisitos transversais de Diversidade (7), Gênero (31) e Raça (31) em consonância com as diretrizes do ACT.
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar CSV</span>
                </button>

                <button
                  onClick={handleExportJSON}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir / Salvar PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
