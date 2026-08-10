# Jorge Gasca — Product & Sales Automation Specialist

A bilingual portfolio for Jorge Manuel Gasca Gutiérrez, a Product Specialist, hands-on product builder, and sales automation specialist working across product UX, CRM workflows, AI automation, and delivery.

- English: [jgasca.io](https://jgasca.io)
- Español: [jgasca.io/es](https://jgasca.io/es)

## What this repository contains

- An editorial portfolio built with Next.js App Router and TypeScript.
- English at `/` and Spanish at `/es`.
- Six pre-rendered case studies with Jorge’s ownership, actions, decisions, outcomes, reflections, current status, and limitations.
- Privacy-reviewed desktop, mobile, and short walkthrough media from public or synthetic product views.
- Accessible theme, navigation, media controls, metadata, structured data, sitemap, robots, and social sharing assets.
- A restored, optimized portrait supplied by Jorge for this portfolio.
- No CMS, database, authentication, analytics, contact form, or API surface.

## Professional profile

- Product Specialist at Apollo.io since May 2025.
- Product Development Manager at MiniTiendAI from March 2024 to May 2025.
- Hands-on product builder focused on product UX, sales and CRM automation, AI workflows, web/API delivery, and practical QA.
- [Marblism partner](https://marblism.com?via=zentixmarblism), helping teams evaluate where its AI employees fit a practical customer or operations workflow.

## Product evidence policy

Most current product sources stay private. Only Zentix Office exposes a repository link. Other launch case studies omit source buttons; HablaYa explicitly distinguishes its private current-production source from an older public prototype repository.

Product assets are tracked in [`content/evidence-manifest.json`](content/evidence-manifest.json). Each entry records its source URL, viewport, capture date, product stage, classification, caveat, and privacy-review state. [`content/evidence-integrity.json`](content/evidence-integrity.json) binds that review to the exact SHA-256 and byte size shipped in the repository and makes CI fail if an approved file changes. Captures are limited to public or synthetic views and exclude customer, account, conversation, order, prompt, analytics, credential, and provider-configuration data.

The root [`llms.txt`](public/llms.txt) is a short factual profile for search and agent systems. It supplements the visible portfolio and does not replace standard metadata, structured data, robots, or the sitemap.

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
npx playwright install chromium firefox webkit
npm run test:e2e
```

The consolidated release gate is:

```bash
npm run verify
```

GitHub Actions runs the same checks on pull requests and `main`. Vercel’s Git integration owns preview and production deployments; CI does not run a second deployment pipeline.

## Architecture

- `app/(en)` — English root layout, homepage, and work routes.
- `app/(es)/es` — Spanish root layout, homepage, and mirrored work routes.
- `components` — server-first page composition with small client pieces for scroll reveals and click-to-play video; theme and locale behavior stay lightweight.
- `lib/case-studies.ts` — typed bilingual `CaseStudy` and `EvidenceAsset` content contracts.
- `content/evidence-manifest.json` — auditable product-evidence inventory.
- `tests` — content, source-visibility, route, responsive, media, and accessibility contracts.

## Content timeline

Public dates follow Jorge’s LinkedIn timeline. The homepage highlights Apollo.io from May 2025, MiniTiendAI from March 2024 to May 2025, and a compact summary of earlier work in sales, customer operations, and education.

## License

Reusable site code is available under the [MIT License](LICENSE). Personal copy, branding, case-study material, screenshots, walkthroughs, product names, and third-party marks are excluded from MIT; see [NOTICE.md](NOTICE.md).
