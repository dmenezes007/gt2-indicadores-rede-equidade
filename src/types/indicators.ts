export type Priority = 'Muito alta' | 'Alta' | 'Média';

export type Periodicity =
  | 'Trimestral'
  | 'Semestral'
  | 'Anual'
  | 'Bienal'
  | 'Por ação';

export type DimensionId =
  | 'governanca'
  | 'modelo_ide'
  | 'capacitacao'
  | 'representatividade'
  | 'cooperacao';

export interface Indicator {
  id: string; // e.g. "I01"
  dimensao: string;
  dimensaoId: DimensionId;
  indicador: string;
  definicao: string;
  tipo: string;
  formula: string;
  unidade: string;
  periodicidade: Periodicity;
  unidadeAnalise: string;
  fonte: string;
  meta: string;
  prioridade: Priority;
  rastreabilidade: string;
  responsavel: string;
  nucleoRecomendado: boolean;
  observacao: string;
  interpretacao?: string;
  categoriaTipo: 'Produto / Execução' | 'Resultado / Maturidade' | 'Capacidade Institucional' | 'Cobertura' | 'Evolução / Efetividade' | 'Alcance' | 'Qualidade / Resultado' | 'Representatividade' | 'Cooperação / Disseminação';
}

export interface DimensionInfo {
  id: DimensionId;
  numero: string;
  nome: string;
  nomeCurto: string;
  indicadoresIds: string[];
  finalidade: string;
  leituraGerencial: string;
  estadoAcompanhamento: string;
  cor: {
    bgLight: string;
    borderLight: string;
    textLight: string;
    accent: string;
    badgeBg: string;
    badgeText: string;
  };
}

export interface FilterState {
  search: string;
  dimensoes: string[];
  prioridades: Priority[];
  periodicidades: string[];
  nucleoRecomendado: 'todos' | 'sim' | 'nao';
  tipos: string[];
  responsaveis: string[];
}
