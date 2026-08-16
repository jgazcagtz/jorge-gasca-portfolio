import type { Locale } from "@/lib/site";

export type HomeCopy = {
  nav: {
    work: string;
    approach: string;
    experience: string;
    cv: string;
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
    cta: string;
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
      cv: "CV",
      contact: "Contact",
      menu: "Menu",
      theme: "Change color theme",
      language: "Ver en español",
    },
    hero: {
      eyebrow: "Product systems · Sales automation · Delivery / Mexico City",
      headline: "I make complex product systems easier to understand, use, and ship.",
      summary:
        "I connect customer insight, product UX, CRM and AI automation, and hands-on delivery—from the first useful workflow to a verified release.",
      availability:
        "Open to product roles and selected client work in SaaS, CRM, sales automation, and AI systems.",
      languages: "Spanish and English",
      primaryCta: "Explore signature work",
      secondaryCta: "Start a conversation",
      proofLabel: "Six products. Clear ownership. Honest evidence.",
    },
    work: {
      eyebrow: "Selected work",
      title: "Proof of how I think, build, and deliver.",
      intro:
        "Three signature systems lead the story. Every case makes the problem, my role, the result, and the limits easy to scan before you go deeper.",
      featured: "Signature work",
      labs: "More products and experiments",
      viewCase: "Read case study",
    },
    approach: {
      eyebrow: "How I work",
      title: "A system for turning ambiguity into something usable.",
      intro:
        "I move from customer signal to connected workflow, then verify the complete journey on the screens and systems people actually use.",
      steps: [
        {
          title: "Discover",
          body: "I listen to the customer, watch the workflow, and identify the moment progress stops or confidence drops.",
        },
        {
          title: "Design",
          body: "I turn the desired outcome into a sequence the customer and the team can both understand.",
        },
        {
          title: "Automate",
          body: "I connect the interface, CRM, automation, and APIs needed to make the journey work end to end.",
        },
        {
          title: "Verify",
          body: "I check desktop and mobile behavior, document what is still limited, and improve the flow from what I observe.",
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Product judgment grounded in customer conversations.",
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
      cta: "Explore role-focused CVs",
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
        "As a Marblism partner, I help teams evaluate where AI employees can remove repetitive work and connect the setup to a practical sales, customer, or operations workflow. This is a sponsored partner link.",
      cta: "Explore Marblism",
    },
    contact: {
      eyebrow: "Let’s talk",
      title: "Bring me the customer problem and the operational mess.",
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
      cv: "CV",
      contact: "Contacto",
      menu: "Menú",
      theme: "Cambiar tema de color",
      language: "View in English",
    },
    hero: {
      eyebrow: "Sistemas de producto · Automatización de ventas · Entrega / Ciudad de México",
      headline: "Convierto sistemas de producto complejos en experiencias claras, útiles y listas para operar.",
      summary:
        "Conecto conocimiento del cliente, UX de producto, CRM y automatización con IA, y entrega práctica: del primer flujo útil a una versión verificada.",
      availability:
        "Estoy abierto a puestos de producto y a proyectos seleccionados de SaaS, CRM, automatización de ventas y sistemas con IA.",
      languages: "Español e inglés",
      primaryCta: "Explorar proyectos clave",
      secondaryCta: "Iniciar una conversación",
      proofLabel: "Seis productos. Responsabilidad clara. Evidencia honesta.",
    },
    work: {
      eyebrow: "Proyectos destacados",
      title: "Evidencia de cómo pienso, construyo y entrego.",
      intro:
        "Tres sistemas clave abren la historia. Cada caso permite entender rápido el problema, mi rol, el resultado y los límites antes de profundizar.",
      featured: "Proyectos clave",
      labs: "Más productos y experimentos",
      viewCase: "Ver proyecto",
    },
    approach: {
      eyebrow: "Cómo trabajo",
      title: "Un sistema para convertir ambigüedad en algo útil.",
      intro:
        "Paso de la señal del cliente al flujo conectado y después verifico el recorrido completo en las pantallas y sistemas que las personas usan.",
      steps: [
        {
          title: "Descubrir",
          body: "Escucho al cliente, observo el flujo y ubico el momento en que se detiene el avance o aparecen dudas.",
        },
        {
          title: "Diseñar",
          body: "Convierto el resultado esperado en una secuencia clara para el cliente y para el equipo.",
        },
        {
          title: "Automatizar",
          body: "Conecto la interfaz, el CRM, las automatizaciones y las APIs necesarias para completar el recorrido.",
        },
        {
          title: "Verificar",
          body: "Reviso el comportamiento en desktop y móvil, documento los límites y ajusto el flujo según lo que encuentro.",
        },
      ],
    },
    experience: {
      eyebrow: "Experiencia",
      title: "Criterio de producto basado en conversaciones con clientes.",
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
      cta: "Explorar CVs por tipo de puesto",
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
        "Como partner de Marblism, ayudo a evaluar dónde los empleados con IA pueden reducir trabajo repetitivo y conecto la configuración con flujos prácticos de ventas, clientes u operaciones. Este es un enlace patrocinado de partner.",
      cta: "Conocer Marblism",
    },
    contact: {
      eyebrow: "Hablemos",
      title: "Tráeme el problema del cliente y el desorden operativo.",
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
