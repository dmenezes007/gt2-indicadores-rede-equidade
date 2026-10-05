# MODELO DE DADOS CONCEITUAL E LÓGICO
## Rede Equidade — Painel de Indicadores do GT2

Este documento descreve as entidades, atributos e relacionamentos implementados no sistema.

---

### 1. Entidades de Dados Mestres (Master Data)

#### IndicatorDefinition
| Campo | Tipo | Descrição |
|---|---|---|
| id | string | Identificador único (ex: 'I01', 'I02') |
| code | string | Código oficial do indicador |
| name | string | Nome institucional do indicador |
| dimensionId | string | ID da dimensão estratégica vinculada |
| description | string | Descrição sumária |
| operationalDefinition | string | Definição operacional formal |
| indicatorType | string | Natureza metodológica (produto, resultado, etc.) |
| formula | string | Expressão matemática de apuração |
| unit | string | Unidade de medida (%, quantidade) |
| frequency | Periodicity | Periodicidade (Trimestral, Semestral, Anual, Bienal, Por ação) |
| analysisUnit | string | Nível de agregação analítica |
| targetDefinition | string | Meta pactuada no ciclo |
| priority | Priority | Muito alta, Alta, Média |
| coreRecommended | boolean | Pertence ao núcleo recomendado inicial (14 ind.) |
| normativeTraceability | Reference[] | Dispositivos do ACT e requisitos do Modelo IDE |
| suggestedResponsible | ResponsibleParty[] | Instância responsável pela coleta/validação |

#### Dimension
| Campo | Tipo | Descrição |
|---|---|---|
| id | string | Código textual (ex: 'governanca', 'modelo_ide') |
| code | string | Numeração ordinal (ex: '01', '02') |
| name | string | Nome completo da dimensão |
| executiveName | string | Nome sintético executivo |
| description | string | Finalidade estratégica |
| managerialReading | string | Foco gerencial atribuído |
| order | number | Ordem de apresentação |

#### Institution
| Campo | Tipo | Descrição |
|---|---|---|
| id | string | Identificador único institucional |
| acronym | string | Sigla oficial |
| name | string | Razão social / Denominação completa |
| sphere | string | Federal, Distrital, Estadual |
| institutionType | string | Poder/Instância (Controle, Judiciário, Executivo, MP, etc.) |
| active | boolean | Situação cadastral na Rede Equidade |
| joinedAt | string | Data de adesão ao ACT |
| focalPoints | FocalPoint[] | Contatos titular e suplente |

---

### 2. Entidades Operacionais (Operational Data)

#### MonitoringCycle
| Campo | Tipo | Descrição |
|---|---|---|
| id | string | Identificador (ex: 'cycle-2026') |
| name | string | Nome descritivo do ciclo |
| referenceYear | number | Ano de referência |
| semester | number | Semestre quando aplicável |
| status | CycleStatus | planned, collection_open, validation, closed, archived |
| isBaseline | boolean | Indica se o ciclo opera como linha de base empírica |

#### Measurement
| Campo | Tipo | Descrição |
|---|---|---|
| id | string | Identificador único da medição |
| indicatorId | string | Vínculo com IndicatorDefinition |
| institutionId | string? | Vínculo com Institution (opcional para consolidados) |
| cycleId | string | Vínculo com MonitoringCycle |
| rawValue | number? | Valor numérico bruto apurado |
| numerator | number? | Numerador da equação (para auditoria) |
| denominator | number? | Denominador da equação |
| status | MeasurementStatus | draft, submitted, under_review, validated, rejected |
| submittedAt | string? | Carimbo de data/hora do envio |
| submittedBy | string? | E-mail do usuário emitente |
| validatedAt | string? | Carimbo de data/hora da homologação |
| validatedBy | string? | E-mail do analista GT2 validador |
| evidenceIds | string[] | Chaves estrangeiras para Evidence |

#### IDEAssessment
| Campo | Tipo | Descrição |
|---|---|---|
| id | string | Identificador da autoavaliação |
| institutionId | string | Instituição partícipe respondente |
| cycleId | string | Ciclo de referência |
| diversityMet | number | Requisitos atendidos na escala Diversidade (0 a 7) |
| genderMet | number | Requisitos atendidos na escala Gênero (0 a 31) |
| raceMet | number | Requisitos atendidos na escala Raça (0 a 31) |
| completed | boolean | Questionário concluído integralmente |
| validated | boolean | Autoavaliação validada documentalmente pelo GT2 |

#### Evidence
| Campo | Tipo | Descrição |
|---|---|---|
| id | string | Identificador da evidência |
| measurementId | string | Medição à qual está vinculada |
| institutionId | string? | Instituição emitente |
| title | string | Título do ato, portaria ou documento |
| evidenceType | EvidenceType | normative_act, report, attendance_list, etc. |
| fileName | string? | Nome do arquivo armazenado |
| url | string? | Link público ou seguro |
| validationStatus | string | pending, accepted, rejected |
| accessLevel | string | public, network, restricted |

---

### 3. Modelo Estrela para Business Intelligence (Power BI)

Para facilitar a integração futura com ferramentas analíticas:

```text
       DimIndicators ────────┐
                             │
       DimInstitutions ──────┼──► FactMeasurements
                             │
       DimCycles ────────────┤
                             │
       DimDates ─────────────┘

       DimInstitutions ──────┐
                             ├──► FactIDEAssessments
       DimCycles ────────────┘

       DimCycles ────────────┐
                             ├──► FactTrainingActions
       DimDates ─────────────┘
```
