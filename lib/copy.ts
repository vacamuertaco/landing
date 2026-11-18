export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export const TOPIC_ICONS = [
  "briefcase",
  "home",
  "wrench",
  "truck",
  "newspaper",
  "chart",
] as const;

export type Copy = {
  htmlTitle: string;
  kicker: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  lead: string;
  topicsLabel: string;
  topics: readonly string[];
  subscribeLabel: string;
  placeholder: string;
  button: string;
  hint: string;
  hintSent: string;
  errorInvalid: string;
  errorServer: string;
  homeLabel: string;
  mapAlt: string;
  legalBefore: string;
  legalLink: string;
  legalAfter: string;
  otherLangLabel: string;
};

export const COPY: Record<Lang, Copy> = {
  es: {
    htmlTitle: "vacamuerta.co — Lanzamiento",
    kicker: "Próximamente",
    titleBefore: "El hub de ",
    titleHighlight: "oportunidades",
    titleAfter: " de Vaca Muerta",
    lead: "Una experiencia innovadora diseñada especialmente para tu desarrollo profesional en Vaca Muerta.",
    topicsLabel: "Rubros",
    topics: [
      "Empleos",
      "Vivienda",
      "Servicios",
      "Proveedores",
      "Noticias",
      "Negocios y mucho más",
    ],
    subscribeLabel: "Suscribite",
    placeholder: "Tu email",
    button: "Avisame del lanzamiento",
    hint: "Sin spam: un solo aviso cuando abramos.",
    hintSent: "Listo. Te avisamos cuando abramos.",
    // Textos de error: NO están en el diseño, son propuestos. Revisar.
    errorInvalid: "Ingresá un email válido.",
    errorServer: "No pudimos guardar tu email. Probá de nuevo en un momento.",
    homeLabel: "vacamuerta.co, inicio",
    mapAlt:
      "Mapa de Argentina con la formación Vaca Muerta resaltada en amarillo, en Neuquén, y su detalle ampliado sobre el Atlántico.",
    legalBefore: "© 2026 ",
    legalLink: "Dibrand LLC",
    legalAfter: ". Todos los derechos reservados.",
    otherLangLabel: "English",
  },
  en: {
    htmlTitle: "vacamuerta.co — Launch",
    kicker: "Coming soon",
    titleBefore: "The ",
    titleHighlight: "opportunity",
    titleAfter: " hub of Vaca Muerta",
    lead: "An innovative experience designed especially for your professional growth in Vaca Muerta.",
    topicsLabel: "Topics",
    topics: [
      "Jobs",
      "Housing",
      "Services",
      "Suppliers",
      "News",
      "Business and much more",
    ],
    subscribeLabel: "Subscribe",
    placeholder: "Your email",
    button: "Notify me at launch",
    hint: "No spam: one notice when we open.",
    hintSent: "Done. We will let you know when we open.",
    // Error texts are NOT in the design, they are proposed. Review.
    errorInvalid: "Enter a valid email address.",
    errorServer: "We couldn't save your email. Please try again in a moment.",
    homeLabel: "vacamuerta.co, home",
    mapAlt:
      "Map of Argentina with the Vaca Muerta formation highlighted in yellow, in Neuquén, and its enlarged detail over the Atlantic.",
    legalBefore: "© 2026 ",
    legalLink: "Dibrand LLC",
    legalAfter: ". All rights reserved.",
    otherLangLabel: "Español",
  },
};
