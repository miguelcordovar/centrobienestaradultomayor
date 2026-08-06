"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
export function track(event: string, params: Record<string, unknown> = {}) {
  window.gtag?.("event", event, params);
}
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const consentCheck = window.setTimeout(
      () => setAllowed(document.cookie.includes("vm_analytics=yes")),
      0,
    );
    const clicks = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        "a",
      );
      if (!link) return;
      if (link.href.includes("wa.me/") && !link.classList.contains("wa-nav"))
        track("whatsapp_click", { location: link.className || "content" });
      if (
        link.textContent?.includes("Agenda una visita") &&
        !link.classList.contains("nav-cta")
      )
        track("schedule_visit_click", {
          location: link.className || "content",
        });
    };
    document.addEventListener("click", clicks);
    return () => {
      window.clearTimeout(consentCheck);
      document.removeEventListener("click", clicks);
    };
  }, []);
  if (!id || !allowed) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}</Script>
    </>
  );
}
