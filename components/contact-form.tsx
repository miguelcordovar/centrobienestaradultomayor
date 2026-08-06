"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { track } from "./analytics";
import { pagePath } from "@/lib/config";

type Errors = Record<string, string>;
const interests = [
  "Jornada completa",
  "Día de experiencia",
  "Transporte",
  "Solicitar más información",
];
export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Errors>({});
  const started = useRef(false);
  const submitted = useRef(false);
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const leadsEndpoint = process.env.NEXT_PUBLIC_LEADS_ENDPOINT;
  useEffect(() => {
    const preselect = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-interest]",
      );
      if (target?.dataset.interest)
        setTimeout(() => {
          const select = document.querySelector<HTMLSelectElement>("#interest");
          if (select) select.value = target.dataset.interest!;
        }, 0);
    };
    document.addEventListener("click", preselect);
    return () => document.removeEventListener("click", preselect);
  }, []);
  useEffect(() => {
    const abandon = () => {
      if (started.current && !submitted.current) track("form_abandon");
    };
    window.addEventListener("beforeunload", abandon);
    return () => window.removeEventListener("beforeunload", abandon);
  }, []);
  const begin = () => {
    if (!started.current) {
      started.current = true;
      track("form_start");
    }
  };
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setErrors({});
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const payload = {
      ...data,
      age: Number(data.age),
      consent: data.consent === "on",
      newsletter: data.newsletter === "on",
      source: location.href,
      turnstileToken: data["cf-turnstile-response"] || "",
      utm: Object.fromEntries(
        Array.from(new URLSearchParams(location.search).entries()).filter(
          ([k]) => k.startsWith("utm_"),
        ),
      ),
    };
    try {
      if (!leadsEndpoint) {
        throw new Error(
          "El canal de contacto aún no está configurado. Inténtalo más tarde.",
        );
      }
      const response = await fetch(leadsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.fields) setErrors(result.fields);
        throw new Error(result.message || "No pudimos enviar tu solicitud.");
      }
      submitted.current = true;
      setStatus("success");
      track("form_submit", { interest: data.interest });
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrors((old) => ({
        ...old,
        form:
          error instanceof Error
            ? error.message
            : "Ocurrió un error. Inténtalo nuevamente.",
      }));
    }
  }
  if (status === "success")
    return (
      <div className="form-success" role="status">
        <span aria-hidden="true">✓</span>
        <h3>¡Gracias por contactar a VivaMayor!</h3>
        <p>
          Hemos recibido tu solicitud. Nuestro equipo se comunicará contigo
          dentro del horario de atención.
        </p>
        <button className="btn btn-secondary" onClick={() => setStatus("idle")}>
          Enviar otra consulta
        </button>
      </div>
    );
  const fieldError = (name: string) =>
    errors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {errors[name]}
      </span>
    ) : null;
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onFocus={begin}
      noValidate
      aria-describedby={errors.form ? "form-error" : undefined}
    >
      {errors.form && (
        <div id="form-error" className="form-error" role="alert">
          {errors.form}
        </div>
      )}
      <div className="field full">
        <label htmlFor="name">
          Nombre y apellidos del familiar responsable *
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {fieldError("name")}
      </div>
      <div className="field">
        <label htmlFor="whatsapp">Número de WhatsApp *</label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Ej. 987 654 321"
          required
          aria-invalid={!!errors.whatsapp}
        />
        {fieldError("whatsapp")}
      </div>
      <div className="field">
        <label htmlFor="email">Correo electrónico *</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={!!errors.email}
        />
        {fieldError("email")}
      </div>
      <div className="field">
        <label htmlFor="district">Distrito de residencia *</label>
        <input
          id="district"
          name="district"
          autoComplete="address-level2"
          required
          aria-invalid={!!errors.district}
        />
        {fieldError("district")}
      </div>
      <div className="field">
        <label htmlFor="relationship">
          Relación con la persona adulta mayor *
        </label>
        <select id="relationship" name="relationship" defaultValue="" required>
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option>Hija o hijo</option>
          <option>Pareja</option>
          <option>Otro familiar</option>
          <option>Persona interesada</option>
          <option>Otro vínculo</option>
        </select>
        {fieldError("relationship")}
      </div>
      <div className="field">
        <label htmlFor="age">Edad aproximada *</label>
        <input
          id="age"
          name="age"
          type="number"
          inputMode="numeric"
          min="55"
          max="110"
          required
        />
        {fieldError("age")}
      </div>
      <div className="field">
        <label htmlFor="interest">Servicio de interés *</label>
        <select
          id="interest"
          name="interest"
          defaultValue="Solicitar más información"
          required
        >
          {interests.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        {fieldError("interest")}
      </div>
      <div className="field full">
        <label htmlFor="contactTime">
          ¿En qué horario prefieres que te contactemos? *
        </label>
        <select id="contactTime" name="contactTime" defaultValue="" required>
          <option value="" disabled>
            Selecciona un horario
          </option>
          <option>8:00 a. m.–12:00 p. m.</option>
          <option>12:00 p. m.–3:00 p. m.</option>
          <option>3:00 p. m.–6:00 p. m.</option>
        </select>
        {fieldError("contactTime")}
      </div>
      <div className="field full">
        <label htmlFor="comment">Comentario o consulta</label>
        <textarea
          id="comment"
          name="comment"
          rows={5}
          maxLength={1000}
          placeholder="Cuéntanos brevemente qué información necesitas. No incluyas diagnósticos ni información médica sensible."
        />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">No completar</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="check full">
        <input type="checkbox" name="consent" required />
        <span>
          Acepto el tratamiento de mis datos para que VivaMayor responda mi
          solicitud. He leído la{" "}
          <a href={pagePath("/privacidad/")}>Política de privacidad</a>. *
        </span>
      </label>
      {fieldError("consent")}
      <label className="check full">
        <input type="checkbox" name="newsletter" />
        <span>
          Deseo inscribirme en la lista de familias interesadas y recibir
          novedades de VivaMayor.
        </span>
      </label>
      {turnstileKey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="lazyOnload"
          />
          <div
            className="cf-turnstile full"
            data-sitekey={turnstileKey}
            data-theme="light"
          />
        </>
      )}
      <button
        className="btn btn-primary submit full"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Enviando…" : "Solicitar información"}
      </button>
      <p className="form-privacy full">
        Tus datos se envían de forma segura. No solicitamos información clínica
        en este formulario.
      </p>
    </form>
  );
}
