import React from 'react';
import { X, GitCompare, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { Indicator } from '../types/indicators';
import { getPriorityBadgeClass } from '../utils/helpers';

interface ComparisonModalProps {
  indicators: Indicator[];
  onClose: () => void;
  onRemoveIndicator: (indicatorId: string) => void;
  onOpenIndicator: (indicator: Indicator) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  indicators,
  onClose,
  onRemoveIndicator,
  onOpenIndicator,
}) => {
  if (indicators.length === 0) return null;

  const fields: { label: string; key: keyof Indicator; isHighlightDiff?: boolean }[] = [
    { label: 'Dimensão Estratégica', key: 'dimensao', isHighlightDiff: true },
    { label: 'Tipo Metodológico', key: 'tipo', isHighlightDiff: true },
    { label: 'Periodicidade', key: 'periodicidade', isHighlightDiff: true },
    { label: 'Unidade de Medida', key: 'unidade' },
    { label: 'Meta Proposta', key: 'meta', isHighlightDiff: true },
    { label: 'Fonte de Evidência', key: 'fonte' },
    { label: 'Fórmula de Cálculo', key: 'formula' },
    { label: 'Rastreabilidade Normativa', key: 'rastreabilidade' },
  ];

  // Helper to check if values differ across the compared indicators
  const hasDifference = (key: keyof Indicator) => {
    if (indicators.length <= 1) return false;
    const firstVal = String(indicators[0][key]);
    return indicators.some((ind) => String(ind[key]) !== firstVal);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-950 dark:text-white">
                Comparação Lado a Lado de Indicadores
              </h2>
              <p className="text-xs text-stone-500">
                Comparando {indicators.length} indicadores selecionados. As linhas destacadas indicam diferenças metodológicas.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800"
            aria-label="Fechar comparação"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-x-auto max-h-[75vh]">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800">
                <th className="py-3 px-4 text-left font-bold text-stone-400 uppercase tracking-wider text-[10px] w-48 bg-stone-50/50 dark:bg-stone-900/50">
                  Atributo Técnico
                </th>
                {indicators.map((ind) => (
                  <th key={ind.id} className="py-3 px-4 text-left align-top min-w-[220px]">
                    <div className="flex items-start justify-between gap-2 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-extrabold px-2 py-0.5 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950">
                          {ind.id}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveIndicator(ind.id)}
                        className="text-stone-400 hover:text-rose-500 p-0.5"
                        title="Remover da comparação"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-bold text-sm text-stone-900 dark:text-white leading-snug">
                      {ind.indicador}
                    </div>
                    <button
                      onClick={() => onOpenIndicator(ind)}
                      className="mt-2 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <span>Abrir ficha completa</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
              {fields.map((f) => {
                const isDiff = hasDifference(f.key);
                return (
                  <tr
                    key={String(f.key)}
                    className={
                      isDiff
                        ? 'bg-amber-50/40 dark:bg-amber-950/10'
                        : 'hover:bg-stone-50/50 dark:hover:bg-stone-900/30'
                    }
                  >
                    <td className="py-3 px-4 font-bold text-stone-600 dark:text-stone-400 bg-stone-50/40 dark:bg-stone-900/40 flex items-center justify-between">
                      <span>{f.label}</span>
                      {isDiff && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Valores diferentes" />
                      )}
                    </td>

                    {indicators.map((ind) => {
                      const val = ind[f.key];
                      return (
                        <td key={ind.id} className="py-3 px-4 text-stone-800 dark:text-stone-200">
                          {f.key === 'meta' ? (
                            <strong className="font-mono text-stone-900 dark:text-white">
                              {String(val)}
                            </strong>
                          ) : f.key === 'formula' ? (
                            <code className="font-mono text-[10px] text-stone-600 dark:text-stone-400 block bg-stone-100 dark:bg-stone-900 p-1 rounded">
                              {String(val)}
                            </code>
                          ) : (
                            <span>{String(val)}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-between text-xs">
          <span className="text-stone-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Linhas com o ponto âmbar indicam variação de parâmetro entre os indicadores.</span>
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold"
          >
            Fechar Comparação
          </button>
        </div>
      </div>
    </div>
  );
};
