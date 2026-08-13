import Link from "next/link";

export const metadata = { title: "Términos del servicio | Vitalia" };

export default function Terms() {
  return (
    <main className="legal">
      <div className="legal-wrap">
        <Link href="/" className="back">
          ← Volver a Vitalia
        </Link>
        <span className="eyebrow">Documento provisional</span>
        <h1>Términos del servicio</h1>
        <p>Última actualización: agosto de 2026.</p>
        <h2>1. Información general</h2>
        <p>
          Este sitio presenta la propuesta de Vitalia, un centro diurno de
          bienestar para personas mayores en Piura. No ofrece residencia
          permanente ni reemplaza atención médica.
        </p>
        <h2>2. Evaluación de admisión</h2>
        <p>
          Toda solicitud está sujeta a una evaluación previa para confirmar que
          las necesidades de la persona pueden atenderse de forma segura dentro
          del alcance del centro.
        </p>
        <h2>3. Servicios y tarifas</h2>
        <p>
          La programación es referencial y puede variar. Los servicios
          adicionales y condiciones definitivas se comunicarán antes de cualquier
          contratación.
        </p>
        <h2>4. Contenido</h2>
        <p>
          Las imágenes de instalaciones son conceptuales y pueden diferir del
          local final. La información del sitio no constituye una promesa médica
          ni terapéutica.
        </p>
        <h2>5. Emergencias</h2>
        <p>
          Vitalia aplicará su protocolo, contactará a la familia y coordinará la
          atención que corresponda. Los detalles se establecerán en el contrato
          del servicio.
        </p>
        <p className="legal-note">
          Estos términos son provisionales y deberán revisarse y completarse
          antes del lanzamiento comercial.
        </p>
      </div>
    </main>
  );
}
