import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface InfographicModalProps {
  image: {
    src: string;
    title: string;
    alt: string;
  } | null;
  onClose: () => void;
}

export const InfographicModal: React.FC<InfographicModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    if (!image) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D241B]/65 p-4 backdrop-blur-md sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bio-glass relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-white/90"
      >
        <div className="flex items-center justify-between gap-4 border-b border-emerald-500/20 px-5 py-3.5">
          <h3 className="font-display text-sm font-bold text-[#14261E] sm:text-base">
            {image.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar imagen ampliada"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-white text-[#335144] transition-colors hover:border-[#059669] hover:text-[#059669]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[calc(92vh-60px)] overflow-auto bg-[#F4F7F5]/75 p-3 sm:p-5">
          <img
            src={image.src}
            alt={image.alt}
            className="mx-auto h-auto max-w-full rounded-xl border border-emerald-500/20 bg-white"
          />
        </div>
      </div>
    </div>
  );
};
