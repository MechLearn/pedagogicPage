import React from 'react';
import { ClassKey } from '../data/pedagogicalData';

interface YesNoGraphicProps {
  classId: ClassKey;
  kind: 'yes' | 'no';
  index: number;
}

const MiniBadge: React.FC<{ kind: 'yes' | 'no' }> = ({ kind }) =>
  kind === 'yes' ? (
    <g transform="translate(40, 39)">
      <circle cx="7" cy="7" r="6.5" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
      <path
        d="M4.2 7.2 L6.2 9.2 L10 5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ) : (
    <g transform="translate(40, 39)">
      <circle cx="7" cy="7" r="6.5" fill="#E11D48" stroke="#FFFFFF" strokeWidth="1.5" />
      <path
        d="M4.8 4.8 L9.2 9.2 M9.2 4.8 L4.8 9.2"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </g>
  );

export const YesNoGraphic: React.FC<YesNoGraphicProps> = ({ classId, kind, index }) => {
  const key = `${classId}-${kind}-${index}`;
  const bgFill = kind === 'yes' ? '#ECFDF5' : '#FFF1F2';
  const ringStroke = kind === 'yes' ? '#A7F3D0' : '#FECDD3';

  const renderArtwork = () => {
    switch (key) {
      // ================= 1. LABORATORIO =================
      case 'laboratorio-yes-0': // Experimento en laboratorio o salón
        return (
          <g>
            <path
              d="M22 12 H30 M24 12 V20 L16 36 C15 38.5 16.5 41 19 41 H33 C35.5 41 37 38.5 36 36 L28 20 V12"
              fill="#FFFFFF"
              stroke="#1E293B"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M18.5 31 H33.5 L35.5 36.5 C36 38.2 35 39.8 33 39.8 H19 C17 39.8 16 38.2 16.5 36.5 Z" fill="#34D399" />
            <circle cx="24" cy="26" r="2" fill="#0D9488" />
            <circle cx="29" cy="22" r="1.5" fill="#38BDF8" />
            <circle cx="26" cy="35" r="1.8" fill="#ECFDF5" />
          </g>
        );
      case 'laboratorio-yes-1': // Simulación PhET
        return (
          <g>
            <rect x="11" y="13" width="32" height="22" rx="3" fill="#E0F2FE" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M15 26 Q20 17 25 26 T35 26 T40 22" fill="none" stroke="#0D9488" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="25" cy="26" r="2.5" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.2" />
            <path d="M23 35 V40 M19 40 H35" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
      case 'laboratorio-yes-2': // Patio o huerta a observar y registrar
        return (
          <g>
            <path d="M23 41 V25" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            <path d="M23 31 C15 31 13 24 16 19 C21 19 23 24 23 31 Z" fill="#34D399" stroke="#1E293B" strokeWidth="1.6" />
            <path d="M23 27 C23 20 27 16 33 17 C33 23 29 27 23 27 Z" fill="#10B981" stroke="#1E293B" strokeWidth="1.6" />
            <circle cx="34" cy="31" r="6" fill="#E0F2FE" stroke="#1E293B" strokeWidth="1.7" />
            <path d="M38.5 35.5 L42.5 39.5" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        );
      case 'laboratorio-yes-3': // Video, tabla o base de datos real
        return (
          <g>
            <rect x="11" y="13" width="32" height="26" rx="3" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <rect x="15" y="17" width="12" height="9" rx="1.5" fill="#BAE6FD" stroke="#1E293B" strokeWidth="1.3" />
            <polygon points="20,19.5 20,23.5 23.5,21.5" fill="#0D9488" />
            <rect x="16" y="30" width="4" height="6" rx="0.8" fill="#10B981" />
            <rect x="22" y="27" width="4" height="9" rx="0.8" fill="#0D9488" />
            <rect x="28" y="22" width="4" height="14" rx="0.8" fill="#F59E0B" />
            <rect x="34" y="25" width="4" height="11" rx="0.8" fill="#38BDF8" />
          </g>
        );
      case 'laboratorio-yes-4': // Demostración del docente + predicen y explican
        return (
          <g>
            <circle cx="20" cy="19" r="5" fill="#FDE68A" stroke="#1E293B" strokeWidth="1.7" />
            <path d="M12 37 C12 30 28 30 28 37" fill="#38BDF8" stroke="#1E293B" strokeWidth="1.7" />
            <rect x="27" y="12" width="16" height="13" rx="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.6" />
            <text x="35" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#059669">?</text>
            <path d="M10 38 H42" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
      case 'laboratorio-no-0': // Receta paso a paso
        return (
          <g>
            <rect x="14" y="11" width="24" height="30" rx="3" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <rect x="20" y="9" width="12" height="5" rx="1.5" fill="#CBD5E1" stroke="#1E293B" strokeWidth="1.4" />
            <path d="M19 20 H33 M19 26 H33 M19 32 H33" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <circle cx="17" cy="20" r="1.2" fill="#E11D48" />
            <circle cx="17" cy="26" r="1.2" fill="#E11D48" />
            <circle cx="17" cy="32" r="1.2" fill="#E11D48" />
          </g>
        );
      case 'laboratorio-no-1': // Docente explica primero y solo confirma
        return (
          <g>
            <rect x="11" y="13" width="26" height="18" rx="2" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M16 19 H29 M16 24 H24" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
            <rect x="27" y="25" width="14" height="14" rx="2.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.7" />
            <path d="M30 32 L33 35 L38 29" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 'laboratorio-no-2': // Tomar datos sin analizarlos
        return (
          <g>
            <rect x="13" y="13" width="28" height="26" rx="2.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M13 21 H41 M13 29 H41 M23 13 V39 M32 13 V39" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="18" cy="17" r="1.5" fill="#94A3B8" />
            <circle cx="27.5" cy="25" r="1.5" fill="#94A3B8" />
            <circle cx="36.5" cy="34" r="1.5" fill="#94A3B8" />
          </g>
        );
      case 'laboratorio-no-3': // Resultado ya se sabe desde el principio
        return (
          <g>
            <rect x="13" y="17" width="28" height="20" rx="2.5" fill="#FFE4E6" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M13 18 L27 28 L41 18" fill="none" stroke="#1E293B" strokeWidth="1.7" strokeLinejoin="round" />
            <circle cx="27" cy="15" r="6" fill="#FECDD3" stroke="#1E293B" strokeWidth="1.5" />
            <text x="27" y="18" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#E11D48">!</text>
          </g>
        );

      // ================= 2. PUESTA EN COMÚN =================
      case 'puestaEnComun-yes-0': // Resultados en el tablero y compararlos
        return (
          <g>
            <rect x="10" y="12" width="34" height="24" rx="2.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <rect x="14" y="17" width="11" height="14" rx="1.5" fill="#D1FAE5" stroke="#059669" strokeWidth="1.3" />
            <rect x="29" y="17" width="11" height="14" rx="1.5" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.3" />
            <path d="M16 27 L19 22 L23 25 M31 28 L35 20 L38 24" fill="none" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M25 36 V41 M19 41 H35" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
      case 'puestaEnComun-yes-1': // Discusión guiada por preguntas
        return (
          <g>
            <rect x="10" y="13" width="22" height="15" rx="6" fill="#D1FAE5" stroke="#1E293B" strokeWidth="1.7" />
            <rect x="22" y="24" width="22" height="15" rx="6" fill="#E0F2FE" stroke="#1E293B" strokeWidth="1.7" />
            <text x="21" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#059669">?</text>
            <path d="M27 31 H39" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 'puestaEnComun-yes-2': // Galería de trabajos
        return (
          <g>
            <rect x="10" y="14" width="10" height="12" rx="1.5" fill="#D1FAE5" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="22" y="12" width="10" height="14" rx="1.5" fill="#FEF3C7" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="34" y="14" width="10" height="12" rx="1.5" fill="#E0F2FE" stroke="#1E293B" strokeWidth="1.5" />
            <circle cx="19" cy="34" r="3.2" fill="#34D399" stroke="#1E293B" strokeWidth="1.4" />
            <circle cx="33" cy="34" r="3.2" fill="#38BDF8" stroke="#1E293B" strokeWidth="1.4" />
            <path d="M22 39 H30" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
      case 'puestaEnComun-yes-3': // Explicación corta docente desde lo dicho
        return (
          <g>
            <circle cx="27" cy="21" r="8" fill="#FEF08A" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M24 29 H30 M24.5 32.5 H29.5" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M13 24 L18 22 M41 24 L36 22 M27 9 V12" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 'puestaEnComun-no-0': // Exposiciones memorizadas una tras otra
        return (
          <g>
            <rect x="12" y="15" width="18" height="22" rx="2" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.6" />
            <rect x="17" y="12" width="18" height="22" rx="2" fill="#F1F5F9" stroke="#1E293B" strokeWidth="1.6" />
            <rect x="22" y="18" width="18" height="20" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.7" />
            <path d="M26 24 H36 M26 29 H34" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
      case 'puestaEnComun-no-1': // Clase magistral desde el principio
        return (
          <g>
            <circle cx="26" cy="17" r="4.5" fill="#CBD5E1" stroke="#1E293B" strokeWidth="1.7" />
            <path d="M17 25 H35 L33 39 H19 Z" fill="#94A3B8" stroke="#1E293B" strokeWidth="1.7" />
            <path d="M35 16 L42 13 V21 L35 18 Z" fill="#FDA4AF" stroke="#1E293B" strokeWidth="1.4" />
          </g>
        );
      case 'puestaEnComun-no-2': // Corregir cada error apenas aparece
        return (
          <g>
            <rect x="13" y="13" width="26" height="26" rx="2.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.7" />
            <path d="M18 20 H32 M18 27 H34" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M17 22 L33 17" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M31 32 L39 24 L41 26 L33 34 Z" fill="#FB7185" stroke="#1E293B" strokeWidth="1.3" />
          </g>
        );
      case 'puestaEnComun-no-3': // Docente da conclusión hecha
        return (
          <g>
            <rect x="14" y="18" width="26" height="19" rx="2.5" fill="#FFE4E6" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M27 18 V37 M14 26 H40" stroke="#E11D48" strokeWidth="1.8" />
            <path d="M27 18 C22 12 18 16 24 18 M27 18 C32 12 36 16 30 18" fill="none" stroke="#E11D48" strokeWidth="1.7" />
          </g>
        );
      case 'puestaEnComun-no-4': // Calificar quién habla más
        return (
          <g>
            <rect x="13" y="29" width="5" height="9" rx="1" fill="#CBD5E1" stroke="#1E293B" strokeWidth="1.4" />
            <rect x="21" y="23" width="5" height="15" rx="1" fill="#FDA4AF" stroke="#1E293B" strokeWidth="1.4" />
            <rect x="29" y="15" width="5" height="23" rx="1" fill="#F43F5E" stroke="#1E293B" strokeWidth="1.4" />
            <path d="M37 16 C40 19 40 24 37 27" fill="none" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );

      // ================= 3. TRABAJO PERSONAL =================
      case 'trabajoPersonal-yes-0': // Problema que intenta solo
        return (
          <g>
            <circle cx="24" cy="17" r="4.5" fill="#FDE68A" stroke="#1E293B" strokeWidth="1.7" />
            <path d="M16 36 C16 29 32 29 32 36" fill="#34D399" stroke="#1E293B" strokeWidth="1.7" />
            <rect x="29" y="23" width="12" height="15" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.6" />
            <text x="35" y="34" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#059669">?</text>
          </g>
        );
      case 'trabajoPersonal-yes-1': // Guía con ¿por qué? ¿qué pasaría si...?
        return (
          <g>
            <rect x="13" y="12" width="26" height="28" rx="3" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M18 20 H34 M18 26 H30" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
            <circle cx="33" cy="31" r="6" fill="#D1FAE5" stroke="#1E293B" strokeWidth="1.5" />
            <text x="33" y="34" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#059669">?</text>
          </g>
        );
      case 'trabajoPersonal-yes-2': // Taller por niveles (básico, profundización, refuerzo)
        return (
          <g>
            <rect x="12" y="30" width="9" height="10" rx="1.5" fill="#BAE6FD" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="23" y="22" width="9" height="18" rx="1.5" fill="#6EE7B7" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="34" y="14" width="9" height="26" rx="1.5" fill="#10B981" stroke="#1E293B" strokeWidth="1.5" />
          </g>
        );
      case 'trabajoPersonal-yes-3': // Analizar caso, gráfica o noticia
        return (
          <g>
            <rect x="11" y="13" width="26" height="26" rx="2.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M15 31 L21 24 L26 28 L33 19" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
            <circle cx="33" cy="29" r="6" fill="#E0F2FE" stroke="#1E293B" strokeWidth="1.6" />
            <path d="M37.5 33.5 L42 38" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        );
      case 'trabajoPersonal-yes-4': // Explicación, mapa conceptual o esquema
        return (
          <g>
            <rect x="21" y="12" width="12" height="7" rx="2" fill="#6EE7B7" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="11" y="31" width="11" height="7" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="31" y="31" width="11" height="7" rx="2" fill="#FDE68A" stroke="#1E293B" strokeWidth="1.5" />
            <path d="M27 19 V25 M16.5 31 V25 H36.5 V31" fill="none" stroke="#1E293B" strokeWidth="1.6" />
          </g>
        );
      case 'trabajoPersonal-no-0': // Repetir el ejemplo del docente
        return (
          <g>
            <rect x="12" y="16" width="14" height="18" rx="2" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.6" />
            <rect x="28" y="16" width="14" height="18" rx="2" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.6" />
            <path d="M15 22 H23 M15 27 H21 M31 22 H39 M31 27 H37" stroke="#64748B" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M24 14 L29 14" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 'trabajoPersonal-no-1': // Copiar del tablero o libro
        return (
          <g>
            <rect x="11" y="12" width="22" height="14" rx="2" fill="#CBD5E1" stroke="#1E293B" strokeWidth="1.6" />
            <rect x="22" y="27" width="19" height="13" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.6" />
            <path d="M22 26 L26 30" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
            <path d="M26 33 H37" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
      case 'trabajoPersonal-no-2': // Solo ejercicios mecánicos de fórmula
        return (
          <g>
            <circle cx="24" cy="26" r="10" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.8" />
            <circle cx="24" cy="26" r="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.6" />
            <path d="M24 13 V16 M24 36 V39 M11 26 H14 M34 26 H37 M15 17 L17 19 M31 33 L33 35 M33 17 L31 19 M17 33 L15 35" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 'trabajoPersonal-no-3': // Trabajo en grupo disfrazado
        return (
          <g>
            <circle cx="20" cy="24" r="4" fill="#CBD5E1" stroke="#1E293B" strokeWidth="1.5" />
            <circle cx="32" cy="24" r="4" fill="#CBD5E1" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="15" y="29" width="22" height="10" rx="3" fill="#FFE4E6" stroke="#1E293B" strokeWidth="1.6" />
            <text x="26" y="37" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#E11D48">1?</text>
          </g>
        );
      case 'trabajoPersonal-no-4': // Tarea revisada sin retroalimentar
        return (
          <g>
            <path d="M13 24 L27 13 L41 24 V38 H13 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M22 30 H32" stroke="#94A3B8" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        );

      // ================= 4. TRABAJO GRUPAL =================
      case 'trabajoGrupal-yes-0': // Reto del colegio, barrio o ciudad
        return (
          <g>
            <rect x="12" y="20" width="14" height="19" rx="1.5" fill="#BAE6FD" stroke="#1E293B" strokeWidth="1.6" />
            <rect x="26" y="14" width="15" height="25" rx="1.5" fill="#A7F3D0" stroke="#1E293B" strokeWidth="1.6" />
            <rect x="30" y="19" width="3" height="3" fill="#FFFFFF" />
            <rect x="35" y="19" width="3" height="3" fill="#FFFFFF" />
            <rect x="16" y="25" width="3" height="3" fill="#FFFFFF" />
            <circle cx="19" cy="14" r="3" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.3" />
          </g>
        );
      case 'trabajoGrupal-yes-1': // Proyecto corto con producto
        return (
          <g>
            <rect x="12" y="14" width="24" height="24" rx="2.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.7" />
            <path d="M17 22 H31 M17 28 H25" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" />
            <polygon points="34,13 42,21 38,31 28,27" fill="#34D399" stroke="#1E293B" strokeWidth="1.6" />
          </g>
        );
      case 'trabajoGrupal-yes-2': // Cada integrante tiene un rol
        return (
          <g>
            <circle cx="19" cy="18" r="5" fill="#38BDF8" stroke="#1E293B" strokeWidth="1.6" />
            <circle cx="35" cy="18" r="5" fill="#10B981" stroke="#1E293B" strokeWidth="1.6" />
            <circle cx="19" cy="34" r="5" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.6" />
            <circle cx="35" cy="34" r="5" fill="#0D9488" stroke="#1E293B" strokeWidth="1.6" />
            <path d="M24 18 H30 M24 34 H30 M19 23 V29 M35 23 V29" stroke="#1E293B" strokeWidth="1.4" />
          </g>
        );
      case 'trabajoGrupal-yes-3': // Producto dirigido a alguien real
        return (
          <g>
            <rect x="11" y="19" width="13" height="14" rx="2" fill="#A7F3D0" stroke="#1E293B" strokeWidth="1.6" />
            <path d="M25 26 H32 M29.5 23 L32.5 26 L29.5 29" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
            <circle cx="38" cy="21" r="4" fill="#FDE68A" stroke="#1E293B" strokeWidth="1.5" />
            <path d="M33 35 C33 30 43 30 43 35" fill="#38BDF8" stroke="#1E293B" strokeWidth="1.5" />
          </g>
        );
      case 'trabajoGrupal-no-0': // Repartirse un taller y pegar las partes
        return (
          <g>
            <rect x="12" y="15" width="12" height="16" rx="1.5" fill="#FFE4E6" stroke="#1E293B" strokeWidth="1.6" />
            <rect x="28" y="21" width="12" height="16" rx="1.5" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.6" />
            <path d="M22 25 L30 23" stroke="#E11D48" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        );
      case 'trabajoGrupal-no-1': // Que uno trabaje y los demás firmen
        return (
          <g>
            <circle cx="18" cy="18" r="4" fill="#94A3B8" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="13" y="25" width="26" height="14" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.6" />
            <path d="M17 30 H24 M17 34 H33" stroke="#E11D48" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        );
      case 'trabajoGrupal-no-2': // Ejercicio de libro resuelto en grupo
        return (
          <g>
            <path d="M12 16 H26 V37 H12 Z M26 16 H40 V37 H26 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.7" />
            <text x="19" y="29" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#64748B">1+1</text>
            <path d="M30 23 H36 M30 28 H36" stroke="#94A3B8" strokeWidth="1.7" strokeLinecap="round" />
          </g>
        );
      case 'trabajoGrupal-no-3': // Exposición consultada en internet
        return (
          <g>
            <rect x="11" y="13" width="32" height="23" rx="2.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.7" />
            <path d="M11 19 H43" stroke="#1E293B" strokeWidth="1.5" />
            <circle cx="15" cy="16" r="1" fill="#E11D48" />
            <circle cx="19" cy="16" r="1" fill="#F59E0B" />
            <path d="M17 25 H35 M17 30 H29" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      // ================= 5. EVALUACIÓN =================
      case 'evaluacion-yes-0': // Prueba tipo Icfes en contexto de las 3 competencias
        return (
          <g>
            <rect x="12" y="12" width="28" height="28" rx="3" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <circle cx="19" cy="20" r="2.3" fill="#0D9488" />
            <circle cx="19" cy="27" r="2.3" fill="#10B981" />
            <circle cx="19" cy="34" r="2.3" fill="#F59E0B" />
            <path d="M24 20 H35 M24 27 H35 M24 34 H35" stroke="#1E293B" strokeWidth="1.7" strokeLinecap="round" />
          </g>
        );
      case 'evaluacion-yes-1': // Pregunta abierta que exija decidir o argumentar
        return (
          <g>
            <rect x="12" y="13" width="28" height="26" rx="2.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M17 20 H35 M17 25 H35 M17 30 H28" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M31 35 L39 27 L41 29 L33 37 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.3" />
          </g>
        );
      case 'evaluacion-yes-2': // Práctica de laboratorio evaluada
        return (
          <g>
            <path d="M17 13 V29 C17 33 23 33 23 29 V13 Z" fill="#A7F3D0" stroke="#1E293B" strokeWidth="1.7" />
            <rect x="26" y="16" width="15" height="22" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.7" />
            <path d="M29 23 L32 26 L37 21" fill="none" stroke="#059669" strokeWidth="1.9" strokeLinecap="round" />
            <path d="M29 31 H37" stroke="#94A3B8" strokeWidth="1.7" strokeLinecap="round" />
          </g>
        );
      case 'evaluacion-yes-3': // Caso para analizar y resolver
        return (
          <g>
            <path d="M11 16 H22 L25 19 H41 V37 H11 Z" fill="#FEF3C7" stroke="#1E293B" strokeWidth="1.7" strokeLinejoin="round" />
            <circle cx="29" cy="28" r="5.5" fill="#E0F2FE" stroke="#1E293B" strokeWidth="1.6" />
            <path d="M33 32 L37 36" stroke="#1E293B" strokeWidth="2.1" strokeLinecap="round" />
          </g>
        );
      case 'evaluacion-yes-4': // Autoevaluación y revisión de errores
        return (
          <g>
            <path
              d="M36 22 A10 10 0 1 0 37 31"
              fill="none"
              stroke="#059669"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <polygon points="37,16 39,23 32,22" fill="#059669" />
            <path d="M22 27 L26 31 L33 23" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 'evaluacion-no-0': // Examen solo de memoria o definiciones
        return (
          <g>
            <rect x="13" y="25" width="24" height="12" rx="2" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.6" />
            <rect x="15" y="18" width="24" height="11" rx="2" fill="#F1F5F9" stroke="#1E293B" strokeWidth="1.6" />
            <rect x="17" y="12" width="24" height="10" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.6" />
            <path d="M22 17 H35" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
      case 'evaluacion-no-1': // Preguntas sin relación con lo trabajado
        return (
          <g>
            <rect x="12" y="16" width="13" height="13" rx="2" fill="#CBD5E1" stroke="#1E293B" strokeWidth="1.6" />
            <rect x="30" y="22" width="13" height="13" rx="2" fill="#FFE4E6" stroke="#1E293B" strokeWidth="1.6" />
            <path d="M25 22 L30 28" stroke="#E11D48" strokeWidth="1.8" strokeDasharray="2 2" />
          </g>
        );
      case 'evaluacion-no-2': // Que no sepan antes qué se va a evaluar
        return (
          <g>
            <rect x="14" y="15" width="26" height="24" rx="3" fill="#FFE4E6" stroke="#1E293B" strokeWidth="1.8" />
            <text x="27" y="32" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#E11D48">?</text>
          </g>
        );
      case 'evaluacion-no-3': // Entregar la nota sin revisar qué se falló
      default:
        return (
          <g>
            <rect x="14" y="13" width="26" height="27" rx="2.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <text x="27" y="29" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#E11D48">2.5</text>
            <path d="M19 34 H35" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 56 56"
      className="h-13 w-13 shrink-0"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="52" height="52" rx="14" fill={bgFill} stroke={ringStroke} strokeWidth="1.5" />
      {renderArtwork()}
      <MiniBadge kind={kind} />
    </svg>
  );
};
