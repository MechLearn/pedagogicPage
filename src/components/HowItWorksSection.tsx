import React from 'react';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { OVERVIEW_INFOGRAPHIC, PERIOD_BLOCKS } from '../data/pedagogicalData';

interface HowItWorksSectionProps {
  onOpenImage: (img: { src: string; title: string; alt: string }) => void;
}

const blockStyles: Record<
  'sky' | 'emerald' | 'amber',
  {
    topBar: string;
    stepColor: string;
    border: string;
    cardBg: string;
    mainTag: string;
  }
> = {
  sky: {
    topBar: 'from-sky-500 to-cyan-500',
    stepColor: 'text-sky-700',
    border: 'border-sky-300/70',
    cardBg: 'bg-gradient-to-br from-sky-50/48 via-white/40 to-cyan-50/42',
    mainTag: 'bg-sky-100/65 text-sky-950 border-sky-300',
  },
  emerald: {
    topBar: 'from-emerald-500 to-teal-500',
    stepColor: 'text-emerald-700',
    border: 'border-emerald-300/70',
    cardBg: 'bg-gradient-to-br from-emerald-50/48 via-white/40 to-teal-50/42',
    mainTag: 'bg-emerald-100/65 text-emerald-950 border-emerald-300',
  },
  amber: {
    topBar: 'from-amber-500 to-orange-500',
    stepColor: 'text-amber-800',
    border: 'border-amber-300/70',
    cardBg: 'bg-gradient-to-br from-amber-50/48 via-white/40 to-orange-50/42',
    mainTag: 'bg-amber-100/65 text-amber-950 border-amber-300',
  },
};

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenImage }) => {
  return (
    <section id="como-funciona" className="py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bio-glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-sky-500 via-emerald-500 to-amber-500" aria-hidden="true" />

          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold text-sky-700">
              1. Cómo funciona · Ciencias Naturales
            </p>
            <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-[#14261E] sm:text-4xl">
              Reformulación Propuesta Educativa: Ciencias Naturales
            </h1>
            <p className="mt-3.5 text-base leading-relaxed text-[#335144]">
              El período escolar se organiza en <strong>3 bloques sucesivos</strong> (Indagación →
              Explicación → Aplicación). En cada bloque se realiza{' '}
              <strong>al menos una clase de cada tipo</strong> (Laboratorio, Puesta en común,
              Trabajo personal y Trabajo grupal) y se cierra el período con la{' '}
              <strong>Clase de Evaluación del Aprendizaje</strong>.
            </p>
          </div>

          {/* 3 Bloques sucesivos con color por bloque */}
          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
            {PERIOD_BLOCKS.map((block, index) => {
              const st = blockStyles[block.accent];
              return (
                <div
                  key={block.name}
                  className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border ${st.border} ${st.cardBg} p-5 shadow-sm backdrop-blur-[8px]`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${st.topBar}`}
                    aria-hidden="true"
                  />
                  <div className="pt-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-mono text-xs font-bold ${st.stepColor}`}>
                        {block.step}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#475E53]">
                        {block.weight}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <h2 className="font-display text-xl font-bold text-[#14261E]">
                        {block.name}
                      </h2>
                      {index < 2 && (
                        <ArrowRight
                          className={`hidden h-4 w-4 ${st.stepColor} opacity-60 md:inline-block`}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-[#335144]">{block.summary}</p>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-slate-200/70 pt-3.5 text-xs">
                    <div className={`rounded-xl border px-3 py-2 font-semibold ${st.mainTag}`}>
                      Clase principal: {block.mainClass}
                    </div>
                    <p className="leading-relaxed text-[#475E53]">{block.otherClasses}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cierre del período */}
          <div className="mt-5 rounded-2xl border border-violet-300/70 bg-gradient-to-r from-violet-50/55 via-white/45 to-indigo-50/50 px-5 py-4 shadow-sm backdrop-blur-[8px]">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-sm font-bold text-violet-950">
                  Al cierre del período: Clase de Evaluación del Aprendizaje (30%)
                </p>
                <p className="mt-0.5 text-xs text-[#335144] sm:text-sm">
                  Prueba individual aplicada al finalizar el ciclo que evalúa en contexto las tres
                  competencias trabajadas durante los tres bloques.
                </p>
              </div>
              <span className="rounded-lg border border-violet-300 bg-white/80 px-3 py-1 font-mono text-xs font-bold text-violet-700 whitespace-nowrap shrink-0">
                Cierre individual · 30%
              </span>
            </div>
          </div>

          {/* Infografía panorámica */}
          <div className="bio-glass-subtle mt-6 rounded-2xl p-4 sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-display text-sm font-bold text-[#14261E]">
                  {OVERVIEW_INFOGRAPHIC.title}
                </p>
                <p className="text-xs text-[#475E53]">
                  Haz clic sobre la infografía para verla ampliada.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenImage(OVERVIEW_INFOGRAPHIC)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-sky-300 bg-white px-3 py-1.5 text-xs font-semibold text-sky-900 transition-colors hover:border-sky-500 hover:bg-sky-50"
              >
                <Maximize2 className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" />
                <span>Ampliar infografía</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => onOpenImage(OVERVIEW_INFOGRAPHIC)}
              className="block w-full overflow-hidden rounded-xl border border-sky-200/80 bg-white/95 text-left transition-opacity hover:opacity-95"
            >
              <img
                src={OVERVIEW_INFOGRAPHIC.src}
                alt={OVERVIEW_INFOGRAPHIC.alt}
                className="h-auto w-full object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
