import React, { useState } from 'react';
import {
  BarChart3,
  PieChart,
  Network,
  Grid,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { INDICATORS } from '../data/indicatorsData';
import { DIMENSIONS } from '../data/dimensionsData';
import { Indicator, Priority } from '../types/indicators';

interface DataVisualizationProps {
  onOpenIndicator: (ind: Indicator) => void;
  onFilterDimension?: (dimId: string) => void;
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({
  onOpenIndicator,
  onFilterDimension,
}) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'matriz' | 'responsaveis'>('geral');
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  // Groupings
  const dimensionsCount = DIMENSIONS.map((dim) => {
    const count = INDICATORS.filter((i) => i.dimensaoId === dim.id).length;
    return {
      id: dim.id,
      name: dim.nomeCurto,
      fullName: dim.nome,
      count,
      percent: Math.round((count / INDICATORS.length) * 100),
    };
  });

  const priorityCount: { priority: Priority; count: number; percent: number; color: string }[] = [
    { priority: 'Muito alta', count: 7, percent: Math.round((7 / 15) * 100), color: 'bg-indigo-600' },
    { priority: 'Alta', count: 7, percent: Math.round((7 / 15) * 100), color: 'bg-teal-600' },
    { priority: 'Média', count: 1, percent: Math.round((1 / 15) * 100), color: 'bg-stone-400' },
  ];

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

  // Responsibility map entities
  const responsibleEntities = [
    {
      id: 'gt2',
      nome: 'GT2 (Grupo de Trabalho 2)',
      descricao: 'Coordenação técnica, aplicação do Modelo IDE e ações de capacitação',
      indicadores: ['I04', 'I05', 'I06', 'I07', 'I08', 'I09', 'I10', 'I11', 'I12'],
    },
    {
      id: 'pontos_focais',
      nome: 'GT2 + Pontos Focais Institucionais',
      descricao: 'Articulação descentralizada nos órgãos partícipes',
      indicadores: ['I01', 'I03', 'I14'],
    },
    {
      id: 'comite_coordenador',
      nome: 'Comitê Coordenador + GT2',
      descricao: 'Governança executiva superior e representatividade colegiada',
      indicadores: ['I02', 'I13'],
    },
    {
      id: 'repositorio',
      nome: 'GT2 + Gestão do Repositório',
      descricao: 'Curadoria e compartilhamento de evidências e boas práticas',
      indicadores: ['I15'],
    },
  ];

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
    <section id="analise" className="scroll-mt-24 py-10 lg:py-14 border-b border-stone-200/80 dark:border-stone-800/80">
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
              Decomposição estrutural da matriz por dimensões, prioridades, tipologias operacionais e mapa de responsabilidades.
            </p>
          </div>

          {/* Visualization Tab Controls */}
          <div className="flex items-center p-1 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs shadow-xs self-start md:self-auto">
            <button
              onClick={() => setActiveTab('geral')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'geral'
                  ? 'bg-white dark:bg-stone-800 text-stone-950 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Distribuição Geral</span>
            </button>
            <button
              onClick={() => setActiveTab('matriz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'matriz'
                  ? 'bg-white dark:bg-stone-800 text-stone-950 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Matriz Dimensão × Tipo</span>
            </button>
            <button
              onClick={() => setActiveTab('responsaveis')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'responsaveis'
                  ? 'bg-white dark:bg-stone-800 text-stone-950 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Mapa de Responsabilidades</span>
            </button>
          </div>
        </div>

        {/* Tab 1: General Distributions */}
        {activeTab === 'geral' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {/* A. Distribuição por Dimensão */}
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-500" />
                    <span>A. Distribuição por Dimensão</span>
                  </h3>
                  <span className="text-[11px] text-stone-400 font-mono">15 Total</span>
                </div>

                <div className="mt-5 space-y-3.5">
                  {dimensionsCount.map((dim) => (
                    <div key={dim.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-700 dark:text-stone-300 font-medium truncate">
                          {dim.name}
                        </span>
                        <span className="font-mono text-stone-500 font-semibold">
                          {dim.count} ({dim.percent}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${(dim.count / 5) * 100}%` }}
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

            {/* B. Distribuição por Prioridade & D. Núcleo Recomendado */}
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-teal-500" />
                    <span>B. Prioridade & Núcleo</span>
                  </h3>
                  <span className="text-[11px] text-stone-400 font-mono">Estratégico</span>
                </div>

                {/* Priority Breakdown */}
                <div className="mt-5">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2 text-[10px]">
                    Nível de Prioridade Técnica
                  </span>
                  <div className="space-y-2.5">
                    {priorityCount.map((p) => (
                      <div key={p.priority} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                          <span className="text-stone-700 dark:text-stone-300 font-medium">
                            {p.priority}
                          </span>
                        </div>
                        <span className="font-mono text-stone-600 dark:text-stone-400 font-semibold">
                          {p.count} ind. ({p.percent}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* D. Núcleo Recomendado */}
                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2 text-[10px]">
                    D. Núcleo Recomendado vs. Complementar
                  </span>
                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-stone-800 dark:text-stone-200">
                        Núcleo Recomendado (I01–I10, I12–I15)
                      </span>
                      <span className="font-mono font-bold text-stone-900 dark:text-white">
                        14
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-stone-500">
                        Complementar de Alcance (I11)
                      </span>
                      <span className="font-mono font-medium text-amber-600">
                        1
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400">
                Prioridade alta reflete importância estrutural para o plano do biênio.
              </div>
            </div>

            {/* C. Indicadores por Periodicidade & E. Tipologia */}
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>C. Periodicidade & Tipologia</span>
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
                    E. Tipologias Mais Frequentes
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
        )}

        {/* Tab 2: Dimension x Category Matrix (F) */}
        {activeTab === 'matriz' && (
          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 shadow-xs overflow-x-auto animate-in fade-in duration-200">
            <div className="mb-4">
              <h3 className="text-base font-bold text-stone-900 dark:text-white">
                F. Matriz de Cruzamento: Dimensão Estratégica × Tipologia
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Visualização do encaixe de cada indicador no cruzamento entre os eixos estratégicos e a natureza metodológica da medida. Clique em qualquer indicador para abrir sua ficha técnica.
              </p>
            </div>

            <table className="min-w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50">
                  <th className="py-2.5 px-3 text-left font-semibold text-stone-700 dark:text-stone-300">
                    Dimensão Estratégica
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
                    <tr key={dim.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition-colors">
                      <td className="py-3 px-3 font-semibold text-stone-900 dark:text-white text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-stone-400 text-[11px]">{dim.numero}</span>
                          <span>{dim.nomeCurto}</span>
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
                                    className="px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 hover:scale-105 transition-transform"
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
            </table>
          </div>
        )}

        {/* Tab 3: Responsibility Map (G) */}
        {activeTab === 'responsaveis' && (
          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 shadow-xs animate-in fade-in duration-200 space-y-6">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">
                G. Mapa de Responsabilidades Institucionais
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Pactuação de responsabilidade para coleta, validação documental e consolidação dos indicadores. Clique em uma instância para destacar seus indicadores.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {responsibleEntities.map((entity) => {
                const isSelected = selectedEntity === entity.id;
                return (
                  <div
                    key={entity.id}
                    onClick={() => setSelectedEntity(isSelected ? null : entity.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      isSelected
                        ? 'border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 bg-stone-50/50 dark:bg-stone-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                        Instância Responsável
                      </span>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700">
                        {entity.indicadores.length} ind.
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                      {entity.nome}
                    </h4>
                    <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                      {entity.descricao}
                    </p>

                    <div className="mt-4 pt-3 border-t border-stone-200/70 dark:border-stone-700/60">
                      <span className="text-[10px] font-semibold text-stone-400 block mb-1">
                        Indicadores sob gestão:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {entity.indicadores.map((id) => {
                          const ind = INDICATORS.find((i) => i.id === id);
                          return (
                            <button
                              key={id}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (ind) onOpenIndicator(ind);
                              }}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-950 transition-colors"
                              title={ind?.indicador}
                            >
                              {id}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
