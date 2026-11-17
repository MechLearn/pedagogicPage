import React from 'react';
import { Maximize2, ShieldAlert } from 'lucide-react';
import {
  ATTITUDINAL_CRITERIA,
  FAULT_RANGE_OPTIONS,
  GRADING_INFOGRAPHIC,
  PARTICIPATION_APORTES_OPTIONS,
} from '../data/pedagogicalData';

interface GradingRulesSectionProps {
  onOpenImage: (img: { src: string; title: string; alt: string }) => void;
}

const ATTITUDINAL_CARD_COLORS = [
  'border-sky-200/90 bg-gradient-to-br from-sky-50/50 to-white/55',
  'border-emerald-200/90 bg-gradient-to-br from-emerald-50/50 to-white/55',
  'border-amber-200/90 bg-gradient-to-br from-amber-50/50 to-white/55',
  'border-violet-200/90 bg-gradient-to-br from-violet-50/50 to-white/55',
  'border-teal-200/90 bg-gradient-to-br from-teal-50/50 to-white/55',
];

export const GradingRulesSection: React.FC<GradingRulesSectionProps> = ({ onOpenImage }) => {
  return (
    <section id="como-se-califica" className="py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bio-glass relative space-y-7 overflow-hidden rounded-3xl p-6 sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" aria-hidden="true" />

          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold text-amber-700">
              4. Cómo se califica
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#14261E] sm:text-3xl">
              Sistema de evaluación 60 / 30 / 10 y reglas del período
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#335144] sm:text-base">
              La nota del período sobre escala de <strong>0,0 a 5,0</strong> se compone de tres
              partes: competencias académicas (60%), evaluación del aprendizaje (30%) y componente
              actitudinal (10%).
            </p>
          </div>

          {/* Resumen 60 / 30 / 10 con colores científicos */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative overflow-hidden rounded-2xl border border-sky-300/75 bg-gradient-to-br from-sky-50/48 to-white/42 p-5 shadow-sm backdrop-blur-[8px]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 to-cyan-500" aria-hidden="true" />
              <span className="font-mono text-2xl font-bold text-sky-700 tabular-nums">60%</span>
              <h3 className="font-display mt-1 text-base font-bold text-[#14261E]">
                Competencias (3 estándares)
              </h3>
              <p className="mt-1.5 text-sm text-[#335144]">
                <strong>Indagación (20%)</strong>, <strong>Explicación (20%)</strong> y{' '}
                <strong>Aplicación (20%)</strong>. Si en un bloque hay varias clases del mismo tipo,
                sus notas se promedian antes de aplicar el peso.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-violet-300/75 bg-gradient-to-br from-violet-50/48 to-white/42 p-5 shadow-sm backdrop-blur-[8px]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500" aria-hidden="true" />
              <span className="font-mono text-2xl font-bold text-violet-700 tabular-nums">
                30%
              </span>
              <h3 className="font-display mt-1 text-base font-bold text-[#14261E]">
                Evaluación del aprendizaje
              </h3>
              <p className="mt-1.5 text-sm text-[#335144]">
                Prueba individual al final del período con un número parecido de preguntas de cada
                competencia y resultado desglosado.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-amber-300/75 bg-gradient-to-br from-amber-50/48 to-white/42 p-5 shadow-sm backdrop-blur-[8px]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" aria-hidden="true" />
              <span className="font-mono text-2xl font-bold text-amber-700 tabular-nums">
                10%
              </span>
              <h3 className="font-display mt-1 text-base font-bold text-[#14261E]">
                Actitudinal
              </h3>
              <p className="mt-1.5 text-sm text-[#335144]">
                Cinco componentes de igual peso (<strong>2% cada uno</strong> de la nota del
                período), valorados por rangos de faltas y aportes.
              </p>
            </div>
          </div>

          {/* Tabla de pesos por competencia (50 / 10 / 20 / 20) */}
          <div className="bio-glass-subtle rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-[#14261E]">
              Tabla de pesos por competencia (50 / 10 / 20 / 20)
            </h3>
            <p className="mt-1 text-sm text-[#335144]">
              Dentro de cada bloque, la clase con la que la competencia encaja de forma natural
              pesa la mitad (50%). La Puesta en común se califica con lo que el estudiante produce
              en ella (ticket de salida o corrección de su trabajo).
            </p>

            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200/80 bg-white/60 p-2">
              <table className="w-full min-w-[580px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 font-mono text-xs font-semibold text-[#475E53]">
                    <th className="py-2.5 pl-3 pr-4">Tipo de clase</th>
                    <th className="px-3 py-2.5 text-sky-700">Indagación (20%)</th>
                    <th className="px-3 py-2.5 text-emerald-700">Explicación (20%)</th>
                    <th className="px-3 py-2.5 text-amber-800">Aplicación (20%)</th>
                    <th className="px-3 py-2.5 text-violet-700">Total en el período</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <tr>
                    <td className="py-3 pl-3 pr-4 font-semibold text-[#14261E]">Laboratorio</td>
                    <td className="px-3 py-3 font-mono font-bold text-sky-700 tabular-nums">
                      50% (10% final)
                    </td>
                    <td className="px-3 py-3 font-mono text-[#335144] tabular-nums">20% (4%)</td>
                    <td className="px-3 py-3 font-mono text-[#335144] tabular-nums">20% (4%)</td>
                    <td className="px-3 py-3 font-mono font-semibold text-violet-800 tabular-nums">
                      18%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pl-3 pr-4 font-semibold text-[#14261E]">
                      Trabajo personal
                    </td>
                    <td className="px-3 py-3 font-mono text-[#335144] tabular-nums">20% (4%)</td>
                    <td className="px-3 py-3 font-mono font-bold text-emerald-700 tabular-nums">
                      50% (10% final)
                    </td>
                    <td className="px-3 py-3 font-mono text-[#335144] tabular-nums">20% (4%)</td>
                    <td className="px-3 py-3 font-mono font-semibold text-violet-800 tabular-nums">
                      18%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pl-3 pr-4 font-semibold text-[#14261E]">Trabajo grupal</td>
                    <td className="px-3 py-3 font-mono text-[#335144] tabular-nums">20% (4%)</td>
                    <td className="px-3 py-3 font-mono text-[#335144] tabular-nums">20% (4%)</td>
                    <td className="px-3 py-3 font-mono font-bold text-amber-800 tabular-nums">
                      50% (10% final)
                    </td>
                    <td className="px-3 py-3 font-mono font-semibold text-violet-800 tabular-nums">
                      18%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pl-3 pr-4 font-semibold text-[#14261E]">
                      Puesta en común
                    </td>
                    <td className="px-3 py-3 font-mono text-[#335144] tabular-nums">10% (2%)</td>
                    <td className="px-3 py-3 font-mono text-[#335144] tabular-nums">10% (2%)</td>
                    <td className="px-3 py-3 font-mono text-[#335144] tabular-nums">10% (2%)</td>
                    <td className="px-3 py-3 font-mono font-semibold text-violet-800 tabular-nums">
                      6%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Inasistencia sin excusa y bata de laboratorio */}
          <div className="bio-glass-subtle rounded-2xl border-amber-300/70 p-6">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
              <div>
                <h3 className="font-display text-lg font-bold text-[#14261E]">
                  Inasistencia sin excusa y bata de laboratorio
                </h3>
                <p className="mt-1 text-sm text-[#335144]">
                  La clase principal de cada bloque (50%) pierde parte de su peso en dos casos. El
                  porcentaje que se pierde <strong>no se reparte</strong> entre las otras clases: el
                  estudiante simplemente deja de tenerlo (y si falta sin excusa, presenta la
                  actividad después con el peso reducido).
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50/55 to-white/55 p-4">
                <p className="font-display text-sm font-bold text-amber-950">
                  No trae bata al laboratorio
                </p>
                <p className="mt-1 text-sm text-[#335144]">
                  Laboratorio (Indagación) pasa de{' '}
                  <strong className="font-mono text-amber-800">50% a 40%</strong> (pierde 10%).
                </p>
              </div>
              <div className="rounded-xl border border-rose-200 bg-gradient-to-br from-rose-50/55 to-white/55 p-4">
                <p className="font-display text-sm font-bold text-rose-950">
                  Falta sin excusa válida a clase principal
                </p>
                <p className="mt-1 text-sm text-[#335144]">
                  La clase principal del bloque afectado (Laboratorio, Trabajo personal o Trabajo
                  grupal) pasa de <strong className="font-mono text-rose-800">50% a 30%</strong>{' '}
                  (pierde 20%).
                </p>
              </div>
            </div>
          </div>

          {/* Componente Actitudinal: 5 componentes y rangos exactos del consolidado */}
          <div className="bio-glass-subtle rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-[#14261E]">
              Actitudinal (10%): los 5 componentes y sus rangos
            </h3>
            <p className="mt-1 text-sm text-[#335144]">
              Cada componente vale 20% del actitudinal (<strong>2% de la nota del período</strong>
              ). Las faltas con excusa válida no se cuentan. La nota actitudinal es el promedio de
              los cinco componentes.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {ATTITUDINAL_CRITERIA.map((item, idx) => (
                <div
                  key={item.id}
                  className={`rounded-xl border p-4 ${
                    ATTITUDINAL_CARD_COLORS[idx % ATTITUDINAL_CARD_COLORS.length]
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold text-[#14261E]">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#059669]">
                      {item.weightPercent}%
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#335144]">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-rose-300/75 bg-gradient-to-br from-rose-50/55 to-white/55 p-4">
                <p className="font-display text-sm font-bold text-rose-950">
                  Responsabilidad, Compromiso, Normatividad y Puntualidad
                </p>
                <p className="mt-1 text-xs leading-relaxed text-rose-950/90 sm:text-sm">
                  Se califican por el número de faltas registradas en el período. Con{' '}
                  <strong>3 faltas o más</strong> el estudiante pierde ese componente y queda con{' '}
                  <strong>0,0</strong> en él:
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5 font-mono text-[11px] text-rose-950">
                  {FAULT_RANGE_OPTIONS.map((opt) => (
                    <span
                      key={opt.faltas}
                      className="rounded-lg border border-rose-300/80 bg-white/75 px-2 py-0.5"
                    >
                      {opt.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-emerald-300/75 bg-gradient-to-br from-emerald-50/55 to-white/55 p-4">
                <p className="font-display text-sm font-bold text-emerald-950">
                  Participación (funciona al revés: por aportes)
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#335144] sm:text-sm">
                  Se cuentan los aportes, no las faltas. Con <strong>3 aportes o más</strong> tiene
                  la nota completa (5,0), y si no participa nunca queda con <strong>1,0</strong>:
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5 font-mono text-[11px] text-[#14261E]">
                  {PARTICIPATION_APORTES_OPTIONS.map((opt) => (
                    <span
                      key={opt.aportes}
                      className="rounded-lg border border-emerald-300/80 bg-white/90 px-2 py-0.5"
                    >
                      {opt.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Infografía del sistema de calificación */}
          <div className="bio-glass-subtle rounded-2xl p-4 sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-display text-sm font-bold text-[#14261E]">
                  {GRADING_INFOGRAPHIC.title}
                </p>
                <p className="text-xs text-[#475E53]">
                  Haz clic sobre la infografía para verla ampliada.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenImage(GRADING_INFOGRAPHIC)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-950 transition-colors hover:border-amber-500 hover:bg-amber-50"
              >
                <Maximize2 className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                <span>Ampliar infografía</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => onOpenImage(GRADING_INFOGRAPHIC)}
              className="block w-full overflow-hidden rounded-xl border border-amber-200/80 bg-white text-left transition-opacity hover:opacity-95"
            >
              <img
                src={GRADING_INFOGRAPHIC.src}
                alt={GRADING_INFOGRAPHIC.alt}
                className="h-auto w-full object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
