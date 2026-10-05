import React, { useState } from 'react';
import {
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { IDE_OFFICIAL_REQUIREMENTS } from '../data/ideRequirements';
import { INDICATORS } from '../data/indicatorsData';
import { Indicator } from '../types/indicators';

interface MaturityIDEProps {
  onOpenIndicator: (ind: Indicator) => void;
}

export const MaturityIDE: React.FC<MaturityIDEProps> = ({ onOpenIndicator }) => {
  const i05 = INDICATORS.find((i) => i.id === 'I05');
  const i06 = INDICATORS.find((i) => i.id === 'I06');
  const i07 = INDICATORS.find((i) => i.id === 'I07');
  const i08 = INDICATORS.find((i) => i.id === 'I08');
  const [openRequirement, setOpenRequirement] = useState<number | null>(null);
  const requirementsFor = (category: 'diversidade' | 'genero' | 'raca') => IDE_OFFICIAL_REQUIREMENTS.filter((req) => req.categories.includes(category));

  const requirementGrid = (category: 'diversidade' | 'genero' | 'raca', tone: string, tooltipTone: string) => (
    <div className={`grid ${category === 'diversidade' ? 'grid-cols-7' : 'grid-cols-8 sm:grid-cols-10'} gap-1.5`}>
      {requirementsFor(category).map((req) => (
        <div key={req.id} className="group relative">
          <button type="button" onClick={(e) => { e.stopPropagation(); setOpenRequirement(openRequirement === req.id ? null : req.id); }} aria-expanded={openRequirement === req.id} aria-label={`Requisito ${req.id}: ${req.question}`} className={`w-full ${category === 'diversidade' ? 'h-8' : 'h-7'} rounded-md border ${tone} flex items-center justify-center text-[10px] font-mono font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1`}>
            {req.id}
          </button>
          <div className={`${openRequirement === req.id ? 'block' : 'hidden group-hover:block group-focus-within:block'} absolute z-40 bottom-full mb-2 w-[min(20rem,calc(100vw-2rem))] ${req.id % 5 < 2 ? 'left-0' : 'right-0'} rounded-xl border p-4 shadow-xl text-left ${tooltipTone}`}>
            <div className="text-[10px] font-mono font-bold opacity-80">REQUISITO {req.id}</div>
            <div className="mt-1 text-[10px] font-semibold opacity-60">{req.dimension} • {req.theme}</div>
            <p className="mt-2 text-xs font-semibold leading-relaxed">{req.question}</p>
            <p className="mt-2 pt-2 border-t border-current/10 text-[11px] leading-relaxed opacity-80">{req.explanation}</p>
            <div className="mt-2 text-[9px] uppercase tracking-wider font-semibold opacity-60">Resposta: Sim ou Não</div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="maturidade-ide" className="design-section design-section--ide scroll-mt-24 py-12 lg:py-20 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-teal-700 dark:text-teal-400 mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Diagnóstico Metodológico</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 dark:text-white">
              Maturidade no Modelo IDE
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-3xl">
              O Modelo IDE é estruturado em 3 dimensões e 10 temas, reunindo 38 requisitos institucionais. Cada requisito é respondido com “Sim” ou “Não” nas categorias a que se aplica — Diversidade, Gênero e/ou Raça — e o resultado é calculado pela soma das respostas “Sim”.
            </p>
            <div className="mt-3 max-w-3xl rounded-xl border border-teal-200/70 dark:border-teal-900/60 bg-teal-50/60 dark:bg-teal-950/20 px-4 py-3 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              <strong className="text-teal-800 dark:text-teal-300">Como funciona:</strong> os 38 requisitos são as perguntas do instrumento oficial. Nem todas as perguntas se aplicam às três categorias. Por isso, o mesmo conjunto de requisitos produz três escalas de resultado: Diversidade (0–7), Gênero (0–31) e Raça (0–31).
            </div>
          </div>


        </div>

        {/* Previous Cycle Warning / Current Cycle Readiness */}
                  <div className="space-y-6">
            {/* The 3 Core Scales Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Scale 1: Diversidade (7 requisitos) - I05 */}
              <div
                className={`ide-scale-card cursor-pointer relative overflow-visible rounded-[1.75rem] border p-6 bg-white dark:bg-stone-900 transition-all border-teal-200 dark:border-teal-900/70 hover:border-teal-500 shadow-sm`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300">
                    I05 • DIVERSIDADE
                  </span>
                  <span className="text-xs text-stone-400 font-medium">Autoavaliação</span>
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                      Escala de Diversidade
                    </h3>
                    <span className="text-2xl font-mono font-extrabold text-teal-600 dark:text-teal-400">
                      7
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Requisitos transversais de política institucional e governança.
                  </p>
                </div>

                {/* Dot Matrix Waffle: 7 blocks */}
                <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <div className="flex justify-between text-[11px] text-stone-500 mb-2">
                    <span>Escala 0–7</span>
                    
                  </div>
                  {requirementGrid('diversidade', 'border-teal-200 dark:border-teal-800/60 bg-teal-50/70 dark:bg-teal-950/30 text-teal-800 dark:text-teal-300 hover:border-teal-500', 'border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950 text-teal-950 dark:text-teal-100')}
                </div>

                {/* Link to Indicator */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap justify-between items-center gap-2 text-xs">
                  
                  {i05 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenIndicator(i05);
                      }}
                      className="text-teal-700 dark:text-teal-400 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>Ver ficha I05</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Scale 2: Gênero (31 requisitos) - I06 */}
              <div
                className={`ide-scale-card cursor-pointer relative overflow-visible rounded-[1.75rem] border p-6 bg-white dark:bg-stone-900 transition-all border-indigo-200 dark:border-indigo-900/70 hover:border-indigo-500 shadow-sm`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300">
                    I06 • GÊNERO
                  </span>
                  <span className="text-xs text-stone-400 font-medium">Autoavaliação</span>
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                      Escala de Gênero
                    </h3>
                    <span className="text-2xl font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                      31
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Equidade de liderança, parentalidade, combate a assédio e proteção.
                  </p>
                </div>

                {/* Dot Matrix Waffle: 31 blocks */}
                <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <div className="flex justify-between text-[11px] text-stone-500 mb-2">
                    <span>Escala 0–31</span>
                    
                  </div>
                  {requirementGrid('genero', 'border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/70 dark:bg-indigo-950/30 text-indigo-800 dark:text-indigo-300 hover:border-indigo-500', 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950 text-indigo-950 dark:text-indigo-100')}
                </div>

                {/* Link to Indicator */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap justify-between items-center gap-2 text-xs">
                  
                  {i06 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenIndicator(i06);
                      }}
                      className="text-indigo-700 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>Ver ficha I06</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Scale 3: Raça (31 requisitos) - I07 */}
              <div
                className={`ide-scale-card cursor-pointer relative overflow-visible rounded-[1.75rem] border p-6 bg-white dark:bg-stone-900 transition-all border-amber-200 dark:border-amber-900/70 hover:border-amber-500 shadow-sm`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                    I07 • RAÇA
                  </span>
                  <span className="text-xs text-stone-400 font-medium">Autoavaliação</span>
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                      Escala de Raça
                    </h3>
                    <span className="text-2xl font-mono font-extrabold text-amber-600 dark:text-amber-400">
                      31
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Enfrentamento ao racismo, representatividade e ações afirmativas.
                  </p>
                </div>

                {/* Dot Matrix Waffle: 31 blocks */}
                <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <div className="flex justify-between text-[11px] text-stone-500 mb-2">
                    <span>Escala 0–31</span>
                    
                  </div>
                  {requirementGrid('raca', 'border-amber-200 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 hover:border-amber-500', 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 text-amber-950 dark:text-amber-100')}
                </div>

                {/* Link to Indicator */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap justify-between items-center gap-2 text-xs">
                  
                  {i07 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenIndicator(i07);
                      }}
                      className="text-amber-700 dark:text-amber-400 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>Ver ficha I07</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              <div className="ide-scale-card relative overflow-visible rounded-[1.75rem] border border-sky-200 dark:border-sky-900/70 bg-white dark:bg-stone-900 p-6 shadow-sm hover:border-sky-500 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300">I08 • EVOLUÇÃO LONGITUDINAL</span>
                    <span className="text-xs text-stone-400 font-medium">Bienal</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white">Taxa de Evolução da Maturidade</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">Mede o percentual de partícipes que melhoram seu escore em ao menos uma categoria — Diversidade, Gênero ou Raça — em relação ao ciclo anterior.</p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2 text-xs">
                    <div className="flex flex-wrap justify-between gap-2"><span className="text-stone-500">Meta proposta</span><span className="font-mono font-bold text-sky-700 dark:text-sky-300">≥ 70% dos partícipes</span></div>
                    <div className="flex flex-wrap justify-between gap-2"><span className="text-stone-500">Unidade de análise</span><span className="text-stone-700 dark:text-stone-300">Instituições comparáveis</span></div>
                  </div>
                </div>
                {i08 && <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-start text-xs"><button onClick={() => onOpenIndicator(i08)} className="text-sky-700 dark:text-sky-400 font-medium hover:underline flex items-center gap-1"><span>Ver ficha I08</span><ArrowUpRight className="w-3 h-3" /></button></div>}
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};
