import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { CommandBar } from './components/CommandBar';
import { PerspectiveSelector } from './components/PerspectiveSelector';
import { NetworkOverview } from './components/NetworkOverview';
import { InstitutionProfile } from './components/InstitutionProfile';
import { IndicatorAnalyticsView } from './components/IndicatorAnalyticsView';
import { DataQualityPanel } from './components/DataQualityPanel';
import { EvidenceExplorer } from './components/EvidenceExplorer';
import { PendingTasksPanel } from './components/PendingTasksPanel';
import { CommandPalette } from './components/CommandPalette';
import { ExecutiveOverview } from './components/ExecutiveOverview';
import { DimensionMap } from './components/DimensionMap';
import { MaturityIDE } from './components/MaturityIDE';
import { ExecutionTracker } from './components/ExecutionTracker';
import { DataVisualization } from './components/DataVisualization';
import { IndicatorExplorer } from './components/IndicatorExplorer';
import { AnalyticsMatrix } from './components/AnalyticsMatrix';
import { IndicatorDrawer } from './components/IndicatorDrawer';
import { ComparisonModal } from './components/ComparisonModal';
import { ReportModal } from './components/ReportModal';
import { ImplementationGuidelines } from './components/ImplementationGuidelines';
import { TechnicalFooter } from './components/TechnicalFooter';

// Repositories & Services
import {
  indicatorRepository,
  institutionRepository,
  cycleRepository,
  measurementRepository,
  evidenceRepository,
  localDataStore,
} from './repositories/localRepository';
import { analyticsService, NetworkOverviewData, InstitutionProfileData } from './services/analyticsService';
import {
  IndicatorDefinition,
  Institution,
  MonitoringCycle,
  Measurement,
  Evidence,
  Perspective,
  UserRole,
} from './types/dataModels';
import { FilterState, Indicator, Priority } from './types/indicators';
import { INDICATORS } from './data/indicatorsData';

const INITIAL_FILTERS: FilterState = {
  search: '',
  dimensoes: [],
  prioridades: [],
  periodicidades: [],
  nucleoRecomendado: 'todos',
  tipos: [],
  responsaveis: [],
};

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('rede-equidade-theme') === 'dark' ||
        (!('rede-equidade-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('rede-equidade-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('rede-equidade-theme', 'light');
    }
  }, [darkMode]);

  // Read URL parameters on initial load
  const getInitialUrlParam = (param: string, fallback: string) => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param) || fallback;
    }
    return fallback;
  };

  // Layer 04 UX State
  const [perspective, setPerspective] = useState<Perspective>(
    () => (getInitialUrlParam('perspective', 'network') as Perspective) || 'network'
  );
  const [selectedCycleId, setSelectedCycleId] = useState<string>(
    () => getInitialUrlParam('cycle', 'cycle-2026')
  );
  const [userRole, setUserRole] = useState<UserRole>('viewer');
  const [demoMode, setDemoMode] = useState<boolean>(false);

  // Entities state
  const [cycles, setCycles] = useState<MonitoringCycle[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [indicatorDefinitions, setIndicatorDefinitions] = useState<IndicatorDefinition[]>([]);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>('inst-a');
  const [selectedIndicatorId, setSelectedIndicatorId] = useState<string>(
    () => getInitialUrlParam('indicator', 'I01')
  );

  // Analytics calculated data
  const [networkData, setNetworkData] = useState<NetworkOverviewData | null>(null);
  const [institutionProfile, setInstitutionProfile] = useState<InstitutionProfileData | null>(null);
  const [allEvidences, setAllEvidences] = useState<Evidence[]>([]);
  const [allMeasurements, setAllMeasurements] = useState<Measurement[]>([]);

  // Modals & Panels state
  const [evidenceExplorerOpen, setEvidenceExplorerOpen] = useState(false);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null);
  const [pendingTasksOpen, setPendingTasksOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState<Indicator | null>(null);
  const [reportIndicators, setReportIndicators] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global filters
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync state to URL without reloading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('cycle', selectedCycleId);
      url.searchParams.set('perspective', perspective);
      if (perspective === 'indicator') {
        url.searchParams.set('indicator', selectedIndicatorId);
      } else {
        url.searchParams.delete('indicator');
      }
      if (perspective === 'institution') {
        url.searchParams.set('institution', selectedInstitutionId);
      } else {
        url.searchParams.delete('institution');
      }
      window.history.replaceState({}, '', url.toString());
    }
  }, [selectedCycleId, perspective, selectedIndicatorId, selectedInstitutionId]);

  // Load baseline master data
  useEffect(() => {
    cycleRepository.getAll().then(setCycles);
    indicatorRepository.getAll().then(setIndicatorDefinitions);
  }, []);

  // Reload data layer when cycle or demo mode changes
  const reloadDataLayer = async () => {
    localDataStore.setDemoMode(demoMode);
    const insts = await institutionRepository.getAll();
    setInstitutions(insts);
    if (insts.length > 0 && !insts.some((i) => i.id === selectedInstitutionId)) {
      setSelectedInstitutionId(insts[0].id);
    }

    const nData = await analyticsService.getNetworkOverview(selectedCycleId);
    setNetworkData(nData);

    const meas = await measurementRepository.getAll(selectedCycleId);
    setAllMeasurements(meas);

    const evs = await evidenceRepository.getAll(selectedCycleId);
    setAllEvidences(evs);

    if (selectedInstitutionId) {
      const instData = await analyticsService.getInstitutionProfile(selectedInstitutionId, selectedCycleId);
      setInstitutionProfile(instData);
    }
  };

  useEffect(() => {
    reloadDataLayer();
  }, [selectedCycleId, demoMode]);

  useEffect(() => {
    if (selectedInstitutionId) {
      analyticsService.getInstitutionProfile(selectedInstitutionId, selectedCycleId).then(setInstitutionProfile);
    }
  }, [selectedInstitutionId, selectedCycleId]);

  // Distinct types and responsibles for dynamic filtering
  const availableTypes = useMemo(() => {
    return Array.from(new Set(INDICATORS.map((i) => i.categoriaTipo)));
  }, []);

  const availableResponsibles = useMemo(() => {
    return Array.from(new Set(INDICATORS.map((i) => i.responsavel)));
  }, []);

  // Filtered indicators dataset
  const filteredIndicators = useMemo(() => {
    return INDICATORS.filter((ind) => {
      // Search
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchesSearch =
          ind.id.toLowerCase().includes(q) ||
          ind.indicador.toLowerCase().includes(q) ||
          ind.dimensao.toLowerCase().includes(q) ||
          ind.responsavel.toLowerCase().includes(q) ||
          ind.fonte.toLowerCase().includes(q) ||
          ind.rastreabilidade.toLowerCase().includes(q) ||
          ind.definicao.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Dimensions
      if (filters.dimensoes.length > 0) {
        if (!filters.dimensoes.includes(ind.dimensaoId)) return false;
      }

      // Priority
      if (filters.prioridades.length > 0) {
        if (!filters.prioridades.includes(ind.prioridade)) return false;
      }

      // Periodicity
      if (filters.periodicidades.length > 0) {
        if (!filters.periodicidades.includes(ind.periodicidade)) return false;
      }

      // Nucleo recomendado
      if (filters.nucleoRecomendado === 'sim' && !ind.nucleoRecomendado) return false;
      if (filters.nucleoRecomendado === 'nao' && ind.nucleoRecomendado) return false;

      // Types
      if (filters.tipos.length > 0) {
        if (!filters.tipos.includes(ind.categoriaTipo)) return false;
      }

      // Responsibles
      if (filters.responsaveis.length > 0) {
        if (!filters.responsaveis.includes(ind.responsavel)) return false;
      }

      return true;
    });
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.dimensoes.length > 0) count += filters.dimensoes.length;
    if (filters.prioridades.length > 0) count += filters.prioridades.length;
    if (filters.periodicidades.length > 0) count += filters.periodicidades.length;
    if (filters.nucleoRecomendado !== 'todos') count += 1;
    if (filters.tipos.length > 0) count += filters.tipos.length;
    if (filters.responsaveis.length > 0) count += filters.responsaveis.length;
    return count;
  }, [filters]);

  const handleSelectDimension = (dimId: string) => {
    if (!dimId) {
      setFilters((prev) => ({ ...prev, dimensoes: [] }));
      return;
    }
    setFilters((prev) => {
      const exists = prev.dimensoes.includes(dimId);
      return {
        ...prev,
        dimensoes: exists ? [] : [dimId],
      };
    });
    const el = document.getElementById('indicadores');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSelect = (indicatorId: string) => {
    setSelectedIndicators((prev) =>
      prev.includes(indicatorId)
        ? prev.filter((id) => id !== indicatorId)
        : [...prev, indicatorId]
    );
  };

  const handleSelectAll = (indicatorIds: string[]) => {
    setSelectedIndicators(indicatorIds);
  };

  const handleClearSelection = () => {
    setSelectedIndicators([]);
  };

  const handleOpenIndicatorById = (id: string) => {
    const found = INDICATORS.find((i) => i.id === id);
    if (found) {
      setActiveIndicator(found);
    }
  };

  const handleAddToReport = (indicator: Indicator) => {
    setReportIndicators((prev) => {
      if (prev.includes(indicator.id)) {
        showToast(`Indicador ${indicator.id} já está no relatório.`);
        return prev;
      }
      showToast(`Indicador ${indicator.id} adicionado ao relatório.`);
      return [...prev, indicator.id];
    });
  };

  const comparedIndicatorsList = useMemo(() => {
    return INDICATORS.filter((i) => selectedIndicators.includes(i.id));
  }, [selectedIndicators]);

  // Selected indicator definition for Indicator perspective
  const currentIndicatorDef = useMemo(() => {
    return (
      indicatorDefinitions.find((i) => i.id === selectedIndicatorId) ||
      indicatorDefinitions[0]
    );
  }, [indicatorDefinitions, selectedIndicatorId]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      {/* 01 — Header institucional */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenReport={() => setReportOpen(true)}
        onToggleFilters={() => setFiltersOpen(!filtersOpen)}
        filtersOpen={filtersOpen}
        activeFilterCount={activeFilterCount}
        onFocusSearch={() => {
          setCommandPaletteOpen(true);
        }}
      />

      {/* 02 — Perspective & Cycle Selector (Layer 04 UX) */}
      <PerspectiveSelector
        perspective={perspective}
        onPerspectiveChange={setPerspective}
        cycles={cycles}
        selectedCycleId={selectedCycleId}
        onCycleChange={setSelectedCycleId}
        userRole={userRole}
        onUserRoleChange={setUserRole}
        demoMode={demoMode}
        onToggleDemoMode={() => setDemoMode(!demoMode)}
        institutions={institutions}
        selectedInstitutionId={selectedInstitutionId}
        onSelectInstitution={setSelectedInstitutionId}
        indicators={indicatorDefinitions}
        selectedIndicatorId={selectedIndicatorId}
        onSelectIndicator={setSelectedIndicatorId}
      />

      {/* 03 — Command Bar / filtros globais */}
      <CommandBar
        filters={filters}
        onFilterChange={setFilters}
        onResetFilters={() => setFilters(INITIAL_FILTERS)}
        totalCount={INDICATORS.length}
        filteredCount={filteredIndicators.length}
        availableTypes={availableTypes}
        availableResponsibles={availableResponsibles}
        isOpen={filtersOpen}
        searchRef={searchInputRef}
      />

      {/* 04 — Data Quality & Audit Strip */}
      {networkData && (
        <DataQualityPanel
          dataQuality={networkData.dataQuality}
          hasData={networkData.eligibleInstitutions > 0 && networkData.reportingInstitutions > 0}
          eligibleCount={networkData.eligibleInstitutions}
          reportingCount={networkData.reportingInstitutions}
          validatedCount={networkData.validatedMeasurementsCount}
        />
      )}

      {/* Main Content Areas based on Perspective */}
      <main className="flex-1 space-y-2">
        {/* PERSPECTIVA: REDE (Consolidated) */}
        {perspective === 'network' && (
          <>
            {/* Matriz de Indicadores — primeira seção analítica */}
            {/* Analytical Matrix */}
            <AnalyticsMatrix
              indicators={filteredIndicators}
              onOpenIndicator={(ind) => setActiveIndicator(ind)}
              selectedIndicators={selectedIndicators}
              onToggleSelect={handleToggleSelect}
              onSelectAll={handleSelectAll}
              onClearSelection={handleClearSelection}
              onOpenComparison={() => setComparisonOpen(true)}
              onOpenReportWithSelected={() => setReportOpen(true)}
            />

            {/* Network Panorama (Layer 03 derived) */}
            {networkData && (
              <NetworkOverview
                data={networkData}
                indicators={indicatorDefinitions}
                onOpenIndicator={handleOpenIndicatorById}
                onOpenEvidenceExplorer={() => setEvidenceExplorerOpen(true)}
                onOpenPendingTasks={() => setPendingTasksOpen(true)}
              />
            )}

            {/* Executive Overview (Editorial) */}
            <ExecutiveOverview onSelectDimension={handleSelectDimension} />

            {/* 5 Strategic Dimensions */}
            <DimensionMap
              onSelectDimension={handleSelectDimension}
              selectedDimensionId={filters.dimensoes.length === 1 ? filters.dimensoes[0] : undefined}
              onOpenIndicator={(ind) => setActiveIndicator(ind)}
            />

            {/* IDE Maturity Special Section */}
            <MaturityIDE onOpenIndicator={(ind) => setActiveIndicator(ind)} />

            {/* Execution Tracker (I09 & I10) */}
            <ExecutionTracker onOpenIndicator={handleOpenIndicatorById} />

            {/* Analytics & Visualizations */}
            <DataVisualization
              onOpenIndicator={(ind) => setActiveIndicator(ind)}
              onFilterDimension={handleSelectDimension}
            />

            {/* Indicator Explorer */}
            <IndicatorExplorer
              indicators={filteredIndicators}
              onOpenIndicator={(ind) => setActiveIndicator(ind)}
              selectedIndicators={selectedIndicators}
              onToggleSelect={handleToggleSelect}
              onOpenComparison={() => setComparisonOpen(true)}
            />

            {/* Implementation Guidelines */}
            <ImplementationGuidelines />
          </>
        )}

        {/* PERSPECTIVA: INSTITUIÇÃO */}
        {perspective === 'institution' && (
          <InstitutionProfile
            data={institutionProfile}
            indicators={indicatorDefinitions}
            onOpenIndicator={handleOpenIndicatorById}
            onOpenEvidence={(eviId) => {
              setSelectedEvidenceId(eviId);
              setEvidenceExplorerOpen(true);
            }}
          />
        )}

        {/* PERSPECTIVA: INDICADOR */}
        {perspective === 'indicator' && currentIndicatorDef && (
          <IndicatorAnalyticsView
            indicator={currentIndicatorDef}
            result={networkData?.results[currentIndicatorDef.id]}
            cycleName={networkData?.cycle.name || 'Ciclo 2026'}
            onOpenEvidence={(eviId) => {
              setSelectedEvidenceId(eviId);
              setEvidenceExplorerOpen(true);
            }}
          />
        )}
      </main>

      {/* Technical Footer */}
      <TechnicalFooter />

      {/* Slide-over Drawer for Indicator Details */}
      <IndicatorDrawer
        indicator={activeIndicator}
        onClose={() => setActiveIndicator(null)}
        onAddToReport={handleAddToReport}
        isInReport={activeIndicator ? reportIndicators.includes(activeIndicator.id) : false}
      />

      {/* Evidence Explorer Modal */}
      <EvidenceExplorer
        isOpen={evidenceExplorerOpen}
        onClose={() => {
          setEvidenceExplorerOpen(false);
          setSelectedEvidenceId(null);
        }}
        evidences={allEvidences}
        userRole={userRole}
        selectedEvidenceId={selectedEvidenceId}
      />

      {/* Pending Tasks & Workflow Panel */}
      <PendingTasksPanel
        isOpen={pendingTasksOpen}
        onClose={() => setPendingTasksOpen(false)}
        measurements={allMeasurements}
        userRole={userRole}
        onOpenMeasurement={(indId) => {
          setPendingTasksOpen(false);
          handleOpenIndicatorById(indId);
        }}
      />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        indicators={indicatorDefinitions}
        institutions={institutions}
        cycles={cycles}
        onSelectIndicator={(id) => {
          setSelectedIndicatorId(id);
          setPerspective('indicator');
        }}
        onSelectInstitution={(id) => {
          setSelectedInstitutionId(id);
          setPerspective('institution');
        }}
        onSelectDimension={handleSelectDimension}
        onSelectCycle={setSelectedCycleId}
        onOpenReport={() => setReportOpen(true)}
        onOpenEvidences={() => setEvidenceExplorerOpen(true)}
        onOpenPendingTasks={() => setPendingTasksOpen(true)}
        onResetFilters={() => setFilters(INITIAL_FILTERS)}
      />

      {/* Comparison Modal */}
      {comparisonOpen && (
        <ComparisonModal
          indicators={comparedIndicatorsList}
          onClose={() => setComparisonOpen(false)}
          onRemoveIndicator={handleToggleSelect}
          onOpenIndicator={(ind) => setActiveIndicator(ind)}
        />
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        allIndicators={INDICATORS}
        filteredIndicators={filteredIndicators}
        selectedIndicatorIds={selectedIndicators}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 text-xs font-semibold shadow-xl border border-stone-800 dark:border-stone-200 animate-in slide-in-from-bottom-3 duration-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
