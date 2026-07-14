# Tommy｜English × Law × AI

Tommy Wang’s bilingual academic and growth portfolio. It records research writing, public speaking, moot court, student work, volunteer service and current interdisciplinary inquiry.

## Run locally

Requirements: Node.js 22 or later.

```bash
npm install
npm run dev
```

Build a production-ready static artifact:

```bash
npm run build
```

## Project structure

- `app/` — pages, components, content and styling
- `public/` — local images, PDFs, icons and evidence assets
- `scripts/generate_resumes.py` — generator for the four one-page résumé PDFs
- `output/pdf/` — generated résumé copies used during source maintenance

## Language availability

Chinese/English switching is provided on the homepage, Evidence Room, and the **Accessibility, Privacy & About This Site** page. Other archive pages remain Chinese-first so that original activity records keep their source context.

## Résumé PDFs

The four downloadable PDFs in `public/` are generated from the source script:

```bash
python3 scripts/generate_resumes.py
```

All résumé variants use the shared brand line: `ENGLISH · LAW · AI`.

## Privacy

Public evidence is redacted where needed. Sensitive content and additional evidence are available after contact and confirmation of purpose.
