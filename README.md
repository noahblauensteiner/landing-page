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
| `vite.config.ts` | Mounts the same chat handler on the dev server, so `npm run dev` gives you the full experience locally. |

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

1. Open `data/profile.ts` and replace the placeholder reference projects, links, and
   location with your own.
2. That's it — the hero, sections, built-in terminal commands, and the AI's knowledge all
   update together.
