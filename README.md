# Jorge Gasca — Product Portfolio

A bilingual, evidence-led portfolio for Jorge Manuel Gasca Gutiérrez: SaaS onboarding, CRM automation, AI workflows, customer experience, and hands-on product delivery.

- English: [jorge-gasca-portfolio.vercel.app](https://jorge-gasca-portfolio.vercel.app)
- Español: [jorge-gasca-portfolio.vercel.app/es](https://jorge-gasca-portfolio.vercel.app/es)

## What this repository contains

- A premium editorial portfolio built with Next.js App Router and TypeScript.
- English at `/` and Spanish at `/es`.
- Six pre-rendered case studies, each with localized problem, role, contribution, capability, decision, limitation, stack, and proof sections.
- Privacy-reviewed desktop, mobile, and muted walkthrough evidence for public product surfaces.
- Accessible theme, navigation, media controls, metadata, structured data, sitemap, robots, and social sharing assets.
- A restored, optimized portrait supplied by Jorge for this portfolio.
- No CMS, database, authentication, analytics, contact form, or API surface.

## Product evidence policy

Current product source stays private. Only Zentix Office exposes a repository link. Other launch case studies omit source buttons; HablaYa explicitly distinguishes its private current-production source from an older public prototype repository.

Evidence assets are tracked in [`content/evidence-manifest.json`](content/evidence-manifest.json). Each entry records the source URL, viewport, capture date, product stage, evidence classification, caveat, and privacy-review state. [`content/evidence-integrity.json`](content/evidence-integrity.json) binds that approval to the exact SHA-256 and byte size shipped in the repository, records owner-directed public-use approval, and makes CI fail if reviewed media changes. Captures are limited to public or synthetic surfaces and exclude customer, tenant, account, conversation, order, prompt, analytics, credential, and provider-configuration data.

The root [`llms.txt`](public/llms.txt) is a factual, supplemental machine-readable orientation for recruiters, prospective clients, and AI agents. It does not replace standard metadata, structured data, robots, or the sitemap.

## Local development

Requirements: Node.js `22.x` and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run typecheck
npm run test:content
npm run test:links
npm run build
npx playwright install chromium
npm run test:e2e
```

The consolidated release gate is:

```bash
npm run verify
```

GitHub Actions repeats the same quality story on pull requests and `main`. Vercel’s Git integration owns preview and production deployments; CI does not run a second deployment pipeline.

## Architecture

- `app/(en)` — English root layout, homepage, and work routes.
- `app/(es)/es` — Spanish root layout, homepage, and mirrored work routes.
- `components` — server-first page composition plus the three small client interactions: theme, locale mirroring, and click-to-play video.
- `lib/case-studies.ts` — typed bilingual `CaseStudy` and `EvidenceAsset` content contracts.
- `content/evidence-manifest.json` — auditable product-evidence inventory.
- `tests` — content, source-visibility, route, responsive, media, and accessibility contracts.

## Content timeline

Public dates follow Jorge’s LinkedIn timeline. The homepage highlights Apollo.io from May 2025, MiniTiendAI from March 2024 to May 2025, and a compact earlier-career summary for CrazyCall and S-Peak. ViaPath and JPMorgan contractor work is intentionally omitted from the main narrative.

## License

Reusable site code is available under the [MIT License](LICENSE). Personal copy, branding, case-study material, screenshots, walkthroughs, product names, and third-party marks are excluded from MIT; see [NOTICE.md](NOTICE.md).
