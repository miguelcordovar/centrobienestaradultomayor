"use client";
import { CheckCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { track } from "./analytics";
import { siteConfig } from "@/lib/config";

// Label used to highlight the recommended plan. Change this constant if
// evidence (consultas / contrataciones) supports marking another plan.
// NOTE: Use "Más solicitado" only when you have evidence of demand.
export const RECOMMENDED_LABEL = "Más solicitado";

type PlanDef = {
  id: string; // internal key
  title: string;
  subtitle: string;
  price: string;
  periodicity: string;
  schedule?: string[];
  features: string[];
  conditions?: string[];
  highlight?: boolean;
  ctaInterest?: string; // value that ContactForm expects
  footnote?: string;
};

const PLANS: PlanDef[] = [
  {
    id: "integral",
    title: "Vitalia Integral",
    subtitle: "Acompañamiento completo durante toda la jornada.",
    price: "S/1,500",
    periodicity: "mensuales",
    schedule: ["Lunes a sábado", "8:00 a. m.–6:00 p. m."],
    features: [
      "Jornada completa",
      "Actividades físicas, cognitivas y recreativas",
      "Desayuno ligero, almuerzo y merienda",
      "Enfermería básica",
      "Recordatorio y registro de medicamentos",
      "Actividades sociales y talleres",
      "Comunicación periódica con la familia",
      "Salidas recreativas programadas",
    ],
    conditions: ["Ahorra S/200 frente a contratar mañana y tarde por separado"],
    highlight: true,
    ctaInterest: "Vitalia Integral",
  },
  {
    id: "manana",
    title: "Vitalia Mañana",
    subtitle: "Una mañana activa, estimulante y acompañada.",
    price: "S/850",
    periodicity: "mensuales",
    schedule: ["Lunes a sábado", "8:00 a. m.–1:00 p. m."],
    features: [
      "Activación física y movilidad",
      "Talleres de memoria",
      "Arte y manualidades",
      "Actividades sociales",
      "Desayuno ligero",
      "Alimentación correspondiente al turno",
      "Enfermería básica",
      "Recordatorio de medicamentos",
      "Comunicación con la familia",
    ],
    ctaInterest: "Mañana",
  },
  {
    id: "tarde",
    title: "Vitalia Tarde",
    subtitle: "Compañía, creatividad y recreación durante la tarde.",
    price: "S/850",
    periodicity: "mensuales",
    schedule: ["Lunes a sábado", "1:00 p. m.–6:00 p. m."],
    features: [
      "Música, juegos y actividades sociales",
      "Talleres creativos",
      "Estimulación cognitiva",
      "Movilidad suave",
      "Alimentación correspondiente al turno",
      "Enfermería básica",
      "Recordatorio de medicamentos",
      "Comunicación con la familia",
    ],
    ctaInterest: "Tarde",
  },
  {
    id: "flexible",
    title: "Vitalia Flexible",
    subtitle: "Para familias que necesitan acompañamiento algunos días del mes.",
    price: "S/600",
    periodicity: "mensuales",
    schedule: ["12 turnos de mañana o tarde al mes"],
    features: [
      "Elección de mañana o tarde",
      "Actividades correspondientes al turno",
      "Alimentación correspondiente al horario",
      "Enfermería básica",
      "Recordatorio de medicamentos",
      "Comunicación con la familia",
      "Programación anticipada de asistencia",
    ],
    conditions: [
      "Sujeto a disponibilidad de plazas",
      "Los turnos deben programarse previamente",
      "Los turnos no utilizados no se acumulan al mes siguiente",
      "Los cambios de fecha están sujetos a disponibilidad",
    ],
    ctaInterest: "Flexible",
  },
  {
    id: "ocasional",
    title: "Vitalia Ocasional",
    subtitle: "Una alternativa para necesidades puntuales o para conocer el servicio.",
    price: "Medio día: S/55 · Día completo: S/90",
    periodicity: "Según disponibilidad",
    features: [
      "Actividades correspondientes al horario",
      "Alimentación correspondiente al turno",
      "Acompañamiento durante la estancia",
      "Enfermería básica",
      "Comunicación ante cualquier incidencia",
    ],
    conditions: [
      "Requiere evaluación inicial",
      "Requiere reserva previa",
      "Está sujeto a disponibilidad",
      "No garantiza una plaza permanente",
    ],
    ctaInterest: "Día de experiencia",
  },
];

export function Pricing() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || sessionStorage.getItem("vm_price_seen")) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track("plan_view");
          sessionStorage.setItem("vm_price_seen", "1");
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!siteConfig.showPricing) return null;

  const openContactFor = (interest: string) => {
    track("plan_select", { plan: interest });
    const anchor = document.querySelector<HTMLAnchorElement>("a[href='#contacto']");
    // Scroll to contact section
    const contacto = document.getElementById("contacto");
    if (contacto) {
      contacto.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (anchor) {
      anchor.click();
    }
    // preselect the interest in the form
    setTimeout(() => {
      const select = document.querySelector<HTMLSelectElement>("#interest");
      if (select) {
        // Map long names to the form options where needed
        const mapping: Record<string, string> = {
          "Vitalia Integral": "Vitalia Integral",
          "Mañana": "Mañana",
          "Tarde": "Tarde",
          "Flexible": "Flexible",
          "Día de experiencia": "Día de experiencia",
          "Solicitar orientación": "Solicitar más información",
        };
        const v = mapping[interest] ?? interest;
        select.value = v;
        // focus first required empty field
        const first = document.querySelector<HTMLElement>(
          "#contacto [required]:not([value])",
        );
        if (first) first.focus();
      }
    }, 300);
  };

  return (
    <section ref={ref} className="section plans-section" id="plan">
      <div className="container">
        <div className="section-heading compact">
          <span className="eyebrow">Un plan para cada familia</span>
          <h2>Selecciona la frecuencia y el horario que mejor se adapten a las necesidades de tu familia.</h2>
        </div>

        <div className="plans-grid" role="list">
          {PLANS.map((p) => (
            <article
              role="listitem"
              key={p.id}
              className={`plan-card ${p.highlight ? "plan-highlight" : ""}`}
              aria-label={p.title}
            >
              {p.highlight && (
                <div className="plan-badge" aria-hidden="true">{RECOMMENDED_LABEL}</div>
              )}
              <header>
                <h3>{p.title}</h3>
                <p className="muted">{p.subtitle}</p>
              </header>
              <div className="plan-price" aria-hidden>
                <strong>{p.price}</strong>
                <span className="periodicity">{p.periodicity}</span>
              </div>
              <div className="plan-schedule">
                {p.schedule?.map((s) => (
                  <div key={s} className="schedule-line">
                    {s}
                  </div>
                ))}
              </div>
              <ul className="plan-features">
                {p.features.map((f) => (
                  <li key={f}>
                    <CheckCircle aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {p.conditions && (
                <div className="plan-conditions">
                  {p.conditions.map((c) => (
                    <div key={c} className="condition-item">
                      {c}
                    </div>
                  ))}
                </div>
              )}
              <div className="plan-actions">
                <button
                  className={`btn ${p.highlight ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => openContactFor(p.ctaInterest ?? p.title)}
                  aria-label={`Solicitar información sobre ${p.title}`}
                  style={{ minWidth: 160 }}
                >
                  Solicitar este plan
                </button>
                {!p.highlight && (
                  <button
                    className="btn btn-ghost"
                    onClick={() => openContactFor("Solicitar orientación")}
                    aria-label={`Solicitar orientación sobre ${p.title}`}
                  >
                    No sé qué plan elegir
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="compare-block">
          <h3>Compara nuestros planes</h3>
          <div className="compare-table-wrap">
            <table className="compare-table" role="table">
              <thead>
                <tr>
                  <th scope="col">Característica</th>
                  {PLANS.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className={p.highlight ? "highlight-col" : undefined}
                    >
                      {p.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Lunes a sábado", "incl", "incl", "incl", "según programación", "según programación"],
                  ["Jornada completa", "incl", "No incluido", "No incluido", "No incluido", "No incluido"],
                  ["Turno de mañana", "incl", "incl", "No incluido", "opcional", "opcional"],
                  ["Turno de tarde", "incl", "No incluido", "incl", "opcional", "opcional"],
                  ["Actividades físicas", "incl", "incl", "incl", "incl", "incl"],
                  ["Estimulación cognitiva", "incl", "incl", "incl", "incl", "incl"],
                  ["Actividades sociales", "incl", "incl", "incl", "incl", "incl"],
                  ["Alimentación", "incl", "incl", "incl", "incl", "incl"],
                  ["Enfermería básica", "incl", "incl", "incl", "incl", "incl"],
                  ["Recordatorio de medicamentos", "incl", "incl", "incl", "incl", "incl"],
                  ["Comunicación con la familia", "incl", "incl", "incl", "incl", "incl"],
                  ["Salidas programadas", "incl", "No incluido", "No incluido", "No incluido", "No incluido"],
                  ["Reserva de plaza mensual", "sí", "sí", "sí", "sujeto a disponibilidad", "sujeto a disponibilidad"],
                  ["Sujeto a disponibilidad", "No", "No", "No", "Sí", "Sí"],
                ].map((row) => (
                  <tr key={String(row[0])}>
                    <th scope="row">{row[0]}</th>
                    {row.slice(1).map((cell, i) => (
                      <td key={i}>
                        {cell === "incl" ? (
                          <span className="check">Incluido</span>
                        ) : cell === "opcional" ? (
                          <span>Según programación</span>
                        ) : (
                          <span className="muted">{cell}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="services-additional">
          <h4>Personaliza tu plan</h4>
          <p>Puedes complementar cualquiera de nuestros planes con servicios adicionales, según evaluación y disponibilidad.</p>
          <ul className="additional-list">
            {[
              "Transporte",
              "Consulta geriátrica",
              "Psicología individual",
              "Terapia física individual",
              "Nutrición personalizada",
              "Dietas especiales",
              "Acompañamiento individual",
              "Salidas con entradas o consumos especiales",
              "Pañales, medicamentos e insumos personales",
            ].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="small-note">Los servicios adicionales no forman parte del precio mensual y se cotizan por separado.</p>
        </div>
      </div>
    </section>
  );
}
