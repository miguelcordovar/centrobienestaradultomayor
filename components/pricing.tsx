"use client";
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import { track } from "./analytics";
import { siteConfig } from "@/lib/config";
export function Pricing() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || sessionStorage.getItem("vm_price_seen")) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track("pricing_view");
          sessionStorage.setItem("vm_price_seen", "1");
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!siteConfig.showPricing) return null;

  return (
    <section ref={ref} className="section pricing-section" id="plan">
      <div className="container">
        <div className="pricing-card">
          <div className="price-copy">
            <span className="eyebrow">Una propuesta clara</span>
            <h2>Plan Vitalia Integral</h2>
            <p className="price">
              <span>Precio regular</span>
              {siteConfig.regularPrice}
              <small> mensuales</small>
            </p>
            <div className="launch">
              <strong>Plan recomendado</strong>
              <span>{siteConfig.launchPrice} mensuales por la atención completa.</span>
            </div>
          </div>
          <ul>
            {[
              "Lunes a sábado",
              "8:00 a. m.–6:00 p. m.",
              "Alimentación",
              "Enfermería básica",
              "Actividades y talleres",
              "Salidas programadas",
              "Comunicación con la familia",
            ].map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="price-action">
            <p>
              El transporte, medicamentos, pañales, dietas especiales y terapias
              individuales se cotizan por separado.
            </p>
            <a className="btn btn-gold" href="#contacto" data-interest="Vitalia Integral">
              Quiero recibir información
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
