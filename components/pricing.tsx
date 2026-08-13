"use client";
import { CheckCircle, Check, X, Calendar } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { track } from "./analytics";
import { siteConfig } from "@/lib/config";

// Label used to highlight the recommended plan. Change this constant if
// evidence (consultas / contrataciones) supports marking another plan.
// NOTE: Use "Más solicitado" only when you have evidence of demand.
// Editable label for the highlighted plan. Change to "Más solicitado" later if needed.
export const RECOMMENDED_LABEL = "Plan recomendado";

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
    price: "S/1,500 al mes",
    periodicity: "Lunes a sábado",
    schedule: ["8:00 a. m.–6:00 p. m."],
    features: [
      "Jornada completa",
      "Actividades físicas, cognitivas y recreativas",
      "Desayuno ligero, almuerzo y merienda",
      "Enfermería básica",
      "Recordatorio de medicamentos",
      "Comunicación con la familia",
      "Salidas programadas",
    ],
    highlight: true,
    ctaInterest: "Vitalia Integral",
  },
  {
    id: "medio",
    title: "Vitalia Medio Turno",
    subtitle: "Turno mañana o tarde según tu preferencia.",
    price: "S/850 al mes",
    periodicity: "Lunes a sábado",
    schedule: ["Mañana: 8:00 a. m.–1:00 p. m.", "Tarde: 1:00 p. m.–6:00 p. m."],
    features: [
      "Actividades correspondientes al turno",
      "Activación física",
      "Estimulación cognitiva",
      "Actividades sociales y recreativas",
      "Alimentación correspondiente al horario",
      "Enfermería básica",
      "Recordatorio de medicamentos",
      "Comunicación con la familia",
    ],
    ctaInterest: "Vitalia Medio Turno",
  },
  {
    id: "flexible",
    title: "Vitalia Flexible",
    subtitle: "12 medios turnos mensuales; requiere programación.",
    price: "S/600 al mes",
    periodicity: "12 turnos al mes",
    schedule: ["Mañana: 8:00 a. m.–1:00 p. m.", "Tarde: 1:00 p. m.–6:00 p. m."],
    features: [
      "Elección de mañana o tarde",
      "Actividades correspondientes al turno",
      "Requiere programación anticipada",
      "Sujeto a disponibilidad",
    ],
    ctaInterest: "Vitalia Flexible",
  },
  {
    id: "ocasional",
    title: "Vitalia Ocasional",
    subtitle: "Atención mediante reserva; medio turno o día completo.",
    price: "Medio turno: S/55 · Día completo: S/90",
    periodicity: "Según reserva",
    schedule: ["Mañana: 8:00 a. m.–1:00 p. m.", "Tarde: 1:00 p. m.–6:00 p. m.", "Día completo: 8:00 a. m.–6:00 p. m."],
    features: [
      "Requiere evaluación inicial",
      "Requiere reserva previa",
      "Sujeto a disponibilidad",
    ],
    ctaInterest: "Vitalia Ocasional",
  },
];

export function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const [selectedShifts, setSelectedShifts] = useState<Record<string, string>>({ medio: "Mañana" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<PlanDef | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

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

  // Modal escape handler must be registered unconditionally so hooks order is stable
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) {
        setModalOpen(false);
        if (lastFocused.current) lastFocused.current.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  if (!siteConfig.showPricing) return null;

  const openContactFor = (interest: string) => {
    track("plan_select", { plan: interest });
    const contacto = document.getElementById("contacto");
    const anchor = document.querySelector<HTMLAnchorElement>("a[href='#contacto']");
    if (contacto) contacto.scrollIntoView({ behavior: "smooth", block: "center" });
    else if (anchor) anchor.click();

    setTimeout(() => {
      const select = document.querySelector<HTMLSelectElement>("#interest");
      if (select) {
        // Set the select value directly to match the new labels in the form
        select.value = interest;
        const first = document.querySelector<HTMLElement>("#contacto [required]:not([value=''])");
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

              {p.id === "medio" && (
                <fieldset className="field-turno" aria-label="Elige turno">
                  <legend className="visually-hidden">Elige turno</legend>
                  <label className="turno-option">
                    <input
                      type="radio"
                      name={`turno-${p.id}`}
                      defaultChecked
                      onChange={() => setSelectedShifts({ ...selectedShifts, [p.id]: "Mañana" })}
                    />
                    <span>Turno mañana — 8:00 a. m.–1:00 p. m.</span>
                  </label>
                  <label className="turno-option">
                    <input
                      type="radio"
                      name={`turno-${p.id}`}
                      onChange={() => setSelectedShifts({ ...selectedShifts, [p.id]: "Tarde" })}
                    />
                    <span>Turno tarde — 1:00 p. m.–6:00 p. m.</span>
                  </label>
                </fieldset>
              )}

              <div className="plan-actions">
                <button
                  className={`btn ${p.highlight ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => {
                    let interest = p.ctaInterest ?? p.title;
                    if (p.id === "medio") {
                      const turno = selectedShifts[p.id] ?? "Mañana";
                      interest = `Vitalia Medio Turno – ${turno}`;
                    } else if (p.id === "ocasional") {
                      interest = "Vitalia Ocasional – Medio turno";
                    }
                    openContactFor(interest);
                  }}
                  aria-label={`Solicitar ${p.title}`}
                  style={{ minWidth: 160 }}
                >
                  Solicitar
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={(e) => {
                    lastFocused.current = e.currentTarget as HTMLElement;
                    setModalContent(p);
                    setModalOpen(true);
                  }}
                  aria-label={`Mayor información sobre ${p.title}`}
                >
                  Mayor información
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Modal: mayor información */}
        {modalOpen && modalContent && (
          <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`Información: ${modalContent.title}`}>
            <div className="modal" role="document">
              <header>
                <h3>{modalContent.title}</h3>
                <button className="modal-close" onClick={() => { setModalOpen(false); if (lastFocused.current) lastFocused.current.focus(); }} aria-label="Cerrar">✕</button>
              </header>
              <div className="modal-body">
                <p className="muted">{modalContent.subtitle}</p>
                <ul>
                  {modalContent.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {modalContent.conditions && (
                  <div className="muted">
                    {modalContent.conditions.map((c) => (
                      <div key={c}>{c}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

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
                <tr>
                  <th scope="row">Precio</th>
                  <td>{PLANS[0].price}</td>
                  <td>{PLANS[1].price}</td>
                  <td>{PLANS[2].price}</td>
                  <td>{PLANS[3].price}</td>
                </tr>
                <tr>
                  <th scope="row">Frecuencia</th>
                  <td>{PLANS[0].periodicity}</td>
                  <td>{PLANS[1].periodicity}</td>
                  <td>{PLANS[2].periodicity}</td>
                  <td>{PLANS[3].periodicity}</td>
                </tr>
                <tr>
                  <th scope="row">Horario</th>
                  <td>{PLANS[0].schedule?.[0]}</td>
                  <td>Mañana o tarde</td>
                  <td>Mañana o tarde</td>
                  <td>Medio turno o día completo</td>
                </tr>
                <tr>
                  <th scope="row">Actividades grupales</th>
                  <td><Check color="#176B73" size={20} aria-hidden /><span className="visually-hidden">Incluido</span></td>
                  <td><Check color="#176B73" size={20} aria-hidden /><span className="visually-hidden">Incluido</span></td>
                  <td><Check color="#176B73" size={20} aria-hidden /><span className="visually-hidden">Incluido</span></td>
                  <td><Check color="#176B73" size={20} aria-hidden /><span className="visually-hidden">Incluido</span></td>
                </tr>
                <tr>
                  <th scope="row">Alimentación</th>
                  <td>Jornada completa</td>
                  <td>Según turno</td>
                  <td>Según turno</td>
                  <td>Según estancia</td>
                </tr>
                <tr>
                  <th scope="row">Enfermería básica</th>
                  <td><Check color="#176B73" size={20} aria-hidden /><span className="visually-hidden">Incluido</span></td>
                  <td><Check color="#176B73" size={20} aria-hidden /><span className="visually-hidden">Incluido</span></td>
                  <td><Check color="#176B73" size={20} aria-hidden /><span className="visually-hidden">Incluido</span></td>
                  <td><Check color="#176B73" size={20} aria-hidden /><span className="visually-hidden">Incluido</span></td>
                </tr>
                <tr>
                  <th scope="row">Comunicación familiar</th>
                  <td><Check color="#176B73" size={20} aria-hidden /><span className="visually-hidden">Incluido</span></td>
                  <td><Check color="#176B73" size={20} aria-hidden /><span className="visually-hidden">Incluido</span></td>
                  <td><Check color="#176B73" size={20} aria-hidden /><span className="visually-hidden">Incluido</span></td>
                  <td><span className="muted">Ante incidencias</span></td>
                </tr>
                <tr>
                  <th scope="row">Reserva mensual de plaza</th>
                  <td><Check color="#176B73" size={20} aria-hidden /><span className="visually-hidden">Incluido</span></td>
                  <td><Check color="#176B73" size={20} aria-hidden /><span className="visually-hidden">Incluido</span></td>
                  <td><Calendar color="#6B7280" size={20} aria-hidden /><span className="visually-hidden">Según programación</span></td>
                  <td><X color="#6B7280" size={20} aria-hidden /><span className="visually-hidden">No incluido</span></td>
                </tr>
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
