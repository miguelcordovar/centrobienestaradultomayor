# VivaMayor — Centro de Bienestar

Landing page en Next.js para captar familias interesadas en un centro diurno de bienestar para personas adultas mayores en Piura.

## Desarrollo

1. Instala dependencias con `npm install`.
2. Copia `.env.example` a `.env.local` y completa las variables.
3. Ejecuta `supabase.sql` en el editor SQL del proyecto Supabase.
4. Inicia con `npm run dev`.

El formulario requiere `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`. Resend es opcional para la notificación por correo; configura sus tres variables para activarlo. Turnstile se activa cuando se definen su clave pública y secreta. Nunca expongas la service role, claves de Resend o secretos de Turnstile mediante variables `NEXT_PUBLIC_`.

## Personalización

- Los datos de contacto y redes vacíos se ocultan automáticamente.
- `NEXT_PUBLIC_SHOW_PRICING=false` oculta el plan completo.
- WhatsApp aparece solo con `NEXT_PUBLIC_WHATSAPP_NUMBER`, usando código de país y solo dígitos.
- La analítica se carga solo si existe `NEXT_PUBLIC_GA_ID` y el visitante acepta cookies.

Las imágenes finales optimizadas están en `public/images`; los originales generados se conservan en `public/images/originals`. Los textos legales son provisionales y requieren revisión profesional antes del lanzamiento.
