export interface IdeCategoryRequirements {
  nome: string;
  indicadorId: string;
  totalRequisitos: number;
  descricao: string;
  eixos: string[];
}

export const IDE_REQUIREMENTS: Record<'diversidade' | 'genero' | 'raca', IdeCategoryRequirements> = {
  diversidade: {
    nome: 'Diversidade',
    indicadorId: 'I05',
    totalRequisitos: 7,
    descricao: 'Requisitos transversais de política institucional, liderança, compromisso formal e sensibilização.',
    eixos: [
      'Compromisso institucional formal',
      'Instância de governança designada',
      'Inclusão no plano estratégico',
      'Canais de acolhimento e escuta',
      'Comunicação inclusiva e acessível',
      'Sensibilização de lideranças',
      'Mecanismos de monitoramento',
    ],
  },
  genero: {
    nome: 'Gênero',
    indicadorId: 'I06',
    totalRequisitos: 31,
    descricao: 'Requisitos específicos para promoção da equidade de gênero, liderança feminina, conciliação e proteção.',
    eixos: [
      'Equidade em cargos de liderança (DAS/funções comissionadas)',
      'Políticas de parentalidade e apoio à amamentação',
      'Prevenção e combate ao assédio sexual e moral',
      'Linguagem e comunicação não sexista',
      'Capacitação em perspectiva de gênero',
      'Apoio a mulheres em situação de violência',
      'Igualdade de oportunidades no desenvolvimento funcional',
      'Dados desagregados por sexo e identidade de gênero',
    ],
  },
  raca: {
    nome: 'Raça',
    indicadorId: 'I07',
    totalRequisitos: 31,
    descricao: 'Requisitos de enfrentamento ao racismo institucional, representatividade negra e indígena e ações afirmativas.',
    eixos: [
      'Ações afirmativas em processos seletivos internos',
      'Presença de pessoas negras em posições de decisão',
      'Comissões de heteroidentificação estruturadas',
      'Protocolo formal de combate ao racismo institucional',
      'Formação continuada em relações étnico-raciais',
      'Autodeclaração étnico-racial segura e qualificada',
      'Clima organizacional e barreiras de ascensão mapeadas',
      'Estudos de equidade remuneratória e funcional por raça',
    ],
  },
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
    detalhe: 'Consolidação das 3 escalas estruturantes: Diversidade (7), Gênero (31) e Raça (31 requisitos).',
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
