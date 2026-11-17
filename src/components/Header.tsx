import React from 'react';
import { Atom, Eye, EyeOff, Home, Sparkles } from 'lucide-react';
import { SimulationMode } from './BioLabCanvas';

export type TabId =
  | 'portada'
  | 'como-funciona'
  | 'antes-de-planear'
  | 'las-5-clases'
  | 'como-se-califica'
  | 'calculadora'
  | 'para-profundizar';

export const TABS: {
  id: TabId;
  num: string;
  label: string;
  activeGradient: string;
  badgeBg: string;
}[] = [
  {
    id: 'portada',
    num: 'Inicio',
    label: 'Portada',
    activeGradient: 'from-[#0284C7] via-[#059669] to-[#0D9488]',
    badgeBg: 'bg-sky-500/12 text-sky-700',
  },
  {
    id: 'como-funciona',
    num: '1',
    label: 'Cómo funciona',
    activeGradient: 'from-[#0284C7] to-[#0891B2]',
    badgeBg: 'bg-sky-500/15 text-sky-700',
  },
  {
    id: 'antes-de-planear',
    num: '2',
    label: 'Antes de planear',
    activeGradient: 'from-[#7C3AED] to-[#6366F1]',
    badgeBg: 'bg-violet-500/15 text-violet-700',
  },
  {
    id: 'las-5-clases',
    num: '3',
    label: 'Las 5 clases',
    activeGradient: 'from-[#059669] to-[#10B981]',
    badgeBg: 'bg-emerald-500/15 text-emerald-700',
  },
  {
    id: 'como-se-califica',
    num: '4',
    label: 'Cómo se califica',
    activeGradient: 'from-[#D97706] to-[#EA580C]',
    badgeBg: 'bg-amber-500/15 text-amber-700',
  },
  {
    id: 'calculadora',
    num: '5',
    label: 'Calculadora',
    activeGradient: 'from-[#0D9488] to-[#0284C7]',
    badgeBg: 'bg-teal-500/15 text-teal-700',
  },
  {
    id: 'para-profundizar',
    num: '6',
    label: 'Para profundizar',
    activeGradient: 'from-[#4F46E5] to-[#7C3AED]',
    badgeBg: 'bg-indigo-500/15 text-indigo-700',
  },
];

export const SIMULATION_MODES: { id: SimulationMode; label: string }[] = [
  { id: 'molecular', label: 'Red Molecular' },
  { id: 'laminar', label: 'Flujo Laminar' },
  { id: 'difusion', label: 'Ondas de Difusión' },
];

interface HeaderProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  simulationMode: SimulationMode;
  onChangeSimulation: (mode: SimulationMode) => void;
  cleanView: boolean;
  onToggleCleanView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  simulationMode,
  onChangeSimulation,
  cleanView,
  onToggleCleanView,
}) => {
  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        cleanView ? 'bg-transparent border-transparent pointer-events-none' : 'bio-glass-header'
      }`}
    >
      {/* Franja superior de espectro científico */}
      {!cleanView && <div className="science-prism-bar h-1 w-full" aria-hidden="true" />}

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Fila superior: marca + selector de simulación + Vista Limpia */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          <button
            type="button"
            onClick={() => onSelectTab('portada')}
            className={`flex items-center gap-2.5 text-left transition-opacity duration-300 ${
              cleanView ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
            }`}
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0284C7] via-[#059669] to-[#7C3AED] text-white shadow-sm">
              <Atom className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0284C7]">
                Ciencias Naturales
              </span>
              <p className="font-display text-sm font-extrabold tracking-tight text-[#14261E] sm:text-base">
                Reformulación Propuesta Educativa
              </p>
            </div>
          </button>

          <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
            {/* Selector discreto tipo píldora para las 3 simulaciones */}
            <div
              role="group"
              aria-label="Simulación de fondo interactivo"
              className="bio-glass-subtle flex items-center gap-1 rounded-full p-1"
            >
              <Sparkles
                className="ml-2 mr-0.5 hidden h-3.5 w-3.5 text-[#7C3AED] sm:block"
                aria-hidden="true"
              />
              {SIMULATION_MODES.map((sim) => {
                const isActive = simulationMode === sim.id;
                return (
                  <button
                    key={sim.id}
                    type="button"
                    onClick={() => onChangeSimulation(sim.id)}
                    aria-pressed={isActive}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0284C7] via-[#059669] to-[#7C3AED] text-white shadow-sm'
                        : 'text-[#335144] hover:bg-sky-500/10 hover:text-[#14261E]'
                    }`}
                  >
                    {sim.label}
                  </button>
                );
              })}
            </div>

            {/* Botón Vista Limpia */}
            <button
              type="button"
              onClick={onToggleCleanView}
              aria-pressed={cleanView}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                cleanView
                  ? 'border-[#0284C7] bg-gradient-to-r from-[#0284C7] to-[#7C3AED] text-white shadow-md'
                  : 'border-sky-500/25 bg-white/80 text-[#14261E] hover:border-sky-500/50 hover:bg-sky-50/80'
              }`}
            >
              {cleanView ? (
                <>
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Volver al contenido</span>
                </>
              ) : (
                <>
                  <EyeOff className="h-3.5 w-3.5 text-[#0284C7]" aria-hidden="true" />
                  <span>Vista Limpia</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Barra de pestañas con identidad de color científica por sección */}
        <nav
          aria-label="Pestañas de la propuesta educativa"
          role="tablist"
          className={`-mb-px flex items-center gap-1.5 overflow-x-auto pb-2.5 pt-0.5 transition-opacity duration-300 ${
            cleanView ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => onSelectTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap shrink-0 sm:text-sm ${
                  isActive
                    ? `bg-gradient-to-r ${tab.activeGradient} text-white shadow-[0_6px_16px_rgba(15,23,42,0.14)]`
                    : 'border border-slate-300/60 bg-white/65 text-[#335144] hover:border-sky-400/50 hover:bg-white/90 hover:text-[#14261E]'
                }`}
              >
                {tab.id === 'portada' ? (
                  <Home
                    className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-[#0284C7]'}`}
                    aria-hidden="true"
                  />
                ) : (
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center rounded-md font-mono text-[11px] font-bold ${
                      isActive ? 'bg-white/25 text-white' : tab.badgeBg
                    }`}
                  >
                    {tab.num}
                  </span>
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
