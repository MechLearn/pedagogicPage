import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RotateCcw,
  ShieldAlert,
  Calculator,
} from 'lucide-react';
import {
  ATTITUDINAL_CRITERIA,
  BlockKey,
  COMPETENCE_BLOCKS,
  FAULT_RANGE_OPTIONS,
  GradeInputs,
  PARTICIPATION_APORTES_OPTIONS,
  PRESET_SCENARIOS,
  scoreFromAportes,
  scoreFromFaults,
} from '../data/pedagogicalData';

const clampGrade = (value: number): number => {
  if (Number.isNaN(value)) return 0;
  return Math.min(5, Math.max(0, Math.round(value * 10) / 10));
};

const initialGrades: GradeInputs = structuredClone(PRESET_SCENARIOS[0].data);

const blockColorClasses: Record<
  'sky' | 'emerald' | 'amber',
  {
    headerText: string;
    sliderAccent: string;
    ringFocus: string;
    mainRowStyle: string;
  }
> = {
  sky: {
    headerText: 'text-sky-700',
    sliderAccent: 'text-sky-600 accent-sky-600',
    ringFocus: 'focus:border-sky-600 focus:ring-sky-600/20',
    mainRowStyle: 'border border-sky-300/80 bg-gradient-to-r from-sky-50/58 to-cyan-50/48',
  },
  emerald: {
    headerText: 'text-emerald-700',
    sliderAccent: 'text-emerald-600 accent-emerald-600',
    ringFocus: 'focus:border-emerald-600 focus:ring-emerald-600/20',
    mainRowStyle: 'border border-emerald-300/80 bg-gradient-to-r from-emerald-50/58 to-teal-50/48',
  },
  amber: {
    headerText: 'text-amber-800',
    sliderAccent: 'text-amber-600 accent-amber-600',
    ringFocus: 'focus:border-amber-600 focus:ring-amber-600/20',
    mainRowStyle: 'border border-amber-300/80 bg-gradient-to-r from-amber-50/58 to-orange-50/48',
  },
};

export const GradeCalculator: React.FC = () => {
  const [grades, setGrades] = useState<GradeInputs>(initialGrades);
  const [activePresetId, setActivePresetId] = useState<string>('ejemploPdf');

  const handleGradeChange = (
    block: BlockKey,
    field: 'laboratorio' | 'puestaEnComun' | 'trabajoPersonal' | 'trabajoGrupal',
    rawValue: string
  ) => {
    const parsed = parseFloat(rawValue);
    const val = Number.isNaN(parsed) ? 0 : clampGrade(parsed);
    setActivePresetId('');
    setGrades((prev) => ({
      ...prev,
      [block]: {
        ...prev[block],
        [field]: val,
      },
    }));
  };

  const handleExamChange = (rawValue: string) => {
    const parsed = parseFloat(rawValue);
    const val = Number.isNaN(parsed) ? 0 : clampGrade(parsed);
    setActivePresetId('');
    setGrades((prev) => ({ ...prev, evaluacionAcumulativa: val }));
  };

  const handleFaultsChange = (
    field:
      | 'responsabilidadFaltas'
      | 'compromisoFaltas'
      | 'normatividadFaltas'
      | 'puntualidadFaltas',
    faltas: number
  ) => {
    setActivePresetId('');
    setGrades((prev) => ({
      ...prev,
      actitudinal: {
        ...prev.actitudinal,
        [field]: faltas,
      },
    }));
  };

  const handleAportesChange = (aportes: number) => {
    setActivePresetId('');
    setGrades((prev) => ({
      ...prev,
      actitudinal: {
        ...prev.actitudinal,
        participacionAportes: aportes,
      },
    }));
  };

  const handleNoLabCoatToggle = () => {
    setActivePresetId('');
    setGrades((prev) => ({
      ...prev,
      penalties: {
        ...prev.penalties,
        noLabCoat: !prev.penalties.noLabCoat,
      },
    }));
  };

  const anyAbsenceActive =
    grades.penalties.unexcusedAbsence.indagacion ||
    grades.penalties.unexcusedAbsence.explicacion ||
    grades.penalties.unexcusedAbsence.aplicacion;

  const handleMasterAbsenceToggle = () => {
    setActivePresetId('');
    setGrades((prev) => {
      const currentlyAny =
        prev.penalties.unexcusedAbsence.indagacion ||
        prev.penalties.unexcusedAbsence.explicacion ||
        prev.penalties.unexcusedAbsence.aplicacion;
      return {
        ...prev,
        penalties: {
          ...prev.penalties,
          unexcusedAbsence: currentlyAny
            ? { indagacion: false, explicacion: false, aplicacion: false }
            : { indagacion: true, explicacion: false, aplicacion: false },
        },
      };
    });
  };

  const handleAbsenceBlockToggle = (block: BlockKey) => {
    setActivePresetId('');
    setGrades((prev) => ({
      ...prev,
      penalties: {
        ...prev.penalties,
        unexcusedAbsence: {
          ...prev.penalties.unexcusedAbsence,
          [block]: !prev.penalties.unexcusedAbsence[block],
        },
      },
    }));
  };

  const applyPreset = (presetId: string) => {
    const found = PRESET_SCENARIOS.find((p) => p.id === presetId);
    if (!found) return;
    setGrades(structuredClone(found.data));
    setActivePresetId(presetId);
  };

  const results = useMemo(() => {
    const calculateBlock = (blockKey: BlockKey) => {
      const blockCfg = COMPETENCE_BLOCKS.find((b) => b.key === blockKey)!;
      const blockScores = grades[blockKey] as Record<string, number>;

      let baseTotal = 0;
      let effectiveTotal = 0;

      const breakdown = blockCfg.components.map((comp) => {
        const grade = blockScores[comp.id] ?? 0;
        let effectiveWeight = comp.baseWeight;

        if (comp.isMainClass) {
          if (blockKey === 'indagacion' && grades.penalties.noLabCoat) {
            effectiveWeight -= 10;
          }
          if (grades.penalties.unexcusedAbsence[blockKey]) {
            effectiveWeight -= 20;
          }
          effectiveWeight = Math.max(0, effectiveWeight);
        }

        baseTotal += grade * (comp.baseWeight / 100);
        effectiveTotal += grade * (effectiveWeight / 100);

        return {
          ...comp,
          grade,
          effectiveWeight,
        };
      });

      const contribution = effectiveTotal * blockCfg.finalWeight;
      const baseContribution = baseTotal * blockCfg.finalWeight;

      return {
        key: blockKey,
        title: blockCfg.title,
        colorName: blockCfg.colorName,
        effectiveScore: effectiveTotal,
        baseScore: baseTotal,
        contribution,
        baseContribution,
        penaltyLoss: Math.max(0, baseContribution - contribution),
        breakdown,
      };
    };

    const indagacion = calculateBlock('indagacion');
    const explicacion = calculateBlock('explicacion');
    const aplicacion = calculateBlock('aplicacion');

    const competenciasTotal =
      indagacion.contribution + explicacion.contribution + aplicacion.contribution;

    const acumulativaContribution = grades.evaluacionAcumulativa * 0.3;

    // Reglas exactas de sección 4.1 del consolidado:
    // Responsabilidad, Compromiso, Normatividad y Puntualidad por número de faltas (0->5, 1->4, 2->3, 3+->0)
    // Participación por número de aportes (0->1, 1->3, 2->4, 3+->5)
    const responsabilidadScore = scoreFromFaults(grades.actitudinal.responsabilidadFaltas);
    const compromisoScore = scoreFromFaults(grades.actitudinal.compromisoFaltas);
    const normatividadScore = scoreFromFaults(grades.actitudinal.normatividadFaltas);
    const puntualidadScore = scoreFromFaults(grades.actitudinal.puntualidadFaltas);
    const participationScore = scoreFromAportes(grades.actitudinal.participacionAportes);

    const actitudinalScoreOn5 =
      (responsabilidadScore +
        compromisoScore +
        normatividadScore +
        puntualidadScore +
        participationScore) /
      5;

    const actitudinalContribution = actitudinalScoreOn5 * 0.1;

    const finalGrade = Math.min(
      5,
      Math.max(0, competenciasTotal + acumulativaContribution + actitudinalContribution)
    );

    const totalPenaltyLoss =
      indagacion.penaltyLoss + explicacion.penaltyLoss + aplicacion.penaltyLoss;

    const zeroedComponents = [
      grades.actitudinal.responsabilidadFaltas >= 3 ? 'Responsabilidad' : null,
      grades.actitudinal.compromisoFaltas >= 3 ? 'Compromiso' : null,
      grades.actitudinal.normatividadFaltas >= 3 ? 'Normatividad' : null,
      grades.actitudinal.puntualidadFaltas >= 3 ? 'Puntualidad' : null,
    ].filter(Boolean) as string[];

    let status: {
      label: 'Aprobado' | 'En riesgo' | 'Reprobado';
      barColor: string;
      badgeStyle: string;
      icon: React.ReactNode;
    };

    if (finalGrade >= 3.5) {
      status = {
        label: 'Aprobado',
        barColor: 'bg-emerald-600',
        badgeStyle: 'bg-emerald-50 text-emerald-900 border-emerald-300',
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" aria-hidden="true" />,
      };
    } else if (finalGrade >= 3.0) {
      status = {
        label: 'En riesgo',
        barColor: 'bg-amber-500',
        badgeStyle: 'bg-amber-50 text-amber-900 border-amber-300',
        icon: <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" aria-hidden="true" />,
      };
    } else {
      status = {
        label: 'Reprobado',
        barColor: 'bg-rose-600',
        badgeStyle: 'bg-rose-50 text-rose-900 border-rose-300',
        icon: <XCircle className="h-4 w-4 text-rose-700 shrink-0" aria-hidden="true" />,
      };
    }

    return {
      indagacion,
      explicacion,
      aplicacion,
      competenciasTotal,
      acumulativaContribution,
      actitudinalScores: {
        responsabilidad: responsabilidadScore,
        compromiso: compromisoScore,
        normatividad: normatividadScore,
        puntualidad: puntualidadScore,
        participacion: participationScore,
      },
      zeroedComponents,
      actitudinalScoreOn5,
      actitudinalContribution,
      finalGrade,
      totalPenaltyLoss,
      status,
    };
  }, [grades]);

  return (
    <section id="calculadora" className="py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bio-glass relative space-y-7 overflow-hidden rounded-3xl p-6 sm:p-8">
          <div className="science-prism-bar absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />
          {/* Encabezado + Escenarios rápidos */}
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold text-teal-700">
                5. Calculadora de nota
              </p>
              <h2 className="font-display mt-2 flex items-center gap-2.5 text-2xl font-bold tracking-tight text-[#14261E] sm:text-3xl">
                <Calculator className="h-6 w-6 text-teal-600 shrink-0" aria-hidden="true" />
                <span>Simulador de nota del período</span>
              </h2>
              <p className="mt-2 text-sm text-[#335144]">
                Calcula la calificación final aplicando exactamente las reglas del consolidado:
                60/30/10, 50/10/20/20, bata (-10%), inasistencia sin excusa (-20%) y rangos
                actitudinales por faltas y aportes.
              </p>
            </div>

            <div className="bio-glass-subtle flex flex-wrap items-center gap-1.5 rounded-2xl p-1.5">
              {PRESET_SCENARIOS.map((preset) => {
                const isActive = activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#059669] to-[#0D9488] text-white shadow-sm'
                        : 'text-[#335144] hover:bg-white/80 hover:text-[#14261E]'
                    }`}
                  >
                    {preset.id === 'ejemploPdf' && (
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cuerpo de la calculadora */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            {/* Columna Izquierda: Entradas */}
            <div className="space-y-6 lg:col-span-7">
              {/* A. Competencias (60%) */}
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#14261E]">
                      A. Competencias (60% de la nota final)
                    </h3>
                    <p className="text-xs text-[#475E53]">
                      Tres bloques de 20% cada uno (hasta 1,00 punto por bloque).
                    </p>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#059669] tabular-nums whitespace-nowrap">
                    +{results.competenciasTotal.toFixed(2)} / 3,00 pts
                  </span>
                </div>

                {COMPETENCE_BLOCKS.map((block) => {
                  const colorCls = blockColorClasses[block.colorName];
                  const computedBlock = results[block.key];

                  return (
                    <div key={block.key} className="bio-glass-subtle rounded-2xl p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/15 pb-3">
                        <div>
                          <div className="flex items-center gap-2 text-xs font-semibold">
                            <span className={`font-display ${colorCls.headerText}`}>
                              {block.number} · {block.title}
                            </span>
                            <span className="text-emerald-500/40" aria-hidden="true">
                              ·
                            </span>
                            <span className="font-mono text-[#475E53]">20% del período</span>
                          </div>
                          <p className="mt-0.5 text-xs text-[#475E53]">{block.description}</p>
                        </div>

                        <div className="text-right font-mono">
                          <div className="text-sm font-bold text-[#14261E] tabular-nums">
                            Prom: {computedBlock.effectiveScore.toFixed(2)}
                          </div>
                          <div className="text-xs text-[#475E53] tabular-nums">
                            Aporta +{computedBlock.contribution.toFixed(2)} pts
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2.5">
                        {computedBlock.breakdown.map((comp) => {
                          const inputId = `${block.key}-${comp.id}`;
                          const hasPenalty = comp.effectiveWeight < comp.baseWeight;

                          return (
                            <div
                              key={comp.id}
                              className={`grid grid-cols-1 items-center gap-2 rounded-xl p-3 sm:grid-cols-12 sm:gap-3 ${
                                comp.isMainClass
                                  ? colorCls.mainRowStyle
                                  : 'border border-emerald-500/15 bg-white/55'
                              }`}
                            >
                              <div className="sm:col-span-5">
                                <label
                                  htmlFor={inputId}
                                  className="block text-xs font-semibold text-[#14261E]"
                                >
                                  {comp.label}
                                  {comp.isMainClass && (
                                    <span className={`ml-1.5 font-semibold ${colorCls.headerText}`}>
                                      (Principal)
                                    </span>
                                  )}
                                </label>
                                <p className="font-mono text-[11px] text-[#475E53] tabular-nums">
                                  Peso:{' '}
                                  {hasPenalty ? (
                                    <>
                                      <span className="line-through text-slate-400">
                                        {comp.baseWeight}%
                                      </span>{' '}
                                      <span className="font-bold text-rose-700">
                                        {comp.effectiveWeight}%
                                      </span>
                                    </>
                                  ) : (
                                    <span className="font-semibold text-[#14261E]">
                                      {comp.effectiveWeight}%
                                    </span>
                                  )}
                                </p>
                              </div>

                              <div className="flex items-center gap-3 sm:col-span-7">
                                <input
                                  id={inputId}
                                  type="range"
                                  min="0"
                                  max="5"
                                  step="0.1"
                                  value={comp.grade}
                                  onChange={(e) =>
                                    handleGradeChange(block.key, comp.id, e.target.value)
                                  }
                                  aria-label={`${block.title} - ${comp.label}`}
                                  className={`eval-slider flex-1 ${colorCls.sliderAccent}`}
                                />
                                <input
                                  type="number"
                                  min="0"
                                  max="5"
                                  step="0.1"
                                  value={comp.grade}
                                  onChange={(e) =>
                                    handleGradeChange(block.key, comp.id, e.target.value)
                                  }
                                  aria-label={`Valor numérico ${block.title} - ${comp.label}`}
                                  className={`w-16 rounded-lg border border-emerald-500/25 bg-white px-2 py-1.5 text-center font-mono text-xs font-semibold text-[#14261E] tabular-nums focus:outline-none focus:ring-2 ${colorCls.ringFocus}`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* B. Evaluación del aprendizaje (30%) */}
              <div className="bio-glass-subtle rounded-2xl p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#14261E]">
                      B. Evaluación del aprendizaje (30% de la nota final)
                    </h3>
                    <p className="text-xs text-[#475E53]">
                      Prueba individual al cierre del período (hasta 1,50 puntos).
                    </p>
                  </div>
                  <span className="font-mono text-sm font-bold text-violet-700 tabular-nums">
                    +{results.acumulativaContribution.toFixed(2)} / 1,50 pts
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-3 rounded-xl border border-violet-300/70 bg-gradient-to-r from-violet-50/55 to-white/55 p-3.5 sm:flex-row sm:items-center">
                  <label
                    htmlFor="evaluacion-acumulativa"
                    className="text-xs font-semibold text-[#14261E] sm:w-52 shrink-0"
                  >
                    Prueba individual de cierre
                  </label>
                  <div className="flex flex-1 items-center gap-3">
                    <input
                      id="evaluacion-acumulativa"
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={grades.evaluacionAcumulativa}
                      onChange={(e) => handleExamChange(e.target.value)}
                      className="eval-slider flex-1 text-violet-600 accent-violet-600"
                    />
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={grades.evaluacionAcumulativa}
                      onChange={(e) => handleExamChange(e.target.value)}
                      aria-label="Valor numérico de Prueba individual de cierre"
                      className="w-16 rounded-lg border border-violet-300 bg-white px-2 py-1.5 text-center font-mono text-xs font-semibold text-[#14261E] tabular-nums focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
                    />
                  </div>
                </div>
              </div>

              {/* C. Actitudinal (10%) con rangos por faltas y aportes del consolidado */}
              <div className="bio-glass-subtle rounded-2xl p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#14261E]">
                      C. Actitudinal (10% de la nota final)
                    </h3>
                    <p className="text-xs text-[#475E53]">
                      5 componentes de 2% cada uno. Promedio de los 5 criterios.
                    </p>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#059669] tabular-nums">
                    Prom: {results.actitudinalScoreOn5.toFixed(2)} (+
                    {results.actitudinalContribution.toFixed(2)} pts)
                  </span>
                </div>

                {/* Los 4 componentes por número de faltas */}
                <div className="mt-4 space-y-3">
                  {(
                    [
                      { id: 'responsabilidad', field: 'responsabilidadFaltas' },
                      { id: 'compromiso', field: 'compromisoFaltas' },
                      { id: 'normatividad', field: 'normatividadFaltas' },
                      { id: 'puntualidad', field: 'puntualidadFaltas' },
                    ] as const
                  ).map((row) => {
                    const meta = ATTITUDINAL_CRITERIA.find((c) => c.id === row.id)!;
                    const currentFaults = grades.actitudinal[row.field];
                    const currentScore = results.actitudinalScores[row.id];

                    return (
                      <div
                        key={row.id}
                        className="rounded-xl border border-emerald-500/15 bg-white/55 p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="text-xs font-bold text-[#14261E]">
                              {meta.label} (2%)
                            </p>
                            <p className="mt-0.5 text-[11px] text-[#475E53]">{meta.description}</p>
                          </div>
                          <span
                            className={`font-mono text-xs font-bold ${
                              currentScore === 0 ? 'text-rose-700' : 'text-[#059669]'
                            }`}
                          >
                            Nota: {currentScore.toFixed(1)}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {FAULT_RANGE_OPTIONS.map((opt) => {
                            const active =
                              opt.faltas === 3
                                ? currentFaults >= 3
                                : currentFaults === opt.faltas;
                            return (
                              <button
                                key={opt.faltas}
                                type="button"
                                onClick={() => handleFaultsChange(row.field, opt.faltas)}
                                className={`rounded-lg border px-2.5 py-1.5 font-mono text-xs font-semibold transition-colors whitespace-nowrap ${
                                  active
                                    ? opt.faltas >= 3
                                      ? 'border-rose-300 bg-rose-600 text-white'
                                      : 'border-[#059669] bg-[#059669] text-white'
                                    : 'border-emerald-500/20 bg-white text-[#335144] hover:bg-emerald-50'
                                }`}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* Participación por cantidad de aportes */}
                  <div className="rounded-xl border border-emerald-500/15 bg-white/55 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold text-[#14261E]">
                          Participación (2%) · Por cantidad de aportes
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#475E53]">
                          Con 3 aportes o más obtiene 5,0; si no participa nunca queda con 1,0.
                        </p>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#059669]">
                        Nota: {results.actitudinalScores.participacion.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {PARTICIPATION_APORTES_OPTIONS.map((opt) => {
                        const active = grades.actitudinal.participacionAportes === opt.aportes;
                        return (
                          <button
                            key={opt.aportes}
                            type="button"
                            onClick={() => handleAportesChange(opt.aportes)}
                            className={`rounded-lg border px-2.5 py-1.5 font-mono text-xs font-semibold transition-colors whitespace-nowrap ${
                              active
                                ? 'border-[#059669] bg-[#D1FAE5] text-[#064E3B]'
                                : 'border-emerald-500/20 bg-white text-[#335144] hover:bg-emerald-50'
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {results.zeroedComponents.length > 0 && (
                  <p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-900">
                    Componentes perdidos con 3 o más faltas (nota 0,0):{' '}
                    {results.zeroedComponents.join(', ')}.
                  </p>
                )}
              </div>

              {/* D. Penalizaciones (Bata e Inasistencia sin excusa) */}
              <div className="bio-glass-subtle rounded-2xl p-5">
                <div className="flex items-start gap-2.5">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#14261E]">
                      D. Inasistencia sin excusa y bata de laboratorio
                    </h3>
                    <p className="text-xs text-[#475E53]">
                      Reducen directamente el porcentaje de la clase principal dentro del bloque.
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-emerald-500/15 bg-white/55 p-4">
                    <div>
                      <p className="text-sm font-semibold text-[#14261E]">
                        No trae bata al laboratorio
                      </p>
                      <p className="mt-0.5 text-xs text-[#475E53]">
                        Reduce Laboratorio en Indagación del{' '}
                        <strong className="font-mono">50%</strong> al{' '}
                        <strong className="font-mono text-rose-700">40% (-10%)</strong>.
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={grades.penalties.noLabCoat}
                      aria-label="Activar penalización Sin bata en Laboratorio"
                      onClick={handleNoLabCoatToggle}
                      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors ${
                        grades.penalties.noLabCoat ? 'bg-rose-600' : 'bg-emerald-500/25'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform ${
                          grades.penalties.noLabCoat ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="rounded-xl border border-emerald-500/15 bg-white/55 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[#14261E]">
                          Falta sin excusa válida a clase principal
                        </p>
                        <p className="mt-0.5 text-xs text-[#475E53]">
                          Reduce la clase principal del bloque del{' '}
                          <strong className="font-mono">50%</strong> al{' '}
                          <strong className="font-mono text-rose-700">30% (-20%)</strong>.
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={anyAbsenceActive}
                        aria-label="Activar penalización Falta sin excusa válida a clase principal"
                        onClick={handleMasterAbsenceToggle}
                        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors ${
                          anyAbsenceActive ? 'bg-rose-600' : 'bg-emerald-500/25'
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform ${
                            anyAbsenceActive ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {anyAbsenceActive && (
                      <div className="mt-3 border-t border-emerald-500/15 pt-3">
                        <p className="text-xs font-medium text-[#335144]">
                          Bloques con falta sin excusa válida a la clase principal:
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {(
                            [
                              { key: 'indagacion', label: 'Indagación (Laboratorio)' },
                              { key: 'explicacion', label: 'Explicación (Trabajo personal)' },
                              { key: 'aplicacion', label: 'Aplicación (Trabajo grupal)' },
                            ] as const
                          ).map((item) => {
                            const isChecked = grades.penalties.unexcusedAbsence[item.key];
                            return (
                              <button
                                key={item.key}
                                type="button"
                                aria-pressed={isChecked}
                                onClick={() => handleAbsenceBlockToggle(item.key)}
                                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                                  isChecked
                                    ? 'border-rose-300 bg-rose-50 text-rose-900'
                                    : 'border-emerald-500/20 bg-white text-[#335144] hover:text-[#14261E]'
                                }`}
                              >
                                {item.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Resultado en tiempo real */}
            <div className="lg:sticky lg:top-32 lg:col-span-5">
              <div className="bio-glass-subtle rounded-2xl border-emerald-500/30 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs font-semibold text-[#059669]">
                      Resultado en tiempo real
                    </p>
                    <h3 className="font-display mt-1 text-lg font-bold text-[#14261E]">
                      Nota final del período
                    </h3>
                  </div>

                  <div
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold whitespace-nowrap shrink-0 ${results.status.badgeStyle}`}
                  >
                    {results.status.icon}
                    <span>{results.status.label}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-mono text-5xl font-bold tracking-tight text-[#14261E] tabular-nums">
                    {results.finalGrade.toFixed(2)}
                  </span>
                  <span className="font-mono text-lg font-medium text-[#475E53] tabular-nums">
                    / 5,00
                  </span>
                </div>

                <div className="mt-4">
                  <div className="relative h-3.5 w-full overflow-hidden rounded-full bg-emerald-500/15">
                    <div
                      className={`h-full rounded-full transition-all duration-200 ${results.status.barColor}`}
                      style={{ width: `${(results.finalGrade / 5) * 100}%` }}
                    />
                    <div
                      className="absolute inset-y-0 w-0.5 bg-slate-600/50"
                      style={{ left: '60%' }}
                      title="Límite 3,0"
                    />
                    <div
                      className="absolute inset-y-0 w-0.5 bg-slate-800/70"
                      style={{ left: '70%' }}
                      title="Aprobación 3,5"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-[#475E53] tabular-nums">
                    <span>0,0</span>
                    <span>3,0 (Riesgo)</span>
                    <span>3,5 (Aprobado)</span>
                    <span>5,0</span>
                  </div>
                </div>

                {/* Desglose por componente */}
                <div className="mt-6 border-t border-emerald-500/15 pt-5">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#14261E]">
                    <span>Aporte por componente</span>
                    <span className="font-mono text-[#475E53] tabular-nums">Sobre 5,00 pts</span>
                  </div>

                  <div className="mt-3 flex h-4 w-full overflow-hidden rounded-lg bg-slate-200/80">
                    <div
                      className="bg-sky-500 transition-all duration-200"
                      style={{ width: `${(results.indagacion.contribution / 5) * 100}%` }}
                    />
                    <div
                      className="bg-emerald-500 transition-all duration-200"
                      style={{ width: `${(results.explicacion.contribution / 5) * 100}%` }}
                    />
                    <div
                      className="bg-amber-500 transition-all duration-200"
                      style={{ width: `${(results.aplicacion.contribution / 5) * 100}%` }}
                    />
                    <div
                      className="bg-violet-600 transition-all duration-200"
                      style={{ width: `${(results.acumulativaContribution / 5) * 100}%` }}
                    />
                    <div
                      className="bg-teal-500 transition-all duration-200"
                      style={{ width: `${(results.actitudinalContribution / 5) * 100}%` }}
                    />
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    {[
                      {
                        label: 'Indagación (20%)',
                        color: 'bg-sky-500',
                        earned: results.indagacion.contribution,
                        max: 1.0,
                        subtext: `Prom. ${results.indagacion.effectiveScore.toFixed(2)}`,
                      },
                      {
                        label: 'Explicación (20%)',
                        color: 'bg-emerald-500',
                        earned: results.explicacion.contribution,
                        max: 1.0,
                        subtext: `Prom. ${results.explicacion.effectiveScore.toFixed(2)}`,
                      },
                      {
                        label: 'Aplicación (20%)',
                        color: 'bg-amber-500',
                        earned: results.aplicacion.contribution,
                        max: 1.0,
                        subtext: `Prom. ${results.aplicacion.effectiveScore.toFixed(2)}`,
                      },
                      {
                        label: 'Evaluación del aprendizaje (30%)',
                        color: 'bg-violet-600',
                        earned: results.acumulativaContribution,
                        max: 1.5,
                        subtext: `Nota ${grades.evaluacionAcumulativa.toFixed(1)}`,
                      },
                      {
                        label: 'Actitudinal (10%)',
                        color: 'bg-teal-500',
                        earned: results.actitudinalContribution,
                        max: 0.5,
                        subtext: `Prom. ${results.actitudinalScoreOn5.toFixed(2)}`,
                      },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between gap-2 rounded-xl border border-emerald-500/15 bg-white/55 px-3.5 py-2.5"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`h-2.5 w-2.5 rounded-xs shrink-0 ${row.color}`}
                            aria-hidden="true"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-[#14261E]">{row.label}</p>
                            <p className="font-mono text-[11px] text-[#475E53] tabular-nums">
                              {row.subtext}
                            </p>
                          </div>
                        </div>
                        <div className="text-right font-mono shrink-0 tabular-nums">
                          <span className="font-bold text-[#14261E]">
                            +{row.earned.toFixed(2)}
                          </span>
                          <span className="text-[#475E53]"> / {row.max.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {results.totalPenaltyLoss > 0 && (
                    <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50/90 p-3 text-xs text-rose-900">
                      <div className="flex items-center justify-between font-semibold">
                        <span>Impacto por penalizaciones de peso</span>
                        <span className="font-mono tabular-nums">
                          -{results.totalPenaltyLoss.toFixed(2)} pts
                        </span>
                      </div>
                      <p className="mt-1 text-[11px]">
                        Sin bata ni falta sin excusa, la nota final sería{' '}
                        <strong className="font-mono tabular-nums">
                          {(results.finalGrade + results.totalPenaltyLoss).toFixed(2)}
                        </strong>
                        .
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
