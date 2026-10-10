# AI Dost 🤝

Aapka friendly Hinglish AI companion — concepts/bills/notices samjhana, dil ki baat, reply suggestions aur masti. Photo bhej kar bhi sawaal pooch sakte hain.

- **Main AI:** Groq (free key)
- **Backup AI:** OpenRouter, phir Google Gemini (dono optional)
- **Hosting:** Vercel

---

## Chalane ka tarika (local)

1. **Node.js** install hona chahiye (v20 ya naya).
2. **Free Groq key** lein: https://console.groq.com/keys → *Create API Key* → copy (key `gsk_...` se shuru hoti hai).
3. Project folder mein `.env` file banayein (`.env.example` copy karke) aur likhein:
   ```
   GROQ_API_KEY=aapki_groq_key
   ```
4. Terminal mein:
   ```
   npm install
   npm run dev
   ```
5. Browser mein kholein: http://localhost:3000

> Port 3000 pe koi aur app chal raha ho to `.env` mein `PORT=3001` likhein.

## Vercel par live karna

1. https://vercel.com/new → GitHub repo `AnujRor/ai-dost` import karein (settings `vercel.json` se apne aap aa jaati hain).
2. **Settings → Environment Variables** mein `GROQ_API_KEY` daalein (Vercel `.env` file nahi padhta).
3. Sabke liye public karna ho to **Settings → Deployment Protection → Vercel Authentication → Disabled**.
4. GitHub `main` par har push ke baad Vercel apne aap redeploy karta hai.
5. Share karne ke liye **Settings → Domains** wala production link use karein (har deployment ka lamba link protected ho sakta hai).

## Settings (`.env`)

| Variable | Zaroori? | Kaam |
| --- | --- | --- |
| `GROQ_API_KEY` | **Haan** | Main AI. https://console.groq.com/keys |
| `GROQ_MODEL` | Nahi | Koi Groq model pehle try karna ho |
| `OPENROUTER_API_KEY` | Nahi | Backup 1. https://openrouter.ai/keys |
| `OPENROUTER_MODEL` | Nahi | Koi OpenRouter model pehle try karna ho |
| `GEMINI_API_KEY` | Nahi | Backup 2. Asli key `AIza...` se shuru hoti hai — https://aistudio.google.com/apikey |
| `GEMINI_MODEL` | Nahi | Koi Gemini model pehle try karna ho |
| `APP_URL` | Nahi | Live site ka URL (OpenRouter ko referer ke roop mein jaata hai) |
| `PORT` | Nahi | Local server port (default 3000) |

⚠️ `.env` file kabhi GitHub par push na karein (`.gitignore` mein already hai). Keys chat/screenshot mein share na karein.

---

## For AI agents / developers

Read this section before changing code. It describes how the app is wired, what was verified, and the traps already hit.

### Stack

- Frontend: React 19 + Vite 6 + Tailwind 4 (`src/`), single page app.
- Backend: one Express app in `server.ts` (all `/api/*` routes + AI provider logic).
- TypeScript, `"type": "module"` (native ESM). Package manager: npm (`package-lock.json`).

### File map

| Path | What it is |
| --- | --- |
| `server.ts` | Express app. System prompt, persona/mode instructions, provider fallback chain, API routes. Exports `app` as default. Starts a listener only when `process.env.VERCEL` is **not** set. |
| `api/index.ts` | Vercel serverless entry. Just re-exports the app from `../server.js`. |
| `vercel.json` | Vercel config: `vite build` → `dist/` static, rewrite `/api/(.*)` → `/api` function, `maxDuration: 60`. |
| `src/App.tsx` | Chat state, sends requests to `/api/chat/stream` (SSE), falls back to `/api/chat`, shows errors. |
| `src/components/ChatInput.tsx` | Text/voice/photo input. `compressImage()` resizes photos (max 1600px, JPEG 0.85) before sending. |
| `src/data/dostPresets.ts` | Personas / preset prompts. |
| `.env.example` | All env vars with comments. `.env` is git-ignored. |

### API

| Route | Method | Body | Response |
| --- | --- | --- | --- |
| `/api/health` | GET | – | `{ status, hasApiKey, time }` |
| `/api/chat/stream` | POST | `{ message, history?, image?: {data (base64), mimeType}, personaTone?, mode? }` | SSE: `data: {"chunk": "..."}` lines, then `data: {"done": true, isError, category, suggestedFollowUps}` |
| `/api/chat` | POST | same as above | `{ text, category, suggestedFollowUps, isError }` |
| `/api/quick-action` | POST | see `server.ts` | JSON |

AI/key errors are returned as **HTTP 200 with `isError: true`** and a friendly Hinglish message in `text`/`chunk`. A non-200 from `/api/*` means the server/function itself failed (crash, 404, 413, Vercel protection).

### AI provider fallback (in `server.ts` → `getAttempts` / `runWithFallback`)

Order, each provider used only if its key is set:

1. **Groq** — `https://api.groq.com/openai/v1/chat/completions` (OpenAI format)
   - Text: `openai/gpt-oss-120b` → `openai/gpt-oss-20b` → `qwen/qwen3.8-27b`
   - Messages with an image: `qwen/qwen3.8-27b` first (gpt-oss models are text-only and return `400 content must be a string` for images)
2. **OpenRouter** — `openrouter/free` → `google/gemma-4-31b-it:free` → `qwen/qwen3.8-27b:free`
3. **Gemini** — `gemini-3.8-flash` → `gemini-3.5-flash` → `gemini-flash-latest` → `gemini-3.1-flash-lite`

Rules: falls back to the next model only if nothing has been streamed yet; a 401/402 (bad key) skips the rest of that provider. Groq and OpenRouter share `streamOpenAICompatible()`.

To check which Groq models a key can use (key read from `.env`, never printed):
```
node -e "require('dotenv').config({quiet:true});fetch('https://api.groq.com/openai/v1/models',{headers:{Authorization:'Bearer '+process.env.GROQ_API_KEY.trim()}}).then(r=>r.json()).then(j=>j.data.forEach(m=>console.log(m.id)))"
```

### Commands

```
npm run dev      # tsx server.ts — Express + Vite middleware (dev)
npm run lint     # tsc --noEmit
npx vite build   # frontend only (this is what Vercel runs)
npm run build    # frontend + bundled server (dist/server.cjs) for `npm start`
```

Quick API test (local):
```
curl -s localhost:3000/api/health
curl -s -X POST localhost:3000/api/chat -H "content-type: application/json" -d "{\"message\":\"hi\"}"
```

### Known traps (already hit — don't repeat)

1. **Vercel ESM import:** Vercel runs `api/index.ts` as a native ES module without bundling. Relative imports **must** include `.js` (`import app from '../server.js'`). Without it every `/api` call crashes with `ERR_MODULE_NOT_FOUND` and the UI shows *"Server error occurred"*. `tsx` hides this locally. To simulate Vercel locally: transpile `api/index.ts` and `server.ts` separately with `esbuild --format=esm` (no `--bundle`) into a folder inside the project and `import()` the result with `VERCEL=1`.
2. **Vercel body limit 4.5 MB:** big phone photos → HTTP 413. Photos are compressed client-side in `ChatInput.tsx`; history also carries images, so keep payloads small.
3. **Groq models get retired:** `llama-3.3-70b-versatile`, `llama-3.1-8b-instant`, `meta-llama/llama-4-scout-17b-16e-instruct` returned 404 on 2026-09-28. Check `/models` (command above) before adding a model.
4. **Gemini key format:** a value starting with `AQ.` is not an API key (Google returns `401 ACCESS_TOKEN_TYPE_UNSUPPORTED`). Real keys start with `AIza`.
5. **Vercel Deployment Protection:** deployment URLs like `ai-dost-<hash>-anuj-785e.vercel.app` return `401 Protected deployment` to anyone not logged into Vercel. Disable it in project settings to test/share.
6. **Windows dev:** stopping a background `npx tsx server.ts` may leave the `node` process holding the port (`EADDRINUSE`). Find it with `Get-NetTCPConnection -LocalPort <port>` and stop that PID.
7. **Never commit secrets.** `.env*` is ignored except `.env.example`. Don't put key values in README, commits or logs.
8. **Multi-line/repeated env key:** if a Vercel env var holds the key more than once (or with newlines), the raw value breaks `Authorization: Bearer ...` with `Headers.append: ... is an invalid header value`. Always use `getEnvKey(name)` (in `server.ts`) to read provider keys; it keeps only the first whitespace-delimited token.

---

## Work log

### 2026-10-10

**Done**
- **Fixed live Vercel error** `Headers.append: ... is an invalid header value`: the `GROQ_API_KEY` env var on Vercel contained the key repeated across several lines. `server.ts` now reads every provider key through `getEnvKey()` (trap #8), which keeps only the first whitespace-delimited token, so multi-line/repeated values no longer break the `Authorization` header.

**Verified**
- Server with a multi-line/repeated `GROQ_API_KEY` now returns real answers (previously invalid-header error).
- `tsc --noEmit` passes.

### 2026-09-28

**Done**
- **Vercel deployment setup** — added `vercel.json`, `api/index.ts`; `server.ts` now exports `app` and skips `listen()` on Vercel. (commit `329aee6`)
- **Groq as main AI** — new provider in `server.ts`, OpenRouter + Gemini kept as backups; `.env.example` updated; retired Groq models removed after checking the `/models` list. (commit `2a16fa0`)
- **Fixed "Server error occurred" on Vercel** — root cause was the extensionless ESM import in `api/index.ts` (trap #1). Also added photo compression (trap #2) and HTTP status in client error text. (commit `a918758`)
- Diagnosed local error: `OPENROUTER_API_KEY` was empty and the Gemini key was an `AQ.` token, not an API key.

**Verified**
- Local dev and production mode: `/api/health`, `/api/chat`, `/api/chat/stream` all 200 with real Groq answers.
- Image question (≈200 KB PNG) answered correctly via `qwen/qwen3.8-27b`.
- Simulated Vercel ESM loading: function loads and serves all three endpoints.
- `tsc --noEmit` and `vite build` pass.

**Not verified / open**
- Live Vercel site not tested: the given deployment URL is behind Vercel Authentication (401). Need protection disabled or the production domain.
- Need to confirm on Vercel that `GROQ_API_KEY` is set and the latest commit is deployed.
- Photo compression runs only in the browser and was not tested in a real browser (Chrome extension was not connected).
- OpenRouter and Gemini backups are inactive until valid keys are added.
- The Groq key was pasted in chat once; consider rotating it at https://console.groq.com/keys.
