import Image from "next/image";
import { Header } from "@/components/header";
import { Gallery } from "@/components/gallery";
import { ContactForm } from "@/components/contact-form";
import { Pricing } from "@/components/pricing";
import { Analytics } from "@/components/analytics";
import { CookieBanner } from "@/components/cookie-banner";
import {
  Activity,
  Apple,
  BellRing,
  BookOpen,
  Brain,
  CalendarDays,
  ClipboardList,
  Clock3,
  HeartHandshake,
  MessageCircle,
  Palette,
  ShieldCheck,
  Sparkles,
  Users,
  Utensils,
} from "@/components/icons";
import { assetPath, pagePath, siteConfig, whatsappHref } from "@/lib/config";

const services = [
  [
    Users,
    "Evaluación inicial de admisión",
    "Se realiza una valoración previa para confirmar el mejor plan y la atención adecuada.",
  ],
  [
    HeartHandshake,
    "Acompañamiento durante la jornada",
    "Ritmo cálido, cercano y respetuoso para cada usuario.",
  ],
  [
    ShieldCheck,
    "Enfermería básica",
    "Supervisión y apoyo dentro del alcance del centro.",
  ],
  [
    BellRing,
    "Recordatorio y registro de medicamentos",
    "Seguimiento según indicaciones de la familia y protocolo del centro.",
  ],
  [
    Activity,
    "Activación física y movilidad grupal",
    "Movimiento suave, personalizado y seguro para mantener la autonomía.",
  ],
  [
    Brain,
    "Memoria y estimulación cognitiva",
    "Talleres grupales que favorecen la atención, la memoria y el bienestar emocional.",
  ],
  [
    Palette,
    "Arte, música y manualidades",
    "Experiencias creativas para estimular la expresión, alegría y socialización.",
  ],
  [
    Users,
    "Actividades sociales y juegos",
    "Espacios para compartir, conversar, bailar y disfrutar en compañía.",
  ],
  [
    Apple,
    "Alimentación correspondiente al turno",
    "Desayuno ligero, almuerzo, merienda y atención nutricional dentro del plan.",
  ],
  [
    CalendarDays,
    "Calendario mensual de actividades",
    "Programación clara con talleres, salidas y actividades del mes.",
  ],
  [
    ClipboardList,
    "Registro de incidencias",
    "Seguimiento ordenado para mantener orientación a la familia.",
  ],
  [
    MessageCircle,
    "Reportes para la familia",
    "Comunicación periódica y cercana sobre la experiencia del usuario.",
  ],
] as const;
const timeline = [
  ["8:00–9:00", "Bienvenida y desayuno ligero"],
  ["9:00–10:00", "Movilidad y activación física"],
  ["10:00–12:00", "Taller cognitivo, arte o manualidades"],
  ["12:00–1:00", "Almuerzo"],
  ["1:00–2:00", "Descanso e integración del turno de tarde"],
  ["2:00–3:30", "Música, creatividad o estimulación"],
  ["3:30–5:00", "Actividades sociales y juegos"],
  ["5:00–5:30", "Merienda"],
  ["5:30–6:00", "Cierre y retorno al hogar"],
];
const faqs = [
  [
    "¿Qué es un centro diurno?",
    "Es un espacio de atención durante la jornada donde la persona mayor participa en actividades, alimentación, socialización y acompañamiento, y luego regresa a su hogar.",
  ],
  [
    "¿En qué se diferencia de una casa de reposo?",
    "No es un alojamiento ni atención residencial permanente. Vitalia ofrece cuidado diurno con actividades, alimentación y acompañamiento durante el día, sin alojamiento nocturno.",
  ],
  [
    "¿Cuál es el horario de atención?",
    "Atendemos de lunes a sábado, de 8:00 a. m. a 6:00 p. m.",
  ],
  [
    "¿Qué servicios están incluidos?",
    "Incluye actividades y talleres, alimentación según el turno, enfermería básica, recordatorio de medicamentos, reportes para la familia y acompañamiento durante la jornada.",
  ],
  [
    "¿Cuáles son las diferencias entre los planes?",
    "Los planes varían según horario: jornada completa, mañana, tarde y flexible; cada uno incluye los servicios correspondientes a su turno y frecuencia.",
  ],
  [
    "¿Cómo funciona la evaluación de ingreso?",
    "Se realiza una evaluación previa para confirmar que el centro puede acompañar de manera segura a la persona y definir el plan más adecuado.",
  ],
  [
    "¿Se puede asistir si usa bastón o andador?",
    "Sí, siempre que la evaluación previa confirme que el apoyo requerido puede brindarse dentro del alcance del centro y sin comprometer la seguridad del grupo.",
  ],
  [
    "¿Cómo manejan el recordatorio de medicamentos?",
    "Registramos y recordamos los medicamentos según la indicación entregada por la familia y el protocolo del centro, dentro del alcance de atención.",
  ],
  [
    "¿Ofrecen transporte?",
    "Sí, es un servicio adicional y se coordina según disponibilidad, zona y programación.",
  ],
  [
    "¿Puedo conocer Vitalia antes de decidir?",
    "Sí. Puedes solicitar un día de experiencia por S/70 y, si contratas un plan dentro de 7 días, se descuenta ese importe de la primera mensualidad.",
  ],
  [
    "¿Qué pasa en caso de emergencia?",
    "Aplicamos el protocolo del centro, avisamos de inmediato a la familia y coordinamos la atención correspondiente según la situación.",
  ],
  [
    "¿Cómo se comunica la familia con el centro?",
    "Compartimos información sobre actividades, alimentación, incidencias y evolución durante la jornada con comunicación periódica y cercana.",
  ],
  [
    "¿Qué servicios se cobran por separado?",
    "Transporte, medicamentos, pañales, dietas especiales, consultas médicas y terapias individuales se contratan por separado.",
  ],
];
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description:
      "Centro diurno de bienestar para personas mayores en Piura con actividades, alimentación, enfermería básica y planes flexibles.",
    url: siteConfig.url,
    areaServed: { "@type": "City", name: "Piura" },
    address: siteConfig.address
      ? {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: "Piura",
          addressCountry: "PE",
        }
      : undefined,
    telephone: siteConfig.phone || undefined,
    email: siteConfig.email || undefined,
    openingHours: "Mo-Sa 08:00-18:00",
    priceRange: siteConfig.showPricing ? "S/600–S/1500" : undefined,
  };
  return (
    <>
      <Header />
      <main id="contenido">
        <section className="hero" id="inicio">
          <Image
            src={assetPath("/images/hero-vitalia.webp")}
            fill
            priority
            quality={55}
            sizes="100vw"
            alt="Grupo de personas adultas mayores peruanas compartiendo una actividad creativa en un ambiente luminoso"
          />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <span className="eyebrow light">
              Centro diurno de bienestar en Piura
            </span>
            <h1>Más vida en cada día.</h1>
            <p>
              Actividades, alimentación y acompañamiento en grupos reducidos,
              con planes flexibles y comunicación cercana con la familia.
            </p>
            <div className="hero-actions">
              <a
                className="btn btn-gold"
                href="#contacto"
                data-interest="Solicitar orientación"
              >
                Solicita información
              </a>
              <a
                className="btn btn-light"
                href="#plan"
                data-interest="Solicitar orientación"
              >
                Conoce nuestros planes
              </a>
            </div>
            <p className="hero-note">
              Lunes a sábado · 8:00 a. m.–6:00 p. m. · Hasta 15 usuarios por turno
            </p>
          </div>
        </section>
        <section className="stats" aria-label="Características principales">
          <div className="container stats-grid">
            {[
              [CalendarDays, "Lunes a sábado"],
              [Clock3, "8:00 a. m.–6:00 p. m."],
              [Users, "Hasta 15 usuarios por turno"],
              [Utensils, "Planes desde media jornada"],
            ].map(([Icon, label]) => (
              <div key={String(label)}>
                <Icon aria-hidden="true" />
                <span>{String(label)}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="section intro" id="nosotros">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Nuestra propuesta</span>
              <h2>
                Bienestar para ellos.
                <br />
                Tranquilidad para la familia.
              </h2>
              <p>
                Creamos una rutina diaria que combina movimiento,
                socialización, alimentación, estimulación y acompañamiento.
                La persona mayor mantiene su autonomía y conexión con su hogar,
                mientras su familia cuenta con un servicio organizado, cercano y
                confiable.
              </p>
            </div>
            <div className="benefits">
              {[
                [Activity, "Vida activa", "Rutina diaria con movimiento, energía y propósito."],
                [Users, "Compañía y socialización", "Espacios de encuentro para compartir, conversar y sentirse acompañado."],
                [ShieldCheck, "Cuidado organizado", "Estructura clara, segura y con atención cercana durante la jornada."],
                [MessageCircle, "Comunicación familiar", "Seguimiento ordenado y actualizaciones con la familia."],
              ].map(([Icon, title, text]) => (
                <article key={String(title)}>
                  <span className="icon-bubble">
                    <Icon />
                  </span>
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section services" id="servicios">
          <div className="container">
            <div className="section-heading compact">
              <span className="eyebrow">Acompañamiento integral</span>
              <h2>Nuestros servicios</h2>
              <p>
                Una jornada variada, segura y con propósito, pensada para
                disfrutar en compañía.
              </p>
            </div>
            <div className="services-grid">
              {services.map(([Icon, title, text]) => (
                <article key={title}>
                  <Icon />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="scope-note">
              <ShieldCheck />
              Los servicios se brindan dentro del alcance de atención del centro y
              están sujetos a una evaluación previa de admisión.
            </p>
          </div>
        </section>
        <section className="section day" id="un-dia">
          <div className="container day-layout">
            <div className="day-copy">
              <span className="eyebrow">Rutina con propósito</span>
              <h2>Un día en Vitalia</h2>
              <p>
                Cada momento tiene un ritmo: activarnos, crear, compartir,
                alimentarnos y devolvernos a casa con tranquilidad.
              </p>
              <a
                className="btn btn-secondary"
                href="#contacto"
                data-interest="Día de experiencia"
              >
                Solicita un día de experiencia
              </a>
              <Image
                src={assetPath("/images/movimiento.webp")}
                alt="Personas adultas mayores realizando movimientos suaves con acompañamiento profesional"
                width={720}
                height={520}
              />
            </div>
            <ol className="timeline">
              {timeline.map(([time, label]) => (
                <li key={time}>
                  <time>{time}</time>
                  <span>{label}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="reference-note">
            Programa referencial. Las actividades pueden variar según la
            programación y las necesidades del grupo.
          </p>
        </section>
        <section className="section gallery" id="galeria">
          <div className="container">
            <div className="section-heading compact">
              <span className="eyebrow">Espacios para sentirse bien</span>
              <h2>Conoce el centro que imaginamos</h2>
              <p>
                Ambientes cálidos, ventilados, accesibles y llenos de luz
                natural.
              </p>
            </div>
            <Gallery />
          </div>
        </section>
        <section className="section audience" id="para-quien">
          <div className="container audience-layout">
            <div className="audience-image">
              <Image
                src={assetPath("/images/manualidades.webp")}
                fill
                sizes="(max-width: 850px) 100vw, 45vw"
                alt="Personas adultas mayores conversando mientras realizan manualidades"
              />
            </div>
            <div>
              <span className="eyebrow light">Una comunidad respetuosa</span>
              <h2>¿Para quién es Vitalia?</h2>
              <p>
                Vitalia está pensado para personas mayores que:
              </p>
              <ul className="check-list">
                {[
                  "Son autónomas o tienen necesidades ligeras de apoyo.",
                  "Usan bastón o andador, sujeto a evaluación.",
                  "Necesitan recordar sus medicamentos.",
                  "Tienen diabetes o hipertensión controlada.",
                  "Necesitan ayuda ocasional para ir al baño.",
                  "Presentan incontinencia controlada.",
                  "Muestran interés por socialización, actividades y una rutina organizada.",
                ].map((i) => (
                  <li key={i}>
                    ✓<span>{i}</span>
                  </li>
                ))}
              </ul>
              <p className="audience-note">
                Cada ingreso requiere evaluación previa. No se atienden personas
                con dependencia severa, cuidados médicos permanentes, riesgo
                frecuente de caídas o situaciones que excedan la capacidad
                operativa del centro.
              </p>
            </div>
          </div>
        </section>
        <section className="section families">
          <div className="container family-layout">
            <div>
              <span className="eyebrow">Acompañamiento familiar</span>
              <h2>Siempre informados y cerca</h2>
              <p>
                La confianza también se construye con comunicación clara,
                oportuna y humana.
              </p>
              <a
                className="btn btn-secondary"
                href="#contacto"
                data-interest="Solicitar más información"
              >
                Conoce cómo acompañaremos a tu familia
              </a>
            </div>
            <div className="family-list">
              {[
                [MessageCircle, "Contacto con un responsable del centro"],
                [ClipboardList, "Reporte de adaptación durante el primer mes"],
                [Apple, "Información sobre actividades y alimentación"],
                [BellRing, "Registro y comunicación de incidencias"],
                [Users, "Reuniones periódicas de seguimiento"],
                [CalendarDays, "Calendario mensual de actividades"],
              ].map(([Icon, label]) => (
                <div key={String(label)}>
                  <Icon />
                  <span>{String(label)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Pricing />
        <section className="section promises">
          <div className="container">
            <div className="section-heading compact">
              <span className="eyebrow">Nuestros compromisos</span>
              <h2>Lo que queremos construir junto a las familias</h2>
              <p>
                No son testimonios: son los principios que orientarán cada
                experiencia en Vitalia.
              </p>
            </div>
            <div className="promise-row">
              {[
                [MessageCircle, "Comunicación cercana"],
                [HeartHandshake, "Trato digno"],
                [Sparkles, "Actividades con propósito"],
                [ShieldCheck, "Seguridad y organización"],
                [Activity, "Respeto por la autonomía"],
              ].map(([Icon, label]) => (
                <div key={String(label)}>
                  <Icon />
                  <strong>{String(label)}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section contact" id="contacto">
          <div className="container contact-layout">
            <div className="contact-copy">
              <span className="eyebrow light">Estamos para escucharte</span>
              <h2>Conversemos sobre las necesidades de tu familia</h2>
              <p>
                Déjanos tus datos y nos comunicaremos contigo para brindarte
                información, resolver tus preguntas y coordinar una visita.
              </p>
              <div className="contact-reassurance">
                <ShieldCheck />
                <p>
                  <strong>Información cuidada</strong>
                  <br />
                  Solo solicitamos los datos necesarios para responderte.
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
        <section className="section faq" id="preguntas">
          <div className="container faq-layout">
            <div>
              <span className="eyebrow">Resolvemos tus dudas</span>
              <h2>Preguntas frecuentes</h2>
              <p>
                Si necesitas conversar sobre una situación particular, estaremos
                encantados de escucharte.
              </p>
            </div>
            <div>
              {faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="final-cta">
          <div className="container">
            <BookOpen aria-hidden="true" />
            <h2>Da el primer paso hacia una rutina más activa y acompañada</h2>
            <p>
              Agenda una conversación y conoce si Vitalia es adecuado para las
              necesidades de tu familia.
            </p>
            <div>
              <a
                className="btn btn-gold"
                href="#contacto"
                data-interest="Solicitar más información"
              >
                Agenda una visita
              </a>
              {whatsappHref && (
                <a
                  className="btn btn-light"
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Habla con nosotros por WhatsApp
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {whatsappHref && (
        <a
          className="floating-wa"
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Hablar con Vitalia por WhatsApp"
        >
          <MessageCircle />
        </a>
      )}
      <CookieBanner />
      <Analytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo-card" aria-hidden>
            <Image
              src={assetPath("/vitalia-centro-bienestar-transparente.png")}
              alt="Vitalia Centro de Bienestar"
              width={360}
              height={140}
              className="footerBrandLogo"
            />
          </div>
          <p className="slogan">Más vida en cada día.</p>
          <p className="muted">Bienestar, compañía y tranquilidad para las personas mayores y sus familias.</p>
        </div>

        <div className="footer-visit">
          <h2>VISÍTANOS</h2>
          {siteConfig.address && <p>{siteConfig.address}</p>}
          <p>Piura, Perú</p>
          <p>{siteConfig.schedule}</p>
          {siteConfig.phone && (
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
          )}
          {siteConfig.email && (
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          )}
          {typeof whatsappHref !== "undefined" && (
            <a href={whatsappHref} target="_blank" rel="noreferrer">Solicitar información por WhatsApp</a>
          )}
        </div>

        <div className="footer-info">
          <h2>Información</h2>
          <nav aria-label="Información legal">
            <a href={pagePath("/privacidad/")}>Política de privacidad</a>
            <a href={pagePath("/terminos/")}>Términos del servicio</a>
          </nav>
          <nav aria-label="Enlaces rápidos">
            <a href="#preguntas">Preguntas frecuentes</a>
            <a href="#plan">Planes</a>
            <a href="#contacto">Contacto</a>
          </nav>
          {siteConfig.claimsBook && (
            <a href={siteConfig.claimsBook}>Libro de reclamaciones</a>
          )}
          {siteConfig.instagram && <a href={siteConfig.instagram}>Instagram</a>}
          {siteConfig.facebook && <a href={siteConfig.facebook}>Facebook</a>}
        </div>
      </div>

      <div className="container copyright">
        © {year} Vitalia Centro de Bienestar. Todos los derechos reservados.
      </div>
    </footer>
  );
}
