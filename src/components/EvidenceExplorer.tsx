import React, { useState, useMemo } from 'react';
import {
  FileCheck,
  Search,
  Filter,
  X,
  Lock,
  Globe,
  Users,
  Download,
  CheckCircle2,
  Clock,
  ExternalLink,
  Shield,
} from 'lucide-react';
import { Evidence, UserRole } from '../types/dataModels';

interface EvidenceExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  evidences: Evidence[];
  userRole: UserRole;
  selectedEvidenceId?: string | null;
}

export const EvidenceExplorer: React.FC<EvidenceExplorerProps> = ({
  isOpen,
  onClose,
  evidences,
  userRole,
  selectedEvidenceId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeEvidence, setActiveEvidence] = useState<Evidence | null>(null);

  // If initial ID provided
  React.useEffect(() => {
    if (selectedEvidenceId) {
      const found = evidences.find((e) => e.id === selectedEvidenceId);
      if (found) setActiveEvidence(found);
    }
  }, [selectedEvidenceId, evidences]);

  const filteredEvidences = useMemo(() => {
    return evidences.filter((e) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matches =
          e.title.toLowerCase().includes(q) ||
          (e.description && e.description.toLowerCase().includes(q)) ||
          e.measurementId.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (typeFilter !== 'all' && e.evidenceType !== typeFilter) return false;
      if (statusFilter !== 'all' && e.validationStatus !== statusFilter) return false;
      return true;
    });
  }, [evidences, searchTerm, typeFilter, statusFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-xs">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-950 dark:text-white">
                Repositório Central de Evidências Documentais
              </h2>
              <p className="text-xs text-stone-500">
                Atos normativos, listas de presença, questionários e portarias auditáveis que fundamentam as medições.
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

        {/* Filter Bar */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar título, ato normativo ou ID de medição..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs"
            >
              <option value="all">Todos os tipos de evidência</option>
              <option value="normative_act">Ato Normativo / Portaria</option>
              <option value="report">Relatório Técnico</option>
              <option value="attendance_list">Lista de Presença / Certificados</option>
              <option value="repository_record">Registro no Repositório</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs"
            >
              <option value="all">Todos os status</option>
              <option value="accepted">Validado / Aceito</option>
              <option value="pending">Pendente de Análise</option>
              <option value="rejected">Rejeitado</option>
            </select>
          </div>
        </div>

        {/* Content: List and Detail Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-stone-200 dark:divide-stone-800">
          {/* Evidences List (7 cols) */}
          <div className="lg:col-span-7 overflow-y-auto p-4 space-y-2">
            {filteredEvidences.length > 0 ? (
              filteredEvidences.map((e) => {
                const isSelected = activeEvidence?.id === e.id;
                return (
                  <div
                    key={e.id}
                    onClick={() => setActiveEvidence(e)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/50 dark:bg-teal-950/30 ring-1 ring-teal-500'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-bold">
                          {e.evidenceType}
                        </span>
                        {e.institutionId && (
                          <span className="font-semibold text-stone-500 text-[11px]">
                            {e.institutionId.toUpperCase()}
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          e.validationStatus === 'accepted'
                            ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {e.validationStatus === 'accepted' ? 'Validado ✓' : 'Pendente'}
                      </span>
                    </div>

                    <h4 className="font-bold text-stone-900 dark:text-white mt-1.5 leading-snug">
                      {e.title}
                    </h4>

                    {e.description && (
                      <p className="mt-1 text-stone-500 line-clamp-2 text-[11px] leading-relaxed">
                        {e.description}
                      </p>
                    )}

                    <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
                      <span>Vínculo: {e.measurementId}</span>
                      <span className="flex items-center gap-1 font-mono">
                        {e.accessLevel === 'public' ? (
                          <>
                            <Globe className="w-3 h-3 text-teal-500" /> Público
                          </>
                        ) : e.accessLevel === 'network' ? (
                          <>
                            <Users className="w-3 h-3 text-indigo-500" /> Rede
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3 text-amber-500" /> Restrito
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center text-xs text-stone-400">
                Nenhuma evidência documental encontrada para os filtros aplicados.
              </div>
            )}
          </div>

          {/* Evidence Detail Drawer (5 cols) */}
          <div className="lg:col-span-5 p-5 bg-stone-50/60 dark:bg-stone-900/40 overflow-y-auto flex flex-col justify-between text-xs space-y-4">
            {activeEvidence ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                    Ficha da Evidência
                  </span>
                  <h3 className="text-base font-bold text-stone-950 dark:text-white mt-1">
                    {activeEvidence.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Arquivo: <code className="font-mono text-stone-800 dark:text-stone-200">{activeEvidence.fileName || 'documento.pdf'}</code>
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Status de Validação:</span>
                    <strong className="text-teal-600 dark:text-teal-400">
                      {activeEvidence.validationStatus === 'accepted' ? 'Validada e Homologada' : 'Em Análise Técnica'}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Nível de Acesso:</span>
                    <strong className="font-mono uppercase">{activeEvidence.accessLevel}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Data de Envio:</span>
                    <span className="font-mono">{new Date(activeEvidence.uploadedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Responsável pelo Envio:</span>
                    <span className="truncate max-w-[150px]">{activeEvidence.uploadedBy}</span>
                  </div>
                </div>

                {activeEvidence.validationNotes && (
                  <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-[11px] text-teal-900 dark:text-teal-200">
                    <strong>Parecer Técnico:</strong> {activeEvidence.validationNotes}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={() => alert(`Simulando visualização segura de: ${activeEvidence.fileName}`)}
                    className="w-full py-2 px-3 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:opacity-90"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar Arquivo Auditável</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-stone-400 my-auto">
                Selecione uma evidência à esquerda para visualizar sua ficha técnica e validação.
              </div>
            )}

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-400">
              Conformidade LGPD: Evidências contendo dados individuais ou sensíveis são restritas a auditores autorizados.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
