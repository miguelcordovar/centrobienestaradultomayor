"use client";
import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { CalendarDays, Clock3, Utensils, Users } from "@/components/icons";
import PLANS_DATA, { PlanData } from "@/lib/plans";
import { track } from "./analytics";
import { siteConfig } from "@/lib/config";

// Label used to highlight the recommended plan. Change this constant if
// evidence (consultas / contrataciones) supports marking another plan.
// NOTE: Use "Más solicitado" only when you have evidence of demand.
// Editable label for the highlighted plan. Change to "Más solicitado" later if needed.
export const RECOMMENDED_LABEL = "Plan recomendado";

const PLANS: PlanData[] = PLANS_DATA;

export function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const [selectedShifts, setSelectedShifts] = useState<Record<string, string>>({ medio: "Mañana" });

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
              className={`plan-card ${p.badge ? "plan-highlight" : ""}`}
              aria-label={p.name}
            >
              <div className="plan-badge" aria-hidden={p.badge ? "false" : "true"}>
                {p.badge ? RECOMMENDED_LABEL : "\u00A0"}
              </div>
              <header>
                <h3>{p.name}</h3>
                <p className="muted">{p.shortDescription}</p>
              </header>
              <div className="plan-price" aria-hidden>
                <strong>{p.price}</strong>
                {p.priceDetail && <span className="periodicity">{p.priceDetail}</span>}
              </div>
              <ul className="plan-features">
                <li>
                  <CalendarDays aria-hidden className="ic" />
                  <span>{p.basicFeatures[0]}</span>
                </li>
                <li>
                  <Clock3 aria-hidden className="ic" />
                  <span>
                    {p.basicFeatures[1]}
                  </span>
                </li>
                <li>
                  <Utensils aria-hidden className="ic" />
                  <span>{p.basicFeatures[2]}</span>
                </li>
                <li>
                  <Users aria-hidden className="ic" />
                  <span>{p.basicFeatures[3]}</span>
                </li>
              </ul>


              <div className="plan-actions">
                <button
                  className={`btn ${p.badge ? "btn-primary" : "btn-secondary"} plan-button`}
                  onClick={() => {
                    let interest = p.name;
                    if (p.id === "medio") {
                      const turno = selectedShifts[p.id] ?? "Mañana";
                      interest = `Vitalia Medio Turno – ${turno}`;
                    } else if (p.id === "ocasional") {
                      interest = "Vitalia Ocasional – Medio turno";
                    }
                    openContactFor(interest);
                  }}
                  aria-label={`Contratar ${p.name}`}
                >
                  Contratar
                </button>
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
                        className={p.badge ? "highlight-col" : undefined}
                      >
                        {p.name}
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
                  <td>{PLANS[0].frequency}</td>
                  <td>{PLANS[1].frequency}</td>
                  <td>{PLANS[2].frequency}</td>
                  <td>{PLANS[3].frequency}</td>
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
                  <td><CalendarDays color="#6B7280" size={20} aria-hidden /><span className="visually-hidden">Según programación</span></td>
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
