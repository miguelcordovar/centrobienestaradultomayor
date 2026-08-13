import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const metadata = { title: "Política de privacidad | Vitalia" };

export default function Privacy() {
  return (
    <main className="legal">
      <div className="legal-wrap">
        <Link href="/" className="back">
          ← Volver a Vitalia
        </Link>
        <span className="eyebrow">Documento provisional</span>
        <h1>Política de privacidad</h1>
        <p>Última actualización: agosto de 2026.</p>
        <h2>1. Responsable y finalidad</h2>
        <p>
          Vitalia tratará los datos enviados en sus formularios para responder
          consultas, coordinar visitas y, solo si se autoriza, compartir
          novedades. Los datos definitivos del responsable se publicarán antes
          del lanzamiento comercial.
        </p>
        <h2>2. Datos recopilados</h2>
        <p>
          Recopilamos datos de contacto, vínculo familiar, distrito, edad
          aproximada, interés y el comentario proporcionado. No solicitamos
          diagnósticos, historia clínica ni medicamentos mediante el formulario
          público.
        </p>
        <h2>3. Base y conservación</h2>
        <p>
          El tratamiento se basa en el consentimiento otorgado. Conservaremos la
          información únicamente durante el tiempo necesario para atender la
          solicitud y cumplir obligaciones aplicables.
        </p>
        <h2>4. Proveedores y seguridad</h2>
        <p>
          Podemos utilizar proveedores tecnológicos para alojar el sitio,
          almacenar solicitudes, prevenir spam y enviar comunicaciones. Aplicamos
          controles razonables y no vendemos información personal.
        </p>
        <h2>5. Derechos</h2>
        <p>
          Puedes solicitar acceso, rectificación, cancelación u oposición
          mediante{" "}
          {siteConfig.email ? (
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          ) : (
            "el canal de contacto que se publique antes del lanzamiento"
          )}
          .
        </p>
        <h2>6. Cookies</h2>
        <p>
          Las cookies esenciales permiten el funcionamiento del sitio. La
          analítica se activa únicamente con autorización.
        </p>
        <p className="legal-note">
          Este texto es provisional y deberá ser revisado por asesoría legal
          peruana antes de publicar el servicio.
        </p>
      </div>
    </main>
  );
}
