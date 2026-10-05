import { Indicator, Priority } from '../types/indicators';

export const GLOSSARY: Record<string, string> = {
  'Linha de base':
    'Primeira mensuração utilizada como referência temporal para acompanhamento e verificação de evolução do indicador.',
  'Modelo IDE':
    'Instrumento estruturado de autoavaliação institucional com 69 requisitos distribuídos entre Diversidade (7), Gênero (31) e Raça (31).',
  'Núcleo recomendado':
    'Conjunto de 14 indicadores prioritários orientados para monitoramento estruturante e prioritário pelas instituições partícipes.',
  'ACT':
    'Acordo de Cooperação Técnica que fundamenta formalmente a Rede Equidade, seus objetivos e grupos de trabalho.',
  'Resultado longitudinal':
    'Acompanhamento da evolução temporal das mesmas instituições partícipes ao longo de múltiplos ciclos de monitoramento.',
  'Unidade de análise':
    'Entidade ou nível sobre o qual os dados são apurados e consolidados (ex.: instituições, participantes de ações, representantes).',
  'Autodeclaração voluntária':
    'Princípio pelo qual dados étnico-raciais, de identidade de gênero ou deficiência são informados espontaneamente pelo indivíduo com garantia de sigilo e finalidade restrita.',
};

export function getPriorityBadgeClass(priority: Priority): {
  bg: string;
  text: string;
  border: string;
  dot: string;
} {
  switch (priority) {
    case 'Muito alta':
      return {
        bg: 'bg-indigo-50 dark:bg-indigo-950/40',
        text: 'text-indigo-900 dark:text-indigo-300 font-semibold',
        border: 'border-indigo-200 dark:border-indigo-800/60',
        dot: 'bg-indigo-600 dark:bg-indigo-400',
      };
    case 'Alta':
      return {
        bg: 'bg-teal-50 dark:bg-teal-950/40',
        text: 'text-teal-900 dark:text-teal-300 font-semibold',
        border: 'border-teal-200 dark:border-teal-800/60',
        dot: 'bg-teal-600 dark:bg-teal-400',
      };
    case 'Média':
      return {
        bg: 'bg-stone-100 dark:bg-stone-800/60',
        text: 'text-stone-700 dark:text-stone-300 font-medium',
        border: 'border-stone-300 dark:border-stone-700',
        dot: 'bg-stone-400 dark:bg-stone-500',
      };
  }
}

export function exportIndicatorsToCSV(indicators: Indicator[], filename = 'rede-equidade-indicadores-gt2.csv') {
  const headers = [
    'ID',
    'Indicador',
    'Dimensao',
    'Tipo',
    'Categoria',
    'Periodicidade',
    'Unidade',
    'Meta',
    'Prioridade',
    'Nucleo Recomendado',
    'Responsavel',
    'Fonte',
    'Formula',
    'Rastreabilidade',
    'Observacao',
  ];

  const escapeCSV = (str: string | boolean | undefined) => {
    if (str === undefined || str === null) return '""';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = indicators.map((ind) => [
    escapeCSV(ind.id),
    escapeCSV(ind.indicador),
    escapeCSV(ind.dimensao),
    escapeCSV(ind.tipo),
    escapeCSV(ind.categoriaTipo),
    escapeCSV(ind.periodicidade),
    escapeCSV(ind.unidade),
    escapeCSV(ind.meta),
    escapeCSV(ind.prioridade),
    escapeCSV(ind.nucleoRecomendado ? 'Sim' : 'Não'),
    escapeCSV(ind.responsavel),
    escapeCSV(ind.fonte),
    escapeCSV(ind.formula),
    escapeCSV(ind.rastreabilidade),
    escapeCSV(ind.observacao),
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportIndicatorsToJSON(indicators: Indicator[], filename = 'rede-equidade-indicadores-gt2.json') {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(indicators, null, 2))}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
