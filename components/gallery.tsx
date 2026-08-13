"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/config";

export const gallery = [
  [
    "sala-actividades",
    "Sala amplia de actividades",
    "Sala luminosa y flexible para compartir y participar.",
  ],
  [
    "comedor",
    "Comedor acogedor",
    "Un ambiente cómodo para disfrutar juntos la alimentación.",
  ],
  [
    "jardin",
    "Jardín accesible",
    "Vegetación y sombra para respirar y conversar al aire libre.",
  ],
  [
    "taller-arte",
    "Taller creativo",
    "Materiales ordenados y mesas amplias para crear.",
  ],
  ["lectura", "Zona de lectura", "Un rincón tranquilo para leer y conversar."],
  [
    "enfermeria",
    "Enfermería básica",
    "Un espacio privado, sereno y organizado.",
  ],
  [
    "bano-accesible",
    "Baños accesibles",
    "Diseñados para brindar apoyo, seguridad y autonomía.",
  ],
  [
    "recepcion",
    "Recepción cálida",
    "Una bienvenida cercana para usuarios y familias.",
  ],
] as const;
export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (active !== null) {
      closeRef.current?.focus();
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [active]);
  return (
    <>
      <div className="gallery-grid">
        {gallery.map(([slug, title, caption], index) => (
          <button
            className={`gallery-card gallery-${index + 1}`}
            key={slug}
            onClick={() => setActive(index)}
          >
            <Image
              src={assetPath(`/images/${slug}.webp`)}
              alt={`${title} conceptual de Vitalia: ${caption}`}
              fill
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            />
            <span>
              <strong>{title}</strong>
              <small>{caption}</small>
            </span>
          </button>
        ))}
      </div>
      <p className="reference-note">
        Imágenes conceptuales referenciales. Las instalaciones finales pueden
        presentar variaciones.
      </p>
      {active !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={gallery[active][1]}
          onMouseDown={(e) => e.target === e.currentTarget && setActive(null)}
        >
          <button
            ref={closeRef}
            onClick={() => setActive(null)}
            aria-label="Cerrar imagen"
          >
            <X />
          </button>
          <div className="lightbox-image">
            <Image
              src={assetPath(`/images/${gallery[active][0]}.webp`)}
              alt={gallery[active][2]}
              fill
              sizes="90vw"
            />
          </div>
          <p>
            <strong>{gallery[active][1]}</strong> · {gallery[active][2]}
          </p>
        </div>
      )}
    </>
  );
}
