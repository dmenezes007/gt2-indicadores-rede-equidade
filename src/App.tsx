import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { CommandBar } from './components/CommandBar';
import { EvidenceExplorer } from './components/EvidenceExplorer';
import { PendingTasksPanel } from './components/PendingTasksPanel';
import { CommandPalette } from './components/CommandPalette';
import { DimensionMap } from './components/DimensionMap';
import { MaturityIDE } from './components/MaturityIDE';
import { DataVisualization } from './components/DataVisualization';
import { AnalyticsMatrix } from './components/AnalyticsMatrix';
import { IndicatorDrawer } from './components/IndicatorDrawer';
import { ComparisonModal } from './components/ComparisonModal';
import { ReportModal } from './components/ReportModal';
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
import {
  IndicatorDefinition,
  Institution,
  MonitoringCycle,
  Measurement,
  Evidence,
  UserRole,
} from './types/dataModels';
import { FilterState, Indicator } from './types/indicators';
import { INDICATORS } from './data/indicatorsData';

const INITIAL_FILTERS: FilterState = {
  search: '',
  dimensoes: [],
  periodicidades: [],
  tipos: [],
};

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      // Light is the application default; an explicit saved dark preference is respected.
      return localStorage.getItem('rede-equidade-theme') === 'dark';
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

  // Analytics calculated data
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

  // Global filters
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync state to URL without reloading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('cycle', selectedCycleId);
      url.searchParams.delete('perspective');
      url.searchParams.delete('indicator');
      url.searchParams.delete('institution');
      window.history.replaceState({}, '', url.toString());
    }
  }, [selectedCycleId]);

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

    const meas = await measurementRepository.getAll(selectedCycleId);
    setAllMeasurements(meas);

    const evs = await evidenceRepository.getAll(selectedCycleId);
    setAllEvidences(evs);

  };

  useEffect(() => {
    reloadDataLayer();
  }, [selectedCycleId, demoMode]);

  // Distinct types and responsibles for dynamic filtering
  const availableTypes = useMemo(() => {
    return Array.from(new Set(INDICATORS.map((i) => i.categoriaTipo)));
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
          ind.fonte.toLowerCase().includes(q) ||
          ind.rastreabilidade.toLowerCase().includes(q) ||
          ind.definicao.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Dimensions
      if (filters.dimensoes.length > 0) {
        if (!filters.dimensoes.includes(ind.dimensaoId)) return false;
      }

      // Periodicity
      if (filters.periodicidades.length > 0) {
        if (!filters.periodicidades.includes(ind.periodicidade)) return false;
      }

      // Types
      if (filters.tipos.length > 0) {
        if (!filters.tipos.includes(ind.categoriaTipo)) return false;
      }

      return true;
    });
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.dimensoes.length > 0) count += filters.dimensoes.length;
    if (filters.periodicidades.length > 0) count += filters.periodicidades.length;
    if (filters.tipos.length > 0) count += filters.tipos.length;
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

  const comparedIndicatorsList = useMemo(() => {
    return INDICATORS.filter((i) => selectedIndicators.includes(i.id));
  }, [selectedIndicators]);



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

      {/* 03 — Command Bar / filtros globais */}
      <CommandBar
        filters={filters}
        onFilterChange={setFilters}
        onResetFilters={() => setFilters(INITIAL_FILTERS)}
        totalCount={INDICATORS.length}
        filteredCount={filteredIndicators.length}
        availableTypes={availableTypes}
        isOpen={filtersOpen}
        searchRef={searchInputRef}
      />

      {/* Main Content */}
      <main className="flex-1 space-y-2">
        <>
            {/* Matriz de Indicadores */}
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

            {/* 5 Strategic Dimensions */}
            <DimensionMap
              onSelectDimension={handleSelectDimension}
              selectedDimensionId={filters.dimensoes.length === 1 ? filters.dimensoes[0] : undefined}
            />

            {/* IDE Maturity Special Section */}
            <MaturityIDE onOpenIndicator={(ind) => setActiveIndicator(ind)} />

            {/* Analytics & Visualizations */}
            <DataVisualization
              onOpenIndicator={(ind) => setActiveIndicator(ind)}
              onFilterDimension={handleSelectDimension}
            />

          </>
      </main>

      {/* Technical Footer */}
      <TechnicalFooter />

      {/* Slide-over Drawer for Indicator Details */}
      <IndicatorDrawer
        indicator={activeIndicator}
        onClose={() => setActiveIndicator(null)}
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

    </div>
  );
}
