import React from 'react';

export const TechnicalFooter: React.FC = () => (
  <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-stone-500 dark:text-stone-400">
        <span>Rede Equidade • GT2 — Indicadores</span>
        <span className="sm:text-right">Coordenação de Gestão Estratégica e Modernização — COGEM/Enap</span>
      </div>
    </div>
  </footer>
);
