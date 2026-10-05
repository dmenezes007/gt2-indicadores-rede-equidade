import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  FilePlus,
  Share2,
  ExternalLink,
  ShieldCheck,
  Database,
  Calculator,
  Compass,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { Indicator } from '../types/indicators';
import { getPriorityBadgeClass, GLOSSARY } from '../utils/helpers';

interface IndicatorDrawerProps {
  indicator: Indicator | null;
  onClose: () => void;
  onAddToReport: (indicator: Indicator) => void;
  isInReport?: boolean;
}

export const IndicatorDrawer: React.FC<IndicatorDrawerProps> = ({
  indicator,
  onClose,
  onAddToReport,
  isInReport,
}) => {
  const [copied, setCopied] = useState(false);

  if (!indicator) return null;

  const priorityStyle = getPriorityBadgeClass(indicator.prioridade);

  const handleCopyFicha = () => {
    const text = `
FICHA TÉCNICA DO INDICADOR — REDE EQUIDADE (GT2)
--------------------------------------------------
ID: ${indicator.id}
Indicador: ${indicator.indicador}
Dimensão: ${indicator.dimensao}
Tipo: ${indicator.tipo}
Definição: ${indicator.definicao}
Fórmula de Cálculo: ${indicator.formula}
Unidade de Medida: ${indicator.unidade}
Periodicidade: ${indicator.periodicidade}
Unidade de Análise: ${indicator.unidadeAnalise}
Fonte de Evidência: ${indicator.fonte}
Meta Proposta: ${indicator.meta}
Prioridade: ${indicator.prioridade}
Rastreabilidade: ${indicator.rastreabilidade}
Responsável: ${indicator.responsavel}
Núcleo Recomendado: ${indicator.nucleoRecomendado ? 'Sim' : 'Não'}
Observação: ${indicator.observacao}
Como Interpretar: ${indicator.interpretacao || 'N/A'}
--------------------------------------------------
Painel de Indicadores GT2 • Rede Equidade (2026)
`.trim();

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white dark:bg-stone-950 border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-extrabold px-2.5 py-1 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950">
                  {indicator.id}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  {indicator.dimensao}
                </span>
                {indicator.nucleoRecomendado && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                    Núcleo Recomendado
                  </span>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
                aria-label="Fechar drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 id="slide-over-title" className="mt-3 text-xl font-extrabold text-stone-950 dark:text-white leading-tight">
              {indicator.indicador}
            </h2>
            <p className="mt-1 text-xs text-stone-500 font-mono">
              Tipo: {indicator.tipo} • Periodicidade: {indicator.periodicidade}
            </p>
          </div>

          {/* Body Content - Scrollable */}
          <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs text-stone-700 dark:text-stone-300">
            {/* Quick KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-stone-100/70 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Prioridade</span>
                <span className="font-semibold text-stone-900 dark:text-white mt-0.5 block">
                  {indicator.prioridade}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Unidade</span>
                <span className="font-mono font-semibold text-stone-900 dark:text-white mt-0.5 block">
                  {indicator.unidade}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Periodicidade</span>
                <span className="font-semibold text-stone-900 dark:text-white mt-0.5 block">
                  {indicator.periodicidade}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Núcleo</span>
                <span className="font-semibold text-stone-900 dark:text-white mt-0.5 block">
                  {indicator.nucleoRecomendado ? 'Recomendado' : 'Complementar'}
                </span>
              </div>
            </div>

            {/* Definição Operacional */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                <span>Definição Operacional</span>
              </h4>
              <p className="p-3 rounded-lg bg-stone-50 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800 leading-relaxed text-stone-800 dark:text-stone-200">
                {indicator.definicao}
              </p>
            </div>

            {/* Fórmula / Método de Cálculo */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-indigo-500" />
                <span>Fórmula e Método de Cálculo</span>
              </h4>
              <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
                <code className="font-mono font-semibold text-indigo-950 dark:text-indigo-300 block text-xs leading-relaxed">
                  {indicator.formula}
                </code>
                <div className="mt-2 text-[11px] text-stone-500">
                  Unidade de análise:{' '}
                  <strong className="text-stone-700 dark:text-stone-300">
                    {indicator.unidadeAnalise}
                  </strong>
                </div>
              </div>
            </div>

            {/* Meta Pactuada */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
                <span>Meta Pactuada</span>
              </h4>
              <div className="p-3 rounded-lg bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40">
                <span className="text-sm font-bold text-teal-900 dark:text-teal-300 font-mono">
                  {indicator.meta}
                </span>
                <span className="text-[11px] text-stone-500 block mt-1">
                  Nota do GT2: {indicator.observacao}
                </span>
              </div>
            </div>

            {/* Como Interpretar */}
            {indicator.interpretacao && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-500" />
                  <span>Como Interpretar</span>
                </h4>
                <p className="p-3 rounded-lg bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 leading-relaxed text-stone-700 dark:text-stone-300">
                  {indicator.interpretacao}
                </p>
              </div>
            )}

            {/* Fonte da Evidência */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-sky-500" />
                <span>Fonte da Evidência</span>
              </h4>
              <p className="p-3 rounded-lg bg-stone-50 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800 leading-relaxed">
                {indicator.fonte}
              </p>
            </div>

            {/* Responsabilidade & Rastreabilidade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">
                  Responsabilidade
                </span>
                <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800 font-medium text-stone-900 dark:text-white text-xs">
                  {indicator.responsavel}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">
                  Rastreabilidade Normativa
                </span>
                <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800 text-stone-600 dark:text-stone-400 text-xs leading-relaxed">
                  {indicator.rastreabilidade}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyFicha}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copiar Ficha Técnica</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onAddToReport(indicator)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isInReport
                    ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
                    : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700'
                }`}
              >
                <FilePlus className="w-3.5 h-3.5 text-stone-500" />
                <span>{isInReport ? 'No relatório ✓' : 'Adicionar ao Relatório'}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
