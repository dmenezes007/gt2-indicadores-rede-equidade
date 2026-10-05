export interface IdeCategoryRequirements {
  nome: string;
  indicadorId: string;
  totalItens: number;
  descricao: string;
}

export const IDE_REQUIREMENTS: Record<'diversidade' | 'genero' | 'raca', IdeCategoryRequirements> = {
  diversidade: {
    nome: 'Diversidade',
    indicadorId: 'I05',
    totalItens: 7,
    descricao: 'Escala de resultado formada pelos 7 requisitos do Modelo IDE cuja resposta se aplica à categoria Diversidade.',
  },
  genero: {
    nome: 'Gênero',
    indicadorId: 'I06',
    totalItens: 31,
    descricao: 'Escala de resultado formada pelos 31 requisitos do Modelo IDE cuja resposta se aplica ao marcador Gênero.',
  },
  raca: {
    nome: 'Raça',
    indicadorId: 'I07',
    totalItens: 31,
    descricao: 'Escala de resultado formada pelos 31 requisitos do Modelo IDE cuja resposta se aplica ao marcador Raça.',
  },
};

export const IDE_MODEL_STRUCTURE = {
  totalRequisitos: 38,
  dimensoes: [
    { nome: 'Governança e Estratégia', temas: ['Estratégia', 'Liderança', 'Controle/Accountability'] },
    { nome: 'Gestão Inclusiva', temas: ['Gestão de Pessoas', 'Gestão de Contratações', 'Comunicação', 'Gestão Orçamentária'] },
    { nome: 'Social', temas: ['Direitos Humanos', 'Relação com Sociedade', 'Relação com Usuário/Consumidor'] },
  ],
};

export interface CycleStatusItem {
  dimensao: string;
  titulo: string;
  meta: string;
  status: 'Meta definida' | 'Aguardando linha de base' | 'Primeiro ciclo' | 'Dados ainda não coletados' | 'Monitoramento futuro';
  detalhe: string;
  proximaEtapa: string;
}

export const CYCLE_STATUS_ITEMS: CycleStatusItem[] = [
  {
    dimensao: 'Aplicação do Modelo IDE',
    titulo: 'Cobertura da Autoavaliação (I04)',
    meta: '≥ 90% das instituições partícipes',
    status: 'Primeiro ciclo',
    detalhe: 'Instrumento de autoavaliação disponibilizado para preenchimento pelos pontos focais.',
    proximaEtapa: 'Validação documental das respostas enviadas',
  },
  {
    dimensao: 'Aplicação do Modelo IDE',
    titulo: 'Maturidade IDE (I05, I06, I07)',
    meta: 'Linha de base no 1º ciclo',
    status: 'Aguardando linha de base',
    detalhe: 'Aplicação dos 38 requisitos do Modelo IDE, com apuração das escalas de resultado: Diversidade (0–7), Gênero (0–31) e Raça (0–31).',
    proximaEtapa: 'Cálculo dos escores médios institucionais',
  },
  {
    dimensao: 'Capacitação e disseminação',
    titulo: 'Oficinas e Cursos do GT2 (I09, I10)',
    meta: '2 oficinas + 4 capacitações',
    status: 'Meta definida',
    detalhe: 'Cronograma pactuado para o ciclo. Aferição do cumprimento e alcance após cada evento.',
    proximaEtapa: 'Realização da 1ª oficina metodológica do Modelo IDE',
  },
  {
    dimensao: 'Representatividade e participação',
    titulo: 'Diversidade das Indicações (I13)',
    meta: 'Linha de base no 1º ano',
    status: 'Dados ainda não coletados',
    detalhe: 'Mapeamento das representações formalizadas sob diretrizes de LGPD e autodeclaração voluntária.',
    proximaEtapa: 'Lançamento do formulário seguro com controle de acesso',
  },
  {
    dimensao: 'Cooperação e difusão',
    titulo: 'Repositório de Práticas (I15)',
    meta: '≥ 80% dos partícipes com registro',
    status: 'Monitoramento futuro',
    detalhe: 'Registro qualificado de atos normativos, pesquisas e programas no repositório compartilhado.',
    proximaEtapa: 'Abertura da chamada semestral de práticas',
  },
];
