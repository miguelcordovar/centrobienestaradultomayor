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
  HeartHandshake,
  MessageCircle,
  Palette,
  ShieldCheck,
  Sparkles,
  Trees,
  Users,
  Utensils,
} from "@/components/icons";
import { assetPath, pagePath, siteConfig, whatsappHref } from "@/lib/config";

const services = [
  [
    Users,
    "Actividades sociales y juegos",
    "Espacios para compartir, conversar y disfrutar en grupo.",
  ],
  [
    Brain,
    "Memoria y estimulación cognitiva",
    "Talleres participativos adaptados al ritmo del grupo.",
  ],
  [
    Palette,
    "Arte, música y manualidades",
    "Experiencias creativas que invitan a expresarse y descubrir.",
  ],
  [
    Activity,
    "Ejercicio suave y movilidad",
    "Movimiento guiado con una mirada segura y respetuosa.",
  ],
  [
    Apple,
    "Nutrición y alimentación",
    "Alimentación organizada para acompañar la jornada.",
  ],
  [
    ShieldCheck,
    "Enfermería básica",
    "Supervisión básica dentro del alcance de atención del centro.",
  ],
  [
    BellRing,
    "Recordatorio de medicamentos",
    "Recordatorio y registro según las indicaciones entregadas por la familia.",
  ],
  [
    Trees,
    "Salidas recreativas",
    "Encuentros programados para disfrutar nuevos espacios.",
  ],
  [
    HeartHandshake,
    "Apoyo cotidiano",
    "Ayuda ocasional en actividades diarias cuando se necesita.",
  ],
  [
    ClipboardList,
    "Reportes para la familia",
    "Comunicación periódica sobre la experiencia en el centro.",
  ],
] as const;
const timeline = [
  ["8:00–9:00", "Bienvenida y desayuno ligero"],
  ["9:00–10:00", "Movilidad y ejercicio suave"],
  ["10:00–12:00", "Taller de memoria, arte o manualidades"],
  ["12:00–13:30", "Almuerzo"],
  ["13:30–15:00", "Descanso y tiempo tranquilo"],
  ["15:00–16:30", "Actividades sociales, música o juegos"],
  ["16:30–17:00", "Merienda"],
  ["17:00–18:00", "Cierre del día y retorno a casa"],
];
const faqs = [
  [
    "¿VivaMayor es una casa de reposo?",
    "No. VivaMayor es un centro diurno de bienestar. La persona participa durante el día y continúa viviendo en su hogar.",
  ],
  [
    "¿La persona adulta mayor duerme en el centro?",
    "No ofrecemos alojamiento nocturno. La jornada termina a las 6:00 p. m. y cada persona regresa a su hogar.",
  ],
  [
    "¿Cuál es el horario?",
    "La atención prevista es de lunes a viernes, de 8:00 a. m. a 6:00 p. m.",
  ],
  [
    "¿Qué incluye la mensualidad?",
    "Incluye la jornada de lunes a viernes, alimentación, actividades, talleres, enfermería básica, salidas programadas y comunicación con la familia.",
  ],
  [
    "¿Cómo se realiza la evaluación de ingreso?",
    "Conversamos con la familia y la persona adulta mayor para conocer sus necesidades y confirmar que podemos acompañarla de manera segura.",
  ],
  [
    "¿Pueden asistir personas que usan bastón o andador?",
    "Sí, siempre que la evaluación previa confirme que el centro puede brindarles el apoyo adecuado y seguro.",
  ],
  [
    "¿Administran medicamentos?",
    "Podemos recordar y registrar medicamentos previamente organizados por la familia, dentro de nuestro protocolo y alcance de atención.",
  ],
  [
    "¿Ofrecen transporte?",
    "El transporte es un servicio adicional sujeto a zona, disponibilidad y evaluación de la ruta.",
  ],
  [
    "¿Qué ocurre ante una emergencia?",
    "Aplicamos el protocolo del centro, contactamos inmediatamente a la familia y coordinamos la atención de emergencia que corresponda.",
  ],
  [
    "¿Puedo conocer el centro antes de inscribirme?",
    "Sí. Puedes solicitar información y coordinar una visita para conocer la propuesta y resolver tus preguntas.",
  ],
  [
    "¿Cómo se informa a la familia?",
    "Compartimos información sobre adaptación, actividades, alimentación e incidencias, además de reuniones periódicas de seguimiento.",
  ],
];
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description:
      "Centro diurno de bienestar para personas adultas mayores en Piura.",
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
    openingHours: "Mo-Fr 08:00-18:00",
    priceRange: siteConfig.showPricing ? "S/2,200–S/2,250" : undefined,
  };
  return (
    <>
      <Header />
      <main id="contenido">
        <section className="hero" id="inicio">
          <Image
            src={assetPath("/images/hero-vivamayor.webp")}
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
            <h1>Una vida activa, acompañada y cerca de la familia</h1>
            <p>
              VivaMayor es un centro diurno de bienestar en Piura donde las
              personas adultas mayores disfrutan de actividades, alimentación y
              acompañamiento profesional, regresando cada día a la tranquilidad
              de su hogar.
            </p>
            <div className="hero-actions">
              <a
                className="btn btn-gold"
                href="#contacto"
                data-interest="Solicitar más información"
              >
                Agenda una visita
              </a>
              <a
                className="btn btn-light"
                href="#contacto"
                data-interest="Solicitar más información"
              >
                Solicita información
              </a>
            </div>
            <p className="hero-note">
              Lunes a viernes · 8:00 a. m. a 6:00 p. m. · Grupos reducidos
            </p>
          </div>
        </section>
        <section className="stats" aria-label="Características principales">
          <div className="container stats-grid">
            {[
              [Users, "Dos grupos de 15 personas"],
              [CalendarDays, "Jornada completa"],
              [Utensils, "Alimentación incluida"],
              [MessageCircle, "Comunicación con la familia"],
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
                Creamos una rutina diaria que combina acompañamiento,
                socialización, alimentación, actividades y supervisión básica.
                Así, la persona adulta mayor mantiene su autonomía y conexión
                con su hogar, mientras su familia cuenta con un servicio
                organizado y confiable.
              </p>
            </div>
            <div className="benefits">
              {[
                [
                  Activity,
                  "Vida activa",
                  "Actividades diseñadas para estimular el movimiento, la creatividad y la participación.",
                ],
                [
                  Users,
                  "Acompañamiento",
                  "Un entorno cálido donde compartir, conversar y construir nuevas amistades.",
                ],
                [
                  HeartHandshake,
                  "Tranquilidad familiar",
                  "Comunicación periódica y seguimiento de la experiencia del usuario.",
                ],
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
              Los servicios se personalizan dentro del alcance de atención del
              centro y de acuerdo con la evaluación de admisión.
            </p>
          </div>
        </section>
        <section className="section day" id="un-dia">
          <div className="container day-layout">
            <div className="day-copy">
              <span className="eyebrow">Rutina con propósito</span>
              <h2>Así es un día en VivaMayor</h2>
              <p>
                Cada momento tiene un ritmo: activarnos, crear, compartir,
                alimentarnos y también descansar.
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
              <h2>¿Para quién es VivaMayor?</h2>
              <p>
                VivaMayor está pensado inicialmente para personas adultas
                mayores que:
              </p>
              <ul className="check-list">
                {[
                  "Mantienen autonomía o tienen necesidades ligeras de apoyo.",
                  "Utilizan bastón o andador.",
                  "Requieren recordar sus medicamentos.",
                  "Tienen diabetes o hipertensión controlada.",
                  "Necesitan ayuda ocasional para ir al baño.",
                  "Presentan incontinencia controlada.",
                  "Buscan socialización, actividades y una rutina organizada.",
                ].map((i) => (
                  <li key={i}>
                    ✓<span>{i}</span>
                  </li>
                ))}
              </ul>
              <p className="audience-note">
                Cada solicitud pasa por una evaluación previa para confirmar que
                el centro puede atender de manera segura las necesidades de la
                persona.
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
                experiencia en VivaMayor.
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
              Agenda una conversación y conoce si VivaMayor es adecuado para las
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
          aria-label="Hablar con VivaMayor por WhatsApp"
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
        <div>
          <Image
            src={assetPath("/logo-vivamayor.webp")}
            alt="VivaMayor Centro de Bienestar"
            width={300}
            height={150}
          />
          <p>{siteConfig.slogan}</p>
        </div>
        <div>
          <h2>VivaMayor</h2>
          {siteConfig.address && <p>{siteConfig.address}</p>}
          <p>Piura, Perú</p>
          <p>{siteConfig.schedule}</p>
          {siteConfig.phone && (
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
          )}
          {siteConfig.email && (
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          )}
        </div>
        <div>
          <h2>Información</h2>
          <a href={pagePath("/privacidad/")}>Política de privacidad</a>
          <a href={pagePath("/terminos/")}>Términos del servicio</a>
          {siteConfig.claimsBook && (
            <a href={siteConfig.claimsBook}>Libro de reclamaciones</a>
          )}
          {siteConfig.instagram && <a href={siteConfig.instagram}>Instagram</a>}
          {siteConfig.facebook && <a href={siteConfig.facebook}>Facebook</a>}
        </div>
      </div>
      <div className="container copyright">
        © {year} VivaMayor Centro de Bienestar. Todos los derechos reservados.
      </div>
    </footer>
  );
}
