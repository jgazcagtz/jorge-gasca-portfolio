import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies, caseStudySlugs } from "../lib/case-studies";

const expectedSlugs = [
  "zentix",
  "hablaya",
  "minitiendai",
  "ordenai",
  "zentix-office",
  "tonalli-ai",
];

describe("portfolio content contract", () => {
  it("ships the exact launch set and hierarchy", () => {
    expect(caseStudySlugs).toEqual(expectedSlugs);
    expect(caseStudies.filter((study) => study.featured)).toHaveLength(4);
    expect(caseStudies.filter((study) => !study.featured)).toHaveLength(2);
  });

  it("keeps public and private source policies explicit", () => {
    for (const study of caseStudies) {
      expect(() => new URL(study.liveUrl)).not.toThrow();
      if (study.sourceVisibility === "public") {
        expect(study.slug).toBe("zentix-office");
        expect(study.sourceUrl).toBe("https://github.com/jgazcagtz/zentix-office");
      } else {
        expect(study.sourceUrl).toBeUndefined();
      }
    }
  });

  it("provides complete bilingual case-study copy", () => {
    for (const study of caseStudies) {
      for (const locale of ["en", "es"] as const) {
        const copy = study.copy[locale];
        expect(copy.title.length).toBeGreaterThan(12);
        expect(copy.dek.length).toBeGreaterThan(40);
        expect(copy.problem.length).toBeGreaterThan(40);
        if (study.slug === "minitiendai") {
          expect(copy.role).toContain("Product Development Manager");
        } else {
          expect(copy.role).toContain(
            locale === "en" ? "Independent product builder" : "Creador independiente",
          );
        }
        expect(copy.contributions).toHaveLength(3);
        expect(copy.capabilities).toHaveLength(3);
        expect(copy.decisions).toHaveLength(2);
        expect(copy.limitations.length).toBeGreaterThan(80);
      }
    }
  });

  it("publishes only privacy-reviewed evidence with real files", () => {
    for (const study of caseStudies) {
      expect(study.media).toHaveLength(3);
      for (const asset of study.media) {
        expect(asset.privacyReviewed).toBe(true);
        expect(["runtime", "illustration"]).toContain(asset.classification);
        expect(asset.captureDate).toBe("2026-08-09");
        expect(existsSync(join(process.cwd(), "public", asset.src))).toBe(true);
      }
    }
  });

  it("keeps excluded launch claims and projects out", () => {
    const serialized = JSON.stringify(caseStudies).toLowerCase();
    expect(serialized).not.toContain("co-founder");
    expect(serialized).not.toContain("amigoperro");
    expect(serialized).not.toContain("betvector");
    expect(serialized).not.toContain("revenue");
    expect(serialized).not.toContain("conversion rate");
  });

  it("keeps the evidence manifest aligned with typed content", () => {
    const manifest = JSON.parse(
      readFileSync(join(process.cwd(), "content", "evidence-manifest.json"), "utf8"),
    ) as { assets: Array<{ id: string }> };
    const manifestIds = manifest.assets.map((asset) => asset.id).sort();
    const contentIds = caseStudies.flatMap((study) => study.media.map((asset) => asset.id)).sort();
    expect(manifestIds).toEqual(contentIds);
  });

  it("binds every media approval to its exact reviewed file", () => {
    const integrity = JSON.parse(
      readFileSync(join(process.cwd(), "content", "evidence-integrity.json"), "utf8"),
    ) as {
      assets: Array<{
        id: string;
        src: string;
        sha256: string;
        bytes: number;
        publicUseApproved: boolean;
        publicationBasis: string;
      }>;
    };
    const contentAssets = new Map(
      caseStudies.flatMap((study) => study.media).map((asset) => [asset.id, asset]),
    );

    expect(integrity.assets).toHaveLength(contentAssets.size);
    for (const approved of integrity.assets) {
      const asset = contentAssets.get(approved.id);
      expect(asset).toBeDefined();
      expect(approved.src).toBe(asset?.src);
      expect(approved.publicUseApproved).toBe(true);
      expect(approved.publicationBasis).toBe("owner-authorized-portfolio-evidence");

      const file = readFileSync(join(process.cwd(), "public", approved.src));
      expect(file.byteLength).toBe(approved.bytes);
      expect(createHash("sha256").update(file).digest("hex")).toBe(approved.sha256);

      if (asset?.kind === "image") {
        expect(file.subarray(1, 4).toString("ascii")).toBe("PNG");
        expect(file.readUInt32BE(16)).toBe(asset.viewport.width);
        expect(file.readUInt32BE(20)).toBe(asset.viewport.height);
      }
    }
  });

  it("publishes a factual agent-readable discovery file", () => {
    const llms = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");
    for (const slug of expectedSlugs) {
      expect(llms).toContain(`/work/${slug}`);
    }
    expect(llms).toContain("https://wa.me/525533355687");
    expect(llms).toContain("mailto:gascagtz@gmail.com");
    expect(llms).not.toContain("github.com/jgazcagtz/zentix_1.0");
  });
});
