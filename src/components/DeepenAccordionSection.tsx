import React, { useState } from 'react';
import { ChevronDown, FileText, ExternalLink } from 'lucide-react';
import { THEORETICAL_BACKUPS } from '../data/pedagogicalData';

const EQUIVALENCES = [
  { book: 'Contexto (empatía)', version: '¿Qué saben y qué creen mis estudiantes?' },
  { book: 'Reflexión (implicación)', version: '¿Qué quiero que se pregunten? Es la fila «El estudiante se pregunta».' },
  { book: 'Acción (excelencia)', version: '¿Qué van a hacer con lo que aprendan? Es la fila «El estudiante hace».' },
  { book: 'Experiencia (empoderamiento)', version: 'Los momentos de cada tipo de clase.' },
  { book: 'Evaluación (competencia y entusiasmo)', version: 'La revisión que hace el docente después de cada clase o prueba.' },
  { book: 'Insight', version: 'La idea central a la que se quiere llegar en el bloque.' },
  { book: 'Evaluación auténtica', version: 'El Trabajo grupal: desafío real, destinatario real, condiciones reales.' },
];

const PDF_CARD_STYLES = [
  {
    topBar: 'from-sky-500 to-cyan-500',
    iconBg: 'border-sky-200 bg-sky-50 text-sky-600',
    link: 'text-sky-700',
    hover: 'hover:border-sky-400/60',
  },
  {
    topBar: 'from-amber-500 to-orange-500',
    iconBg: 'border-amber-200 bg-amber-50 text-amber-600',
    link: 'text-amber-700',
    hover: 'hover:border-amber-400/60',
  },
  {
    topBar: 'from-violet-500 to-indigo-500',
    iconBg: 'border-violet-200 bg-violet-50 text-violet-600',
    link: 'text-violet-700',
    hover: 'hover:border-violet-400/60',
  },
];

export const DeepenAccordionSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <section id="para-profundizar" className="py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bio-glass relative overflow-hidden rounded-3xl">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500" aria-hidden="true" />

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="contenido-para-profundizar"
            className="flex w-full items-center justify-between gap-4 px-6 pb-5 pt-6 text-left transition-colors hover:bg-violet-500/5 sm:px-8"
          >
            <div>
              <p className="font-mono text-xs font-semibold text-indigo-700">
                6. Para profundizar · Respaldos teóricos
              </p>
              <h2 className="font-display mt-1 text-xl font-bold text-[#14261E] sm:text-2xl">
                El aprendizaje por refracción y documentos de respaldo
              </h2>
            </div>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-indigo-600 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
              aria-hidden="true"
            />
          </button>

          {isOpen && (
            <div
              id="contenido-para-profundizar"
              className="space-y-6 border-t border-slate-200/80 px-6 py-6 text-sm leading-relaxed text-[#335144] sm:px-8"
            >
              <p>
                Esta versión simplifica la propuesta de Go y Atienza (
                <em>Aprender por refracción</em>, Mensajero, 2021). Las tres preguntas de
                planeación corresponden a lo que el libro llama <strong>diseño inverso</strong>:
                definir el contexto, la reflexión y la acción antes de diseñar la experiencia.
              </p>

              {/* Tabla de equivalencias del anexo del documento */}
              <div className="bio-glass-subtle overflow-x-auto rounded-2xl p-4">
                <table className="w-full min-w-[520px] border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-indigo-200/80 font-mono text-xs font-semibold text-indigo-700">
                      <th className="py-2 pr-4">Término del libro</th>
                      <th className="py-2 pl-2">En esta versión</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70">
                    {EQUIVALENCES.map((row) => (
                      <tr key={row.book}>
                        <td className="py-2.5 pr-4 font-semibold text-[#14261E]">{row.book}</td>
                        <td className="py-2.5 pl-2 text-[#335144]">{row.version}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Consultar respaldos teóricos (los 2 PDFs del colegio + el libro) */}
              <div className="space-y-3">
                <h3 className="font-display text-base font-bold text-[#14261E]">
                  Consultar respaldos teóricos (PDF)
                </h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {THEORETICAL_BACKUPS.map((doc, idx) => {
                    const st = PDF_CARD_STYLES[idx % PDF_CARD_STYLES.length];
                    return (
                      <a
                        key={doc.href}
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`bio-glass-subtle group relative flex flex-col justify-between gap-3 overflow-hidden rounded-2xl p-4 transition-all hover:-translate-y-0.5 ${st.hover}`}
                      >
                        <div
                          className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${st.topBar}`}
                          aria-hidden="true"
                        />
                        <div className="flex items-start gap-3 pt-1">
                          <div
                            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${st.iconBg}`}
                          >
                            <FileText className="h-4 w-4" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-display text-xs font-bold text-[#14261E] sm:text-sm">
                              {doc.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-[#475E53]">
                              {doc.subtitle}
                            </p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${st.link}`}>
                          <span>Abrir respaldo PDF</span>
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
