import React from 'react';
import {
  Compass,
  Building2,
  BarChart2,
  Calendar,
  Shield,
  AlertTriangle,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  UserCheck,
} from 'lucide-react';
import { Perspective, UserRole, MonitoringCycle, Institution, IndicatorDefinition } from '../types/dataModels';

interface PerspectiveSelectorProps {
  perspective: Perspective;
  onPerspectiveChange: (p: Perspective) => void;
  cycles: MonitoringCycle[];
  selectedCycleId: string;
  onCycleChange: (cycleId: string) => void;
  userRole: UserRole;
  onUserRoleChange: (role: UserRole) => void;
  demoMode: boolean;
  onToggleDemoMode: () => void;
  institutions: Institution[];
  selectedInstitutionId: string;
  onSelectInstitution: (id: string) => void;
  indicators: IndicatorDefinition[];
  selectedIndicatorId: string;
  onSelectIndicator: (id: string) => void;
}

export const PerspectiveSelector: React.FC<PerspectiveSelectorProps> = ({
  perspective,
  onPerspectiveChange,
  cycles,
  selectedCycleId,
  onCycleChange,
  userRole,
  onUserRoleChange,
  demoMode,
  onToggleDemoMode,
  institutions,
  selectedInstitutionId,
  onSelectInstitution,
  indicators,
  selectedIndicatorId,
  onSelectIndicator,
}) => {
  return (
    <section className="bg-stone-50 dark:bg-stone-950 border-b border-stone-200/80 dark:border-stone-800/80 pt-4 pb-3 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        {/* Top Control Bar: Perspective, Cycle, Role & Demo Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left: Perspective Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Perspectiva:
            </span>
            <div className="inline-flex p-1 rounded-xl bg-stone-200/70 dark:bg-stone-900 border border-stone-300/60 dark:border-stone-800 text-xs">
              <button
                onClick={() => onPerspectiveChange('network')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  perspective === 'network'
                    ? 'bg-white dark:bg-stone-800 text-stone-950 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-indigo-500" />
                <span>Visão da Rede</span>
              </button>
              <button
                onClick={() => onPerspectiveChange('institution')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  perspective === 'institution'
                    ? 'bg-white dark:bg-stone-800 text-stone-950 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-teal-500" />
                <span>Por Instituição</span>
              </button>
              <button
                onClick={() => onPerspectiveChange('indicator')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  perspective === 'indicator'
                    ? 'bg-white dark:bg-stone-800 text-stone-950 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5 text-amber-500" />
                <span>Por Indicador</span>
              </button>
            </div>
          </div>

          {/* Right: Cycle Selector, RBAC Role & Demo Toggle */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Cycle Selector */}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={selectedCycleId}
                onChange={(e) => onCycleChange(e.target.value)}
                className="py-1.5 px-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-stone-400 shadow-xs"
              >
                {cycles.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.status === 'collection_open' ? '• Coleta Aberta' : c.isBaseline ? '• Linha de Base' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* RBAC Role Selector */}
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={userRole}
                onChange={(e) => onUserRoleChange(e.target.value as UserRole)}
                className="py-1.5 px-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-stone-400 shadow-xs"
                title="Simular perfil de acesso (RBAC)"
              >
                <option value="viewer">Perfil: Consulta (Público / Geral)</option>
                <option value="institution_focal_point">Perfil: Ponto Focal Institucional</option>
                <option value="gt2_analyst">Perfil: Analista Técnico GT2</option>
                <option value="gt2_manager">Perfil: Gestor GT2</option>
                <option value="network_admin">Perfil: Administrador da Rede</option>
              </select>
            </div>

            {/* Demo Mode Toggle */}
            <button
              onClick={onToggleDemoMode}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-semibold text-xs transition-colors ${
                demoMode
                  ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="Ativar/Desativar carregamento de dados sintéticos para demonstração completa"
            >
              {demoMode ? (
                <ToggleRight className="w-4 h-4 text-amber-600" />
              ) : (
                <ToggleLeft className="w-4 h-4 text-stone-400" />
              )}
              <span>Dados Demonstrativos: {demoMode ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Demo Mode Notice Banner */}
        {demoMode && (
          <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>MODO DEMONSTRAÇÃO ATIVO:</strong> Os resultados e instituições apresentados a seguir são dados sintéticos para demonstrar funcionalidades completas, histórico e cruzamentos analíticos.
              </span>
            </div>
            <button
              onClick={onToggleDemoMode}
              className="text-xs font-semibold text-amber-800 dark:text-amber-300 hover:underline shrink-0"
            >
              Desativar modo demo
            </button>
          </div>
        )}

        {/* Contextual Sub-bar for Institution or Indicator Perspective */}
        {perspective === 'institution' && (
          <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800/60 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold text-stone-600 dark:text-stone-400">
              Selecione a Instituição para análise:
            </span>
            {institutions.length > 0 ? (
              <select
                value={selectedInstitutionId}
                onChange={(e) => onSelectInstitution(e.target.value)}
                className="py-1.5 px-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-semibold text-stone-900 dark:text-stone-100"
              >
                {institutions.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.acronym} — {inst.name} ({inst.institutionType})
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-stone-400 italic">
                Nenhuma instituição cadastrada para este ciclo no modo real (ative [Dados Demonstrativos] para testar a visão institucional).
              </span>
            )}
          </div>
        )}

        {perspective === 'indicator' && (
          <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800/60 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold text-stone-600 dark:text-stone-400">
              Selecione o Indicador para inspeção analítica e série temporal:
            </span>
            <select
              value={selectedIndicatorId}
              onChange={(e) => onSelectIndicator(e.target.value)}
              className="py-1.5 px-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-semibold text-stone-900 dark:text-stone-100 max-w-md"
            >
              {indicators.map((ind) => (
                <option key={ind.id} value={ind.id}>
                  {ind.code} • {ind.name} ({ind.dimensionId})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </section>
  );
};
