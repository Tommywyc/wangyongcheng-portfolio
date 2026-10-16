# Tommy｜English × Law × AI

Tommy Wang’s bilingual academic and growth portfolio. It records research writing, public speaking, moot court, student work, volunteer service and current interdisciplinary inquiry.

## Run locally

Requirements: Node.js 22 or later.

```bash
npm install
npm run dev
```

Build the production Next.js application used by EdgeOne:

```bash
npm run build
```

## Project structure

- `app/` — pages, components, content and styling
- `public/` — local images, PDFs, icons and evidence assets
- `scripts/generate_resumes.py` — generator for the four one-page résumé PDFs
- `output/pdf/` — generated résumé copies used during source maintenance

## Language availability

Chinese/English switching is provided on the homepage, all achievements, Evidence Room, complete archive, work details and the **Accessibility, Privacy & About This Site** page.

## EdgeOne deployment

This directory is the configured EdgeOne project root. Keep the existing Next.js framework preset, installation command `npm ci --no-audit --no-fund`, and build command `npm run build`.

The `app/` pages and `public/` assets are synchronized with published Sites version 59 (source `31685d5065e1dee82d6b9facf60de44d24882187`). This includes bilingual language URLs and server-rendered metadata, archive search/filter controls, contact-copy controls, responsive portrait variants, and the October 16 labor-education course outreach with the latest wide-format photo. The approved portrait and sharing card remain unchanged. CET-4 and CET-6 are both grouped under the full freshman year; their result-release dates are February 27 and August 24, 2026, respectively.

`npm test` builds the Next.js application and runs its data/utility tests. The complete Vinext server-rendering suite is retained in the Sites source mirror; its Worker-based tests are not run against Next.js output.

The legacy `src/` and committed `dist/` belong to an older Vite application and are not used by the current Next.js build. Do not select `dist` as the current deployment output.

## Résumé PDFs

The four downloadable PDFs in `public/` are generated from the source script:

```bash
python3 scripts/generate_resumes.py
```

All résumé variants use the shared brand line: `ENGLISH · LAW · AI`.

## Privacy

Public evidence is redacted where needed. Sensitive content and additional evidence are available after contact and confirmation of purpose.
