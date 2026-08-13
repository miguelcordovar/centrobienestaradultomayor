import { describe, expect, it } from "vitest";
import { leadSchema, normalizePeruvianPhone } from "@/lib/lead-schema";
const valid = {
  name: "María Torres",
  whatsapp: "987 654 321",
  email: "maria@example.com",
  district: "Piura",
  relationship: "Hija o hijo",
  age: 76,
  interest: "Vitalia Integral",
  days: "Lunes y miércoles",
  startDate: "2026-09-01",
  transportNeed: "Sí",
  contactTime: "8:00 a. m.–12:00 p. m.",
  comment: "Deseo información",
  consent: true,
  newsletter: false,
  website: "",
};
describe("leadSchema", () => {
  it("normaliza celulares peruanos", () =>
    expect(normalizePeruvianPhone("+51 987 654 321")).toBe("+51987654321"));
  it("acepta una solicitud válida", () =>
    expect(leadSchema.safeParse(valid).success).toBe(true));
  it("rechaza consentimiento ausente", () =>
    expect(leadSchema.safeParse({ ...valid, consent: false }).success).toBe(false));
  it("rechaza spam por honeypot", () =>
    expect(leadSchema.safeParse({ ...valid, website: "bot" }).success).toBe(false));
});
