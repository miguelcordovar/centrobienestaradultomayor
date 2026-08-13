"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { track } from "./analytics";
import { assetPath, whatsappHref } from "@/lib/config";

const links = [
  ["Inicio", "#inicio"],
  ["Nosotros", "#nosotros"],
  ["Servicios", "#servicios"],
  ["Un día en Vitalia", "#un-dia"],
  ["Planes", "#plan"],
  ["Preguntas frecuentes", "#preguntas"],
  ["Contacto", "#contacto"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <header className="site-header">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <div className="nav-wrap">
        <Link href="#inicio" aria-label="Vitalia, ir al inicio">
          <Image
            className="nav-logo"
            src={assetPath("/vitalia-centro-bienestar-transparente.png")}
            alt="Vitalia Centro de Bienestar"
            width={420}
            height={220}
            priority
          />
        </Link>
        <button
          className="menu-button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-nav"
          className={open ? "nav open" : "nav"}
          aria-label="Navegación principal"
        >
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="btn btn-primary nav-cta"
            href="#contacto"
            data-interest="Solicitar más información"
            onClick={() => {
              setOpen(false);
              track("schedule_visit_click");
            }}
          >
            Agenda una visita
          </a>
          {whatsappHref && (
            <a
              className="wa-nav"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Conversar por WhatsApp"
              onClick={() =>
                track("whatsapp_click", { location: "navigation" })
              }
            >
              <MessageCircle />
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
