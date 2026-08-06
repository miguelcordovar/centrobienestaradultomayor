import { z } from "zod";

const clean = (value: string) => value.replace(/[<>]/g, "").trim();
export const normalizePeruvianPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").replace(/^51/, "");
  return digits.length === 9 && digits.startsWith("9") ? `+51${digits}` : null;
};

export const leadSchema = z.object({
  name: z.string().min(3, "Ingresa tu nombre y apellidos.").max(100).transform(clean),
  whatsapp: z.string().refine((v) => normalizePeruvianPhone(v), "Ingresa un celular peruano válido."),
  email: z.string().email("Ingresa un correo válido.").max(150).transform(clean),
  district: z.string().min(2, "Indica tu distrito.").max(80).transform(clean),
  relationship: z.string().min(1, "Selecciona una opción.").max(60).transform(clean),
  age: z.coerce.number().int().min(55, "Revisa la edad indicada.").max(110, "Revisa la edad indicada."),
  interest: z.enum(["Jornada completa", "Día de experiencia", "Transporte", "Solicitar más información"]),
  contactTime: z.string().min(1, "Selecciona un horario.").max(60).transform(clean),
  comment: z.string().max(1000, "El comentario es demasiado largo.").transform(clean).default(""),
  consent: z.literal(true, { errorMap: () => ({ message: "Necesitamos tu consentimiento para contactarte." }) }),
  newsletter: z.boolean().default(false),
  website: z.string().max(0).optional().default(""),
  turnstileToken: z.string().optional().default(""),
  source: z.string().url().max(500).optional().or(z.literal("")),
  utm: z.record(z.string().max(200)).optional().default({}),
});
export type LeadInput = z.input<typeof leadSchema>;
