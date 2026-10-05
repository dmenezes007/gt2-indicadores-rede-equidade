import React, { useState } from 'react';
import {
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { IDE_REQUIREMENTS, IDE_MODEL_STRUCTURE } from '../data/cycleData';
import { IDE_OFFICIAL_REQUIREMENTS } from '../data/ideRequirements';
import { INDICATORS } from '../data/indicatorsData';
import { Indicator } from '../types/indicators';

interface MaturityIDEProps {
  onOpenIndicator: (ind: Indicator) => void;
}

export const MaturityIDE: React.FC<MaturityIDEProps> = ({ onOpenIndicator }) => {
  const [activeCategory, setActiveCategory] = useState<'diversidade' | 'genero' | 'raca'>('diversidade');

  const i05 = INDICATORS.find((i) => i.id === 'I05');
  const i06 = INDICATORS.find((i) => i.id === 'I06');
  const i07 = INDICATORS.find((i) => i.id === 'I07');
  const i08 = INDICATORS.find((i) => i.id === 'I08');
  const [openRequirement, setOpenRequirement] = useState<number | null>(null);
  const requirementsFor = (category: 'diversidade' | 'genero' | 'raca') => IDE_OFFICIAL_REQUIREMENTS.filter((req) => req.categories.includes(category));

  const requirementGrid = (category: 'diversidade' | 'genero' | 'raca', tone: string) => (
    <div className={`grid ${category === 'diversidade' ? 'grid-cols-7' : 'grid-cols-8 sm:grid-cols-10'} gap-1.5`}>
      {requirementsFor(category).map((req) => (
        <div key={req.id} className="group relative">
          <button type="button" onClick={(e) => { e.stopPropagation(); setOpenRequirement(openRequirement === req.id ? null : req.id); }} aria-expanded={openRequirement === req.id} aria-label={`Requisito ${req.id}: ${req.question}`} className={`w-full ${category === 'diversidade' ? 'h-8' : 'h-7'} rounded-md border ${tone} flex items-center justify-center text-[10px] font-mono font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1`}>
            {req.id}
          </button>
          <div className={`${openRequirement === req.id ? 'block' : 'hidden group-hover:block group-focus-within:block'} absolute z-40 bottom-full mb-2 w-[min(20rem,calc(100vw-2rem))] ${req.id % 5 < 2 ? 'left-0' : 'right-0'} rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 p-4 shadow-xl text-left`}>
            <div className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-400">REQUISITO {req.id}</div>
            <div className="mt-1 text-[10px] font-semibold text-stone-400">{req.dimension} • {req.theme}</div>
            <p className="mt-2 text-xs font-semibold leading-relaxed text-stone-900 dark:text-white">{req.question}</p>
            <p className="mt-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">{req.explanation}</p>
            <div className="mt-2 text-[9px] uppercase tracking-wider font-semibold text-stone-400">Resposta: Sim ou Não</div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="maturidade-ide" className="scroll-mt-24 py-10 lg:py-14 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/40">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Scale 1: Diversidade (7 requisitos) - I05 */}
              <div
                onClick={() => setActiveCategory('diversidade')}
                className={`cursor-pointer rounded-xl border p-6 bg-white dark:bg-stone-900 transition-all ${
                  activeCategory === 'diversidade'
                    ? 'ring-2 ring-teal-600 dark:ring-teal-400 border-teal-600 dark:border-teal-400 shadow-md'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-400'
                }`}
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
                    <span className="font-mono text-amber-600 dark:text-amber-400">Linha de base</span>
                  </div>
                  {requirementGrid('diversidade', 'border-teal-200 dark:border-teal-800/60 bg-teal-50/70 dark:bg-teal-950/30 text-teal-800 dark:text-teal-300 hover:border-teal-500')}
                </div>

                {/* Link to Indicator */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap justify-between items-center gap-2 text-xs">
                  <span className="text-stone-500 text-[11px]">Meta: 1º Ciclo de Base</span>
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
                onClick={() => setActiveCategory('genero')}
                className={`cursor-pointer rounded-xl border p-6 bg-white dark:bg-stone-900 transition-all ${
                  activeCategory === 'genero'
                    ? 'ring-2 ring-indigo-600 dark:ring-indigo-400 border-indigo-600 dark:border-indigo-400 shadow-md'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-400'
                }`}
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
                    <span className="font-mono text-amber-600 dark:text-amber-400">Linha de base</span>
                  </div>
                  {requirementGrid('genero', 'border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/70 dark:bg-indigo-950/30 text-indigo-800 dark:text-indigo-300 hover:border-indigo-500')}
                </div>

                {/* Link to Indicator */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap justify-between items-center gap-2 text-xs">
                  <span className="text-stone-500 text-[11px]">Meta: 1º Ciclo de Base</span>
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
                onClick={() => setActiveCategory('raca')}
                className={`cursor-pointer rounded-xl border p-6 bg-white dark:bg-stone-900 transition-all ${
                  activeCategory === 'raca'
                    ? 'ring-2 ring-amber-600 dark:ring-amber-400 border-amber-600 dark:border-amber-400 shadow-md'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-400'
                }`}
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
                    <span className="font-mono text-amber-600 dark:text-amber-400">Linha de base</span>
                  </div>
                  {requirementGrid('raca', 'border-amber-200 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 hover:border-amber-500')}
                </div>

                {/* Link to Indicator */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap justify-between items-center gap-2 text-xs">
                  <span className="text-stone-500 text-[11px]">Meta: 1º Ciclo de Base</span>
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
            </div>

            {/* Detailed Selected Scale Axes & I08 Longitudinal Evolution Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Eixos temáticos da escala selecionada (8 cols) */}
              <div className="lg:col-span-8 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                      Detalhamento Metodológico da Escala
                    </span>
                    <h4 className="text-base font-bold text-stone-900 dark:text-white">
                      {IDE_REQUIREMENTS[activeCategory].nome} ({IDE_REQUIREMENTS[activeCategory].totalItens} requisitos)
                    </h4>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-medium">
                    Manual do Modelo IDE
                  </span>
                </div>

                <p className="mt-3 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {IDE_REQUIREMENTS[activeCategory].descricao}
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {IDE_MODEL_STRUCTURE.dimensoes.map((dimensao) => (
                    <div key={dimensao.nome} className="rounded-lg border border-stone-200 dark:border-stone-700 p-3 bg-stone-50 dark:bg-stone-800/60">
                      <div className="text-xs font-bold text-stone-900 dark:text-white">{dimensao.nome}</div>
                      <div className="mt-1 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
                        {dimensao.temas.join(' • ')}
                      </div>
                    </div>
                  ))}
                </div>


              </div>

              {/* I08 Longitudinal Evolution Box (4 cols) */}
              <div className="lg:col-span-4 rounded-xl bg-stone-900 text-white p-6 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-amber-400">
                      I08 • EVOLUÇÃO LONGITUDINAL
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                      Bienal
                    </span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-white">
                    Taxa de Evolução da Maturidade
                  </h4>
                  <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                    Mede o percentual de partícipes que melhoram seu escore em ao menos uma categoria (Diversidade, Gênero ou Raça) em relação ao ciclo anterior.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800 space-y-3">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-stone-400">Meta pactuada:</span>
                    <span className="font-mono font-bold text-emerald-400">≥ 70% dos partícipes</span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-stone-400">Unidade de análise:</span>
                    <span className="text-stone-200">Instituições comparáveis</span>
                  </div>
                  {i08 && (
                    <button
                      onClick={() => onOpenIndicator(i08)}
                      className="w-full mt-2 py-2 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-100 flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Abrir ficha técnica I08</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};
