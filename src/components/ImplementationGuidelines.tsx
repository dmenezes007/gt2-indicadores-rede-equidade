import React from 'react';
import {
  Compass,
  CheckCircle,
  Database,
  Lock,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react';

export const ImplementationGuidelines: React.FC = () => {
  return (
    <section id="diretrizes" className="scroll-mt-24 py-12 lg:py-16 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-100/40 dark:bg-stone-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-700 dark:text-amber-400 mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Orientações Estratégicas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 dark:text-white">
              Diretrizes para Implementação
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-2xl">
              Cinco princípios metodológicos formulados pelo GT2 para orientar o monitoramento prático e sustentável pelas instituições partícipes da Rede Equidade.
            </p>
          </div>
        </div>

        {/* Editorial Asymmetric Guidelines Layout */}
        <div className="space-y-6">
          {/* Row 1: Guideline 01 (Lead highlight, full width or 7/5 split) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 01: Núcleo Inicial (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                    DIRETRIZ 01
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 font-semibold text-stone-700 dark:text-stone-300">
                    Priorização Técnica
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-stone-950 dark:text-white leading-snug">
                  Adoção de Núcleo Inicial Recomendado (14 Indicadores)
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Adotar formalmente os indicadores <strong className="text-stone-900 dark:text-white font-mono">I01 a I10</strong> e <strong className="text-stone-900 dark:text-white font-mono">I12 a I15</strong> como núcleo estruturante prioritário da Rede Equidade. O indicador <strong className="text-stone-900 dark:text-white font-mono">I11 (Alcance das ações de capacitação)</strong> deve operar como instrumento complementar de monitoramento de público, sem constituir encargo impeditivo de adesão.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">Núcleo: 14 indicadores prioritários</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  93.3% da matriz
                </span>
              </div>
            </div>

            {/* 02: Linha de Base no 1º Ciclo (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-stone-900 text-white p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <span className="font-mono text-sm font-bold text-teal-400">
                    DIRETRIZ 02
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-800 font-semibold text-stone-300">
                    Rigor Temporal
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-white leading-snug">
                  Fixação de Linha de Base no Primeiro Ciclo
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Executar a primeira mensuração exclusivamente para estabelecer a linha de base empírica nos indicadores qualitativos e de maturidade. Evitar expressamente metas arbitrárias onde ainda não existe série histórica consolidada, respeitando a curva de aprendizado das instituições partícipes.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800 text-xs text-stone-400">
                Previne distorções diagnósticas e valoriza a evolução longitudinal real.
              </div>
            </div>
          </div>

          {/* Row 2: 03, 04, 05 (3 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 03: Modelo IDE como Espinha Dorsal */}
            <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400 block mb-2">
                  DIRETRIZ 03 • METODOLOGIA
                </span>
                <h4 className="text-base font-bold text-stone-950 dark:text-white leading-snug">
                  Modelo IDE como Espinha Dorsal de Maturidade
                </h4>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Consolidar os 69 requisitos institucionais nas 3 escalas estruturantes:
                </p>

                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-stone-50 dark:bg-stone-800/60 font-mono">
                    <span className="text-stone-700 dark:text-stone-300 font-sans font-medium">Diversidade</span>
                    <strong className="text-teal-600">7 requisitos</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-stone-50 dark:bg-stone-800/60 font-mono">
                    <span className="text-stone-700 dark:text-stone-300 font-sans font-medium">Gênero</span>
                    <strong className="text-indigo-600">31 requisitos</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-stone-50 dark:bg-stone-800/60 font-mono">
                    <span className="text-stone-700 dark:text-stone-300 font-sans font-medium">Raça</span>
                    <strong className="text-amber-600">31 requisitos</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400">
                Garante comparabilidade e linguagem comum entre os órgãos partícipes.
              </div>
            </div>

            {/* 04: Separação de Produto vs Resultado */}
            <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-2">
                  DIRETRIZ 04 • CLASSIFICAÇÃO
                </span>
                <h4 className="text-base font-bold text-stone-950 dark:text-white leading-snug">
                  Separação Estrita de Produto vs. Resultado
                </h4>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Diferenciar categoricamente indicadores de produto e esforço executivo (como as oficinas do I09 e as capacitações do I10) de indicadores de resultado institucional substantivo (como institucionalização I01, maturidade I05–I07 e evolução longitudinal I08).
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400">
                Evita avaliar o sucesso da política exclusivamente pela contagem de eventos.
              </div>
            </div>

            {/* 05: Governança de Dados Sensíveis */}
            <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400 block mb-2">
                  DIRETRIZ 05 • LGPD & ÉTICA
                </span>
                <h4 className="text-base font-bold text-stone-950 dark:text-white leading-snug">
                  Governança e Proteção de Dados Sub-representados
                </h4>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Para informações de representatividade (I13) relativas a raça, gênero, deficiência ou grupos historicamente sub-representados, observar estritamente:
                </p>

                <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px]">
                  <span className="p-1.5 rounded bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
                    1. Autodeclaração voluntária
                  </span>
                  <span className="p-1.5 rounded bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
                    2. Finalidade específica
                  </span>
                  <span className="p-1.5 rounded bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
                    3. Minimização de dados
                  </span>
                  <span className="p-1.5 rounded bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
                    4. Total agregação estatística
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400">
                Veda qualquer identificação individual e estabelece controles de acesso restrito.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
