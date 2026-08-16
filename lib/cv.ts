import type { Locale } from "@/lib/site";

export const cvVariantSlugs = [
  "gtm-revops",
  "product-implementation",
  "ai-automation",
  "customer-solutions",
] as const;

export type CvVariantSlug = (typeof cvVariantSlugs)[number];

export type CvSkillGroupId =
  | "gtm"
  | "customer"
  | "platforms"
  | "automation"
  | "delivery"
  | "ai-comms"
  | "quality";

export type CvExperienceId = "apollo" | "minitiendai" | "independent" | "earlier";
export type CvProjectId =
  | "zentix"
  | "hablaya"
  | "minitiendai"
  | "ordenai"
  | "zentix-office"
  | "tonalli-ai"
  | "gtmsnap"
  | "hermes-agent-lab";

type LocalizedText = Record<Locale, string>;

export type CvExperience = {
  id: CvExperienceId;
  period: LocalizedText;
  organization: LocalizedText;
  title: LocalizedText;
  context: LocalizedText;
  bullets: Record<Locale, string[]>;
};

export type CvProject = {
  id: CvProjectId;
  name: string;
  status: LocalizedText;
  description: LocalizedText;
  path?: string;
};

export type CvSkillGroup = {
  id: CvSkillGroupId;
  title: LocalizedText;
  items: string[];
};

export type CvVariant = {
  slug: CvVariantSlug;
  accent: "violet" | "coral" | "cyan" | "lime";
  title: LocalizedText;
  shortTitle: LocalizedText;
  eyebrow: LocalizedText;
  summary: LocalizedText;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  fitRoles: Record<Locale, string[]>;
  skillOrder: CvSkillGroupId[];
  projectOrder: CvProjectId[];
};

export const cvExperience: CvExperience[] = [
  {
    id: "apollo",
    period: { en: "May 2025 - Present", es: "Mayo 2025 - Actualidad" },
    organization: { en: "Apollo.io", es: "Apollo.io" },
    title: {
      en: "Product Specialist | SaaS onboarding and GTM systems",
      es: "Product Specialist | Onboarding SaaS y sistemas GTM",
    },
    context: {
      en: "Current employment",
      es: "Empleo actual",
    },
    bullets: {
      en: [
        "Guide 50+ B2B customer teams weekly in English and Spanish through Apollo implementation, including ICP prospecting, contact data, mailbox setup, lists, sequences, sending controls, deliverability, and integrations.",
        "Translate revenue goals into repeatable workflows and diagnose configuration, activation, and adoption blockers across the outbound lifecycle.",
        "Apply buying intent, enrichment, data quality, sequence logic, and CRM-connected processes to improve operational execution.",
      ],
      es: [
        "Guio cada semana a más de 50 equipos B2B en inglés y español durante su implementación de Apollo: prospección ICP, datos de contacto, buzones, listas, secuencias, controles de envío, entregabilidad e integraciones.",
        "Convierto objetivos de ingresos en flujos repetibles y diagnostico bloqueos de configuración, activación y adopción a lo largo del ciclo outbound.",
        "Aplico señales de intención, enriquecimiento, calidad de datos, lógica de secuencias y procesos conectados al CRM para mejorar la ejecución operativa.",
      ],
    },
  },
  {
    id: "minitiendai",
    period: { en: "Mar 2024 - May 2025", es: "Marzo 2024 - Mayo 2025" },
    organization: { en: "MiniTiendAI", es: "MiniTiendAI" },
    title: {
      en: "Product Development Manager",
      es: "Product Development Manager",
    },
    context: {
      en: "Verified product role",
      es: "Rol de producto verificado",
    },
    bullets: {
      en: [
        "Led product development for a small-business storefront MVP across business creation, responsive UX, catalog setup, commerce handoffs, QA, and releases.",
        "Turned a complex store-building process into guided steps that non-technical owners could complete on desktop and mobile.",
        "Connected product decisions to public evidence, current limitations, and production behavior rather than relying on feature claims alone.",
      ],
      es: [
        "Lideré el desarrollo de un MVP de tiendas para pequeños negocios: creación del negocio, UX responsive, catálogo, conexiones comerciales, QA y releases.",
        "Convertí un proceso complejo de creación de tiendas en pasos guiados que personas no técnicas podían completar en desktop y móvil.",
        "Vinculé las decisiones de producto con evidencia pública, límites actuales y comportamiento en producción, no solo con declaraciones de funcionalidades.",
      ],
    },
  },
  {
    id: "independent",
    period: { en: "Mar 2024 - Present", es: "Marzo 2024 - Actualidad" },
    organization: {
      en: "Independent product portfolio",
      es: "Portafolio independiente de producto",
    },
    title: {
      en: "AI, SaaS, and automation product builder",
      es: "Creador de productos de IA, SaaS y automatización",
    },
    context: {
      en: "Concurrent independent work",
      es: "Trabajo independiente concurrente",
    },
    bullets: {
      en: [
        "Design and ship AI agents, GTM tools, and workflow automation across web, WhatsApp, Telegram, and voice interfaces.",
        "Connect LLMs, APIs, webhooks, databases, CRMs, and human handoffs using JavaScript/TypeScript, React/Next.js, Node.js, n8n, Make, Zapier, and MCP.",
        "Deliver from product concept through deployment on Vercel, Firebase, Supabase, Docker, Cloudflare, and Hostinger VPS environments.",
      ],
      es: [
        "Diseño y publico agentes de IA, herramientas GTM y automatizaciones para web, WhatsApp, Telegram e interfaces de voz.",
        "Conecto LLMs, APIs, webhooks, bases de datos, CRMs y transferencias humanas con JavaScript/TypeScript, React/Next.js, Node.js, n8n, Make, Zapier y MCP.",
        "Entrego desde el concepto de producto hasta el despliegue en Vercel, Firebase, Supabase, Docker, Cloudflare y entornos VPS de Hostinger.",
      ],
    },
  },
  {
    id: "earlier",
    period: { en: "Earlier experience", es: "Experiencia anterior" },
    organization: {
      en: "Sales, customer operations, compliance, and learning",
      es: "Ventas, operaciones de clientes, cumplimiento y aprendizaje",
    },
    title: {
      en: "Bilingual commercial and customer-facing roles",
      es: "Roles comerciales y de atención bilingüe",
    },
    context: {
      en: "Grouped summary - no missing employers or dates inferred",
      es: "Resumen agrupado - sin inferir empleadores ni fechas faltantes",
    },
    bullets: {
      en: [
        "Built end-to-end commercial context through consultative sales, customer onboarding, account operations, fraud/compliance work, training, education, and bilingual support.",
        "Developed a practical ability to explain unfamiliar systems, ask better discovery questions, and guide people through operational change.",
      ],
      es: [
        "Construí contexto comercial integral mediante ventas consultivas, onboarding, operaciones de cuentas, fraude/cumplimiento, capacitación, educación y soporte bilingüe.",
        "Desarrollé la capacidad práctica de explicar sistemas nuevos, hacer mejores preguntas de descubrimiento y acompañar cambios operativos.",
      ],
    },
  },
];

export const cvProjects: CvProject[] = [
  {
    id: "zentix",
    name: "Zentix",
    status: { en: "Live B2B SaaS", es: "SaaS B2B en vivo" },
    description: {
      en: "AI agents for sales, support, and appointments across web, WhatsApp, Telegram, and voice.",
      es: "Agentes de IA para ventas, soporte y citas en web, WhatsApp, Telegram y voz.",
    },
    path: "/work/zentix",
  },
  {
    id: "hablaya",
    name: "HablaYa",
    status: { en: "Live EdTech product", es: "Producto EdTech en vivo" },
    description: {
      en: "Real-time voice AI language practice across 16 languages with responsive learner workflows.",
      es: "Práctica de idiomas con IA de voz en tiempo real en 16 idiomas y flujos responsive para estudiantes.",
    },
    path: "/work/hablaya",
  },
  {
    id: "minitiendai",
    name: "MiniTiendAI",
    status: { en: "Live MVP", es: "MVP en vivo" },
    description: {
      en: "Small-business storefront generation, conversion flows, and WhatsApp ordering automation.",
      es: "Generación de tiendas para pequeños negocios, flujos de conversión y pedidos por WhatsApp.",
    },
    path: "/work/minitiendai",
  },
  {
    id: "ordenai",
    name: "OrdenAI",
    status: { en: "Live pilot", es: "Piloto en vivo" },
    description: {
      en: "Restaurant ordering and operations workflows designed to keep channel handoffs together.",
      es: "Flujos de pedidos y operaciones para restaurantes que conectan los cambios entre canales.",
    },
    path: "/work/ordenai",
  },
  {
    id: "zentix-office",
    name: "Zentix Office",
    status: { en: "Simulated POC", es: "POC simulado" },
    description: {
      en: "A transparent AI-team simulation that demonstrates workflows without presenting fabricated activity as live data.",
      es: "Una simulación transparente de equipo de IA que demuestra flujos sin presentar actividad fabricada como datos en vivo.",
    },
    path: "/work/zentix-office",
  },
  {
    id: "tonalli-ai",
    name: "Tonalli AI",
    status: { en: "Live product demo", es: "Demo de producto en vivo" },
    description: {
      en: "One workspace for model routing, tools, persistent work, scheduled prompts, and channel delivery.",
      es: "Un espacio para enrutamiento de modelos, herramientas, trabajo persistente, prompts programados y entrega por canales.",
    },
    path: "/work/tonalli-ai",
  },
  {
    id: "gtmsnap",
    name: "GTMSnap",
    status: { en: "Independent build", es: "Proyecto independiente" },
    description: {
      en: "AI-assisted workflows for ICP definition, positioning, messaging, and go-to-market strategy.",
      es: "Flujos asistidos por IA para ICP, posicionamiento, mensajes y estrategia go-to-market.",
    },
  },
  {
    id: "hermes-agent-lab",
    name: "Hermes Agent Lab",
    status: { en: "Independent lab", es: "Laboratorio independiente" },
    description: {
      en: "Self-hosted agents with persistent memory, scheduled jobs, tools, and model routing.",
      es: "Agentes autoalojados con memoria persistente, tareas programadas, herramientas y enrutamiento de modelos.",
    },
  },
];

export const cvSkillGroups: CvSkillGroup[] = [
  {
    id: "gtm",
    title: { en: "GTM and revenue operations", es: "GTM y operaciones de ingresos" },
    items: [
      "GTM Engineering",
      "Revenue Operations",
      "GTM Systems",
      "Sales Operations",
      "Marketing Operations",
      "Growth Automation",
      "Lead Data and Enrichment",
      "CRM Workflows",
      "Sales Engagement",
      "Deliverability",
      "SaaS Onboarding",
      "AI Workflows",
    ],
  },
  {
    id: "customer",
    title: { en: "Customer enablement", es: "Habilitación de clientes" },
    items: [
      "Onboarding",
      "Journey Mapping",
      "Enablement",
      "Documentation",
      "Customer Discovery",
      "Bilingual Product Education",
    ],
  },
  {
    id: "platforms",
    title: { en: "Revenue platforms", es: "Plataformas de ingresos" },
    items: ["Apollo.io", "HubSpot", "Salesforce", "GoHighLevel", "CRM and Lifecycle Workflows"],
  },
  {
    id: "automation",
    title: { en: "Automation and agents", es: "Automatización y agentes" },
    items: ["n8n", "Make", "Zapier", "REST APIs", "Webhooks", "MCP", "AI Agents", "Human-in-the-loop"],
  },
  {
    id: "delivery",
    title: { en: "Development and cloud", es: "Desarrollo y nube" },
    items: [
      "JavaScript/TypeScript",
      "Node.js",
      "React/Next.js",
      "Firebase",
      "Supabase",
      "GitHub",
      "Vercel",
      "Docker",
      "Cloudflare",
      "Hostinger VPS",
    ],
  },
  {
    id: "ai-comms",
    title: { en: "AI and communications", es: "IA y comunicaciones" },
    items: ["DeepSeek", "OpenAI", "Gemini", "Cerebras", "Twilio", "WhatsApp Cloud API", "Telegram", "Cartesia"],
  },
  {
    id: "quality",
    title: { en: "Product UX and quality", es: "UX de producto y calidad" },
    items: ["Responsive UX", "Accessibility", "Behavioral QA", "Prototyping", "Release Verification"],
  },
];

export const cvCredentials = [
  "Google Cloud Generative AI Leader (2025)",
  "Google Digital Marketing and E-commerce (2025)",
  "Apollo.io Workflows and Cold Emailing (2025)",
  "Mate Academy Full-Stack Development (2022-2025)",
] as const;

export const cvLanguages: Record<Locale, string[]> = {
  en: ["Spanish - Native", "English - C2", "Portuguese - A2"],
  es: ["Español - Nativo", "Inglés - C2", "Portugués - A2"],
};

export const cvVariants: CvVariant[] = [
  {
    slug: "gtm-revops",
    accent: "violet",
    title: {
      en: "GTM Systems and Revenue Operations",
      es: "Sistemas GTM y Operaciones de Ingresos",
    },
    shortTitle: { en: "GTM and RevOps", es: "GTM y RevOps" },
    eyebrow: {
      en: "Revenue systems | Sales automation | CRM operations",
      es: "Sistemas de ingresos | Automatización de ventas | Operaciones CRM",
    },
    summary: {
      en: "Technical GTM operator connecting revenue strategy, systems, data, customer adoption, and automation. I turn prospecting, engagement, CRM, and lifecycle goals into workflows teams can use and improve.",
      es: "Operador técnico de GTM que conecta estrategia de ingresos, sistemas, datos, adopción y automatización. Convierto objetivos de prospección, engagement, CRM y ciclo de vida en flujos que los equipos pueden usar y mejorar.",
    },
    seoTitle: {
      en: "Jorge Gasca | GTM Systems and RevOps CV",
      es: "Jorge Gasca | CV de Sistemas GTM y RevOps",
    },
    seoDescription: {
      en: "GTM systems and RevOps CV for Jorge Gasca, an Apollo.io Product Specialist working across sales automation, CRM workflows, data, deliverability, and AI.",
      es: "CV de sistemas GTM y RevOps de Jorge Gasca, Product Specialist en Apollo.io con experiencia en automatización de ventas, CRM, datos, entregabilidad e IA.",
    },
    fitRoles: {
      en: [
        "GTM Systems Specialist or Manager",
        "GTM Engineer",
        "Revenue Operations Specialist or Manager",
        "Sales Operations Specialist or Manager",
        "Marketing Operations Specialist",
        "Sales Automation Specialist",
        "CRM Automation Specialist",
        "Growth Operations Specialist",
      ],
      es: [
        "Especialista o Manager de Sistemas GTM",
        "GTM Engineer",
        "Especialista o Manager de Revenue Operations",
        "Especialista o Manager de Sales Operations",
        "Especialista de Marketing Operations",
        "Especialista de Automatización de Ventas",
        "Especialista de Automatización CRM",
        "Especialista de Growth Operations",
      ],
    },
    skillOrder: ["gtm", "platforms", "automation", "customer", "delivery", "ai-comms", "quality"],
    projectOrder: ["zentix", "gtmsnap", "minitiendai", "tonalli-ai", "hablaya", "ordenai", "zentix-office", "hermes-agent-lab"],
  },
  {
    slug: "product-implementation",
    accent: "coral",
    title: {
      en: "Product Operations and Implementation",
      es: "Operaciones de Producto e Implementación",
    },
    shortTitle: { en: "Product and Implementation", es: "Producto e Implementación" },
    eyebrow: {
      en: "Product adoption | Implementation | Hands-on delivery",
      es: "Adopción de producto | Implementación | Entrega práctica",
    },
    summary: {
      en: "Product and implementation operator who translates customer goals into clear onboarding, connected workflows, responsive experiences, and verified releases from discovery through adoption.",
      es: "Operador de producto e implementación que convierte objetivos del cliente en onboarding claro, flujos conectados, experiencias responsive y releases verificadas desde descubrimiento hasta adopción.",
    },
    seoTitle: {
      en: "Jorge Gasca | Product and Implementation CV",
      es: "Jorge Gasca | CV de Producto e Implementación",
    },
    seoDescription: {
      en: "Product operations and implementation CV for Jorge Gasca, covering SaaS onboarding, product enablement, responsive UX, customer adoption, QA, and releases.",
      es: "CV de operaciones de producto e implementación de Jorge Gasca: onboarding SaaS, habilitación, UX responsive, adopción, QA y releases.",
    },
    fitRoles: {
      en: [
        "Product Development Manager",
        "Product Operations Specialist or Manager",
        "Technical Product Specialist or Manager",
        "Implementation Specialist or Manager",
        "SaaS Onboarding Specialist",
        "Product Enablement Specialist",
        "Product Adoption Manager",
      ],
      es: [
        "Product Development Manager",
        "Especialista o Manager de Product Operations",
        "Especialista o Manager de Producto Técnico",
        "Especialista o Manager de Implementación",
        "Especialista de Onboarding SaaS",
        "Especialista de Product Enablement",
        "Manager de Adopción de Producto",
      ],
    },
    skillOrder: ["customer", "quality", "delivery", "automation", "gtm", "platforms", "ai-comms"],
    projectOrder: ["minitiendai", "ordenai", "hablaya", "zentix", "tonalli-ai", "zentix-office", "gtmsnap", "hermes-agent-lab"],
  },
  {
    slug: "ai-automation",
    accent: "cyan",
    title: {
      en: "AI Automation and Technical Product",
      es: "Automatización con IA y Producto Técnico",
    },
    shortTitle: { en: "AI Automation", es: "Automatización con IA" },
    eyebrow: {
      en: "AI workflows | APIs and agents | Production delivery",
      es: "Flujos con IA | APIs y agentes | Entrega en producción",
    },
    summary: {
      en: "AI automation builder connecting models, APIs, CRMs, messaging channels, voice, persistent workflows, and human review into practical product experiences that can be tested and operated.",
      es: "Creador de automatización con IA que conecta modelos, APIs, CRMs, mensajería, voz, flujos persistentes y revisión humana en experiencias prácticas que se pueden probar y operar.",
    },
    seoTitle: {
      en: "Jorge Gasca | AI Automation and Product CV",
      es: "Jorge Gasca | CV de Automatización con IA",
    },
    seoDescription: {
      en: "AI automation and technical product CV for Jorge Gasca, covering agents, n8n, APIs, MCP, React and Next.js, cloud delivery, messaging, and voice workflows.",
      es: "CV de automatización con IA y producto técnico de Jorge Gasca: agentes, n8n, APIs, MCP, React y Next.js, nube, mensajería y voz.",
    },
    fitRoles: {
      en: [
        "AI Automation Specialist",
        "AI Workflow Engineer",
        "Automation Engineer",
        "AI Solutions Consultant",
        "Integration Specialist",
        "Conversational AI Specialist",
        "AI Product Builder",
        "Low-Code or No-Code Automation Specialist",
      ],
      es: [
        "Especialista de Automatización con IA",
        "AI Workflow Engineer",
        "Automation Engineer",
        "Consultor de Soluciones con IA",
        "Especialista de Integraciones",
        "Especialista de IA Conversacional",
        "Creador de Productos con IA",
        "Especialista de Automatización Low-Code o No-Code",
      ],
    },
    skillOrder: ["automation", "ai-comms", "delivery", "quality", "gtm", "platforms", "customer"],
    projectOrder: ["zentix", "hermes-agent-lab", "tonalli-ai", "hablaya", "ordenai", "gtmsnap", "zentix-office", "minitiendai"],
  },
  {
    slug: "customer-solutions",
    accent: "lime",
    title: {
      en: "Customer Success and Solutions",
      es: "Customer Success y Soluciones",
    },
    shortTitle: { en: "Customer Solutions", es: "Soluciones para Clientes" },
    eyebrow: {
      en: "Customer adoption | Technical enablement | Solution design",
      es: "Adopción | Habilitación técnica | Diseño de soluciones",
    },
    summary: {
      en: "Bilingual customer and solutions specialist who explains complex SaaS systems, diagnoses adoption blockers, connects technical workflows, and helps teams move from a desired outcome to confident use.",
      es: "Especialista bilingüe de clientes y soluciones que explica sistemas SaaS complejos, diagnostica bloqueos de adopción, conecta flujos técnicos y acompaña a los equipos hacia un uso seguro.",
    },
    seoTitle: {
      en: "Jorge Gasca | Customer Success and Solutions CV",
      es: "Jorge Gasca | CV de Customer Success y Soluciones",
    },
    seoDescription: {
      en: "Customer success and solutions CV for Jorge Gasca, covering bilingual SaaS onboarding, technical enablement, implementation, adoption, CRM, and AI workflows.",
      es: "CV de Customer Success y soluciones de Jorge Gasca: onboarding SaaS bilingüe, habilitación técnica, implementación, adopción, CRM e IA.",
    },
    fitRoles: {
      en: [
        "Technical Customer Success Manager",
        "Customer Success Manager or Engineer",
        "Solutions Consultant or Engineer",
        "Customer Onboarding Manager",
        "Customer Enablement Specialist",
        "Technical Account Manager",
        "Product Support Specialist",
      ],
      es: [
        "Technical Customer Success Manager",
        "Customer Success Manager o Engineer",
        "Solutions Consultant o Engineer",
        "Manager de Onboarding de Clientes",
        "Especialista de Habilitación de Clientes",
        "Technical Account Manager",
        "Especialista de Soporte de Producto",
      ],
    },
    skillOrder: ["customer", "platforms", "gtm", "automation", "quality", "ai-comms", "delivery"],
    projectOrder: ["zentix", "hablaya", "minitiendai", "ordenai", "gtmsnap", "tonalli-ai", "zentix-office", "hermes-agent-lab"],
  },
];

export const cvUiCopy = {
  en: {
    hubEyebrow: "Career profile | Four focused paths",
    hubTitle: "One track record, four ways to read the fit.",
    hubSummary:
      "Choose the version closest to the role you are hiring for. Every CV keeps the same verified experience, complete skills inventory, credentials, and product evidence; only the emphasis and ordering change.",
    hubPrimary: "Choose a CV",
    hubSecondary: "See verified work",
    hubProfiles: "Role-focused CVs",
    hubProfilesBody: "Responsive web profiles with matching two-page ATS PDFs.",
    sharedTitle: "Shared facts in every version",
    sharedBody:
      "Current Apollo.io product work, a verified MiniTiendAI product leadership role, concurrent independent builds, earlier customer and commercial experience, all listed tools, credentials, and languages.",
    bestFit: "Best-fit roles",
    profile: "Professional profile",
    experience: "Experience",
    products: "Selected product evidence",
    allBuilds: "Complete build inventory",
    skills: "Complete skills and systems",
    credentials: "Credentials",
    languages: "Languages",
    contact: "Contact",
    contactBody: "For a role, include the team, product, location, and position.",
    download: "Download ATS PDF",
    view: "View CV",
    portfolio: "Portfolio",
    email: "Email Jorge",
    linkedIn: "LinkedIn",
    github: "GitHub",
    location: "Mexico City | Remote",
    current: "Current role: Product Specialist at Apollo.io",
    verifiedNote: "Matching titles describe role fit, not past employment.",
    printLabel: "Two-page ATS resume",
    caseStudy: "Read case study",
    noCaseStudy: "Additional independent build",
    back: "All CV versions",
  },
  es: {
    hubEyebrow: "Perfil profesional | Cuatro rutas enfocadas",
    hubTitle: "Una trayectoria, cuatro formas de entender el encaje.",
    hubSummary:
      "Elige la versión más cercana al puesto. Cada CV mantiene la misma experiencia verificada, inventario completo de habilidades, credenciales y evidencia de producto; solo cambian el énfasis y el orden.",
    hubPrimary: "Elegir un CV",
    hubSecondary: "Ver trabajo verificado",
    hubProfiles: "CVs enfocados por rol",
    hubProfilesBody: "Perfiles web responsive con PDFs ATS de dos páginas.",
    sharedTitle: "Hechos compartidos en cada versión",
    sharedBody:
      "Trabajo actual de producto en Apollo.io, liderazgo verificado de producto en MiniTiendAI, proyectos independientes concurrentes, experiencia anterior comercial y de clientes, todas las herramientas, credenciales e idiomas.",
    bestFit: "Puestos con mejor encaje",
    profile: "Perfil profesional",
    experience: "Experiencia",
    products: "Evidencia de producto seleccionada",
    allBuilds: "Inventario completo de proyectos",
    skills: "Habilidades y sistemas completos",
    credentials: "Credenciales",
    languages: "Idiomas",
    contact: "Contacto",
    contactBody: "Para una oportunidad, incluye el equipo, producto, ubicación y puesto.",
    download: "Descargar PDF ATS",
    view: "Ver CV",
    portfolio: "Portafolio",
    email: "Enviar correo",
    linkedIn: "LinkedIn",
    github: "GitHub",
    location: "Ciudad de México | Remoto",
    current: "Rol actual: Product Specialist en Apollo.io",
    verifiedNote: "Los puestos sugeridos describen encaje, no empleos anteriores.",
    printLabel: "CV ATS de dos páginas",
    caseStudy: "Ver caso de estudio",
    noCaseStudy: "Proyecto independiente adicional",
    back: "Todas las versiones de CV",
  },
} as const;

export function getCvVariant(slug: string) {
  return cvVariants.find((variant) => variant.slug === slug);
}

export function cvVariantPath(locale: Locale, slug: CvVariantSlug) {
  return locale === "es" ? `/es/cv/${slug}` : `/cv/${slug}`;
}

export function cvHubPath(locale: Locale) {
  return locale === "es" ? "/es/cv" : "/cv";
}

export function cvPdfPath(locale: Locale, slug: CvVariantSlug) {
  return `/cv/downloads/jorge-gasca-${slug}-${locale}.pdf`;
}

export function getCvSkillGroups(variant: CvVariant) {
  const byId = new Map(cvSkillGroups.map((group) => [group.id, group]));
  return variant.skillOrder.map((id) => byId.get(id)).filter((group): group is CvSkillGroup => Boolean(group));
}

export function getCvProjects(variant: CvVariant) {
  const byId = new Map(cvProjects.map((project) => [project.id, project]));
  return variant.projectOrder.map((id) => byId.get(id)).filter((project): project is CvProject => Boolean(project));
}
