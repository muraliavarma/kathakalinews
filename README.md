# kathakalinews.com — reconstructed

A faithful reconstruction and modern rebuild of **kathakalinews.com** ("A digital
awakening in Kathakali"), a community site that ran c. 2008–2014 documenting
Kathakali — Kerala's classical dance-drama. The original was recovered from the
Internet Archive (using the genuine pre-parking snapshots) and rebuilt as a fully
**static** site with no database and no backend.

## What's here

| Path | What it is |
|------|------------|
| `app/` | The live site — a static [Astro](https://astro.build) app. Source of truth is plain JSON in `app/src/data/`. |
| `data/` | Extracted datasets: `performances.{json,csv}` (2,846 records), `stories.json` (37 plays). |
| `archive/` | Byte-faithful raw download of the original site from the Wayback Machine (99 files). Primary provenance. |

## The data

- **2,846 performance records** (2007–2011) — date, play, venue, district, artists, organiser — each tagged with the source quarter it came from.
- **37 attakatha synopses** with composer, life-dates, source epic and vesham notes.
- **49 ragas** with arohana / avarohana, janya, rasa and padam examples.
- Ramayana / Mahabharata / Bhagavata summaries, the attams, and the Thodayam videos.

Everything is published as open data on the site's `/data` page and in `data/`.

> Honest caveat: play and district names contain original spelling variants
> (e.g. *Santhana Gopalam* / *Santhanagopalam*, *Trichur* / *Thrissur*). Raw values
> are preserved as submitted; canonicalisation is a planned next step.

## Develop

```bash
cd app
npm install
npm run dev      # local dev server with live reload
npm run build    # static output to app/dist/ — deploy anywhere
npm run preview  # preview the production build
```

No database, no services — `dist/` is a flat file set that runs on any static host
(Cloudflare Pages, GitHub Pages, Netlify, S3) or straight off disk.

## Provenance & credits

Reconstructed from the Internet Archive. Reference content indebted to K.P.S. Menon,
the Kerala Sahitya Academy, and Prof. Aimanam Krishna Kaimal's *Kathakali Vijnana
Kosham*. Original site by K. Srikumar / Shyam Srikumar.
