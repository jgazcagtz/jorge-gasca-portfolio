import type { Locale } from "@/lib/site";

export type HomeCopy = {
  nav: {
    work: string;
    approach: string;
    experience: string;
    contact: string;
    menu: string;
    theme: string;
    language: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    summary: string;
    availability: string;
    languages: string;
    primaryCta: string;
    secondaryCta: string;
    proofLabel: string;
  };
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    featured: string;
    labs: string;
    viewCase: string;
  };
  approach: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
  };
  experience: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ period: string; title: string; body: string }>;
  };
  skills: {
    eyebrow: string;
    title: string;
    groups: Array<{ title: string; items: string[] }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    whatsapp: string;
    email: string;
    linkedIn: string;
    phone: string;
  };
  footer: {
    note: string;
    rights: string;
  };
};

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    nav: {
      work: "Selected work",
      approach: "How I work",
      experience: "Experience",
      contact: "Contact",
      menu: "Menu",
      theme: "Change color theme",
      language: "Ver en español",
    },
    hero: {
      eyebrow: "Mexico City · Remote collaboration",
      headline:
        "SaaS Onboarding & Product Builder | CRM Automation, AI Workflows, Customer Experience.",
      summary:
        "I turn complex SaaS and AI workflows into clear products and customer journeys people can understand, adopt, and use.",
      availability: "Available for remote product and onboarding work",
      languages: "Spanish · English",
      primaryCta: "View selected work",
      secondaryCta: "Start a WhatsApp conversation",
      proofLabel: "Six product case studies across SaaS, AI, commerce, and learning.",
    },
    work: {
      eyebrow: "Selected work",
      title: "Products shaped around real adoption friction.",
      intro:
        "A curated view of live products, pilots, and clearly labeled experiments. Private code stays private; the work is shown through approved product evidence and honest scope.",
      featured: "Flagship products",
      labs: "Labs",
      viewCase: "Read case study",
    },
    approach: {
      eyebrow: "How I work",
      title: "From customer friction to a product people can use.",
      intro:
        "I combine onboarding conversations, workflow design, hands-on delivery, and practical QA. The goal is not novelty—it is clarity, confidence, and a useful next step.",
      steps: [
        {
          title: "Discover friction",
          body: "Listen for the moment a customer, teammate, or workflow loses context, trust, or momentum.",
        },
        {
          title: "Design the journey",
          body: "Turn the desired outcome into a clear sequence, with the right information and decisions at each step.",
        },
        {
          title: "Build and integrate",
          body: "Connect interface, automation, APIs, and operational boundaries without hiding complexity from the team.",
        },
        {
          title: "Test and iterate",
          body: "Verify behavior on real screens, document limitations, and improve the path using evidence instead of assumptions.",
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Customer context, product judgment, technical follow-through.",
      intro:
        "My work sits between the customer journey and the product surface: understanding the outcome, translating the workflow, and helping it hold up in practice.",
      items: [
        {
          period: "May 2025 — Present",
          title: "Product Specialist · Apollo.io",
          body: "B2B SaaS onboarding across prospecting, email, sequences, CRM, data quality, integrations, deliverability, documentation, and adoption.",
        },
        {
          period: "Mar 2024 — May 2025",
          title: "Product Development Manager · MiniTiendAI",
          body: "Product development and end-to-end delivery for a small-business storefront MVP, including responsive journeys, integrations, QA, and release verification.",
        },
        {
          period: "Earlier experience",
          title: "Sales, customer experience, and learning",
          body: "Sales Specialist at CrazyCall (Mar 2020 — Jul 2022) and Sales Executive / Academic Coordinator at S-Peak (Jan 2011 — Jan 2019), focused on consultative communication, customer journeys, and training.",
        },
      ],
    },
    skills: {
      eyebrow: "Working toolkit",
      title: "A hybrid operator’s range.",
      groups: [
        {
          title: "Onboarding & adoption",
          items: ["Journey mapping", "Enablement", "Documentation", "Customer discovery", "Workflow clarity"],
        },
        {
          title: "CRM & automation",
          items: ["Apollo.io", "HubSpot", "Salesforce", "Zapier / Make", "Webhooks"],
        },
        {
          title: "Product UX & QA",
          items: ["Responsive UX", "Accessibility", "Behavioral QA", "Prototyping", "Release verification"],
        },
        {
          title: "Web & API delivery",
          items: ["TypeScript / JavaScript", "React / Next.js", "Firebase / Supabase", "Vercel", "REST APIs"],
        },
      ],
    },
    contact: {
      eyebrow: "Let’s talk",
      title: "Have a complex workflow that should feel simple?",
      intro:
        "I’m open to remote SaaS onboarding, product operations, customer experience, and hands-on product delivery conversations.",
      whatsapp: "Message on WhatsApp",
      email: "Send an email",
      linkedIn: "Connect on LinkedIn",
      phone: "Call",
    },
    footer: {
      note: "Built as a bilingual, evidence-led product portfolio.",
      rights: "Personal copy, branding, and product media are rights reserved.",
    },
  },
  es: {
    nav: {
      work: "Trabajo seleccionado",
      approach: "Cómo trabajo",
      experience: "Experiencia",
      contact: "Contacto",
      menu: "Menú",
      theme: "Cambiar tema de color",
      language: "View in English",
    },
    hero: {
      eyebrow: "Ciudad de México · Colaboración remota",
      headline:
        "Especialista en Onboarding SaaS y Creador de Productos | Automatización CRM, IA y Experiencia de Cliente.",
      summary:
        "Convierto flujos complejos de SaaS e IA en productos y recorridos de cliente que las personas pueden entender, adoptar y usar.",
      availability: "Disponible para trabajo remoto de producto y onboarding",
      languages: "Español · Inglés",
      primaryCta: "Ver trabajo seleccionado",
      secondaryCta: "Iniciar conversación por WhatsApp",
      proofLabel: "Seis casos de producto en SaaS, IA, comercio y aprendizaje.",
    },
    work: {
      eyebrow: "Trabajo seleccionado",
      title: "Productos diseñados desde fricciones reales de adopción.",
      intro:
        "Una selección de productos activos, pilotos y experimentos claramente identificados. El código privado permanece privado; el trabajo se presenta con evidencia aprobada y alcance honesto.",
      featured: "Productos principales",
      labs: "Laboratorio",
      viewCase: "Leer caso de estudio",
    },
    approach: {
      eyebrow: "Cómo trabajo",
      title: "De la fricción del cliente a un producto que se puede usar.",
      intro:
        "Combino conversaciones de onboarding, diseño de flujos, entrega práctica y QA. El objetivo no es la novedad: es claridad, confianza y un siguiente paso útil.",
      steps: [
        {
          title: "Descubrir la fricción",
          body: "Escucho el momento en que un cliente, un equipo o un flujo pierde contexto, confianza o impulso.",
        },
        {
          title: "Diseñar el recorrido",
          body: "Convierto el resultado deseado en una secuencia clara, con la información y decisiones correctas en cada paso.",
        },
        {
          title: "Construir e integrar",
          body: "Conecto interfaz, automatización, APIs y límites operativos sin ocultar la complejidad al equipo.",
        },
        {
          title: "Probar e iterar",
          body: "Verifico el comportamiento en pantallas reales, documento límites y mejoro el recorrido con evidencia.",
        },
      ],
    },
    experience: {
      eyebrow: "Experiencia",
      title: "Contexto de cliente, criterio de producto y seguimiento técnico.",
      intro:
        "Mi trabajo vive entre el recorrido del cliente y la superficie del producto: entender el resultado, traducir el flujo y ayudar a que funcione en la práctica.",
      items: [
        {
          period: "Mayo 2025 — Actualidad",
          title: "Product Specialist · Apollo.io",
          body: "Onboarding SaaS B2B en prospección, correo, secuencias, CRM, calidad de datos, integraciones, entregabilidad, documentación y adopción.",
        },
        {
          period: "Marzo 2024 — Mayo 2025",
          title: "Product Development Manager · MiniTiendAI",
          body: "Desarrollo de producto y entrega integral de un MVP de tiendas para pequeños negocios, incluyendo recorridos responsive, integraciones, QA y verificación de releases.",
        },
        {
          period: "Experiencia anterior",
          title: "Ventas, experiencia de cliente y aprendizaje",
          body: "Sales Specialist en CrazyCall (marzo 2020 — julio 2022) y Sales Executive / Academic Coordinator en S-Peak (enero 2011 — enero 2019), con foco en comunicación consultiva, recorridos de cliente y capacitación.",
        },
      ],
    },
    skills: {
      eyebrow: "Herramientas de trabajo",
      title: "El alcance de un operador híbrido.",
      groups: [
        {
          title: "Onboarding y adopción",
          items: ["Diseño de recorridos", "Habilitación", "Documentación", "Descubrimiento", "Claridad de flujos"],
        },
        {
          title: "CRM y automatización",
          items: ["Apollo.io", "HubSpot", "Salesforce", "Zapier / Make", "Webhooks"],
        },
        {
          title: "UX de producto y QA",
          items: ["UX responsive", "Accesibilidad", "QA de comportamiento", "Prototipado", "Verificación de releases"],
        },
        {
          title: "Entrega web y APIs",
          items: ["TypeScript / JavaScript", "React / Next.js", "Firebase / Supabase", "Vercel", "APIs REST"],
        },
      ],
    },
    contact: {
      eyebrow: "Hablemos",
      title: "¿Tienes un flujo complejo que debería sentirse simple?",
      intro:
        "Estoy abierto a conversaciones remotas sobre onboarding SaaS, operaciones de producto, experiencia de cliente y entrega práctica de productos.",
      whatsapp: "Escribir por WhatsApp",
      email: "Enviar correo",
      linkedIn: "Conectar en LinkedIn",
      phone: "Llamar",
    },
    footer: {
      note: "Creado como un portafolio bilingüe de producto basado en evidencia.",
      rights: "El contenido personal, la marca y los medios de producto tienen derechos reservados.",
    },
  },
};
