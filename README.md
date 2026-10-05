# Noah Blauensteiner — AI-Infused Portfolio

A terminal-themed portfolio where visitors don't just read about you — they **interrogate an
AI about you**. The built-in CLI streams answers from Claude, grounded in a structured
profile, and falls back to local profile data when no API key is configured.

## Architecture

| Piece | What it does |
|---|---|
| `data/profile.ts` | **Single source of truth** — bio, passions, projects, skills, links. Feeds both the page sections and the AI's system prompt. Edit this file to personalise everything at once. |
| `netlify/functions/chat.ts` | Streaming chat endpoint (Netlify Function, served at `/api/chat`). Calls the Claude API (`claude-opus-4-8`) server-side — the API key never reaches the browser. |
| `components/Terminal.tsx` | The interactive CLI: built-in commands (`help`, `about`, `projects`, `skills`, `contact`, `clear`) run locally; everything else streams from the LLM. Works in offline mode without a key. |
| `vite.config.ts` | Mounts the same chat handler on the dev server, so `npm run dev` gives you the full experience locally. Also builds the second page (`journey.html`) and serves it at `/journey` in dev. |
| `journey.html` + `components/journey/` | **The journey** (`/journey`): an experimental second landing page — a sideways-scrolling timeline through the professional and personal journey. Vertical scrolling (wheel, trackpad, or touch) moves the timeline sideways; ← / → jump between stops; the bottom minimap jumps anywhere. |

## Run locally

```bash
npm install
cp .env.example .env.local   # add your Anthropic API key
npm run dev
```

Without `ANTHROPIC_API_KEY` the site still works — the terminal answers from local profile
data and labels itself "offline mode".

## Deploy (Netlify)

1. Import the repo on [Netlify](https://app.netlify.com) — `netlify.toml` already sets the
   build command (`npm run build`) and publish directory (`dist`).
2. Add the `ANTHROPIC_API_KEY` environment variable under
   **Site configuration → Environment variables**.
3. Deploy. The function in `netlify/functions/chat.ts` is picked up automatically and
   serves `/api/chat` (it registers that route itself via its exported `config.path`).

To test the production setup locally you can also use the Netlify CLI:
`npx netlify dev` (it runs Vite plus the real function runtime).

## Personalise

`data/profile.ts` holds the full profile (derived from the CV): bio, passions, reference
projects, skills, education, certifications, and links. Edit it and the hero, sections,
built-in terminal commands, and the AI's knowledge all update together. Keep it in sync
with your CV.

The timeline stops on `/journey` live in the `journey` array of the same file. Each stop has
a `kind` (`work`, `life`, or `learning`) that picks its colour, and a `label` shown as the
big marker: a year, or a word like "Weekends" for stops without a date.
