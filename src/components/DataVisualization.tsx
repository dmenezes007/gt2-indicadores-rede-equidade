import React from 'react';
import {
  BarChart3,
  Clock,
  Layers,
} from 'lucide-react';
import { INDICATORS } from '../data/indicatorsData';
import { DIMENSIONS } from '../data/dimensionsData';
import { Indicator } from '../types/indicators';

interface DataVisualizationProps {
  onOpenIndicator: (ind: Indicator) => void;
  onFilterDimension?: (dimId: string) => void;
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({
  onOpenIndicator,
  onFilterDimension,
}) => {
  // Groupings
  const dimensionsCount = DIMENSIONS.map((dim) => {
    const count = INDICATORS.filter((i) => i.dimensaoId === dim.id).length;
    return {
      id: dim.id,
      name: dim.nomeCurto,
      fullName: dim.nome,
      count,
      percent: Math.round((count / INDICATORS.length) * 100),
      color: dim.cor,
    };
  });

  const periodicityCount = [
    { label: 'Bienal', count: 5, detail: 'Autoavaliação e maturidade IDE', color: 'bg-teal-600' },
    { label: 'Anual', count: 5, detail: 'Governança e representação', color: 'bg-indigo-600' },
    { label: 'Semestral', count: 2, detail: 'Oficinas e repositório', color: 'bg-amber-600' },
    { label: 'Por ação', count: 2, detail: 'Alcance e avaliação de reação', color: 'bg-sky-600' },
    { label: 'Trimestral', count: 1, detail: 'Capacitações continuadas', color: 'bg-rose-600' },
  ];

  // Distinct types
  const typesMap: Record<string, number> = {};
  INDICATORS.forEach((i) => {
    typesMap[i.categoriaTipo] = (typesMap[i.categoriaTipo] || 0) + 1;
  });
  const sortedTypes = Object.entries(typesMap).sort((a, b) => b[1] - a[1]);

  // Dimension x CategoryType matrix mapping
  const categoryTypes = [
    'Resultado / Maturidade',
    'Capacidade Institucional',
    'Produto / Execução',
    'Cobertura',
    'Evolução / Efetividade',
    'Qualidade / Resultado',
    'Representatividade',
    'Cooperação / Disseminação',
    'Alcance',
  ];

  return (
    <section id="analise" className="design-section design-section--analytics scroll-mt-24 py-12 lg:py-20 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-indigo-700 dark:text-indigo-400 mb-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Inteligência de Dados</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 dark:text-white">
              Análise dos Indicadores
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-2xl">
              Decomposição estrutural da matriz por dimensões, periodicidades e tipologias operacionais.
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
            {/* Distribuição por Dimensão */}
            <div className="analytics-card rounded-[1.75rem] border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center shrink-0"><Layers className="w-4 h-4 text-white" /></span>
                    <span>Distribuição por Dimensão</span>
                  </h3>
                  <span className="text-[11px] text-stone-400 font-mono">15 Total</span>
                </div>

                <div className="mt-5 space-y-3.5">
                  {dimensionsCount.map((dim) => (
                    <div key={dim.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-700 dark:text-stone-300 font-medium truncate">
                          {dim.fullName}
                        </span>
                        <span className="font-mono text-stone-500 font-semibold">
                          {dim.count} ({dim.percent}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${(dim.count / 5) * 100}%`, backgroundColor: dim.color.accent }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400">
                Modelo IDE e Governança concentram 53.3% dos indicadores monitorados.
              </div>
            </div>

            {/* Periodicidade e Tipologia */}
            <div className="analytics-card rounded-[1.75rem] border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="w-7 h-7 rounded-md bg-amber-600 flex items-center justify-center shrink-0"><Clock className="w-4 h-4 text-white" /></span>
                    <span>Periodicidade e Tipologia</span>
                  </h3>
                  <span className="text-[11px] text-stone-400 font-mono">Ciclos</span>
                </div>

                {/* Periodicity */}
                <div className="mt-5 space-y-2 text-xs">
                  {periodicityCount.map((per) => (
                    <div
                      key={per.label}
                      className="flex items-center justify-between p-1.5 rounded hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${per.color}`} />
                        <div>
                          <span className="font-semibold text-stone-800 dark:text-stone-200">
                            {per.label}
                          </span>
                          <span className="text-[10px] text-stone-400 block -mt-0.5">
                            {per.detail}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-stone-700 dark:text-stone-300">
                        {per.count}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Main Types Preview */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Tipologias Mais Frequentes
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {sortedTypes.slice(0, 4).map(([type, count]) => (
                      <span
                        key={type}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                      >
                        {type}: <strong>{count}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400">
                Combinação estratégica de medições de curto, médio e longo prazo.
              </div>
            </div>
          </div>

        {/* Matriz de Cruzamento */}
          <div className="analytics-card analytics-matrix rounded-[1.75rem] border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-6 shadow-xs overflow-hidden animate-in fade-in duration-200">
            <div className="mb-4">
              <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2"><span className="w-7 h-7 rounded-md bg-teal-600 flex items-center justify-center shrink-0"><BarChart3 className="w-4 h-4 text-white" /></span><span>Matriz de Cruzamento</span></h3>
              <p className="text-xs text-stone-500 mt-1">
                Visualização do encaixe de cada indicador no cruzamento entre os eixos estratégicos e a natureza metodológica da medida. Clique em qualquer indicador para abrir sua ficha técnica.
              </p>
            </div>

            <div className="overflow-x-auto lg:overflow-x-visible"><table className="min-w-full lg:min-w-0 lg:w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50">
                  <th className="py-2.5 px-3 text-left font-semibold text-stone-700 dark:text-stone-300">
                    Dimensão
                  </th>
                  {categoryTypes.map((cat) => (
                    <th
                      key={cat}
                      className="py-2.5 px-2 text-center font-medium text-stone-600 dark:text-stone-400 text-[11px]"
                    >
                      {cat}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {DIMENSIONS.map((dim) => {
                  return (
                    <tr key={dim.id} className={`${dim.cor.bgLight} ${dim.cor.borderLight} transition-colors`}>
                      <td className="py-3 px-3 font-semibold text-stone-900 dark:text-white text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-mono text-[11px] ${dim.cor.textLight}`}>{dim.numero}</span>
                          <span>{dim.nome}</span>
                        </div>
                      </td>
                      {categoryTypes.map((cat) => {
                        const matchingIndicators = INDICATORS.filter(
                          (i) => i.dimensaoId === dim.id && i.categoriaTipo === cat
                        );
                        return (
                          <td key={cat} className="py-2 px-2 text-center align-middle">
                            {matchingIndicators.length > 0 ? (
                              <div className="flex flex-wrap items-center justify-center gap-1">
                                {matchingIndicators.map((ind) => (
                                  <button
                                    key={ind.id}
                                    onClick={() => onOpenIndicator(ind)}
                                    className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-bold ${dim.cor.badgeBg} ${dim.cor.badgeText} hover:scale-105 transition-transform`}
                                    title={`${ind.id} • ${ind.indicador}`}
                                  >
                                    {ind.id}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <span className="text-stone-300 dark:text-stone-700 text-center block">·</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table></div>
          </div>

      </div>
    </section>
  );
};
