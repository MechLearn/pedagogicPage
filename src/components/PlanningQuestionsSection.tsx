import React from 'react';
import { PLANNING_QUESTIONS } from '../data/pedagogicalData';

const QUESTION_STYLES = [
  {
    topBar: 'from-sky-500 to-cyan-500',
    badge: 'bg-sky-100/75 text-sky-800 border-sky-200',
    border: 'border-sky-300/60 bg-gradient-to-br from-sky-50/45 to-white/42',
  },
  {
    topBar: 'from-violet-500 to-indigo-500',
    badge: 'bg-violet-100/75 text-violet-800 border-violet-200',
    border: 'border-violet-300/60 bg-gradient-to-br from-violet-50/45 to-white/42',
  },
  {
    topBar: 'from-emerald-500 to-teal-500',
    badge: 'bg-emerald-100/75 text-emerald-800 border-emerald-200',
    border: 'border-emerald-300/60 bg-gradient-to-br from-emerald-50/45 to-white/42',
  },
];

export const PlanningQuestionsSection: React.FC = () => {
  return (
    <section id="antes-de-planear" className="py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bio-glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-500" aria-hidden="true" />

          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold text-violet-700">
              2. Antes de planear
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#14261E] sm:text-3xl">
              Las 3 preguntas para planear cualquier clase
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#335144] sm:text-base">
              Estas tres preguntas orientan la planeación docente antes de preparar la sesión.{' '}
              <strong>No corresponden a una competencia en particular</strong>: sirven para planear
              cualquier clase de Laboratorio, Puesta en común, Trabajo personal, Trabajo grupal o
              Evaluación.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
            {PLANNING_QUESTIONS.map((item, idx) => {
              const st = QUESTION_STYLES[idx % QUESTION_STYLES.length];
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-sm backdrop-blur-[8px] transition-transform duration-200 hover:-translate-y-0.5 ${st.border}`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${st.topBar}`}
                    aria-hidden="true"
                  />
                  <div className="pt-1">
                    <span
                      className={`inline-flex rounded-lg border px-2.5 py-1 font-mono text-xs font-bold ${st.badge}`}
                    >
                      Pregunta 0{item.id}
                    </span>
                    <h3 className="font-display mt-3 text-lg font-bold leading-snug text-[#14261E]">
                      {item.question}
                    </h3>
                  </div>
                  <p className="mt-4 border-t border-slate-200/70 pt-3.5 text-sm leading-relaxed text-[#335144]">
                    {item.purpose}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
