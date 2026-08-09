import type { Locale } from "@/lib/site";

export type CaseStudySlug =
  | "zentix"
  | "hablaya"
  | "minitiendai"
  | "ordenai"
  | "zentix-office"
  | "tonalli-ai";

export type EvidenceAsset = {
  id: string;
  kind: "image" | "video";
  classification: "runtime" | "illustration";
  src: string;
  poster?: string;
  viewport: { width: number; height: number };
  captureDate: "2026-08-09";
  privacyReviewed: true;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
};

export type LocalizedCaseStudy = {
  title: string;
  dek: string;
  stageLabel: string;
  sourceLabel: string;
  problem: string;
  role: string;
  contributions: string[];
  capabilities: string[];
  decisions: string[];
  limitations: string;
  coverAlt: string;
};

export type CaseStudy = {
  slug: CaseStudySlug;
  featured: boolean;
  sequence: number;
  stage:
    | "live-saas"
    | "live-edtech"
    | "live-mvp"
    | "live-pilot"
    | "simulated-poc"
    | "live-demo";
  sourceVisibility: "private" | "public";
  liveUrl: string;
  sourceUrl?: string;
  accent: "violet" | "coral" | "lime" | "orange" | "blue" | "cyan";
  stack: string[];
  media: EvidenceAsset[];
  copy: Record<Locale, LocalizedCaseStudy>;
};

const makeMedia = (
  slug: CaseStudySlug,
  alt: Record<Locale, string>,
): EvidenceAsset[] => [
  {
    id: `${slug}-desktop`,
    kind: "image",
    classification: "runtime",
    src: `/evidence/${slug}/${slug}-desktop.png`,
    viewport: { width: 1440, height: 900 },
    captureDate: "2026-08-09",
    privacyReviewed: true,
    alt,
    caption: {
      en: "Public product surface · desktop runtime capture · privacy reviewed",
      es: "Superficie pública del producto · captura desktop en ejecución · privacidad revisada",
    },
  },
  {
    id: `${slug}-mobile`,
    kind: "image",
    classification: "runtime",
    src: `/evidence/${slug}/${slug}-mobile.png`,
    viewport: { width: 390, height: 693 },
    captureDate: "2026-08-09",
    privacyReviewed: true,
    alt,
    caption: {
      en: "Public product surface · mobile runtime capture · privacy reviewed",
      es: "Superficie pública del producto · captura móvil en ejecución · privacidad revisada",
    },
  },
  {
    id: `${slug}-walkthrough`,
    kind: "video",
    classification: "runtime",
    src: `/evidence/${slug}/${slug}-walkthrough.webm`,
    poster: `/evidence/${slug}/${slug}-desktop.png`,
    viewport: { width: 1440, height: 900 },
    captureDate: "2026-08-09",
    privacyReviewed: true,
    alt,
    caption: {
      en: "Short muted walkthrough of the public product surface",
      es: "Recorrido breve y sin audio por la superficie pública del producto",
    },
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "zentix",
    featured: true,
    sequence: 1,
    stage: "live-saas",
    sourceVisibility: "private",
    liveUrl: "https://zentixchatbot.cloud/",
    accent: "violet",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Vercel Functions",
      "Firebase Auth",
      "Firestore",
      "AI provider APIs",
      "Webhooks",
    ],
    media: makeMedia("zentix", {
      en: "Zentix public landing page with a purple AI-agent conversation card and Web, WhatsApp, Telegram, and CRM capability labels.",
      es: "Página pública de Zentix con una tarjeta morada de conversación con IA e indicadores de Web, WhatsApp, Telegram y CRM.",
    }),
    copy: {
      en: {
        title: "Zentix — AI agents for customer operations",
        dek: "A multichannel SaaS product that brings AI conversations, CRM context, and customer handoffs into a shared operating surface.",
        stageLabel: "Live B2B SaaS",
        sourceLabel: "Private source",
        problem: "Small businesses often manage conversations, prospects, appointments, and follow-up across disconnected channels.",
        role: "Independent product builder — product framing, UX, workflow architecture, integrations, QA, and release hardening.",
        contributions: [
          "Designed the agent creation, training, and multichannel deployment journey.",
          "Connected conversations with contacts, leads, deals, appointments, quotes, and notifications.",
          "Hardened the public widget, channel webhooks, and responsive access surfaces.",
        ],
        capabilities: [
          "Configurable AI agents with business context, FAQs, and response guardrails.",
          "Customer conversations across web, WhatsApp, and Telegram from a shared dashboard.",
          "CRM workflows for contacts, leads, opportunities, appointments, and human handoff.",
        ],
        decisions: [
          "Keep agent and contact context consistent across channels.",
          "Separate public read-only checks from authenticated, tenant-bound actions.",
        ],
        limitations: "Zentix is a live B2B SaaS product with private source. This case study uses public pages and non-sensitive product views only; it does not expose tenant data, admin controls, or treat a portfolio capture as proof of provider delivery.",
        coverAlt: "Zentix public landing page with a purple AI-agent conversation card and channel capability labels.",
      },
      es: {
        title: "Zentix — Agentes de IA para operaciones con clientes",
        dek: "Un producto SaaS multicanal que reúne conversaciones con IA, contexto de CRM y derivaciones a personas en una superficie de trabajo compartida.",
        stageLabel: "SaaS B2B en vivo",
        sourceLabel: "Código privado",
        problem: "Los pequeños negocios suelen gestionar conversaciones, prospectos, citas y seguimientos en canales desconectados.",
        role: "Creador independiente de productos — definición de producto, UX, arquitectura de flujos, integraciones, QA y fortalecimiento de entregas.",
        contributions: [
          "Diseñé el recorrido de creación, entrenamiento y despliegue multicanal de agentes.",
          "Conecté conversaciones con contactos, prospectos, oportunidades, citas, cotizaciones y notificaciones.",
          "Fortalecí el widget público, los webhooks de canales y las superficies responsive de acceso.",
        ],
        capabilities: [
          "Agentes configurables con contexto del negocio, FAQs y límites de respuesta.",
          "Conversaciones por web, WhatsApp y Telegram desde un panel compartido.",
          "Flujos de CRM para contactos, prospectos, oportunidades, citas y derivación humana.",
        ],
        decisions: [
          "Mantener el contexto del agente y del contacto entre canales.",
          "Separar verificaciones públicas de solo lectura de acciones autenticadas y aisladas por cuenta.",
        ],
        limitations: "Zentix es un producto SaaS B2B en vivo con código privado. El caso muestra páginas públicas y vistas sin datos sensibles; no expone información de clientes, controles administrativos ni presenta una captura como prueba de entrega por proveedores.",
        coverAlt: "Página pública de Zentix con una tarjeta morada de conversación con IA e indicadores de canales.",
      },
    },
  },
  {
    slug: "hablaya",
    featured: true,
    sequence: 2,
    stage: "live-edtech",
    sourceVisibility: "private",
    liveUrl: "https://hablaya.cloud/",
    accent: "coral",
    stack: [
      "JavaScript",
      "HTML",
      "CSS",
      "Firebase Auth",
      "Firestore",
      "Vercel Functions",
      "AI providers",
      "Speech services",
      "PWA",
    ],
    media: makeMedia("hablaya", {
      en: "HablaYa public learning experience with multilingual practice messaging, voice and text cues, and learner-focused navigation.",
      es: "Experiencia pública de HablaYa con mensajes de práctica multilingüe, indicadores de voz y texto, y navegación para estudiantes.",
    }),
    copy: {
      en: {
        title: "HablaYa — An AI tutor built around practice",
        dek: "A multilingual learning product that combines guided lessons, text and voice practice, vocabulary, games, and progress in one responsive journey.",
        stageLabel: "Live EdTech product",
        sourceLabel: "Current product source private",
        problem: "Language learners often move between disconnected lessons, conversation tools, and progress systems without a clear practice loop.",
        role: "Independent product builder — learning experience, UX, AI orchestration, content systems, responsive QA, and release verification.",
        contributions: [
          "Unified lesson, conversation, practice, game, vocabulary, and progress flows.",
          "Built the multilingual, responsive, PWA, and course-release systems.",
          "Hardened provider payloads, privacy operations, and content publication gates.",
        ],
        capabilities: [
          "Conversational practice through text and voice experiences.",
          "Structured lessons, activities, games, vocabulary, and persisted progress.",
          "Multilingual interface and learning paths across responsive devices.",
        ],
        decisions: [
          "Keep foreground chat and voice responsive while background work remains non-blocking.",
          "Keep AI-generated course material in a disclosed beta state until human content and audio review gates pass.",
        ],
        limitations: "HablaYa is a live EdTech product whose current production source is private. An older public prototype repository exists, but it is not presented as the source of the current product. Case-study visuals are public-surface captures, not live learner telemetry; authenticated chat transactions and real-device microphone performance are outside the portfolio proof.",
        coverAlt: "HablaYa public learning screen with multilingual practice messaging and voice and text cues.",
      },
      es: {
        title: "HablaYa — Un tutor de IA centrado en la práctica",
        dek: "Un producto multilingüe que reúne lecciones guiadas, práctica por texto y voz, vocabulario, juegos y progreso en un recorrido responsive.",
        stageLabel: "Producto EdTech en vivo",
        sourceLabel: "Código actual del producto: privado",
        problem: "Quienes aprenden idiomas suelen saltar entre lecciones, conversaciones y sistemas de progreso sin un ciclo de práctica claro.",
        role: "Creador independiente de productos — experiencia de aprendizaje, UX, orquestación de IA, sistemas de contenido, QA responsive y verificación de entregas.",
        contributions: [
          "Unifiqué los flujos de lecciones, conversación, práctica, juegos, vocabulario y progreso.",
          "Construí los sistemas multilingües, responsive, PWA y de publicación de cursos.",
          "Fortalecí los límites de proveedores, las operaciones de privacidad y las puertas de publicación de contenido.",
        ],
        capabilities: [
          "Práctica conversacional mediante experiencias de texto y voz.",
          "Lecciones, actividades, juegos, vocabulario y progreso persistente.",
          "Interfaz y recorridos de aprendizaje multilingües en distintos dispositivos.",
        ],
        decisions: [
          "Mantener Chat y Voz en primer plano mientras el trabajo secundario no bloquea la experiencia.",
          "Conservar el contenido generado con IA como beta visible hasta completar revisión humana de contenido y audio.",
        ],
        limitations: "HablaYa es un producto EdTech en vivo cuyo código actual de producción es privado. Existe un prototipo público anterior, pero no se presenta como el código del producto actual. Las imágenes son capturas de superficies públicas, no telemetría de estudiantes; las transacciones autenticadas de Chat y el micrófono en dispositivos reales no forman parte de la prueba pública.",
        coverAlt: "Pantalla pública de HablaYa con práctica multilingüe e indicadores de voz y texto.",
      },
    },
  },
  {
    slug: "minitiendai",
    featured: true,
    sequence: 3,
    stage: "live-mvp",
    sourceVisibility: "private",
    liveUrl: "https://minitiendai.com/",
    accent: "lime",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Firebase Auth",
      "Firestore",
      "Storage",
      "Vercel Functions",
      "WhatsApp",
    ],
    media: makeMedia("minitiendai", {
      en: "MiniTiendAI public storefront experience with a small-business catalog, product cards, and mobile commerce controls.",
      es: "Experiencia pública de MiniTiendAI con catálogo para pequeños negocios, tarjetas de producto y controles móviles de comercio.",
    }),
    copy: {
      en: {
        title: "MiniTiendAI — A storefront builder for small businesses",
        dek: "A mobile-first MVP that turns a business description, template, or catalog into a shareable storefront with cart and WhatsApp ordering.",
        stageLabel: "Live MVP",
        sourceLabel: "Private source",
        problem: "Small merchants need a simple way to sell online without assembling a complex commerce stack or learning a heavy dashboard.",
        role: "Product Development Manager — creation journeys, storefront UX, product data, commerce handoffs, QA, and release verification.",
        contributions: [
          "Unified AI-assisted, template, manual, and import-based creation paths.",
          "Designed storefront themes, catalog, cart, ordering, and media fallback behavior.",
          "Hardened authentication, store ownership, dashboard state, and deployment checks.",
        ],
        capabilities: [
          "Store or menu creation with preview-before-save and later customization.",
          "Responsive categories, product cards, cart controls, and persistent cart state.",
          "WhatsApp ordering and provider-hosted payment-link options.",
        ],
        decisions: [
          "Preserve manual creation and editing when AI generation is unavailable or unsuitable.",
          "Treat payment links as external handoffs, never as proof that a transaction settled.",
        ],
        limitations: "MiniTiendAI is a live MVP with private source. The public storefront is a representative demo. Authenticated owner and admin paths, external notifications, and provider-side payment settlement are not shown as public proof.",
        coverAlt: "MiniTiendAI public storefront with product cards and mobile-first commerce controls.",
      },
      es: {
        title: "MiniTiendAI — Creador de tiendas para pequeños negocios",
        dek: "Un MVP mobile-first que convierte una descripción, plantilla o catálogo en una tienda compartible con carrito y pedidos por WhatsApp.",
        stageLabel: "MVP en vivo",
        sourceLabel: "Código privado",
        problem: "Los pequeños comercios necesitan vender en línea sin montar una plataforma compleja ni aprender un panel pesado.",
        role: "Product Development Manager — recorridos de creación, UX de tienda, datos de productos, derivaciones comerciales, QA y verificación de entregas.",
        contributions: [
          "Unifiqué la creación asistida por IA, por plantilla, manual y mediante importación.",
          "Diseñé los temas, catálogo, carrito, pedidos y alternativas visuales de la tienda.",
          "Fortalecí autenticación, propiedad de tiendas, estado del panel y verificaciones de despliegue.",
        ],
        capabilities: [
          "Creación de tienda o menú con vista previa antes de guardar y personalización posterior.",
          "Categorías, tarjetas de producto, carrito y estado persistente en una experiencia responsive.",
          "Pedidos por WhatsApp y opciones de enlaces de pago alojados por proveedores.",
        ],
        decisions: [
          "Mantener creación y edición manual cuando la generación con IA no esté disponible o no sea adecuada.",
          "Tratar los enlaces de pago como derivaciones externas, no como confirmación de una transacción.",
        ],
        limitations: "MiniTiendAI es un MVP en vivo con código privado. La tienda pública es una demostración representativa. Los recorridos autenticados, notificaciones externas y la liquidación del pago no se presentan como prueba pública.",
        coverAlt: "Tienda pública de MiniTiendAI con tarjetas de producto y controles de comercio mobile-first.",
      },
    },
  },
  {
    slug: "ordenai",
    featured: true,
    sequence: 4,
    stage: "live-pilot",
    sourceVisibility: "private",
    liveUrl: "https://ordenai.cloud/",
    accent: "orange",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Firebase Auth",
      "Firestore",
      "Vercel Functions",
      "Sentry",
      "Channel webhooks",
    ],
    media: makeMedia("ordenai", {
      en: "OrdenAI public landing experience with a restaurant operations message and omnichannel product preview.",
      es: "Experiencia pública de OrdenAI con un mensaje de operaciones para restaurantes y una vista multicanal del producto.",
    }),
    copy: {
      en: {
        title: "OrdenAI — One operating layer for restaurant orders",
        dek: "A responsive restaurant platform that unifies order capture, kitchen execution, inventory, customer records, and channel workflows.",
        stageLabel: "Live pilot",
        sourceLabel: "Private source",
        problem: "Restaurant teams lose context when orders, kitchen work, stock, reservations, and customer communication live in separate systems.",
        role: "Independent product builder — domain design, multichannel journeys, responsive UX, security boundaries, observability, and production hardening.",
        contributions: [
          "Designed tenant, location, membership, and shared order-domain boundaries.",
          "Connected web, WhatsApp, and Telegram capture with kitchen and operational workflows.",
          "Hardened localization, responsive behavior, release checks, and operational observability.",
        ],
        capabilities: [
          "A server-authoritative order core shared by web and messaging channels.",
          "Kitchen-display workflows, catalog revisions, inventory ledgers, and recipe consumption.",
          "Reservations, customer records, reporting, and localized public menus.",
        ],
        decisions: [
          "Protect order integrity with idempotency, immutable snapshots, audit history, and a durable outbox.",
          "Keep native payments, hardware, and enterprise identity outside the limited pilot.",
        ],
        limitations: "OrdenAI is a live limited pilot with private source, not a generally available enterprise product. Native payments, refunds, POS hardware, SSO, and SCIM are excluded. Opening a provider payment link is not payment confirmation.",
        coverAlt: "OrdenAI public landing experience with an omnichannel restaurant workflow preview.",
      },
      es: {
        title: "OrdenAI — Una capa operativa para pedidos de restaurantes",
        dek: "Una plataforma responsive que reúne captura de pedidos, operación de cocina, inventario, clientes y canales de atención.",
        stageLabel: "Piloto en vivo",
        sourceLabel: "Código privado",
        problem: "Los equipos de restaurante pierden contexto cuando pedidos, cocina, inventario, reservaciones y comunicación viven en sistemas separados.",
        role: "Creador independiente de productos — diseño de dominio, recorridos multicanal, UX responsive, límites de seguridad, observabilidad y fortalecimiento de producción.",
        contributions: [
          "Diseñé los límites de organizaciones, ubicaciones, membresías y el dominio compartido de pedidos.",
          "Conecté la captura por web, WhatsApp y Telegram con cocina y operaciones.",
          "Fortalecí localización, comportamiento responsive, controles de entrega y observabilidad.",
        ],
        capabilities: [
          "Núcleo de pedidos controlado por servidor y compartido entre web y mensajería.",
          "Flujos de cocina, revisiones de catálogo, inventario y consumo por recetas.",
          "Reservaciones, registros de clientes, reportes y menús públicos localizados.",
        ],
        decisions: [
          "Proteger la integridad de los pedidos con idempotencia, snapshots inmutables, auditoría y una cola durable.",
          "Mantener pagos nativos, hardware e identidad empresarial fuera del piloto limitado.",
        ],
        limitations: "OrdenAI es un piloto limitado en vivo con código privado, no un producto empresarial de disponibilidad general. No incluye pagos nativos, reembolsos, hardware POS, SSO ni SCIM. Abrir un enlace de pago no confirma el pago.",
        coverAlt: "Experiencia pública de OrdenAI con una vista multicanal de operaciones para restaurantes.",
      },
    },
  },
  {
    slug: "zentix-office",
    featured: false,
    sequence: 5,
    stage: "simulated-poc",
    sourceVisibility: "public",
    liveUrl: "https://zentix-office.vercel.app/demo/",
    sourceUrl: "https://github.com/jgazcagtz/zentix-office",
    accent: "blue",
    stack: [
      "Vite",
      "TypeScript",
      "HTML",
      "CSS",
      "Vercel Functions",
      "Playwright",
      "Lighthouse",
    ],
    media: makeMedia("zentix-office", {
      en: "Zentix Office simulated control room with clearly labeled AI team cards, activity items, and a status board.",
      es: "Sala de control simulada de Zentix Office con tarjetas de equipo de IA, actividad y tablero de estado claramente identificados.",
    }),
    copy: {
      en: {
        title: "Zentix Office — A transparent simulation of an AI team",
        dek: "A bilingual acquisition site and simulated control-room POC that shows how an AI-agent office could be evaluated without pretending the demo is live operations.",
        stageLabel: "Simulated POC",
        sourceLabel: "Public source",
        problem: "Prospects need to understand a complex agent system before integration, but simulated demos can easily be mistaken for real telemetry.",
        role: "Independent product builder — concept framing, bilingual UX, simulation design, privacy boundaries, TypeScript implementation, and verification.",
        contributions: [
          "Rebuilt the concept as bilingual acquisition, demo, and privacy surfaces.",
          "Designed the simulated team, activity, and status-board interactions.",
          "Implemented lead-capture contracts, abuse controls, privacy boundaries, and automated QA.",
        ],
        capabilities: [
          "Live bilingual acquisition, demo, and privacy routes.",
          "Clearly labeled simulated agent cards, activity items, and status states.",
          "Optional, consent-based display recording that remains local to the browser.",
        ],
        decisions: [
          "Label the simulation permanently and never present fictional activity as telemetry.",
          "Keep demo routes out of search indexing and optional recording local and user-initiated.",
        ],
        limitations: "This is a public-source simulated POC. Its static routes are live, but /api/health currently returns 503 because runtime configuration is missing. The evaluation form, notification delivery, booking handoff, and operational automation are not presented as working.",
        coverAlt: "Zentix Office simulated control room with AI team cards and a status board.",
      },
      es: {
        title: "Zentix Office — Una simulación transparente de un equipo de IA",
        dek: "Un sitio bilingüe de adquisición y un POC de sala de control simulada que permite evaluar una oficina de agentes sin fingir operaciones reales.",
        stageLabel: "POC simulado",
        sourceLabel: "Repositorio público",
        problem: "Las personas necesitan comprender un sistema complejo antes de integrarlo, pero una simulación puede confundirse fácilmente con telemetría real.",
        role: "Creador independiente de productos — definición del concepto, UX bilingüe, diseño de simulación, privacidad, implementación en TypeScript y verificación.",
        contributions: [
          "Reconstruí el concepto como superficies bilingües de adquisición, demo y privacidad.",
          "Diseñé las interacciones simuladas del equipo, la actividad y el tablero de estado.",
          "Implementé contratos de captación, controles de abuso, límites de privacidad y QA automatizado.",
        ],
        capabilities: [
          "Rutas bilingües activas para adquisición, demo y privacidad.",
          "Tarjetas de agentes, actividades y estados claramente identificados como simulación.",
          "Grabación opcional de pantalla, iniciada con consentimiento y conservada localmente.",
        ],
        decisions: [
          "Etiquetar la simulación de forma permanente y no presentar actividad ficticia como telemetría.",
          "Excluir las demos del índice de búsqueda y mantener la grabación bajo control local.",
        ],
        limitations: "Es un POC simulado con repositorio público. Las rutas estáticas están activas, pero /api/health devuelve 503 porque falta configuración de runtime. El formulario, las notificaciones, la agenda y la automatización operativa no se presentan como funcionales.",
        coverAlt: "Sala de control simulada de Zentix Office con tarjetas de equipo de IA y tablero de estado.",
      },
    },
  },
  {
    slug: "tonalli-ai",
    featured: false,
    sequence: 6,
    stage: "live-demo",
    sourceVisibility: "private",
    liveUrl: "https://tonalli.cloud/app",
    accent: "cyan",
    stack: [
      "JavaScript SPA",
      "HTML",
      "CSS",
      "Vercel Functions",
      "Supabase",
      "AI providers",
      "Speech services",
      "Telegram",
    ],
    media: makeMedia("tonalli-ai", {
      en: "Tonalli AI public workspace with model and mode controls, a conversation composer, and tools and artifacts navigation.",
      es: "Espacio público de Tonalli AI con controles de modelo y modo, compositor de conversación y navegación de herramientas y artefactos.",
    }),
    copy: {
      en: {
        title: "Tonalli AI — A multi-model AI workspace",
        dek: "A lab product that brings chat, tools, files, voice, messaging, artifacts, and scheduled prompts into a shared workspace.",
        stageLabel: "Live product demo",
        sourceLabel: "Private source",
        problem: "AI-assisted work becomes fragmented when models, tools, documents, voice, messaging, and reminders live in separate products.",
        role: "Independent product builder — interaction design, model and mode routing, tool workflows, persistence, messaging reliability, and QA.",
        contributions: [
          "Designed the model, mode, streaming-chat, and agent-tool experience.",
          "Connected saved chats, agents, memory, files, voice, messaging, and artifacts.",
          "Hardened scheduled delivery, Telegram fallback behavior, and visible delivery status.",
        ],
        capabilities: [
          "Streaming multi-model chat with search, URL, calculation, and sandboxed-code tools.",
          "Voice, document Q&A, custom agents, and rendered artifacts.",
          "Persisted chat context and scheduled delivery across web and Telegram.",
        ],
        decisions: [
          "Preserve a local-first fallback when account sync is not configured.",
          "Persist schedule outcomes and retry Telegram as plain text when formatted delivery fails.",
        ],
        limitations: "Tonalli AI is a live product demo with private source. Its capabilities depend on configured external providers. The portfolio image is a synthetic, unauthenticated capture—not proof of model availability, voice or bot delivery, or scheduled execution.",
        coverAlt: "Tonalli AI public workspace with model controls, a conversation composer, and tools navigation.",
      },
      es: {
        title: "Tonalli AI — Un espacio de trabajo de IA multimodelo",
        dek: "Un producto de laboratorio que reúne chat, herramientas, archivos, voz, mensajería, artefactos y prompts programados.",
        stageLabel: "Demo de producto en vivo",
        sourceLabel: "Código privado",
        problem: "El trabajo asistido por IA se fragmenta cuando modelos, herramientas, documentos, voz, mensajería y recordatorios viven en productos separados.",
        role: "Creador independiente de productos — diseño de interacción, enrutamiento de modelos y modos, flujos de herramientas, persistencia, mensajería y QA.",
        contributions: [
          "Diseñé la experiencia de modelos, modos, chat en streaming y herramientas de agentes.",
          "Conecté conversaciones, agentes, memoria, archivos, voz, mensajería y artefactos.",
          "Fortalecí la entrega programada, las alternativas de Telegram y la visibilidad del estado.",
        ],
        capabilities: [
          "Chat multimodelo en streaming con búsqueda, lectura de URLs, cálculos y código aislado.",
          "Voz, preguntas sobre documentos, agentes personalizados y artefactos renderizados.",
          "Contexto persistente y entregas programadas entre web y Telegram.",
        ],
        decisions: [
          "Mantener una alternativa local cuando la sincronización de cuenta no está configurada.",
          "Guardar cada resultado y reintentar Telegram como texto simple cuando falla el formato.",
        ],
        limitations: "Tonalli AI es una demo de producto en vivo con código privado. Sus capacidades dependen de proveedores externos configurados. La imagen del portafolio es una captura sintética sin autenticación; no prueba disponibilidad de modelos, entrega por voz o bots ni ejecución programada.",
        coverAlt: "Espacio público de Tonalli AI con controles de modelo, compositor y navegación de herramientas.",
      },
    },
  },
];

export const caseStudySlugs = caseStudies.map((item) => item.slug);

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}

export function getNextCaseStudy(slug: CaseStudySlug) {
  const currentIndex = caseStudies.findIndex((item) => item.slug === slug);
  return caseStudies[(currentIndex + 1) % caseStudies.length];
}
