# Tommy｜English × Law × AI

Tommy Wang’s bilingual academic and growth portfolio. It records research writing, public speaking, moot court, student work, volunteer service and current interdisciplinary inquiry.

## Run locally

Requirements: Node.js 22 or later.

```bash
npm install
npm run dev
```

Build the production Worker and client assets:

```bash
npm run build
```

## Project structure

- `app/` — pages, components, content and styling
- `public/` — local images, PDFs, icons and evidence assets
- `scripts/generate_resumes.py` — generator for the four one-page résumé PDFs
- `output/pdf/` — generated résumé copies used during source maintenance

## Language availability

Chinese/English switching is provided on the homepage, all achievements, Evidence Room, complete archive, work details, and the **Accessibility, Privacy & About This Site** page. Original evidence assets retain their source language.

CET-4 and CET-6 are grouped under **Freshman year / 大一全年**. The CET-6 results release date remains August 24, 2026.

## Résumé PDFs

The four downloadable PDFs in `public/` are generated from the source script:

```bash
python3 scripts/generate_resumes.py
```

All résumé variants use the shared brand line: `ENGLISH · LAW · AI`.

## Privacy

Public evidence is redacted where needed. Sensitive content and additional evidence are available after contact and confirmation of purpose.
