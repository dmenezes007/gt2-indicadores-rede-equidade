import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  ArrowRight,
  Shield,
  Layers,
  Send,
} from 'lucide-react';
import { Measurement, MeasurementStatus, UserRole } from '../types/dataModels';

interface PendingTasksPanelProps {
  isOpen: boolean;
  onClose: () => void;
  measurements: Measurement[];
  userRole: UserRole;
  onOpenMeasurement: (measurementId: string) => void;
}

export const PendingTasksPanel: React.FC<PendingTasksPanelProps> = ({
  isOpen,
  onClose,
  measurements,
  userRole,
  onOpenMeasurement,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  if (!isOpen) return null;

  const statusCategories: { status: MeasurementStatus | 'all'; label: string; count: number }[] = [
    { status: 'all', label: 'Todas as Medições', count: measurements.length },
    { status: 'draft', label: 'Rascunho / Em Preenchimento', count: measurements.filter((m) => m.status === 'draft').length },
    { status: 'submitted', label: 'Enviadas (Aguardando GT2)', count: measurements.filter((m) => m.status === 'submitted').length },
    { status: 'under_review', label: 'Em Validação Técnica', count: measurements.filter((m) => m.status === 'under_review').length },
    { status: 'rejected', label: 'Ajuste Solicitado', count: measurements.filter((m) => m.status === 'rejected').length },
    { status: 'validated', label: 'Validadas / Homologadas', count: measurements.filter((m) => m.status === 'validated').length },
  ];

  const filtered = measurements.filter((m) => {
    if (selectedStatus === 'all') return true;
    return m.status === selectedStatus;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-xs">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-950 dark:text-white">
                Central de Pendências & Workflow de Coleta
              </h2>
              <p className="text-xs text-stone-500">
                Acompanhamento das etapas operacionais de envio, conferência documental e homologação pelo GT2.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workflow Diagram Banner */}
        <div className="p-4 bg-stone-100/70 dark:bg-stone-900/50 border-b border-stone-200 dark:border-stone-800 overflow-x-auto text-[11px]">
          <div className="flex items-center justify-between min-w-[650px] gap-2">
            {[
              { step: '1', title: 'Ciclo Aberto', desc: 'Pontos focais acionados' },
              { step: '2', title: 'Preenchimento', desc: 'Coleta institucional' },
              { step: '3', title: 'Evidência Anexa', desc: 'Atos comprobatórios' },
              { step: '4', title: 'Submissão', desc: 'Envio formal à Rede' },
              { step: '5', title: 'Análise GT2', desc: 'Validação documental' },
              { step: '6', title: 'Homologação', desc: 'Consolidação analítica' },
            ].map((st, i) => (
              <React.Fragment key={st.step}>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-bold flex items-center justify-center font-mono text-xs">
                    {st.step}
                  </span>
                  <div>
                    <span className="font-bold text-stone-900 dark:text-white block">
                      {st.title}
                    </span>
                    <span className="text-[10px] text-stone-500 block -mt-0.5">
                      {st.desc}
                    </span>
                  </div>
                </div>
                {i < 5 && <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="p-3 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 flex flex-wrap gap-1.5 text-xs">
          {statusCategories.map((cat) => (
            <button
              key={cat.status}
              onClick={() => setSelectedStatus(cat.status)}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                selectedStatus === cat.status
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
              }`}
            >
              <span>{cat.label}</span>
              <span className="font-mono text-[10px] font-bold opacity-75">
                ({cat.count})
              </span>
            </button>
          ))}
        </div>

        {/* List of Filtered Items */}
        <div className="p-5 overflow-y-auto flex-1 space-y-2.5">
          {filtered.length > 0 ? (
            filtered.map((m) => (
              <div
                key={m.id}
                onClick={() => onOpenMeasurement(m.indicatorId)}
                className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-stone-400 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono font-bold text-sm px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white">
                    {m.indicatorId}
                  </span>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white">
                      Medição {m.id} • {m.institutionId ? m.institutionId.toUpperCase() : 'Consolidado da Rede'}
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Submetido em: {m.submittedAt || 'Não submetido'} • Evidências vinculadas: {m.evidenceIds?.length || 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      m.status === 'validated'
                        ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300'
                        : m.status === 'submitted'
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}
                  >
                    {m.status === 'validated'
                      ? 'Validado ✓'
                      : m.status === 'submitted'
                      ? 'Enviado ao GT2'
                      : m.status === 'under_review'
                      ? 'Em Validação'
                      : 'Rascunho'}
                  </span>

                  <button className="text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white flex items-center gap-1">
                    <span>Inspecionar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-xs text-stone-400">
              Nenhuma medição encontrada para o status selecionado.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-between text-xs text-stone-500">
          <span>
            Perfil conectado: <strong className="text-stone-800 dark:text-stone-200">{userRole}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
