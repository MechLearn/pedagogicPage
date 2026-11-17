export type BlockKey = 'indagacion' | 'explicacion' | 'aplicacion';

export type ClassKey =
  | 'laboratorio'
  | 'puestaEnComun'
  | 'trabajoPersonal'
  | 'trabajoGrupal'
  | 'evaluacion';

export interface PlanningQuestion {
  id: number;
  question: string;
  purpose: string;
}

export interface ClassMoment {
  step: string;
  title: string;
  description: string;
}

export interface ClassCardData {
  id: ClassKey;
  number: string;
  title: string;
  weightBadge: string;
  oneLine: string;
  yesItems: string[];
  noItems: string[];
  moments: ClassMoment[];
  closingQuestion: string;
  closingAction: string;
  infographicPath: string;
  infographicAlt: string;
  accent: 'sky' | 'emerald' | 'amber' | 'slate';
}

export interface BlockComponentConfig {
  id: 'laboratorio' | 'puestaEnComun' | 'trabajoPersonal' | 'trabajoGrupal';
  label: string;
  baseWeight: number;
  isMainClass: boolean;
}

export interface CompetenceBlockConfig {
  key: BlockKey;
  number: string;
  title: string;
  finalWeight: number;
  colorName: 'sky' | 'emerald' | 'amber';
  description: string;
  mainClassLabel: string;
  components: BlockComponentConfig[];
}

export interface AttitudinalCriterion {
  id: 'responsabilidad' | 'compromiso' | 'normatividad' | 'participacion' | 'puntualidad';
  label: string;
  description: string;
  weightPercent: number;
  isParticipation?: boolean;
}

export interface GradeInputs {
  indagacion: {
    laboratorio: number;
    puestaEnComun: number;
    trabajoPersonal: number;
    trabajoGrupal: number;
  };
  explicacion: {
    trabajoPersonal: number;
    puestaEnComun: number;
    laboratorio: number;
    trabajoGrupal: number;
  };
  aplicacion: {
    trabajoGrupal: number;
    puestaEnComun: number;
    laboratorio: number;
    trabajoPersonal: number;
  };
  evaluacionAcumulativa: number;
  actitudinal: {
    responsabilidadFaltas: number;
    compromisoFaltas: number;
    normatividadFaltas: number;
    puntualidadFaltas: number;
    participacionAportes: number;
  };
  penalties: {
    noLabCoat: boolean;
    unexcusedAbsence: {
      indagacion: boolean;
      explicacion: boolean;
      aplicacion: boolean;
    };
  };
}

export const THEORETICAL_BACKUPS = [
  {
    title: 'Los cinco tipos de clase en Ciencias Naturales (PDF)',
    subtitle: 'Documento del colegio · Versión para docentes (Colegio Santa Luisa)',
    href: '/assets/aistudio/cinco_clases_ciencias_20ed2b30.pdf',
  },
  {
    title: 'Consolidado del sistema de evaluación (PDF)',
    subtitle: 'Documento del colegio · Pesos, penalizaciones, rangos actitudinales y ejemplo',
    href: '/assets/aistudio/consolidado_evaluacion_2446ba0e.pdf',
  },
  {
    title: 'Libro de respaldo: Aprender por refracción (PDF)',
    subtitle: 'Johnny C. Go, SJ y Rita J. Atienza (Mensajero, 2021)',
    href: '/assets/aistudio/832995411-Aprender-Por-Refraccion-Libro-Escaneado-1_35499b48.pdf',
  },
];

export const OVERVIEW_INFOGRAPHIC = {
  src: '/assets/aistudio/Evaluacio_n_en_Ciencias_Naturales_688bc823.webp',
  title: 'Infografía general: Bloques temáticos, tipos de clase y calificación',
  alt: 'Infografía general de la estructura pedagógica y sistema de evaluación en Ciencias Naturales con los tres bloques, los cinco tipos de clase y el desglose 60/30/10.',
};

export const GRADING_INFOGRAPHIC = {
  src: '/assets/aistudio/Evaluacio_n_en_ciencias_naturales__1__96489517.webp',
  title: 'Infografía del sistema de evaluación y calificación (60 / 30 / 10)',
  alt: 'Infografía del sistema de evaluación y calificación en Ciencias Naturales: competencias 60%, prueba individual 30%, componente actitudinal 10%, penalizaciones de bata e inasistencia y rangos.',
};

export const PERIOD_BLOCKS = [
  {
    step: 'Bloque 1',
    name: 'Indagación',
    weight: '20% de la nota final',
    mainClass: 'Laboratorio (50%)',
    otherClasses: 'Trabajo personal (20%) · Trabajo grupal (20%) · Puesta en común (10%)',
    summary:
      'Se enfrenta al fenómeno antes que a la teoría y saca sus propias conclusiones.',
    accent: 'sky' as const,
  },
  {
    step: 'Bloque 2',
    name: 'Explicación',
    weight: '20% de la nota final',
    mainClass: 'Trabajo personal (50%)',
    otherClasses: 'Laboratorio (20%) · Trabajo grupal (20%) · Puesta en común (10%)',
    summary:
      'Trabaja solo y muestra qué entiende y qué puede explicar.',
    accent: 'emerald' as const,
  },
  {
    step: 'Bloque 3',
    name: 'Aplicación',
    weight: '20% de la nota final',
    mainClass: 'Trabajo grupal (50%)',
    otherClasses: 'Laboratorio (20%) · Trabajo personal (20%) · Puesta en común (10%)',
    summary:
      'Resuelve en equipo un problema real y propone algo.',
    accent: 'amber' as const,
  },
];

// Las 3 preguntas de planeación NO se asocian a ninguna competencia: sirven para planear cualquier clase.
export const PLANNING_QUESTIONS: PlanningQuestion[] = [
  {
    id: 1,
    question: '¿Qué saben y qué creen mis estudiantes sobre este tema?',
    purpose: 'Ideas previas, errores frecuentes, qué les interesa.',
  },
  {
    id: 2,
    question: '¿Qué quiero que se pregunten?',
    purpose: 'Una pregunta que los haga revisar lo que creían, no «¿qué aprendiste hoy?».',
  },
  {
    id: 3,
    question: '¿Qué van a hacer con lo que aprendan?',
    purpose: 'Explicar un caso nuevo, tomar una decisión, proponer algo.',
  },
];

export const FIVE_CLASSES: ClassCardData[] = [
  {
    id: 'laboratorio',
    number: 'Clase 01',
    title: 'Clase de Laboratorio',
    weightBadge: '50% en Indagación · 20% en Explicación · 20% en Aplicación',
    oneLine:
      'El estudiante se enfrenta al fenómeno antes que a la teoría, predice, observa o mide, y saca sus propias conclusiones.',
    yesItems: [
      'Un experimento en el laboratorio o en el salón.',
      'Una simulación (PhET u otras).',
      'Salir al patio o a la huerta a observar y registrar.',
      'Analizar un video, una tabla o una base de datos real.',
      'Una demostración del docente en la que los estudiantes predicen y explican.',
    ],
    noItems: [
      'Seguir una receta paso a paso y llenar una tabla.',
      'Que el docente explique primero y el experimento solo «confirme».',
      'Tomar datos sin analizarlos ni concluir nada.',
      'Una clase donde el resultado ya se sabe desde el principio.',
    ],
    moments: [
      {
        step: '1. Pregunta y predicción',
        title: 'Antes de observar',
        description:
          'El docente plantea una situación. Cada estudiante escribe qué cree que va a pasar y por qué.',
      },
      {
        step: '2. Observación o medición',
        title: 'Exploración activa',
        description:
          'Los estudiantes observan, miden o exploran, en equipo o solos. El docente pregunta, pero no da el resultado.',
      },
      {
        step: '3. Análisis',
        title: 'Organización de datos',
        description:
          'Organizan lo que encontraron (tabla, gráfica, dibujo, comparación) y buscan patrones.',
      },
      {
        step: '4. Conclusión',
        title: 'Cierre con evidencia',
        description:
          'Cada estudiante escribe su conclusión con base en lo que observó y la compara con su predicción.',
      },
    ],
    closingQuestion:
      '¿Se cumplió mi predicción? ¿Qué me sorprendió? ¿Qué tan seguro estoy de lo que encontré?',
    closingAction: 'Escribe su conclusión y una pregunta nueva que le gustaría investigar.',
    infographicPath: '/assets/aistudio/Estructura_del_laboratorio_de_ciencias_8b8dcff3.webp',
    infographicAlt:
      'Infografía de la Clase de Laboratorio en Ciencias Naturales: estructura, momentos y criterios sí es / no es.',
    accent: 'sky',
  },
  {
    id: 'puestaEnComun',
    number: 'Clase 02',
    title: 'Clase de Puesta en Común',
    weightBadge: '10% en Indagación · 10% en Explicación · 10% en Aplicación',
    oneLine:
      'El estudiante compara lo que hizo con lo que hicieron los demás, discute las diferencias y, con ayuda del docente, llega por sí mismo a la idea central.',
    yesItems: [
      'Poner los resultados de todos los equipos en el tablero y compararlos.',
      'Una discusión guiada por preguntas.',
      'Una galería: los equipos recorren los trabajos de los otros.',
      'Cerrar con una explicación corta del docente que parte de lo que dijeron los estudiantes.',
    ],
    noItems: [
      'Exposiciones memorizadas, una tras otra.',
      'Una clase magistral desde el principio.',
      'Corregir cada error apenas aparece.',
      'Que el docente dé la conclusión hecha.',
      'Calificar quién habla más.',
    ],
    moments: [
      {
        step: '1. Resultados a la vista',
        title: 'Muestra pública',
        description:
          'Se muestran los resultados o productos de la clase anterior, sin comentarlos todavía.',
      },
      {
        step: '2. Socialización',
        title: 'Escucha activa',
        description:
          'Los estudiantes explican qué hicieron y qué encontraron. El docente da la palabra y escucha.',
      },
      {
        step: '3. Contraste',
        title: 'Análisis de diferencias',
        description:
          'Se buscan las diferencias: ¿por qué a un equipo le dio distinto? Los estudiantes proponen razones.',
      },
      {
        step: '4. Formalización',
        title: 'Idea central',
        description:
          'El docente retoma lo que dijeron y en pocos minutos formaliza el concepto, la ley o el modelo, sus límites y los errores más comunes.',
      },
      {
        step: '5. Pregunta final',
        title: 'Ticket de salida',
        description:
          'El docente lanza una pregunta para pensar. Cada estudiante escribe con sus palabras la idea central y la aplica a un caso nuevo.',
      },
    ],
    closingQuestion:
      '¿Por qué mi resultado es distinto al de otros? ¿Qué entiendo ahora que antes no entendía?',
    closingAction:
      'Escribe con sus palabras la idea central, corrige su propio trabajo y responde un ticket con un caso que no se vio en clase.',
    infographicPath: '/assets/aistudio/Puesta_en_comu_n_en_ciencias_6ad67f56.webp',
    infographicAlt:
      'Infografía de la Clase de Puesta en Común en Ciencias Naturales: tres momentos y peso del 10% por bloque.',
    accent: 'slate',
  },
  {
    id: 'trabajoPersonal',
    number: 'Clase 03',
    title: 'Clase de Trabajo Personal',
    weightBadge: '50% en Explicación · 20% en Indagación · 20% en Aplicación',
    oneLine:
      'El estudiante se enfrenta solo a un problema antes de que se lo expliquen, lo intenta, y con una guía avanza a su ritmo hasta poder explicarlo con sus palabras.',
    yesItems: [
      'Empezar con un problema o caso que el estudiante intenta solo.',
      'Una guía con preguntas que piden explicar (¿por qué?, ¿qué pasaría si...?).',
      'Un taller por niveles: básico, de profundización y de refuerzo.',
      'Analizar un caso, una gráfica o una noticia.',
      'Escribir una explicación, hacer un mapa conceptual o un esquema.',
    ],
    noItems: [
      'Que el docente explique todo al principio y los estudiantes solo repitan el ejemplo.',
      'Copiar del tablero o del libro.',
      'Solo ejercicios mecánicos de reemplazar en una fórmula.',
      'Un trabajo en grupo disfrazado.',
      'Una tarea para la casa que se revisa sin retroalimentar.',
    ],
    moments: [
      {
        step: '1. Primer intento',
        title: 'Sin explicación previa',
        description:
          'El docente entrega un caso o problema antes de explicar nada. Cada estudiante lo intenta solo y escribe cómo lo resolvería.',
      },
      {
        step: '2. Desarrollo de la guía',
        title: 'Trabajo por niveles',
        description:
          'Cada estudiante trabaja la guía por niveles. El docente acompaña; si varios se traban en lo mismo, para y da una explicación corta.',
      },
      {
        step: '3. Autocorrección',
        title: 'Revisión con clave',
        description:
          'El estudiante revisa una parte con la clave y vuelve a su primer intento: ¿qué cambiaría?',
      },
      {
        step: '4. Cierre',
        title: 'Explicación a caso nuevo',
        description:
          'Escribe qué entiende ahora que al principio no entendía y explica un caso nuevo.',
      },
    ],
    closingQuestion: '¿En qué cambió mi primer intento? ¿Qué me costó y cómo lo resolví?',
    closingAction:
      'Explica con sus palabras un fenómeno de la vida diaria que no estaba en la guía.',
    infographicPath: '/assets/aistudio/Trabajo_Personal_en_Ciencias_Naturales_2dc83aba.webp',
    infographicAlt:
      'Infografía de la Clase de Trabajo Personal en Ciencias Naturales: niveles, tres momentos y peso del 50% en Explicación.',
    accent: 'emerald',
  },
  {
    id: 'trabajoGrupal',
    number: 'Clase 04',
    title: 'Clase de Trabajo Grupal',
    weightBadge: '50% en Aplicación · 20% en Indagación · 20% en Explicación',
    oneLine:
      'El estudiante resuelve en equipo un problema real del entorno, decide y propone algo, pensando en a quién afecta.',
    yesItems: [
      'Un reto o problema del colegio, el barrio o la ciudad.',
      'Un proyecto corto con un producto: propuesta, cartel, video, prototipo.',
      'Un trabajo en el que cada integrante tiene un rol.',
      'Un producto dirigido a alguien real (otro curso, la cafetería, la coordinación).',
    ],
    noItems: [
      'Repartirse un taller y pegar las partes.',
      'Que uno trabaje y los demás firmen.',
      'Un ejercicio de libro resuelto en grupo.',
      'Una exposición sobre un tema consultado en internet.',
    ],
    moments: [
      {
        step: '1. Reto y roles',
        title: 'Conformación del equipo',
        description:
          'El docente presenta el problema y lo que se espera. Arma los grupos y reparte roles.',
      },
      {
        step: '2. Análisis',
        title: 'Ciencia e información',
        description:
          'El equipo identifica el problema, la ciencia que lo explica y la información que necesita.',
      },
      {
        step: '3. Propuesta',
        title: 'Diseño del producto',
        description: 'Comparan alternativas, deciden y preparan el producto.',
      },
      {
        step: '4. Entrega',
        title: 'Sustentación y coevaluación',
        description:
          'Entregan el producto; cualquier integrante debe poder explicarlo. Hacen la coevaluación.',
      },
    ],
    closingQuestion:
      '¿A quién afecta este problema? ¿Qué está en juego? ¿Qué haría yo si dependiera de mí?',
    closingAction: 'Presenta una propuesta concreta a alguien real y la sustenta.',
    infographicPath: '/assets/aistudio/Trabajo_Grupal_en_Ciencias_Naturales_4266ef56.webp',
    infographicAlt:
      'Infografía de la Clase de Trabajo Grupal en Ciencias Naturales: roles, momentos y peso del 50% en Aplicación.',
    accent: 'amber',
  },
  {
    id: 'evaluacion',
    number: 'Clase 05',
    title: 'Clase de Evaluación del Aprendizaje',
    weightBadge: '30% directo de la nota final del período',
    oneLine:
      'El estudiante muestra individualmente lo que sabe hacer en las tres competencias y revisa cómo le fue.',
    yesItems: [
      'Una prueba tipo Icfes con preguntas en contexto de las tres competencias.',
      'Al menos una pregunta abierta que exija decidir o argumentar.',
      'Una práctica de laboratorio evaluada.',
      'Un caso para analizar y resolver.',
      'La autoevaluación y la revisión de errores después de la prueba.',
    ],
    noItems: [
      'Un examen solo de memoria o de definiciones.',
      'Preguntas sin relación con lo trabajado en clase.',
      'Que los estudiantes no sepan antes qué se va a evaluar.',
      'Entregar la nota sin revisar qué se falló.',
    ],
    moments: [
      {
        step: '1. Antes (días antes)',
        title: 'Criterios claros',
        description: 'El docente comparte qué se va a evaluar y con qué criterios.',
      },
      {
        step: '2. Prueba',
        title: 'Resolución individual',
        description: 'Cada estudiante resuelve solo.',
      },
      {
        step: '3. Autoevaluación',
        title: 'Balance personal',
        description: 'El estudiante dice cómo le fue en cada competencia y qué le faltó.',
      },
      {
        step: '4. Revisión (después)',
        title: 'Corrección formativa',
        description:
          'Se revisa qué preguntas fallaron más y por qué; los estudiantes corrigen sus errores, solos o en parejas. El docente usa esos resultados para ajustar lo que sigue.',
      },
    ],
    closingQuestion:
      '¿Cómo me fue en cada competencia? ¿Qué hice bien al estudiar y qué voy a cambiar?',
    closingAction: 'Escribe un compromiso de mejora concreto.',
    infographicPath: '/assets/aistudio/Evaluacio_n_en_Ciencias_Naturales__2__5bc86830.webp',
    infographicAlt:
      'Infografía de la Clase de Evaluación en Ciencias Naturales: peso del 30% y los momentos de la prueba.',
    accent: 'slate',
  },
];

export const COMPETENCE_BLOCKS: CompetenceBlockConfig[] = [
  {
    key: 'indagacion',
    number: 'Bloque 1',
    title: 'Indagación',
    finalWeight: 0.2,
    colorName: 'sky',
    description: 'Fenómeno antes que teoría, medición, análisis y conclusiones con evidencia.',
    mainClassLabel: 'Laboratorio',
    components: [
      { id: 'laboratorio', label: 'Laboratorio', baseWeight: 50, isMainClass: true },
      { id: 'puestaEnComun', label: 'Puesta en común', baseWeight: 10, isMainClass: false },
      { id: 'trabajoPersonal', label: 'Trabajo personal', baseWeight: 20, isMainClass: false },
      { id: 'trabajoGrupal', label: 'Trabajo grupal', baseWeight: 20, isMainClass: false },
    ],
  },
  {
    key: 'explicacion',
    number: 'Bloque 2',
    title: 'Explicación',
    finalWeight: 0.2,
    colorName: 'emerald',
    description: 'Trabajo personal por niveles y explicación fundamentada con palabras propias.',
    mainClassLabel: 'Trabajo personal',
    components: [
      { id: 'trabajoPersonal', label: 'Trabajo personal', baseWeight: 50, isMainClass: true },
      { id: 'puestaEnComun', label: 'Puesta en común', baseWeight: 10, isMainClass: false },
      { id: 'laboratorio', label: 'Laboratorio', baseWeight: 20, isMainClass: false },
      { id: 'trabajoGrupal', label: 'Trabajo grupal', baseWeight: 20, isMainClass: false },
    ],
  },
  {
    key: 'aplicacion',
    number: 'Bloque 3',
    title: 'Aplicación',
    finalWeight: 0.2,
    colorName: 'amber',
    description: 'Resolución colaborativa de problemas reales del entorno con destinatario real.',
    mainClassLabel: 'Trabajo grupal',
    components: [
      { id: 'trabajoGrupal', label: 'Trabajo grupal', baseWeight: 50, isMainClass: true },
      { id: 'puestaEnComun', label: 'Puesta en común', baseWeight: 10, isMainClass: false },
      { id: 'laboratorio', label: 'Laboratorio', baseWeight: 20, isMainClass: false },
      { id: 'trabajoPersonal', label: 'Trabajo personal', baseWeight: 20, isMainClass: false },
    ],
  },
];

export const ATTITUDINAL_CRITERIA: AttitudinalCriterion[] = [
  {
    id: 'responsabilidad',
    label: 'Responsabilidad',
    description:
      'Trabajos, guías o tareas no entregados en la fecha acordada y clases en las que no trae los materiales.',
    weightPercent: 2,
  },
  {
    id: 'compromiso',
    label: 'Compromiso',
    description:
      'Calidad de lo que entrega: trabajos devueltos o marcados como de baja calidad (incompletos, hechos a la carrera, copiados o sin seguir indicaciones).',
    weightPercent: 2,
  },
  {
    id: 'normatividad',
    label: 'Normatividad',
    description:
      'Llamados de atención por incumplir normas de clase, de laboratorio o del manual de convivencia (uniforme, celular, seguridad).',
    weightPercent: 2,
  },
  {
    id: 'participacion',
    label: 'Participación',
    description:
      'Aportes del estudiante en clase: intervenciones en la Puesta en común, preguntas, explicaciones a compañeros y aportes en el Trabajo grupal.',
    weightPercent: 2,
    isParticipation: true,
  },
  {
    id: 'puntualidad',
    label: 'Puntualidad',
    description: 'Llegadas tarde a clase sin justificación.',
    weightPercent: 2,
  },
];

// Tabla oficial del consolidado (sección 4.1):
// Responsabilidad, Compromiso, Normatividad y Puntualidad: 0 faltas -> 5,0 | 1 falta -> 4,0 | 2 faltas -> 3,0 | 3 o más -> 0,0
export const FAULT_RANGE_OPTIONS: {
  faltas: number;
  label: string;
  score: number;
}[] = [
  { faltas: 0, label: '0 faltas (5,0)', score: 5.0 },
  { faltas: 1, label: '1 falta (4,0)', score: 4.0 },
  { faltas: 2, label: '2 faltas (3,0)', score: 3.0 },
  { faltas: 3, label: '3 o más (0,0)', score: 0.0 },
];

// Tabla oficial del consolidado (sección 4.1):
// Participación: 0 aportes -> 1,0 | 1 aporte -> 3,0 | 2 aportes -> 4,0 | 3 o más -> 5,0
export const PARTICIPATION_APORTES_OPTIONS: {
  aportes: number;
  label: string;
  score: number;
}[] = [
  { aportes: 0, label: '0 aportes (1,0)', score: 1.0 },
  { aportes: 1, label: '1 aporte (3,0)', score: 3.0 },
  { aportes: 2, label: '2 aportes (4,0)', score: 4.0 },
  { aportes: 3, label: '3 o más (5,0)', score: 5.0 },
];

export const scoreFromFaults = (faltas: number): number => {
  if (faltas >= 3) return 0.0;
  if (faltas === 2) return 3.0;
  if (faltas === 1) return 4.0;
  return 5.0;
};

export const scoreFromAportes = (aportes: number): number => {
  if (aportes >= 3) return 5.0;
  if (aportes === 2) return 4.0;
  if (aportes === 1) return 3.0;
  return 1.0;
};

export const PRESET_SCENARIOS: {
  id: string;
  label: string;
  data: GradeInputs;
}[] = [
  {
    id: 'ejemploPdf',
    label: 'Ejemplo consolidado (3,83)',
    data: {
      indagacion: { laboratorio: 4.0, puestaEnComun: 3.5, trabajoPersonal: 3.8, trabajoGrupal: 4.2 },
      explicacion: { trabajoPersonal: 3.9, puestaEnComun: 4.0, laboratorio: 3.6, trabajoGrupal: 4.2 },
      aplicacion: { trabajoGrupal: 4.4, puestaEnComun: 3.5, laboratorio: 4.0, trabajoPersonal: 3.8 },
      evaluacionAcumulativa: 3.6,
      actitudinal: {
        responsabilidadFaltas: 1,
        compromisoFaltas: 0,
        normatividadFaltas: 0,
        puntualidadFaltas: 3,
        participacionAportes: 2,
      },
      penalties: {
        noLabCoat: false,
        unexcusedAbsence: { indagacion: false, explicacion: false, aplicacion: false },
      },
    },
  },
  {
    id: 'penalizaciones',
    label: 'Sin bata / inasistencia',
    data: {
      indagacion: { laboratorio: 4.0, puestaEnComun: 3.5, trabajoPersonal: 3.8, trabajoGrupal: 4.2 },
      explicacion: { trabajoPersonal: 3.9, puestaEnComun: 4.0, laboratorio: 3.6, trabajoGrupal: 4.2 },
      aplicacion: { trabajoGrupal: 4.4, puestaEnComun: 3.5, laboratorio: 4.0, trabajoPersonal: 3.8 },
      evaluacionAcumulativa: 3.6,
      actitudinal: {
        responsabilidadFaltas: 0,
        compromisoFaltas: 0,
        normatividadFaltas: 1,
        puntualidadFaltas: 0,
        participacionAportes: 3,
      },
      penalties: {
        noLabCoat: true,
        unexcusedAbsence: { indagacion: false, explicacion: false, aplicacion: false },
      },
    },
  },
  {
    id: 'sinAportes',
    label: 'Sin aportes y 3 faltas',
    data: {
      indagacion: { laboratorio: 3.8, puestaEnComun: 3.8, trabajoPersonal: 3.6, trabajoGrupal: 3.8 },
      explicacion: { trabajoPersonal: 3.6, puestaEnComun: 3.7, laboratorio: 3.8, trabajoGrupal: 3.6 },
      aplicacion: { trabajoGrupal: 3.9, puestaEnComun: 3.7, laboratorio: 3.7, trabajoPersonal: 3.6 },
      evaluacionAcumulativa: 3.5,
      actitudinal: {
        responsabilidadFaltas: 3,
        compromisoFaltas: 2,
        normatividadFaltas: 3,
        puntualidadFaltas: 3,
        participacionAportes: 0,
      },
      penalties: {
        noLabCoat: false,
        unexcusedAbsence: { indagacion: false, explicacion: false, aplicacion: false },
      },
    },
  },
];
