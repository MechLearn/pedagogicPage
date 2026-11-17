/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BioLabCanvas, SimulationMode } from './components/BioLabCanvas';
import { Header, TabId, TABS } from './components/Header';
import { CoverSection } from './components/CoverSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PlanningQuestionsSection } from './components/PlanningQuestionsSection';
import { FiveClassesSection } from './components/FiveClassesSection';
import { GradingRulesSection } from './components/GradingRulesSection';
import { GradeCalculator } from './components/GradeCalculator';
import { DeepenAccordionSection } from './components/DeepenAccordionSection';
import { InfographicModal } from './components/InfographicModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('portada');
  const [simulationMode, setSimulationMode] = useState<SimulationMode>('molecular');
  const [cleanView, setCleanView] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<{
    src: string;
    title: string;
    alt: string;
  } | null>(null);

  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentTabIndex = TABS.findIndex((t) => t.id === activeTab);
  const prevTab = currentTabIndex > 0 ? TABS[currentTabIndex - 1] : null;
  const nextTab = currentTabIndex < TABS.length - 1 ? TABS[currentTabIndex + 1] : null;

  return (
    <div className="relative flex min-h-screen flex-col text-[#14261E]">
      {/* Fondo vivo interactivo a 60fps en modo claro Bio-Lab */}
      <BioLabCanvas mode={simulationMode} cleanView={cleanView} />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          simulationMode={simulationMode}
          onChangeSimulation={setSimulationMode}
          cleanView={cleanView}
          onToggleCleanView={() => setCleanView((prev) => !prev)}
        />

        <main
          className={`flex-1 transition-all duration-500 ${
            cleanView
              ? 'pointer-events-none translate-y-2 opacity-0'
              : 'pointer-events-auto translate-y-0 opacity-100'
          }`}
        >
          <div role="tabpanel" aria-label={TABS[currentTabIndex]?.label}>
            {activeTab === 'portada' && (
              <CoverSection onSelectTab={handleSelectTab} onOpenImage={setModalImage} />
            )}
            {activeTab === 'como-funciona' && (
              <HowItWorksSection onOpenImage={setModalImage} />
            )}
            {activeTab === 'antes-de-planear' && <PlanningQuestionsSection />}
            {activeTab === 'las-5-clases' && (
              <FiveClassesSection onOpenImage={setModalImage} />
            )}
            {activeTab === 'como-se-califica' && (
              <GradingRulesSection onOpenImage={setModalImage} />
            )}
            {activeTab === 'calculadora' && <GradeCalculator />}
            {activeTab === 'para-profundizar' && <DeepenAccordionSection />}
          </div>

          {/* Navegación rápida entre pestañas */}
          {activeTab !== 'portada' && (
            <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
              <div className="bio-glass-subtle flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3">
                {prevTab ? (
                  <button
                    type="button"
                    onClick={() => handleSelectTab(prevTab.id)}
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-white/80 px-3.5 py-2 text-xs font-semibold text-[#14261E] transition-colors hover:border-[#059669] hover:text-[#059669]"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      {prevTab.id === 'portada'
                        ? prevTab.label
                        : `${prevTab.num}. ${prevTab.label}`}
                    </span>
                  </button>
                ) : (
                  <span className="font-mono text-xs text-[#475E53]">Inicio</span>
                )}

                <span className="hidden font-mono text-xs text-[#475E53] sm:inline">
                  Sección {currentTabIndex} de {TABS.length - 1}
                </span>

                {nextTab ? (
                  <button
                    type="button"
                    onClick={() => handleSelectTab(nextTab.id)}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#059669] to-[#0D9488] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
                  >
                    <span>
                      Siguiente: {nextTab.num}. {nextTab.label}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSelectTab('portada')}
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-white/80 px-3.5 py-2 text-xs font-semibold text-[#059669] transition-colors hover:bg-emerald-50"
                  >
                    <span>Volver a la portada</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </main>

        <footer
          className={`bio-glass-header mt-auto border-t border-emerald-500/20 py-5 transition-opacity duration-500 ${
            cleanView ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 text-xs text-[#475E53] sm:flex-row sm:items-center sm:px-6">
            <p className="font-medium text-[#14261E]">
              Reformulación Propuesta Educativa · Ciencias Naturales
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectTab(tab.id)}
                  className={`transition-colors ${
                    activeTab === tab.id
                      ? 'font-bold text-[#059669]'
                      : 'hover:text-[#14261E]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </footer>
      </div>

      <InfographicModal image={modalImage} onClose={() => setModalImage(null)} />
    </div>
  );
}
