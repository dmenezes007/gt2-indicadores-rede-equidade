import React from 'react';
import { Award, BookOpen, Calendar, CheckSquare, Target, UserCheck } from 'lucide-react';
import { Indicator } from '../types/indicators';

interface ExecutionTrackerProps {
  onOpenIndicator: (indicatorId: string) => void;
}

export const ExecutionTracker: React.FC<ExecutionTrackerProps> = ({ onOpenIndicator }) => {
  return (
    <section className="py-8 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-700 dark:text-amber-400 mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Entregas de Capacitação & Formação</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-950 dark:text-white">
              Indicadores de Execução do Ciclo
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Acompanhamento quantitativo das oficinas e capacitações pactuadas nos resultados-chave 2.1 e 2.2 do GT2.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Execução ainda não informada • Escala de meta para referência</span>
          </div>
        </div>

        {/* 2 Execution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* I09: Oficinas do Modelo IDE (Meta: 2 oficinas) */}
          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                  I09 • PRODUTO / EXECUÇÃO
                </span>
                <span className="text-xs text-stone-500 font-medium">Semestral</span>
              </div>

              <h3 className="mt-3 text-lg font-bold text-stone-900 dark:text-white">
                Oficinas de Aplicação do Modelo IDE
              </h3>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Grau de execução da oferta de duas oficinas práticas de instrumentalização dos pontos focais para autoavaliação (Resultado-chave 2.1).
              </p>
            </div>

            {/* Visual Progress Scale */}
            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs text-stone-500">Escala da Meta do Ciclo</span>
                <span className="text-xs font-mono font-bold text-stone-900 dark:text-white">
                  Meta: 2 oficinas (100%)
                </span>
              </div>

              {/* Step Tracker */}
              <div className="relative flex items-center justify-between mt-4 mb-2">
                <div className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2 bg-stone-200 dark:bg-stone-800 rounded-full" />
                
                {/* 0 Milestone */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-stone-100 dark:bg-stone-800 border-2 border-stone-400 flex items-center justify-center text-[10px] font-mono font-bold text-stone-700 dark:text-stone-300">
                    0
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 font-mono">Início</span>
                </div>

                {/* 1 Milestone */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-white dark:bg-stone-900 border-2 border-dashed border-stone-300 dark:border-stone-700 flex items-center justify-center text-[10px] font-mono text-stone-500">
                    1
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 font-mono">1ª Oficina</span>
                </div>

                {/* 2 Milestone (Target) */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-[11px] font-mono shadow-xs">
                    2
                  </div>
                  <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 mt-1 font-mono">
                    Meta (100%)
                  </span>
                </div>
              </div>

              <div className="mt-4 p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-xs">
                <span className="text-stone-500 text-[11px]">
                  Fórmula: <code className="font-mono text-stone-700 dark:text-stone-300">(Oficinas ÷ 2) × 100</code>
                </span>
                <button
                  onClick={() => onOpenIndicator('I09')}
                  className="text-amber-700 dark:text-amber-400 font-semibold hover:underline"
                >
                  Ver detalhes I09 →
                </button>
              </div>
            </div>
          </div>

          {/* I10: Capacitações em IDE (Meta: 4 ações) */}
          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300">
                  I10 • PRODUTO / EXECUÇÃO
                </span>
                <span className="text-xs text-stone-500 font-medium">Trimestral</span>
              </div>

              <h3 className="mt-3 text-lg font-bold text-stone-900 dark:text-white">
                Capacitações em IDE para Servidores
              </h3>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Grau de execução da oferta de quatro ações de capacitação em diversidade, equidade e inclusão para o serviço público (Resultado-chave 2.2).
              </p>
            </div>

            {/* Visual Progress Scale */}
            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs text-stone-500">Escala da Meta do Ciclo</span>
                <span className="text-xs font-mono font-bold text-stone-900 dark:text-white">
                  Meta: 4 ações formativas (100%)
                </span>
              </div>

              {/* Step Tracker */}
              <div className="relative flex items-center justify-between mt-4 mb-2">
                <div className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2 bg-stone-200 dark:bg-stone-800 rounded-full" />
                
                {[0, 1, 2, 3, 4].map((step) => {
                  const isTarget = step === 4;
                  return (
                    <div key={step} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono ${
                          isTarget
                            ? 'w-7 h-7 bg-indigo-600 text-white font-bold shadow-xs'
                            : step === 0
                            ? 'bg-stone-100 dark:bg-stone-800 border-2 border-stone-400 text-stone-700 dark:text-stone-300 font-bold'
                            : 'bg-white dark:bg-stone-900 border-2 border-dashed border-stone-300 dark:border-stone-700 text-stone-500'
                        }`}
                      >
                        {step}
                      </div>
                      <span
                        className={`text-[9px] mt-1 font-mono ${
                          isTarget
                            ? 'font-bold text-indigo-700 dark:text-indigo-400'
                            : 'text-stone-400'
                        }`}
                      >
                        {step === 0 ? 'Início' : isTarget ? 'Meta (100%)' : `${step}ª ação`}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-xs">
                <span className="text-stone-500 text-[11px]">
                  Fórmula: <code className="font-mono text-stone-700 dark:text-stone-300">(Ações ÷ 4) × 100</code>
                </span>
                <button
                  onClick={() => onOpenIndicator('I10')}
                  className="text-indigo-700 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Ver detalhes I10 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
