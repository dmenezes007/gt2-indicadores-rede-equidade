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
                <div className="flex items-center justify-between">
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
                  <div className="grid grid-cols-7 gap-1.5">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-7 rounded border border-teal-200 dark:border-teal-800/60 bg-teal-50/70 dark:bg-teal-950/30 flex items-center justify-center text-[10px] font-mono text-teal-800 dark:text-teal-300 font-medium"
                        title={`Posição ${i + 1} da escala de Diversidade`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Link to Indicator */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center text-xs">
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
                <div className="flex items-center justify-between">
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
                  <div className="grid grid-cols-8 sm:grid-cols-10 gap-1">
                    {Array.from({ length: 31 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-5 rounded-xs border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/70 dark:bg-indigo-950/30 flex items-center justify-center text-[9px] font-mono text-indigo-800 dark:text-indigo-300"
                        title={`Posição ${i + 1} da escala de Gênero`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Link to Indicator */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center text-xs">
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
                <div className="flex items-center justify-between">
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
                  <div className="grid grid-cols-8 sm:grid-cols-10 gap-1">
                    {Array.from({ length: 31 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-5 rounded-xs border border-amber-200 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/30 flex items-center justify-center text-[9px] font-mono text-amber-800 dark:text-amber-300"
                        title={`Posição ${i + 1} da escala de Raça`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Link to Indicator */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center text-xs">
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

            {/* Official 38-requirement interactive matrix */}
            <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-stone-100 dark:border-stone-800">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">Instrumento oficial</span>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white">38 requisitos do Modelo IDE</h4>
                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 max-w-3xl">
                    Passe o mouse ou toque em um requisito para consultar a pergunta, a dimensão, o tema, as categorias de resposta e o comentário explicativo do Manual.
                  </p>
                </div>
                <div className="flex gap-1.5 text-[10px] font-semibold">
                  <span className="px-2 py-1 rounded bg-teal-50 text-teal-800 dark:bg-teal-950/50 dark:text-teal-300">D Diversidade</span>
                  <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300">G Gênero</span>
                  <span className="px-2 py-1 rounded bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">R Raça</span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-[repeat(19,minmax(0,1fr))] gap-1.5">
                {IDE_OFFICIAL_REQUIREMENTS.map((req) => (
                  <div key={req.id} className="group relative">
                    <button
                      type="button"
                      aria-label={`Requisito ${req.id}: ${req.question}`}
                      className="w-full aspect-square min-h-8 rounded-md border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-[10px] font-mono font-bold text-stone-700 dark:text-stone-200 transition-colors"
                    >
                      {req.id}
                    </button>
                    <div className="pointer-events-none absolute z-30 hidden group-hover:block group-focus-within:block bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 max-w-[80vw] rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 p-4 shadow-xl text-left">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-400">REQUISITO {req.id}</span>
                        <div className="flex gap-1">
                          {req.categories.includes('diversidade') && <span className="px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300 text-[9px]">D</span>}
                          {req.categories.includes('genero') && <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 text-[9px]">G</span>}
                          {req.categories.includes('raca') && <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 text-[9px]">R</span>}
                        </div>
                      </div>
                      <div className="mt-1 text-[10px] font-semibold text-stone-400">{req.dimension} • {req.theme}</div>
                      <p className="mt-2 text-xs font-semibold leading-relaxed text-stone-900 dark:text-white">{req.question}</p>
                      <p className="mt-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">{req.explanation}</p>
                      <div className="mt-2 text-[9px] uppercase tracking-wider font-semibold text-stone-400">Resposta: Sim ou Não</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Selected Scale Axes & I08 Longitudinal Evolution Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Eixos temáticos da escala selecionada (8 cols) */}
              <div className="lg:col-span-8 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-xs">
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
                  <div className="flex items-center justify-between">
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
