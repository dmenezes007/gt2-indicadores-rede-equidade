# ESPECIFICAÇÃO DE INTEGRAÇÕES EXTERNAS
## Rede Equidade — Painel de Indicadores do GT2

Este documento estabelece as diretrizes e esquemas de integração externa com **Microsoft Lists / SharePoint**, **Barramento de Eventos n8n**, **Webhooks**, **APIs REST** e **Power BI**.

---

### 1. Microsoft Lists / SharePoint (M365)

O armazenamento e gestão colaborativa no ecossistema Microsoft 365 utiliza 8 listas padronizadas:

1. **RE_Indicators**: Cadastro e versionamento dos 15 indicadores oficiais.
2. **RE_Institutions**: Cadastro das instituições partícipes da Rede Equidade.
3. **RE_Cycles**: Gestão dos ciclos temporais (2025 Linha de base, 2026 Vigente, 2027 Planejado).
4. **RE_Measurements**: Tabela de fatos com registros de valores reportados e validados.
5. **RE_Evidence**: Documentos anexados, metadados e pareceres de validação.
6. **RE_TrainingActions**: Registro de oficinas do Modelo IDE e cursos formativos.
7. **RE_IDEAssessments**: Autoavaliações nos 69 requisitos do Modelo IDE.
8. **RE_UsersRoles**: Mapeamento de perfis de acesso e pontos focais (RBAC).

O conector arquitetural está implementado em `src/repositories/microsoftListsAdapter.ts`.

---

### 2. Eventos de Domínio para n8n & Automações

O serviço `domainEventsService` emite eventos tipados que podem ser despachados para fluxos de automação no n8n:

| Evento | Gatilho | Ação Típica no n8n |
|---|---|---|
| `cycle.opened` | Abertura formal de novo ciclo | Envio de e-mail aos pontos focais com links de coleta |
| `measurement.created` | Criação de rascunho institucional | Registro de log operacional |
| `measurement.submitted` | Envio de medição pelo partícipe | Notificação à equipe técnica do GT2 para análise |
| `measurement.validation_requested` | Solicitação de parecer adicional | Roteamento para analista temático |
| `measurement.validated` | Homologação da medição pelo GT2 | Notificação de aceite à instituição e recálculo |
| `measurement.rejected` | Devolução com pedido de ajuste | Envio de notificação com parecer técnico ao partícipe |
| `evidence.uploaded` | Upload de novo ato normativo/portaria | Indexação no repositório de documentos |
| `target.reached` | Meta do ciclo superada | Registro de destaque executivo |
| `cycle.closing_soon` | 15 dias antes do encerramento da coleta | Alerta automático aos partícipes pendentes |
| `cycle.closed` | Encerramento do ciclo | Congelamento da base e geração do relatório executivo |

---

### 3. Webhooks Conceituais

Endpoints REST preparados para recebimento e disparo de notificações:

- `POST /webhooks/measurement-submitted`
  - Payload: `{ measurementId, indicatorId, institutionId, cycleId, timestamp }`
- `POST /webhooks/measurement-validated`
  - Payload: `{ measurementId, validatorEmail, status: 'validated', timestamp }`
- `POST /webhooks/evidence-uploaded`
  - Payload: `{ evidenceId, measurementId, fileName, accessLevel, timestamp }`
- `POST /webhooks/cycle-status`
  - Payload: `{ cycleId, oldStatus, newStatus, timestamp }`

---

### 4. API REST Layer (Contrato de Endpoints)

- `GET /api/indicators`: Lista os 15 indicadores com metadados.
- `GET /api/indicators/:id`: Ficha técnica e memorial de cálculo.
- `GET /api/institutions`: Lista de instituições ativas na Rede.
- `GET /api/cycles`: Lista de ciclos de monitoramento.
- `GET /api/measurements?cycle=:id`: Medições homologadas e em validação.
- `POST /api/measurements`: Submissão de medição pelo ponto focal.
- `PATCH /api/measurements/:id/validate`: Homologação técnica pelo GT2.
- `GET /api/analytics/network?cycle=:id`: Visão consolidada da Rede.
- `GET /api/analytics/institution/:id?cycle=:id`: Perfil da instituição.
- `GET /api/analytics/indicator/:id/timeseries`: Série histórica comparativa.
- `GET /api/reports/generate?scope=...&type=...`: Emissão de relatórios em CSV, JSON ou PDF.

---

### 5. Consumo Analítico via Power BI

A aplicação exporta dados em conformidade com o esquema estrela tabular (`Dim` / `Fact`), permitindo que arquivos CSV/JSON gerados pelo painel ou listas do SharePoint sejam consumidos diretamente no Power BI sem necessidade de transformações complexas no Power Query.
