import React, { useState } from 'react';
import { Check, X, Maximize2, Layers } from 'lucide-react';
import { ClassCardData, ClassKey, FIVE_CLASSES } from '../data/pedagogicalData';
import { YesNoGraphic } from './YesNoGraphics';

interface FiveClassesSectionProps {
  onOpenImage: (img: { src: string; title: string; alt: string }) => void;
}

const classThemeById: Record<
  ClassKey,
  {
    tabActive: string;
    topBar: string;
    numberColor: string;
    weightBox: string;
    momentBorder: string;
    momentNum: string;
    closingBox: string;
  }
> = {
  laboratorio: {
    tabActive: 'from-sky-600 to-cyan-600',
    topBar: 'from-sky-500 to-cyan-500',
    numberColor: 'text-sky-700',
    weightBox: 'border-sky-300 bg-sky-50/70 text-sky-950',
    momentBorder: 'border-sky-200/90',
    momentNum: 'text-sky-700',
    closingBox: 'border-sky-300/70 bg-gradient-to-r from-sky-50/50 to-cyan-50/42',
  },
  puestaEnComun: {
    tabActive: 'from-violet-600 to-indigo-600',
    topBar: 'from-violet-500 to-indigo-500',
    numberColor: 'text-violet-700',
    weightBox: 'border-violet-300 bg-violet-50/70 text-violet-950',
    momentBorder: 'border-violet-200/90',
    momentNum: 'text-violet-700',
    closingBox: 'border-violet-300/70 bg-gradient-to-r from-violet-50/50 to-indigo-50/42',
  },
  trabajoPersonal: {
    tabActive: 'from-emerald-600 to-teal-600',
    topBar: 'from-emerald-500 to-teal-500',
    numberColor: 'text-emerald-700',
    weightBox: 'border-emerald-300 bg-emerald-50/70 text-emerald-950',
    momentBorder: 'border-emerald-200/90',
    momentNum: 'text-emerald-700',
    closingBox: 'border-emerald-300/70 bg-gradient-to-r from-emerald-50/50 to-teal-50/42',
  },
  trabajoGrupal: {
    tabActive: 'from-amber-600 to-orange-600',
    topBar: 'from-amber-500 to-orange-500',
    numberColor: 'text-amber-800',
    weightBox: 'border-amber-300 bg-amber-50/70 text-amber-950',
    momentBorder: 'border-amber-200/90',
    momentNum: 'text-amber-800',
    closingBox: 'border-amber-300/70 bg-gradient-to-r from-amber-50/50 to-orange-50/42',
  },
  evaluacion: {
    tabActive: 'from-indigo-600 to-purple-600',
    topBar: 'from-indigo-500 to-purple-500',
    numberColor: 'text-indigo-700',
    weightBox: 'border-indigo-300 bg-indigo-50/70 text-indigo-950',
    momentBorder: 'border-indigo-200/90',
    momentNum: 'text-indigo-700',
    closingBox: 'border-indigo-300/70 bg-gradient-to-r from-indigo-50/50 to-purple-50/42',
  },
};

export const FiveClassesSection: React.FC<FiveClassesSectionProps> = ({ onOpenImage }) => {
  const [selectedClass, setSelectedClass] = useState<ClassKey | 'all'>('laboratorio');

  const visibleClasses: ClassCardData[] =
    selectedClass === 'all' ? FIVE_CLASSES : FIVE_CLASSES.filter((c) => c.id === selectedClass);

  return (
    <section id="las-5-clases" className="py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bio-glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div className="science-prism-bar absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold text-emerald-700">3. Las 5 clases</p>
              <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#14261E] sm:text-3xl">
                Cómo es y cómo se desarrolla cada tipo de clase
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[#335144] sm:text-base">
                Cada tipo de clase se define por <strong>lo que hace el estudiante</strong>, no por
                el lugar ni por los materiales. Toda clase tiene apertura, desarrollo y cierre, y
                ninguna termina sin algo escrito que se recoja.
              </p>
            </div>
          </div>

          {/* Sub-pestañas coloridas por tipo de clase */}
          <div
            role="tablist"
            aria-label="Seleccionar tipo de clase"
            className="mt-6 flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-4"
          >
            {FIVE_CLASSES.map((cls) => {
              const isActive = selectedClass === cls.id;
              const theme = classThemeById[cls.id];
              return (
                <button
                  key={cls.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setSelectedClass(cls.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? `bg-gradient-to-r ${theme.tabActive} text-white shadow-sm`
                      : 'border border-slate-200/90 bg-white/80 text-[#335144] hover:border-sky-300 hover:bg-white hover:text-[#14261E]'
                  }`}
                >
                  <span className="font-mono text-[11px] opacity-85">
                    {cls.number.replace('Clase ', '')}
                  </span>
                  <span>{cls.title.replace('Clase de ', '')}</span>
                </button>
              );
            })}

            <button
              role="tab"
              type="button"
              aria-selected={selectedClass === 'all'}
              onClick={() => setSelectedClass('all')}
              className={`ml-auto inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                selectedClass === 'all'
                  ? 'bg-[#14261E] text-white shadow-sm'
                  : 'border border-slate-200/90 bg-white/80 text-[#335144] hover:border-sky-300 hover:bg-white hover:text-[#14261E]'
              }`}
            >
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Ver todas (5)</span>
            </button>
          </div>

          <div className="mt-7 space-y-8">
            {visibleClasses.map((cls) => {
              const theme = classThemeById[cls.id];

              return (
                <article
                  key={cls.id}
                  className="bio-glass-subtle relative overflow-hidden rounded-2xl p-5 sm:p-7"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.topBar}`}
                    aria-hidden="true"
                  />

                  {/* Encabezado de la clase */}
                  <div className="flex flex-col justify-between gap-3 border-b border-slate-200/80 pb-5 pt-1 sm:flex-row sm:items-start">
                    <div>
                      <span className={`font-mono text-xs font-bold ${theme.numberColor}`}>
                        {cls.number}
                      </span>
                      <h3 className="font-display mt-1 text-xl font-bold text-[#14261E] sm:text-2xl">
                        {cls.title}
                      </h3>
                    </div>
                    <div
                      className={`rounded-xl border px-3 py-1.5 font-mono text-xs font-semibold ${theme.weightBox}`}
                    >
                      {cls.weightBadge}
                    </div>
                  </div>

                  {/* En una frase */}
                  <div className="mt-5 rounded-xl border border-slate-200/80 bg-white/55 p-4 sm:p-5">
                    <p className={`font-mono text-xs font-bold ${theme.numberColor}`}>
                      En una frase
                    </p>
                    <p className="mt-1.5 text-sm font-medium leading-relaxed text-[#14261E] sm:text-base">
                      {cls.oneLine}
                    </p>
                  </div>

                  {/* Cuadro visual Sí es / No es con grafiquitos */}
                  <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-300/80 bg-gradient-to-br from-emerald-50/55 to-teal-50/45 p-4 sm:p-5">
                      <p className="font-display flex items-center gap-2 text-sm font-bold text-emerald-950">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span>Sí es</span>
                      </p>
                      <div className="mt-3.5 space-y-2.5">
                        {cls.yesItems.map((item, idx) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 rounded-xl border border-emerald-200/90 bg-white/70 p-2.5 shadow-2xs"
                          >
                            <YesNoGraphic classId={cls.id} kind="yes" index={idx} />
                            <p className="text-xs font-medium leading-snug text-[#14261E] sm:text-sm">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-rose-300/75 bg-gradient-to-br from-rose-50/55 to-orange-50/45 p-4 sm:p-5">
                      <p className="font-display flex items-center gap-2 text-sm font-bold text-rose-950">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-white">
                          <X className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span>No es</span>
                      </p>
                      <div className="mt-3.5 space-y-2.5">
                        {cls.noItems.map((item, idx) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 rounded-xl border border-rose-200/90 bg-white/70 p-2.5 shadow-2xs"
                          >
                            <YesNoGraphic classId={cls.id} kind="no" index={idx} />
                            <p className="text-xs font-medium leading-snug text-rose-950 sm:text-sm">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Momentos de la clase */}
                  <div className="mt-5">
                    <p className={`font-mono text-xs font-bold ${theme.numberColor}`}>Momentos</p>
                    <div
                      className={`mt-2.5 grid grid-cols-1 gap-3 ${
                        cls.moments.length >= 5
                          ? 'md:grid-cols-2 lg:grid-cols-5'
                          : 'md:grid-cols-2 lg:grid-cols-4'
                      }`}
                    >
                      {cls.moments.map((m) => (
                        <div
                          key={m.step}
                          className={`rounded-xl border ${theme.momentBorder} bg-white/55 p-4`}
                        >
                          <span className={`font-mono text-xs font-bold ${theme.momentNum}`}>
                            {m.step}
                          </span>
                          <h4 className="font-display mt-1 text-sm font-bold text-[#14261E]">
                            {m.title}
                          </h4>
                          <p className="mt-1.5 text-xs leading-relaxed text-[#335144]">
                            {m.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Para cerrar: El estudiante se pregunta / El estudiante hace */}
                  <div className={`mt-5 rounded-xl border p-4 sm:p-5 ${theme.closingBox}`}>
                    <p className={`font-mono text-xs font-bold ${theme.numberColor}`}>
                      Para cerrar
                    </p>
                    <div className="mt-2.5 grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div className="rounded-lg border border-white/75 bg-white/60 p-3.5">
                        <p className={`font-display text-xs font-bold ${theme.numberColor}`}>
                          El estudiante se pregunta
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#14261E] sm:text-sm">
                          {cls.closingQuestion}
                        </p>
                      </div>
                      <div className="rounded-lg border border-white/75 bg-white/60 p-3.5">
                        <p className={`font-display text-xs font-bold ${theme.numberColor}`}>
                          El estudiante hace
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#14261E] sm:text-sm">
                          {cls.closingAction}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Infografía de la clase */}
                  <div className="mt-5 rounded-xl border border-slate-200/80 bg-white/55 p-4">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <p className="font-display text-xs font-bold text-[#14261E] sm:text-sm">
                        Infografía · {cls.title}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenImage({
                            src: cls.infographicPath,
                            title: cls.title,
                            alt: cls.infographicAlt,
                          })
                        }
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#14261E] transition-colors hover:border-sky-400 hover:text-sky-700"
                      >
                        <Maximize2 className={`h-3.5 w-3.5 ${theme.numberColor}`} aria-hidden="true" />
                        <span>Ampliar imagen</span>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenImage({
                          src: cls.infographicPath,
                          title: cls.title,
                          alt: cls.infographicAlt,
                        })
                      }
                      className="block w-full overflow-hidden rounded-lg border border-slate-200/80 bg-white text-left transition-opacity hover:opacity-95"
                    >
                      <img
                        src={cls.infographicPath}
                        alt={cls.infographicAlt}
                        className="h-auto w-full object-contain"
                      />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
