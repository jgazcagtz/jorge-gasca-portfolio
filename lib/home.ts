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
  partner: {
    label: string;
    body: string;
    cta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    rolesTitle: string;
    rolesBody: string;
    projectsTitle: string;
    projectsBody: string;
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
      eyebrow: "Product Specialist · Product Builder · Sales Automation · Mexico City",
      headline: "I turn product ideas and messy workflows into tools people can actually use.",
      summary:
        "I work across product discovery, UX, CRM and sales automation, AI workflows, and hands-on delivery—from the first working prototype to release and QA.",
      availability:
        "Open to product roles and selected sales automation, SaaS, CRM, and AI workflow projects.",
      languages: "Spanish and English",
      primaryCta: "See selected work",
      secondaryCta: "Contact Jorge",
      proofLabel: "Six products, with clear ownership, current stage, and lessons learned.",
    },
    work: {
      eyebrow: "Selected work",
      title: "Six products, each at a different stage.",
      intro:
        "Some are live; one is a simulation. In each case I explain what I owned, show the product, and say what works today and what is still limited.",
      featured: "Flagship products",
      labs: "Labs",
      viewCase: "Read case study",
    },
    approach: {
      eyebrow: "How I work",
      title: "I start with where the customer gets stuck.",
      intro:
        "Then I map the next useful step, build what is missing, and test the complete journey on the screens people actually use.",
      steps: [
        {
          title: "Find the sticking point",
          body: "I listen to the customer, watch the workflow, and identify the moment progress stops or confidence drops.",
        },
        {
          title: "Map the next steps",
          body: "I turn the desired outcome into a sequence the customer and the team can both understand.",
        },
        {
          title: "Build the missing pieces",
          body: "I connect the interface, CRM, automation, and APIs needed to make the journey work end to end.",
        },
        {
          title: "Test the real journey",
          body: "I check desktop and mobile behavior, document what is still limited, and improve the flow from what I observe.",
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Product work grounded in customer conversations.",
      intro:
        "My background spans product delivery, sales, customer enablement, support, and teaching. That mix helps me explain complex tools and improve the moments where people lose momentum.",
      items: [
        {
          period: "May 2025 — Present",
          title: "Product Specialist · Apollo.io",
          body: "I help customers understand and adopt B2B SaaS workflows across prospecting, sequences, CRM, data quality, integrations, and deliverability.",
        },
        {
          period: "Mar 2024 — May 2025",
          title: "Product Development Manager · MiniTiendAI",
          body: "I led product development for a small-business storefront MVP, working across creation flows, responsive UX, commerce handoffs, QA, and releases.",
        },
        {
          period: "Earlier experience",
          title: "Sales, customer experience, and learning",
          body: "Earlier roles in sales, customer operations, and education taught me how to ask better questions, explain unfamiliar tools, and support people through change.",
        },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "What I bring to a team.",
      groups: [
        {
          title: "Customer enablement",
          items: ["Onboarding", "Journey mapping", "Enablement", "Documentation", "Customer discovery"],
        },
        {
          title: "Sales automation & CRM",
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
    partner: {
      label: "Marblism partner",
      body:
        "As a Marblism partner, I help teams evaluate where AI employees can remove repetitive work and connect the setup to a practical sales, customer, or operations workflow.",
      cta: "Explore Marblism",
    },
    contact: {
      eyebrow: "Let’s talk",
      title: "Looking for someone who can connect customers, product, and implementation?",
      intro:
        "I’m open to product roles and selected projects involving sales automation, SaaS, CRM, and AI workflows.",
      rolesTitle: "Roles",
      rolesBody: "For product, product operations, sales automation, and customer experience opportunities, reach me by email or LinkedIn.",
      projectsTitle: "Projects",
      projectsBody: "For a sales automation, SaaS, CRM, or AI workflow project, send a short brief by email or WhatsApp.",
      whatsapp: "Message on WhatsApp",
      email: "Send an email",
      linkedIn: "Connect on LinkedIn",
      phone: "Call",
    },
    footer: {
      note: "Jorge Gasca · Product & Sales Automation Specialist · Mexico City",
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
      eyebrow: "Product Specialist · Creador de producto · Automatización de ventas · Ciudad de México",
      headline: "Convierto ideas de producto y flujos complicados en herramientas que las personas pueden usar.",
      summary:
        "Trabajo con descubrimiento, UX, automatización de ventas y CRM, flujos con IA e implementación: desde el primer prototipo hasta el lanzamiento y el QA.",
      availability:
        "Estoy abierto a puestos de producto y a proyectos seleccionados de automatización de ventas, SaaS, CRM y flujos con IA.",
      languages: "Español e inglés",
      primaryCta: "Ver proyectos",
      secondaryCta: "Contactar a Jorge",
      proofLabel: "Seis productos con responsabilidades, etapa actual y aprendizajes claros.",
    },
    work: {
      eyebrow: "Proyectos destacados",
      title: "Seis productos, cada uno en una etapa distinta.",
      intro:
        "Algunos están en operación y uno es una simulación. En cada caso explico qué hice, muestro el producto y aclaro qué funciona hoy y qué falta por mejorar.",
      featured: "Productos principales",
      labs: "Laboratorio",
      viewCase: "Ver proyecto",
    },
    approach: {
      eyebrow: "Cómo trabajo",
      title: "Empiezo por el punto donde el cliente se atora.",
      intro:
        "Después defino el siguiente paso útil, construyo lo que hace falta y pruebo el recorrido completo en las pantallas que las personas usan.",
      steps: [
        {
          title: "Encontrar el bloqueo",
          body: "Escucho al cliente, observo el flujo y ubico el momento en que se detiene el avance o aparecen dudas.",
        },
        {
          title: "Ordenar los siguientes pasos",
          body: "Convierto el resultado esperado en una secuencia clara para el cliente y para el equipo.",
        },
        {
          title: "Construir lo que falta",
          body: "Conecto la interfaz, el CRM, las automatizaciones y las APIs necesarias para completar el recorrido.",
        },
        {
          title: "Probar el recorrido real",
          body: "Reviso el comportamiento en desktop y móvil, documento los límites y ajusto el flujo según lo que encuentro.",
        },
      ],
    },
    experience: {
      eyebrow: "Experiencia",
      title: "Trabajo de producto basado en conversaciones con clientes.",
      intro:
        "Mi experiencia reúne entrega de producto, ventas, habilitación de clientes, soporte y enseñanza. Esa combinación me ayuda a explicar herramientas complejas y mejorar los momentos donde las personas pierden impulso.",
      items: [
        {
          period: "Mayo 2025 — Actualidad",
          title: "Product Specialist · Apollo.io",
          body: "Ayudo a clientes a entender y adoptar flujos SaaS B2B de prospección, secuencias, CRM, calidad de datos, integraciones y entregabilidad.",
        },
        {
          period: "Marzo 2024 — Mayo 2025",
          title: "Product Development Manager · MiniTiendAI",
          body: "Lideré el desarrollo de un MVP de tiendas para pequeños negocios, desde los flujos de creación y la UX responsive hasta las conexiones comerciales, el QA y los lanzamientos.",
        },
        {
          period: "Experiencia anterior",
          title: "Ventas, experiencia de cliente y aprendizaje",
          body: "Mis roles anteriores en ventas, atención a clientes y educación me enseñaron a hacer mejores preguntas, explicar herramientas nuevas y acompañar procesos de cambio.",
        },
      ],
    },
    skills: {
      eyebrow: "Habilidades",
      title: "Lo que aporto a un equipo.",
      groups: [
        {
          title: "Habilitación de clientes",
          items: ["Diseño de recorridos", "Habilitación", "Documentación", "Descubrimiento", "Claridad de flujos"],
        },
        {
          title: "Automatización de ventas y CRM",
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
    partner: {
      label: "Partner de Marblism",
      body:
        "Como partner de Marblism, ayudo a evaluar dónde los empleados con IA pueden reducir trabajo repetitivo y conecto la configuración con flujos prácticos de ventas, clientes u operaciones.",
      cta: "Conocer Marblism",
    },
    contact: {
      eyebrow: "Hablemos",
      title: "¿Buscas a alguien que conecte clientes, producto e implementación?",
      intro:
        "Estoy abierto a puestos de producto y a proyectos seleccionados de automatización de ventas, SaaS, CRM y flujos con IA.",
      rolesTitle: "Oportunidades laborales",
      rolesBody: "Para puestos de producto, operaciones de producto, automatización de ventas o experiencia de cliente, contáctame por correo o LinkedIn.",
      projectsTitle: "Proyectos",
      projectsBody: "Para un proyecto de automatización de ventas, SaaS, CRM o flujos con IA, envíame un breve contexto por correo o WhatsApp.",
      whatsapp: "Escribir por WhatsApp",
      email: "Enviar correo",
      linkedIn: "Conectar en LinkedIn",
      phone: "Llamar",
    },
    footer: {
      note: "Jorge Gasca · Producto y Automatización de Ventas · Ciudad de México",
      rights: "El contenido personal, la marca y los medios de producto tienen derechos reservados.",
    },
  },
};
