# ARQUITETURA TÉCNICA E FUNCIONAL
## Rede Equidade — Painel de Indicadores do GT2

### 1. Visão Geral da Arquitetura em 5 Camadas

O sistema adota estrita separação entre a definição conceitual dos indicadores e a operacionalização empírica de coletas, medições, evidências e consolidação analítica.

```text
DIMENSION
   │
   └── INDICATOR (Master Data)
          │
          ├── TARGET (Metas e Linha de Base)
          │
          └── MEASUREMENT (Operational Data)
                  │
                  ├── INSTITUTION (Partícipes)
                  ├── CYCLE (Ciclos de Monitoramento)
                  └── EVIDENCE (Atos, Portarias, Listas)

INSTITUTION
   │
   ├── IDE ASSESSMENT (69 Requisitos)
   │
   └── TRAINING PARTICIPATION (Ações Educativas)

CYCLE
   │
   ├── MEASUREMENTS
   ├── IDE ASSESSMENTS
   └── TRAINING ACTIONS

              ↓
      CALCULATION SERVICE (Motor de Cálculo)
              ↓
         ANALYTICS (Agregações e Tendências)
              ↓
     PRESENTATION (Dashboard + Reporting)
              ↓
      INTEGRATIONS (Microsoft Lists, SharePoint, n8n, Webhooks)
```

---

### 2. Detalhamento das Camadas

#### Layer 01 — Master Data (Dados Mestres)
Entidades estáveis que regem o sistema:
- **IndicatorDefinition**: Os 15 indicadores técnicos do GT2, suas fórmulas, unidades, periodicidade, rastreabilidade e instâncias responsáveis.
- **Dimension**: As 5 dimensões estratégicas (Governança, Modelo IDE, Capacitação, Representatividade & Prevenção, Cooperação).
- **Institution**: Cadastro dos órgãos partícipes da Rede Equidade (esfera, tipologia, pontos focais titular e suplente).
- **IndicatorTarget**: Metas quantitativas ou determinação formal de fixação de linha de base.

#### Layer 02 — Operational Data (Dados Operacionais)
Registros produzidos durante o ciclo de acompanhamento:
- **MonitoringCycle**: Ciclos formais de coleta (2025 Linha de Base, 2026 Coleta em andamento, 2027 Planejado).
- **Measurement**: Valores informados pelos partícipes, numeradores, denominadores, notas técnicas e vínculos probatórios.
- **IDEAssessment**: Autoavaliação institucional nos 69 requisitos do Modelo IDE (Diversidade 7, Gênero 31, Raça 31).
- **TrainingAction**: Registro das oficinas do Modelo IDE e capacitações de servidores (público, órgãos representados, avaliação de reação).
- **Evidence**: Documentos, links, atos normativos e listas com controle de acesso (`public`, `network`, `restricted`).
- **MeasurementRevision**: Histórico auditável de alterações em medições validadas.

#### Layer 03 — Analytics & Calculation (Inteligência e Cálculo)
- **CalculationService**: Computa resultados dos indicadores I01 a I15 preservando numeradores e denominadores, limitando execução a 100% para meta mas registrando superação física separadamente.
- **AnalyticsService**: Consolida panoramas da Rede, perfis institucionais individuais e séries temporais.
- **DataQualityService**: Avalia completude, taxas de homologação e cobertura probatória.

#### Layer 04 — Presentation (Interface do Usuário)
- **Dashboard Executivo**: Visão editorial, KPIs e status do ciclo.
- **Seletor de Perspectivas**: Alternância dinâmica entre [REDE], [INSTITUIÇÃO] e [INDICADOR].
- **Central de Evidências**: Exploração de documentos com níveis de acesso.
- **Central de Pendências**: Workflow de 6 etapas de coleta.
- **Command Palette (Ctrl+K)**: Navegação rápida e comandos contextuais.
- **Report Builder**: Geração de relatórios executivos com exportação em CSV, JSON e PDF.

#### Layer 05 — Integrations & Storage (Repositórios e Conectores)
- Repositório local em memória (`LocalDataStore`) com suporte a modo demonstrativo.
- Adaptador para Microsoft Lists / SharePoint (8 listas padronizadas).
- Barramento de eventos de domínio para automações com n8n e Webhooks.
- Esquema estrela preparado para consumo futuro pelo Power BI.

---

### 3. Governança de Acesso (RBAC)

O sistema define 5 perfis de usuário:
1. **Viewer**: Consulta pública de indicadores consolidados e relatórios agregados.
2. **Institution Focal Point**: Preenchimento e envio de medições e evidências da própria instituição.
3. **GT2 Analyst**: Análise técnica, conferência de conformidade e homologação de medições.
4. **GT2 Manager**: Gestão de ciclos, parametrização de metas e emissão de relatórios oficiais.
5. **Network Admin**: Administração global da plataforma e cadastramento de partícipes.

---

### 4. Privacidade e Segurança (LGPD)

Em conformidade com a LGPD e o Acordo de Cooperação Técnica:
- Indicadores de representatividade (I13) operam exclusivamente com dados estatisticamente agregados.
- Coleta baseada em autodeclaração voluntária e finalidade específica.
- Veda-se qualquer exposição de dados pessoais ou identificação individual.
