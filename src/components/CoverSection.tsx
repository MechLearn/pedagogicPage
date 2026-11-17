import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Compass,
  FlaskConical,
  HelpCircle,
  Scale,
  Maximize2,
  Atom,
  Dna,
  Zap,
} from 'lucide-react';
import { OVERVIEW_INFOGRAPHIC } from '../data/pedagogicalData';
import type { TabId } from './Header';

interface CoverSectionProps {
  onSelectTab: (tab: TabId) => void;
  onOpenImage: (img: { src: string; title: string; alt: string }) => void;
}

const COVER_ROUTES: {
  tab: TabId;
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accentBar: string;
  iconBg: string;
  numColor: string;
  linkColor: string;
  cardHover: string;
}[] = [
  {
    tab: 'como-funciona',
    num: '01',
    title: 'Cómo funciona',
    description:
      'El período en 3 bloques (Indagación → Explicación → Aplicación), con al menos una clase de cada tipo y Evaluación al cierre.',
    icon: <Compass className="h-5 w-5 text-sky-600" aria-hidden="true" />,
    accentBar: 'from-sky-500 to-cyan-500',
    iconBg: 'border-sky-200 bg-sky-50',
    numColor: 'text-sky-700',
    linkColor: 'text-sky-700',
    cardHover: 'hover:border-sky-400/60',
  },
  {
    tab: 'antes-de-planear',
    num: '02',
    title: 'Antes de planear',
    description:
      'Las 3 preguntas transversales para preparar cualquier clase de Ciencias Naturales.',
    icon: <HelpCircle className="h-5 w-5 text-violet-600" aria-hidden="true" />,
    accentBar: 'from-violet-500 to-indigo-500',
    iconBg: 'border-violet-200 bg-violet-50',
    numColor: 'text-violet-700',
    linkColor: 'text-violet-700',
    cardHover: 'hover:border-violet-400/60',
  },
  {
    tab: 'las-5-clases',
    num: '03',
    title: 'Las 5 clases',
    description:
      'Laboratorio, Puesta en común, Trabajo personal, Trabajo grupal y Evaluación con su estructura e infografía.',
    icon: <FlaskConical className="h-5 w-5 text-emerald-600" aria-hidden="true" />,
    accentBar: 'from-emerald-500 to-teal-500',
    iconBg: 'border-emerald-200 bg-emerald-50',
    numColor: 'text-emerald-700',
    linkColor: 'text-emerald-700',
    cardHover: 'hover:border-emerald-400/60',
  },
  {
    tab: 'como-se-califica',
    num: '04',
    title: 'Cómo se califica',
    description:
      'Reglas 60 / 30 / 10, pesos 50 / 10 / 20 / 20, bata, inasistencia sin excusa y los 5 criterios actitudinales.',
    icon: <Scale className="h-5 w-5 text-amber-600" aria-hidden="true" />,
    accentBar: 'from-amber-500 to-orange-500',
    iconBg: 'border-amber-200 bg-amber-50',
    numColor: 'text-amber-700',
    linkColor: 'text-amber-700',
    cardHover: 'hover:border-amber-400/60',
  },
  {
    tab: 'calculadora',
    num: '05',
    title: 'Calculadora de nota',
    description:
      'Simulador en tiempo real con penalizaciones de peso, aportes de participación y regla de 3 faltas.',
    icon: <Calculator className="h-5 w-5 text-teal-600" aria-hidden="true" />,
    accentBar: 'from-teal-500 to-sky-500',
    iconBg: 'border-teal-200 bg-teal-50',
    numColor: 'text-teal-700',
    linkColor: 'text-teal-700',
    cardHover: 'hover:border-teal-400/60',
  },
  {
    tab: 'para-profundizar',
    num: '06',
    title: 'Para profundizar',
    description:
      'Resumen del aprendizaje por refracción y consulta directa de los tres respaldos teóricos en PDF.',
    icon: <BookOpen className="h-5 w-5 text-indigo-600" aria-hidden="true" />,
    accentBar: 'from-indigo-500 to-violet-500',
    iconBg: 'border-indigo-200 bg-indigo-50',
    numColor: 'text-indigo-700',
    linkColor: 'text-indigo-700',
    cardHover: 'hover:border-indigo-400/60',
  },
];

export const CoverSection: React.FC<CoverSectionProps> = ({ onSelectTab, onOpenImage }) => {
  return (
    <section id="portada" className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
        {/* Hero principal con transparencia sutil para ver el fondo interactivo */}
        <div className="relative overflow-hidden rounded-3xl border border-sky-400/35 bg-white/35 p-7 shadow-[0_14px_36px_rgba(15,23,42,0.06)] backdrop-blur-[8px] sm:p-10">
          <div className="science-prism-bar absolute inset-x-0 top-0 h-1.5 opacity-95" aria-hidden="true" />

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200/80 bg-sky-50/80 px-2.5 py-1 text-sky-900">
                  <Atom className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" />
                  Física
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200/80 bg-violet-50/80 px-2.5 py-1 text-violet-900">
                  <FlaskConical className="h-3.5 w-3.5 text-violet-600" aria-hidden="true" />
                  Química
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200/80 bg-emerald-50/80 px-2.5 py-1 text-emerald-900">
                  <Dna className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                  Biología
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200/80 bg-amber-50/80 px-2.5 py-1 text-amber-900">
                  <Zap className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                  Entorno
                </span>
              </div>

              <h1 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-[#0F1F18] sm:text-5xl sm:leading-[1.1]">
                Reformulación Propuesta Educativa: Ciencias Naturales
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#243D32] sm:text-lg">
                Consulta en un solo lugar cómo se organiza el período en tres bloques, cómo se
                desarrollan las cinco clases y cómo se calcula la nota final sobre escala de 0,0 a
                5,0.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectTab('como-funciona')}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#059669] to-[#0D9488] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(2,132,199,0.25)] transition-opacity hover:opacity-95"
                >
                  <span>Explorar cómo funciona</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTab('calculadora')}
                  className="inline-flex items-center gap-2 rounded-xl border border-violet-300 bg-white/75 px-5 py-3 text-sm font-semibold text-violet-900 transition-colors hover:border-violet-500 hover:bg-violet-50/90"
                >
                  <Calculator className="h-4 w-4 text-violet-600" aria-hidden="true" />
                  <span>Ir a la calculadora</span>
                </button>
              </div>
            </div>

            {/* Resumen visual colorido 60 / 30 / 10 + acceso a infografía general */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/65 bg-white/42 p-5 shadow-sm backdrop-blur-[6px]">
                <p className="font-mono text-xs font-semibold text-[#0284C7]">
                  Síntesis del período
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2.5 text-center">
                  <div className="rounded-xl border border-sky-200/80 bg-sky-50/50 p-3">
                    <span className="font-mono text-xl font-bold text-sky-700">60%</span>
                    <p className="mt-0.5 text-[11px] font-semibold text-[#14261E]">
                      3 Bloques
                    </p>
                  </div>
                  <div className="rounded-xl border border-violet-200/80 bg-violet-50/50 p-3">
                    <span className="font-mono text-xl font-bold text-violet-700">30%</span>
                    <p className="mt-0.5 text-[11px] font-semibold text-[#14261E]">
                      Evaluación
                    </p>
                  </div>
                  <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-3">
                    <span className="font-mono text-xl font-bold text-amber-700">10%</span>
                    <p className="mt-0.5 text-[11px] font-semibold text-[#14261E]">
                      Actitudinal
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenImage(OVERVIEW_INFOGRAPHIC)}
                  className="mt-4 flex w-full items-center justify-between gap-3 rounded-xl border border-emerald-300/70 bg-gradient-to-r from-emerald-50/55 via-sky-50/50 to-violet-50/50 px-4 py-3 text-left transition-colors hover:border-emerald-500"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-[#14261E]">
                      Ver mapa panorámico general
                    </p>
                    <p className="text-[11px] text-[#335144]">
                      Infografía de bloques, clases y calificación
                    </p>
                  </div>
                  <Maximize2 className="h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accesos directos con color científico propio por sección */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COVER_ROUTES.map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => onSelectTab(item.tab)}
              className={`bio-glass group relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5 ${item.cardHover}`}
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accentBar}`}
                aria-hidden="true"
              />
              <div>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${item.iconBg}`}
                  >
                    {item.icon}
                  </div>
                  <span className={`font-mono text-xs font-bold ${item.numColor}`}>
                    Sección {item.num}
                  </span>
                </div>
                <h2 className="font-display mt-4 text-lg font-bold text-[#14261E] group-hover:text-sky-800">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-[#335144]">
                  {item.description}
                </p>
              </div>

              <div className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold ${item.linkColor}`}>
                <span>Abrir pestaña</span>
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
