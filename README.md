# Vitalia — Centro de Bienestar

Landing page en Next.js para captar familias interesadas en un centro diurno de bienestar para personas adultas mayores en Piura.

## Desarrollo

1. Instala dependencias con `npm install`.
2. Copia `.env.example` a `.env.local` y completa las variables públicas.
3. Inicia con `npm run dev`.

El proyecto se genera como sitio estático. El formulario envía los datos a `NEXT_PUBLIC_LEADS_ENDPOINT`, que debe ser una función externa con CORS habilitado para el dominio publicado. GitHub Pages no puede ejecutar rutas API ni proteger credenciales de Supabase, Resend o Turnstile; esas credenciales deben vivir únicamente en la función externa.

## Personalización

- Los datos de contacto y redes vacíos se ocultan automáticamente.
- `NEXT_PUBLIC_SHOW_PRICING=false` oculta el plan completo.
- WhatsApp aparece solo con `NEXT_PUBLIC_WHATSAPP_NUMBER`, usando código de país y solo dígitos.
- La analítica se carga solo si existe `NEXT_PUBLIC_GA_ID` y el visitante acepta cookies.
- Para este repositorio, `NEXT_PUBLIC_BASE_PATH` es `/centrobienestaradultomayor`. Debe quedar vacío solamente cuando se usa un dominio propio.

Las imágenes finales optimizadas están en `public/images`; los originales generados se conservan en `public/images/originals`. Los textos legales son provisionales y requieren revisión profesional antes del lanzamiento.

## Publicación manual en GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` solo se ejecuta manualmente desde **Actions → Publicar en GitHub Pages → Run workflow**. Antes de ejecutarlo:

1. En **Settings → Pages → Build and deployment**, selecciona **GitHub Actions** como fuente.
2. En **Settings → Secrets and variables → Actions → Variables**, configura las variables públicas necesarias:
   - `LEADS_ENDPOINT`: URL HTTPS de la función externa que recibe el formulario.
   - `WHATSAPP_NUMBER`, `PHONE`, `EMAIL`, `ADDRESS`, redes y analítica cuando correspondan.
   - `TURNSTILE_SITE_KEY` si el endpoint valida Cloudflare Turnstile.
   - `SHOW_PRICING=false` si no se publicará la tarifa.
3. La publicación predeterminada usa `https://miguelcordovar.github.io/centrobienestaradultomayor`; no necesitas configurar `SITE_URL` ni `CUSTOM_DOMAIN` para esa dirección.
4. Para un dominio propio, configura `CUSTOM_DOMAIN=true` y `SITE_URL=https://dominio.example` y registra ese dominio también en **Settings → Pages**.

El workflow instala con `npm ci`, ejecuta lint, typecheck y pruebas, genera `out/`, sube el artefacto y lo publica con las acciones oficiales de GitHub Pages.

### Contrato del endpoint de leads

Debe aceptar `POST` JSON, responder JSON y permitir solicitudes desde el dominio de Pages. En éxito debe responder `2xx`; en validaciones puede responder `{ "message": "...", "fields": { "campo": "mensaje" } }`. El endpoint es responsable de validar nuevamente los datos, comprobar Turnstile, limitar abuso y persistir/notificar el lead con secretos del lado servidor. `supabase.sql` contiene la tabla de referencia si se utiliza Supabase.
