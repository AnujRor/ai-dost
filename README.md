# AI Dost 🤝

आपका अपना हिंदी AI दोस्त — बिल/नोटिस/विषय आसान भाषा में समझाना, दिल की बात, जवाब के सुझाव और मस्ती। फ़ोटो भेजकर भी सवाल पूछ सकते हैं।

- **भाषा:** स्क्रीन का पूरा UI देवनागरी हिंदी में है। और जवाब — जिस भाषा और लिपि में आप लिखें (हिंदी, English, रोमन हिंदी, बंगाली, तमिल, स्पेनिश, अरबी… कोई भी), जवाब उसी भाषा और उसी लिपि में आता है। Follow-up chips भी उसी भाषा में बनते हैं।
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
| `src/data/dostPresets.ts` | Personas / preset prompts / sample documents, built from the English dictionary via `getPersonaProfiles(t)` etc. |
| `src/i18n/locales/en.ts` | The single UI dictionary. It is the source of truth: `TranslationKey` is derived from its keys (`keyof typeof en`). |
| `src/i18n/index.ts` | `translate(key, vars)` lookup + `{name}` / `{count}` interpolation for the English dictionary. |
| `src/i18n/LanguageContext.tsx` | `LanguageProvider` + `useLanguage()` hook, locked to English (`locale: 'en'`, `htmlLang: 'en-IN'`, `dir: 'ltr'`). |
| `index.html` | Vite entry HTML. All on-page SEO lives here: title/description/keywords, Open Graph + Twitter cards, canonical URL, JSON-LD (`WebApplication` + `Person` "Anuj Ror" + `FAQPage`), favicon/manifest links, and a `<noscript>` fallback. |
| `public/` | Static assets (copied to `dist/` as-is): `favicon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `og-image.png`, `robots.txt`, `sitemap.xml`, `site.webmanifest`. |
| `.env.example` | All env vars with comments. `.env` is git-ignored. |

### API

| Route | Method | Body | Response |
| --- | --- | --- | --- |
| `/api/health` | GET | – | `{ status, hasApiKey, time }` |
| `/api/chat/stream` | POST | `{ message, history?, image?: {data (base64), mimeType}, personaTone?, mode? }` | SSE: `data: {"chunk": "..."}` lines, then `data: {"done": true, isError, category, suggestedFollowUps}` |
| `/api/chat` | POST | same as above | `{ text, category, suggestedFollowUps, isError }` |
| `/api/quick-action` | POST | see `server.ts` | JSON |

AI/key errors are returned as **HTTP 200 with `isError: true`** and a friendly Hinglish message in `text`/`chunk`. A non-200 from `/api/*` means the server/function itself failed (crash, 404, 413, Vercel protection).

### Language matching (any language)

- The UI is English-only, but the AI answers in the **exact language and script** of the user's message — Roman Hindi stays Roman Hindi, Devanagari stays Devanagari, Bengali/Tamil/Spanish/Arabic are answered in their own language and script. The model never switches language on its own.
- `LANGUAGE_RULE` (top of `BASE_SYSTEM_INSTRUCTION`) plus `FINAL_LANGUAGE_REMINDER` (last block of the system prompt) carry this rule. There is **no** app-language instruction any more — the client does not send a `locale` field.
- Short app-generated follow-ups ("aur simple karo") keep the language of the ongoing conversation.
- Photo-only messages are explained in the conversation's language (`IMAGE_ONLY_PROMPT` no longer forces Hinglish).
- **Follow-up chips are generated by the model** in the user's language. The model is asked to end its answer with a machine-readable line `<<<FOLLOWUPS>>> chip1 || chip2 || chip3`; `FollowUpStreamFilter` (streaming) and `splitFollowUps` (non-streaming) strip that line from the answer text and turn it into `suggestedFollowUps`. If the model skips the marker, the app falls back to the hardcoded English chips (`getFollowUps`). If the marker appears in the middle of the answer (model ignored the instruction), the text after it is put back into the answer instead of being lost.
- **Voice follows the reply text, not the UI:** `detectSpeechLang()` in `src/utils/speech.ts` inspects the script of the answer (Devanagari → `hi-IN`, Bengali → `bn-IN`, Tamil → `ta-IN`, Arabic script → Urdu/Arabic, Han → `zh-CN`, …) and picks a matching system voice. Latin-script text uses the browser locale (English fallback `en-IN`).
- **Speech recognition** uses `navigator.language` by default, so the user can dictate in their own language even though the buttons are English.

### UI language (English-only)

- There is **no language picker** and no `locale` in the chat request. Every on-screen string (buttons, placeholders, tooltips, modals, personas, sample documents, error messages) comes from `t('key')` and resolves to English.
- `src/i18n/locales/en.ts` is the source of truth for the keys; `TranslationKey` is `keyof typeof en`, so adding or removing a key immediately updates the type used by every component. `translate()` only interpolates `{name}` / `{count}` placeholders.
- `<html lang="en-IN">` and `dir="ltr"` are fixed; timestamps use `en-IN`.
- **Adding/editing UI copy:** add or change the key in `src/i18n/locales/en.ts` and use it via `t('your.key')`. Keep `npm run lint` green.

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

### 2026-11-18 — English-only UI, picker removed, AI/TTS in the user's language

**Goal**
- Language picker poora hata dena; screen ka har word English; AI ka jawab aur voice user ki apni bhasha/script me.

**Done**
- `src/components/LanguagePicker.tsx`, `src/i18n/languages.ts` aur saari 12 non-English locale files (`hi,bn,ta,te,mr,gu,pa,ur,ar,es,fr,zh`) delete.
- `src/i18n/locales/en.ts` ab source of truth: `export const en = {...} as const` + `export type TranslationKey = keyof typeof en`. `lang.*` keys hataye.
- `src/i18n/index.ts` simplify — sirf English dictionary, `translate(key, vars)` interpolation, `DEFAULT_LOCALE = 'en'`.
- `LanguageContext` constant English provider (`locale: 'en'`, `dir: 'ltr'`, `htmlLang: 'en-IN'`); localStorage/`setLocale` hataya.
- `Header.tsx` se picker unmount; `App.tsx` request body se `locale` hataya; `ChatBubble`/`ChatInput` se locale args hataye.
- `server.ts`: `APP_LANGUAGE_NAMES` + `appLanguageInstruction()` delete; `LANGUAGE_RULE` wapas "user ke aakhri message ki exact bhasha/script" par; naya `FINAL_LANGUAGE_REMINDER` system prompt ke aakhir me. `buildSystemInstruction(personaTone, mode)` — koi locale nahi.
- `speech.ts`: naya `detectSpeechLang()` reply text ke script se TTS language chunta hai (Devanagari/Bengali/Tamil/Telugu/Gujarati/Gurmukhi/Arabic/Urdu/Han/Japanese/Korean/Cyrillic/Hebrew/Thai), aur `pickVoice()` matching voice + sensible fallback. Recognition default ab `navigator.language`. Error string English.
- `index.html`: `lang="en-IN"`, title/description/keywords/OG/Twitter/JSON-LD/FAQ/`<noscript>` sab English; Rozha One + Yatra One Devanagari fonts hata diye (sirf Plus Jakarta Sans). `public/site.webmanifest` English + `lang: en-IN`.
- User-visible server messages bhi English: API-key/limit error cards, `Try again` chips, `getFollowUps()` fallback chips, "answer stopped midway" note, 400/404 errors, quick-action prompts aur `IMAGE_ONLY_PROMPT` (taaki model ko Hindi prompt se bias na mile). Model instructions (`LANGUAGE_RULE`, `BASE_SYSTEM_INSTRUCTION`, persona/mode blocks) Hindi me hi hain — woh screen par nahi dikhte.
- **Welcome screen simplify:** "My 4 main jobs" wale chaar cards, intro paragraph aur "Talk in any language" / "Zero judgement & full privacy" badges hata diye. Ab sirf badge + avatar/greeting rehta hai. 15 unused `welcome.*` keys bhi delete.
- **Boosters toolbar + popular prompts hataye:** neeche wala "Boosters:" toolbar (joke/shayari/motivation/riddle) aur welcome ka "Popular questions & topics" grid dono remove. `QuickActionToolbar.tsx` delete; `getQuickPrompts()` + `QuickPromptItem` type aur `qa.*` / `prompt.*` keys bhi. Header ka Booster button aur `BoosterModal` abhi bhi maujood hai (same 4 actions modal me).

**Verified**
- `npm run lint` ✅, `npx vite build` ✅.
- `src/`, `public/` aur `dist/` me Devanagari leak scan — 0 matches.

**Not verified / open**
- Live model reply aur TTS voice is machine par nahi check ho saka (`.env`/API key nahi hai). Manual pass: English/हिंदी/Bengali/Tamil message bhej kar reply language + Listen voice confirm karein.
- Speech recognition default browser locale par depend karta hai; Chrome me agar browser language English hai aur user Hindi bolta hai to recognize galat ho sakta hai.

### 2026-11-16 (d) — चुनी हुई भाषा = जवाब की भाषा (rule conflict fix)

**Problem**
- `LANGUAGE_RULE` (पुराना) कहता था "जवाब हमेशा user की भाषा में" — और app-language instruction बीच में था। दोनों rules टकराते थे, तो language picker चुनने पर भी AI कभी-कभी हिंदी में जवाब दे देता था।

**Done**
- `LANGUAGE_RULE` का पहला bullet बदला: **ऐप की चुनी हुई भाषा ही default है**; user साफ़ दूसरी भाषा में लिखे तभी उस भाषा में जाओ।
- BASE prompt से static "FINAL REMINDER" हटाया (वो हिंदी में जवाब की ज़िद कर रहा था)।
- `appLanguageInstruction()` अब आख़िरी block है system prompt में (सबसे ज़्यादा weight) + English में भी एक line: *"Write your replies, suggestions and follow-up chips in `<language>` unless the user clearly writes in another language."*
- `APP_LANGUAGE_NAMES` में native + English दोनों नाम (model को दोनों भाषाओं में पहचान मिलती है)।
- भाषा बदलते ही **अगला जवाब** नई भाषा में आता है — पुरानी बातचीत किसी और भाषा में हो तो भी।

**Verified**
- `tsc --noEmit` ✅, `vite build` ✅.
- Offline test: `buildSystemInstruction(..., 'en' | 'bn' | 'hi' | undefined)` — भाषा line हमेशा सबसे आख़िरी, chip instruction से पहले नहीं, locale न देने पर line नहीं जुड़ती।

**Not verified / open**
- Live model reply ek bhasha me dekh kar nahi check ki (is machine par API key nahi hai) — picker se English/Tamil/Bengali chun kar ek message bhej ke confirm kar lein.

### 2026-11-16 (c) — भाषा चुनने का विकल्प (13 भाषाएँ, पूरा स्क्रीन)

**Done**
- **भाषा पिकर** — header me globe button (`src/components/LanguagePicker.tsx`). Chosen language पूरे screen par lagti hai: buttons, placeholders, tooltips, modals, sidebar, personas, quick prompts, sample docs, error messages — sab.
- **13 भाषाएँ, पूरी तरह अनुवादित** — हिंदी, English, বাংলা, தமிழ், తెలుగు, मराठी, ગુજરાતી, ਪੰਜਾਬੀ, اردو, العربية, Español, Français, 中文. हर dictionary `src/i18n/locales/<code>.ts` me hai, 225 keys, हर key हर भाषा me translated (offline test: 0 missing).
- **i18n infrastructure** — `src/i18n/languages.ts` (list + dir), `src/i18n/index.ts` (`translate()` with English → Hindi fallback), `src/i18n/LanguageContext.tsx` (`useLanguage()` + localStorage `mera_ai_dost_language` + `<html lang>`/`dir`).
- **Type-safe** — `hi.ts` key set source of truth; other locales typed `Record<TranslationKey, string>`, so missing key par `npm run lint` fail hota hai (English silently dikhne ke bajaye).
- **AI bhi usi भाषा me** — client `locale` bhejta hai, server `appLanguageInstruction()` se system prompt me "ऐप की भाषा: <language>" jodta hai.
- **Voice bhi locale-aware** — speech recognition `lang` aur TTS voice ab app language follow karte hain; chat timestamps `toLocaleTimeString(locale)`.
- Arabic/Urdu me `dir="rtl"` set hota hai (text direction + layout mirror).

**Verified**
- `tsc --noEmit` ✅, `vite build` ✅.
- Offline i18n test: 13 locales × 225 keys, 0 missing; picker list aur dictionary list match; `{name}` interpolation ✅.
- `tsc` ne confirm kiya ki har locale file me sab keys maujood hain.

**Not verified / open**
- Browser me manually language switch karke nahi dekha (is machine par browser test nahi hua) — ek baar dropdown se 2-3 languages switch kar ke check kar lein.
- Live model reply in a non-Hindi app language (key nahi hai is machine par).

### 2026-11-16 (b) — पूरा फ़्रंटएंड अब देवनागरी हिंदी में

**Done**
- **पूरा UI देवनागरी हिंदी में बदला** — पहले स्क्रीन पर रोमन हिंदी (Hinglish) था, अब सब कुछ हिंदी देवनागरी में है: Header, CategoryBar, ChatBubble, ChatInput, WelcomeHero, QuickActionToolbar, Sidebar, PersonaSelectorModal, DocumentHelperModal, BoosterModal, AboutModal, `src/data/dostPresets.ts` (persona, category, quick prompts, sample docs) और `src/App.tsx` के संदेश।
- **सिस्टम प्रॉम्प्ट भी देवनागरी में** (`server.ts`) — `LANGUAGE_RULE`, `BASE_SYSTEM_INSTRUCTION`, persona/mode instructions और follow-up-chip instruction। AI अब हिंदी में "बोलता" है और यूज़र की लिपि (देवनागरी/रोमन) की पकड़ में जवाब देता है।
- **सर्वर के error messages देवनागरी में** — key missing, Groq/OpenRouter/Gemini key ग़लत, quota, rate limit, 404/400 सब।
- **`detectCategory` में देवनागरी keywords जोड़े** — अब "समझाओ", "दिल", "जवाब", "शायरी", "पहेली" जैसे देवनागरी संदेश भी सही mode (explain/emotional/advice/fun) पकड़ते हैं।
- `index.html` (title, description, OG/Twitter, JSON-LD, noscript), `public/site.webmanifest` (`lang: hi-IN`) और `index.html` का `<html lang>` भी हिंदी में।
- नमूना दस्तावेज़ (बिल/बैंक नोटिस/WhatsApp चैट) अंग्रेज़ी में ही रखे गए हैं — वे दिखाए गए "असली" दस्तावेज़ हैं।

**Verified**
- `tsc --noEmit` पास, `vite build` पास।
- सर्वर बूट; `/api/chat` देवनागरी जवाब लौटाता है (बिना key वाली error स्क्रीन भी हिंदी में) और देवनागरी संदेश पर `category: "explain"` सही detect हुआ।

**Not verified / open**
- लाइव मॉडल के हिंदी जवाब इस मशीन पर नहीं देखे गए (API key नहीं है)।
- `src/utils/speech.ts` में voice input अब भी `hi-IN` है — यह हिंदी बोलने के लिए सही है, पर अन्य भाषाओं के लिए अलग से चुनना होगा।

### 2026-11-16 (a)

**Done**
- **Any-language answering** — `server.ts` now has a `LANGUAGE_RULE` block (start of the system prompt + a reminder at the end): the model answers in the exact language *and* script of the user's message, for every language (Hindi, English, Hinglish, Bengali, Tamil, Spanish, Arabic, …), instead of defaulting to Hinglish.
- **Follow-up chips in the same language** — the model now writes a `<<<FOLLOWUPS>>> a || b || c` line at the end of the answer; `FollowUpStreamFilter` (streaming) / `splitFollowUps` (non-streaming) strip it from the bubble text and turn it into `suggestedFollowUps`. Marker matching is tolerant (`<<< followups >>>`, any case). If the marker is missing, the old Hinglish chips are used as fallback.
- `IMAGE_ONLY_PROMPT` no longer forces Hinglish (photo-only messages follow the conversation language).
- UI wording updated: chat placeholder + footer, `WelcomeHero` badge and `AboutModal` now say "kisi bhi bhasha mein"; `index.html` meta description / FAQ mention multi-language support.

**Verified**
- `tsc --noEmit` passes; `vite build` passes.
- Marker stripping unit-tested offline (char-by-char streaming, spaced/lowercase marker, `||` and list-style chips, text containing `<`).
- Server boots; `/api/health` and `/api/chat` respond correctly (no key on this machine, so the key-error path was exercised).

**Not verified / open**
- Live model replies in other languages were not checked — no API key on this machine. Needs one manual pass: send a Spanish/Bengali/Tamil message and confirm the answer *and* the chips come back in that language.
- Voice input is still `hi-IN` in `src/utils/speech.ts`, so speech-to-text only works well for Hindi/English.

### 2026-10-10

**Done**
- **Fixed live Vercel error** `Headers.append: ... is an invalid header value`: the `GROQ_API_KEY` env var on Vercel contained the key repeated across several lines. `server.ts` now reads every provider key through `getEnvKey()` (trap #8), which keeps only the first whitespace-delimited token, so multi-line/repeated values no longer break the `Authorization` header.
- **On-page SEO** — `index.html` now has full meta tags (title/description/keywords/author), Open Graph + Twitter cards, canonical URL, JSON-LD (`WebApplication`, `Person` "Anuj Ror", `FAQPage`) and a `<noscript>` fallback; new `public/` assets add favicon/icons, `og-image.png`, `robots.txt`, `sitemap.xml` and `site.webmanifest`. This also removes the `/favicon.ico` 404 that showed in the browser console.

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
