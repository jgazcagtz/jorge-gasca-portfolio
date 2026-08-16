import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  caseStudies,
  caseStudySlugs,
  type CaseStudy,
  type EvidenceAsset,
} from "../lib/case-studies";
import { homeCopy } from "../lib/home";
import {
  cvCredentials,
  cvExperience,
  cvLanguages,
  cvProjects,
  cvSkillGroups,
  cvVariantSlugs,
  cvVariants,
  getCvProjects,
  getCvSkillGroups,
} from "../lib/cv";
import {
  caseStudyMetadata,
  cvHubMetadata,
  cvMetadata,
  HOME_TITLES,
  homeMetadata,
} from "../lib/seo";
import { MARBLISM_PARTNER_URL } from "../lib/site";

const expectedLaunchSlugs = [
  "zentix",
  "hablaya",
  "minitiendai",
  "ordenai",
  "zentix-office",
  "tonalli-ai",
] as const;
const locales = ["en", "es"] as const;
const evidenceClassifications = [
  "public-marketing",
  "synthetic-demo",
  "guest-runtime",
  "simulation",
  "illustration",
] as const;

function evidenceAssets(study: CaseStudy): EvidenceAsset[] {
  return [
    study.media.desktop,
    study.media.mobile,
    ...(study.media.walkthrough ? [study.media.walkthrough] : []),
    ...(study.media.secondary ?? []),
  ];
}

function publicFiles(asset: EvidenceAsset): string[] {
  return asset.kind === "video"
    ? [asset.sources.webm, asset.sources.mp4]
    : [asset.src];
}

function publicFile(path: string): string {
  return join(process.cwd(), "public", path.replace(/^\//, ""));
}

describe("portfolio content contract", () => {
  it("keeps route slugs unique and defines the three signature projects in order", () => {
    expect(caseStudySlugs).toEqual(expect.arrayContaining([...expectedLaunchSlugs]));
    expect(new Set(caseStudySlugs).size).toBe(caseStudySlugs.length);
    expect(new Set(caseStudies.map((study) => study.sequence)).size).toBe(
      caseStudies.length,
    );

    const signatureProjects = caseStudies
      .filter((study) => study.featured)
      .sort((left, right) => left.sequence - right.sequence);
    expect(signatureProjects.map((study) => study.slug)).toEqual([
      "zentix",
      "minitiendai",
      "ordenai",
    ]);
    expect(caseStudies.filter((study) => !study.featured)).toHaveLength(3);
  });

  it("keeps public and private source policies explicit", () => {
    for (const study of caseStudies) {
      expect(() => new URL(study.liveUrl)).not.toThrow();
      if (study.sourceVisibility === "public") {
        expect(study.sourceUrl).toBeDefined();
        expect(() => new URL(study.sourceUrl ?? "")).not.toThrow();
      } else {
        expect(study.sourceUrl).toBeUndefined();
      }
    }

    expect(
      caseStudies.find((study) => study.slug === "zentix-office")?.sourceUrl,
    ).toBe("https://github.com/jgazcagtz/zentix-office");
  });

  it("provides distinct, complete bilingual case-study narratives", () => {
    const requiredTextFields = [
      "title",
      "seoTitle",
      "seoDescription",
      "stageLabel",
      "sourceLabel",
      "role",
      "cardResult",
      "summary",
      "ownership",
      "challenge",
      "outcome",
      "decisionRationale",
      "reflection",
      "currentStatus",
      "coverAlt",
      "videoDescription",
      "videoTranscript",
    ] as const;

    for (const study of caseStudies) {
      for (const locale of locales) {
        const copy = study.copy[locale];
        for (const field of requiredTextFields) {
          expect(
            copy[field].trim().length,
            `${study.slug}.${locale}.${field}`,
          ).toBeGreaterThan(
            field === "sourceLabel" || field === "stageLabel" || field === "role"
              ? 4
              : 20,
          );
        }

        expect(copy.seoTitle.length).toBeLessThanOrEqual(70);
        expect(copy.seoDescription.length).toBeGreaterThanOrEqual(70);
        expect(copy.seoDescription.length).toBeLessThanOrEqual(180);
        expect(copy.actions.length).toBeGreaterThanOrEqual(2);
        expect(copy.actions.length).toBeLessThanOrEqual(4);
        expect(copy.actions.every((action) => action.length > 24)).toBe(true);
        expect(copy.limitations.length).toBeGreaterThanOrEqual(1);
        expect(copy.limitations.length).toBeLessThanOrEqual(3);
        expect(copy.limitations.every((limitation) => limitation.length > 30)).toBe(
          true,
        );
      }

      expect(study.copy.en.summary).not.toBe(study.copy.es.summary);
      expect(study.copy.en.outcome).not.toBe(study.copy.es.outcome);
    }

    for (const locale of locales) {
      for (const field of ["summary", "challenge", "outcome", "reflection"] as const) {
        const values = caseStudies.map((study) => study.copy[locale][field]);
        expect(new Set(values).size).toBe(values.length);
      }
    }
  });

  it("uses the verified Apollo and MiniTiendAI timeline and keeps onboarding supporting", () => {
    const apolloEn = homeCopy.en.experience.items.find((item) =>
      item.title.includes("Apollo.io"),
    );
    const miniEn = homeCopy.en.experience.items.find((item) =>
      item.title.includes("MiniTiendAI"),
    );
    const apolloEs = homeCopy.es.experience.items.find((item) =>
      item.title.includes("Apollo.io"),
    );
    const miniEs = homeCopy.es.experience.items.find((item) =>
      item.title.includes("MiniTiendAI"),
    );

    expect(apolloEn).toMatchObject({
      title: "Product Specialist · Apollo.io",
      period: "May 2025 — Present",
    });
    expect(miniEn).toMatchObject({
      title: "Product Development Manager · MiniTiendAI",
      period: "Mar 2024 — May 2025",
    });
    expect(apolloEs).toMatchObject({
      title: "Product Specialist · Apollo.io",
      period: "Mayo 2025 — Actualidad",
    });
    expect(miniEs).toMatchObject({
      title: "Product Development Manager · MiniTiendAI",
      period: "Marzo 2024 — Mayo 2025",
    });

    const miniCase = caseStudies.find((study) => study.slug === "minitiendai");
    expect(miniCase?.copy.en.ownership).toContain("Product Development Manager");
    expect(miniCase?.copy.es.ownership).toContain("Product Development Manager");
    expect(miniCase?.copy.en.role).toContain("Product Development Manager");
    expect(miniCase?.copy.es.role).toContain("Product Development Manager");
    expect(homeCopy.en.hero.eyebrow.toLowerCase()).toContain("sales automation");
    expect(homeCopy.es.hero.eyebrow.toLowerCase()).toContain(
      "automatización de ventas",
    );
    expect(homeCopy.en.hero.availability.toLowerCase()).not.toContain("onboarding");
    expect(homeCopy.es.hero.availability.toLowerCase()).not.toContain("onboarding");
  });

  it("uses the approved bilingual hero promise and conversion actions", () => {
    expect(homeCopy.en.hero.headline).toBe(
      "I make complex product systems easier to understand, use, and ship.",
    );
    expect(homeCopy.es.hero.headline).toBe(
      "Convierto sistemas de producto complejos en experiencias claras, útiles y listas para operar.",
    );
    expect(homeCopy.en.hero.primaryCta).toBe("Explore signature work");
    expect(homeCopy.en.hero.secondaryCta).toBe("Start a conversation");
    expect(homeCopy.es.hero.primaryCta.trim().length).toBeGreaterThan(12);
    expect(homeCopy.es.hero.secondaryCta.trim().length).toBeGreaterThan(12);
  });

  it("keeps metadata concise, localized, natural, and free of meta keywords", () => {
    expect(HOME_TITLES.en).toBe(
      "Jorge Gasca | Product & Sales Automation Specialist",
    );
    expect(HOME_TITLES.es).toBe(
      "Jorge Gasca | Producto y Automatización de Ventas",
    );

    for (const locale of locales) {
      expect(HOME_TITLES[locale].length).toBeLessThanOrEqual(60);
      expect(homeMetadata(locale).keywords).toBeUndefined();
      for (const study of caseStudies) {
        expect(caseStudyMetadata(locale, study).keywords).toBeUndefined();
      }
    }
  });

  it("removes generation fingerprints, filler roles, and invented claims", () => {
    const llms = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");
    const readme = readFileSync(join(process.cwd(), "README.md"), "utf8");
    const publishedText = JSON.stringify({
      homeCopy,
      caseStudies,
      homeTitles: HOME_TITLES,
      llms,
      readme,
    }).toLowerCase();

    for (const phrase of [
      "codex-assisted",
      "ai-readable profile",
      "visible build sha",
      "premium editorial",
      "evidence-led portfolio",
      "hybrid operator",
      "operador híbrido",
      "superficie del producto",
      "fricción de adopción",
      "evidencia en ejecución",
      "jpmorganchase",
      "jpmorgan chase",
      "viapath technologies",
      "co-founder",
      "cofounder",
      "conversion rate",
      "revenue generated",
      "customer logos",
    ]) {
      expect(publishedText, phrase).not.toContain(phrase);
    }

    expect(publishedText).not.toContain("amigoperro");
    expect(publishedText).not.toContain("betvector");
  });

  it("requires privacy-reviewed, localized media with real image and video files", () => {
    for (const study of caseStudies) {
      expect(study.media.desktop.kind).toBe("image");
      expect(study.media.mobile.kind).toBe("image");
      expect(
        study.media.desktop.viewport.width / study.media.desktop.viewport.height,
      ).toBeCloseTo(16 / 10, 2);
      expect(
        study.media.mobile.viewport.width / study.media.mobile.viewport.height,
      ).toBeCloseTo(9 / 16, 2);
      expect(Object.hasOwn(study.media, "walkthrough")).toBe(true);

      for (const asset of evidenceAssets(study)) {
        expect(asset.privacyReviewed).toBe(true);
        expect(evidenceClassifications).toContain(asset.classification);
        expect(asset.captureDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(() => new URL(asset.captureUrl)).not.toThrow();
        for (const locale of locales) {
          expect(asset.alt[locale].length).toBeGreaterThan(20);
          expect(asset.caption[locale].length).toBeGreaterThan(8);
          expect(asset.caveat[locale].length).toBeGreaterThan(20);
        }
        for (const path of publicFiles(asset)) {
          expect(existsSync(publicFile(path)), `${asset.id}: ${path}`).toBe(true);
        }

        if (asset.kind === "video") {
          expect(asset.src).toBe(asset.sources.webm);
          expect(asset.sources.webm).toMatch(/\.webm$/);
          expect(asset.sources.mp4).toMatch(/\.mp4$/);
          expect(asset.poster).toMatch(/\.png$/);
          expect(existsSync(publicFile(asset.poster))).toBe(true);
          expect(asset.durationSeconds).toBeGreaterThan(0);
          if (study.slug === "minitiendai") {
            expect(asset.durationSeconds).toBeLessThanOrEqual(25);
          } else {
            expect(asset.durationSeconds).toBeGreaterThanOrEqual(15);
            expect(asset.durationSeconds).toBeLessThanOrEqual(22);
          }
        }
      }
    }
  });

  it("uses the MiniTiendAI homepage as primary evidence and labels the demo separately", () => {
    const mini = caseStudies.find((study) => study.slug === "minitiendai");
    expect(mini).toBeDefined();
    expect(mini?.media.desktop.captureUrl).toBe("https://minitiendai.com/");
    expect(mini?.media.mobile.captureUrl).toBe("https://minitiendai.com/");
    expect(mini?.media.desktop.classification).toBe("public-marketing");
    expect(mini?.media.mobile.classification).toBe("public-marketing");
    expect(mini?.media.walkthrough?.classification).toBe("synthetic-demo");

    const demo = mini?.media.secondary?.find(
      (asset) => asset.id === "minitiendai-demo-store",
    );
    expect(demo).toMatchObject({
      kind: "image",
      classification: "synthetic-demo",
      captureUrl: "https://minitiendai.com/store.html?demo=restaurant",
    });
    expect(demo?.caption.en).toContain("synthetic");
    expect(demo?.caption.es.toLowerCase()).toContain("demostración");
  });

  it("keeps the evidence manifest aligned with typed content and classifications", () => {
    const manifest = JSON.parse(
      readFileSync(join(process.cwd(), "content", "evidence-manifest.json"), "utf8"),
    ) as {
      assets: Array<{
        id: string;
        src: string;
        kind: "image" | "video";
        url?: string;
        captureUrl?: string;
        classification: string;
        viewport: { width: number; height: number };
        captureDate: string;
        privacyReviewed: boolean;
      }>;
    };

    const typedAssets = caseStudies.flatMap(evidenceAssets);
    expect(manifest.assets.map((asset) => asset.id).sort()).toEqual(
      typedAssets.map((asset) => asset.id).sort(),
    );
    const manifestById = new Map(manifest.assets.map((asset) => [asset.id, asset]));
    for (const asset of typedAssets) {
      const manifestAsset = manifestById.get(asset.id);
      expect(manifestAsset, asset.id).toBeDefined();
      expect(manifestAsset?.src).toBe(asset.src);
      expect(manifestAsset?.kind).toBe(asset.kind);
      expect(manifestAsset?.classification).toBe(asset.classification);
      expect(manifestAsset?.url ?? manifestAsset?.captureUrl).toBe(asset.captureUrl);
      expect(manifestAsset?.viewport).toEqual(asset.viewport);
      expect(manifestAsset?.captureDate).toBe(asset.captureDate);
      expect(manifestAsset?.privacyReviewed).toBe(true);
    }
  });

  it("binds every approved media source to its exact reviewed file", () => {
    type IntegrityFile = {
      src: string;
      sha256: string;
      bytes: number;
      publicUseApproved?: boolean;
      publicationBasis?: string;
    };
    type IntegrityAsset = IntegrityFile & {
      id: string;
      files?: IntegrityFile[];
    };

    const integrity = JSON.parse(
      readFileSync(join(process.cwd(), "content", "evidence-integrity.json"), "utf8"),
    ) as { assets: IntegrityAsset[] };
    const reviewedFiles = integrity.assets.flatMap((entry) => {
      const files = entry.files?.length ? entry.files : [entry];
      return files.map((file) => ({
        ...file,
        publicUseApproved: file.publicUseApproved ?? entry.publicUseApproved,
        publicationBasis: file.publicationBasis ?? entry.publicationBasis,
      }));
    });
    const expectedFiles = caseStudies
      .flatMap(evidenceAssets)
      .flatMap(publicFiles)
      .sort();
    expect(reviewedFiles.map((file) => file.src).sort()).toEqual(expectedFiles);

    for (const approved of reviewedFiles) {
      expect(approved.publicUseApproved).toBe(true);
      expect(approved.publicationBasis).toBe(
        "owner-authorized-portfolio-evidence",
      );
      const file = readFileSync(publicFile(approved.src));
      expect(file.byteLength).toBe(approved.bytes);
      expect(createHash("sha256").update(file).digest("hex")).toBe(
        approved.sha256,
      );
    }

    for (const asset of caseStudies.flatMap(evidenceAssets)) {
      if (asset.kind !== "image") continue;
      const file = readFileSync(publicFile(asset.src));
      expect(file.subarray(1, 4).toString("ascii")).toBe("PNG");
      expect(file.readUInt32BE(16)).toBe(asset.viewport.width);
      expect(file.readUInt32BE(20)).toBe(asset.viewport.height);
    }
  });

  it("publishes a factual discovery file and Marblism partner path", () => {
    const llms = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");
    for (const study of caseStudies) {
      expect(llms).toContain(study.copy.en.title.split(" — ")[0]);
    }
    expect(llms).toContain("https://jgasca.io/");
    expect(llms).toContain("https://jgasca.io/es");
    expect(llms).toContain("Product Specialist at Apollo.io, May 2025 to present");
    expect(llms).toContain(
      "Product Development Manager at MiniTiendAI, March 2024 to May 2025",
    );
    expect(llms.toLowerCase()).toContain("sales automation");
    expect(llms).toContain("https://wa.me/525533355687");
    expect(llms).toContain("gascagtz@gmail.com");
    expect(llms).toContain(MARBLISM_PARTNER_URL);
    expect(homeCopy.en.partner.label).toContain("Marblism partner");
    expect(homeCopy.es.partner.label).toContain("Partner de Marblism");
    expect(
      existsSync(join(process.cwd(), "public", "media", "marblism-wordmark.png")),
    ).toBe(true);
    expect(llms).not.toContain("github.com/jgazcagtz/zentix_1.0");
    expect(llms.toLowerCase()).not.toContain("official partner");
    expect(llms.toLowerCase()).not.toContain("strong fit");
    expect(llms.toLowerCase()).not.toContain("legitimate business inquiries");
  });
});

describe("bilingual CV content contract", () => {
  it("publishes four distinct role variants in two locales without changing shared facts", () => {
    expect(cvVariants.map((variant) => variant.slug)).toEqual(cvVariantSlugs);
    expect(new Set(cvVariantSlugs).size).toBe(4);

    for (const variant of cvVariants) {
      expect(getCvSkillGroups(variant).map((group) => group.id).sort()).toEqual(
        cvSkillGroups.map((group) => group.id).sort(),
      );
      expect(getCvProjects(variant).map((project) => project.id).sort()).toEqual(
        cvProjects.map((project) => project.id).sort(),
      );
      expect(new Set(variant.skillOrder).size).toBe(cvSkillGroups.length);
      expect(new Set(variant.projectOrder).size).toBe(cvProjects.length);

      for (const locale of locales) {
        expect(variant.title[locale].length).toBeGreaterThan(12);
        expect(variant.summary[locale].length).toBeGreaterThan(100);
        expect(variant.seoTitle[locale].length).toBeLessThanOrEqual(60);
        expect(variant.seoDescription[locale].length).toBeGreaterThanOrEqual(100);
        expect(variant.seoDescription[locale].length).toBeLessThanOrEqual(180);
        expect(variant.fitRoles[locale].length).toBeGreaterThanOrEqual(7);
        expect(cvMetadata(locale, variant).keywords).toBeUndefined();
      }
    }

    for (const locale of locales) {
      expect(cvHubMetadata(locale).keywords).toBeUndefined();
      expect(new Set(cvVariants.map((variant) => variant.seoTitle[locale])).size).toBe(4);
      expect(new Set(cvVariants.map((variant) => variant.seoDescription[locale])).size).toBe(4);
    }
  });

  it("keeps the verified timeline and labels concurrent and grouped work explicitly", () => {
    expect(cvExperience.map((entry) => entry.id)).toEqual([
      "apollo",
      "minitiendai",
      "independent",
      "earlier",
    ]);
    expect(cvExperience[0]).toMatchObject({
      id: "apollo",
      period: { en: "May 2025 - Present", es: "Mayo 2025 - Actualidad" },
      organization: { en: "Apollo.io", es: "Apollo.io" },
    });
    expect(cvExperience[0].title.en).toContain("Product Specialist");
    expect(cvExperience[0].bullets.en.join(" ")).toContain("50+ B2B customer teams weekly");
    expect(cvExperience[1]).toMatchObject({
      id: "minitiendai",
      period: { en: "Mar 2024 - May 2025", es: "Marzo 2024 - Mayo 2025" },
    });
    expect(cvExperience[1].title.en).toBe("Product Development Manager");
    expect(cvExperience[2].context.en).toBe("Concurrent independent work");
    expect(cvExperience[3].context.en).toContain("no missing employers or dates inferred");
  });

  it("includes every requested project, skill system, credential, and language", () => {
    expect(cvProjects.map((project) => project.id)).toEqual([
      "zentix",
      "hablaya",
      "minitiendai",
      "ordenai",
      "zentix-office",
      "tonalli-ai",
      "gtmsnap",
      "hermes-agent-lab",
    ]);

    const skills = cvSkillGroups.flatMap((group) => group.items);
    for (const skill of [
      "Revenue Operations",
      "Customer Discovery",
      "Apollo.io",
      "HubSpot",
      "Salesforce",
      "GoHighLevel",
      "n8n",
      "Make",
      "Zapier",
      "REST APIs",
      "Webhooks",
      "MCP",
      "AI Agents",
      "Human-in-the-loop",
      "JavaScript/TypeScript",
      "Node.js",
      "React/Next.js",
      "Firebase",
      "Supabase",
      "Vercel",
      "Docker",
      "Cloudflare",
      "OpenAI",
      "Twilio",
      "WhatsApp Cloud API",
      "Cartesia",
      "Responsive UX",
      "Accessibility",
      "Behavioral QA",
      "Prototyping",
      "Documentation",
      "Release Verification",
    ]) {
      expect(skills, skill).toContain(skill);
    }

    expect(cvCredentials).toHaveLength(4);
    expect(cvLanguages.en).toEqual(["Spanish - Native", "English - C2", "Portuguese - A2"]);
    expect(cvLanguages.es).toEqual(["Español - Nativo", "Inglés - C2", "Portugués - A2"]);
  });

  it("keeps best-fit titles separate from employment history", () => {
    const employmentText = JSON.stringify(cvExperience).toLowerCase();
    const verifiedEmploymentTitles = new Set([
      "Product Development Manager",
    ]);
    const aspirationalTitles = cvVariants
      .flatMap((variant) => variant.fitRoles.en)
      .filter((title) => !verifiedEmploymentTitles.has(title));

    for (const title of aspirationalTitles) {
      expect(employmentText).not.toContain(title.toLowerCase());
    }

    const actualTitles = cvExperience.map((entry) => entry.title.en).join(" ");
    expect(actualTitles).toContain("Product Specialist");
    expect(actualTitles).toContain("Product Development Manager");
  });
});
