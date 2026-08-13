"use client";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { track } from "./analytics";
import { siteConfig } from "@/lib/config";

// Label used to highlight the preferred plan. Changeable constant.
// NOTE: Use "Más solicitado" only when you have evidence from consultations or
// contracts that justify the label; otherwise change to "Plan recomendado".
const HIGHLIGHT_LABEL = "Más solicitado";

type Plan = {
  id: string;
  name: string;
  short: string;
  price: string;
  periodicity: string;
  schedule: string[];
  services: string[];
  conditions?: string[];
  note?: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "integral",
    name: "Vitalia Integral",
    short: "Acompañamiento completo durante toda la jornada.",
    price: "S/1,500",
    periodicity: "mensuales",
    schedule: ["Lunes a sábado", "8:00 a. m.–6:00 p. m."],
    services: [
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
    featured: true,
  },
  {
    id: "manana",
    name: "Vitalia Mañana",
    short: "Una mañana activa, estimulante y acompañada.",
    price: "S/850",
    periodicity: "mensuales",
    schedule: ["Lunes a sábado", "8:00 a. m.–1:00 p. m."],
    services: [
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
  },
  {
    id: "tarde",
    name: "Vitalia Tarde",
    short: "Compañía, creatividad y recreación durante la tarde.",
    price: "S/850",
    periodicity: "mensuales",
    schedule: ["Lunes a sábado", "1:00 p. m.–6:00 p. m."],
    services: [
      "Música, juegos y actividades sociales",
      "Talleres creativos",
      "Estimulación cognitiva",
      "Movilidad suave",
      "Alimentación correspondiente al turno",
      "Enfermería básica",
      "Recordatorio de medicamentos",
      "Comunicación con la familia",
    ],
  },
  {
    id: "flexible",
    name: "Vitalia Flexible",
    short: "Para familias que necesitan acompañamiento algunos días del mes.",
    price: "S/600",
    periodicity: "mensuales",
    schedule: ["12 turnos de mañana o tarde al mes"],
    services: [
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
  },
  {
    id: "ocasional",
    name: "Vitalia Ocasional",
    short: "Una alternativa para necesidades puntuales o para conocer el servicio.",
    price: "Medio día: S/55 · Día completo: S/90",
    periodicity: "Según disponibilidad",
    schedule: [],
    services: [
      "Actividades correspondientes al horario",
      "Alimentación correspondiente al turno",
      "Acompañamiento durante la estancia",
      "Enfermería básica",
      "Comunicación ante cualquier incidencia",
    ],
    conditions: [
      "Requiere evaluación inicial",
      "Requiere reserva previa",
      "Sujeto a disponibilidad",
      "No garantiza una plaza permanente",
    ],
  },
];

export function Pricing() {
  const ref = useRef<HTMLElement | null>(null);
  const [compareA, setCompareA] = useState(PLANS[0].id);
  const [compareB, setCompareB] = useState(PLANS[1].id);

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
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!siteConfig.showPricing) return null;

  const scrollToForm = (planName: string) => {
    const form = document.querySelector<HTMLFormElement>(".contact-form");
    const target = document.querySelector<HTMLElement>(`[data-interest="${planName}"]`);
    // set select value (the ContactForm listens to clicks with data-interest too)
    const select = document.querySelector<HTMLSelectElement>("#interest");
    if (select) select.value = planName;
    // smooth scroll and focus first invalid or first input
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        const invalid = form.querySelector<HTMLElement>(":invalid");
        const first = invalid ?? form.querySelector<HTMLElement>("input, select, textarea, button");
        first?.focus();
      }, 500);
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    track("plan_select", { plan: planName });
  };

  return (
    <section ref={ref} className="section pricing-section" id="plan">
      <div className="container">
        <div className="section-heading compact">
          <span className="eyebrow">Nuestros planes</span>
          <h2>Un plan para cada familia</h2>
          <p>Selecciona la frecuencia y el horario que mejor se adapten a las necesidades de tu familia.</p>
        </div>

        <div className="plans-grid" role="list">
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              role="listitem"
              className={`plan-card ${plan.featured ? "plan-featured" : ""}`}
              aria-labelledby={`plan-${plan.id}-title`}
            >
              {plan.featured && (
                <div className="plan-badge" aria-hidden="true">{HIGHLIGHT_LABEL}</div>
              )}
              <header>
                <h3 id={`plan-${plan.id}-title`}>{plan.name}</h3>
                <p className="plan-short">{plan.short}</p>
              </header>
              <div className="plan-price">
                <div className="price-amount">{plan.price}</div>
                <div className="price-period">{plan.periodicity}</div>
              </div>
              <div className="plan-schedule">
                {plan.schedule.map((s) => (
                  <div key={s} className="schedule-line">{s}</div>
                ))}
              </div>
              <ul className="plan-services">
                {plan.services.map((s) => (
                  <li key={s}>
                    <Check aria-hidden="true" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="plan-conditions">
                {(plan.conditions || []).map((c) => (
                  <small key={c}>{c}</small>
                ))}
              </div>
              <div className="plan-actions">
                <button
                  className={`btn ${plan.featured ? "btn-primary" : "btn-light"}`}
                  onClick={() => scrollToForm(plan.name)}
                  aria-label={`Solicitar información sobre ${plan.name}`}
                  data-interest={plan.name}
                >
                  Solicitar este plan
                </button>
                <button
                  className="btn btn-secondary small"
                  onClick={() => {
                    scrollToForm("Solicitar orientación");
                  }}
                >
                  No sé qué plan elegir
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="compare-section">
          <h3>Compara nuestros planes</h3>
          <div className="compare-wrapper">
            <div className="compare-table" role="table" aria-label="Comparador de planes">
              <div className="table-row header">
                <div className="col feature">Característica</div>
                {PLANS.map((p) => (
                  <div key={p.id} className={`col plan ${p.featured ? "highlight-col" : ""}`}>
                    <strong>{p.name}</strong>
                  </div>
                ))}
              </div>
              {[
                ["Lunes a sábado", (p: Plan) => (p.schedule.length ? (p.schedule.includes("Lunes a sábado") ? "Sí" : p.schedule.join(", ")) : "Según programación")],
                ["Jornada completa", (p: Plan) => (p.services.includes("Jornada completa") ? "Sí" : "No incluido")],
                ["Turno de mañana", (p: Plan) => (p.services.some(s=>/mañana/i.test(s)) || p.schedule.join(" ").includes("8:00 a. m." ) ? "Sí" : "No incluido")],
                ["Turno de tarde", (p: Plan) => (p.services.some(s=>/tarde/i.test(s)) || p.schedule.join(" ").includes("1:00 p. m." ) ? "Sí" : "No incluido")],
                ["Actividades físicas", (p: Plan) => (p.services.some(s=>/físic/i.test(s)) ? "Sí" : "No incluido")],
                ["Estimulación cognitiva", (p: Plan) => (p.services.some(s=>/cognit|memoria/i.test(s)) ? "Sí" : "No incluido")],
                ["Actividades sociales", (p: Plan) => (p.services.some(s=>/social/i.test(s)) ? "Sí" : "No incluido")],
                ["Alimentación", (p: Plan) => (p.services.some(s=>/Aliment|Desayuno|almuerzo|merienda/i.test(s)) ? "Sí" : "No incluido")],
                ["Enfermería básica", (p: Plan) => (p.services.includes("Enfermería básica") ? "Sí" : "No incluido")],
                ["Recordatorio de medicamentos", (p: Plan) => (p.services.some(s=>/medicamentos/i.test(s)) ? "Sí" : "No incluido")],
                ["Comunicación con la familia", (p: Plan) => (p.services.some(s=>/Comunicación/i.test(s)) ? "Sí" : "No incluido")],
                ["Salidas programadas", (p: Plan) => (p.services.some(s=>/Salidas|salidas/i.test(s)) ? "Sí" : "No incluido")],
                ["Reserva de plaza mensual", (p: Plan) => (p.id === "integral" || p.id === "flexible" ? "Sí" : "No incluido")],
                ["Sujeto a disponibilidad", (p: Plan) => (p.id === "flexible" || p.id === "ocasional" ? "Según programación" : "No")],
              ].map(([label, fn]) => (
                <div className="table-row" role="row" key={String(label)}>
                  <div className="col feature">{String(label)}</div>
                  {PLANS.map((p) => (
                        <div key={p.id} className="col plan" role="cell">
                          {String((fn as unknown as (q: Plan) => string)(p))}
                        </div>
                      ))}
                </div>
              ))}
            </div>

            <div className="mobile-compare">
              <label htmlFor="compare-a">Comparar: </label>
              <select id="compare-a" value={compareA} onChange={(e)=>setCompareA(e.target.value)}>
                {PLANS.map(p=> <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <label htmlFor="compare-b"> con </label>
              <select id="compare-b" value={compareB} onChange={(e)=>setCompareB(e.target.value)}>
                {PLANS.map(p=> <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <div className="mobile-compare-result">
                {(() => {
                  const a = PLANS.find(p=>p.id===compareA)!;
                  const b = PLANS.find(p=>p.id===compareB)!;
                  return (
                    <div>
                      <h4>{a.name} vs {b.name}</h4>
                      <ul>
                        <li>Precio: {a.price} — {b.price}</li>
                        <li>Horario: {a.schedule.join(" ")} — {b.schedule.join(" ")}</li>
                        <li>Servicios principales: {a.services.slice(0,3).join(", ")} — {b.services.slice(0,3).join(", ")}</li>
                      </ul>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          <div className="personalize">
            <h4>Personaliza tu plan</h4>
            <p>Puedes complementar cualquiera de nuestros planes con servicios adicionales, según evaluación y disponibilidad.</p>
            <ul className="addons">
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
              ].map(s=> <li key={s}>{s}</li>)}
            </ul>
            <p className="note">Los servicios adicionales no forman parte del precio mensual y se cotizan por separado.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
