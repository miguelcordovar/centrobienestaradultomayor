"use client";
import { useEffect, useState } from "react";
export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const consentCheck = window.setTimeout(
      () => setShow(!document.cookie.includes("vm_consent=")),
      0,
    );
    return () => window.clearTimeout(consentCheck);
  }, []);
  const choose = (analytics: boolean) => {
    document.cookie = `vm_consent=yes;path=/;max-age=31536000;SameSite=Lax`;
    document.cookie = `vm_analytics=${analytics ? "yes" : "no"};path=/;max-age=31536000;SameSite=Lax`;
    setShow(false);
    if (analytics) location.reload();
  };
  if (!show) return null;
  return (
    <aside className="cookie" aria-label="Preferencias de cookies">
      <div>
        <strong>Tu privacidad importa</strong>
        <p>
          Usamos cookies esenciales para el sitio. Con tu permiso, usamos
          analítica para mejorar la experiencia.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="btn btn-ghost" onClick={() => choose(false)}>
          Solo necesarias
        </button>
        <button className="btn btn-primary" onClick={() => choose(true)}>
          Aceptar analítica
        </button>
      </div>
    </aside>
  );
}
