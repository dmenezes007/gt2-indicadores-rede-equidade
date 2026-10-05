import React from 'react';
import { ArrowUp, ShieldCheck, FileCheck, Layers } from 'lucide-react';

export const TechnicalFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-stone-800">
          {/* Brand & Purpose */}
          <div className="max-w-xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-white text-stone-950 font-bold flex items-center justify-center text-xs">
                RE
              </span>
              <span className="font-bold tracking-tight text-white text-sm">
                REDE EQUIDADE
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-400">
                GT2 • INDICADORES
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Painel de Indicadores do Grupo de Trabalho 2 (GT2) — Monitoramento, maturidade e resultados da agenda de Diversidade, Equidade e Inclusão da Rede Equidade.
            </p>
          </div>

          {/* Quick Anchor Links */}
          <div className="flex flex-wrap gap-4 text-xs text-stone-400">
            <a href="#visao-executiva" className="hover:text-white transition-colors">
              Visão Executiva
            </a>
            <a href="#dimensoes" className="hover:text-white transition-colors">
              Dimensões
            </a>
            <a href="#maturidade-ide" className="hover:text-white transition-colors">
              Maturidade IDE
            </a>
            <a href="#analise" className="hover:text-white transition-colors">
              Análise
            </a>
            <a href="#indicadores" className="hover:text-white transition-colors">
              Indicadores
            </a>
            <a href="#matriz" className="hover:text-white transition-colors">
              Matriz
            </a>
            <a href="#diretrizes" className="hover:text-white transition-colors">
              Diretrizes
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold self-start transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mandatory Privacy & Data Governance Note */}
        <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 flex items-start gap-3 text-stone-400 leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="text-stone-200 font-semibold text-xs">
              Governança de Dados, Privacidade e Princípios Éticos (I13 / LGPD)
            </div>
            <p className="text-[11px]">
              Indicadores de representatividade utilizam dados estritamente agregados e pressupõem autodeclaração voluntária, finalidade específica, minimização e controles rigorosos de acesso, em conformidade com as diretrizes do Acordo de Cooperação Técnica (ACT) e com a legislação de proteção de dados pessoais.
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 pt-2">
          <div>
            © 2026 Rede Equidade • Grupo de Trabalho 2 (GT2). Versão de Trabalho para Consulta e Homologação.
          </div>
          <div className="flex items-center gap-3">
            <span>Modelo IDE • 69 Requisitos</span>
            <span>·</span>
            <span>15 Indicadores Técnicos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
