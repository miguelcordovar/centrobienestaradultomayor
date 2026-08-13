export type PlanData = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  price: string;
  priceDetail?: string;
  frequency: string;
  schedule: string[];
  food: string;
  reservation: string;
  badge?: string | null;
  basicFeatures: string[];
  includedServices: string[];
  conditions: string[];
  additionalServices: string[];
};

export const PLANS: PlanData[] = [
  {
    id: "integral",
    slug: "integral",
    name: "Vitalia Integral",
    shortDescription: "Acompañamiento durante toda la jornada.",
    price: "S/1,500",
    priceDetail: "al mes",
    frequency: "Lunes a sábado",
    schedule: ["8:00 a. m.–6:00 p. m."],
    food: "Desayuno, almuerzo y merienda",
    reservation: "Reserva mensual completa",
    badge: "Plan recomendado",
    basicFeatures: [
      "Lunes a sábado",
      "8:00 a. m.–6:00 p. m.",
      "Desayuno, almuerzo y merienda",
      "Reserva mensual completa",
    ],
    includedServices: [
      "Actividades físicas, cognitivas, sociales y recreativas",
      "Enfermería básica",
      "Recordatorio y registro de medicamentos",
      "Comunicación periódica con la familia",
      "Salidas recreativas programadas",
    ],
    conditions: ["Reserva mensual de plaza sujeta a evaluación y disponibilidad"],
    additionalServices: ["Transporte", "Consulta geriátrica", "Psicología individual"],
  },
  {
    id: "medio",
    slug: "medio-turno",
    name: "Vitalia Medio Turno",
    shortDescription: "Elige mañana o tarde según tu rutina.",
    price: "S/850",
    priceDetail: "al mes",
    frequency: "Lunes a sábado",
    schedule: ["Mañana: 8:00 a. m.–1:00 p. m.", "Tarde: 1:00 p. m.–6:00 p. m."],
    food: "Según el turno",
    reservation: "Reserva mensual de medio turno",
    badge: null,
    basicFeatures: [
      "Lunes a sábado",
      "Mañana o tarde",
      "Según el turno",
      "Reserva mensual de medio turno",
    ],
    includedServices: [
      "Activación física",
      "Estimulación cognitiva",
      "Actividades sociales y recreativas",
      "Enfermería básica",
    ],
    conditions: ["Cambios de turno sujetos a condiciones y disponibilidad"],
    additionalServices: ["Transporte", "Terapia física individual"],
  },
  {
    id: "flexible",
    slug: "flexible",
    name: "Vitalia Flexible",
    shortDescription: "Acompañamiento programado algunos días.",
    price: "S/600",
    priceDetail: "al mes",
    frequency: "12 medios turnos al mes",
    schedule: ["Mañana o tarde"],
    food: "Según el turno",
    reservation: "Sujeta a programación",
    badge: null,
    basicFeatures: [
      "12 medios turnos al mes",
      "Mañana o tarde",
      "Según el turno",
      "Sujeta a programación",
    ],
    includedServices: ["Actividades según el turno", "Enfermería básica", "Recordatorio de medicamentos"],
    conditions: ["Turnos no acumulables; sujeto a disponibilidad"],
    additionalServices: ["Nutrición personalizada", "Acompañamiento individual"],
  },
  {
    id: "ocasional",
    slug: "ocasional",
    name: "Vitalia Ocasional",
    shortDescription: "Atención puntual mediante reserva.",
    price: "Desde S/55",
    priceDetail: "por medio turno",
    frequency: "Según necesidad",
    schedule: ["Medio turno: 8:00 a. m.–1:00 p. m. / 1:00 p. m.–6:00 p. m.", "Día completo: 8:00 a. m.–6:00 p. m."],
    food: "Según la estancia",
    reservation: "Sujeta a disponibilidad",
    badge: null,
    basicFeatures: [
      "Según necesidad",
      "Medio turno o día completo",
      "Según la estancia",
      "Sujeta a disponibilidad",
    ],
    includedServices: ["Acompañamiento durante la estancia", "Enfermería básica", "Comunicación ante incidencias"],
    conditions: ["Evaluación inicial y reserva previa requerida"],
    additionalServices: ["Pañales, medicamentos e insumos personales", "Salidas con entradas o consumos especiales"],
  },
];

export default PLANS;
