import type { Locale } from "@/lib/site";

export type CaseStudySlug =
  | "zentix"
  | "hablaya"
  | "minitiendai"
  | "ordenai"
  | "zentix-office"
  | "tonalli-ai";

export type EvidenceClassification =
  | "public-marketing"
  | "synthetic-demo"
  | "guest-runtime"
  | "simulation"
  | "illustration";

type EvidenceAssetBase = {
  id: string;
  classification: EvidenceClassification;
  captureUrl: string;
  src: string;
  viewport: { width: number; height: number };
  captureDate: string;
  privacyReviewed: true;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
  caveat: Record<Locale, string>;
};

export type ImageEvidenceAsset = EvidenceAssetBase & {
  kind: "image";
};

export type VideoEvidenceAsset = EvidenceAssetBase & {
  kind: "video";
  poster: string;
  sources: {
    webm: string;
    mp4: string;
  };
  durationSeconds: number;
};

export type EvidenceAsset = ImageEvidenceAsset | VideoEvidenceAsset;

export type CaseStudyMedia = {
  desktop: ImageEvidenceAsset;
  mobile: ImageEvidenceAsset;
  walkthrough: VideoEvidenceAsset | null;
  secondary?: ImageEvidenceAsset[];
};

export type LocalizedCaseStudy = {
  title: string;
  seoTitle: string;
  seoDescription: string;
  stageLabel: string;
  sourceLabel: string;
  role: string;
  cardResult: string;
  summary: string;
  ownership: string;
  challenge: string;
  actions: string[];
  outcome: string;
  decisionRationale: string;
  reflection: string;
  currentStatus: string;
  limitations: string[];
  coverAlt: string;
  videoDescription: string;
  videoTranscript: string;
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
  media: CaseStudyMedia;
  copy: Record<Locale, LocalizedCaseStudy>;
};

const makeMedia = (
  config: {
    slug: CaseStudySlug;
    product: Record<Locale, string>;
    captureUrl: string;
    classification: EvidenceClassification;
    walkthroughClassification?: EvidenceClassification;
    alt: Record<Locale, string>;
    caveat: Record<Locale, string>;
    durationSeconds: number;
  },
): CaseStudyMedia => {
  const basePath = `/evidence/${config.slug}/${config.slug}`;
  const common = {
    classification: config.classification,
    captureUrl: config.captureUrl,
    captureDate: "2026-08-09",
    privacyReviewed: true as const,
    alt: config.alt,
    caveat: config.caveat,
  };

  return {
    desktop: {
      ...common,
      id: `${config.slug}-desktop`,
      kind: "image",
      src: `${basePath}-desktop.png`,
      viewport: { width: 1440, height: 900 },
      caption: {
        en: `${config.product.en} on desktop.`,
        es: `${config.product.es} en desktop.`,
      },
    },
    mobile: {
      ...common,
      id: `${config.slug}-mobile`,
      kind: "image",
      src: `${basePath}-mobile.png`,
      viewport: { width: 390, height: 693 },
      caption: {
        en: `${config.product.en} on mobile.`,
        es: `${config.product.es} en móvil.`,
      },
    },
    walkthrough: {
      ...common,
      classification: config.walkthroughClassification ?? config.classification,
      id: `${config.slug}-walkthrough`,
      kind: "video",
      src: `${basePath}-walkthrough.webm`,
      poster: `${basePath}-desktop.png`,
      sources: {
        webm: `${basePath}-walkthrough.webm`,
        mp4: `${basePath}-walkthrough.mp4`,
      },
      durationSeconds: config.durationSeconds,
      viewport: { width: 1440, height: 900 },
      caption: {
        en: `Short walkthrough of ${config.product.en}.`,
        es: `Recorrido breve por ${config.product.es}.`,
      },
    },
  };
};

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
    media: makeMedia({
      slug: "zentix",
      product: { en: "Zentix", es: "Zentix" },
      captureUrl: "https://zentixchatbot.cloud/",
      classification: "public-marketing",
      alt: {
        en: "Zentix homepage showing an AI-agent conversation and Web, WhatsApp, Telegram, and CRM connections.",
        es: "Página de Zentix con una conversación de un agente de IA y conexiones con Web, WhatsApp, Telegram y CRM.",
      },
      caveat: {
        en: "The conversation shown is a public example, not customer activity.",
        es: "La conversación mostrada es un ejemplo público, no actividad de clientes.",
      },
      durationSeconds: 20,
    }),
    copy: {
      en: {
        title: "Zentix — AI agents that keep customer context together",
        seoTitle: "Zentix Case Study | Jorge Gasca",
        seoDescription:
          "How Jorge Gasca designed and built Zentix workflows for AI-assisted conversations, CRM context, and human handoff.",
        stageLabel: "Live B2B SaaS",
        sourceLabel: "Private source",
        role: "Independent product builder",
        cardResult:
          "Connected web, WhatsApp, Telegram, CRM context, and human handoff in one product flow.",
        summary:
          "Zentix gives small teams one place to handle AI-assisted conversations from the web, WhatsApp, and Telegram, then carry useful context into the CRM or a human handoff.",
        ownership:
          "I framed the product, designed the agent setup and CRM journey, built the public widget and channel connections, and handled responsive QA and release checks.",
        challenge:
          "A customer can start in one channel and continue in another. Without a shared contact record and clear handoff rules, the team loses context and the customer has to repeat the story.",
        actions: [
          "I designed a setup flow for business context, FAQs, channel connections, and response boundaries.",
          "I connected conversations with contacts, leads, deals, appointments, quotes, and notifications.",
          "I tested the widget, webhooks, authentication boundaries, and responsive dashboard behavior as one journey.",
        ],
        outcome:
          "The live product now presents agent setup, multichannel conversations, CRM follow-up, and human handoff as parts of the same customer journey rather than separate tools.",
        decisionRationale:
          "I kept public checks read-only and separated them from authenticated, account-bound actions. A public widget should never be able to trigger private CRM work without the right identity and context.",
        reflection:
          "The hardest part was not adding another channel; it was deciding which context must follow the customer. That became the organizing principle for the product.",
        currentStatus:
          "Zentix is a live B2B SaaS product. The portfolio links to the product, while the repository and account areas remain private.",
        limitations: [
          "The screenshots use public example content and do not show customer accounts, admin tools, or private conversations.",
          "A portfolio walkthrough can show the journey, but it does not prove delivery by an external messaging or AI provider.",
        ],
        coverAlt: "Zentix homepage with an AI-agent conversation and channel connections.",
        videoDescription:
          "A short walkthrough from agent setup to channel connections and CRM follow-up.",
        videoTranscript:
          "The walkthrough opens with the Zentix agent setup, moves through the available web and messaging channels, and finishes on the CRM and human-handoff parts of the customer journey. All visible information is public example content.",
      },
      es: {
        title: "Zentix — Agentes de IA que conservan el contexto del cliente",
        seoTitle: "Caso Zentix | Jorge Gasca",
        seoDescription:
          "Cómo Jorge Gasca diseñó y construyó en Zentix los flujos de conversaciones con IA, contexto de CRM y atención humana.",
        stageLabel: "SaaS B2B en vivo",
        sourceLabel: "Código privado",
        role: "Creador independiente de producto",
        cardResult:
          "Conecté web, WhatsApp, Telegram, contexto de CRM y transferencia humana en un solo flujo.",
        summary:
          "Zentix permite que equipos pequeños atiendan conversaciones con IA desde web, WhatsApp y Telegram, y pasen el contexto útil al CRM o a una persona.",
        ownership:
          "Definí el producto, diseñé la configuración de agentes y el recorrido del CRM, construí el widget público y las conexiones de canales, y me encargué del QA responsive y las revisiones de lanzamiento.",
        challenge:
          "Un cliente puede comenzar en un canal y continuar en otro. Sin un contacto compartido y reglas claras de transferencia, el equipo pierde el contexto y el cliente tiene que volver a explicar todo.",
        actions: [
          "Diseñé una configuración que reúne contexto del negocio, preguntas frecuentes, canales y límites de respuesta.",
          "Conecté las conversaciones con contactos, prospectos, oportunidades, citas, cotizaciones y notificaciones.",
          "Probé como un solo recorrido el widget, los webhooks, los límites de autenticación y el panel responsive.",
        ],
        outcome:
          "El producto activo presenta la configuración del agente, las conversaciones multicanal, el seguimiento en CRM y la atención humana como partes del mismo recorrido.",
        decisionRationale:
          "Mantuve las consultas públicas en modo de solo lectura y separadas de las acciones privadas de cada cuenta. Un widget público no debe activar tareas en el CRM sin identidad y contexto correctos.",
        reflection:
          "Lo más difícil no fue agregar otro canal, sino decidir qué información debe acompañar al cliente. Esa pregunta terminó organizando todo el producto.",
        currentStatus:
          "Zentix es un SaaS B2B en operación. El portafolio enlaza el producto, pero el repositorio y las áreas de cuenta permanecen privados.",
        limitations: [
          "Las imágenes usan contenido público de ejemplo; no muestran cuentas, herramientas administrativas ni conversaciones de clientes.",
          "El recorrido permite entender el producto, pero no confirma la entrega de un proveedor externo de mensajería o IA.",
        ],
        coverAlt: "Página de Zentix con una conversación de un agente de IA y conexiones de canales.",
        videoDescription:
          "Un recorrido breve desde la configuración del agente hasta los canales y el seguimiento en CRM.",
        videoTranscript:
          "El recorrido comienza con la configuración del agente de Zentix, pasa por las conexiones web y de mensajería, y termina en las partes de CRM y atención humana. Toda la información visible es contenido público de ejemplo.",
      },
    },
  },
  {
    slug: "hablaya",
    featured: false,
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
    media: makeMedia({
      slug: "hablaya",
      product: { en: "HablaYa", es: "HablaYa" },
      captureUrl: "https://hablaya.cloud/",
      classification: "public-marketing",
      alt: {
        en: "HablaYa learning page showing multilingual practice with voice and text options.",
        es: "Página de HablaYa con práctica de idiomas y opciones de voz y texto.",
      },
      caveat: {
        en: "The visible learner interface is public example content, not learner activity.",
        es: "La interfaz visible usa contenido público de ejemplo, no actividad de estudiantes.",
      },
      durationSeconds: 20,
    }),
    copy: {
      en: {
        title: "HablaYa — Language practice that stays in one place",
        seoTitle: "HablaYa Case Study | Jorge Gasca",
        seoDescription:
          "How Jorge Gasca built a responsive language-learning journey across lessons, text and voice practice, vocabulary, and progress.",
        stageLabel: "Live EdTech product",
        sourceLabel: "Private source",
        role: "Independent product builder",
        cardResult:
          "Unified lessons, voice and text practice, vocabulary, games, and progress in one responsive journey.",
        summary:
          "HablaYa brings guided lessons, text and voice practice, vocabulary, games, and progress into one responsive learning journey.",
        ownership:
          "I designed the learning experience, connected the practice and content systems, built the responsive multilingual interface, and tested releases across the learner journey.",
        challenge:
          "Learners lose momentum when the lesson, conversation practice, vocabulary, and progress record feel like separate products. The experience needed a clear loop from learning something to using it.",
        actions: [
          "I brought lessons, conversations, activities, games, vocabulary, and progress into a shared navigation model.",
          "I built multilingual, responsive, and installable web-app behavior for practice across devices.",
          "I added review boundaries around generated course and audio material before it can be treated as finished content.",
        ],
        outcome:
          "The live product gives learners a clearer path from a lesson into practice and back to saved progress, with text and voice available from the same experience.",
        decisionRationale:
          "I kept chat and voice interactions in the foreground while secondary work runs without blocking the learner. Practice feels broken if the interface makes someone wait without useful feedback.",
        reflection:
          "Building HablaYa reinforced that a learning product is not a content library. The useful product is the practice loop and the confidence to take the next turn.",
        currentStatus:
          "HablaYa is a live EdTech product. Its current production repository is private.",
        limitations: [
          "Portfolio media uses public example screens and does not include learner accounts, conversations, or progress records.",
          "Authenticated chat delivery and real-device microphone quality require separate testing and are not demonstrated by these public captures.",
        ],
        coverAlt: "HablaYa learning page with multilingual practice and voice and text options.",
        videoDescription:
          "A short learner journey from a lesson into practice and feedback.",
        videoTranscript:
          "The walkthrough starts on a HablaYa learning activity, moves into text and voice practice, and ends with the feedback and progress areas that help the learner choose what to do next. The screens use public example content.",
      },
      es: {
        title: "HablaYa — Práctica de idiomas en un solo recorrido",
        seoTitle: "Caso HablaYa | Jorge Gasca",
        seoDescription:
          "Cómo Jorge Gasca construyó un recorrido responsive para aprender idiomas con lecciones, práctica por texto y voz, vocabulario y progreso.",
        stageLabel: "Producto EdTech en vivo",
        sourceLabel: "Código privado",
        role: "Creador independiente de producto",
        cardResult:
          "Unifiqué lecciones, práctica por voz y texto, vocabulario, juegos y progreso en un recorrido responsive.",
        summary:
          "HablaYa reúne lecciones guiadas, práctica por texto y voz, vocabulario, juegos y progreso en una experiencia que funciona en distintos dispositivos.",
        ownership:
          "Diseñé la experiencia de aprendizaje, conecté los sistemas de práctica y contenido, construí la interfaz multilingüe y responsive, y probé los lanzamientos desde el punto de vista del estudiante.",
        challenge:
          "Se pierde el ritmo cuando la lección, la conversación, el vocabulario y el progreso parecen productos separados. Hacía falta un ciclo claro entre aprender algo y ponerlo en práctica.",
        actions: [
          "Organicé lecciones, conversaciones, actividades, juegos, vocabulario y progreso dentro de una navegación común.",
          "Construí una experiencia multilingüe, responsive e instalable para practicar en distintos dispositivos.",
          "Agregué revisiones para que el contenido y el audio generados no se presenten como terminados antes de ser evaluados.",
        ],
        outcome:
          "El producto activo ofrece un camino más claro de la lección a la práctica y de regreso al progreso guardado, con texto y voz dentro de la misma experiencia.",
        decisionRationale:
          "Mantuve el chat y la voz como tareas principales mientras los procesos secundarios trabajan sin bloquear la pantalla. La práctica pierde sentido si la interfaz deja esperando al estudiante sin explicar qué ocurre.",
        reflection:
          "HablaYa me confirmó que un producto educativo no es una biblioteca de contenido. El valor está en el ciclo de práctica y en darle al estudiante confianza para intentar el siguiente turno.",
        currentStatus:
          "HablaYa es un producto EdTech en operación. El repositorio de la versión actual es privado.",
        limitations: [
          "Los medios del portafolio usan pantallas públicas de ejemplo; no incluyen cuentas, conversaciones ni registros de progreso de estudiantes.",
          "La entrega del chat autenticado y la calidad del micrófono en dispositivos reales requieren pruebas aparte y no se demuestran con estas capturas.",
        ],
        coverAlt: "Página de HablaYa con práctica de idiomas y opciones de voz y texto.",
        videoDescription:
          "Un recorrido breve desde una lección hasta la práctica y la retroalimentación.",
        videoTranscript:
          "El recorrido comienza en una actividad de HablaYa, pasa a la práctica por texto y voz, y termina en las áreas de retroalimentación y progreso que ayudan a elegir el siguiente paso. Las pantallas usan contenido público de ejemplo.",
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
    media: {
      ...makeMedia({
        slug: "minitiendai",
        product: { en: "MiniTiendAI", es: "MiniTiendAI" },
        captureUrl: "https://minitiendai.com/",
        classification: "public-marketing",
        walkthroughClassification: "synthetic-demo",
        alt: {
          en: "MiniTiendAI homepage explaining how small businesses can create an online store and receive WhatsApp orders.",
          es: "Página principal de MiniTiendAI que explica cómo crear una tienda en línea y recibir pedidos por WhatsApp.",
        },
        caveat: {
          en: "The homepage is public; any store, products, cart, and order shown in the walkthrough are synthetic demo content.",
          es: "La página principal es pública; la tienda, los productos, el carrito y el pedido del recorrido son datos de demostración.",
        },
        durationSeconds: 24.08,
      }),
      secondary: [
        {
          id: "minitiendai-demo-store",
          kind: "image",
          classification: "synthetic-demo",
          captureUrl: "https://minitiendai.com/store.html?demo=restaurant",
          src: "/evidence/minitiendai/minitiendai-demo-store.png",
          viewport: { width: 1440, height: 900 },
          captureDate: "2026-08-09",
          privacyReviewed: true,
          alt: {
            en: "Synthetic MiniTiendAI restaurant demo with menu categories, products, cart controls, and a WhatsApp order action.",
            es: "Demo ficticia de un restaurante en MiniTiendAI con categorías, productos, carrito y una acción para pedir por WhatsApp.",
          },
          caption: {
            en: "Public synthetic demo store.",
            es: "Tienda pública con datos de demostración.",
          },
          caveat: {
            en: "The restaurant name, products, prices, and order are synthetic.",
            es: "El restaurante, los productos, los precios y el pedido son ficticios.",
          },
        },
      ],
    },
    copy: {
      en: {
        title: "MiniTiendAI — A simpler path from idea to online store",
        seoTitle: "MiniTiendAI Case Study | Jorge Gasca",
        seoDescription:
          "How Jorge Gasca led MiniTiendAI product development for store creation, responsive shopping, cart, and WhatsApp ordering.",
        stageLabel: "Live MVP",
        sourceLabel: "Private source",
        role: "Product Development Manager",
        cardResult:
          "Shipped a responsive storefront flow that turns a catalog and cart into a WhatsApp order.",
        summary:
          "MiniTiendAI helps a small business create a shareable store or menu, organize products, and turn a cart into a WhatsApp order without setting up a large commerce platform.",
        ownership:
          "As Product Development Manager from March 2024 to May 2025, I led the creation journeys, storefront UX, product data, commerce handoffs, QA, and release checks.",
        challenge:
          "A first-time seller needs to go from a business idea to a useful storefront without learning a complicated dashboard or depending on AI generation for every step.",
        actions: [
          "I brought AI-assisted, template, manual, and import-based creation into one product journey.",
          "I designed the storefront themes, catalog, cart, ordering flow, and image fallbacks for desktop and mobile.",
          "I kept manual editing available when generation was unavailable or produced something the owner did not want.",
          "I tested authentication, store ownership, saved dashboard state, and the handoff from cart to WhatsApp.",
        ],
        outcome:
          "The live MVP now offers several ways to create a store, lets the owner preview and edit it, and gives shoppers a mobile-friendly path from catalog to WhatsApp.",
        decisionRationale:
          "I treated AI generation as an accelerator, not a gate. A merchant can still create and edit a useful store when generation is unavailable or the first result is not right.",
        reflection:
          "The most useful automation was the one that shortened setup without taking control away from the owner. That balance shaped both the creation flow and the editing tools.",
        currentStatus:
          "MiniTiendAI is a live MVP with private source. The homepage is the primary portfolio image; the restaurant storefront is a separate public demo with synthetic data.",
        limitations: [
          "The portfolio does not show owner, admin, or customer account data.",
          "WhatsApp and provider-hosted payment links are external handoffs; opening a link does not confirm message delivery or payment settlement.",
        ],
        coverAlt: "MiniTiendAI homepage with its online-store and WhatsApp-ordering message.",
        videoDescription:
          "A short path from the MiniTiendAI homepage into a demo store, cart, and WhatsApp handoff.",
        videoTranscript:
          "The walkthrough begins on the MiniTiendAI homepage, opens the public synthetic restaurant store, adds a demo item to the cart, and reaches the WhatsApp order handoff without sending a message. The restaurant, products, prices, and cart are all demo data.",
      },
      es: {
        title: "MiniTiendAI — Un camino sencillo de la idea a la tienda",
        seoTitle: "Caso MiniTiendAI | Jorge Gasca",
        seoDescription:
          "Cómo Jorge Gasca lideró el desarrollo de MiniTiendAI: creación de tiendas, compra responsive, carrito y pedidos por WhatsApp.",
        stageLabel: "MVP en vivo",
        sourceLabel: "Código privado",
        role: "Product Development Manager",
        cardResult:
          "Lancé un flujo responsive que convierte catálogo y carrito en un pedido por WhatsApp.",
        summary:
          "MiniTiendAI ayuda a un pequeño negocio a crear una tienda o menú compartible, ordenar sus productos y convertir el carrito en un pedido por WhatsApp sin instalar una gran plataforma de comercio.",
        ownership:
          "Como Product Development Manager de marzo de 2024 a mayo de 2025, lideré los recorridos de creación, la UX de la tienda, los datos de producto, las conexiones comerciales, el QA y las revisiones de lanzamiento.",
        challenge:
          "Quien vende por primera vez necesita pasar de una idea a una tienda útil sin aprender un panel complicado ni depender de la generación con IA para cada paso.",
        actions: [
          "Reuní en un solo recorrido la creación asistida por IA, las plantillas, la carga manual y la importación.",
          "Diseñé los temas, el catálogo, el carrito, el pedido y los reemplazos de imagen para desktop y móvil.",
          "Mantuve la edición manual cuando la generación no estaba disponible o el primer resultado no servía al negocio.",
          "Probé la autenticación, la propiedad de las tiendas, el estado guardado del panel y el paso del carrito a WhatsApp.",
        ],
        outcome:
          "El MVP activo ofrece varias formas de crear una tienda, permite verla y editarla antes de compartirla, y da al comprador un camino cómodo del catálogo a WhatsApp desde el celular.",
        decisionRationale:
          "Usé la generación con IA para acelerar el trabajo, no para bloquearlo. El negocio puede crear y editar su tienda aunque la generación falle o el primer resultado no sea el adecuado.",
        reflection:
          "La automatización más útil fue la que redujo el tiempo de configuración sin quitarle control al dueño. Ese equilibrio definió tanto la creación como las herramientas de edición.",
        currentStatus:
          "MiniTiendAI es un MVP en operación con código privado. La página principal es la imagen central del caso; el restaurante es una demo pública separada con datos ficticios.",
        limitations: [
          "El portafolio no muestra información de dueños, administradores ni clientes.",
          "WhatsApp y los enlaces de pago son pasos hacia servicios externos; abrirlos no confirma la entrega del mensaje ni la liquidación del pago.",
        ],
        coverAlt: "Página principal de MiniTiendAI con su propuesta de tienda en línea y pedidos por WhatsApp.",
        videoDescription:
          "Un recorrido breve desde la página principal de MiniTiendAI hasta una tienda demo, el carrito y el paso a WhatsApp.",
        videoTranscript:
          "El recorrido comienza en la página principal de MiniTiendAI, abre la tienda pública ficticia de un restaurante, agrega un producto de demostración al carrito y llega al paso de pedido por WhatsApp sin enviar el mensaje. El restaurante, los productos, los precios y el carrito son datos de demostración.",
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
    media: makeMedia({
      slug: "ordenai",
      product: { en: "OrdenAI", es: "OrdenAI" },
      captureUrl: "https://ordenai.cloud/",
      classification: "public-marketing",
      alt: {
        en: "OrdenAI homepage showing a restaurant order workflow across customer channels and operations.",
        es: "Página de OrdenAI con un flujo de pedidos que conecta canales de clientes y operaciones del restaurante.",
      },
      caveat: {
        en: "This public pilot view is not an authenticated restaurant account or a claim of general availability.",
        es: "Esta vista pública del piloto no es una cuenta autenticada de restaurante ni implica disponibilidad general.",
      },
      durationSeconds: 20,
    }),
    copy: {
      en: {
        title: "OrdenAI — Restaurant orders without the channel gaps",
        seoTitle: "OrdenAI Case Study | Jorge Gasca",
        seoDescription:
          "How Jorge Gasca designed OrdenAI to connect restaurant order capture, kitchen work, inventory, and customer channels.",
        stageLabel: "Live pilot",
        sourceLabel: "Private source",
        role: "Independent product builder",
        cardResult:
          "Connected customer ordering channels with kitchen, catalog, inventory, and operations views.",
        summary:
          "OrdenAI connects orders from web and messaging channels with the restaurant’s kitchen, catalog, inventory, customer records, and daily operations.",
        ownership:
          "I designed the product domain, mapped the customer-to-kitchen journey, built the responsive workflows and channel connections, and handled security boundaries, monitoring, and release checks.",
        challenge:
          "An order can arrive through the web, WhatsApp, or Telegram, but the kitchen still needs one reliable version of what was ordered. Separate systems create duplicate work and make status changes hard to trust.",
        actions: [
          "I defined how organizations, locations, team membership, catalogs, and orders fit together.",
          "I connected channel intake to a shared order model and the kitchen’s working view.",
          "I added localization, responsive behavior, release checks, and monitoring around the operational flow.",
        ],
        outcome:
          "The limited pilot uses one server-controlled order record across the public menu, messaging intake, kitchen status, inventory changes, and customer follow-up.",
        decisionRationale:
          "I made order changes repeat-safe and kept an audit trail because messaging providers can retry a webhook. The restaurant should not receive a duplicate order because the network repeated a request.",
        reflection:
          "OrdenAI made the difference between a feature and an operation very concrete: a button is easy; a trustworthy order needs history, ownership, and a safe response when another system retries.",
        currentStatus:
          "OrdenAI is a live, limited pilot with private source. It is not presented as a generally available enterprise platform.",
        limitations: [
          "Native payments, refunds, POS hardware, enterprise SSO, and SCIM are outside the pilot.",
          "Opening a provider-hosted payment link does not confirm that a payment was completed.",
        ],
        coverAlt: "OrdenAI homepage with a restaurant order workflow across customer channels and operations.",
        videoDescription:
          "A short path from menu and channel setup to an order and its restaurant operations view.",
        videoTranscript:
          "The walkthrough begins with the OrdenAI menu and channel setup, follows a synthetic order into the shared order flow, and finishes on the restaurant operations view. No customer or restaurant account information is shown.",
      },
      es: {
        title: "OrdenAI — Pedidos de restaurante sin perderlos entre canales",
        seoTitle: "Caso OrdenAI | Jorge Gasca",
        seoDescription:
          "Cómo Jorge Gasca diseñó OrdenAI para conectar pedidos, cocina, inventario y canales de atención en restaurantes.",
        stageLabel: "Piloto en vivo",
        sourceLabel: "Código privado",
        role: "Creador independiente de producto",
        cardResult:
          "Conecté los canales de pedido con cocina, catálogo, inventario y vistas operativas.",
        summary:
          "OrdenAI conecta los pedidos que llegan por web y mensajería con cocina, catálogo, inventario, clientes y la operación diaria del restaurante.",
        ownership:
          "Diseñé el modelo del producto, tracé el camino del cliente a cocina, construí los flujos responsive y las conexiones de canales, y trabajé en seguridad, monitoreo y revisiones de lanzamiento.",
        challenge:
          "Un pedido puede llegar por web, WhatsApp o Telegram, pero cocina necesita una sola versión confiable. Los sistemas separados duplican trabajo y vuelven difíciles de creer los cambios de estado.",
        actions: [
          "Definí cómo se relacionan organizaciones, sucursales, integrantes, catálogos y pedidos.",
          "Conecté la entrada desde cada canal con un pedido compartido y la vista de trabajo de cocina.",
          "Agregué localización, comportamiento responsive, revisiones de lanzamiento y monitoreo al flujo operativo.",
        ],
        outcome:
          "El piloto limitado usa un solo registro de pedido controlado por el servidor para el menú público, la mensajería, el estado de cocina, los cambios de inventario y el seguimiento al cliente.",
        decisionRationale:
          "Hice que los cambios de pedido soportaran reintentos y conservaran historial porque los proveedores de mensajería pueden repetir un webhook. Un problema de red no debe crear un pedido duplicado.",
        reflection:
          "OrdenAI volvió muy concreta la diferencia entre una función y una operación: un botón es sencillo; un pedido confiable necesita historia, responsables y una respuesta segura cuando otro sistema reintenta.",
        currentStatus:
          "OrdenAI es un piloto activo y limitado con código privado. No se presenta como una plataforma empresarial de disponibilidad general.",
        limitations: [
          "Los pagos nativos, reembolsos, hardware POS, SSO empresarial y SCIM quedan fuera del piloto.",
          "Abrir un enlace de pago alojado por un proveedor no confirma que el pago se haya completado.",
        ],
        coverAlt: "Página de OrdenAI con un flujo de pedidos entre canales de clientes y operaciones.",
        videoDescription:
          "Un recorrido breve desde la configuración del menú y los canales hasta un pedido y su vista operativa.",
        videoTranscript:
          "El recorrido comienza con la configuración del menú y los canales de OrdenAI, sigue un pedido ficticio dentro del flujo compartido y termina en la vista operativa del restaurante. No se muestra información de clientes ni de cuentas de restaurantes.",
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
    media: makeMedia({
      slug: "zentix-office",
      product: { en: "Zentix Office", es: "Zentix Office" },
      captureUrl: "https://zentix-office.vercel.app/demo/",
      classification: "simulation",
      alt: {
        en: "Zentix Office simulated control room with AI team cards, sample activity, and a status board.",
        es: "Sala de control simulada de Zentix Office con tarjetas de equipo, actividad de ejemplo y un tablero de estado.",
      },
      caveat: {
        en: "Every activity and status shown is simulated; this is not an operational system.",
        es: "Toda la actividad y los estados son simulados; no es un sistema en operación.",
      },
      durationSeconds: 20,
    }),
    copy: {
      en: {
        title: "Zentix Office — Showing an AI-team idea without faking activity",
        seoTitle: "Zentix Office POC | Jorge Gasca",
        seoDescription:
          "How Jorge Gasca built a bilingual, clearly labeled simulation for evaluating an AI-team concept before integration.",
        stageLabel: "Simulated POC",
        sourceLabel: "Public source",
        role: "Independent product builder",
        cardResult:
          "Made the AI-team concept inspectable without presenting simulated activity as live telemetry.",
        summary:
          "Zentix Office is a bilingual concept site and control-room simulation for explaining how a team of AI agents might be evaluated before any real integration.",
        ownership:
          "I reframed the concept, designed the bilingual acquisition and demo journeys, built the TypeScript implementation, and added privacy boundaries and automated checks.",
        challenge:
          "A prospective customer needs to understand a complex agent system before connecting data or tools, but a polished simulation can easily be mistaken for live operational activity.",
        actions: [
          "I separated the acquisition, demo, and privacy journeys and kept the simulation label visible throughout the control room.",
          "I built the sample team, activity, and status interactions, then added input controls, browser-local recording boundaries, and automated QA.",
        ],
        outcome:
          "The public POC lets someone inspect the concept, switch languages, and explore the simulated control room while the page continuously identifies the experience as a simulation.",
        decisionRationale:
          "I chose a permanent simulation label instead of a one-time disclaimer. The distinction between sample activity and real telemetry should remain clear at the exact moment someone sees a status or event.",
        reflection:
          "This project was a useful reminder that transparency is part of the interface. A caveat hidden in documentation cannot correct a misleading product screen.",
        currentStatus:
          "The bilingual static experience and public repository are available. Zentix Office remains a simulated POC, not an operating AI team.",
        limitations: [
          "The API health route currently returns 503 because its runtime configuration is missing.",
          "The evaluation form, notification delivery, booking handoff, and operational automation are not presented as working.",
          "Optional screen recording is user-initiated and stays in the browser; it is not an uploaded session replay.",
        ],
        coverAlt: "Zentix Office simulation with AI team cards, sample activity, and a status board.",
        videoDescription:
          "A short tour of the labeled simulation, sample team, activity, and status controls.",
        videoTranscript:
          "The walkthrough opens with the visible simulation notice, moves through the sample AI-team cards and activity, and finishes on the status board. The events and statuses are fictional examples and do not come from a live operation.",
      },
      es: {
        title: "Zentix Office — Explicar un equipo de IA sin fingir actividad",
        seoTitle: "POC Zentix Office | Jorge Gasca",
        seoDescription:
          "Cómo Jorge Gasca construyó una simulación bilingüe y claramente identificada para evaluar el concepto de un equipo de IA antes de integrarlo.",
        stageLabel: "POC simulado",
        sourceLabel: "Repositorio público",
        role: "Creador independiente de producto",
        cardResult:
          "Hice inspeccionable el concepto de equipo con IA sin presentar actividad simulada como telemetría real.",
        summary:
          "Zentix Office es un sitio bilingüe y una sala de control simulada para explicar cómo podría evaluarse un equipo de agentes de IA antes de conectar herramientas o datos reales.",
        ownership:
          "Replanteé el concepto, diseñé los recorridos bilingües de presentación y demo, construí la implementación en TypeScript, y agregué límites de privacidad y pruebas automatizadas.",
        challenge:
          "Una persona necesita entender un sistema complejo antes de integrarlo, pero una simulación bien presentada puede confundirse con actividad operativa real.",
        actions: [
          "Separé los recorridos de presentación, demo y privacidad, y mantuve visible la etiqueta de simulación en toda la sala de control.",
          "Construí el equipo, la actividad y los estados de ejemplo, y después agregué controles de entrada, límites para la grabación local y QA automatizado.",
        ],
        outcome:
          "El POC público permite revisar el concepto, cambiar de idioma y explorar la sala de control mientras la interfaz recuerda en todo momento que se trata de una simulación.",
        decisionRationale:
          "Elegí una etiqueta permanente en lugar de un aviso que aparece una sola vez. La diferencia entre actividad ficticia y telemetría real debe quedar clara justo cuando alguien ve un estado o evento.",
        reflection:
          "Este proyecto me recordó que la transparencia también se diseña. Un aviso escondido en la documentación no corrige una pantalla que puede llevar a una conclusión equivocada.",
        currentStatus:
          "La experiencia bilingüe y el repositorio público están disponibles. Zentix Office sigue siendo un POC simulado, no un equipo de IA en operación.",
        limitations: [
          "La ruta de salud de la API devuelve 503 porque falta la configuración de runtime.",
          "El formulario de evaluación, las notificaciones, la agenda y la automatización operativa no se presentan como funcionales.",
          "La grabación opcional la inicia la persona y permanece en el navegador; no es una grabación de sesión enviada a un servidor.",
        ],
        coverAlt: "Simulación de Zentix Office con tarjetas de equipo, actividad ficticia y un tablero de estado.",
        videoDescription:
          "Un recorrido breve por el aviso de simulación, el equipo de ejemplo, la actividad y los estados.",
        videoTranscript:
          "El recorrido comienza con el aviso visible de simulación, pasa por las tarjetas del equipo ficticio y su actividad, y termina en el tablero de estado. Los eventos y estados son ejemplos; no provienen de una operación real.",
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
    media: makeMedia({
      slug: "tonalli-ai",
      product: { en: "Tonalli AI", es: "Tonalli AI" },
      captureUrl: "https://tonalli.cloud/app",
      classification: "guest-runtime",
      alt: {
        en: "Tonalli AI guest workspace with model and mode controls, a conversation composer, tools, and artifacts navigation.",
        es: "Espacio de invitado de Tonalli AI con controles de modelo y modo, compositor, herramientas y artefactos.",
      },
      caveat: {
        en: "The guest capture uses synthetic content and does not show an account, private prompt, or provider configuration.",
        es: "La captura de invitado usa contenido ficticio y no muestra cuentas, prompts privados ni configuración de proveedores.",
      },
      durationSeconds: 20,
    }),
    copy: {
      en: {
        title: "Tonalli AI — One workspace for models, tools, and follow-up",
        seoTitle: "Tonalli AI Case Study | Jorge Gasca",
        seoDescription:
          "How Jorge Gasca designed Tonalli AI to connect multi-model chat, tools, files, artifacts, voice, and scheduled follow-up.",
        stageLabel: "Live product demo",
        sourceLabel: "Private source",
        role: "Independent product builder",
        cardResult:
          "Combined models, tools, artifacts, scheduling, and delivery visibility in one guest workspace.",
        summary:
          "Tonalli AI brings chat, tools, files, voice, messaging, generated artifacts, and scheduled prompts into one experimental workspace.",
        ownership:
          "I designed the interaction model, connected model and tool workflows, built persistence and messaging behavior, and tested scheduled delivery and its failure states.",
        challenge:
          "AI-assisted work becomes hard to continue when the conversation, source files, generated result, and reminder to act on it all live in different products.",
        actions: [
          "I designed the model, mode, streaming-chat, and agent-tool experience around one conversation.",
          "I connected saved chats, custom agents, memory, files, voice, messaging, and rendered artifacts.",
          "I made scheduled delivery record its outcome and added a plain-text Telegram retry when formatted delivery fails.",
        ],
        outcome:
          "The live demo now shows how a conversation can continue into a tool result or artifact, remain available in the workspace, and become a scheduled follow-up on the web or Telegram.",
        decisionRationale:
          "I persisted the delivery result, not just the schedule request. A reminder feature is only useful when the person can see whether delivery succeeded, failed, or needs another attempt.",
        reflection:
          "Tonalli AI pushed me to think beyond the chat response. The useful unit of work includes the artifact, the next action, and a visible record of what happened afterward.",
        currentStatus:
          "Tonalli AI is a live product demo with private source. A guest workspace is publicly viewable, while provider-dependent actions require configured services.",
        limitations: [
          "The portfolio media uses synthetic guest content and does not include an account, a private prompt, or provider settings.",
          "The public capture does not by itself confirm model availability, voice or bot delivery, or a scheduled execution.",
        ],
        coverAlt: "Tonalli AI guest workspace with model controls, a composer, tools, and artifacts.",
        videoDescription:
          "A short synthetic flow from a conversation to an artifact and a scheduled follow-up.",
        videoTranscript:
          "The walkthrough opens a synthetic conversation in the Tonalli AI guest workspace, shows the related artifact area, and finishes on the scheduling controls and delivery-status view. No private prompt is submitted and no provider delivery is claimed by the recording.",
      },
      es: {
        title: "Tonalli AI — Modelos, herramientas y seguimiento en un mismo lugar",
        seoTitle: "Caso Tonalli AI | Jorge Gasca",
        seoDescription:
          "Cómo Jorge Gasca diseñó Tonalli AI para conectar chat multimodelo, herramientas, archivos, artefactos, voz y seguimiento programado.",
        stageLabel: "Demo de producto en vivo",
        sourceLabel: "Código privado",
        role: "Creador independiente de producto",
        cardResult:
          "Reuní modelos, herramientas, artefactos, programación y visibilidad de entrega en un espacio de invitado.",
        summary:
          "Tonalli AI reúne chat, herramientas, archivos, voz, mensajería, artefactos y prompts programados dentro de un espacio de trabajo experimental.",
        ownership:
          "Diseñé el modelo de interacción, conecté los flujos de modelos y herramientas, construí la persistencia y la mensajería, y probé la entrega programada y sus fallas.",
        challenge:
          "Es difícil continuar un trabajo asistido por IA cuando la conversación, los archivos, el resultado y el recordatorio para usarlo viven en productos distintos.",
        actions: [
          "Diseñé la experiencia de modelos, modos, chat en streaming y herramientas alrededor de una sola conversación.",
          "Conecté conversaciones guardadas, agentes, memoria, archivos, voz, mensajería y artefactos.",
          "Hice que cada entrega programada guardara su resultado y agregué un reintento en texto simple cuando falla el formato de Telegram.",
        ],
        outcome:
          "La demo activa muestra cómo una conversación puede continuar en una herramienta o artefacto, permanecer disponible y convertirse en un seguimiento programado en web o Telegram.",
        decisionRationale:
          "Guardé el resultado de la entrega, no solo la solicitud de programación. Un recordatorio sirve cuando la persona puede saber si se entregó, falló o necesita otro intento.",
        reflection:
          "Tonalli AI me hizo pensar más allá de la respuesta del chat. El trabajo también incluye el artefacto, la siguiente acción y un registro visible de lo que ocurrió después.",
        currentStatus:
          "Tonalli AI es una demo activa con código privado. El espacio de invitado puede verse públicamente, mientras las acciones que dependen de proveedores necesitan servicios configurados.",
        limitations: [
          "Los medios del portafolio usan contenido ficticio en modo invitado y no incluyen cuentas, prompts privados ni configuración de proveedores.",
          "La captura pública no confirma por sí sola la disponibilidad de modelos, la entrega por voz o bots ni una ejecución programada.",
        ],
        coverAlt: "Espacio de invitado de Tonalli AI con controles de modelo, compositor, herramientas y artefactos.",
        videoDescription:
          "Un recorrido breve y ficticio desde una conversación hasta un artefacto y un seguimiento programado.",
        videoTranscript:
          "El recorrido abre una conversación ficticia en el espacio de invitado de Tonalli AI, muestra el área de artefactos y termina en los controles de programación y estado de entrega. No se envía un prompt privado ni se afirma que un proveedor haya realizado la entrega.",
      },
    },
  },
];

export const caseStudySlugs = caseStudies.map((item) => item.slug);

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}

export function getNextCaseStudy(slug: CaseStudySlug) {
  const atlasOrder: CaseStudySlug[] = [
    "zentix",
    "minitiendai",
    "ordenai",
    "hablaya",
    "zentix-office",
    "tonalli-ai",
  ];
  const currentIndex = atlasOrder.indexOf(slug);
  const nextSlug = atlasOrder[(currentIndex + 1) % atlasOrder.length];
  return caseStudies.find((item) => item.slug === nextSlug) ?? caseStudies[0];
}
